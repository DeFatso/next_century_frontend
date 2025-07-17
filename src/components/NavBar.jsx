import React, { useState } from "react";
import "../styles/NavBar.css";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/images/logo.png" alt="Next Century Ed" />
        </div>
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="/grades">Grades</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/contact">Contact</a>
          <button className="enroll-btn">Enroll Now</button>
        </nav>
        <div
          className="hamburger"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </div>
      </div>
    </header>
  );
};

export default NavBar;
