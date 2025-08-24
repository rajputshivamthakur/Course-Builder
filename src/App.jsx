import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CourseBuilder from './components/modules/CourseBuilder';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <CourseBuilder />
      </div>
    </DndProvider>
  );
}

export default App;
