import { useState } from 'react';

/**
 * Custom hook for managing localStorage in a React application.
 * It provides a simple interface for setting and getting values from localStorage.
 *
 * @param {string} key - The key for storing the value in localStorage.
 * @param {any} initialValue - The initial value to be used if the value is not found in localStorage.
 * 
 * @returns {[any, function]} - Returns the current value and a setter function to update the value.
 */
export const useLocalStorage = (key, initialValue) => {
  // Get the stored value from localStorage if it exists, otherwise use the initial value
  const storedValue = localStorage.getItem(key);
  
  // If a value exists in localStorage, parse it. Otherwise, use the initial value.
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  // Set the initial state based on the stored value or the default initialValue
  const [value, setValue] = useState(parsedValue);

  // Update localStorage whenever the state value changes
  const setLocalStorage = (newValue) => {
    setValue(newValue); // Update the state value
    // Save the updated value in localStorage
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setLocalStorage];
};

