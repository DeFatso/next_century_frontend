import React from "react";
import "../styles/Benefits.css";
const Benefits = () => {
  return (
    <section className="benefits">
      <h2>Why Choose Our School?</h2>
      <p className="subtitle">
        We’re committed to helping every child reach their full potential through personalized, engaging online education.
      </p>
      <div className="benefit-cards">
        <div className="card">
          {/* Icon/Image: A teacher with a laptop */}
          <div className="icon-placeholder">📚</div>
          <h3>Expert Teachers</h3>
          <p>Learn from highly qualified, experienced educators who care about your child’s success.</p>
        </div>
        <div className="card">
          {/* Icon/Image: A clock or calendar */}
          <div className="icon-placeholder">⏰</div>
          <h3>Flexible Schedule</h3>
          <p>Study anytime, anywhere, at a pace that works for your family’s lifestyle and needs.</p>
        </div>
        <div className="card">
          {/* Icon/Image: A chart with an upward arrow */}
          <div className="icon-placeholder">📈</div>
          <h3>Proven Results</h3>
          <p>See measurable improvements in your child’s performance and confidence in just weeks.</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
