import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // We will use the useNavigate hook to navigate to /tasks

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Trigger login and redirect to /tasks
    onLogin(); // Trigger the onLogin function passed from App.js
    navigate('/tasks'); // Redirect to /tasks immediately
  };

  return (
    <div className="box">
      <div className="title">LOGIN</div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="spin"></span>
        </div>
        <div className="input">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            name="pass"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="spin"></span>
        </div>
        <div className="button login">
          <button type="submit">
            <span>GO</span>
            <i className="fa fa-check"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
