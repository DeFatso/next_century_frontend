import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TeacherDashboard.css";
import LessonCard from "./components/LessonCard";
import DashboardHeader from "../UserDashboard/components/DashboardHeader";

const TeacherDashboard = () => {
    const [teacher, setTeacher] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Get teacher from localStorage
        const storedTeacher = JSON.parse(localStorage.getItem("teacher"));
        
        if (!storedTeacher) {
            navigate("/teacher-login");
            return;
        }

        setTeacher(storedTeacher);

        // Fetch teacher lessons using the actual teacher ID
        fetch(`http://127.0.0.1:5000/teacher/dashboard/${storedTeacher.id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch dashboard data");
                }
                return res.json();
            })
            .then((data) => {
                // Your backend returns: {"teacher_id": X, "lessons": [...]}
                setLessons(data.lessons || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching dashboard data:", err);
                setLoading(false);
            });
    }, [navigate]);

    if (loading) return <div className="loading">Loading dashboard...</div>;

    return (
        <div className="teacher-dashboard">
            <DashboardHeader 
                title="Teacher Dashboard" 
                user={teacher} 
            />

            {teacher && (
                <div className="teacher-info">
                    <h2>Welcome, {teacher.full_name}</h2>
                    <p>Email: {teacher.email}</p>
                    <p>Teacher ID: {teacher.id}</p>
                </div>
            )}

            <div className="lessons-section">
                <div className="section-header">
                    <h3>Your Lessons</h3>
                    <button 
                        className="add-lesson-btn"
                        onClick={() => {/* Add lesson functionality */}}
                    >
                        + Add New Lesson
                    </button>
                </div>
                
                <div className="lessons-grid">
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <LessonCard key={lesson.id} lesson={lesson} />
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>No lessons found.</p>
                            <p>Start by creating your first lesson!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;