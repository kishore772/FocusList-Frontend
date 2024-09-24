import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskPage from './pages/TaskPage';
import { getToken, removeToken } from './services/auth'; // Import necessary functions
import './styles.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken()); // Check if token exists in localStorage

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/tasks" />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskPage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
