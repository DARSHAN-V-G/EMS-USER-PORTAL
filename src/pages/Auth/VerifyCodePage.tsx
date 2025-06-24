import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import URL from '../../links'

const BASE_URL = URL;
const VerifyCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state;
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${BASE_URL}/auth/user/signup`, {
        ...formData,
        yearofstudy: parseInt(formData.yearofstudy),
        code,
      });

      if (response.status === 201) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || "Unknown error";

        switch (status) {
          case 400:
            setMessage("Invalid details or incorrect code.");
            break;
          case 409:
            setMessage("User already exists.");
            break;
          case 410:
            setMessage("Verification code has expired.");
            break;
          case 500:
            setMessage("Server error. Please try again later.");
            break;
          default:
            setMessage(`Error: ${msg}`);
        }
      } else {
        setMessage("Signup failed. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Email Verification</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify & Signup"}
          </button>
        </form>
        {message && <p style={{ marginTop: "1rem", color: "red" }}>{message}</p>}
      </div>
    </div>
  );
};

export default VerifyCodePage;
