import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/RegisterPage.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password_hash: "",
    role: "student",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const res = await axios.post("http://127.0.0.1:5000/register", formData);
      setMessage(res.data.message || "Registration successful.");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Error registering user. Please try again."
      );
      console.error(err);
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <img
          src="/images/form-image.png"
          alt="Decorative"
          width="864"
          height="1117"
        />
      </div>

      <div className="register-right">
        <div className="register-form">
          <h2>Create Your Account</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password_hash">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password_hash"
                name="password_hash"
                placeholder="Password"
                value={formData.password_hash}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="auth-button">
              Register
            </button>
          </form>

          {message && <div className="message">{message}</div>}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
