import { Link, useLocation } from 'react-router-dom';

interface EventTabsProps {
  onFilterClick: () => void;
}

const EventTabs: React.FC<EventTabsProps> = ({ onFilterClick }) => {
  const location = useLocation();
  const path = location.pathname;

  // Helper to determine if a tab is active
  const isActive = (tabPath: string) => path.includes(tabPath);

  // Preserve search params for filters
  const searchParams = location.search;

  return (
    <div className="filters">
      <Link
        to={`/upcoming${searchParams}`}
        className={`pill ${isActive("upcoming") ? "active" : ""}`}
      >
        Upcoming
      </Link>
      <Link
        to={`/past${searchParams}`}
        className={`pill ${isActive("past") ? "active" : ""}`}
      >
        Past Events
      </Link>
      <Link
        to={`/club${searchParams}`}
        className={`pill ${isActive("club") ? "active" : ""}`}
      >
        Club Info
      </Link>
      <Link
        to={`/registered-events${searchParams}`}
        className={`pill ${isActive("registered-events") ? "active" : ""}`}
      >
        Registered Events
      </Link>
      <button
        className="pill"
        onClick={onFilterClick}
      >
        Filter
      </button>
    </div>
  );
};
export default EventTabs;