import React from 'react';
import { User, CalendarClock, FileText, Lock, Mail, HelpCircle, LogOut, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './HamburgerMenu.css';

const HamburgerMenu = ({ onClose }: { onClose?: () => void }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Navigation handlers
  const handleNavigate = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/landing');
    if (onClose) onClose();
  };

  return (
    <div className="hamburgermenu">
      {/* Close button */}
      {onClose && (
        <button 
          className="close-button"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      )}
      
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
        <MenuItem icon={<User />} label="Profile" onClick={() => handleNavigate('/profile')} />
        <MenuItem icon={<CalendarClock />} label="Reminder" />
        <MenuItem icon={<FileText />} label="Registered Events" onClick={() => handleNavigate('/registered-events')} />
        <MenuItem icon={<Lock />} label="Browse All Events" onClick={() => handleNavigate('/upcoming')} />
        <MenuItem icon={<Mail />} label="Inbox" onClick={() => handleNavigate('/notifications')} />
        <MenuItem icon={<HelpCircle />} label="Help" />
      </div>

      {/* Logout */}
      <div className="logout">
        <MenuItem icon={<LogOut />} label="Logout" onClick={handleLogout} />
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