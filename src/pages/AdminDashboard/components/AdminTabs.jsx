import React from "react";

const AdminTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "applications", label: "Applications" },
    { id: "users", label: "Users" },
    { id: "content", label: "Content" },
    { id: "lessons", label: "Lessons" }
  ];

  return (
    <nav className="admin-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? "active" : ""}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default AdminTabs;