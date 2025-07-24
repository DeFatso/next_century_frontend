import React from "react";
import "../styles/DashboardPage.css";

export default function ResourcesSection() {
  return (
    <section className="resources-section">
      <h3 className="section-title">Resources</h3>
      <div className="resources-card">
        <h4>Average Test Scores by Month</h4>
        <div className="score-grid">
          <div className="score-category">
            <span className="score-label">Last Year</span>
            <span className="score-value">82%</span>
          </div>
          <div className="score-category">
            <span className="score-label">Late Submissions</span>
            <span className="score-value">18%</span>
          </div>
          <div className="score-category">
            <span className="score-label">On Time Submissions</span>
            <span className="score-value">82%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
