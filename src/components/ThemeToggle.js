import React, { useState, useEffect } from 'react';
import './ThemeToggle.css'; 

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect hook to persist the theme mode in localStorage
  useEffect(() => {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Add the dark mode class to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="theme-toggle-container">
      <span className="theme-toggle-label">🌞 / 🌙</span>
      <div className="theme-toggle-wrapper">
        <input
          type="checkbox"
          className="theme-toggle-checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
        />
        <span className="theme-toggle-slider"></span>
      </div>
    </div>
  );
};

export default ThemeToggle;

