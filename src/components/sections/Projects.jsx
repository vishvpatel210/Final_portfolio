import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FiExternalLink, FiGithub, FiYoutube } from 'react-icons/fi';
import { PROJECTS } from '../../data/portfolioData';

const FILTERS = ['All', 'Frontend', 'Backend', 'Full Stack'];

function getFilterCount(f) {
  if (f === 'All') return PROJECTS.length;
  return PROJECTS.filter(p => p.tags.includes(f)).length;
}

function TechBadge({ t }) {
  let src = null;
  if(t === 'Frontend') src = 'https://cdn.simpleicons.org/react/61DAFB';
  else if(t === 'Backend') src = 'https://cdn.simpleicons.org/nodedotjs/339933';
  else if(t === 'Full Stack') src = 'https://cdn.simpleicons.org/javascript/F7DF1E';
  
  return (
    <span className="tech-badge">
      {src && <img src={src} width={10} height={10} alt={t}/>}
      {t}
    </span>
  )
}

function Card({ p, inView, i, isMobile }) {
  const [hov, setHov] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const TiltWrapper = isMobile ? React.Fragment : Tilt;
  const tiltProps = isMobile ? {} : {
    tiltMaxAngleX: 3,
    tiltMaxAngleY: 3,
    glareEnable: true,
    glareMaxOpacity: 0.05,
    glareColor: "#00d9a6",
    glarePosition: "all",
    transitionSpeed: 1000,
    style: { height: '100%', width: '100%' }
  };

  return (
    <motion.div layout
      initial={p.featured ? { opacity: 0, scale: 0.97 } : { opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
      onHoverStart={() => !isMobile && setHov(true)} 
      onHoverEnd={() => !isMobile && setHov(false)}
      onClick={() => isMobile && setHov(!hov)}
      className="project-card"
    >
      <TiltWrapper {...tiltProps}>
        <div className="card-inner" onMouseMove={handleMouseMove}>
          
          {/* Tracking Radial Inner Glow effect */}
          {!isMobile && hov && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,217,166,0.06) 0%, transparent 60%)`
            }} />
          )}

          {/* Thumbnail area */}
          <div className="card-preview" style={{ background: p.gradient }}>
            
            {/* Card Number indicator */}
            <div className="card-number">
               {String(i + 1).padStart(2, '0')}
            </div>
            
            <motion.img 
              src={p.image} alt={p.name} className="preview-img" 
              animate={hov && !isMobile ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Hover Overlay Panel */}
            <motion.div 
              className="hover-overlay-panel"
              initial={{ y: "100%", opacity: 0 }}
              animate={hov ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                {p.links.demo && (
                  <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="btn-demo">
                    Live Demo ↗
                  </a>
                )}
                {p.links.github && (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="btn-github">
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>

            {/* Featured Badge */}
            {p.featured && (
              <div className="featured-badge">
                ✦ Featured
              </div>
            )}
          </div>

          {/* Body */}
          <div className="card-body">
            <div className="tags-row">
              {p.tags.map(t => <TechBadge key={t} t={t} />)}
            </div>
            <h3 className="card-title">{p.name}</h3>
            <p className="card-desc">{p.desc}</p>
            <div className="links-row">
              {p.links.demo   && <a href={p.links.demo}   target="_blank" rel="noopener noreferrer" className="link-item primary"><FiExternalLink size={11}/> Demo</a>}
              {p.links.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="link-item sec"><FiGithub size={11}/> GitHub</a>}
              {p.links.yt     && <a href={p.links.yt}     target="_blank" rel="noopener noreferrer" className="link-item yt"><FiYoutube size={11}/> Video</a>}
            </div>
          </div>
        </div>
      </TiltWrapper>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const list = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" ref={ref} className="projects-section">
      <div className="projects-wrap">
        
        {/* Section Header */}
        <motion.div initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="projects-header-row"
        >
          <div>
            <div className="sec-label-row">
              <motion.div className="label-line" initial={{ width: 0 }} animate={inView ? { width: 40 } : {}} transition={{ duration: 0.6 }} />
              <p className="sec-label-text">PROJECTS</p>
            </div>
            <h2 className="sec-title">
              <span className="projects-heading-plain">Featured</span> <span className="projects-accent italic">Work</span>
            </h2>
            <p className="sec-sub">A curated collection showcasing full-stack capability and creative problem-solving.</p>
          </div>
          
          <motion.a href="https://github.com/vishvpatel210" target="_blank" rel="noopener noreferrer" 
            className="btn-github-viewall"
            whileHover="hover"
          >
            <img src="https://cdn.simpleicons.org/github/ffffff" width="16" alt="GH" />
            <span>View All on GitHub</span>
            <motion.span variants={{ hover: { x: 4 } }}>→</motion.span>
          </motion.a>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div initial={{ opacity:0,x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.15 }}
          className="filter-row"
        >
          {FILTERS.map(f => {
            const count = getFilterCount(f);
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} className={`filter-tab ${active ? 'active' : ''}`}>
                {f} <span className="filter-badge">{count}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Bento Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="projects-grid">
            {list.map((p, i) => <Card key={p.id} p={p} inView={inView} i={i} isMobile={isMobile}/>)}
          </motion.div>
        </AnimatePresence>

      </div>

      <style>{`
        .projects-section {
          padding: 120px var(--px); 
          background: #0a110e;
        }

        .projects-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .projects-header-row {
          display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 24px; margin-bottom: 40px;
        }

        .sec-label-row {
          display: flex; align-items: center; gap: 12px; margin-bottom: 8px;
        }
        .label-line {
          height: 1px; background: #00d9a6;
        }
        .sec-label-text {
          font-family: var(--font-mono); font-size: 0.85rem; color: #00d9a6; letter-spacing: 0.15em; font-weight: 600; margin: 0;
        }

        .sec-title {
          font-family: var(--font-display); font-size: clamp(2.4rem, 5vw, 3.6rem); margin: 0 0 12px 0; letter-spacing: -0.03em;
        }
        .text-white { color: #fff; }
        .font-bold { font-weight: 800; }
        .glowing {
          text-shadow: 0 0 30px rgba(0,217,166,0.4);
          color: #00d9a6;
        }

        .sec-sub {
          font-family: var(--font-mono); font-size: 0.95rem; color: #a0a0a0; max-width: 500px; line-height: 1.6; margin: 0;
        }

        .btn-github-viewall {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); 
          color: #fff; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600;
          text-decoration: none; transition: border-color 0.3s, box-shadow 0.3s;
          flex-shrink: 0;
        }
        .btn-github-viewall:hover {
          border-color: rgba(255,255,255,0.3);
          box-shadow: 0 0 15px rgba(255,255,255,0.05);
        }

        /* ── Filters ── */
        .filter-row {
          display: flex; gap: 10px; margin-bottom: 40px; flex-wrap: wrap;
        }

        .filter-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 18px; border-radius: 999px; font-family: var(--font-mono); font-size: 0.85rem; 
          border: 1px solid rgba(255,255,255,0.08); background: #1a202c; color: #a0a0a0; cursor: pointer; transition: all 0.2s;
        }
        .filter-tab:hover {
           border-color: rgba(0,217,166,0.4); color: #00d9a6;
        }
        .filter-tab.active {
           background: #00d9a6; color: #0b1f1a; border-color: #00d9a6; font-weight: 700;
           box-shadow: 0 0 15px rgba(0,217,166,0.4);
        }

        .filter-badge {
           background: rgba(0,217,166,0.15); border-radius: 999px; padding: 2px 6px; font-size: 0.70rem; transition: background 0.2s;
        }
        .filter-tab:hover .filter-badge {
           background: rgba(0,217,166,0.3);
        }
        .filter-tab.active .filter-badge {
           background: rgba(11,31,26,0.15); color: #0b1f1a;
        }

        /* ── Grid Configurations ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 24px;
        }
        
        .project-card {
           background: linear-gradient(135deg, rgba(0,217,166,0.3), transparent, rgba(0,217,166,0.1));
           padding: 1px;
           border-radius: 20px;
           display: flex;
           cursor: pointer;
           transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                       box-shadow 0.4s ease, 
                       border-color 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 12px 32px rgba(0, 217, 166, 0.15),
            0 0 0 1px rgba(0, 217, 166, 0.4);
        }

        .card-inner {
           position: relative;
           background: #1a202c;
           border-radius: 19px;
           overflow: hidden;
           display: flex;
           flex-direction: column;
           height: 100%;
           width: 100%;
           transition: border-color 0.3s ease;
        }

        /* ── Shimmer sweep pseudo-element ── */
        .card-inner::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(
            110deg,
            transparent,
            rgba(0, 217, 166, 0.08),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          z-index: 5;
          pointer-events: none;
        }
        .project-card:hover .card-inner::before {
          left: 150%;
        }

        /* ── Top accent bar ── */
        .card-inner::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00d9a6, rgba(0,217,166,0.3), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }
        .project-card:hover .card-inner::after {
          transform: scaleX(1);
        }

        /* ── Card Content Styles ── */
        .card-preview {
           height: 200px;
           position: relative;
           overflow: hidden;
        }
        
        .preview-img {
           position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center;
        }

        .hover-overlay-panel {
           position: absolute; bottom: 0; left: 0; right: 0;
           background: linear-gradient(to top, #050f0d, rgba(5,15,13,0.95), transparent);
           padding: 30px 20px 20px 20px;
           display: flex; z-index: 20;
        }

        .btn-demo {
           padding: 8px 16px; border-radius: 6px; background: #00d9a6; color: #0b1f1a; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; text-decoration: none;
        }

        .btn-github {
           padding: 8px 16px; border-radius: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-family: var(--font-mono); font-size: 0.8rem; text-decoration: none;
        }

        .card-number {
           position: absolute; top: 8px; right: 20px;
           color: rgba(255,255,255,0.06); font-size: 5rem; font-weight: 900; line-height: 1; z-index: 0;
           font-family: var(--font-display);
           user-select: none; pointer-events: none;
        }

        .featured-badge {
           position: absolute; top: 16px; left: 16px; padding: 6px 14px; border-radius: 999px;
           background: linear-gradient(90deg, #00d9a6, #00ffcc, #00d9a6);
           background-size: 200%;
           color: #0b1f1a; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700;
           animation: shinePulse 3s infinite linear;
           box-shadow: 0 0 10px rgba(0,217,166,0.3);
           z-index: 10;
        }

        @keyframes shinePulse {
           0% { background-position: 0% 50%; box-shadow: 0 0 0px rgba(0,217,166,0); }
           50% { box-shadow: 0 0 15px rgba(0,217,166,0.8); }
           100% { background-position: 200% 50%; box-shadow: 0 0 0px rgba(0,217,166,0); }
        }

        .card-body {
           padding: 24px;
           position: relative; z-index: 1;
           display: flex; flex-direction: column; flex: 1;
        }
        
        .tags-row {
           display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;
        }

        .tech-badge {
           display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; border: 1px solid rgba(255,255,255,0.08); color: #a0a0a0; font-family: var(--font-mono);
        }

        .card-title {
           font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; margin-bottom: 10px; color: #fff;
        }

        .card-desc {
           font-family: var(--font-mono); font-size: 0.85rem; color: #a0a0a0; line-height: 1.6; margin-bottom: 24px; flex: 1;
        }

        .links-row {
           display: flex; gap: 16px; flex-wrap: wrap; align-items: center;
        }

        .link-item {
           font-family: var(--font-mono); font-size: 0.75rem; display: flex; align-items: center; gap: 6px; text-decoration: none;
        }
        .link-item.primary { color: #00d9a6; }
        .link-item.sec { color: #a0a0a0; }
        .link-item.yt { color: #ff4444; }

        /* ── Responsive Mobile Mapping ── */
        @media (max-width: 1024px) {
          .projects-grid {
             grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .projects-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .projects-grid {
             grid-template-columns: 1fr;
          }
          .sec-title {
             font-size: 2.2rem;
          }
        }

        @media (max-width: 480px) {
          .filter-row {
            gap: 8px;
          }
          .filter-tab {
            padding: 6px 14px;
            font-size: 0.78rem;
          }
          .card-preview {
            height: 180px;
          }
        }
      `}</style>
    </section>
  );
}
