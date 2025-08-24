import React from 'react';

const NoResults = ({ searchTerm }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '40px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontSize: '48px',
          marginBottom: '16px',
          opacity: 0.5,
        }}
      >
        🔍
      </div>

      <h3
        style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#333',
        }}
      >
        No results found
      </h3>

      <p
        style={{
          color: '#666',
          marginBottom: '16px',
          lineHeight: '1.5',
        }}
      >
        No modules or resources match your search for "{searchTerm}"
      </p>

      <div
        style={{
          color: '#666',
          fontSize: '14px',
        }}
      >
        <p style={{ marginBottom: '8px' }}>Try:</p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'left',
            display: 'inline-block',
          }}
        >
          <li style={{ marginBottom: '4px' }}>• Checking your spelling</li>
          <li style={{ marginBottom: '4px' }}>• Using different keywords</li>
          <li>• Being more general in your search</li>
        </ul>
      </div>
    </div>
  );
};

export default NoResults;
