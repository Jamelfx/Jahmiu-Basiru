


import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TechniciansPage from './pages/TechniciansPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import ConventionsPage from './pages/ConventionsPage';
import SalaryGridPage from './pages/SalaryGridPage';
import ContractTypesPage from './pages/ContractTypesPage';
import ImageCharterPage from './pages/ImageCharterPage';
import AnimatedPage from './components/AnimatedPage';

import { Member } from './types';
import { TECHNICIANS_DATA } from './constants';

const AnimatedRoutes: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const location = useLocation();

  const handleLogin = (email: string) => {
    const user = TECHNICIANS_DATA.find(tech => tech.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const updateCurrentUser = (updatedUser: Member) => {
    setCurrentUser(updatedUser);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-x-hidden">
         <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
              <Route path="/technicians" element={<AnimatedPage><TechniciansPage /></AnimatedPage>} />
              <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
              <Route path="/news" element={<AnimatedPage><NewsPage /></AnimatedPage>} />
              <Route path="/conventions" element={<AnimatedPage><ConventionsPage /></AnimatedPage>} />
              <Route path="/conventions/grille-salariale" element={<AnimatedPage><SalaryGridPage /></AnimatedPage>} />
              <Route path="/conventions/contrats-types" element={<AnimatedPage><ContractTypesPage /></AnimatedPage>} />
              <Route path="/conventions/charte-image" element={<AnimatedPage><ImageCharterPage /></AnimatedPage>} />
              <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
              <Route 
                path="/login" 
                element={currentUser ? <Navigate to="/dashboard" /> : <AnimatedPage><LoginPage onLogin={handleLogin} /></AnimatedPage>} 
              />
              <Route 
                path="/dashboard" 
                element={currentUser ? <AnimatedPage><DashboardPage member={currentUser} onMemberUpdate={updateCurrentUser} /></AnimatedPage> : <Navigate to="/login" />} 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AnimatedRoutes />
  </HashRouter>
);

export default App;