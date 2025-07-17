import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/images/logo01.png" alt="Next Century Ed" />
          <p>Helping every child reach their full potential through online learning.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Grades</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {/* Replace placeholders with your own icons/images */}
            <a href="#"><img src="/images/facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="/images/twitter.png" alt="Twitter" /></a>
            <a href="#"><img src="/images/instagram.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Next Century Ed. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
