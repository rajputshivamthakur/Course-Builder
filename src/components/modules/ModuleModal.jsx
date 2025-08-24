import React, { useState, useEffect } from 'react';
import { VALIDATION_MESSAGES } from '../../utils/constants';

const ModuleModal = ({ isOpen, onClose, onSave, module = null }) => {
  const [moduleName, setModuleName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (module) {
      setModuleName(module.name || '');
    } else {
      setModuleName('');
    }
    setErrors({});
  }, [module, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!moduleName.trim()) {
      newErrors.name = VALIDATION_MESSAGES.REQUIRED_FIELD;
    } else if (moduleName.trim().length < 2) {
      newErrors.name = VALIDATION_MESSAGES.MIN_LENGTH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave({
      id: module ? module.id : Date.now().toString(),
      name: moduleName.trim(),
    });

    setModuleName('');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #e1e1e1',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
            {module ? 'Edit Module' : 'Create Module'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6c757d',
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Module Name *
              </label>
              <input
                type="text"
                placeholder="Enter module name"
                value={moduleName}
                onChange={e => setModuleName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.name ? '#dc3545' : '#ced4da'}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                autoFocus
              />
              {errors.name && (
                <span
                  style={{
                    color: '#dc3545',
                    fontSize: '12px',
                    marginTop: '4px',
                    display: 'block',
                  }}
                >
                  {errors.name}
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '16px 24px',
              borderTop: '1px solid #e1e1e1',
              gap: '12px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 16px',
                background: 'white',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                background: '#0caeba',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {module ? 'Save Changes' : 'Create Module'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleModal;
