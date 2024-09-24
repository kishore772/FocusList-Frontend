import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, saveToken } from '../services/auth'; // Import saveToken

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API
      const token = await login({ username, password });
      console.log('Login successful, token:', token);
      saveToken(token); // Save the token in localStorage
      console.log('Token saved, redirecting to tasks...');
      window.location.href = '/tasks'; // Force a full-page redirect as a fallback
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="button">
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
