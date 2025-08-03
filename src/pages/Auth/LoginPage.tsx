import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';
import URL from '../../links'
import { useAuth } from './AuthContext';

const LoginPage: React.FC = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const API_BASE = URL;
  const [loading, setLoading] = useState(false); // Fixed: Initialize as false

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/auth/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          rollno: rollNo,
          password: password,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid Roll No or Password');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      
      // Update authentication state
      login();
      
      // Redirect to upcoming events page
      navigate('/upcoming');
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (loading) return; // Prevent action during login
    
    try {
      if (!rollNo) {
        setError("Please enter your Roll No first.");
        return;
      }

      setLoading(true);
      setError('');

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
      setError(error.message || 'Something went wrong during password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>

        {error && (
          <div className="error-message" style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <label htmlFor="roll" className="login-label">Roll No</label>
        <input 
          type="text" 
          id="roll" 
          className="login-input" 
          value={rollNo} 
          onChange={(e) => setRollNo(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input 
          type="password" 
          id="password" 
          className="login-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              handleLogin();
            }
          }}
        />

        <div className="login-options">
          <button 
            className="forgot-link" 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: loading ? '#666' : '#3ca1d2', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              textDecoration: 'underline',
              alignSelf: 'flex-end',
              marginLeft: 'auto'
            }}
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        <button 
          className="login-button" 
          onClick={handleLogin}
          disabled={loading}
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
            position: 'relative'
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Logging in...
            </span>
          ) : (
            'LOGIN'
          )}
        </button>

        <div className="signup-link">
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoginPage;