import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBox, FaChartBar, FaNewspaper, FaBell, FaShoppingCart, FaUndo, FaTag, FaBlog, FaCogs, FaUserShield, FaUserAlt, FaDollarSign } from 'react-icons/fa';
// import asset from '../assets/logo.jpg'

const Sidebar = () => {
  // State to handle the submenu visibility
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  // Function to toggle the submenu visibility
  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  return (
    <div className="sidebar">
    {/* Replace the title with the logo */}
    <div className="sidebar-logo">
      
    </div>
      <h2 className="sidebar-title">ECommerce Dashboard</h2>
      <nav className="sidebar-menu">
        <ul>
        <li><Link to="/dashboard"><FaTachometerAlt className="sidebar-icon" /> Dashboard</Link></li>

          <li><Link to="/customers"><FaUsers className="sidebar-icon" /> Customers</Link></li>
          <li><Link to="/categories"><FaBox className="sidebar-icon" /> Categories</Link></li>
          
          {/* Product menu with toggle functionality */}
          <li>
            <Link to="product" onClick={toggleProductMenu}><FaBox className="sidebar-icon" /> Product</Link>
            {isProductMenuOpen && (
              <ul className="submenu">
                <li><Link to="/taxes"><FaDollarSign className="sidebar-icon"/> Taxes</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/stock report"><FaChartBar className="sidebar-icon" /> Stock Report</Link></li>
          <li><Link to="/newsletter"><FaNewspaper className="sidebar-icon" /> Newsletter</Link></li>
          <li><Link to="/notification"><FaBell className="sidebar-icon" /> Notification</Link></li>
          <li><Link to="/order"><FaShoppingCart className="sidebar-icon"/> Order</Link></li>
          <li><Link to="/refundorder"><FaUndo className="sidebar-icon" /> Refund order</Link></li>
          <li><Link to="/promocode"><FaTag className="sidebar-icon" /> Promo Code</Link></li>
          <li><Link to="/offer"><FaTag className="sidebar-icon" /> Offer</Link></li>
          <li><Link to="/slider"><FaTag className="sidebar-icon" /> Slider</Link></li>
          <li><Link to="/blog"><FaBlog className="sidebar-icon" /> Blog</Link></li>
          <li><Link to="/setting"><FaCogs className="sidebar-icon"/> Settings</Link></li>
          <li><Link to="/userrole"><FaUserShield className="sidebar-icon"/> UserRoles</Link></li>
          <li><Link to="/subadmin"><FaUserAlt className="sidebar-icon"/> SubadminUsers</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
