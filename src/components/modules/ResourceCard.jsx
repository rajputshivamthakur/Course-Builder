import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { getFileIcon, formatFileSize } from '../../utils/fileValidation';

const ResourceCard = ({ resource, moduleId, onEdit, onDelete, onMove }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'resource',
    item: {
      id: resource.id,
      moduleId,
      type: 'resource',
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  // SIMPLE FIX: Just stop propagation, allow normal function execution
  const handleEdit = e => {
    e.stopPropagation(); // Only this line needed
    onEdit(resource);
  };

  const handleDelete = e => {
    e.stopPropagation(); // Only this line needed
    if (
      window.confirm(`Are you sure you want to delete "${resource.title}"?`)
    ) {
      onDelete(resource.id);
    }
  };

  const getIcon = () => {
    if (resource.type === 'link') return '🔗';
    if (resource.fileName) {
      return getFileIcon(resource.fileName);
    }
    return '📎';
  };

  const getIconColor = () => {
    if (resource.type === 'link') return '#17a2b8';
    if (resource.fileName?.toLowerCase().endsWith('.pdf')) return '#dc3545';
    return '#6c757d';
  };

  const getTypeLabel = () => {
    if (resource.type === 'link') return 'Link';
    if (resource.fileName?.toLowerCase().endsWith('.pdf')) return 'PDF';
    return 'File';
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        marginBottom: '8px',
        backgroundColor: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Drag Handle */}
      <div
        style={{
          marginRight: '8px',
          color: '#ccc',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        ⋮⋮
      </div>

      {/* Icon */}
      <div
        style={{
          marginRight: '12px',
          fontSize: '18px',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: getIconColor(),
          borderRadius: '6px',
          color: 'white',
        }}
      >
        {getIcon()}
      </div>

      {/* Resource Info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#212529',
            marginBottom: '4px',
            lineHeight: '1.3',
          }}
        >
          {resource.title}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: '#6c757d',
            fontWeight: '400',
          }}
        >
          {getTypeLabel()}
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          opacity: 0.7,
        }}
      >
        <button
          onClick={handleEdit}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            fontSize: '14px',
            borderRadius: '4px',
            color: '#6c757d',
          }}
          title="Edit resource"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            fontSize: '14px',
            borderRadius: '4px',
            color: '#6c757d',
          }}
          title="Delete resource"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
