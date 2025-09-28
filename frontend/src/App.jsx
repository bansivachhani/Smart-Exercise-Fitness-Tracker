// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Contact from "./components/Contact";
import DietPlanPage from "./components/Dietplan";
import DietResultPage from "./pages/DietResultPage";
import PersonalizedDietPlan from "./pages/PersonalizedDietPlan";
import WorkoutSectionPage from "./components/workout/WorkoutSectionPage"; 
import ConnectCoach from "./pages/ConnectCoach";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";


function AppRoutes() {
  const location = useLocation();

  // Example: if Workout page needs full width layout without Header/Footer, handle separately
  if (location.pathname.startsWith("/workout")) {
    return (
      <Routes>
        <Route path="/workout/*" element={<WorkoutSectionPage />} />
      </Routes>
    );
  }

  // All other pages wrapped in Layout (Header, Footer + Chatbot)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dietplan" element={<DietPlanPage />} />
        <Route path="/diet-result" element={<DietResultPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/personalized" element={<PersonalizedDietPlan />} />
        <Route path="/connect_coach" element={<ConnectCoach />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
