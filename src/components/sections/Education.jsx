import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EDUCATION_DATA = [
  {
    institution: 'Swaminarayan University (Coding Gita)',
    degree: 'B.Tech Computer Science',
    desc: 'Focusing on Advanced Full Stack Development & AI Algorithms. Maintaining a strong GPA while building real-world projects.',
    status: 'Present',
    isActive: true,
  },
  {
    institution: 'Vidyamandir School',
    degree: 'Higher Secondary (CBSE / HSC)',
    desc: 'Specialized in Science & Mathematics with a focus on Computer Applications and Physics.',
    status: 'Completed',
    isActive: false,
  },
  {
    institution: 'Navjivan School',
    degree: 'Secondary (ICSE / SSC)',
    desc: 'Built a strong academic foundation with focus on Science, Mathematics and basic Computer Science.',
    status: 'Completed',
    isActive: false,
  }
];

/* ── Animated dot that pops in when scrollProgress reaches it ── */
const EduCard = ({ data, i, totalItems, scrollProgress }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  // The line progress fraction at which this dot should light up
  // Nodes sit at 0%, 50%, 100% of the line
  const triggerAt = totalItems === 1 ? 0 : i / (totalItems - 1);
  const dotVisible = scrollProgress >= triggerAt - 0.05;

  return (
    <div ref={ref} className="edu-timeline-row">
      {/* Desktop Timeline Node */}
      <div className="edu-timeline-node">
        <div
          className={`edu-dot ${dotVisible ? 'edu-dot--active' : ''}`}
          style={{
            background: dotVisible
              ? data.isActive ? '#00d9a6' : 'transparent'
              : 'transparent',
            border: `2px solid ${dotVisible ? '#00d9a6' : 'rgba(0,217,166,0.25)'}`,
          }}
        >
          {/* Pulse ring — only for the active (current) entry */}
          {data.isActive && dotVisible && (
            <span className="edu-dot-pulse" />
          )}
        </div>
      </div>

      {/* Content Card */}
      <motion.div
        className="edu-card"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: i * 0.15 }}
        whileHover={{ y: -2 }}
        style={{
          background: '#1a202c',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '28px',
          flex: 1,
          width: '100%',
          position: 'relative',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,217,166,0.3)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,217,166,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Status Badge */}
        <div className="edu-badge-desktop" style={{ position: 'absolute', top: '28px', right: '28px' }}>
          <span className="edu-badge" style={{
            background: data.isActive ? 'rgba(0,217,166,0.15)' : 'rgba(255,255,255,0.07)',
            color: data.isActive ? '#00d9a6' : '#ffffff',
            border: data.isActive ? '1px solid rgba(0,217,166,0.4)' : '1px solid rgba(255,255,255,0.15)'
          }}>
            {data.status}
          </span>
        </div>

        <h3 className="edu-title">{data.institution}</h3>
        <p className="edu-degree">{data.degree}</p>

        <div className="edu-badge-mobile" style={{ marginTop: '12px', marginBottom: '16px' }}>
          <span className="edu-badge" style={{
            background: data.isActive ? 'rgba(0,217,166,0.15)' : 'rgba(255,255,255,0.07)',
            color: data.isActive ? '#00d9a6' : '#ffffff',
            border: data.isActive ? '1px solid rgba(0,217,166,0.4)' : '1px solid rgba(255,255,255,0.15)'
          }}>
            {data.status}
          </span>
        </div>

        <p className="edu-desc">{data.desc}</p>
      </motion.div>
    </div>
  );
};

