import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle, Loader, Edit3, Save, X } from 'lucide-react';
import './ProfilePage.css';
import URL from '../../links';
import { useAuth } from './AuthContext';

interface UserProfile {
  name: string;
  rollno: string;
  department: string;
  email: string;
  phoneno: number;
  yearofstudy: number;
}

interface EditableField {
  key: keyof UserProfile;
  isEditing: boolean;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    rollno: '',
    department: '',
    email: '',
    phoneno: 0,
    yearofstudy: 1
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    name: '',
    rollno: '',
    department: '',
    email: '',
    phoneno: 0,
    yearofstudy: 1
  });
  const [editingFields, setEditingFields] = useState<Record<keyof UserProfile, boolean>>({
    name: false,
    rollno: false,
    department: false,
    email: false,
    phoneno: false,
    yearofstudy: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
          throw new Error("No authentication token found. Please login again.");
        }
        
        const response = await fetch(`${URL}/user/fetch/profile`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.profile) {
          setProfile(data.profile);
          setEditedProfile(data.profile);
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

  const handleEditField = (field: keyof UserProfile) => {
    setEditingFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleCancelEdit = (field: keyof UserProfile) => {
    setEditingFields(prev => ({
      ...prev,
      [field]: false
    }));
    // Reset the edited value to original
    setEditedProfile(prev => ({
      ...prev,
      [field]: profile[field]
    }));
  };

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveField = async (field: keyof UserProfile) => {
    if (field === 'rollno') {
      // Don't allow editing rollno
      return;
    }

    setUpdating(true);
    try {
      const updateData: Partial<UserProfile> = {
        [field]: editedProfile[field]
      };

      const response = await fetch(`${URL}/user/update/profile`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.profile) {
        setProfile(data.profile);
        setEditedProfile(data.profile);
        setEditingFields(prev => ({
          ...prev,
          [field]: false
        }));
      } else {
        throw new Error("Updated profile data not found in response");
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      // Reset the edited value to original on error
      setEditedProfile(prev => ({
        ...prev,
        [field]: profile[field]
      }));
    } finally {
      setUpdating(false);
    }
  };

  const renderEditableField = (
    label: string,
    field: keyof UserProfile,
    value: string | number,
    type: 'text' | 'email' | 'number' = 'text',
    isEditable: boolean = true
  ) => {
    const isEditing = editingFields[field];
    const displayValue = value || "Not available";

    return (
      <div className="info-item">
        <span className="info-label">{label}</span>
        {isEditing ? (
          <div className="edit-field-container">
            {type === 'number' ? (
              <input
                type="number"
                value={editedProfile[field] as number}
                onChange={(e) => handleInputChange(field, parseInt(e.target.value) || 0)}
                className="edit-input"
                min={type === 'number' && field === 'yearofstudy' ? 1 : undefined}
                max={type === 'number' && field === 'yearofstudy' ? 6 : undefined}
              />
            ) : (
              <input
                type={type}
                value={editedProfile[field] as string}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="edit-input"
              />
            )}
            <div className="edit-actions">
              <button
                onClick={() => handleSaveField(field)}
                className="save-button"
                disabled={updating}
                title="Save"
              >
                {updating ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              </button>
              <button
                onClick={() => handleCancelEdit(field)}
                className="cancel-button"
                disabled={updating}
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="info-value-container">
            <span className="info-value">{displayValue}</span>
            {isEditable && (
              <button
                onClick={() => handleEditField(field)}
                className="edit-button"
                title="Edit"
              >
                <Edit3 size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="profile-container">
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
            {renderEditableField("Name", "name", profile.name, "text", true)}
            {renderEditableField("Roll Number", "rollno", profile.rollno, "text", false)}
            {renderEditableField("Department", "department", profile.department, "text", true)}
            {renderEditableField("Email", "email", profile.email, "email", true)}
            {renderEditableField("Phone Number", "phoneno", profile.phoneno, "number", true)}
            {renderEditableField("Year of Study", "yearofstudy", profile.yearofstudy, "number", true)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;