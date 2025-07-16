import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RegisterPage.css";
import sideImage from "../assets/form-image.png";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password_hash: "",
    grade_id: "", // 👈 grade_id now here
  });

  const [message, setMessage] = useState("");
  const [grades, setGrades] = useState([]); // optional: fetch grades dynamically

  // optionally load grades from backend
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/grades")
      .then(res => setGrades(res.data))
      .catch(err => console.error("Error fetching grades", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/register", {
        ...formData,
        grade_id: parseInt(formData.grade_id), // ensure integer
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error registering user");
      console.error(err);
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In not implemented yet.");
  };

  return (
    <div className="register-page">
      <div className="left-half">
        <img src={sideImage} alt="Decorative" className="side-image" />
      </div>
      <div className="right-half">
        <div className="register-form">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password_hash"
              placeholder="Password"
              value={formData.password_hash}
              onChange={handleChange}
            />
            <select
              name="grade_id"
              value={formData.grade_id}
              onChange={handleChange}
            >
              <option value="">Select Grade</option>
              {grades.length > 0
                ? grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))
                : [1,2,3,4,5,6,7].map(g => (
                    <option key={g} value={g}>Grade {g}</option>
                  ))}
            </select>

            <button type="submit">Register</button>
          </form>

          <button className="google-btn" onClick={handleGoogleSignIn}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt=""
            />
            Sign in with Google
          </button>

          <p className="already-account">
            Already have an account? <a href="/login">Sign In</a>
          </p>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}