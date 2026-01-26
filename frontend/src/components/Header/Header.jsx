import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header className={`header ${showHeader ? "show" : "hide"}`}>
        <div className="container header-container">
          <div className="logo"  onClick={() => navigate("/")}>
            GLAM<span>OUR</span>
          </div>

          <nav className="desktop-nav">
            <a href="/">Home</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
            <button className="book-btn">Book Now</button>
            <button
              className="book-btn sign-in"
              onClick={() => navigate("/signup")}
            >
              Sign In
            </button>
          </nav>

          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </header>

      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={toggleMenu}
      ></div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            GLAM<span>OUR</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <a href="#home" onClick={toggleMenu}>Home</a>
          <a href="#services" onClick={toggleMenu}>Services</a>
          <a href="#gallery" onClick={toggleMenu}>Gallery</a>
          <a href="#about" onClick={toggleMenu}>About</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
          <button className="sidebar-book-btn">Book Appointment</button>
        </nav>
      </aside>
    </>
  );
}

export default Header;
