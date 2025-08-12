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

    console.log("Submitting:", formData); // Debug log

    try {
      const response = await fetch(`${API_BASE}/applications/apply`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName: formData.parentName,
          email: formData.email,
          childName: formData.childName,
          grade: formData.grade
        }),
      });

      const data = await response.json();
      console.log("Response:", data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setSuccessMsg(data.message || "Application submitted successfully!");
      setFormData({ parentName: "", email: "", childName: "", grade: "" });

    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="application-form-container">
      <form onSubmit={handleSubmit} className="application-form">
        <h2>Apply for Enrollment</h2>

        <div className="form-group">
          <label htmlFor="parentName">Parent Name:</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Parent Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="childName">Child Name:</label>
          <input
            type="text"
            id="childName"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          >
            <option value="">Select Grade</option>
            <option value="Pre-K">Pre-K</option>
            <option value="Kindergarten">Kindergarten</option>
            <option value="1st Grade">1st Grade</option>
            <option value="2nd Grade">2nd Grade</option>
            <option value="3rd Grade">3rd Grade</option>
            <option value="4th Grade">4th Grade</option>
            <option value="5th Grade">5th Grade</option>
            <option value="6th Grade">6th Grade</option>
            <option value="7th Grade">7th Grade</option>
            <option value="8th Grade">8th Grade</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Submit Application
        </button>

        {error && <p className="error-message">❌ {error}</p>}
        {successMsg && <p className="success-message">✅ {successMsg}</p>}
      </form>
    </div>
  );
};

export default ApplicationForm;