import React from "react";

const UsersTable = () => {
  const mockUsers = [
    { id: 1, full_name: "John Doe", email: "john@example.com", role: "student", grade: "Grade 1" },
    { id: 2, full_name: "Jane Smith", email: "jane@example.com", role: "student", grade: "Grade 2" },
    { id: 3, full_name: "Admin User", email: "admin@example.com", role: "admin", grade: null }
  ];

  return (
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
  );
};

export default UsersTable;