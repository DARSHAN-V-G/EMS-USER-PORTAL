import React, { useState, useEffect } from 'react';
import EventDetails from '../../../components/EventDetails';
import { useParams, useNavigate } from 'react-router-dom';
import './Events.css';
import URL from '../../../links';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
  about?: string;
  venue?: string;
  event_type?: string;
  event_category?: string;
  team_id?: number;
  members?: Array<{
    id: number;
    name: string;
    email: string;
    rollno: string;
    department: string;
    yearofstudy: number;
  }>;
  // Additional fields from detailed event endpoint
  chief_guest?: string | null;
  eventConvenors?: string[];
  min_no_member?: number;
  max_no_member?: number;
  poster?: string;
  club_name?: string;
  status?: string;
}

interface RegisteredEvent {
  team_id: number;
  team_name: string;
  event: {
    id: number;
    name: string;
    about: string;
    date: string;
    event_type: string;
    venue: string;
    event_category: string;
    chief_guest: string | null;
    max_no_member: number;
    min_no_member: number;
  };
  members: Array<{
    id: number;
    name: string;
    email: string;
    rollno: string;
    department: string;
    yearofstudy: number;
  }>;
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        navigate('/registered-events');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // First, fetch the registration data to get team and member info
        const registrationsResponse = await fetch(`${URL}/user/registeredevents`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!registrationsResponse.ok) {
          throw new Error(`Error fetching registrations: ${registrationsResponse.status}`);
        }

        const registrationsResult = await registrationsResponse.json();

        // Find the specific registered event
        const registeredEvent = registrationsResult.data?.find(
          (reg: RegisteredEvent) => reg.event.id === parseInt(id)
        );

        if (!registeredEvent) {
          throw new Error("Registered event not found");
        }

        // Then fetch detailed event information
        const eventDetailsResponse = await fetch(`${URL}/event/eventdetails?id=${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (eventDetailsResponse.ok) {
          // If we successfully get detailed event info, merge it with registration data
          const eventDetails = await eventDetailsResponse.json();

          // Transform to EventType format with combined data
          const eventData: EventType = {
            id: parseInt(id),
            name: eventDetails.name || registeredEvent.event.name,
            organizer: registeredEvent.team_name,
            date: eventDetails.date || registeredEvent.event.date,
            about: eventDetails.about || registeredEvent.event.about,
            venue: eventDetails.venue || registeredEvent.event.venue,
            event_type: eventDetails.event_type || registeredEvent.event.event_type,
            event_category: eventDetails.event_category || registeredEvent.event.event_category,
            team_id: registeredEvent.team_id,
            members: registeredEvent.members,
            // Additional details from the event details endpoint
            chief_guest: eventDetails.chief_guest,
            eventConvenors: eventDetails.eventConvenors,
            min_no_member: eventDetails.min_no_member,
            max_no_member: eventDetails.max_no_member,
            poster: id ? `${URL}/event/eventposter?id=${id}` : undefined,
            status: 'registered',
            club_name: registeredEvent.team_name,
          };

          setEvent(eventData);
        } else {
          // If detailed event fetch fails, still show the basic info
          const eventData: EventType = {
            id: registeredEvent.event.id,
            name: registeredEvent.event.name,
            organizer: registeredEvent.team_name,
            date: registeredEvent.event.date,
            about: registeredEvent.event.about,
            venue: registeredEvent.event.venue,
            event_type: registeredEvent.event.event_type,
            event_category: registeredEvent.event.event_category,
            team_id: registeredEvent.team_id,
            members: registeredEvent.members,
            status: 'registered',
            club_name: registeredEvent.team_name,
          };

          setEvent(eventData);
        }
      } catch (err) {
        console.error("Failed to fetch event details:", err);
        setError("Failed to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  return (
    <div className="event-detail-page">
      {loading && (
        <div className="loading-message">
          <div className="loading-spinner"></div>
          Loading event details...
        </div>
      )}
      {error && <div className="error-message">{error}</div>}

      {event && (
        <EventDetails
          event={event}
          onBack={() => navigate('/registered-events')}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
