import { getToken } from './auth'; // Import token functions

const BASE_URL = 'http://localhost:8000'; // Replace with your backend's URL

// Function to get all tasks
export const getAllTasks = async () => {
  const token = getToken(); // Retrieve the token from localStorage

  try {
    const response = await fetch(`${BASE_URL}/tasks/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch all tasks');
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the list of all tasks
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    return [];
  }
};

// Get tasks by category
export const getTasksByCategory = async (category) => {
  const token = getToken(); // Retrieve the token from localStorage

  // If 'all', use the 'all' endpoint, otherwise use the status query parameter
  const url = category === 'all'
    ? `${BASE_URL}/tasks/all`
    : `${BASE_URL}/tasks/?status=${category}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the list of tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return []; // Return an empty array in case of error
  }
};
