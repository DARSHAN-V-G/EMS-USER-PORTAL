import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";
import URL from '../../links'

const BASE_URL = URL;

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    password: "",
    department: "",
    phoneno: "",
    yearofstudy: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${BASE_URL}/auth/user/generateemailcode`, {
        rollno: formData.rollno,
      });

      if (response.status === 201) {
        navigate("/verify", { state: formData });
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || "Unknown error";

        if (status === 409) {
          setMessage("User already exists. Please log in instead.");
        } else if (status === 400) {
          setMessage("Roll number is required.");
        } else {
          setMessage(`Failed to generate code: ${msg}`);
        }
      } else {
        setMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="rollno" type="text" placeholder="Roll No" value={formData.rollno} onChange={handleChange} required />
          <input name="department" type="text" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <input name="phoneno" type="text" placeholder="Phone No" value={formData.phoneno} onChange={handleChange} required />
          <input name="yearofstudy" type="number" placeholder="Year of Study" value={formData.yearofstudy} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            {loading ? "Sending Code..." : "Sign Up"}
          </button>
        </form>
        {message && <p style={{ marginTop: "1rem", color: "red" }}>{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
