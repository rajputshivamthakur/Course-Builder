import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ResourceCard from './ResourceCard';
import { useClickOutside } from '../../hooks/useClickOutside';
import { searchInResource } from '../../utils/searchHelpers';

const ModuleCard = ({
  module,
  index,
  onEdit,
  onDelete,
  onDeleteResource,
  onEditResource,
  onMove,
  onMoveResource,
  searchTerm,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const ref = useRef(null);
  const optionsRef = useClickOutside(() => setIsOptionsOpen(false));

  // Drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: 'module',
    item: {
      id: module.id,
      index,
      type: 'module', // FIXED: Add type property
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // FIXED: Accept both 'module' and 'resource' types
  const [{ isOver }, drop] = useDrop({
    accept: ['module', 'resource'],
    drop: item => {
      if (item.type === 'resource') {
        onMoveResource(item.id, module.id, item.moduleId);
      }
    },
    hover: item => {
      if (item.type === 'module' && item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  // Combine refs
  drag(drop(ref));

  const moduleResources = module.resources || [];

  const filteredResources = searchTerm
    ? moduleResources.filter(resource => searchInResource(resource, searchTerm))
    : moduleResources;

  // FIXED: Prevent event propagation for options menu
  const toggleOptions = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsOptionsOpen(!isOptionsOpen);
  };

  const toggleExpanded = e => {
    if (e.target.closest('.module-actions')) return;
    setIsExpanded(!isExpanded);
    setIsOptionsOpen(false);
  };

  // FIXED: Prevent double alerts by stopping propagation
  const handleEdit = e => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(module);
    setIsOptionsOpen(false);
  };

  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${module.name}"?`)) {
      onDelete(module.id);
    }
    setIsOptionsOpen(false);
  };

  return (
    <div
      ref={ref}
      style={{
        marginBottom: '16px',
        border: '1px solid #e1e1e1',
        borderRadius: '8px',
        backgroundColor: 'white',
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(1deg)' : 'none', // IMPROVED: Visual feedback
        transition: 'all 0.2s ease',
        ...(isOver && {
          backgroundColor: '#e3f2fd',
          borderColor: '#2196f3',
          borderWidth: '2px',
        }),
      }}
    >
      {/* Module Header */}
      <div
        onClick={toggleExpanded}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          cursor: isDragging ? 'grabbing' : 'pointer',
          borderBottom: isExpanded ? '1px solid #e1e1e1' : 'none',
        }}
      >
        {/* Drag Handle */}
        <div
          style={{
            marginRight: '12px',
            color: isDragging ? '#999' : '#ccc',
            cursor: isDragging ? 'grabbing' : 'grab',
            fontSize: '16px',
            userSelect: 'none',
          }}
        >
          ⋮⋮
        </div>

        {/* Expand Arrow */}
        <div
          style={{
            marginRight: '12px',
            fontSize: '12px',
            color: '#666',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          ▶
        </div>

        {/* Module Info */}
        <div style={{ flex: 1 }}>
          <div
            style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}
          >
            {module.name}
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            {moduleResources.length} item
            {moduleResources.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* FIXED: Options Menu with proper event handling */}
        <div
          className="module-actions"
          style={{ position: 'relative' }}
          ref={optionsRef}
        >
          <button
            onClick={toggleOptions}
            disabled={isDragging} // IMPROVED: Disable when dragging
            style={{
              background: 'none',
              border: 'none',
              cursor: isDragging ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              color: isDragging ? '#ccc' : '#888',
              padding: '8px',
            }}
          >
            ⋯
          </button>

          {isOptionsOpen && !isDragging && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                width: '160px',
                zIndex: 9999,
                marginTop: '8px',
                border: '1px solid #e1e1e1',
              }}
            >
              <button
                onClick={handleEdit}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDelete}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#dc3545',
                }}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Module Content */}
      {isExpanded && (
        <div
          style={{
            padding: '16px',
            minHeight: isOver ? '80px' : 'auto', // IMPROVED: Expand drop zone when hovering
            transition: 'all 0.2s ease',
            ...(isOver && { backgroundColor: '#f0f8ff' }),
          }}
        >
          {filteredResources.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                color: isOver ? '#2196f3' : '#999',
                fontStyle: 'italic',
                padding: '40px 20px',
                border: `2px dashed ${isOver ? '#2196f3' : '#ddd'}`,
                borderRadius: '8px',
                backgroundColor: isOver ? '#f0f8ff' : '#fafafa',
                transition: 'all 0.2s ease',
              }}
            >
              {isOver
                ? '📥 Drop resource here'
                : searchTerm
                  ? `No resources match your search in this module.`
                  : 'Drag resources here or use the main "Add" button to add items'}
            </div>
          ) : (
            <div>
              {filteredResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  moduleId={module.id}
                  onEdit={onEditResource}
                  onDelete={id => onDeleteResource(id, module.id)}
                  onMove={onMoveResource}
                />
              ))}
              {/* IMPROVED: Show drop hint when hovering over populated module */}
              {isOver && (
                <div
                  style={{
                    padding: '16px',
                    border: '2px dashed #2196f3',
                    borderRadius: '8px',
                    backgroundColor: '#f0f8ff',
                    textAlign: 'center',
                    color: '#2196f3',
                    fontWeight: '500',
                    marginTop: '8px',
                  }}
                >
                  📥 Drop resource here
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
