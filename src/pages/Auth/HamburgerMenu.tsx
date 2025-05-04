import React from 'react';
import { User, CalendarClock, FileText, Lock, Mail, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import './HamburgerMenu.css'; // <--- Import the CSS

const HamburgerMenu = () => {
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
        <MenuItem icon={<FileText />} label="Registered Events" />
        <MenuItem icon={<Lock />} label="Browse All Events" />
        <MenuItem icon={<Mail />} label="Inbox" />
        <MenuItem icon={<HelpCircle />} label="Help" />
      </div>

      {/* Logout */}
      <div className="logout">
        <MenuItem icon={<LogOut />} label="Logout" />
      </div>
    </div>
  </div>
  );
};

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="menu-item">
    <div className="menu-left">
      {icon}
      <span className="menu-label">{label}</span>
    </div>
    <ChevronRight />
  </div>
);

export default HamburgerMenu;
