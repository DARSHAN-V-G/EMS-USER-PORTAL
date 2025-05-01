import React from 'react';
import './HeroBanner.css';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  image?: string;
  overlayText?: {
    title?: string;
    subtitle?: string;
    link?: string;
  };
  children?: React.ReactNode;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ children, image, overlayText }) => {
  return (
    <div className="carousel-card">
      {image ? (
        <div className="relative">
          <img src={image} alt="carousel visual" className="carousel-image" />
          {overlayText && (
            <div className="absolute inset-0 bg-gradient-overlay flex flex-col justify-center items-center text-white p-6">
              {overlayText.title && <h2 className="carousel-title">{overlayText.title}</h2>}
              {overlayText.subtitle && <p className="carousel-subtitle">{overlayText.subtitle}</p>}
              {overlayText.link && <Link to={overlayText.link} className="carousel-subtitle  text-emerald-300">Learn more</Link>}
            </div>
          )}
        </div>
      ) : (
        <div className="carousel-content">
          {children || (
            <>
              <h2 className="carousel-title">Flagship event</h2>
              <p className="carousel-subtitle">(carousel)</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
