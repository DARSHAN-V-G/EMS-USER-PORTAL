import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle, Loader } from 'lucide-react';
import './ProfilePage.css';
import URL from '../../links';

interface UserProfile {
  name: string;
  rollno: string;
  department: string;
  email: string;
  phoneno: number;
  yearofstudy: number;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    rollno: '',
    department: '',
    email: '',
    phoneno: 0,
    yearofstudy: 1
  });

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Check both localStorage and sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        console.log("Token from localStorage:", localStorage.getItem('token'));
        console.log("Token from sessionStorage:", sessionStorage.getItem('token'));
        console.log("Token being used:", token);
        
        if (!token) {
          throw new Error("No authentication token found. Please login again.");
        }
        
        const response = await fetch(`${URL}/user/fetch/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add this line back
          },
        });

        // Debug: Log response status
        console.log("API Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        // Debug: Log full response data
        console.log("API Response data:", data);
        
        if (data && data.profile) {
          setProfile(data.profile);
        } else {
          throw new Error("Profile data not found in response");
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      {/* Removed duplicate header structure - using global header now */}
      <div className="profile-header-simple">
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1>My Profile</h1>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader className="animate-spin" size={32} />
          <p>Loading profile...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : (
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <UserCircle size={80} />
            </div>
            <div className="profile-details">
              <h2>{profile.name || "User"}</h2>
              <p>{profile.email || "No email available"}</p>
            </div>
          </div>

          <div className="profile-info-list">
            <div className="info-item">
              <span className="info-label">Roll Number</span>
              <span className="info-value">{profile.rollno || "Not available"}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Department</span>
              <span className="info-value">{profile.department || "Not available"}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Year of Study</span>
              <span className="info-value">{profile.yearofstudy || "Not available"}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Phone Number</span>
              <span className="info-value">{profile.phoneno || "Not available"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;