import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
}

interface RegisteredEventsProps {
  selectedId?: string;
}

const events: EventType[] = [
  { id: 1, name: 'Event 1', organizer: 'Organizer', date: 'Date' },
  { id: 2, name: 'Event 2', organizer: 'Organizer', date: 'Date' },
  { id: 3, name: 'Event 3', organizer: 'Organizer', date: 'Date' },
  { id: 4, name: 'Event 4', organizer: 'Organizer', date: 'Date' },
  { id: 5, name: 'Event 5', organizer: 'Organizer', date: 'Date' },
  { id: 6, name: 'Event 6', organizer: 'Organizer', date: 'Date' },
];

const RegisteredEvents: React.FC<RegisteredEventsProps> = ({ selectedId }) => {
  const navigate = useNavigate();
  
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
        {events.map((event) => (
          <div
            key={event.id}
            className={`event-card${selectedId == event.id.toString() ? ' selected' : ''}`}
            onClick={() => navigate(`/registered-events/${event.id}`)}
          >
            <p>{event.date}</p>
            <h3>{event.name}</h3>
            <p>{event.organizer}</p>
            <div className="checkmark">✔️</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
