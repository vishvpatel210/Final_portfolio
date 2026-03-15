import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PERSONAL } from '../../data/portfolioData';
import vp from '../../assets/225858041.jpg';

const TAGS = ['React','Node.js','Next.js','Tailwind CSS','MongoDB','Git','Figma'];
const MINI = [{ v:'10+', l:'Projects' },{ v:'3', l:'Certificates' },{ v:'10+', l:'Technologies' }];

const fade = (d=0) => ({ hidden:{opacity:0,y:30}, show:{opacity:1,y:0,transition:{duration:.65,delay:d,ease:[.4,0,.2,1]}} });

export default function About() {
  const [ref, inView] = useInView({ threshold:.12, triggerOnce:true });

  return (
    <section id="about" ref={ref} style={{ padding:'var(--py) var(--px)', background:'var(--bg-secondary)', position:'relative', overflow:'hidden' }}>
      {/* decorative ring */}
      <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%', border:'1px solid rgba(100,255,218,.05)', top:'-150px', right:'-150px', pointerEvents:'none' }}/>

      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.45fr', gap:'64px', alignItems:'center' }} className="two-col">

          {/* ── Avatar ── */}
          <motion.div variants={fade(0)} initial="hidden" animate={inView?'show':'hidden'} style={{ position:'relative' }}>
            <div style={{
              borderRadius:'20px',
              overflow:'hidden',
              border:'1px solid var(--border-solid)',
              aspectRatio:'4/5',
              position:'relative',
              boxShadow:'0 24px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(100,255,218,.07)',
            }}>
              {/* Real Photo */}
              <img
                src={vp}
                alt="Vishv Patel"
                style={{
                  width:'100%',
                  height:'100%',
                  objectFit:'cover',
                  objectPosition:'center top',
                  display:'block',
                }}
              />
              {/* Subtle teal overlay at bottom for blending with theme */}
              <div style={{
                position:'absolute',
                bottom:0, left:0, right:0,
                height:'40%',
                background:'linear-gradient(to top, rgba(10,15,20,.65), transparent)',
                pointerEvents:'none',
              }}/>
              {/* Teal glow border effect */}
              <div style={{
                position:'absolute',
                inset:0,
                borderRadius:'20px',
                boxShadow:'inset 0 0 0 1px rgba(100,255,218,.12)',
                pointerEvents:'none',
              }}/>
            </div>

          </motion.div>

          {/* ── Text ── */}
          <motion.div variants={fade(.12)} initial="hidden" animate={inView?'show':'hidden'}>
            <p className="sec-label">About Me</p>
            <h2 className="sec-title" style={{ marginBottom:22 }}>
              Crafting <span className="accent">Digital</span> <span className="italic">Experiences</span>
            </h2>
            <p style={{ color:'var(--text-secondary)', fontSize:'.96rem', lineHeight:1.9, marginBottom:16 }}>
              I'm a passionate <strong style={{ color:'var(--text-accent)' }}>Full-Stack Developer</strong> from India with hands-on experience building modern web applications from the ground up.
            </p>
            <p style={{ color:'var(--text-secondary)', fontSize:'.96rem', lineHeight:1.9, marginBottom:30 }}>
              With deep expertise in both <strong style={{ color:'var(--primary)' }}>front-end polish</strong> and <strong style={{ color:'var(--secondary)' }}>back-end architecture</strong>, I bring ideas to life using React, Node.js, and modern cloud tooling.
            </p>

            {/* Tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:30 }}>
              {TAGS.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            {/* Mini stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
               {MINI.map(({ v, l }) => (
                 <div key={l} className="stat-card" style={{ background:'var(--surface)', borderRadius:'var(--r)', padding:'18px 14px', border:'1px solid var(--border-solid)', textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'1.9rem', fontWeight:800, color:'var(--primary)', lineHeight:1 }}>{v}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', color:'var(--text-secondary)', marginTop:5, letterSpacing:'.06em' }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}