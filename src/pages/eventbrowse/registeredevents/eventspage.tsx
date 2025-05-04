import React, { useState } from 'react';
import RegisteredEvents from '../../../components/RegisteredEvents';
import EventDetails from '../../../components/EventDetails';
import './Events.css';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
}

const EventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const handleSelectEvent = (event: EventType) => {
    setSelectedEvent(event);
  };

  return (
    <div className="events-page">
  {(!selectedEvent || window.innerWidth >= 768) && (
    <RegisteredEvents onSelectEvent={handleSelectEvent} />
  )}
  {selectedEvent && (
    <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(null)} />
  )}
</div>

  );
};

export default EventsPage;
