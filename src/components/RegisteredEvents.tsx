import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
  poster?: string;
  about?: string;
  venue?: string;
  event_type?: string;
  event_category?: string;
}

interface RegisteredEventsProps {
  selectedId?: string;
  events?: EventType[];
}

const events: EventType[] = [
  { id: 1, name: 'Event 1', organizer: 'Organizer', date: 'Date' },
  { id: 2, name: 'Event 2', organizer: 'Organizer', date: 'Date' },
  { id: 3, name: 'Event 3', organizer: 'Organizer', date: 'Date' },
  { id: 4, name: 'Event 4', organizer: 'Organizer', date: 'Date' },
  { id: 5, name: 'Event 5', organizer: 'Organizer', date: 'Date' },
  { id: 6, name: 'Event 6', organizer: 'Organizer', date: 'Date' },
];

const RegisteredEvents: React.FC<RegisteredEventsProps> = ({ events: providedEvents }) => {
  const navigate = useNavigate();
  
  // Use provided events or fall back to mock data
  const displayEvents = providedEvents || events;
  
  return (
    <div className="registered-events">
      <div className="header-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="back-button" onClick={() => navigate('/')}>←</button>
        <h2 className="titleregistered" style={{ flex: 1, textAlign: 'center', margin: 0 }}>REGISTERED EVENTS</h2>
        <div style={{ width: '40px' }}></div>
      </div>
      <br />
      <br />
      <div className="events-list">
        {displayEvents.length > 0 ? (
          displayEvents.map((event) => (
            <div
              key={event.id}
              className="event-card-wrapper"
              onClick={() => navigate(`/registered-events/${event.id}`)}
            >
              <EventCard event={event} isRegistered={true} />
            </div>
          ))
        ) : (
          <div className="no-events-message">
            No registered events found. Register for events from the homepage.
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
