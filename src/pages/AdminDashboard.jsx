import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:5000";
  const ADMIN_CREDENTIALS = btoa("admin:supersecret"); // Base64 encoded

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin-login");
    else fetchApplications();
  }, [navigate]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/applications/?status=pending`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${ADMIN_CREDENTIALS}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`${API_BASE}/applications/${id}/${action}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${ADMIN_CREDENTIALS}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Failed to ${action} application`);
      alert(`Application ${action}d successfully`);
      fetchApplications();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <section>
        <h2>Pending Applications</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {!loading &&
          !error &&
          (applications.length === 0 ? (
            <p>No pending applications</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Parent</th>
                  <th>Child</th>
                  <th>Grade</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.parent_name}</td>
                    <td>{app.child_name}</td>
                    <td>{app.grade}</td>
                    <td>{app.parent_email}</td>
                    <td>
                      <button onClick={() => handleAction(app.id, "approve")}>
                        Approve
                      </button>
                      <button onClick={() => handleAction(app.id, "reject")}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
