import React, { useState } from 'react';
import './EventCard.css';
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
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, className = "" }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Updated colors to match the image more closely
  const colors = ['#4cc35e', '#355764', '#394C59', '#4c9c8b'];
  const randomColor = '#355764'; // colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div className={`event-card ${className}`}>
      <div className="event-card-content" style={{ backgroundColor: randomColor }}>
        <div className="event-card-inner">
          <div className="event-date">{event.date}</div>
          <h3 className="event-name">{event.name}</h3>
          <p className="event-organizer">{event.organizer}</p>
          
          <button 
            className="favorite-button" 
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              setIsLiked(!isLiked);
            }}
          >
            <Heart 
              className={`heart-icon ${isLiked ? 'liked' : ''}`} 
              fill={isLiked ? "white" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
