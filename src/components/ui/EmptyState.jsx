import React from 'react';

const EmptyState = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          marginBottom: '24px',
          fontSize: '64px',
          opacity: 0.3,
        }}
      >
        📚
      </div>

      <h2
        style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#333',
        }}
      >
        Create your first course module
      </h2>

      <p
        style={{
          fontSize: '14px',
          color: '#666',
          maxWidth: '300px',
          lineHeight: '1.5',
        }}
      >
        Get started by creating a module to organize your course content. Use
        the "Add" button above to begin.
      </p>
    </div>
  );
};

export default EmptyState;
