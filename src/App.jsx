import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import { Footer } from './components/sections/ContactFooter';
import InteractiveEffects from './components/InteractiveEffects';
import Chatbot from './components/Chatbot';
import ScrollToSection from './components/ScrollToSection';
import GlobalBubbles from './components/GlobalBubbles';
import GlobalGrid from './components/GlobalGrid';
import { useTheme } from './hooks/useTheme';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <IntroScreen onComplete={() => setIntroComplete(true)} />}
      <ScrollToSection />
      <InteractiveEffects />
      <GlobalBubbles />
      <GlobalGrid />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          {/* All section routes render the SAME full page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/skills" element={<HomePage />} />
          <Route path="/projects" element={<HomePage />} />
          <Route path="/certificates" element={<HomePage />} />
          <Route path="/education" element={<HomePage />} />
          <Route path="/community" element={<HomePage />} />
          <Route path="/contact" element={<HomePage />} />
          {/* 404 for truly unknown routes */}  
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
