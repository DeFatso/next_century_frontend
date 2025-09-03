// components/GradeLessonsManagement.jsx
import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000"; // Moved to top for both components to access

const GradeLessonsManagement = () => {
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    if (selectedGrade) {
      fetchSubjectsForGrade(selectedGrade);
      fetchLessonsForGrade(selectedGrade);
    }
  }, [selectedGrade]);

  const fetchGrades = async () => {
    try {
      const response = await fetch(`${API_BASE}/grades/`);
      const data = await response.json();
      setGrades(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const fetchSubjectsForGrade = async (gradeId) => {
    try {
      const response = await fetch(`${API_BASE}/subjects/grade/${gradeId}`);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchLessonsForGrade = async (gradeId) => {
    try {
      const response = await fetch(`${API_BASE}/lessons/grade/${gradeId}`);
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  return (
    <div className="grade-lessons-management">
      <h2>Grade-Based Lesson Management</h2>

      {/* Grade Selection */}
      <div className="grade-selector">
        <h3>Select Grade</h3>
        <div className="grades-grid">
          {grades.map((grade) => (
            <div
              key={grade.id}
              className={`grade-card ${
                selectedGrade === grade.id ? "selected" : ""
              }`}
              onClick={() => setSelectedGrade(grade.id)}
            >
              <h4>{grade.name}</h4>
              <p>Click to manage lessons</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Grade Content */}
      {selectedGrade && (
        <div className="grade-content">
          <h3>
            Lessons for {grades.find((g) => g.id === selectedGrade)?.name}
          </h3>

          {/* Add New Lesson Button */}
          <button onClick={() => setShowCreateForm(true)}>
            + Add Lesson to {grades.find((g) => g.id === selectedGrade)?.name}
          </button>

          {/* Lessons List */}
          <div className="lessons-grid">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="lesson-card">
                <h4>{lesson.title}</h4>
                <p>Subject: {lesson.subject_name}</p>
                <p>{lesson.content_text?.substring(0, 100)}...</p>
              </div>
            ))}
          </div>

          {/* Create Lesson Form */}
          {showCreateForm && (
            <CreateLessonForm
              gradeId={selectedGrade}
              subjects={subjects}
              onClose={() => setShowCreateForm(false)}
              onSuccess={() => {
                setShowCreateForm(false);
                fetchLessonsForGrade(selectedGrade);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

// Updated CreateLessonForm for specific grade
const CreateLessonForm = ({ gradeId, subjects, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject_id: "",
    content_text: "",
    video_url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Making request to:", `${API_BASE}/lessons/grade/${gradeId}`);

      const response = await fetch(`${API_BASE}/lessons/grade/${gradeId}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa("admin:supersecret")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Lesson created successfully!");
        onSuccess();
      } else {
        throw new Error("Failed to create lesson");
      }
    } catch (error) {
      alert("Error creating lesson: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create Lesson for Grade</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <select
              value={formData.subject_id}
              onChange={(e) =>
                setFormData({ ...formData, subject_id: e.target.value })
              }
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={formData.content_text}
              onChange={(e) =>
                setFormData({ ...formData, content_text: e.target.value })
              }
              required
              rows="5"
            />
          </div>

          <div className="form-group">
            <label>Video URL (optional):</label>
            <input
              type="url"
              value={formData.video_url}
              onChange={(e) =>
                setFormData({ ...formData, video_url: e.target.value })
              }
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Lesson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradeLessonsManagement;
