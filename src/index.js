import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` instead of `react-dom`
import App from './App';

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
