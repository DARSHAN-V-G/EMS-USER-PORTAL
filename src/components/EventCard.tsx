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

      {/* Favorite button - positioned absolutely within the card */}
      <button
        className="favorite-button"
        aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click if needed
          setIsLiked(!isLiked);
        }}
      >
        <Heart
          className={`heart-icon ${isLiked ? 'liked' : ''}`}
          fill={isLiked ? "#38ef7d" : "none"} // Use green fill when liked
          color={isLiked ? "#38ef7d" : "white"} // Change stroke color too
        />
      </button>
    </div>
  );
};

export default EventCard;
