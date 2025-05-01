import React from 'react';
import "../../styles/ClubInfoBackground.css";
import "./ClubInfoPage.css";

const clubs = [
  {
    title: "Cyber Security CSEA",
    desc: "Secure Your Digital Empire's Future.",
    org: "EYE CLUB",
    events: 6,
  },
  {
    title: "Computer Science Engineering Association",
    desc: "Innovate And Code The Future.",
    org: "CSEA",
    events: 5,
  },
  {
    title: "Coding",
    desc: "Build, Collaborate, And Share Code.",
    org: "GITHUB",
    events: 8,
  },
  {
    title: "Entrepreneurship",
    desc: "Launch Your Entrepreneurial Journey.",
    org: "E-CLUB",
    events: 3,
  },
];

const ClubInfoPage: React.FC = () => {
  return (
    <div className="club-info-bg">
      <div className="club-header">
        <button className="back-btn">←</button>
        <h1>Club Info</h1>
      </div>

      <div className="filters">
        <button className="pill active">Upcoming</button>
        <button className="pill">Past Events</button>
        <button className="pill">Club Info</button>
        <button className="pill">Filter</button>
      </div>

      <div className="club-grid">
        {clubs.map((club, index) => (
          <div key={index} className="club-card">
            <div className="org">{club.org}</div>
            <div className="title">{club.title}</div>
            <div className="desc">{club.desc}</div>
            <div className="events">Registration Open Events: {club.events}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubInfoPage;
