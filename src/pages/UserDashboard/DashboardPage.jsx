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

  const getGradeIdFromName = (gradeName) => {
    if (!gradeName) return null;
    return gradeNameToIdMap[gradeName.trim()] || null;
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) return navigate("/login");

        setUser(storedUser);

        const response = await fetch(
          `http://localhost:5000/dashboard?user_id=${storedUser.id}`
        );

        if (!response.ok) throw new Error("Failed to fetch dashboard data");

        const data = await response.json();
        setDashboardData(data);

        console.log("Dashboard data:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  const goToToday = () => setCurrentDate(new Date());

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const daysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1;
    const totalCells = 42;
    const daysFromNextMonth = totalCells - daysFromPrevMonth - daysInMonth;
    const calendarDays = [];
    const today = new Date();

    for (let i = daysFromPrevMonth; i > 0; i--) {
      calendarDays.push({
        day: prevMonthDays - i + 1,
        isCurrentMonth: false,
        isToday: false,
      });
    }

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

    for (let i = 1; i <= daysFromNextMonth; i++) {
      calendarDays.push({ day: i, isCurrentMonth: false, isToday: false });
    }

    return calendarDays;
  };

  if (loading)
    return (
      <div className="loading-container">
        <h2>Loading dashboard...</h2>
      </div>
    );
  if (error)
    return (
      <div className="error-container">
        <h2>Error loading dashboard</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  if (!user)
    return (
      <div className="login-prompt">
        <h2>Please log in</h2>
        <a href="/login">Go to Login</a>
      </div>
    );

  const calendarDays = generateCalendarDays();

  return (
    <div className="dashboard-container">
      <DashboardHeader user={dashboardData?.user || user} />
      <div className="dashboard-content">
        <div className="left-column">
          <ProfileCard user={dashboardData?.user || user} />
          <ScheduleSection
            upcomingAssignments={dashboardData?.upcoming_assignments || []}
            recentActivity={dashboardData?.recent_activity || []}
          />
        </div>
        <div className="right-column">
          <ResourcesSection
            gradeId={getGradeIdFromName(dashboardData?.user?.grade_name)}
          />
          <CalendarSection
            currentDate={currentDate}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            goToToday={goToToday}
            calendarDays={calendarDays}
          />
          <PerformanceSummary performanceData={dashboardData} />
        </div>
      </div>
    </div>
  );
}
