import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";
import EventTabs from "../../components/EventTabs";
import HeroBanner from "../../components/HeroBanner";
import Header from "../../components/Header"; // Import the new Header component
import './HomePage.css'; // Keep your existing CSS for the background
import URL from '../../links'

interface Event {
  id: number;
  name: string;
  about: string;
  date: string;
  venue: string;
  event_type: string;
  event_category: string;
  min_no_member: number;
  max_no_member: number;
  club_name: string;
  status: string;
  organizer?: string;
}

const upcomingEvents = `${URL}/user/events/upcoming`
// Main HomePage Component
const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      // Determine the endpoint based on activeTab
      let endpoint = "";
      switch(activeTab) {
        case "upcoming":
          endpoint = `${URL}/user/events/upcoming`;
          break;
        case "past":
          endpoint = `${URL}/user/events/past`;
          break;
        case "club":
          endpoint = `${URL}/user/events/club`;
          break;
        default:
          endpoint = `${URL}/user/events/upcoming`;
      }

      try {
        // Get token from storage (same as in LoginPage)
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        // if (!token) {
        //   // Redirect to login if no token
        //   navigate('/login');
        //   return;
        // }

        console.log('Fetching from:', endpoint);

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        // Check if the response has the expected structure
        if (result.data && Array.isArray(result.data)) {
          // Add organizer field from club_name for compatibility with EventCard
          const formattedEvents = result.data.map((event: Event) => ({
            ...event,
            organizer: event.club_name
          }));

          setEvents(formattedEvents);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeTab]);
  return (
    <div className="home-container">
      <div className="home-background"></div>

      <div className="home-content relative z-10 w-full h-full overflow-y-auto">
        <Header />

        <main className="px-4 pt-4 pb-8 max-w-[1200px] mx-auto">
          <HeroBanner
            image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80"
            overlayText={{
              title: "Infinitum",
              subtitle: "An Intra-college event",
              link: "https://example.com",
            }}
          />

          <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="filters mb-6"></div>

          {/* Handle loading state */}
          {loading && (
            <div className="text-center py-8">
              <p>Loading events...</p>
            </div>
          )}

          {/* Handle error state */}
          {error && (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {/* Events Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6 relative z-10 pb-8">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="event-card-wrapper">
                    <EventCard event={event} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No events found for this category.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;