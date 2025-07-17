import React, { useState } from "react";
import "../styles/FAQ.css";
const faqs = [
  {
    question: "How do I enroll my child?",
    answer: "Simply click the 'Enroll Now' button on any grade page, fill out the registration form, and you'll receive login details via email.",
  },
  {
    question: "What is the curriculum based on?",
    answer: "Our curriculum follows the South African CAPS standards, tailored for effective online learning.",
  },
  {
    question: "Can my child study at their own pace?",
    answer: "Yes! Our platform allows flexible pacing, so your child can learn when they’re most comfortable.",
  },
  {
    question: "Is there support available for students?",
    answer: "Absolutely. Our teachers and support team are available to assist students throughout their learning journey.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`faq-item ${openIndex === idx ? "open" : ""}`}
            onClick={() => toggleFAQ(idx)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle">{openIndex === idx ? "−" : "+"}</span>
            </div>
            {openIndex === idx && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
