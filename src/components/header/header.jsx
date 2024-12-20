import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="admin-header">
      <div className="admin-title">Admin Panel</div>
      <div className="admin-profile">
        <span>Welcome, Admin</span>
        <button className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;
