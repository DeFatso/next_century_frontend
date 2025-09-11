import React from "react";
import "../styles/DashboardPage.css";

export default function PerformanceSummary({ performanceData }) {
  // Calculate average grade if available
  const gradedSubmissions = performanceData?.recent_activity?.filter(
    activity => activity.grade !== null
  ) || [];
  
  const averageGrade = gradedSubmissions.length > 0
    ? gradedSubmissions.reduce((sum, activity) => sum + activity.grade, 0) / gradedSubmissions.length
    : null;

  return (
    <section className="performance-summary">
      <div className="performance-card">
        <div className="performance-header">
          <h3>
            {averageGrade ? `${averageGrade.toFixed(1)}% Average Score` : "No grades yet"}
          </h3>
          <div className="performance-stats">
            <p>Assignments: {performanceData?.upcoming_assignments?.length || 0}</p>
            <p>Submitted: {performanceData?.recent_activity?.length || 0}</p>
            <p>Graded: {gradedSubmissions.length}</p>
          </div>
        </div>
      </div>
    </section>
  );
}