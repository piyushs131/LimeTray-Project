import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskForm from './components/TaskForm'; 
import TaskList from './components/TaskList'; 
import TaskFilter from './components/TaskFilter'; 
import ThemeToggle from './components/ThemeToggle'; 
import './App.css'; 

const App = () => {
  const [tasks, setTasks] = useState([]); 
  const [filter, setFilter] = useState('all'); 
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    document.title = `You have ${tasks.length} tasks`;
  }, [tasks.length]);

  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    setTasks([...tasks, newTask]);
  };

  const markTaskCompleted = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Filter tasks based on the selected filter (All, Completed, Pending)
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true; 
    }
  });

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <header className="app-header">
          <h1>Task Manager</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>

        <nav className="app-nav">
          <Link to="/tasks" className="nav-button">View Tasks</Link>
          <Link to="/add-task" className="nav-button">Add New Task</Link>
        </nav>

        <div className="task-manager">
          <Routes>
            <Route path="/" element={<h2>Welcome to the Task Manager</h2>} />
            <Route
              path="/tasks"
              element={
                <>
                  <TaskFilter setFilter={setFilter} /> {/* Add TaskFilter here */}
                  <TaskList 
                    tasks={filteredTasks} 
                    markTaskCompleted={markTaskCompleted} 
                    deleteTask={deleteTask} 
                  />
                </>
              }
            />
            <Route
              path="/add-task"
              element={<TaskForm addTask={addTask} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
