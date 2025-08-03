import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventCard from '../../../components/EventCard';
import EventDetails from '../../../components/EventDetails';
import URL from '../../../links';
import './Events.css';
import { ArrowLeft } from 'lucide-react';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
  about?: string;
  venue?: string;
  event_type?: string;
  event_category?: string;
  poster?: string;
  chief_guest?: string | null;
  eventConvenors?: string[];
  min_no_member?: number;
  max_no_member?: number;
  team_id?: number;
  club_name?: string;
  status?: string;
  members?: Array<{
    id: number;
    name: string;
    email: string;
    rollno: string;
    department: string;
    yearofstudy: number;
  }>;
  // Additional fields that might be available
  tot_amt_allot_su?: number;
  tot_amt_spt_dor?: number;
  exp_expense?: number;
  exp_no_aud?: number;
  faculty_obs_dept?: string;
  faculty_obs_desig?: string;
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

// Fallback mock events if API fails
const mockEvents: EventType[] = [
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
  const [registeredEvents, setRegisteredEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Function to fetch detailed event information
  const fetchEventDetails = async (eventId: number) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(`${URL}/event/eventdetails?id=${eventId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching event details: ${response.status}`);
      }

      const eventDetails = await response.json();
      
      // Find the base event in our registered events list
      const baseEvent = registeredEvents.find(e => e.id === eventId);
      
      if (baseEvent) {
        // Merge the base event with the additional details
        const enhancedEvent: EventType = {
          ...baseEvent,
          about: eventDetails.about || baseEvent.about,
          venue: eventDetails.venue || baseEvent.venue,
          event_type: eventDetails.event_type || baseEvent.event_type,
          event_category: eventDetails.event_category || baseEvent.event_category,
          chief_guest: eventDetails.chief_guest,
          eventConvenors: eventDetails.eventConvenors,
          min_no_member: eventDetails.min_no_member || baseEvent.min_no_member,
          max_no_member: eventDetails.max_no_member || baseEvent.max_no_member,
          // Make sure we have the poster URL
          poster: baseEvent.poster || `${URL}/event/eventposter?id=${eventId}`
        };
        
        setSelectedEvent(enhancedEvent);
      }
    } catch (err) {
      console.error("Failed to fetch event details:", err);
      // Still set the selected event with the base info we have
      const baseEvent = registeredEvents.find(e => e.id === eventId);
      if (baseEvent) {
        setSelectedEvent(baseEvent);
      }
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${URL}/student/events/registered`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Registered Events API Response:', result);
        
        // Transform registered events data to match EventType
        const formattedEvents = result.map((regEvent: RegisteredEvent) => ({
          id: regEvent.event.id,
          name: regEvent.event.name,
          organizer: regEvent.team_name || 'Your Team',
          date: new Date(regEvent.event.date).toLocaleDateString(),
          about: regEvent.event.about,
          venue: regEvent.event.venue,
          event_type: regEvent.event.event_type,
          event_category: regEvent.event.event_category,
          team_id: regEvent.team_id,
          members: regEvent.members,
          chief_guest: regEvent.event.chief_guest,
          min_no_member: regEvent.event.min_no_member,
          max_no_member: regEvent.event.max_no_member,
          status: 'registered',
          club_name: '',  // Set default empty value
          poster: `${URL}/event/eventposter?id=${regEvent.event.id}`
        }));

        setRegisteredEvents(formattedEvents);
        
        // If there's an event ID in the URL, fetch additional details for it
        if (id) {
          const eventId = Number(id);
          fetchEventDetails(eventId);
        }
      } catch (err) {
        console.error("Failed to fetch registered events:", err);
        setError("Failed to load registered events. Please try again later.");
        // Fall back to mock data if API fails
        setRegisteredEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, [id]);

  // Handle event selection
  const handleEventSelect = (event: EventType) => {
    navigate(`/registered-events/${event.id}`);
  };

  return (
    <div className="event-page-container">
      <div className="event-page-background">
        <div className="event-page-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading registered events...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          ) : (
            <>
              <div className="event-page-header">
                <h1>REGISTERED EVENTS</h1>
                <p>View all your registered events and team details</p>
              </div>
              
              {id ? (
                // Detail view mode
                <div className="event-detail-view">
                  <button 
                    className="back-button"
                    onClick={() => navigate('/registered-events')}
                  >
                    <ArrowLeft size={24} />
                  </button>
                  
                  {detailsLoading ? (
                    <div className="loading-container">
                      <div className="loading-spinner"></div>
                      <p>Loading event details...</p>
                    </div>
                  ) : selectedEvent ? (
                    <div className="event-details-container">
                      <EventDetails 
                        event={selectedEvent} 
                        onBack={() => navigate('/registered-events')} 
                      />
                      
                      <div className="action-buttons">
                        <button className="team-request-btn">SEND TEAM REQUEST</button>
                        <button className="leave-event-btn">LEAVE EVENT</button>
                      </div>
                    </div>
                  ) : (
                    <div className="error-container">
                      <p>Event not found</p>
                      <button onClick={() => navigate('/registered-events')}>Back to Events</button>
                    </div>
                  )}
                </div>
              ) : (
                // List view mode
                <div className="events-grid">
                  {registeredEvents.length > 0 ? (
                    registeredEvents.map(event => (
                      <div 
                        key={event.id} 
                        className="event-card-container"
                        onClick={() => handleEventSelect(event)}
                      >
                        <EventCard event={event} isRegistered={true} />
                      </div>
                    ))
                  ) : (
                    <div className="no-events-message">
                      <p>You haven't registered for any events yet.</p>
                      <button onClick={() => navigate('/upcoming')}>Browse Events</button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
