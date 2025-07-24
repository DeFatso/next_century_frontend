import React from "react";
import "../styles/DashboardPage.css";

export default function PerformanceSummary() {
  const weekdayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <section className="performance-summary">
      <div className="performance-card">
        <div className="performance-header">
          <h3>69% + Average Daily Score</h3>
          <div className="mini-calendar">
            <div className="mini-weekdays">
              {weekdayNames.map((day) => (
                <span key={`mini-${day}`}>{day}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="reminder-actions">
          <button className="reminder-btn">Set Daily Reminder</button>
          <p className="reminder-note">
            Reminder after you reached daily limit
          </p>
        </div>
      </div>
    </section>
  );
}
