import React from "react";
import "../styles/DashboardPage.css"; // Optional

export default function ProfileCard({ user }) {
  return (
    <section className="profile-card">
      <div className="profile-header">
        <img
          src={user.profile_photo || "/images/default_profile_picture.png"}
          alt="Profile"
          className="profile-photo"
        />
        <div className="profile-info">
          <h2>{user.full_name}</h2>
          <p className="user-email">{user.email}</p>
          <p className="user-grade">
            Grade: {user.grade_name || user.grade_id || "N/A"}
          </p>
        </div>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Member Since:</span>
          <span className="detail-value">
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Last Login:</span>
          <span className="detail-value">Today</span>
        </div>
      </div>
    </section>
  );
}
