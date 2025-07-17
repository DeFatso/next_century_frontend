import React from "react";
import "../styles/HowItWorks.css";

const steps = [
  {
    title: "Sign Up",
    description: "Create your free account and provide your child’s details to get started.",
    icon: "📝", // replace with image if desired
  },
  {
    title: "Choose a Grade",
    description: "Select the grade level and subjects that match your child’s needs.",
    icon: "🎓",
  },
  {
    title: "Start Learning",
    description: "Access lessons, practice exercises, and track progress anytime, anywhere.",
    icon: "💻",
  },
  {
    title: "Get Support",
    description: "Our teachers and support team are here to help every step of the way.",
    icon: "🤝",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <p className="subtitle">Simple steps to enroll & start learning with ease.</p>
      <div className="steps">
        {steps.map((step, idx) => (
          <div className="step-card" key={idx}>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
