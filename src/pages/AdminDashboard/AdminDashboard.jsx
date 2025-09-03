import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import StatsOverview from "./components/StatsOverview";
import AdminTabs from "./components/AdminTabs";
import ApplicationsTable from "./components/ApplicationsTable";
import UsersTable from "./components/UsersTable";
import ContentManagement from "./components/ContentManagement";
import GradeLessonsManagement from "../../components/GradeLessonsManagement";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("applications");

  const API_BASE = "http://localhost:5000";
  const ADMIN_CREDENTIALS = btoa("admin:supersecret");

  const getAuthHeaders = useCallback(() => {
    return {
      Authorization: `Basic ${ADMIN_CREDENTIALS}`,
      "Content-Type": "application/json",
    };
  }, [ADMIN_CREDENTIALS]);

  const fetchApplications = useCallback(async () => {
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
    } finally {
      setLoading(false);
    }
  }, [API_BASE, getAuthHeaders]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin-login");
    else fetchApplications();
  }, [navigate, fetchApplications]);

  const handleApplicationAction = async (id, action) => {
    try {
      const res = await fetch(`${API_BASE}/applications/${id}/${action}`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error(`Failed to ${action} application`);
      alert(`Application ${action}d successfully`);
      fetchApplications();
    } catch (err) {
      alert(err.message);
    }
  };

  // Comment out or remove these unused functions since they're not used in the component
  /*
  const fetchAdminStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return await res.json();
    } catch (err) {
      console.error("Error fetching stats:", err);
      return null;
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      return await res.json();
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete user");
      return await res.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };
  */

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <AdminHeader onLogout={handleLogout} />

      <StatsOverview applicationsCount={applications.length} />

      <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "applications" && (
        <ApplicationsTable
          applications={applications}
          onAction={handleApplicationAction}
        />
      )}

      {activeTab === "users" && <UsersTable />}
      {activeTab === "content" && <ContentManagement />}
      {activeTab === "lessons" && <GradeLessonsManagement />}
    </div>
  );
};

export default AdminDashboard;