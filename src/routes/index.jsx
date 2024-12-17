import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from "../components/sidebar/sidebar";
import Dashboard from "../pages/dashboard/dashboard";
import Order from "../pages/order/order";
import Customers from "../pages/customer/customer";
import Categories from "../pages/categories/categories";
import Taxes from "../pages/product/taxes";
import Products from "../pages/product/product";
import NewsletterList from "../pages/newsletter/newsletter";
import RefundOrderList from "../pages/refundorder/refundorder.jsx";
import PromocodeList from "../pages/promocode/promocode.jsx";
import UserRoleList from "../pages/userrole/userrole.jsx";
import StockReportList from "../pages/stockreport/stockreport.jsx";
import Subadmin from "../pages/subadminuser/subadminuser.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar is always visible */}
        <Sidebar />
        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
           
            <Route path="/order" element={<Order />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/taxes" element={<Taxes />} />
            <Route path="/product" element={<Products />} />
            <Route path="/newsletter" element={<NewsletterList />} />
            <Route path="/refundorder" element={<RefundOrderList />} />
            <Route path="/promocode" element={<PromocodeList />} />
            <Route path="/userrole" element={<UserRoleList />} />
            <Route path="/stock report" element={<StockReportList />} />
            <Route path="/subadmin" element={<Subadmin />} />

           
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
