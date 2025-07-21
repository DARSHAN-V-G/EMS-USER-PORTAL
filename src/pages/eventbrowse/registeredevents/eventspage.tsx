import React from 'react';
import RegisteredEvents from '../../../components/RegisteredEvents';
import EventDetails from '../../../components/EventDetails';
import { useParams, useNavigate } from 'react-router-dom';
import './Events.css';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
}

const events: EventType[] = [
  { id: 1, name: 'Event 1', organizer: 'Organizer', date: 'Date' },
  { id: 2, name: 'Event 2', organizer: 'Organizer', date: 'Date' },
  { id: 3, name: 'Event 3', organizer: 'Organizer', date: 'Date' },
  { id: 4, name: 'Event 4', organizer: 'Organizer', date: 'Date' },
  { id: 5, name: 'Event 5', organizer: 'Organizer', date: 'Date' },
  { id: 6, name: 'Event 6', organizer: 'Organizer', date: 'Date' },
];

const EventsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const selectedEvent = id ? events.find(e => e.id === Number(id)) : null;

  return (
    <div className="events-page">
      {!selectedEvent && <RegisteredEvents />}
      {selectedEvent && (
        <EventDetails event={selectedEvent} onBack={() => navigate('/registered-events')} />
      )}
    </div>
  );
};

export default EventsPage;
