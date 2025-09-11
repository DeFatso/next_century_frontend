import React from "react";
import "../styles/DashboardPage.css";

export default function ScheduleSection({ upcomingAssignments, recentActivity }) {
  return (
    <section className="schedule-section">
      <h3 className="section-title">Upcoming Assignments</h3>
      
      {upcomingAssignments.length === 0 ? (
        <p>No upcoming assignments</p>
      ) : (
        <div className="assignments-list">
          {upcomingAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-item">
              <h4>{assignment.title}</h4>
              <p>Due: {assignment.due_date}</p>
              {/* Make subject optional */}
              {assignment.subject && <p>Subject: {assignment.subject}</p>}
              {assignment.days_until_due && <p>Days left: {assignment.days_until_due}</p>}
            </div>
          ))}
        </div>
      )}

      <h3 className="section-title">Recent Activity</h3>
      
      {recentActivity.length === 0 ? (
        <p>No recent activity</p>
      ) : (
        <div className="activity-list">
          {recentActivity.map((activity) => (
            <div key={activity.assignment_id} className="activity-item">
              <h4>{activity.title}</h4>
              <p>Submitted: {activity.submitted_at}</p>
              <p>Grade: {activity.grade ? `${activity.grade}%` : "Not graded yet"}</p>
              {/* Make subject optional */}
              {activity.subject && <p>Subject: {activity.subject}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}