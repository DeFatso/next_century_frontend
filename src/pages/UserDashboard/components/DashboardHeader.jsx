// DashboardHeader.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";

export default function DashboardHeader({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Performance Dashboard</h1>
        <p className="welcome-message">
          Welcome back, {user?.full_name || "User"}!
        </p>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Log out
      </button>
    </header>
  );
}