import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL } from '../data/portfolioData';
import s from './Navbar.module.css';

const NAV = [
  { l:'Home',         to:'/' },
  { l:'About',        to:'/about' },
  { l:'Skills',       to:'/skills' },
  { l:'Projects',     to:'/projects' },
  { l:'Certificates', to:'/certificates' },
  { l:'Education',    to:'/education' },
  { l:'Community',    to:'/community' },
  { l:'Contact',      to:'/contact' },
];

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .6, ease: [.4, 0, .2, 1] }}
      >
        <div className={s.inner}>
          <Link to="/" className={s.logo} style={{ textDecoration: 'none' }}>
            <div className="vp-logo-circle">
              <span className="vp-logo-text">VP</span>
              <span className="vp-logo-ring" />
              <span className="vp-logo-glow" />
            </div>
          </Link>

          <ul className={s.links}>
            {NAV.map(({ l, to }) => (
              <li key={l}>
                <Link
                  to={to}
                  className={`${s.lnk} ${location.pathname === to ? s.active : ''}`}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.right}>
            <button className={s.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className={`${s.ham} ${open ? s.hamOpen : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div onClick={() => setOpen(false)}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:898 }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            />
            <motion.div className={s.drawer}
              initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
              transition={{ type:'spring', damping:28, stiffness:200 }}
            >
              <ul>
                {NAV.map(({ l, to }, i) => (
                  <motion.li key={l} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.05 }}>
                    <Link
                      to={to}
                      className={`${s.dlnk} ${location.pathname === to ? s.activeDlnk : ''}`}
                    >
                      <span className={s.dnum}>0{i+1}.</span>{l}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className={s.dsoc}>
                <a href={PERSONAL.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={PERSONAL.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={PERSONAL.socials.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
                <a href={PERSONAL.socials.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
