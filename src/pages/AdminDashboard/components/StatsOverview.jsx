import React from "react";

const StatsOverview = ({ applicationsCount }) => {
  const stats = {
    total_users: 15,
    pending_applications: applicationsCount,
    active_students: 12,
    total_lessons: 20
  };

  return (
    <section className="stats-overview">
      <h2>Platform Overview</h2>
      <div className="stats-grid">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{value}</h3>
            <p>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsOverview;