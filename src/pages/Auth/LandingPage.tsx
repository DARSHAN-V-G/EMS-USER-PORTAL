import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <div className="title-container">
        <div>
          <div>
            <span className="title-text">Event Management</span>
          </div>
          <div></div>
          <div>
            <span className="title-text">System</span>
          </div>
        </div>
      </div>
      <div className="tagline-container">
        <span className="tagline-text">Click. Register. Show up.</span>
      </div>
      <div className="buttons-container">
        <button className="action-button login-button">Login</button>
        <button className="action-button register-button">Register</button>
      </div>
    </div>
  );
};

export default LandingPage;
