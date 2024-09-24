const BASE_URL = 'http://localhost:8000';

// Signup function
export const signup = async ({ username, email, password }) => {
  const response = await fetch(`${BASE_URL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return await response.json(); // Return the created user object
};


// Login function
export const login = async ({ username, password }) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data.access_token; // Assuming the backend returns access_token
};

// Save the token
// Save the token in localStorage
export const saveToken = (token) => {
  localStorage.setItem('authToken', token);  // Store the token
};

// Retrieve the token from localStorage
export const getToken = () => {
  return localStorage.getItem('authToken');  // Retrieve the token for future requests
};

// Remove the token from localStorage (for logout)
export const removeToken = () => {
  localStorage.removeItem('authToken');
};

