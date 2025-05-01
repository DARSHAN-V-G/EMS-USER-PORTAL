import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";

const BASE_URL = "https://daddy-ems-8lqp.onrender.com";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    password: "",
    department: "",
    phoneno: "",
    yearofstudy: "",
  });

  const navigate = useNavigate();

  // Explicitly type the event parameter for handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Explicitly type the event parameter for handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/user/generateemailcode`, {
        rollno: formData.rollno,
      });

      navigate("/verify", { state: formData });
    } catch (err) {
      alert("Failed to generate verification code. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="rollno"
            type="text"
            placeholder="Roll No"
            value={formData.rollno}
            onChange={handleChange}
            required
          />
          <input
            name="department"
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <input
            name="phoneno"
            type="text"
            placeholder="Phone No"
            value={formData.phoneno}
            onChange={handleChange}
            required
          />
          <input
            name="yearofstudy"
            type="number"
            placeholder="Year of Study"
            value={formData.yearofstudy}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

