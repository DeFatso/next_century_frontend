import React from "react";
import "../styles/DashboardPage.css";

export default function CalendarSection({
  currentDate,
  prevMonth,
  nextMonth,
  goToToday,
  calendarDays,
}) {
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

  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={prevMonth} className="nav-btn">
            &lt;
          </button>
          <h3>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
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
        <p className="reminder-note">Reminder after you reached daily limit</p>
      </div>
    </section>
  );
}
