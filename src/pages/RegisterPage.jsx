import React, { useState } from "react";
import axios from "axios";
import "../styles/RegisterPage.css";
import sideImage from "../assets/form-image.png";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password_hash: "",
    role: "student",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error registering user");
      console.error(err);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Replace with your Google OAuth flow
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
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
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
