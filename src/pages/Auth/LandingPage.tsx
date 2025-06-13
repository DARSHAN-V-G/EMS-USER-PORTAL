import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <div className="landing-container">
      {/* Simplified title structure using h1 and potentially spans or <br> */}
      <h1 className="title-container">
        Event Management<br />System
      </h1>


      <div className="tagline-container">
        <span className="tagline-text">Click. Register. Show up.</span>
      </div>

      <div className="buttons-container">
        {/* Removed potentially redundant login/register classes if styling is identical */}
        <button className="action-button" onClick={handleLoginClick}>Login</button>
        <button className="action-button" onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
};

export default LandingPage;