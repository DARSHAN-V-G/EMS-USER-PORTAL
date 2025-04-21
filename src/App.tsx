import React from "react";
import "./App.css";
import LandingPage from "./pages/Auth/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/register" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;