import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import * as Icons from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import Logo from "../../images/common/logo-dark.svg";
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import CheckBox from '../../components/common/CheckBox.jsx';
import { login } from '../../store/slices/authenticationSlice.jsx';
import axios from 'axios'; // Import Axios for making API requests
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isRemember, setIsRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  const handleRememberChange = (check) => {
    setIsRemember(check);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare the data for the API request
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Make the API request to login
      const response = await axios.post('https://ecommerce-backend-eight-umber.vercel.app/user/admin-login', loginData);

      // Check if login was successful
      if (response.data.success) {
        // If successful, dispatch login action
        dispatch(login());
        // Log the success response to the console
        console.log('Login successful:', response.data);  // Log success message
        // Redirect to the dashboard
        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        // If unsuccessful, show error
        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Login failed", error);
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 5000);
    }
  };

  return (
    <div className="login">
      <div className="login_sidebar">
        <figure className="login_image">
          <img src="https://images.unsplash.com/photo-1694537745985-34eacdf76139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="" />
        </figure>
      </div>
      <div className="login_form">
        <div className="login_content">
          <div to="/" className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <h2 className="page_heading">Login</h2>
        </div>
        <form className="form" onSubmit={handleLogin}>
          <div className="form_control">
            <Input
              type="text"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              placeholder="Email "
              icon={<Icons.TbMail />}
              label="Email "
            />
          </div>
          <div className="form_control">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              placeholder="Password"
              label="Password"
              onClick={handleShowPassword}
              icon={<Icons.TbEye />}
            />
          </div>
          <div className="form_control">
            <CheckBox
              id="rememberCheckbox"
              label="Remember me"
              checked={isRemember}
              onChange={handleRememberChange}
            />
          </div>
          {loginError && <small className="incorrect">Incorrect email or password</small>}
          <div className="form_control">
            <Button
              label="Login"
              type="submit"
            />
          </div>
        </form>
       
       
      </div>
    </div>
  );
};

export default Login;
