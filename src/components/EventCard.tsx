import React, { useState } from 'react';
import './EventCard.css'; // Import the updated CSS
import { Heart } from 'lucide-react';

// Define the type for the event prop
interface Event {
  id: number;
  name: string;
  organizer: string;
  date: string;
}

interface EventCardProps {
  event: Event;
  // className prop might not be needed anymore unless used for specific overrides
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    // Use the 'event-card' class which now has the club-card styles
    <div className="event-card">
      {/* Map event data to the corresponding elements */}
      <div className="event-organizer">{event.organizer}</div>
      <div className="event-name">{event.name}</div>
      <div className="event-date">{event.date}</div>

      
    </div>
  );
};

export default EventCard;
