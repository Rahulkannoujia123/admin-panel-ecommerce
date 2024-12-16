import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from "../components/sidebar/sidebar";
import Dashboard from "../pages/dashboard/dashboard";
import Order from "../pages/order/order";
import Customers from "../pages/customer/customer";
import Categories from "../pages/categories/categories";
import Taxes from "../pages/product/taxes";
import Products from "../pages/product/product";

const AppRoutes = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar is always visible */}
        <Sidebar />
        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
           
            <Route path="/orders" element={<Order />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/taxes" element={<Taxes />} />
            <Route path="/product" element={<Products />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
