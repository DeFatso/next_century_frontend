import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Next Century Online School</h1>
      <p style={styles.subtitle}>
        Empowering students from Grade 1 to 7 with quality education anywhere.
      </p>

      <div style={styles.buttonGroup}>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
        <Link to="/register" style={styles.button}>
          Register
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "4rem",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};
 