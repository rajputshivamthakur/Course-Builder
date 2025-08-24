import React, { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

const Header = ({ onAddClick, searchTerm, onSearchChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useClickOutside(() => setIsDropdownOpen(false));

  const handleAddClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCreateModule = () => {
    onAddClick('module');
    setIsDropdownOpen(false);
  };

  const handleAddLink = () => {
    onAddClick('link');
    setIsDropdownOpen(false);
  };

  const handleUpload = () => {
    onAddClick('upload');
    setIsDropdownOpen(false);
  };

  const handleSearchChange = e => {
    onSearchChange(e.target.value);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: '1px solid #e1e1e1',
        marginBottom: '30px',
      }}
    >
      <h1
        style={{
          fontSize: '22px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        Course Builder
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888',
              fontSize: '16px',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search for modules and resources"
            value={searchTerm || ''}
            onChange={handleSearchChange}
            style={{
              padding: '8px 12px 8px 36px',
              border: '1px solid #e1e1e1',
              borderRadius: '4px',
              width: '240px',
              fontSize: '14px',
              backgroundColor: 'white',
            }}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              title="Clear search"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '2px',
                borderRadius: '50%',
              }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={handleAddClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#c53030',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              gap: '6px',
              boxShadow: '0 2px 4px rgba(197, 48, 48, 0.2)',
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>+</span>
            Add
            <span style={{ fontSize: '10px', marginLeft: '4px' }}>▼</span>
          </button>

          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                width: '220px',
                zIndex: 10,
                marginTop: '8px',
                overflow: 'hidden',
                padding: '8px 0',
                border: '1px solid #eaeaea',
              }}
            >
              <button
                onClick={handleCreateModule}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <span>📁</span>
                Create module
              </button>
              <button
                onClick={handleAddLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <span>🔗</span>
                Add a link
              </button>
              <button
                onClick={handleUpload}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <span>📎</span>
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
