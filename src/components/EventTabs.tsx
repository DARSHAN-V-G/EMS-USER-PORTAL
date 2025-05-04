import React from 'react';
import './EventTabs.css'; // Make sure this line is present and correct

interface EventTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EventTabs: React.FC<EventTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    // Removed mb-6 here as it's now in the CSS, but you can keep it if preferred
    <div className="filters"> 
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
      <button
        className="pill" 
      >
        Filter
      </button>
    </div>
  );
};

export default EventTabs;