export default function Education() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start drawing when the section top hits 80% of viewport
      // Finish when section bottom leaves 20% of viewport
      const start = windowH * 0.8;
      const end = windowH * 0.2;

      const totalTravel = rect.height - (start - end);
      const traveled = start - rect.top;

      const progress = Math.min(1, Math.max(0, traveled / totalTravel));
      setScrollProgress(progress);

      // Drive the CSS custom property on the line element
      if (lineRef.current) {
        lineRef.current.style.setProperty('--line-progress', progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="education" ref={sectionRef} className="education-section">
      <div className="edu-bg-grid" />

      <div className="edu-wrap">
        <motion.div
          ref={headerRef}
          className="edu-header-col"
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={textVariants}
        >
          <h2 className="edu-heading">
            Education <span className="accent italic">Journey</span>
          </h2>
          <p className="edu-subtitle">My academic path so far.</p>
        </motion.div>

        <div className="edu-timeline-container">
          {/* ── Ghost (background) line ── */}
          <div className="edu-timeline-line edu-timeline-line--ghost" />

          {/* ── Animated fill line driven by --line-progress ── */}
          <div
            ref={lineRef}
            className="edu-timeline-line edu-timeline-line--fill"
            style={{ '--line-progress': 0 }}
          />

          {/* ── Light-speed streak that shoots down the line ── */}
          <div
            className="edu-timeline-line edu-timeline-line--streak"
            style={{ '--line-progress': scrollProgress }}
          />

          <div className="edu-timeline-cards">
            {EDUCATION_DATA.map((item, i) => (
              <EduCard
                key={item.institution}
                data={item}
                i={i}
                totalItems={EDUCATION_DATA.length}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ─── Section ─────────────────────────────── */
        .education-section {
          padding: 120px var(--px);
          background: var(--bg-primary);
          position: relative;
          color: #ffffff;
          overflow: hidden;
        }

        .edu-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0, 217, 166, 0.03) 1px, transparent 1px);
          background-size: 24px 24px; z-index: 0;
        }

        .edu-wrap {
          position: relative; z-index: 1;
          max-width: 900px; margin: 0 auto;
        }

        /* ─── Header ──────────────────────────────── */
        .edu-header-col {
          display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 60px;
        }

        .edu-heading {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.5rem, 4.5vw, 3.5rem); font-weight: 800; line-height: 1.1; margin: 0 0 12px 0;
        }

        .edu-subtitle {
          color: #a0a0a0; font-family: var(--font-mono), monospace;
          font-size: 0.95rem; line-height: 1.8; margin: 0;
        }

        /* ─── Timeline container ──────────────────── */
        .edu-timeline-container {
          position: relative;
        }

        /* Ghost line (dim background track) */
        .edu-timeline-line {
          position: absolute;
          left: 13px;
          top: 28px;
          bottom: 28px;
          width: 2px;
          z-index: 0;
          border-radius: 2px;
        }

        .edu-timeline-line--ghost {
          background: rgba(0, 217, 166, 0.15);
        }

        /* Fill line — scaleY driven by CSS custom property via JS */
        .edu-timeline-line--fill {
          background: linear-gradient(
            to bottom,
            #00d9a6 0%,
            rgba(0, 217, 166, 0.6) 100%
          );
          transform-origin: top;
          transform: scaleY(var(--line-progress, 0));
          box-shadow: 0 0 8px rgba(0, 217, 166, 0.5),
                      0 0 16px rgba(0, 217, 166, 0.25);
          transition: transform 0.08s linear;
          will-change: transform;
          overflow: hidden;
        }

        /* ── Light-speed streak ──────────────────────
           Clips to the filled portion (same scaleY),
           then a pseudo-element comet shoots through it. */
        .edu-timeline-line--streak {
          background: transparent;
          transform-origin: top;
          transform: scaleY(var(--line-progress, 0));
          transition: transform 0.08s linear;
          overflow: hidden;
          pointer-events: none;
          z-index: 2;
        }

        .edu-timeline-line--streak::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          border-radius: 999px;
          /* tall gradient: bright core → fading tail */
          background: linear-gradient(
            to bottom,
            transparent       0%,
            rgba(255,255,255,0) 10%,
            rgba(180,255,240,0.55) 35%,
            #ffffff            55%,
            rgba(180,255,240,0.55) 70%,
            transparent       100%
          );
          height: 60px;
          filter: blur(1px) brightness(1.6);
          /* shoot from -60px above top → past the bottom */
          animation: lightSpeed 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 0.4s;
        }

        @keyframes lightSpeed {
          0%   { top: -60px;   opacity: 0;   }
          8%   { opacity: 1;              }
          90%  { opacity: 1;              }
          100% { top: calc(100% + 10px); opacity: 0; }
        }

        /* ─── Timeline cards ──────────────────────── */
        .edu-timeline-cards {
          display: flex; flex-direction: column; gap: 30px;
        }

        .edu-timeline-row {
          position: relative;
          display: flex;
          align-items: flex-start;
          width: 100%;
        }

        /* ─── Node / Dot ──────────────────────────── */
        .edu-timeline-node {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-primary);
          z-index: 10;
          margin-top: 24px;
          margin-right: 32px;
          flex-shrink: 0;
          position: relative;
        }

        .edu-dot {
          width: 12px; height: 12px; border-radius: 50%;
          position: relative;
          transition: background 0.4s ease, border-color 0.4s ease,
                      box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* Scale-up pop when dot becomes active */
        .edu-dot--active {
          transform: scale(1.25);
          box-shadow: 0 0 0 4px rgba(0, 217, 166, 0.18),
                      0 0 12px rgba(0, 217, 166, 0.45);
        }

        /* Ripple / pulse ring for the current (active) dot */
        .edu-dot-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(0, 217, 166, 0.6);
          animation: eduPulse 1.8s ease-out infinite;
        }

        @keyframes eduPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(2.4); opacity: 0;   }
          100% { transform: scale(2.4); opacity: 0;   }
        }

        /* ─── Card content ────────────────────────── */
        .edu-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.25rem; font-weight: 700; color: #ffffff; margin: 0 0 4px 0;
          padding-right: 100px;
        }

        .edu-degree {
          font-family: var(--font), sans-serif;
          font-size: 1rem; font-weight: 400; color: #ffffff; margin: 0 0 16px 0;
        }

        .edu-desc {
          font-family: var(--font), sans-serif;
          font-size: 0.875rem; color: #a0a0a0; margin: 0; line-height: 1.7;
        }

        .edu-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem; font-weight: 600;
        }

        .edu-badge-mobile { display: none; }

        /* ─── Mobile ──────────────────────────────── */
        @media (max-width: 768px) {
          .edu-timeline-line,
          .edu-timeline-node { display: none; }

          .edu-card {
            border-left: 3px solid #00d9a6 !important;
            border-radius: 8px 16px 16px 8px !important;
            padding: 24px !important;
          }
          .edu-badge-desktop { display: none; }
          .edu-badge-mobile  { display: block; }
          .edu-title         { padding-right: 0; }
        }
      `}</style>
    </section>
  );
}
