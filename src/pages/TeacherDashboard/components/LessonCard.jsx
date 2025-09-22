import React from "react";
import "../styles/LessonCard.css";

const LessonCard = ({ lesson }) => {
    return (
        <div className="lesson-card">
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            <div className="lesson-links">
                {lesson.zoom_link && (
                    <a href={lesson.zoom_link} target="_blank" rel="noopener noreferrer">
                        Live Lesson
                    </a>
                )}
                {lesson.youtube_link && (
                    <a href={lesson.youtube_link} target="_blank" rel="noopener noreferrer">
                        Recorded Lesson
                    </a>
                )}
            </div>
        </div>
    );
};

export default LessonCard;
