import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";
import sideImage from "../assets/form-image.png";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password_hash: "",
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
      const res = await axios.post("http://127.0.0.1:5000/login", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error logging in");
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
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </form>

          <button className="google-btn" onClick={handleGoogleSignIn}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt=""
            />
            Sign in with Google
          </button>

          <p className="already-account">
            Don’t have an account? <a href="/register">Register</a>
          </p>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
