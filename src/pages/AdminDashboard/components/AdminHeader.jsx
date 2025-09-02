import React from "react";

const AdminHeader = ({ onLogout }) => {
  return (
    <header className="admin-header">
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;