import React, { useState } from "react";
import "../styles/ApplicationForm.css";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    childName: "",
    grade: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      parent_name: formData.parentName,
      parent_email: formData.email,
      child_name: formData.childName,
      grade_id: parseInt(formData.grade, 10),
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      const data = await res.json();
      console.log("✅ Application submitted:", data);

      if (formData.message.trim()) {
        const encodedMsg = encodeURIComponent(formData.message.trim());
        const myWhatsAppNumber = "27721234567"; // ✅ change this to your WhatsApp number
        window.open(
          `https://wa.me/${myWhatsAppNumber}?text=${encodedMsg}`,
          "_blank"
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("There was a problem submitting your application.");
    }
  };

  if (submitted) {
    return (
      <div className="application-success">
        <h2>Thank you!</h2>
        <p>
          Your application has been received. Our team will review it and get
          back to you via email shortly.
        </p>
      </div>
    );
  }

  return (
    <section className="application-form">
      <h1>Apply for Enrollment</h1>
      <p>Please fill in the form below to apply for your child’s enrollment.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Parent Full Name</label>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Parent Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Child Full Name</label>
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Child Grade</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message <small>(Optional, sent to WhatsApp)</small></label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a note to the admin…"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </section>
  );
};

export default ApplicationForm;
