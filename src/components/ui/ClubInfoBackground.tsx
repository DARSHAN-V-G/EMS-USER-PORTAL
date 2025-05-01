const ClubInfoBackground = () => {
  return (
    <div className="club-info-wrapper">
      <svg className="club-bg-svg" viewBox="0 0 375 812" preserveAspectRatio="none">
        <polygon
          points="0,600 375,500 375,812 0,812"
          fill="#38EF7D"
          opacity="1"
        />
        <polygon
          points="0,700 375,600 375,812 0,812"
          fill="#38EF7D"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default ClubInfoBackground;
