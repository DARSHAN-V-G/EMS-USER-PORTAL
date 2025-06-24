import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';
import URL from '../../links'

const LoginPage: React.FC = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // to redirect after login / reset password

  const API_BASE = URL;

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollno: rollNo,
          password: password,
        }),
      });
      
      console.log("Logging in..");
      if (!response.ok) {
        throw new Error('Invalid Roll No or Password');
      }
  
      const data = await response.json();
      const token = data.token;

      if (rememberMe) {
        localStorage.setItem('token', token); // Persistent
      } else {
        sessionStorage.setItem('token', token); // Clears on close
     }

      // maybe data contains a token or user info
      console.log('Login successful:', data);
  
      
  
      // redirect to homepage/dashboard
      navigate('/home'); 
  
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Login failed');
    }
  };
  

  const handleForgotPassword = async () => {
    try {
      if (!rollNo) {
        alert("Please enter your Roll No first.");
        return;
      }

      // Step 1: Send rollno to generate code
      const generateResponse = await fetch(`${API_BASE}/auth/user/generatecode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollno: rollNo }),
      });

      if (!generateResponse.ok) {
        throw new Error('Failed to send verification code.');
      }

      const code = prompt('Enter the verification code sent to your email:');
      if (!code) return;

      // Step 2: Verify the code
      const verifyResponse = await fetch(`${API_BASE}/auth/user/verifycode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollno: rollNo, code }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Invalid verification code.');
      }

      const { token } = await verifyResponse.json();

      // Step 3: Reset password
      const newPassword = prompt('Enter your new password:');
      if (!newPassword) return;

      const resetResponse = await fetch(`${API_BASE}/auth/user/resetpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollno: rollNo, token, newPassword }),
      });

      if (!resetResponse.ok) {
        throw new Error('Failed to reset password.');
      }

      alert('Password reset successful! Please login again.');
      navigate('/login');

    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Something went wrong during password reset.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>

        <label htmlFor="roll" className="login-label">Roll No</label>
        <input 
          type="text" 
          id="roll" 
          className="login-input" 
          value={rollNo} 
          onChange={(e) => setRollNo(e.target.value)} 
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input 
          type="password" 
          id="password" 
          className="login-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <div className="login-options">
          <div className="remember-me">
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
            />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <button 
            className="forgot-link" 
            style={{ background: 'none', border: 'none', color: '#3ca1d2', cursor: 'pointer', textDecoration: 'underline' , alignContent: 'right'}}
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <button className="login-button" onClick={handleLogin}>LOGIN</button>

        <div className="signup-link">
          Don’t have an account yet? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
