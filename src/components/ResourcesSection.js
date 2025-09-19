import React, { useEffect, useState } from "react";
import "../styles/DashboardPage.css";

export default function ResourcesSection({ gradeId }) {
  console.log("ResourcesSection received gradeId:", gradeId);

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gradeId) return;
    console.log("Fetching resources for gradeId:", gradeId);

    fetch(`http://localhost:5000/resources?grade_id=${gradeId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch resources");
        return res.json();
      })
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [gradeId]);

  if (loading) return <p>Loading resources...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="resources-section">
      <h3 className="section-title">Resources</h3>

      {resources.length === 0 ? (
        <p>No resources available for your grade.</p>
      ) : (
        <div className="resources-list">
          {resources.map(({ id, title, description, file_url }) => (
            <div key={id} className="resources-card">
              <h4>{title}</h4>
              {description && <p>{description}</p>}
              <a
                href={`http://localhost:5000${file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
