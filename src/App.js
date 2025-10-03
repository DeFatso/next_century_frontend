import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/UserDashboard/DashboardPage";
import LandingPage from "./pages/LandingPage";
import ApplicationForm from "./components/ApplicationForm";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import TeacherLogin from "./pages/TeacherDashboard/TeacherLogin.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
      </Routes>
    </div>
  );
}

export default App;
