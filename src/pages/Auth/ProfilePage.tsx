import React from 'react';
import './ProfilePage.css'; 

const ProfilePage: React.FC = () => {
  return (
    <div className="update-profile-container">
      <button className="back-button">←</button>

      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-icon">👤</div>
        </div>
        <div className="profile-details">
          <h2>StudentName</h2>
          <p>Email@gmail.com</p>
        </div>
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <input type="text" placeholder="Roll No" />
          <div className="input-accent"></div>
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Department" />
          <div className="input-accent"></div>
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="Year Of Study" />
          <div className="input-accent"></div>
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Password (Requires Authentication)" />
          <div className="input-accent"></div>
        </div>
      </div>

      <button className="update-button">Update Profile</button>
    </div>
  );
};

export default ProfilePage;