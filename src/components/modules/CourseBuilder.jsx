import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Header from '../ui/Header';
import ModuleCard from './ModuleCard';
import Outline from '../ui/Outline';
import ModuleModal from './ModuleModal';
import LinkModal from './LinkModal';
import UploadModal from './UploadModal';
import EditResourceModal from './EditResourceModal';
import EmptyState from '../ui/EmptyState';
import NoResults from '../search/NoResults';
import ResourceCard from './ResourceCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSearch } from '../../hooks/useSearch';
import { useOutline } from '../../hooks/useOutline';

const CourseBuilder = () => {
  const [modules, setModules] = useLocalStorage('course-modules', []);
  const [resources, setResources] = useLocalStorage('course-resources', []);

  const {
    searchTerm,
    setSearchTerm,
    filteredModules,
    filteredResources,
    hasResults,
    isSearching,
  } = useSearch(modules, resources);

  const { activeModuleId, registerModuleRef, scrollToModule } =
    useOutline(modules);

  // Modal States
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditResourceModalOpen, setIsEditResourceModalOpen] = useState(false);

  // Current Items
  const [currentModule, setCurrentModule] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [currentResource, setCurrentResource] = useState(null);

  // HELPER: Remove duplicates from array based on ID
  const removeDuplicatesById = items => {
    const seen = new Set();
    return items.filter(item => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  };

  // HELPER: Check if resource already exists in target location
  const resourceExistsInTarget = (resourceId, targetModuleId) => {
    if (targetModuleId) {
      // Check if resource exists in target module
      const targetModule = modules.find(m => m.id === targetModuleId);
      return targetModule?.resources?.some(r => r.id === resourceId) || false;
    } else {
      // Check if resource exists in main resources
      return resources.some(r => r.id === resourceId);
    }
  };

  // MAIN AREA DROP ZONE
  const [{ isOverMain }, dropMain] = useDrop({
    accept: 'resource',
    drop: item => {
      moveResourceToMain(item.id, item.moduleId);
    },
    collect: monitor => ({
      isOverMain: monitor.isOver(),
    }),
  });

  // FIXED: Move resource to main area with duplicate prevention
  const moveResourceToMain = (resourceId, sourceModuleId) => {
    if (!sourceModuleId) return; // Already in main area

    // Check if resource already exists in main area
    if (resourceExistsInTarget(resourceId, null)) {
      console.log('Resource already exists in main area');
      return; // Don't move if duplicate
    }

    const sourceModule = modules.find(m => m.id === sourceModuleId);
    const resource = sourceModule?.resources?.find(r => r.id === resourceId);

    if (!resource) return;

    // Remove from module
    setModules(prev =>
      prev.map(module =>
        module.id === sourceModuleId
          ? {
              ...module,
              resources: module.resources.filter(r => r.id !== resourceId),
            }
          : module
      )
    );

    // Add to main resources (without moduleId)
    setTimeout(() => {
      const updatedResource = { ...resource };
      delete updatedResource.moduleId;

      setResources(prev => {
        const newResources = [...prev, updatedResource];
        return removeDuplicatesById(newResources); // Ensure uniqueness
      });
    }, 50);
  };

  const moveModule = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    setModules(prevModules => {
      const newModules = [...prevModules];
      const [movedModule] = newModules.splice(fromIndex, 1);
      newModules.splice(toIndex, 0, movedModule);
      return newModules;
    });
  };

  // FIXED: Move resource with duplicate prevention
  const moveResource = (resourceId, targetModuleId, sourceModuleId) => {
    // Check if resource already exists in target location
    if (resourceExistsInTarget(resourceId, targetModuleId)) {
      console.log('Resource already exists in target location');
      return; // Don't move if duplicate
    }

    let resource = null;

    if (sourceModuleId) {
      const sourceModule = modules.find(m => m.id === sourceModuleId);
      resource = sourceModule?.resources?.find(r => r.id === resourceId);
    } else {
      resource = resources.find(r => r.id === resourceId);
    }

    if (!resource) return;

    // Remove from source
    if (sourceModuleId) {
      setModules(prev =>
        prev.map(module =>
          module.id === sourceModuleId
            ? {
                ...module,
                resources: module.resources.filter(r => r.id !== resourceId),
              }
            : module
        )
      );
    } else {
      // FIXED: Remove from main resources when moved to module
      setResources(prev => prev.filter(r => r.id !== resourceId));
    }

    // Add to target with deduplication
    setTimeout(() => {
      const updatedResource = { ...resource, moduleId: targetModuleId };

      if (targetModuleId) {
        setModules(prev =>
          prev.map(module =>
            module.id === targetModuleId
              ? {
                  ...module,
                  resources: removeDuplicatesById([
                    ...(module.resources || []),
                    updatedResource,
                  ]),
                }
              : module
          )
        );
      } else {
        delete updatedResource.moduleId;
        setResources(prev => removeDuplicatesById([...prev, updatedResource]));
      }
    }, 50);
  };

  const handleAddClick = type => {
    switch (type) {
      case 'module':
        setCurrentModule(null);
        setIsModuleModalOpen(true);
        break;
      case 'link':
        setCurrentModuleId(null);
        setIsLinkModalOpen(true);
        break;
      case 'upload':
        setCurrentModuleId(null);
        setIsUploadModalOpen(true);
        break;
    }
  };

  const handleSaveModule = moduleData => {
    const newModule = {
      ...moduleData,
      id: moduleData.id || Date.now().toString(),
      resources: moduleData.resources || [],
    };

    if (currentModule) {
      setModules(
        modules.map(m => (m.id === moduleData.id ? { ...m, ...moduleData } : m))
      );
    } else {
      setModules([...modules, newModule]);
    }
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleEditModule = module => {
    setCurrentModule(module);
    setIsModuleModalOpen(true);
  };

  const handleDeleteModule = moduleId => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      const moduleToDelete = modules.find(m => m.id === moduleId);
      if (moduleToDelete?.resources?.length > 0) {
        const resourcesWithoutModuleId = moduleToDelete.resources.map(r => {
          const { moduleId, ...resourceWithoutModuleId } = r;
          return resourceWithoutModuleId;
        });

        // FIXED: Ensure uniqueness when moving resources back to main area
        setResources(prev =>
          removeDuplicatesById([...prev, ...resourcesWithoutModuleId])
        );
      }
      setModules(modules.filter(module => module.id !== moduleId));
    }
  };

  // FIXED: Save resource with duplicate prevention
  const handleSaveResource = resourceData => {
    const newResource = {
      ...resourceData,
      id: Date.now().toString(),
    };

    // Check for duplicates based on title and URL/filename
    const isDuplicate = resources.some(r => {
      if (r.type === 'link' && newResource.type === 'link') {
        return r.url === newResource.url || r.title === newResource.title;
      }
      if (r.type === 'file' && newResource.type === 'file') {
        return (
          r.fileName === newResource.fileName || r.title === newResource.title
        );
      }
      return r.title === newResource.title;
    });

    if (isDuplicate) {
      alert('A resource with this title or content already exists!');
      return;
    }

    setResources(prev => removeDuplicatesById([...prev, newResource]));

    setIsLinkModalOpen(false);
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleEditResource = resource => {
    setCurrentResource(resource);
    setIsEditResourceModalOpen(true);
  };

  const handleUpdateResource = updatedResource => {
    if (updatedResource.moduleId) {
      setModules(
        modules.map(module =>
          module.id === updatedResource.moduleId
            ? {
                ...module,
                resources: removeDuplicatesById(
                  module.resources.map(r =>
                    r.id === updatedResource.id ? updatedResource : r
                  )
                ),
              }
            : module
        )
      );
    } else {
      setResources(prev =>
        removeDuplicatesById(
          prev.map(r => (r.id === updatedResource.id ? updatedResource : r))
        )
      );
    }
    setIsEditResourceModalOpen(false);
    setCurrentResource(null);
  };

  const handleDeleteResource = (resourceId, moduleId = null) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      if (moduleId) {
        setModules(
          modules.map(module =>
            module.id === moduleId
              ? {
                  ...module,
                  resources: module.resources.filter(r => r.id !== resourceId),
                }
              : module
          )
        );
      } else {
        setResources(resources.filter(resource => resource.id !== resourceId));
      }
    }
  };

  const hasContent = modules.length > 0 || resources.length > 0;

  return (
    <div className="course-builder">
      <Header
        onAddClick={handleAddClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="course-content" style={{ display: 'flex', gap: '20px' }}>
        <div className="main-content" style={{ flex: 1 }} ref={dropMain}>
          {!hasContent && !searchTerm && <EmptyState />}

          {isSearching && !hasResults && <NoResults searchTerm={searchTerm} />}

          {isOverMain && (
            <div
              style={{
                padding: '20px',
                border: '2px dashed #0caeba',
                borderRadius: '8px',
                backgroundColor: '#f0f8ff',
                textAlign: 'center',
                marginBottom: '20px',
                color: '#0caeba',
                fontWeight: '500',
              }}
            >
              📤 Drop here to move resource out of module
            </div>
          )}

          {/* RESOURCES OUTSIDE MODULES */}
          {filteredResources.length > 0 && (
            <div
              style={{
                marginBottom: '30px',
                ...(isOverMain && {
                  backgroundColor: '#f0f8ff',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '2px dashed #0caeba',
                }),
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: isOverMain ? '#0caeba' : '#333',
                  borderBottom: `1px solid ${isOverMain ? '#0caeba' : '#e1e1e1'}`,
                  paddingBottom: '8px',
                }}
              >
                📚 Resources ({filteredResources.length}){' '}
                {isOverMain && '(Drop Zone)'}
              </h3>
              <div>
                {filteredResources.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    moduleId={null}
                    onEdit={handleEditResource}
                    onDelete={id => handleDeleteResource(id)}
                    onMove={moveResource}
                  />
                ))}
              </div>

              {!isOverMain && (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#999',
                    fontStyle: 'italic',
                    marginTop: '16px',
                    padding: '16px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px dashed #ddd',
                  }}
                >
                  💡 Drag these resources into modules below to organize them
                </div>
              )}
            </div>
          )}

          {/* MODULES */}
          {filteredModules.length > 0 && (
            <div className="module-list">
              {filteredModules.map((module, index) => (
                <div
                  key={module.id}
                  ref={el => registerModuleRef(module.id, el)}
                  data-module-id={module.id}
                >
                  <ModuleCard
                    module={module}
                    index={index}
                    onEdit={handleEditModule}
                    onDelete={handleDeleteModule}
                    onDeleteResource={handleDeleteResource}
                    onEditResource={handleEditResource}
                    onMove={moveModule}
                    onMoveResource={moveResource}
                    searchTerm={searchTerm}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {modules.length > 0 && (
          <Outline
            modules={modules}
            activeModuleId={activeModuleId}
            onModuleClick={scrollToModule}
          />
        )}
      </div>

      {/* MODALS */}
      {isModuleModalOpen && (
        <ModuleModal
          isOpen={isModuleModalOpen}
          onClose={() => {
            setIsModuleModalOpen(false);
            setCurrentModule(null);
          }}
          onSave={handleSaveModule}
          module={currentModule}
        />
      )}

      {isLinkModalOpen && (
        <LinkModal
          isOpen={isLinkModalOpen}
          onClose={() => {
            setIsLinkModalOpen(false);
            setCurrentModuleId(null);
          }}
          onSave={handleSaveResource}
          moduleId={null}
        />
      )}

      {isUploadModalOpen && (
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => {
            setIsUploadModalOpen(false);
            setCurrentModuleId(null);
          }}
          onSave={handleSaveResource}
          moduleId={null}
        />
      )}

      {isEditResourceModalOpen && (
        <EditResourceModal
          isOpen={isEditResourceModalOpen}
          onClose={() => {
            setIsEditResourceModalOpen(false);
            setCurrentResource(null);
          }}
          onSave={handleUpdateResource}
          resource={currentResource}
        />
      )}
    </div>
  );
};

export default CourseBuilder;
