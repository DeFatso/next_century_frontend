import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import ProfileCard from "../components/ProfileCard";
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Calendar navigation functions
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and total days in month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get days from previous month to display
    const prevMonthDays = new Date(year, month, 0).getDate();
    const daysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1;

    // Calculate total cells needed (6 weeks)
    const totalCells = 42;
    const daysFromNextMonth = totalCells - daysFromPrevMonth - daysInMonth;

    const calendarDays = [];

    // Previous month days
    for (let i = daysFromPrevMonth; i > 0; i--) {
      calendarDays.push({
        day: prevMonthDays - i + 1,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isToday:
          today.getDate() === i &&
          today.getMonth() === month &&
          today.getFullYear() === year,
      });
    }

    // Next month days
    for (let i = 1; i <= daysFromNextMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return calendarDays;
  };

  if (!user) {
    return (
      <div className="login-prompt">
        <h2>Please log in to view your dashboard</h2>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const calendarDays = generateCalendarDays();

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <DashboardHeader user={user} />

      <div className="dashboard-content">
        {/* Left Column - User Profile and Schedule */}
        <div className="left-column">
          {/* User Profile Card */}
          <ProfileCard user={user} />

          {/* Schedule Section */}
          <section className="schedule-section">
            <h3 className="section-title">Schedule</h3>
            <div className="schedule-card">
              <div className="schedule-item">
                <h4>Attendance</h4>
                <div className="attendance-metrics">
                  <div className="metric">
                    <span className="metric-value">94%</span>
                    <span className="metric-label">This Month</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">89%</span>
                    <span className="metric-label">Last Month</span>
                  </div>
                </div>
              </div>
              <div className="schedule-item">
                <h4>Announcements</h4>
                <p className="announcement">
                  Parent-teacher meetings scheduled for next week
                </p>
                <p className="announcement">
                  School closed on Friday for staff training
                </p>
              </div>
              <div className="schedule-item">
                <h4>Participation Metrics</h4>
                <div className="participation-chart">
                  <div className="participation-bar" style={{ width: "78%" }}>
                    <span>78% Class Participation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Performance Data */}
        <div className="right-column">
          {/* Resources Section */}
          <section className="resources-section">
            <h3 className="section-title">Resources</h3>
            <div className="resources-card">
              <h4>Average Test Scores by Month</h4>
              <div className="score-grid">
                <div className="score-category">
                  <span className="score-label">Last Year</span>
                  <span className="score-value">82%</span>
                </div>
                <div className="score-category">
                  <span className="score-label">Late Submissions</span>
                  <span className="score-value">18%</span>
                </div>
                <div className="score-category">
                  <span className="score-label">On Time Submissions</span>
                  <span className="score-value">82%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Calendar Section */}
          <section className="calendar-section">
            <div className="calendar-header">
              <div className="calendar-nav">
                <button onClick={prevMonth} className="nav-btn">
                  &lt;
                </button>
                <h3>
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h3>
                <button onClick={nextMonth} className="nav-btn">
                  &gt;
                </button>
              </div>
              <button onClick={goToToday} className="today-btn">
                Today
              </button>
            </div>
            <div className="calendar-grid">
              {weekdayNames.map((day) => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}
              {calendarDays.map((dayObj, index) => (
                <div
                  key={`day-${index}`}
                  className={`calendar-day 
                    ${dayObj.isCurrentMonth ? "" : "other-month"} 
                    ${dayObj.isToday ? "today" : ""}`}
                >
                  {dayObj.day}
                  {dayObj.isToday && <div className="today-indicator"></div>}
                </div>
              ))}
            </div>
            <div className="reminder-actions">
              <button className="reminder-btn">Set Daily Reminder</button>
              <p className="reminder-note">
                Reminder after you reached daily limit
              </p>
            </div>
          </section>

          {/* Performance Summary */}
          <section className="performance-summary">
            <div className="performance-card">
              <div className="performance-header">
                <h3>69% + Average Daily Score</h3>
                <div className="mini-calendar">
                  <div className="mini-weekdays">
                    {weekdayNames.map((day) => (
                      <span key={`mini-${day}`}>{day}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="reminder-actions">
                <button className="reminder-btn">Set Daily Reminder</button>
                <p className="reminder-note">
                  Reminder after you reached daily limit
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
