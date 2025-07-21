import React from "react";
import "./App.css";
import LandingPage from "./pages/Auth/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import ErrorPage from "./pages/Auth/ErrorPage.tsx";
import SignUpPage from "./pages/Auth/SignupPage.tsx";
import VerifyCodePage from "./pages/Auth/VerifyCodePage";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import EventsPage from "./pages/eventbrowse/registeredevents/eventspage.tsx";
import HomePage from "./pages/eventbrowse/HomePage.tsx";
import ClubInfoPage from './pages/Auth/ClubInfoPage';
import HamburgerMenu from "./pages/Auth/HamburgerMenu";
import Notifications from "./pages/eventbrowse/inbox/Notifications.tsx";
import { AuthProvider } from "./pages/Auth/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="app">
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify" element={<VerifyCodePage />} />

          <Route path="/upcoming" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/upcoming" replace />} />
          <Route path="/upcoming/:id" element={<h1>coming soon</h1>} />
          <Route path="/past" element={<HomePage />} />
          <Route path="/past/:id" element={<h1>coming soon</h1>} />
          <Route path="/club" element={<HomePage />} />
          <Route path="/club/:id" element={<h1>coming soon</h1>} />
          <Route path="/registered-events" element={<EventsPage />} />
          <Route path="/registered-events/:id" element={<EventsPage />} />
          <Route path="/club-info" element={<ClubInfoPage />} />
          <Route path="/:view" element={<HomePage />} />
          <Route path="/test-menu" element={<HamburgerMenu />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
