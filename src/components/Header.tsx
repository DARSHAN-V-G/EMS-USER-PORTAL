import React, { useState, useEffect,useRef } from "react";
import { MenuIcon, Search, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthContext";
import "./Header.css"

import { mockEventData, mockEventPosters } from "../assets/sampleData";
import URL from '../links';

interface Event {
  id: number;
  name: string;
  about: string;
  date: string;
  venue: string;
  event_type: string;
  event_category: string;
  club_name: string;
  status: string;
  organizer?: string;
  poster?: string;
}

const Header: React.FC = () => {
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Add state to control menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search function (you need to implement this)
  const handleSearch = (query: string) => {
    // Your search implementation
    setSearchQuery(query);
  };

/*
  
  // Fetch data
  useEffect(() => {
  
      
      switch(view) {
        case "upcoming":
          endpoint = `${URL}/user/events/upcoming`;
          break;
        case "past":
          endpoint = `${URL}/user/events/past`;
          break;
        case "club":
          endpoint = `${URL}/user/events/ongoing`;
          break;
        default:
          endpoint = `${URL}/user/events/upcoming`;
      }
      function handleSearch(e) ={
        e.length &&  setEvents(...events,Response.filter((res) => (res in evalue)));
        closeSearch();
      }
      const closeSearch= ()=>{
        setEvents([]);
      }
      try {
        console.log('Current view:', view);
        console.log('Final endpoint:', endpoint);

        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Full API Response:', result);

        // Check if the response has the expected structure
        if (result.data && Array.isArray(result.data)) {
          console.log('Events found:', result.data.length);

          // Add organizer field from club_name for compatibility with EventCard
          const formattedEvents = result.data.map((event: Event) => ({
            ...event,
            organizer: event.club_name,
            poster: mockEventPosters[event.id] // Add poster URLs for real data too
          }));

          setEvents(formattedEvents);
        } else {
          console.log('Invalid response structure:', result);
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
  }, [e]);
*/
  return (
   
      <div className="sticky top-0 left-0 right-0 z-50 flex justify-center w-full bg-[#1f2937]/85 backdrop-blur-xl shadow-lg border-b border-gray-700/50">
        <header className="flex items-center justify-between w-full max-w-[1200px] px-4 py-3">
          <div className="flex items-center gap-4">
           
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="icon"
                className="
                  group
                  rounded-full p-2.5
                  bg-transparent hover:bg-green-500/15
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2937]
                  transition-all duration-200 ease-in-out
                "
                onClick={toggleMenu} // Add onClick handler to toggle menu
              >
              <MenuIcon className="h-6 w-6 text-white group-hover:text-green-500 transition-colors duration-200" />
            </Button>
          ) : (
            <Button
    variant="default"
    size="sm"
    className="
      relative overflow-hidden
      text-white font-medium
      bg-green-600
      hover:bg-green-400
      border border-green-600/30
      shadow-md shadow-green-900/20
      px-4 py-2 rounded-full
      transform transition-all duration-200
      hover:scale-105 hover:shadow-lg hover:shadow-green-900/30
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500
    "
    onClick={() => navigate('/landing')}
  >
    <span className="flex items-center gap-1.5">
      <LogIn className="h-4 w-4" />
      <span>Login / Signup</span>
    </span>
  </Button>
          )}

          <h1 className="text-gray-100 font-semibold text-2xl tracking-wider">
            PSG EVENTS
          </h1>
        </div>
          
        
<div className="search-input-wrapper" style={{ position: 'relative', zIndex: 1001 }}>
          <div >
            <input
              type="text"
              placeholder="Search events..."
              className ="search-input" 
              onChange ={(e) => {handleSearch(e.target.value)}}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}             
            />
          </div>
          {isSearchActive && (
              <div className="search-results">
                <div>
                {
                  Array.from({ length: 10 }).map((_, i) => (
                    <p key={i}>Event {i}</p>
                  ))
                }
            </div>
            
          </div>
            )
          }
          <Button
            variant="ghost"
            size="icon"
            className="
              group
              rounded-full p-2.5
              bg-transparent hover:bg-green-500/15
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2937]
              transition-all duration-200 ease-in-out
            "
          >
            <Search className="h-6 w-6 text-white group-hover:text-green-500 transition-colors duration-200" />
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Header;