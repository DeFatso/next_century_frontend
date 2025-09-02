import React from "react";

const ApplicationsTable = ({ applications, onAction }) => {
  if (applications.length === 0) {
    return (
      <section className="applications-section">
        <h2>Pending Applications</h2>
        <p>No pending applications 🎉</p>
      </section>
    );
  }

  return (
    <section className="applications-section">
      <h2>Pending Applications ({applications.length})</h2>
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
                    onClick={() => onAction(app.id, "approve")}
                  >
                    Approve
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => onAction(app.id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApplicationsTable;