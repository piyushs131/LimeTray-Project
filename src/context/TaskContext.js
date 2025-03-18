import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Use state to manage tasks and filter
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); 

  // Initialize tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Update localStorage whenever the tasks array changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = (taskText) => {
    if (!taskText.trim()) {
      return; // Prevent adding empty tasks
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Mark a task as completed
  const markTaskCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on their status (all, completed, pending)
  const filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const value = {
    tasks,
    filter,
    setFilter,
    addTask,
    markTaskCompleted,
    deleteTask,
    filterTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use TaskContext
export const useTaskContext = () => {
  return useContext(TaskContext);
};

