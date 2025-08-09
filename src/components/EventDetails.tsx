import React, { useState, useEffect } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/Auth/AuthContext';
import URL from '../links';
import {
  ArrowLeft, Calendar, MapPin, Users, Tag, Info, School,
  UserCheck, Award, User, Mail, BookOpen,
  Briefcase, DollarSign, UserPlus
} from 'lucide-react';

interface EventType {
  id: number;
  name: string;
  date: string;
  about?: string;
  venue?: string;
  event_type?: string;
  event_category?: string;
  club_name?: string;
  organizer?: string;
  status?: string;
  poster?: string;

  // Team/Registration specific
  team_id?: number;
  members?: Array<{
    id: number;
    name: string;
    email: string;
    rollno: string;
    department: string;
    yearofstudy: number;
  }>;

  // Detailed fields from /eventdetails (all optional)
  chief_guest?: string | null;
  eventConvenors?: string[];
  min_no_member?: number;
  max_no_member?: number;
  tot_amt_allot_su?: number | null;
  tot_amt_spt_dor?: number | null;
  exp_expense?: number | null;
  exp_no_aud?: number | null;
  faculty_obs_dept?: string | null;
  faculty_obs_desig?: string | null;
}

interface EventDetailsProps {
  event: EventType;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  const [activeTab, setActiveTab] = useState<string>('description');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [checkingRegistration, setCheckingRegistration] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check if user is registered for this event
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (!isAuthenticated) {
        setIsRegistered(false);
        return;
      }

