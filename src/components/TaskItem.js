import React from 'react';
import { useTaskContext } from '../context/TaskContext'; 
import './TaskItem.css'; 

const TaskItem = ({ task }) => {
  const { markTaskCompleted, deleteTask } = useTaskContext();

  const handleToggleCompletion = () => {
    markTaskCompleted(task.id);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Task text container that toggles completion on click */}
      <div
        className={`task-text-container ${task.completed ? 'completed-text' : ''}`}
        onClick={handleToggleCompletion} 
      >
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={handleToggleCompletion} 
        />
        <span className="task-text">{task.text}</span>
      </div>

      {/* Task actions for deleting */}
      <div className="task-actions">
        <button
          className="task-action-btn delete-btn"
          onClick={handleDeleteTask}
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

