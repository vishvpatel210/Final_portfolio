import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube, FiArrowRight, FiDownload } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { PERSONAL } from '../../data/portfolioData';
import s from './Hero.module.css';

/* ── Stagger container variant ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/* ── Child item variant ── */
const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ── Button hover animation ── */
const btnHover = {
  scale: 1.05,
  transition: { duration: 0.3, ease: 'easeOut' },
};
const btnTap = { scale: 0.97 };

const SOCS = [
  { href: PERSONAL.socials.github,   Icon: FiGithub,   label:'GitHub' },
  { href: PERSONAL.socials.linkedin, Icon: FiLinkedin, label:'LinkedIn' },
  { href: PERSONAL.socials.leetcode, Icon: SiLeetcode, label:'LeetCode' },
  { href: PERSONAL.socials.twitter,  Icon: FiTwitter,  label:'Twitter' },
  { href: PERSONAL.socials.youtube,  Icon: FiYoutube,  label:'YouTube' },
];

export default function Hero() {
  const resumeHref = `${import.meta.env.BASE_URL}vishv-resume.pdf`;

  return (
    <motion.section
      id="hero"
      className={s.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={s.grid} />
      <div className={s.blob1} /><div className={s.blob2} />

      {/* Subtle floating orbs */}
      <motion.div
        className={s.floatOrb1}
        animate={{ y: [-20, 20, -20], x: [-8, 8, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={s.floatOrb2}
        animate={{ y: [15, -25, 15], x: [5, -10, 5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={s.floatOrb3}
        animate={{ y: [-12, 18, -12], x: [-6, 12, -6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Staggered content */}
      <motion.div
        className={s.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={s.badge} variants={itemVariants}>
          <span className={s.pulse} /> Available for opportunities
        </motion.div>

        <motion.h1 className={`${s.name} hero-name`} variants={itemVariants}>
          <span className={s.hi}>Hi, I'm</span>
          <span className={s.nameMain}>Vishv Patel</span>
        </motion.h1>

        <motion.div className={s.roleRow} variants={itemVariants}>
          <span>I build&nbsp;</span>
          <TypeAnimation
            sequence={[
              'Frontend Interfaces', 2200,
              'MERN Stack Apps', 2200,
              'Full-Stack Web Apps', 2200,
              'REST APIs & Backends', 2200,
              'Beautiful UI/UX', 2200,
            ]}
            wrapper="span" speed={52} repeat={Infinity} className={s.roleType}
          />
        </motion.div>

        <motion.p className={s.desc} variants={itemVariants}>{PERSONAL.bio1}</motion.p>

        <motion.div className={s.ctas} variants={itemVariants}>
          <motion.div whileHover={btnHover} whileTap={btnTap}>
            <Link to="/projects" className="btn-p">
              View Work <FiArrowRight size={14}/>
            </Link>
          </motion.div>
          <motion.div whileHover={btnHover} whileTap={btnTap}>
            <Link to="/contact" className="btn-o">Contact Me</Link>
          </motion.div>
          <motion.a
            href={resumeHref}
            className={s.dlBtn}
            download="Vishv-Patel-Resume.pdf"
            whileHover={{ scale: 1.05, color: 'var(--primary)' }}
            whileTap={btnTap}
          >
            <FiDownload size={13}/> Resume
          </motion.a>
        </motion.div>

        <motion.div className={s.socials} variants={itemVariants}>
          {SOCS.map(({ href, Icon, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={s.socBtn}
              aria-label={label}
              whileHover={{ y: -6, scale: 1.12, boxShadow: '0 12px 28px rgba(111,231,210,.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}
            >
              <Icon size={17}/>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating code window */}
      <motion.div className={s.codeWin}
        initial={{ opacity: 0, x: 80, rotateY: -8 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={s.cwBar}>
          <span className={`${s.d} ${s.dr}`}/><span className={`${s.d} ${s.dy}`}/><span className={`${s.d} ${s.dg}`}/>
          <span className={s.cwFile}>developer.js</span>
        </div>
        <div className={s.cwBody}>
          <div><span style={{color:'#ff79c6'}}>const</span> <span style={{color:'#ccd6f6'}}>vishv</span> <span style={{color:'#00f5ff'}}>=</span> <span style={{color:'#00f5ff'}}>{'{'}</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#6fe7d2'}}>name</span><span style={{color:'#00f5ff'}}>:</span> <span style={{color:'#c3e88d'}}>'Vishv Patel'</span><span style={{color:'#00f5ff'}}>,</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#6fe7d2'}}>role</span><span style={{color:'#00f5ff'}}>:</span> <span style={{color:'#c3e88d'}}>'Full-Stack Dev'</span><span style={{color:'#00f5ff'}}>,</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#6fe7d2'}}>skills</span><span style={{color:'#00f5ff'}}>: [</span></div>
          <div style={{paddingLeft:32}}><span style={{color:'#c3e88d'}}>'React'</span><span style={{color:'#00f5ff'}}>,</span> <span style={{color:'#c3e88d'}}>'Node.js'</span><span style={{color:'#00f5ff'}}>,</span></div>
          <div style={{paddingLeft:32}}><span style={{color:'#c3e88d'}}>'TypeScript'</span><span style={{color:'#00f5ff'}}>,</span> <span style={{color:'#c3e88d'}}>'MongoDB'</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#00f5ff'}}>],</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#6fe7d2'}}>available</span><span style={{color:'#00f5ff'}}>:</span> <span style={{color:'#ff79c6'}}>true</span></div>
          <div><span style={{color:'#00f5ff'}}>{'}'}</span></div>
          <div><span className={s.caret}/></div>
        </div>
      </motion.div>

      <motion.div className={s.scroll} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.6}}>
        <div className={s.scrollLine}/><span>SCROLL</span>
      </motion.div>
    </motion.section>
  );
}
