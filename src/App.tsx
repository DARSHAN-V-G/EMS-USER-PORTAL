import React from "react";
import "./App.css";
import LandingPage from "./pages/Auth/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import ErrorPage from "./pages/Auth/ErrorPage.tsx";
import SignUpPage from "./pages/Auth/SignupPage.tsx";
import VerifyCodePage from "./pages/Auth/VerifyCodePage";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import EventDetailPage from "./pages/eventbrowse/registeredevents/EventDetailPage.tsx";
import RegularEventDetailPage from "./pages/eventbrowse/eventdetails/RegularEventDetailPage.tsx";
import HomePage from "./pages/eventbrowse/HomePage.tsx";
import HamburgerMenu from "./pages/Auth/HamburgerMenu";
import Notifications from "./pages/eventbrowse/inbox/Notifications.tsx";
import { AuthProvider } from "./pages/Auth/AuthContext";
import ProfilePage from "./pages/Auth/ProfilePage.tsx";
import Header from "./components/Header.tsx";
function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify" element={<VerifyCodePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upcoming" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/upcoming" replace />} />
          <Route path="/upcoming/:id" element={<RegularEventDetailPage />} />
          <Route path="/past" element={<HomePage />} />
          <Route path="/past/:id" element={<RegularEventDetailPage />} />
          <Route path="/club" element={<HomePage />} />
          <Route path="/club/:id" element={<RegularEventDetailPage />} />
          <Route path="/registered-events" element={<HomePage />} />
          <Route path="/registered-events/:id" element={<EventDetailPage />} />
          {/* <Route path="/club-info" element={<ClubInfoPage />} /> */}
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
