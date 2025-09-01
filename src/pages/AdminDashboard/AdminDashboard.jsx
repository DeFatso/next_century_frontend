import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("applications");

  const API_BASE = "http://localhost:5000";
  const ADMIN_CREDENTIALS = btoa("admin:supersecret"); // Base64 encoded

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin-login");
    else fetchApplications();
  }, [navigate]);

  // Get auth headers with Basic Authentication
  const getAuthHeaders = () => {
    return {
      Authorization: `Basic ${ADMIN_CREDENTIALS}`,
      "Content-Type": "application/json",
    };
  };

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/applications/?status=pending`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationAction = async (id, action) => {
    try {
      const res = await fetch(`${API_BASE}/applications/${id}/${action}`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error(`Failed to ${action} application`);
      
      const result = await res.json();
      alert(`Application ${action}d successfully: ${result.message}`);
      fetchApplications(); // Refresh data
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  // Mock data for other sections
  const mockStats = {
    total_users: applications.length + 5, // Dynamic based on actual data
    pending_applications: applications.length,
    total_assignments: 8,
    active_students: 12,
    total_lessons: 20
  };

  const mockUsers = [
    { id: 1, full_name: "John Doe", email: "john@example.com", role: "student", grade: "Grade 1" },
    { id: 2, full_name: "Jane Smith", email: "jane@example.com", role: "student", grade: "Grade 2" },
    { id: 3, full_name: "Admin User", email: "admin@example.com", role: "admin", grade: null }
  ];

  if (loading) {
    return (
      <div className="admin-dashboard">
        <header>
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </header>
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <header>
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </header>
        <div className="error">
          Error: {error}
          <br />
          <button onClick={fetchApplications} style={{marginTop: '10px'}}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {/* Statistics Overview */}
      <section className="stats-overview">
        <h2>Platform Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{mockStats.total_users}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h3>{applications.length}</h3>
            <p>Pending Applications</p>
          </div>
          <div className="stat-card">
            <h3>{mockStats.active_students}</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <h3>{mockStats.total_lessons}</h3>
            <p>Total Lessons</p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="admin-tabs">
        <button 
          className={activeTab === "applications" ? "active" : ""}
          onClick={() => setActiveTab("applications")}
        >
          Applications ({applications.length})
        </button>
        <button 
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button 
          className={activeTab === "content" ? "active" : ""}
          onClick={() => setActiveTab("content")}
        >
          Content
        </button>
      </nav>

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <section className="applications-section">
          <h2>Pending Applications</h2>
          
          {applications.length === 0 ? (
            <p>No pending applications 🎉</p>
          ) : (
            <div className="table-container">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Parent Name</th>
                    <th>Email</th>
                    <th>Child Name</th>
                    <th>Grade</th>
                    <th>Applied On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.parent_name}</td>
                      <td>{app.parent_email}</td>
                      <td>{app.child_name}</td>
                      <td>{app.grade}</td>
                      <td>{new Date(app.created_at).toLocaleDateString()}</td>
                      <td className="actions">
                        <button 
                          className="approve-btn"
                          onClick={() => handleApplicationAction(app.id, "approve")}
                        >
                          Approve
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleApplicationAction(app.id, "reject")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Users Tab - Mock data for now */}
      {activeTab === "users" && (
        <section className="users-section">
          <h2>User Management</h2>
          <p className="mock-notice">⚠️ User management coming soon. This is mock data.</p>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.grade || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Content Tab - Mock data for now */}
      {activeTab === "content" && (
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
      )}
    </div>
  );
};

export default AdminDashboard;