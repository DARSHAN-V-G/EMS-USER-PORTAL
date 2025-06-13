import React, { useState } from 'react';
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
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="event-card"
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
      </div>
    </div>
  );
};

export default EventCard;