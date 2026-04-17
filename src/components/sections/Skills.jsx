import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiHtml5, SiCss as SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiCplusplus, SiGit, SiGithub, SiPostman, SiFigma, SiVite, SiVercel, SiNetlify
} from 'react-icons/si';
import { TbApi, TbBrandFramerMotion, TbLetterC } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    emoji: '🖥️',
    skills: [
      { name: 'HTML5',         Icon: SiHtml5,        color: '#E34F26' },
      { name: 'CSS3',          Icon: SiCss3,         color: '#1572B6' },
      { name: 'JavaScript',    Icon: SiJavascript,   color: '#F7DF1E' },
      { name: 'React.js',      Icon: SiReact,        color: '#61DAFB' },
      { name: 'Tailwind CSS',  Icon: SiTailwindcss,  color: '#06B6D4' },
      { name: 'Framer Motion', Icon: TbBrandFramerMotion, color: '#BB4B96' },
    ],
  },
  {
    title: 'Backend & Database',
    emoji: '⚙️',
    skills: [
      { name: 'Node.js',    Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', Icon: SiExpress,   color: '#FFFFFF' },
      { name: 'MongoDB',    Icon: SiMongodb,   color: '#47A248' },
      { name: 'REST APIs',  Icon: TbApi,       color: '#6fe7d2' },
      { name: 'SQL (MySQL)',Icon: SiMysql,     color: '#4479A1' },
    ],
  },
  {
    title: 'Languages & Tools',
    emoji: '🛠️',
    skills: [
      { name: 'C',        Icon: TbLetterC,            color: '#A8B9CC' },
      { name: 'C++',      Icon: SiCplusplus,          color: '#00599C' },
      { name: 'Git',      Icon: SiGit,                color: '#F05032' },
      { name: 'GitHub',   Icon: SiGithub,             color: '#FFFFFF' },
      { name: 'VS Code',  Icon: VscCode,              color: '#007ACC' },
      { name: 'Postman',  Icon: SiPostman,            color: '#FF6C37' },
      { name: 'Figma',    Icon: SiFigma,              color: '#F24E1E' },
      { name: 'Vite',     Icon: SiVite,               color: '#646CFF' },
      { name: 'Vercel',   Icon: SiVercel,             color: '#FFFFFF' },
      { name: 'Netlify',  Icon: SiNetlify,            color: '#00C7B7' },
    ],
  },
];

