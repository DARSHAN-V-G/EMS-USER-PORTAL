import React from 'react';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
}

interface EventDetailsProps {
  event: EventType;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  return (
    <div className="event-details">
      <button className="back-button" onClick={onBack}>←</button>
      <h2>{event.name}</h2>
      <div className="event-info">
        <div className="tabs">
          <button className="tab">Learn More</button>
          <button className="tab active">Description</button>
        </div>

        <div className="event-fields">
          <p><strong>Short info</strong><br/>Event Info</p>
          <p><strong>Time</strong><br/>Event Info</p>
          <p><strong>Location</strong><br/>Event Info</p>
          <p><strong>Status:</strong> Registered</p>
        </div>

        <div className="action-buttons">
          <button className="team-request">SEND TEAM REQUEST</button>
          <button className="reminder">SET A REMINDER</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
