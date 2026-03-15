import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube, FiArrowRight, FiDownload } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { PERSONAL } from '../../data/portfolioData';
import s from './Hero.module.css';

const fu = d => ({ initial:{opacity:0,y:30}, animate:{opacity:1,y:0}, transition:{duration:.7,delay:d,ease:[.4,0,.2,1]} });

const SOCS = [
  { href: PERSONAL.socials.github,   Icon: FiGithub,   label:'GitHub' },
  { href: PERSONAL.socials.linkedin, Icon: FiLinkedin, label:'LinkedIn' },
  { href: PERSONAL.socials.leetcode, Icon: SiLeetcode, label:'LeetCode' },
  { href: PERSONAL.socials.twitter,  Icon: FiTwitter,  label:'Twitter' },
  { href: PERSONAL.socials.youtube,  Icon: FiYoutube,  label:'YouTube' },
];

const K = ({c}) => <span style={{color:c}}>{c}</span>;

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, pts = [], id;
    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 100; i++) pts.push({
      x: Math.random() * 2000, y: Math.random() * 1400,
      vx: (Math.random() - .5) * .28, vy: -(Math.random() * .35 + .05),
      r: Math.random() * 1.3 + .3,
      a: Math.random() * .45 + .07,
      c: Math.random() > .5 ? '100,255,218' : '0,245,255',
    });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4 || p.x > W + 4) p.vx *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id); };
  }, []);

  const go = href => { const el = document.querySelector(href); if (el) window.scrollTo({ top: el.offsetTop - 78, behavior:'smooth' }); };

  return (
    <section id="hero" className={s.hero}>
      <canvas ref={canvasRef} className={s.canvas} />
      <div className={s.grid} />
      <div className={s.blob1} /><div className={s.blob2} />

      <div className={s.content}>
        <motion.div className={s.badge} {...fu(.1)}>
          <span className={s.pulse} /> Available for opportunities
        </motion.div>

        <motion.h1 className={`${s.name} hero-name`} {...fu(.2)}>
          <span className={s.hi}>Hi, I'm</span>
          <span className={s.nameMain}>Vishv Patel</span>
        </motion.h1>

        <motion.div className={s.roleRow} {...fu(.3)}>
          <span>I build&nbsp;</span>
          <TypeAnimation
            sequence={['Full-Stack Web Apps',2200,'React Interfaces',2200,'REST APIs & Backends',2200,'Beautiful UI/UX',2200]}
            wrapper="span" speed={52} repeat={Infinity} className={s.roleType}
          />
        </motion.div>

        <motion.p className={s.desc} {...fu(.4)}>{PERSONAL.bio1}</motion.p>

        <motion.div className={s.ctas} {...fu(.5)}>
          <button className="btn-p" onClick={() => go('#projects')}>
            View Projects <FiArrowRight size={14}/>
          </button>
          <button className="btn-o" onClick={() => go('#contact')}>Get In Touch</button>
          <a href="#" className={s.dlBtn} onClick={e=>e.preventDefault()}>
            <FiDownload size={13}/> Resume
          </a>
        </motion.div>

        <motion.div className={s.socials} {...fu(.6)}>
          {SOCS.map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className={s.socBtn} aria-label={label}>
              <Icon size={17}/>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Floating code window */}
      <motion.div className={s.codeWin}
        initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
        transition={{ duration:.9, delay:.6, ease:[.4,0,.2,1] }}
      >
        <div className={s.cwBar}>
          <span className={`${s.d} ${s.dr}`}/><span className={`${s.d} ${s.dy}`}/><span className={`${s.d} ${s.dg}`}/>
          <span className={s.cwFile}>developer.js</span>
        </div>
        <div className={s.cwBody}>
          <div><span style={{color:'#ff79c6'}}>const</span> <span style={{color:'#ccd6f6'}}>vishv</span> <span style={{color:'#00f5ff'}}>=</span> <span style={{color:'#00f5ff'}}>{'{'}</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#64ffda'}}>name</span><span style={{color:'#00f5ff'}}>:</span> <span style={{color:'#c3e88d'}}>'Vishv Patel'</span><span style={{color:'#00f5ff'}}>,</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#64ffda'}}>role</span><span style={{color:'#00f5ff'}}>:</span> <span style={{color:'#c3e88d'}}>'Full-Stack Dev'</span><span style={{color:'#00f5ff'}}>,</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#64ffda'}}>skills</span><span style={{color:'#00f5ff'}}>: [</span></div>
          <div style={{paddingLeft:32}}><span style={{color:'#c3e88d'}}>'React'</span><span style={{color:'#00f5ff'}}>,</span> <span style={{color:'#c3e88d'}}>'Node.js'</span><span style={{color:'#00f5ff'}}>,</span></div>
          <div style={{paddingLeft:32}}><span style={{color:'#c3e88d'}}>'TypeScript'</span><span style={{color:'#00f5ff'}}>,</span> <span style={{color:'#c3e88d'}}>'MongoDB'</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#00f5ff'}}>],</span></div>
          <div style={{paddingLeft:16}}><span style={{color:'#64ffda'}}>available</span><span style={{color:'#00f5ff'}}>:</span> <span style={{color:'#ff79c6'}}>true</span></div>
          <div><span style={{color:'#00f5ff'}}>{'}'}</span></div>
          <div><span className={s.caret}/></div>
        </div>
      </motion.div>

      <motion.div className={s.scroll} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}>
        <div className={s.scrollLine}/><span>SCROLL</span>
      </motion.div>
    </section>
  );
}
