import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import DataInput from './pages/DataInput';
import Leaderboard from './pages/Leaderboard';
import TipsPage from './pages/TipsPage';
import HealthAlerts from './pages/HealthAlerts';
import AgricultureWater from './pages/AgricultureWater';
import EducationMode from './pages/EducationMode';
import ProtectedRoute from './components/ProtectedRoute';
import { CarbonDataProvider } from './context/CarbonDataContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <AuthProvider>
      <CarbonDataProvider>
        <Router>
          <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/data-input" element={
                  <ProtectedRoute>
                    <DataInput />
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                } />
                <Route path="/tips" element={
                  <ProtectedRoute>
                    <TipsPage />
                  </ProtectedRoute>
                } />
                <Route path="/health-alerts" element={
                  <ProtectedRoute>
                    <HealthAlerts />
                  </ProtectedRoute>
                } />
                <Route path="/agriculture-water" element={
                  <ProtectedRoute>
                    <AgricultureWater />
                  </ProtectedRoute>
                } />
                <Route path="/education" element={
                  <ProtectedRoute>
                    <EducationMode />
                  </ProtectedRoute>
                } />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </CarbonDataProvider>
    </AuthProvider>
  );
}

export default App;
