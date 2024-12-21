import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authenticationSlice'; // import the logout action
import { useNavigate } from 'react-router-dom'; // import useNavigate for redirection
import './header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="admin-title"></div>
      <div className="admin-profile">
        <span>Welcome, Admin</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
