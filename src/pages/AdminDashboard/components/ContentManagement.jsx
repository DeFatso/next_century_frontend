import React from "react";

const ContentManagement = () => {
  const mockStats = {
    total_lessons: 20,
    total_assignments: 8
  };

  return (
    <section className="content-section">
      <h2>Content Management</h2>
      <p className="mock-notice">⚠️ Content management coming soon.</p>
      <div className="content-stats">
        <div className="content-stat">
          <h3>{mockStats.total_lessons}</h3>
          <p>Total Lessons</p>
        </div>
        <div className="content-stat">
          <h3>{mockStats.total_assignments}</h3>
          <p>Total Assignments</p>
        </div>
      </div>
    </section>
  );
};

export default ContentManagement;