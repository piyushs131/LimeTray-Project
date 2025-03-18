import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext'; 
import './TaskForm.css'; 

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      setError('Task cannot be empty');
      return;
    }

    addTask(task);

    setTask('');
    setError('');
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
    if (e.target.value.trim()) {
      setError(''); 
    }
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">Add New Task</h2>

      {/* Form container */}
      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-input">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Enter your task..."
            className={`task-input ${error ? 'input-error' : ''}`}
          />
          {/* Error message */}
          {error && <span className="error-message">{error}</span>}
        </div>

        {/* Submit button */}
        <button type="submit" className="task-submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

