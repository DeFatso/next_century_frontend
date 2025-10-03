import React, { useEffect, useState } from "react";
import "./styles/TeacherDashboard.css";
import LessonCard from "./components/LessonCard";
import DashboardHeader from "../UserDashboard/components/DashboardHeader";

const TeacherDashboard = () => {
    const [teacher, setTeacher] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch teacher dashboard data
        fetch("http://127.0.0.1:5000/teacher/dashboard/9") // later replace with logged-in teacher ID
            .then((res) => res.json())
            .then((data) => {
                setTeacher(data.teacher || {});
                setLessons(data.teacher?.lessons || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching dashboard data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading dashboard...</div>;

    return (
        <div className="teacher-dashboard">
            <DashboardHeader title="Teacher Dashboard" />

            {teacher && (
                <div className="teacher-info">
                    <h2>Welcome, {teacher.full_name}</h2>
                    <p>Email: {teacher.email}</p>
                </div>
            )}

            <h3>Your Lessons</h3>
            <div className="lessons-grid">
                {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))
                ) : (
                    <p className="empty-state">No lessons found. Start by creating one!</p>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
