import React from "react";
import "./App.css";
import LandingPage from "./pages/Auth/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import ErrorPage from "./pages/Auth/ErrorPage";
import SignUpPage from "./pages/Auth/SignupPage";
import VerifyCodePage from "./pages/Auth/VerifyCodePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EventDetailPage from "./pages/eventbrowse/registeredevents/EventDetailPage";
import RegularEventDetailPage from "./pages/eventbrowse/eventdetails/RegularEventDetailPage";
import HomePage from "./pages/eventbrowse/HomePage";
import HamburgerMenu from "./pages/Auth/HamburgerMenu";
import Notifications from "./pages/eventbrowse/inbox/Notifications";
import { AuthProvider } from "./pages/Auth/AuthContext";
import ProfilePage from "./pages/Auth/ProfilePage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/verify" element={<VerifyCodePage />} />
            
            {/* Protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/upcoming" element={
              
                <HomePage />
              
            } />
            <Route path="/" element={<Navigate to="/upcoming" replace />} />
            <Route path="/upcoming/:id" element={
              
                <RegularEventDetailPage />
              
            } />
            <Route path="/past" element={
              
                <HomePage />
              
            } />
            <Route path="/past/:id" element={
              
                <RegularEventDetailPage />
              
            } />
            <Route path="/club" element={
              
                <HomePage />
              
            } />
            <Route path="/club/:id" element={
              
                <RegularEventDetailPage />
              
            } />
            <Route path="/registered-events" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/registered-events/:id" element={
              <ProtectedRoute>
                <EventDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            
            {/* Remove test routes in production */}
            {/* <Route path="/test-menu" element={<HamburgerMenu />} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;