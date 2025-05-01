import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";

const BASE_URL = "https://daddy-ems-8lqp.onrender.com";

const VerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state;
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    setLoading(true); // Set loading to true when the request is made

    try {
      await axios.post(`${BASE_URL}/auth/user/signup`, {
        ...formData,
        yearofstudy: parseInt(formData.yearofstudy),
        code,
      });

      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Signup failed. Please check your code or details.");
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
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
            onChange={handleCodeChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify & Signup"}
          </button>
        </form>
        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </div>
    </div>
  );
};

export default VerifyPage;
