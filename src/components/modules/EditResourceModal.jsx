import React, { useState, useEffect } from 'react';
import { VALIDATION_MESSAGES } from '../../utils/constants';
import { formatFileSize } from '../../utils/fileValidation';

const EditResourceModal = ({ isOpen, onClose, onSave, resource }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (resource) {
      setTitle(resource.title || '');
      setUrl(resource.url || '');
      setErrors({});
    }
  }, [resource]);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = VALIDATION_MESSAGES.REQUIRED_FIELD;
    }

    if (resource?.type === 'link' && !url.trim()) {
      newErrors.url = VALIDATION_MESSAGES.REQUIRED_FIELD;
    } else if (resource?.type === 'link' && url.trim()) {
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(url.trim())) {
        newErrors.url = VALIDATION_MESSAGES.INVALID_URL;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedResource = {
      ...resource,
      title: title.trim(),
      ...(resource.type === 'link' && {
        url: url.trim().startsWith('http')
          ? url.trim()
          : `https://${url.trim()}`,
      }),
    };

    onSave(updatedResource);
    setTitle('');
    setUrl('');
    setErrors({});
  };

  if (!isOpen || !resource) return null;

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
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#212529',
              margin: 0,
            }}
          >
            Edit {resource.type === 'link' ? 'Link' : 'File'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6c757d',
              padding: 0,
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
                  color: '#212529',
                }}
              >
                Title *
              </label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.title ? '#dc3545' : '#ced4da'}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  transition: 'border-color 0.15s ease',
                }}
                autoFocus
              />
              {errors.title && (
                <span
                  style={{
                    color: '#dc3545',
                    fontSize: '12px',
                    marginTop: '4px',
                    display: 'block',
                  }}
                >
                  {errors.title}
                </span>
              )}
            </div>

            {resource.type === 'link' && (
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#212529',
                  }}
                >
                  URL *
                </label>
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.url ? '#dc3545' : '#ced4da'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    transition: 'border-color 0.15s ease',
                  }}
                />
                {errors.url && (
                  <span
                    style={{
                      color: '#dc3545',
                      fontSize: '12px',
                      marginTop: '4px',
                      display: 'block',
                    }}
                  >
                    {errors.url}
                  </span>
                )}
              </div>
            )}

            {resource.type === 'file' && (
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#212529',
                  }}
                >
                  File
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <span>{resource.fileName}</span>
                  <span style={{ color: '#6c757d' }}>
                    ({formatFileSize(resource.fileSize)})
                  </span>
                </div>
              </div>
            )}
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
                fontWeight: '500',
                cursor: 'pointer',
                color: '#495057',
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
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResourceModal;
