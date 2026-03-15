import React from 'react';
import Navbar from './components/Navbar';
import Hero   from './components/sections/Hero';
import About  from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import { Certificates, Stats } from './components/sections/OtherSections';
import { Contact, Footer } from './components/sections/ContactFooter';
import InteractiveEffects from './components/InteractiveEffects';
import Chatbot from './components/Chatbot';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <InteractiveEffects />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Certificates /> */}
        <Stats />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
