import React from 'react';
import './EventTabs.css';
interface EventTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EventTabs: React.FC<EventTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
   
    <div className="filters mb-6"> 
      <button
        onClick={() => setActiveTab("upcoming")}
       
        className={`pill ${activeTab === "upcoming" ? "active" : ""}`}
      >
        Upcoming
      </button>
      <button
        onClick={() => setActiveTab("past")}
        className={`pill ${activeTab === "past" ? "active" : ""}`}
      >
        Past Events
      </button>
      <button
        onClick={() => setActiveTab("club")}
        className={`pill ${activeTab === "club" ? "active" : ""}`}
      >
        Club Info
      </button>
      {/* Add the fourth Filter button */}
      <button
        // Add onClick handler if needed for filter functionality
        className="pill" // Not active by default
      >
        Filter
      </button>
    </div>
  );
};

export default EventTabs;