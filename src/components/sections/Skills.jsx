import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiHtml5, SiCss as SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiCplusplus, SiPython, SiGit, SiGithub, SiPostman
} from 'react-icons/si';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss3 },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'React.js', Icon: SiReact },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
    ]
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express.js', Icon: SiExpress },
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'SQL', Icon: SiMysql },
    ]
  },
  {
    title: 'Languages & Tools',
    skills: [
      { name: 'C++', Icon: SiCplusplus },
      { name: 'Python', Icon: SiPython },
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Postman', Icon: SiPostman },
    ]
  }
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <section id="skills" ref={ref} style={{ padding: 'var(--py) var(--px)', background: '#070f0d', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle cyan grid lines */}
      <div className="skills-grid" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,220,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,160,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', margin: 0, fontFamily: 'var(--font-display)' }}>
            My <span style={{ color: '#00dca0' }}>Skills</span>
          </h2>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div key={cat.title} variants={itemVariants}>
              {/* Category Heading & Divider */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px', fontFamily: 'var(--font-display)', textAlign: 'left' }}>
                  {cat.title}
                </h3>
                <div className="skills-divider" style={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
              </div>

              {/* Skills Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {cat.skills.map((skill) => {
                  const Icon = skill.Icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -3 }}
                      className="skill-pill"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'default'
                      }}
                    >
                      <Icon size={22} color="#00dca0" />
                      <span className="skill-name" style={{ fontSize: '15px', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
