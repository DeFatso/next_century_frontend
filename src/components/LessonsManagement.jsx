import React, { useState, useEffect } from "react";

const LessonsManagement = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);

    const API_BASE = "http://localhost:5000";
    const ADMIN_CREDENTIALS = btoa("admin:supersecret");

    const getAuthHeaders = () => {
        return {
            Authorization: `Basic ${ADMIN_CREDENTIALS}`,
            "Content-Type": "application/json",
        };
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            const response = await fetch(`${API_BASE}/lessons/`);
            if (!response.ok) throw new Error("Failed to fetch lessons");
            const data = await response.json();
            setLessons(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        if (!window.confirm("Are you sure you want to delete this lesson?")) return;

        try {
            const response = await fetch(`${API_BASE}/lessons/${lessonId}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (!response.ok) throw new Error("Failed to delete lesson");

            alert("Lesson deleted successfully");
            fetchLessons(); // Refresh the list
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div className="loading">Loading lessons...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <section className="lessons-management">
            <div className="lessons-header">
                <h2>Lesson Management ({lessons.length} lessons)</h2>
                <button
                    className="primary-btn"
                    onClick={() => setShowCreateForm(true)}
                >
                    + Add New Lesson
                </button>
            </div>

            {showCreateForm && (
                <CreateLessonForm
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={() => {
                        setShowCreateForm(false);
                        fetchLessons();
                    }}
                />
            )}

            {editingLesson && (
                <EditLessonForm
                    lesson={editingLesson}
                    onClose={() => setEditingLesson(null)}
                    onSuccess={() => {
                        setEditingLesson(null);
                        fetchLessons();
                    }}
                />
            )}

            <div className="lessons-grid">
                {lessons.map((lesson) => (
                    <div key={lesson.id} className="lesson-card">
                        <div className="lesson-header">
                            <h3>{lesson.title}</h3>
                            <span className="lesson-grade">{lesson.grade_name}</span>
                        </div>

                        <div className="lesson-details">
                            <p><strong>Subject:</strong> {lesson.subject_name}</p>
                            <p><strong>Created:</strong> {new Date(lesson.created_at).toLocaleDateString()}</p>
                            {lesson.video_url && (
                                <p><strong>Video:</strong> Available</p>
                            )}
                        </div>

                        <div className="lesson-content">
                            <p>{lesson.content_text?.substring(0, 100)}...</p>
                        </div>

                        <div className="lesson-actions">
                            <button
                                className="edit-btn"
                                onClick={() => setEditingLesson(lesson)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteLesson(lesson.id)}
                            >
                                Delete
                            </button>
                            <button className="view-btn">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {lessons.length === 0 && (
                <div className="empty-state">
                    <h3>No lessons found</h3>
                    <p>Create your first lesson to get started!</p>
                </div>
            )}
        </section>
    );
};

// Create Lesson Form Component
const CreateLessonForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: "",
        subject_id: "",
        content_text: "",
        video_url: ""
    });
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await fetch("http://localhost:5000/subjects");
            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/lessons/", {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa("admin:supersecret")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to create lesson");

            alert("Lesson created successfully!");
            onSuccess();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Create New Lesson</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject:</label>
                        <select
                            value={formData.subject_id}
                            onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, content_text: e.target.value })}
                            required
                            rows="5"
                        />
                    </div>

                    <div className="form-group">
                        <label>Video URL (optional):</label>
                        <input
                            type="url"
                            value={formData.video_url}
                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Lesson"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Edit Lesson Form Component (similar to CreateLessonForm)
const EditLessonForm = ({ lesson, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: lesson.title,
        subject_id: lesson.subject_id,
        content_text: lesson.content_text,
        video_url: lesson.video_url || ""
    });
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await fetch("http://localhost:5000/subjects");
            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/lessons/${lesson.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Basic ${btoa("admin:supersecret")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update lesson");

            alert("Lesson updated successfully!");
            onSuccess();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Edit Lesson</h3>
                <form onSubmit={handleSubmit}>
                    {/* Same form fields as CreateLessonForm */}
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject:</label>
                        <select
                            value={formData.subject_id}
                            onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, content_text: e.target.value })}
                            required
                            rows="5"
                        />
                    </div>

                    <div className="form-group">
                        <label>Video URL (optional):</label>
                        <input
                            type="url"
                            value={formData.video_url}
                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Lesson"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LessonsManagement;