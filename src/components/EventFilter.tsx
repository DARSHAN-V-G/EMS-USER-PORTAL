import React, { useState } from 'react';
import './EventFilter.css';

// Available filter options based on your data
const EVENT_TYPES = [
  "All",
  "Technical",
  "Cultural",
  "Academic",
  "Sports",
  "Professional",
  "Social",
  "Entrepreneurship"
];

interface EventFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

export interface FilterOptions {
  eventType: string;
}

const EventFilter: React.FC<EventFilterProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters
}) => {
  const [selectedEventType, setSelectedEventType] = useState<string>(initialFilters.eventType || "All");

  const handleApply = () => {
    onApplyFilters({
      eventType: selectedEventType
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-overlay">
      <div className="filter-modal">
        <div className="filter-header">
          <h2>Filter Events</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="filter-section">
          <h3>Event Type</h3>
          <div className="filter-options">
            {EVENT_TYPES.map(type => (
              <button
                key={type}
                className={`filter-pill ${selectedEventType === type ? 'active' : ''}`}
                onClick={() => setSelectedEventType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-actions">
          <button className="reset-button" onClick={() => setSelectedEventType("All")}>
            Reset
          </button>
          <button className="apply-button" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;