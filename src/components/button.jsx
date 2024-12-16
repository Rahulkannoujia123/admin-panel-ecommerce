import React from 'react';
//import './Button.css'; // Example of component-specific styles

const Button = ({ text, onClick }) => {
  return <button className="btn" onClick={onClick}>{text}</button>;
};

export default Button;