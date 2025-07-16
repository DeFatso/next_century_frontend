import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Please log in to view your dashboard</h2>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user.full_name}!</h2>
      <p>Your role: {user.role}</p>
      <p>Your email: {user.email}</p>
    </div>
  );
}
