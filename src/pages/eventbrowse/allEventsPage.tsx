import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import EventDetails from '../../components/EventDetails';
import URL from '../../links';
import { ArrowLeft } from 'lucide-react';
import './AllEvents.css';

interface EventType {
  id: number;
  name: string;
  organizer: string;
  date: string;
  about?: string;
  venue?: string;
  event_type?: string;
  event_category?: string;
  club_name?: string;
  status?: string;
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
  // Additional fields that might be available
  tot_amt_allot_su?: number;
  tot_amt_spt_dor?: number;
  exp_expense?: number;
  exp_no_aud?: number;
  faculty_obs_dept?: string;
  faculty_obs_desig?: string;
}

const AllEventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents(activeTab);
  }, [activeTab]);

  const fetchEvents = async (category: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the appropriate endpoint based on the active tab
      let endpoint = '';
      switch (category) {
        case 'past':
          endpoint = `${URL}/event/past_events`;
          break;
        case 'ongoing':
          endpoint = `${URL}/event/ongoing_events`;
          break;
        case 'upcoming':
        default:
          endpoint = `${URL}/event/upcoming_events`;
          break;
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} events`);
      }

      const result = await response.json();
      console.log(`${category.charAt(0).toUpperCase() + category.slice(1)} Events API Response:`, result);
      
      // Transform events data to match EventType
      const formattedEvents = result.map((event: any) => ({
        id: event.id,
        name: event.name,
        organizer: event.organizer || 'Event Organizer',
        date: new Date(event.date).toLocaleDateString(),
        about: event.about,
        venue: event.venue,
        event_type: event.event_type,
        event_category: event.event_category,
        club_name: event.club_name || '',
        status: category, // 'past', 'ongoing', or 'upcoming'
        chief_guest: event.chief_guest,
        min_no_member: event.min_no_member,
        max_no_member: event.max_no_member,
        poster: event.poster ? `${URL}/event/eventposter?id=${event.id}` : undefined
      }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedEvent(null);
  };

  return (
    <div className="events-page-container">
      {selectedEvent ? (
        <div className="event-details-container">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            <span>Back to Events</span>
          </button>
          <EventDetails event={selectedEvent} onBack={handleBack} />
        </div>
      ) : (
        <>
          <div className="events-header">
            <h1>All Events</h1>
            <div className="event-tabs">
              <button 
                className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => handleTabChange('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`}
                onClick={() => handleTabChange('ongoing')}
              >
                Ongoing
              </button>
              <button 
                className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => handleTabChange('past')}
              >
                Past
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={() => fetchEvents(activeTab)}>Try Again</button>
            </div>
          ) : events.length === 0 ? (
            <div className="no-events-container">
              <p>No {activeTab} events found.</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <div key={event.id} onClick={() => handleEventClick(event)}>
                  <EventCard 
                    event={event} 
                    isRegistered={event.status === 'registered'}
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="navigation-links">
            <Link to="/eventbrowse/registeredevents" className="nav-link">
              View My Registered Events
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AllEventsPage;
