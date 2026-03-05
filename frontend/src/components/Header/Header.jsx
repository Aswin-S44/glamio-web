import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  DEFAULT_CUSTOMER_ID,
  DEFAULT_SHOP_ID,
} from "../../constants/constants";

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className={`header ${showHeader ? "show" : "hide"}`}>
        <div className="container header-container">
          <div className="logo" onClick={() => navigate("/")}>
            GLAM<span>IO</span>
          </div>

          <nav className="desktop-nav">
            <a href="/">Home</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
            <button className="book-btn">Book Now</button>

            {!isAuthenticated ? (
              <button
                className="book-btn sign-in"
                onClick={() => navigate("/signup")}
              >
                Sign In
              </button>
            ) : (
              <div className="user-menu-container" ref={dropdownRef}>
                <div className="user-avatar" onClick={toggleDropdown}>
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                {dropdownOpen && (
                  <div className="user-dropdown">
                    {user && user.shop && (
                      <div
                        className="dropdown-item"
                        onClick={() => navigate("/shop/dashboard")}
                      >
                        Dashboard
                      </div>
                    )}
                    <>
                      <div
                        className="dropdown-item"
                        onClick={() => navigate("/profile")}
                      >
                        My Profile
                      </div>
                      <div
                        className="dropdown-item logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </>
                  </div>
                )}
              </div>
            )}
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
          <a href="#home" onClick={toggleMenu}>
            Home
          </a>
          <a href="#services" onClick={toggleMenu}>
            Services
          </a>
          <a href="#gallery" onClick={toggleMenu}>
            Gallery
          </a>
          <a href="#about" onClick={toggleMenu}>
            About
          </a>
          <a href="#contact" onClick={toggleMenu}>
            Contact
          </a>
          {isAuthenticated && (
            <a
              href="#profile"
              onClick={() => {
                navigate("/profile");
                toggleMenu();
              }}
            >
              My Profile
            </a>
          )}
          <button className="sidebar-book-btn">Book Appointment</button>
          {!isAuthenticated ? (
            <button
              className="sidebar-book-btn"
              style={{ marginTop: "10px" }}
              onClick={() => {
                navigate("/signup");
                toggleMenu();
              }}
            >
              Sign In
            </button>
          ) : (
            <button
              className="sidebar-book-btn"
              style={{ marginTop: "10px", background: "#e63946" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Header;
