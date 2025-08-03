import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import URL from '../../../links';
import '../registeredevents/Events.css';
import EventDetails from '../../../components/EventDetails';

interface EventDetailsType {
  id: number;
  name: string;
  date: string;
  venue: string;
  event_type: string;
  event_category: string;
  about: string;
  chief_guest: string | null;
  min_no_member: number;
  max_no_member: number;
  eventConvenors: string[];
  tot_amt_allot_su?: number;
  tot_amt_spt_dor?: number;
  exp_expense?: number;
  exp_no_aud?: number;
  faculty_obs_dept?: string;
  faculty_obs_desig?: string;
  organizer: string;
  poster?: string;
  club_name?: string;
  status?: string;
  club_id?: number;
  // Fields to match EventType in EventDetails
  members?: Array<{
    id: number;
    name: string;
    email: string;
    rollno: string;
    department: string;
    yearofstudy: number;
  }>;
}

const RegularEventDetailPage: React.FC = () => {
  const { id, view } = useParams<{ id?: string; view?: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) {
        navigate(`/${view || 'upcoming'}`);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get token from localStorage or sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        const response = await fetch(`${URL}/event/eventdetails?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        if (!result.data) {
          throw new Error("Event data not found in response");
        }

        // The actual event data is in result.data
        const eventData = result.data;

        // Format and set the event data correctly
        const formattedEvent = {
          ...eventData,
          id: parseInt(id),
          poster: `${URL}/event/eventposter?id=${id}`,
          organizer: eventData.club_name || "Event Organizer",
          status: view || 'upcoming'
        };

        console.log("Setting event data:", formattedEvent);
        setEvent(formattedEvent);
      } catch (err) {
        console.error("Failed to fetch event details:", err);
        setError("Failed to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, navigate, view]);

  return (
    <div className="event-detail-page">
      {loading && (
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>Loading event details...</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}

      {event && (
        <EventDetails
          event={event}
          onBack={() => navigate(`/${view || 'upcoming'}`)}
        />
      )}
    </div>
  );
};

export default RegularEventDetailPage;
