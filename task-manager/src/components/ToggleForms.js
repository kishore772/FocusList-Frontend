import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './ToggleForms.css'; // We'll create this CSS file for specific styles

const ToggleForms = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="materialContainer">
      {isLogin ? <Login /> : <Signup />}
      <div className="material-button alt-2" onClick={() => setIsLogin(!isLogin)}>
        <span className="shape"></span>
      </div>
    </div>
  );
};

export default ToggleForms;
