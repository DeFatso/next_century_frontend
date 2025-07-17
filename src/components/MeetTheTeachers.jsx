import React from "react";
import "../styles/MeetTheTeachers.css";

const teachers = [
  {
    name: "Ms. Lerato Khumalo",
    photo: "/images/teacher1.png",
    qualification: "10+ Years Experience",
    bio: "Specialist in Mathematics and Natural Sciences, passionate about helping students excel.",
  },
  {
    name: "Mr. John Moyo",
    photo: "/images/teacher2.png",
    qualification: "Certified English Educator",
    bio: "Dedicated to building literacy and critical thinking skills in learners of all levels.",
  },
  {
    name: "Mrs. Zanele Dube",
    photo: "/images/teacher3.png",
    qualification: "Award-Winning Life Skills Coach",
    bio: "Focuses on personal development and confidence-building for young learners.",
  },
];

const MeetTheTeachers = () => {
  return (
    <section className="meet-teachers">
      <h2>Meet the Teachers</h2>
      <p className="subtitle">
        Learn more about our dedicated, qualified instructors who guide your
        child to success.
      </p>
      <div className="teacher-cards">
        {teachers.map((t, idx) => (
          <div className="teacher-card" key={idx}>
            <img
              src={t.photo}
              alt={t.name}
              className="teacher-photo"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <h3>{t.name}</h3>
            <p className="qualification">{t.qualification}</p>
            <p className="bio">{t.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeachers;
