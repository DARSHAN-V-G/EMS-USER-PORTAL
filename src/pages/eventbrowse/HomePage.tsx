import React, { useState } from "react";
// Import components
import EventCard from "../../components/EventCard";
import EventTabs from "../../components/EventTabs";
import HeroBanner from "../../components/HeroBanner";
import Header from "../../components/Header"; // Import the new Header component
import './HomePage.css'; // Keep your existing CSS for the background

const events = [
  { id: 1, name: "Event 1", organizer: "Organizer", date: "Date" },
  { id: 2, name: "Event 2", organizer: "Organizer", date: "Date" },
  { id: 3, name: "Event 3", organizer: "Organizer", date: "Date" },
  { id: 4, name: "Event 3", organizer: "Organizer", date: "Date" },
  { id: 5, name: "Event 3", organizer: "Organizer", date: "Date" },
  { id: 6, name: "Event 3", organizer: "Organizer", date: "Date" },
  { id: 7, name: "Event 3", organizer: "Organizer", date: "Date" },
  { id: 8, name: "Event 3", organizer: "Organizer", date: "Date" },
  { id: 9, name: "Event 3", organizer: "Organizer", date: "Date" },
];

// Main HomePage Component
const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    // Keep your existing container and background structure
    <div className="home-container">
      <div className="home-background"></div> {/* This holds the background + ::after pseudo-element */}

      {/* Content Area */}
      <div className="home-content relative z-10 w-full h-full overflow-y-auto">
        
        {/* Use the Header component */}
        <Header />

        {/* Main Content Body */}
        <main className="px-4 pt-4 pb-8 max-w-[1200px] mx-auto">
          {/* 1. Hero Banner - Pass an image URL */}
          <HeroBanner 
            image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80" 
            overlayText={{
              title: "Infinitum",
              subtitle: "An Intra-college event",
              link: "https://example.com",
            }}
          />
          
          {/* 2. Event Tabs */}
          <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="filters mb-6"></div>
          <div className="filters mb-6"></div>
          {/* 3. Events Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6 relative z-10 pb-8">
            {events.map((event, index) => (
              // Remove transform rotations and add wrapper for better spacing
              <div key={event.id} className="event-card-wrapper">
                <EventCard event={event} />
              </div>
            ))}
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default HomePage;