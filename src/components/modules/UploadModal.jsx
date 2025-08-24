import React, { useState, useEffect, useRef } from 'react';

const UploadModal = ({ isOpen, onClose, onSave, moduleId }) => {
  const [fileTitle, setFileTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFileTitle('');
      setSelectedFile(null);
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!fileTitle.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!selectedFile) {
      newErrors.file = 'Please select a file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files;
      console.log('File selected:', file.name, file.size); // Debug

      setSelectedFile(file);

      // Auto-fill title if empty
      if (!fileTitle) {
        const nameWithoutExtension =
          file.name.split('.').slice(0, -1).join('.') || file.name;
        setFileTitle(nameWithoutExtension);
      }

      // Clear errors
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: null }));
      }
    }
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log('Uploading file:', selectedFile, 'to module:', moduleId); // Debug

    onSave({
      moduleId,
      type: 'file',
      title: fileTitle.trim(),
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          animation: 'modalSlideIn 0.3s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
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
            📎 Upload File
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              padding: 0,
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ padding: '24px' }}>
            {/* Title Input */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                }}
              >
                Display Title *
              </label>
              <input
                type="text"
                placeholder="Enter file title"
                value={fileTitle}
                onChange={e => setFileTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.title ? '#dc3545' : '#ddd'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                autoFocus
                onFocus={e => (e.target.style.borderColor = '#0caeba')}
                onBlur={e =>
                  (e.target.style.borderColor = errors.title
                    ? '#dc3545'
                    : '#ddd')
                }
              />
              {errors.title && (
                <div
                  style={{
                    color: '#dc3545',
                    fontSize: '12px',
                    marginTop: '4px',
                  }}
                >
                  {errors.title}
                </div>
              )}
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                }}
              >
                Select File *
              </label>

              {/* Custom File Button */}
              <div
                onClick={handleSelectFile}
                style={{
                  width: '100%',
                  padding: '40px 20px',
                  border: `2px dashed ${errors.file ? '#dc3545' : selectedFile ? '#28a745' : '#ccc'}`,
                  borderRadius: '8px',
                  backgroundColor: selectedFile ? '#f8fff8' : '#fafafa',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = selectedFile
                    ? '#f0fff0'
                    : '#f0f0f0';
                  e.target.style.borderColor = selectedFile
                    ? '#28a745'
                    : '#999';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = selectedFile
                    ? '#f8fff8'
                    : '#fafafa';
                  e.target.style.borderColor = errors.file
                    ? '#dc3545'
                    : selectedFile
                      ? '#28a745'
                      : '#ccc';
                }}
              >
                {selectedFile ? (
                  <div>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                      ✅
                    </div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#28a745',
                      }}
                    >
                      {selectedFile.name}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#666',
                        marginTop: '4px',
                      }}
                    >
                      {Math.round(selectedFile.size / 1024)} KB
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#999',
                        marginTop: '8px',
                      }}
                    >
                      Click to change file
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        fontSize: '48px',
                        marginBottom: '8px',
                        opacity: 0.5,
                      }}
                    >
                      📁
                    </div>
                    <div
                      style={{
                        fontSize: '16px',
                        color: '#666',
                        marginBottom: '4px',
                      }}
                    >
                      Click to select a file
                    </div>
                    <div style={{ fontSize: '14px', color: '#999' }}>
                      PDF, Images, Documents
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {errors.file && (
                <div
                  style={{
                    color: '#dc3545',
                    fontSize: '12px',
                    marginTop: '8px',
                  }}
                >
                  {errors.file}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '20px 24px',
              borderTop: '1px solid #e1e1e1',
              backgroundColor: '#f8f9fa',
              gap: '12px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                background: '#fff',
                border: '2px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#666',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile || !fileTitle}
              style={{
                padding: '12px 24px',
                background: selectedFile && fileTitle ? '#0caeba' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: selectedFile && fileTitle ? 'pointer' : 'not-allowed',
                boxShadow:
                  selectedFile && fileTitle
                    ? '0 2px 8px rgba(12, 174, 186, 0.3)'
                    : 'none',
              }}
            >
              📤 Upload File
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UploadModal;
