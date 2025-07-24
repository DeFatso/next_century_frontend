import React from "react";
import "../styles/DashboardPage.css";

export default function ScheduleSection() {
  return (
    <section className="schedule-section">
      <h3 className="section-title">Schedule</h3>
      <div className="schedule-card">
        <div className="schedule-item">
          <h4>Attendance</h4>
          <div className="attendance-metrics">
            <div className="metric">
              <span className="metric-value">94%</span>
              <span className="metric-label">This Month</span>
            </div>
            <div className="metric">
              <span className="metric-value">89%</span>
              <span className="metric-label">Last Month</span>
            </div>
          </div>
        </div>

        <div className="schedule-item">
          <h4>Announcements</h4>
          <p className="announcement">
            Parent-teacher meetings scheduled for next week
          </p>
          <p className="announcement">
            School closed on Friday for staff training
          </p>
        </div>

        <div className="schedule-item">
          <h4>Participation Metrics</h4>
          <div className="participation-chart">
            <div className="participation-bar" style={{ width: "78%" }}>
              <span>78% Class Participation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
