import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <section className="hero-banner">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">Welcome to Luxury</span>
        <h1 className="hero-title">
          Unveil Your <br />
          <span>Natural Radiance</span>
        </h1>
        <p className="hero-description">
          Experience the ultimate rejuvenation with our expert stylists and
          premium organic treatments tailored just for you.
        </p>
        <div className="hero-btns">
          <button className="primary-btn">Book Appointment</button>
          <button className="secondary-btn">View Services</button>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section>
  );
}

export default Banner;
