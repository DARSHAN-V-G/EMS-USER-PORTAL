import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";
import EventTabs from "../../components/EventTabs";
import HeroBanner from "../../components/HeroBanner";
import Header from "../../components/Header";
import EventFilter, { FilterOptions } from "../../components/EventFilter";
import './HomePage.css';
import URL from '../../links'

import { mockEventData, mockEventPosters } from "../../assets/sampleData";

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

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    eventType: "All"
  });


  const navigate = useNavigate();
  const USE_MOCK_DATA = true; // Set to false to use real API
  useEffect(() => {
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    if (USE_MOCK_DATA) {
        // Use mock data with artificial delay to simulate network request
        setTimeout(() => {
          try {
            let mockResponse;

            // Map "club" tab to "ongoing" events in the mock data
            switch (activeTab) {
              case "upcoming":
                mockResponse = mockEventData.upcoming;
                break;
              case "past":
                mockResponse = mockEventData.past;
                break;
              case "club":
                mockResponse = mockEventData.ongoing; // Map club to ongoing
                break;
              default:
                mockResponse = mockEventData.upcoming;
            }

            // Format the events to include organizer field
            const formattedEvents = mockResponse.data.map((event: Event) => ({
              ...event,
              organizer: event.club_name, // Use club_name as organizer for EventCard
              poster: mockEventPosters[event.id]
            }));

            setEvents(formattedEvents);
            console.log(`Loaded ${formattedEvents.length} ${activeTab} events from mock data`);
          } catch (err) {
            console.error("Error loading mock data:", err);
            setError("Failed to load events. Please try again later.");
          } finally {
            setLoading(false);
          }
        }, 0); // Simulate network delay of 800ms

        return; // Exit early to avoid the real API fetch code
      }

//     let endpoint = "";
//     switch(activeTab) {
//       case "upcoming":
//         endpoint = `${URL}/user/events/upcoming`;
//         break;
//       case "past":
//         endpoint = `${URL}/user/events/past`;
//         break;
//       case "club":
//         endpoint = `${URL}/user/events/ongoing`;
//         break;
//       default:
//         endpoint = `${URL}/user/events/upcoming`;
//     }

//     try {
//       console.log('Active tab:', activeTab);
//       console.log('Final endpoint:', endpoint);

//       const response = await fetch(endpoint, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Full API Response:', result);

//       // Check if the response has the expected structure
//       if (result.data && Array.isArray(result.data)) {
//         console.log('Events found:', result.data.length);

//         // Add organizer field from club_name for compatibility with EventCard
//         const formattedEvents = result.data.map((event: Event) => ({
//           ...event,
//           organizer: event.club_name
//         }));

//         setEvents(formattedEvents);
//       } else {
//         console.log('Invalid response structure:', result);
//         throw new Error("Invalid response format");
//       }
//     } catch (err) {
//       console.error("Failed to fetch events:", err);
//       setError("Failed to load events. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
  };

  fetchEvents();
}, [activeTab]);
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
    setFilters(newFilters);
  };

  return (
    <div className="home-container">
      <div className="home-background"></div>

      <div className="home-content relative z-10 w-full h-full overflow-y-auto">
        <Header />

        <main className="px-4 pt-4 pb-8 max-w-[1200px] mx-auto">
          <HeroBanner
            image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop"
            overlayText={{
              title: "Infinitum",
              subtitle: "An Intra-college event",
              link: "https://example.com",
            }}
          />

          <EventTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onFilterClick={() => setShowFilters(true)}
          />

          {/* Filter indicator - shows when filters are active */}
          {filters.eventType !== "All" && (
            <div className="filter-indicator">
              <span>Filter: {filters.eventType}</span>
              <button onClick={() => setFilters({ eventType: "All" })}>Clear</button>
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
    </div>
  );
};

export default HomePage;