import React from 'react';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
}

interface RegisteredEventsProps {
  onSelectEvent: (event: EventType) => void;
}

const events: EventType[] = [
  { id: 1, name: 'Event 1', organizer: 'Organizer', date: 'Date' },
  { id: 2, name: 'Event 2', organizer: 'Organizer', date: 'Date' },
  { id: 3, name: 'Event 3', organizer: 'Organizer', date: 'Date' },
  { id: 4, name: 'Event 4', organizer: 'Organizer', date: 'Date' },
  { id: 5, name: 'Event 5', organizer: 'Organizer', date: 'Date' },
  { id: 6, name: 'Event 6', organizer: 'Organizer', date: 'Date' },
];

const RegisteredEvents: React.FC<RegisteredEventsProps> = ({ onSelectEvent }) => {
  return (
    <div className="registered-events">
      <h2>REGISTERED EVENTS</h2>
      <br />
      <br />
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card" onClick={() => onSelectEvent(event)}>
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
