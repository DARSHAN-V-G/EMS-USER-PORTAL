import React, { useState, useEffect } from 'react';
import './EventDetails.css';
import { 
  ArrowLeft, Calendar, MapPin, Users, Tag, Info, School, 
  UserCheck, Award, User, Mail, BookOpen, 
  Briefcase, DollarSign, UserPlus
} from 'lucide-react';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
  about?: string;
  venue?: string;
  event_type?: string;
  event_category?: string;
  club_name?: string;
  status?: string;
  team_id?: number;
  members?: Array<{
    id: number;
    name: string;
    email: string;
    rollno: string;
    department: string;
    yearofstudy: number;
  }>;
  // Additional fields from detailed event endpoint
  chief_guest?: string | null;
  eventConvenors?: string[];
  min_no_member?: number;
  max_no_member?: number;
  poster?: string;
  // Additional fields that might be available
  tot_amt_allot_su?: number;
  tot_amt_spt_dor?: number;
  exp_expense?: number;
  exp_no_aud?: number;
  faculty_obs_dept?: string;
  faculty_obs_desig?: string;
}

interface EventDetailsProps {
  event: EventType;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  const [activeTab, setActiveTab] = useState<string>('description');
  
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

  // Check if user is registered for this event
  const isRegistered = event.status === 'registered';

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
          <p>{safeEvent.club_name || safeEvent.organizer}</p>
        </div>
      </div>
      
      {/* Bottom sheet with event details */}
      <div className="event-details-content">
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
                Debug: {hasValue(safeEvent.about) ? 'Has about content' : 'No about content'}
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
              <div style={{color: 'white', marginBottom: '10px'}}>
                Debug: Details tab content
              </div>
              
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
        <div className="action-buttons-container">
          {isRegistered && (
            <div className="registration-status">
              Status: Registered
            </div>
          )}
          
          <div className="action-buttons">
            <button className="team-request-btn">
              SEND TEAM REQUEST
            </button>
            <button className="reminder-btn">
              SET A REMINDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
