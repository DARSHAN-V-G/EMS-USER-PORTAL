import React, { useState, useEffect, useRef } from "react";
import { MenuIcon, Search, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthContext";
import "./Header.css"
import HamburgerMenu from "../pages/Auth/HamburgerMenu"; // Add this import
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
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // State to control menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Simpler logic to check if we clicked outside the menu
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Don't close if we clicked the menu button itself (let the toggle handle that)
        if (!(event.target as Element).closest('.menu-button')) {
          console.log('Closing menu from outside click');
          setIsMenuOpen(false);
        }
      }
    }
    
    // Add click listener to document (not mousedown)
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isMenuOpen]);

  // Fetch all events when component mounts
  useEffect(() => {
    const fetchAllEvents = async () => {
      setIsLoading(true);
      
      try {
        // Fetch from all three endpoints
        const endpoints = [
          `${URL}/user/events/upcoming`,
          `${URL}/user/events/past`,
          `${URL}/user/events/ongoing`
        ];
        
        const responses = await Promise.all(
          endpoints.map(endpoint => 
            fetch(endpoint, {
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            })
          )
        );
        
        // Check if any response failed
        const hasError = responses.some(res => !res.ok);
        if (hasError) {
          throw new Error("One or more API requests failed");
        }
        
        // Parse JSON from all responses
        const jsonData = await Promise.all(
          responses.map(res => res.json())
        );
        
        // Combine all events from different endpoints
        const combinedEvents = jsonData.flatMap(data => 
          data.data && Array.isArray(data.data) ? data.data : []
        ).map((event: Event) => ({
          ...event,
          organizer: event.club_name
        }));

        console.log('Total events fetched:', combinedEvents.length);
        setAllEvents(combinedEvents);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllEvents();
  }, []);

  // Handle search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filteredResults = allEvents.filter(event => 
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.club_name.toLowerCase().includes(query.toLowerCase()) ||
      event.event_type.toLowerCase().includes(query.toLowerCase()) ||
      event.venue.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };
  
  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigate to event details
  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
    setIsSearchActive(false);
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex justify-center w-full bg-[#1f2937]/85 backdrop-blur-xl shadow-lg border-b border-gray-700/50">
      <header className="flex items-center justify-between w-full max-w-[1200px] px-4 py-3">
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="icon"
              className="
                menu-button 
                group
                rounded-full p-2.5
                bg-transparent hover:bg-green-500/15
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2937]
                transition-all duration-200 ease-in-out
              "
              onClick={toggleMenu}
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

          <h1 className="text-gray-100 font-semibold text-2xl tracking-wider"
          onClick={() => navigate('/upcoming')}
          >            PSG EVENTS
          </h1>
        </div>
          
        <div className="search-input-wrapper" ref={searchRef} style={{ position: 'relative', zIndex: 1001 }}>
          <div>
            <input
              type="text"
              placeholder="Search events..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchActive(true)}
            />
          </div>
          
          {isSearchActive && (
            <div className="search-results">
              {isLoading ? (
                <p>Loading events...</p>
              ) : searchQuery.trim() === "" ? (
                <p>Type to search events</p>
              ) : searchResults.length === 0 ? (
                <p>No events found</p>
              ) : (
                <div>
                  {searchResults.slice(0, 10).map((event) => (
                    <div 
                      key={event.id}
                      onClick={() => handleEventClick(event.id)}
                      style={{ 
                        cursor: 'pointer', 
                        padding: '8px', 
                        borderBottom: '1px solid #ccc'
                      }}
                    >
                      <p style={{ fontWeight: 'bold' }}>{event.name}</p>
                      <p style={{ fontSize: '12px' }}>
                        {event.club_name} • {event.venue}
                      </p>
                    </div>
                  ))}
                  
                  {searchResults.length > 10 && (
                    <p style={{ textAlign: 'center', fontSize: '12px', padding: '8px' }}>
                      + {searchResults.length - 10} more results
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          
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
      
      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef} // This ref must be here
          className="menu-container"
        >
          <HamburgerMenu onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Header;

