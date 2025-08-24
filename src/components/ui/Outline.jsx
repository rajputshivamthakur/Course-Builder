import React from 'react';
import './Outline.css';

const Outline = ({ modules, activeModuleId, onModuleClick }) => {
  if (modules.length === 0) return null;

  return (
    <div className="outline">
      <div className="outline-header">
        <h3>Course Outline</h3>
      </div>
      <div className="outline-list">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`outline-item ${activeModuleId === module.id ? 'active' : ''}`}
            onClick={() => onModuleClick(module.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onModuleClick(module.id);
              }
            }}
            title={`Go to ${module.name}`}
          >
            <span className="outline-number">{index + 1}</span>
            <span className="outline-title">{module.name}</span>
            <span className="outline-count">
              {(module.resources || []).length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Outline;
