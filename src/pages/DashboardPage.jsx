import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import ProfileCard from "../components/ProfileCard";
import ScheduleSection from "../components/ScheduleSection";
import ResourcesSection from "../components/ResourcesSection";
import CalendarSection from "../components/CalendarSection";
import PerformanceSummary from "../components/PerformanceSummary";
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
          <ScheduleSection />
        </div>

        {/* Right Column - Performance Data */}
        <div className="right-column">
          {/* Resources Section */}
          <ResourcesSection />
          {/* Calendar Section */}
          <CalendarSection
            currentDate={currentDate}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            goToToday={goToToday}
            calendarDays={calendarDays}
          />

          {/* Performance Summary */}
          <PerformanceSummary />
        </div>
      </div>
    </div>
  );
}