      setCheckingRegistration(true);
      try {
        const response = await fetch(`${URL}/user/registeredevents`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data && Array.isArray(data.data)) {
            // The API returns teams with event objects inside
            const registeredEventIds = data.data.map((team: any) => team.event.id);
            setIsRegistered(registeredEventIds.includes(event.id));
          }
        }
      } catch (error) {
        console.error('Error checking registration status:', error);
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistrationStatus();
  }, [event.id, isAuthenticated]);

  // Handle register button click
  const handleRegisterClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isRegistered) {
      return; // Already registered, do nothing
    }

    try {
      const response = await fetch(`${URL}/user/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: event.id,
          teamName: `Team_${Date.now()}` // Simple team name generation
        }),
      });

      if (response.ok) {
        setIsRegistered(true);
        // Optionally show success message
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  // Log the event data when it changes
  useEffect(() => {
    console.log("Event data:", event);
  }, [event]);

  // Format date if it's in ISO format
  const formatDate = (dateString: string) => {
    try {
      if (dateString.includes('T')) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      return dateString;
    } catch (e) {
      return dateString;
    }
  };

  // Check if this is a past event
  const isPastEvent = event.status === 'past' ||
                     (event.date && new Date(event.date) < new Date());

  // Helper function to check if a field has a value
  const hasValue = (value: any) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  };

  // Ensure all required fields have at least a default value
  const safeEvent = {
    ...event,
    about: event.about || "No description available for this event.",
    venue: event.venue || "Venue information not provided.",
    date: event.date || "Date not specified.",
    event_type: event.event_type || "General",
    event_category: event.event_category || ""
  };

  return (
    <div className="event-details-wrapper">
      {/* Back button */}
      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Event poster with gradient overlay */}
      <div className="event-poster-container">
        <img
          src={safeEvent.poster || 'https://via.placeholder.com/800x400?text=No+Image'}
          alt={`${safeEvent.name} poster`}
          className="event-poster-image"
        />
        <div className="event-poster-overlay"></div>
        <div className="event-title">
          <h1>{safeEvent.name}</h1>
        </div>
      </div>

      {/* Bottom sheet with event details */}
      <div className={`event-details-content ${isPastEvent ? 'no-footer' : ''}`}>
        {/* Tab navigation */}
        <div className="categories">
          <button
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Learn More
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="scrollable-content">
          {activeTab === 'description' ? (
            /* Main info tab */
            <div className="description-tab" style={{border: '1px solid lime'}}>
              <div style={{color: 'white', marginBottom: '10px'}}>

              </div>

              {hasValue(safeEvent.about) && (
                <div className="description-section">
                  <h3 className="description-title">About</h3>
                  <p className="description-content">{safeEvent.about}</p>
                </div>
              )}

              {hasValue(safeEvent.date) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <Calendar size={18} className="info-icon" /> Date & Time
                  </h3>
                  <p className="description-content">{formatDate(safeEvent.date)}</p>
                </div>
              )}

              {hasValue(safeEvent.venue) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <MapPin size={18} className="info-icon" /> Location
                  </h3>
                  <p className="description-content">{safeEvent.venue}</p>
                </div>
              )}

              {(hasValue(safeEvent.event_type) || hasValue(safeEvent.event_category)) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <Tag size={18} className="info-icon" /> Event Type
                  </h3>
                  <p className="description-content">
                    {safeEvent.event_type}{safeEvent.event_category ? ` - ${safeEvent.event_category}` : ''}
                  </p>
                </div>
              )}

              {(hasValue(safeEvent.min_no_member) || hasValue(safeEvent.max_no_member)) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <Users size={18} className="info-icon" /> Team Size
                  </h3>
                  <p className="description-content">
                    {safeEvent.min_no_member === safeEvent.max_no_member
                      ? `${safeEvent.min_no_member} members`
                      : `${safeEvent.min_no_member || 1} to ${safeEvent.max_no_member} members`}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Detailed info tab */
            <div className="details-tab" style={{border: '1px solid cyan'}}>


              {hasValue(safeEvent.chief_guest) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <Award size={18} className="info-icon" /> Chief Guest
                  </h3>
                  <p className="description-content">{safeEvent.chief_guest}</p>
                </div>
              )}

              {hasValue(safeEvent.eventConvenors) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <UserCheck size={18} className="info-icon" /> Event Convenors
                  </h3>
                  <p className="description-content">
                    {Array.isArray(safeEvent.eventConvenors) ? safeEvent.eventConvenors.join(', ') : safeEvent.eventConvenors}
                  </p>
                </div>
              )}

              {hasValue(event.faculty_obs_dept) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <School size={18} className="info-icon" /> Faculty Observer Department
                  </h3>
                  <p className="description-content">{event.faculty_obs_dept}</p>
                </div>
              )}

              {hasValue(event.faculty_obs_desig) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <Briefcase size={18} className="info-icon" /> Faculty Observer Designation
                  </h3>
                  <p className="description-content">{event.faculty_obs_desig}</p>
                </div>
              )}

              {hasValue(event.tot_amt_allot_su) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <DollarSign size={18} className="info-icon" /> Budget Allocation (SU)
                  </h3>
                  <p className="description-content">₹{event.tot_amt_allot_su}</p>
                </div>
              )}

              {hasValue(event.tot_amt_spt_dor) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <DollarSign size={18} className="info-icon" /> Budget Allocation (DoR)
                  </h3>
                  <p className="description-content">₹{event.tot_amt_spt_dor}</p>
                </div>
              )}

              {hasValue(event.exp_expense) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <DollarSign size={18} className="info-icon" /> Expected Expenses
                  </h3>
                  <p className="description-content">₹{event.exp_expense}</p>
                </div>
              )}

              {hasValue(event.exp_no_aud) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <UserPlus size={18} className="info-icon" /> Expected Audience
                  </h3>
                  <p className="description-content">{event.exp_no_aud} people</p>
                </div>
              )}

              {/* Team members section */}
              {hasValue(event.members) && (
                <div className="description-section">
                  <h3 className="description-title">
                    <Users size={18} className="info-icon" /> Team Members
                  </h3>
                  <div className="team-members-list">
                    {event.members!.map((member) => (
                      <div key={member.id} className="team-member-card">
                        <div className="member-name">{member.name}</div>
                        <div className="member-detail"><Mail size={14} /> {member.email}</div>
                        <div className="member-detail"><Info size={14} /> {member.rollno}</div>
                        <div className="member-detail"><School size={14} /> {member.department}, Year {member.yearofstudy}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons - fixed at bottom */}
        {!isPastEvent && (
          <div className="action-buttons-container">
            {isRegistered ? (
              <div className="action-buttons">
                <button className="registered-btn" disabled>
                  REGISTERED
                </button>
              </div>
            ) : (
              <div className="action-buttons">
                <button
                  className="register-btn"
                  onClick={handleRegisterClick}
                  disabled={checkingRegistration}
                >
                  {checkingRegistration ? 'CHECKING...' : 'REGISTER NOW'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
