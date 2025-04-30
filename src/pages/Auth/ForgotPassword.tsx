/*import React, { useState } from 'react';
//import axios from 'axios';

type Step = 'enterRoll' | 'verifyCode' | 'resetPassword';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<Step>('enterRoll');
  const [rollno, setRollno] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateCode = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/user/generatecode', { rollno });
      setMessage('Verification code sent to your email.');
      setStep('verifyCode');
    } catch (err) {
      setMessage('Failed to send code. Check your roll number.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/user/verifycode', { rollno, code });
      setToken(res.data.token);
      setMessage('Code verified. Enter a new password.');
      setStep('resetPassword');
    } catch (err) {
      setMessage('Invalid code or roll number.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/user/resetpassword', {
        rollno,
        newPassword,
        token,
      });
      setMessage('Password reset successful. You can now log in.');
      setStep('enterRoll'); // Or navigate to login
    } catch (err) {
      setMessage('Error resetting password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Forgot Password</h2>

        {message && <p style={{ color: '#ccc', marginBottom: '1rem' }}>{message}</p>}

        {step === 'enterRoll' && (
          <>
            <label className="login-label">Roll Number</label>
            <input
              className="login-input"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="Enter your roll number"
            />
            <button className="login-button" onClick={handleGenerateCode} disabled={loading}>
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </>
        )}

        {step === 'verifyCode' && (
          <>
            <label className="login-label">Verification Code</label>
            <input
              className="login-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code sent to email"
            />
            <button className="login-button" onClick={handleVerifyCode} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </>
        )}

        {step === 'resetPassword' && (
          <>
            <label className="login-label">New Password</label>
            <input
              className="login-input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <button className="login-button" onClick={handleResetPassword} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
*/