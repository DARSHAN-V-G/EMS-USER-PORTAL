import React from 'react';
import { User, CalendarClock, FileText, Lock, Mail, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './HamburgerMenu.css'; // <--- Import the CSS

const HamburgerMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleRegisteredEventsClick = () => {
    navigate('/registered-events');
  };

  const handleLogout = () => {
    logout(); // This will clear the token and set isAuthenticated to false
    navigate('/landing');
  };

  return (
    <div className="page-wrapper">
    <div className="hamburgermenu">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar">
          <User />
        </div>
        <h2 className="profile-name">StudentName</h2>
        <div className="stats">
  
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu">
        <MenuItem icon={<User />} label="Profile" />
        <MenuItem icon={<CalendarClock />} label="Reminder" />
        <MenuItem icon={<FileText />} label="Registered Events" onClick={handleRegisteredEventsClick} />
        <MenuItem icon={<Lock />} label="Browse All Events" onClick={() => navigate('/upcoming')} />
        <MenuItem icon={<Mail />} label="Inbox" onClick={() => navigate('/notifications')} />
        <MenuItem icon={<HelpCircle />} label="Help" />
      </div>

      {/* Logout */}
      <div className="logout">
        <MenuItem icon={<LogOut />} label="Logout" onClick={handleLogout} />
      </div>
    </div>
  </div>
  );
};

const MenuItem = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) => (
  <div className="menu-item" onClick={onClick}>
    <div className="menu-left">
      {icon}
      <span className="menu-label">{label}</span>
    </div>
    <ChevronRight />
  </div>
);

export default HamburgerMenu;