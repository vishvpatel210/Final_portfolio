import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { FiCode, FiBriefcase, FiBook } from 'react-icons/fi';
import vp from '../../assets/about-me-photo.jpg';

/* ── CountUp Hook ── */
function useCountUp(target, inView, duration = 2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return count;
}

/* ── Stat Card Component ── */
function StatCard({ icon: Icon, value, suffix, label, inView }) {
  const count = useCountUp(value, inView);
  
  return (
    <motion.div 
      className="about-stat-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
      }}
      whileHover={{ borderColor: 'rgba(0, 217, 166, 0.4)' }}
    >
      <div className="about-stat-icon">
        <Icon size={18} />
      </div>
      <div className="about-stat-info">
        <div className="about-stat-value">{count}{suffix}</div>
        <div className="about-stat-label">{label}</div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // trigger on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const aboutSectionRef = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const setRefs = useCallback(
    (node) => {
      aboutSectionRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  const TiltWrapper = isMobile ? React.Fragment : Tilt;
  const tiltProps = isMobile ? {} : {
    tiltMaxAngleX: 8,
    tiltMaxAngleY: 8,
    glareEnable: true,
    glareMaxOpacity: 0.08,
    glareColor: "#00d9a6",
    glarePosition: "all",
    glareBorderRadius: "16px",
    scale: 1.03,
    transitionSpeed: 400
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <section id="about" ref={setRefs} className="about-section">

      <div className="about-wrap">
        <div className="about-grid">
          
          {/* ── LEFT: Personal Photo ── */}
          <div className="about-photo-col">
            <div className="about-photo-wrapper">
              
              {/* EFFECT 2: Glowing border ring (Solid) */}
              <motion.div
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '16px',
                  border: '1px solid #00d9a6',
                  zIndex: 1
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
              />

              {/* EFFECT 2: Glow pulse shadow */}
              <motion.div
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '16px',
                  zIndex: 0
                }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(0,217,166,0)",
                    "0 0 40px rgba(0,217,166,0.3)",
                    "0 0 0px rgba(0,217,166,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* EFFECT 2: Rotating dashed ring (disabled on mobile) */}
              {!isMobile && (
                <motion.div 
                  style={{
                    position: 'absolute', inset: '-8px',
                    borderRadius: '24px',
                    border: '1px dashed rgba(0,217,166,0.3)',
                    zIndex: 0
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* EFFECT 4: Corner accent dots */}
              {[
                { top: '-3px', left: '-3px' }, 
                { top: '-3px', right: '-3px' }, 
                { bottom: '-3px', left: '-3px' }, 
                { bottom: '-3px', right: '-3px' }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute', ...pos,
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: '#00d9a6',
                    zIndex: 10
                  }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <motion.div
                    style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#00d9a6' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}

              {/* EFFECT 1, 3, 4: Actual photo with tilt and entrance (scroll parallax removed) */}
              <motion.div 
                initial={{ opacity: 0, x: -60, scale: 0.9 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}
              >
                <TiltWrapper {...tiltProps} style={{ width: '100%', height: '100%' }}>
                  <motion.img
                    src={vp}
                    className="about-photo-img"
                    alt="Vishv Patel"
                  />
                </TiltWrapper>
              </motion.div>

              {/* EFFECT 6: Floating location badge */}
              <motion.div
                className="about-location-badge-wrapper"
                style={{ position: 'absolute', bottom: '20px', right: '-8px', zIndex: 10 }}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  className="about-location-badge"
                  style={{ position: 'relative', bottom: 0, right: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05, borderColor: '#00d9a6' }}
                >
                  📍 Gandhinagar, India
                </motion.div>
              </motion.div>
              
            </div>
          </div>

          {/* ── RIGHT: About Content ── */}
          <motion.div 
            className="about-content-col"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Section Tag */}
            <motion.div className="about-tag-row" variants={textVariants}>
              <span className="about-tag-line" />
              <span className="about-tag-text">ABOUT ME</span>
            </motion.div>

            {/* Heading */}
            <motion.h2 className="about-heading" variants={textVariants}>
              About <span className="accent italic">Me.</span>
            </motion.h2>

            {/* Descriptions */}
            <motion.p className="about-desc" variants={textVariants}>
              Computer Science student crafting digital experiences. I architect 
              full-stack solutions with a passion for clean code and scalable systems 
              — from MongoDB backends to React frontends. Driven by curiosity, 
              fueled by challenge.
            </motion.p>
            
            <motion.p className="about-desc" variants={textVariants}>
              I thrive on solving complex algorithmic problems and transforming 
              ideas into production-ready applications. Currently building real-world 
              MERN stack projects and participating in hackathons.
            </motion.p>

            {/* Stats Row */}
            <motion.div className="about-stats-row" variants={containerVariants}>
              <StatCard icon={FiCode} value={500} suffix="+" label="Hours Coding" inView={inView} />
              <StatCard icon={FiBriefcase} value={10} suffix="+" label="Projects" inView={inView} />
              <StatCard icon={FiBook} value={0} suffix="CS" label="Student" inView={inView} />
            </motion.div>
          </motion.div>
          
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 120px var(--px);
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }


        .about-wrap {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 70px;
          align-items: center;
        }

        /* ── Left Side: Photo ── */
        .about-photo-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about-photo-wrapper {
          position: relative;
          width: 100%;
          max-width: 320px;
          aspect-ratio: 4/5;
        }

        .about-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 16px;
          background: #0a1a15;
        }

        .about-location-badge {
          background: rgba(0, 217, 166, 0.1);
          border: 1px solid rgba(0, 217, 166, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #e0e0e0;
          padding: 6px 14px;
          border-radius: 999px;
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: border-color 0.3s;
        }

        /* ── Right Side: Content ── */
        .about-content-col {
          display: flex;
          flex-direction: column;
        }

        .about-tag-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .about-tag-line {
          width: 40px;
          height: 1px;
          background: #00d9a6;
        }

        .about-tag-text {
          font-family: var(--font-mono), monospace;
          font-size: 0.85rem;
          color: #00d9a6;
          letter-spacing: 0.15em;
          font-weight: 600;
        }

        .about-heading {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 28px 0;
        }

        .about-desc {
          color: #a0a0a0;
          line-height: 1.8;
          font-family: var(--font-mono), monospace;
          font-size: 0.95rem;
          margin: 0 0 20px 0;
        }
        .about-desc:last-of-type {
          margin-bottom: 36px;
        }

        /* ── Stats Cards ── */
        .about-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .about-stat-card {
          background: rgba(0, 217, 166, 0.05);
          border: 1px solid rgba(0, 217, 166, 0.15);
          border-radius: 0.75rem;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .about-stat-icon {
          color: #00d9a6;
        }

        .about-stat-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .about-stat-value {
          font-family: var(--font-display), sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }

        .about-stat-label {
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          color: #a0a0a0;
        }

        /* ── Responsive ── */
        /* Keep responsive grids but remove old photo-frame specific queries */
        @media (min-width: 900px) {
          .about-photo-img {
            /* optional static subtle adjustments here */
          }
        }

        @media (max-width: 1024px) {
          .about-section {
            padding: 80px var(--px);
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .about-photo-wrapper {
            max-width: 280px;
            margin: 0 auto;
          }
          .about-content-col {
            align-items: center;
          }
          .about-tag-row {
            justify-content: center;
          }
          .about-location-badge-wrapper {
            right: 50%;
            transform: translateX(50%);
            bottom: 16px;
          }
          .about-stats-row {
             width: 100%;
          }
        }

        @media (max-width: 640px) {
          .about-heading {
             font-size: 2.2rem;
          }
          .about-stats-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .about-stat-card {
            flex-direction: row;
            align-items: center;
            gap: 16px;
            padding: 14px 16px;
          }
        }
      `}</style>
    </section>
  );
}