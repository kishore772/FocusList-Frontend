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

// Function to create a task
export const createTask = async (taskData) => {
  const token = getToken();  // Get the token for authorization

  try {
    const response = await fetch('http://localhost:8000/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
      },
      body: JSON.stringify(taskData),  // Send the task name and status
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const data = await response.json();  // Parse the JSON response
    return data;  // Return the created task data
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  const token = getToken(); // Ensure the token is present

  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get the error response
      throw new Error(`Failed to delete task: ${errorData.detail || response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};


// Function to update a task
export const updateTask = async (taskId, taskData) => {
  const token = getToken(); // Ensure the token is retrieved
  console.log(taskId, taskData);

  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(taskData), // Send the updated task details
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get the error response
      throw new Error(`Failed to update task: ${errorData.detail || response.statusText}`);
    }

    return await response.json(); // Return the updated task
  } catch (error) {
    console.error('Error updating task:', error);
  }
};
