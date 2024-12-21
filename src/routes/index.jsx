import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "../components/sidebar/sidebar";
import Header from "../components/header/header.jsx";

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
import OfferPage from "../pages/offer/offer.jsx";
import Slider from "../pages/slider/slider.jsx";
import LoginPage from "../pages/login/Login.jsx";
import SignupPage from "../pages/login/Signup.jsx";  // Import SignupPage

const AppRoutes = () => {
  const location = useLocation(); // Get the current location

  // Define routes where Sidebar and Header should not be displayed
  const isLoginOrSignupPage = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="app-container">
      {/* Conditionally render Sidebar and Header */}
      {!isLoginOrSignupPage && <Sidebar />}
      <div className={isLoginOrSignupPage ? "login-content" : "main-content"}>
        {!isLoginOrSignupPage && <Header />}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/* Add Signup route */}
          <Route path="/order" element={<Order />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:customerId" element={<Customers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/taxes" element={<Taxes />} />
          <Route path="/product" element={<Products />} />
          <Route path="/newsletter" element={<NewsletterList />} />
          <Route path="/refundorder" element={<RefundOrderList />} />
          <Route path="/promocode" element={<PromocodeList />} />
          <Route path="/userrole" element={<UserRoleList />} />
          <Route path="/stock report" element={<StockReportList />} />
          <Route path="/subadmin" element={<Subadmin />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route path="/slider" element={<Slider />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
