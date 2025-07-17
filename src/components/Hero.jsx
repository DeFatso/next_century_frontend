import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <h1>
        Significantly <span>Improve</span> Your Child's Performance and Grades
      </h1>
      <p>
        Give your child the tools and guidance they need to succeed in school and beyond.
      </p>
      <div className="hero-buttons">
        <button className="btn btn-primary">How it Works</button>
        <button className="btn btn-secondary">Book a Free Trial</button>
      </div>
    </section>
  );
};

export default Hero;
