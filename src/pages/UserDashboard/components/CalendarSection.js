import React, { useState, useEffect } from "react";
import "../styles/CalendarSection.css";

export default function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Month and weekday names
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

  // Helper: check if two dates are the same day
  const isSameDate = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  // Generate calendar when currentDate changes
  useEffect(() => {
    const generateCalendar = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const prevDays = (firstDayOfMonth.getDay() + 6) % 7; // shift Sunday → last
      const totalDays = lastDayOfMonth.getDate();

      let days = [];

      // Previous month fillers
      for (let i = 0; i < prevDays; i++) {
        const d = new Date(year, month, i - prevDays + 1);
        days.push({
          day: d.getDate(),
          isCurrentMonth: false,
          isToday: isSameDate(d, new Date()),
        });
      }

      // Current month days
      for (let i = 1; i <= totalDays; i++) {
        const d = new Date(year, month, i);
        days.push({
          day: i,
          isCurrentMonth: true,
          isToday: isSameDate(d, new Date()),
        });
      }

      // Next month fillers
      while (days.length % 7 !== 0) {
        const d = new Date(
          year,
          month + 1,
          days.length - totalDays - prevDays + 1
        );
        days.push({
          day: d.getDate(),
          isCurrentMonth: false,
          isToday: isSameDate(d, new Date()),
        });
      }

      return days;
    };

    setCalendarDays(generateCalendar(currentDate));
  }, [currentDate]);

  // Handlers
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const goToToday = () => setCurrentDate(new Date());

  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={prevMonth} className="nav-btn">
            &lt;
          </button>
          <h3 className="month-title">
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
