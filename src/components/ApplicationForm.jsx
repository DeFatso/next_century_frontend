import React, { useState } from "react";
import "../styles/ApplicationForm.css";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    childName: "",
    grade: "",
  });
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const API_BASE = "http://localhost:5000";

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${API_BASE}/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit application");

      setSuccessMsg("Application submitted successfully!");
      setFormData({ parentName: "", email: "", childName: "", grade: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Enrollment</h2>

      <label>
        Parent Name:
        <input
          type="text"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Parent Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Child Name:
        <input
          type="text"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Grade:
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
          placeholder="e.g., Grade 4"
        />
      </label>

      <button type="submit">Submit Application</button>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {successMsg && <p style={{ color: "green" }}>✅ {successMsg}</p>}
    </form>
  );
};

export default ApplicationForm;
