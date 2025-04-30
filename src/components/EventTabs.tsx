import React from 'react';
import { Button } from './ui/button'; // Adjust path if needed

interface EventTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EventTabs: React.FC<EventTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3 relative items-start mb-6"> {/* Added margin-bottom */} 
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2"> 
        <Button
          onClick={() => setActiveTab("upcoming")}
          className={`transform -rotate-[3deg] rounded-xl px-5 py-2 text-sm font-medium transition-colors ${
            activeTab === "upcoming"
              ? "bg-[#4CC35E] text-white hover:bg-[#4CC35E]/90"
              : "bg-[#558985] text-white hover:bg-[#558985]/90"
          }`}
        >
          Upcoming
        </Button>
        <Button
          onClick={() => setActiveTab("past")}
          className={`transform rotate-[3deg] rounded-xl px-5 py-2 text-sm font-medium transition-colors ${
            activeTab === "past"
              ? "bg-[#4CC35E] text-white hover:bg-[#4CC35E]/90"
              : "bg-[#558985] text-white hover:bg-[#558985]/90"
          }`}
        >
          Past Events
        </Button>
        <Button
          onClick={() => setActiveTab("club")}
          className={`transform -rotate-[3deg] rounded-xl px-5 py-2 text-sm font-medium transition-colors ${
            activeTab === "club"
              ? "bg-[#4CC35E] text-white hover:bg-[#4CC35E]/90"
              : "bg-[#558985] text-white hover:bg-[#558985]/90"
          }`}
        >
          Club info
        </Button>
      </div>

      {/* Filter Button (Styled Span) */}
      <span
        // Add onClick handler for filter functionality if needed
        className="absolute right-0 top-0 md:relative md:right-auto md:top-auto bg-[#558985] text-white px-6 py-2 text-sm rounded-xl cursor-pointer transform rotate-[3deg] hover:bg-[#558985]/90 transition-colors"
      >
        Filter
      </span>
    </div>
  );
};

export default EventTabs;