/* ── Individual Skill Pill Component ── */
const SkillPill = ({ skill, isMobile }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const Icon = skill.Icon;

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      className={`skills-pill`}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
      }}
      whileHover={isMobile ? {} : {
        y: -8,
        scale: 1.04,
        borderColor: `${skill.color}80`,
        boxShadow: `0 0 0 1px ${skill.color}40, 0 0 24px ${skill.color}25, 0 12px 32px rgba(0,0,0,0.5)`,
        backgroundColor: `${skill.color}0d`,
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ '--icon-color': skill.color, position: 'relative', overflow: 'hidden' }}
    >
      {/* Shimmer top bar — icon color */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          opacity: 0,
          zIndex: 3,
          borderRadius: '12px 12px 0 0',
        }}
        animate={hovering ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Mouse-tracking radial inner glow */}
      {!isMobile && hovering && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', borderRadius: '11px',
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${skill.color}18 0%, transparent 65%)`
        }} />
      )}

      {/* Icon — scale + glow on hover */}
      <motion.div
        className="skill-icon-wrap"
        animate={hovering
          ? { scale: 1.3, rotate: 10, filter: `drop-shadow(0 0 8px ${skill.color})` }
          : { scale: 1, rotate: 0, filter: 'none' }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon size={20} color={skill.color} />
      </motion.div>

      {/* Text — white on hover */}
      <motion.span
        className="skill-text"
        animate={hovering ? { color: '#ffffff' } : { color: '#c4ccc8' }}
        transition={{ duration: 0.2 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
};


export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let globalIdx = -1;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: isMobile ? 0.04 : 0.07, delayChildren: 0.1 } 
    },
  };

  return (
    <section id="skills" ref={ref} className="skills-section">
      
      <div className="skills-wrap">
        
        <div className="skills-heading-container">
          {/* Scroll-Triggered Counter Badge */}
          <motion.div 
            className="skills-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div className="skills-badge-dot" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            10+ Technologies Mastered
          </motion.div>

          {/* Heading Reveal */}
          <motion.h2 
            className="skills-heading"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="skills-heading-plain">My</span> <span className="skills-accent">Skills</span>
          </motion.h2>
        </div>

        {/* Categories */}
        <motion.div
          className="skills-categories"
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <motion.div key={cat.title} className="skills-category-group" variants={{
              hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: isMobile ? 0.04 : 0.07 } }
            }}>
              
              {/* Category Header */}
              <div className="skills-cat-header">
                <motion.div className="skills-cat-line" initial={{ width: 0 }} animate={inView ? { width: 32 } : {}} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.div className="skills-cat-dot" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="skills-cat-emoji">{cat.emoji}</span>
                <h3>{cat.title}</h3>
              </div>

              {/* Thin Divider Line (Scroll Gradient Animate) */}
              <motion.div 
                className="skills-cat-divider" 
                initial={{ width: '0%' }} 
                animate={inView ? { width: '100%' } : {}} 
                transition={{ duration: 1, delay: 0.3 + catIdx * 0.15 }} 
              />

              {/* Grid of Pills */}
              <div className="skills-pills-grid">
                {cat.skills.map((skill) => {
                  globalIdx++;
                  return (
                    <SkillPill 
                      key={skill.name} 
                      skill={skill} 
                      isMobile={isMobile} 
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .skills-section {
          padding: 120px var(--px);
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }


        .skills-wrap {
          position: relative; 
          z-index: 2;
          max-width: 1000px; margin: 0 auto;
        }

        /* ── Header ── */
        .skills-heading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 56px;
        }

        .skills-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 9999px;
          background: rgba(0, 217, 166, 0.05);
          border: 1px solid rgba(0, 217, 166, 0.3);
          color: #00d9a6;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .skills-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00d9a6;
          box-shadow: 0 0 8px #00d9a6;
        }

        .skills-heading {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          margin: 0;
          letter-spacing: -0.03em;
        }

        .skills-heading-plain {
          color: #fff;
          font-weight: 800;
        }

        .skills-accent {
          color: #00d9a6;
          font-weight: 800;
          text-shadow: 0 0 30px rgba(0,217,166,0.5), 0 0 60px rgba(0,217,166,0.2);
        }

        /* ── Categories ── */
        .skills-categories {
          display: flex; flex-direction: column; gap: 44px;
        }

        .skills-category-group {
          background: linear-gradient(180deg, rgba(0,217,166,0.02) 0%, transparent 100%);
          border-left: 1px solid rgba(0,217,166,0.08);
          padding-left: 16px;
          border-radius: 0 8px 8px 0;
          padding-top: 10px;
          padding-bottom: 20px;
        }

        .skills-cat-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
        }

        .skills-cat-line {
          height: 2px;
          background: #00d9a6;
          border-radius: 2px;
        }

        .skills-cat-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #00d9a6;
          box-shadow: 0 0 8px #00d9a6;
          flex-shrink: 0;
        }

        .skills-cat-emoji {
          font-size: 20px;
          transition: transform 0.3s, filter 0.3s;
          cursor: default;
        }
        
        .skills-cat-header:hover .skills-cat-emoji {
          transform: rotate(10deg);
          filter: brightness(1.2);
        }

        .skills-cat-header h3 {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: #e0e6e3;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .skills-cat-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(0,217,166,0) 0%, rgba(0,217,166,0.3) 50%, rgba(0,217,166,0) 100%);
          margin-bottom: 24px;
        }

        /* ── Pill Grid ── */
        .skills-pills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .skills-pill {
          position: relative;
          display: flex; align-items: center; gap: 10px;
          padding: 12px 18px;
          background: #1a202c;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          cursor: pointer;
        }

        .skill-icon-wrap {
          display: flex;
          align-items: center; justify-content: center;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s;
        }

        .skill-text {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 500;
          color: #c4ccc8;
          white-space: nowrap;
          transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hover states */
        .skills-pill:hover .skill-icon-wrap {
          transform: scale(1.2) rotate(5deg) !important;
          filter: drop-shadow(0 0 8px var(--icon-color));
        }

        .skills-pill:hover .skill-text {
          color: #ffffff;
        }

        /* Spotlight cycle effect */
        .skills-pill-spotlight {
          border: 1px solid #00d9a6 !important;
          box-shadow: 0 0 20px rgba(0,217,166,0.3), 0 0 40px rgba(0,217,166,0.1) !important;
          background: rgba(0,217,166,0.05);
          transition: all 0.4s ease;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .skills-pills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .skills-pills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .skills-pill {
            padding: 10px 14px;
          }
          .skill-text {
            font-size: 0.78rem;
          }
        }
      `}</style>
    </section>
  );
}
