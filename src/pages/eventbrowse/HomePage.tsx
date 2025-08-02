import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate,useLocation } from "react-router-dom";
import EventCard from "../../components/EventCard";
import EventTabs from "../../components/EventTabs";
import HeroBanner from "../../components/HeroBanner";
import Header from "../../components/Header";
import EventFilter, { FilterOptions } from "../../components/EventFilter";
import './HomePage.css';
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
  poster?: string;
}

// Add this interface for clubs
interface Club {
  id: string;
  name: string;
}

const HomePage: React.FC = () => {

  const location = useLocation();
const pathname = location.pathname;
const view = pathname.split('/')[1] || 'upcoming';
  const [searchParams,setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    eventType: searchParams.get("eventType")||"All"
  });

  const ProjName= "PSG Events";

  useEffect(() => {
    switch(view) {
      case "past":
        document.title = `Past Events - ${ProjName}`;
        break;
      case "club":
        document.title = `Club Info - ${ProjName}`;
        break;
      case "upcoming":
      default:
        document.title = `Upcoming Events - ${ProjName}`;
    }
  }, [view]);


  useEffect(() => {
    const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    setEvents([]);
  setFilteredEvents([]);

    
// Real API implementation
      try {
        // If we're in club view, fetch clubs instead of events
        if (view === "club") {
          const clubResponse = await fetch(`${URL}/club/getclubs`, {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          if (!clubResponse.ok) {
            throw new Error(`Error: ${clubResponse.status}`);
          }

          const clubResult = await clubResponse.json();
          console.log('Club API Response:', clubResult);

          if (clubResult.data && Array.isArray(clubResult.data)) {
            // Transform club data to match event structure for EventCard compatibility
            const formattedClubs = clubResult.data.map((club: Club, index: number) => ({
              id: index + 1, // Generate numeric IDs for compatibility
              name: club.name,
              about: `Information about ${club.name}`,
              date: new Date().toISOString(), // Current date
              venue: "PSG College of Technology",
              event_type: "Club",
              event_category: "Club",
              club_name: club.name,
              organizer: club.name,
              status: "active",
              // Random placeholder image
              poster: `https://source.unsplash.com/random/300x200?college,club&sig=${index}`
            }));

            setEvents(formattedClubs);
          } else {
            console.log('Invalid club response structure:', clubResult);
            throw new Error("Invalid club response format");
          }
        } else {
          // Original event fetching logic for upcoming/past events
          let endpoint = "";
          switch(view) {
            case "upcoming":
              endpoint = `${URL}/user/events/upcoming`;
              break;
            case "past":
              endpoint = `${URL}/user/events/past`;
              break;
            case "ongoing":
              endpoint = `${URL}/user/events/ongoing`;
              break;
            default:
              endpoint = `${URL}/user/events/upcoming`;
          }

          const response = await fetch(endpoint, {
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const result = await response.json();
          
          if (result.data && Array.isArray(result.data)) {
            const formattedEvents = result.data.map((event: Event) => ({
              ...event,
              organizer: event.club_name,
              poster: 'https://source.unsplash.com/random/300x200?event'
            }));

            setEvents(formattedEvents);
          } else {
            throw new Error("Invalid response format");
          }
        }
      } catch (err) {
        console.error(`Failed to fetch ${view === "club" ? "clubs" : "events"}:`, err);
        setError(`Failed to load ${view === "club" ? "clubs" : "events"}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [view]); // Only depend on view from URL

 useEffect(() => {
    if (events.length === 0) {
      setFilteredEvents([]);
      return;
    }

    let result = [...events];

    // Filter by event type
    if (filters.eventType && filters.eventType !== "All") {
      result = result.filter(event => event.event_type === filters.eventType);
    }

    // Set filtered events
    setFilteredEvents(result);

    // Log filter results
    console.log(`Applied filter: ${filters.eventType}, Found ${result.length} events`);

  }, [events, filters]);

  // Handle filter application
  const handleApplyFilters = (newFilters: FilterOptions) => {
    if (newFilters.eventType === "All") {
      searchParams.delete("eventType");
    } else {
      searchParams.set("eventType", newFilters.eventType);
    }
    setSearchParams(searchParams);
    setFilters(newFilters);
  };

  return (
    <div className="home-container">
      <div className="home-background"></div>

      

        <main className="relative z-10 px-4 pt-20 pb-8 max-w-[1200px] mx-auto">
          <div className="mb-6">
            <HeroBanner
              image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop"
              overlayText={{
                title: "Infinitum",
                subtitle: "An Intra-college event",
                link: "https://example.com",
              }}
            />
          </div>

          <EventTabs
            onFilterClick={() => setShowFilters(true)}
          />

          {/* Filter indicator - shows when filters are active */}
          {filters.eventType !== "All" && (
            <div className="filter-indicator">
              <span>Filter: {filters.eventType}</span>
              <button onClick={() =>{
                searchParams.delete("eventType");
                setSearchParams(searchParams);
                setFilters({ eventType: "All" });}}>Clear</button>
            </div>
          )}

          {/* Filter Modal */}
          <EventFilter
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onApplyFilters={handleApplyFilters}
            initialFilters={filters}
          />

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
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div key={event.id} className="event-card-wrapper">
                    <EventCard event={event} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No events found for this category and filter.
                </div>
              )}
            </div>
          )}
        </main>
    </div>
  );
};

export default HomePage;