import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import './TaskFilter.css'; 

const TaskFilter = () => {
  const { setFilter } = useTaskContext();

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div className="task-filter-container">
      <h3 className="task-filter-title">Filter Tasks</h3>

      {/* Filter buttons */}
      <div className="task-filter-buttons">
        <button
          className="task-filter-btn"
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className="task-filter-btn"
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
        <button
          className="task-filter-btn"
          onClick={() => handleFilterChange('pending')}
        >
          Pending
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;

