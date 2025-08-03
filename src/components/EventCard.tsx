import React from 'react';
import './EventCard.css';

// Updated Event interface to match API response
interface Event {
  id: number;
  name: string;
  about?: string;
  date: string;
  venue?: string;
  event_type?: string;
  event_category?: string;
  organizer: string;
  status?: string;
  poster?: string;
  team_id?: number;
  members?: Array<{
    id: number;
    name: string;
    email: string;
    rollno: string;
    department: string;
    yearofstudy: number;
  }>;
}

interface EventCardProps {
  event: Event;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isRegistered }) => {
  // Get the current path to determine if we're on the registered events page
  const location = window.location.pathname;
  const isRegisteredView = location.includes('registered-events');
  
  return (
    <div
      className={`event-card ${isRegisteredView ? 'registered-event' : ''}`}
      style={{
        backgroundImage: event.poster ? `url(${event.poster})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="event-overlay"></div> {/* Add this for text contrast */}
      <div className="event-content">
        <div className="event-organizer">{event.organizer}</div>
        <div className="event-name">{event.name}</div>
        <div className="event-date">{event.date}</div>
        
        {/* Show checkmark for registered events */}
        {(isRegisteredView || isRegistered) && (
          <div className="event-status-icon">✓</div>
        )}
      </div>
    </div>
  );
};

export default EventCard;