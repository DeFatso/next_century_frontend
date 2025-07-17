import React from "react";
import "../styles/SocialProof.css";

const testimonials = [
  {
    name: "Thandi M.",
    feedback: "Since enrolling my son, his grades have improved drastically. The teachers are supportive and the lessons are easy to follow.",
    image: "/images/parent1.png", // or leave blank for placeholder
    rating: 5,
  },
  {
    name: "David K.",
    feedback: "The flexibility really works for our family. My daughter studies at her own pace and enjoys learning now.",
    image: "/images/parent2.png",
    rating: 4,
  },
  {
    name: "Nomsa R.",
    feedback: "Excellent platform! I love being able to track my child's progress. Highly recommended.",
    image: "/images/parent3.png",
    rating: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="social-proof">
      <h2>Trusted by Thousands of Parents & Students</h2>
      <p className="subtitle">Don’t just take our word for it — see what our community says about us.</p>
      <div className="testimonials">
        {testimonials.map((t, idx) => (
          <div className="testimonial-card" key={idx}>
            <img
              src={t.image}
              alt={t.name}
              className="testimonial-image"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <p className="feedback">“{t.feedback}”</p>
            <p className="name">— {t.name}</p>
            <div className="stars">
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
