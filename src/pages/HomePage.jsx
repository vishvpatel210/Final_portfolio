import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import FigmaDesigns from '../components/sections/FigmaDesigns';
import { Certificates } from '../components/sections/OtherSections';
import Education from '../components/sections/Education';
import CodeAndCommunity from '../components/sections/CodeAndCommunity';
import { Contact } from '../components/sections/ContactFooter';
import ScrollFadeIn from '../components/ScrollFadeIn';

export default function HomePage() {
  return (
    <>
      {/* Hero is always in view on load — no fade delay needed */}
      <Hero />

      <ScrollFadeIn as="div" delay="0s">
        <About />
      </ScrollFadeIn>

      <ScrollFadeIn as="div" delay="0s">
        <Skills />
      </ScrollFadeIn>

      <ScrollFadeIn as="div" delay="0s">
        <Projects />
      </ScrollFadeIn>

      <ScrollFadeIn as="div" delay="0s">
        <FigmaDesigns />
      </ScrollFadeIn>

      <ScrollFadeIn as="div" delay="0s">
        <Certificates />
      </ScrollFadeIn>

      <ScrollFadeIn as="div" delay="0s">
        <Education />
      </ScrollFadeIn>

      <ScrollFadeIn as="div" delay="0s">
        <CodeAndCommunity />
      </ScrollFadeIn>

      <ScrollFadeIn as="div" delay="0s">
        <Contact />
      </ScrollFadeIn>
    </>
  );
}
