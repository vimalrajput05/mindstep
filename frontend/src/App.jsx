import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SkillTest from "./pages/SkillTest";
import PsychometricTest from "./pages/PsychometricTest";
import Demo from "./pages/Demo";
import Profile from "./pages/Profile";
import SkillManager from "./pages/SkillManager";
import MarksheetAnalyzer from "./pages/MarksheetAnalyzer";
import LearningTracker from "./pages/LearningTracker";
import AIMentor from "./pages/AIMentor";
import CareerRoadmap from "./pages/CareerRoadmap";
import Pay from "./pages/Pay";
import PeerInsights from "./pages/PeerInsights";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skilltest" element={<SkillTest />} /> 
        <Route path="/psychometric" element={<PsychometricTest />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<SkillManager />} />
         <Route path="/marksheet" element={<MarksheetAnalyzer />} /> 
         <Route path="/learning-tracker" element={<LearningTracker />} /> 
         <Route path="/ai-mentor" element={<AIMentor />} />
        <Route path="/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/pay" element={<Pay />} />
        <Route
  path="/peer-insights"
  element={<PeerInsights  />}
/>

      


      </Routes>
    </Router>
  );
}
