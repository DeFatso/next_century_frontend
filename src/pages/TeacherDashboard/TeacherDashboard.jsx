import React, { useEffect, useState } from "react";
import "./styles/TeacherDashboard.css";
import LessonCard from "./components/LessonCard";
import DashboardHeader from "../UserDashboard/components/DashboardHeader";

const TeacherDashboard = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch lessons from backend
        fetch("http://127.0.0.1:5000/teacher/dashboard/9") // replace 9 with logged-in teacher ID
            .then((res) => res.json())
            .then((data) => {
                setLessons(data.lessons || []); 
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching lessons:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading lessons...</div>;

    return (
        <div className="teacher-dashboard">
            <DashboardHeader title="Teacher Dashboard" />
            <h1>Teacher Dashboard</h1>
            <div className="lessons-grid">
                {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))
                ) : (
                    <p>No lessons found.</p>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
