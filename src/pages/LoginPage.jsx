import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/LoginPage.css";
import sideImage from "../assets/form-image.png";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "", // changed from password_hash to password
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        {
          email: formData.email,
          password: formData.password, // or generate hash on frontend if needed
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setMessage("Email and password are required");
            break;
          case 401:
            setMessage("Invalid email or password");
            break;
          case 404:
            setMessage("User not found");
            break;
          case 500:
            setMessage("Server error. Please try again later.");
            break;
          default:
            setMessage("Login failed. Please try again.");
        }
      } else if (err.request) {
        setMessage("No response from server. Check your connection.");
      } else {
        setMessage("Login error: " + err.message);
      }
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
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
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
