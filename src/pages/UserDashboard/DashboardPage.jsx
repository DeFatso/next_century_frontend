import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";
import ProfileCard from "./components/ProfileCard";
import ScheduleSection from "./components/ScheduleSection";
import ResourcesSection from "./components/ResourcesSection";
import CalendarSection from "./components/CalendarSection";
import PerformanceSummary from "./components/PerformanceSummary";
import "./styles/DashboardPage.css";

export default function DashboardPage() {
  console.log("DashboardPage component rendered");
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const gradeNameToIdMap = {
    "Grade 1": 1,
    "Grade 2": 2,
    "Grade 3": 3,
    "Grade 4": 4,
    "Grade 5": 5,
    "Grade 6": 6,
    "Grade 7": 7,
  };

  // Get grade ID from grade name
  const getGradeIdFromName = (gradeName) => {
    if (!gradeName) {
      console.warn("No grade name provided");
      return null;
    }

    // Normalize the grade name for case-insensitive matching
    const normalizedGradeName = gradeName.trim();
    return gradeNameToIdMap[normalizedGradeName] || null;
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          navigate("/login");
          return;
        }

        setUser(storedUser);

        // Fetch dashboard data from backend
        const response = await fetch(
          `http://localhost:5000/auth/dashboard?user_id=${storedUser.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);

        console.log("=== DASHBOARD DEBUG ===");
        console.log("Full dashboard data:", data);
        console.log("User object:", data?.user);
        console.log("Grade name:", data?.user?.grade_name);
        console.log("Grade name type:", typeof data?.user?.grade_name);
        console.log("=======================");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading dashboard</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="login-prompt">
        <h2>Please log in to view your dashboard</h2>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();

  console.log("=== BEFORE RENDERING ===");
  console.log("Dashboard data available:", !!dashboardData);
  console.log("Grade name for mapping:", dashboardData?.user?.grade_name);
  console.log(
    "Mapped grade ID:",
    getGradeIdFromName(dashboardData?.user?.grade_name)
  );
  console.log("=========================");

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <DashboardHeader user={user} />

      <div className="dashboard-content">
        {/* Left Column - User Profile and Schedule */}
        <div className="left-column">
          {/* User Profile Card */}
          <ProfileCard user={dashboardData?.user || user} />

          {/* Schedule Section - Updated to show real assignments */}
          <ScheduleSection
            upcomingAssignments={dashboardData?.upcoming_assignments || []}
            recentActivity={dashboardData?.recent_activity || []}
          />
        </div>

        {/* Right Column - Performance Data */}
        <div className="right-column">
          {/* Resources Section */}
          <ResourcesSection
            gradeId={getGradeIdFromName(dashboardData?.user?.grade_name)}
          />

          {/* Calendar Section */}
          <CalendarSection
            currentDate={currentDate}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            goToToday={goToToday}
            calendarDays={calendarDays}
          />

          {/* Performance Summary */}
          <PerformanceSummary performanceData={dashboardData} />
        </div>
      </div>
    </div>
  );
}
