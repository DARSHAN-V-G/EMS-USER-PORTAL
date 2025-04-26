import React from 'react';
import './LoginPage.css';
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>

        <label htmlFor="roll" className="login-label">Roll No</label>
        <input type="text" id="roll" className="login-input" />

        <label htmlFor="password" className="login-label">Password</label>
        <input type="password" id="password" className="login-input" />

        <div className="login-options">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>

        <button className="login-button">LOGIN</button>

        <div className="signup-link">
          Don’t have an account yet? <Link to ="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
