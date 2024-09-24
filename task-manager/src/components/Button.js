import React from 'react';

const Button = ({ label, onClick, active, color, icon }) => {
  return (
    <button
      className={`nav-button ${active ? 'active' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: active ? 'white' : color, // White background when active, color when inactive
        color: active ? color : 'white', // Color text/icon when active, white when inactive
        border: `2px solid ${color}`, // Border color same as the button color
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;
