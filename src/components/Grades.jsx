import React from "react";
import "../styles/Grades.css";

const grades = [
  {
    title: "Grade 4",
    subjects: ["Mathematics", "English", "Natural Science", "Life Skills"],
    description: "Build strong foundations in core subjects and boost confidence."
  },
  {
    title: "Grade 5",
    subjects: ["Mathematics", "English", "Social Sciences", "Creative Arts"],
    description: "Develop critical thinking and broaden your knowledge."
  },
  {
    title: "Grade 6",
    subjects: ["Mathematics", "English", "Technology", "Natural Science"],
    description: "Prepare for senior phase with engaging, advanced content."
  },
];

const Grades = () => {
  return (
    <section className="grades">
      <h2>Our Grades</h2>
      <p className="subtitle">
        We offer a tailored curriculum for each grade to help your child thrive.
      </p>
      <div className="grade-cards">
        {grades.map((grade, idx) => (
          <div className="grade-card" key={idx}>
            <h3>{grade.title}</h3>
            <p className="description">{grade.description}</p>
            <ul>
              {grade.subjects.map((subject, sIdx) => (
                <li key={sIdx}>{subject}</li>
              ))}
            </ul>
            <button className="enroll-btn">Enroll Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grades;
