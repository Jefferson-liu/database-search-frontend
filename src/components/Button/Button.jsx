import React from 'react';
import './Button.css'; // or use Tailwind instead

const Button = ({ children, onClick, type = 'button', variant = 'default', disabled = false }) => {
  return (
    <button
      className={`btn ${variant}`} // example: "btn primary"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
