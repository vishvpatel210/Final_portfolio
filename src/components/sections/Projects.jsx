import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiYoutube } from 'react-icons/fi';
import { PROJECTS } from '../../data/portfolioData';

const FILTERS = ['All','HTML','CSS','React','Node'];

function Card({ p, inView, i }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div layout
      initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.5, delay:i*.08 }}
      whileHover={{ y:-7 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      className="project-card"
      style={{ background:'var(--surface)', borderRadius:'var(--r-lg)', border:`1px solid ${hov?'rgba(100,255,218,.35)':'var(--border-solid)'}`, overflow:'hidden', transition:'border-color .25s,box-shadow .25s', boxShadow:hov?'0 18px 55px rgba(100,255,218,.07)':'none' }}
    >
      {/* Thumbnail */}
      <div style={{ height:'188px', position:'relative', overflow:'hidden', background:p.gradient }}>
        {p.image && <img src={p.image} alt={p.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />}
        <AnimatePresence>
          {hov && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:'absolute', inset:0, background:'rgba(13,17,23,.8)', display:'flex', alignItems:'center', justifyContent:'center', gap:10, backdropFilter:'blur(3px)' }}>
              {p.links.demo && (
                <a href={p.links.demo} target="_blank" rel="noopener noreferrer"
                  style={{ padding:'8px 18px', borderRadius:'var(--r-sm)', background:'var(--primary)', color:'#0d1117', fontFamily:'var(--font-mono)', fontSize:'.76rem', fontWeight:700, display:'flex', alignItems:'center', gap:5 }}>
                  <FiExternalLink size={12}/> Live Demo
                </a>
              )}
              {p.links.github && (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                  style={{ padding:'8px 18px', borderRadius:'var(--r-sm)', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)', color:'#fff', fontFamily:'var(--font-mono)', fontSize:'.76rem', display:'flex', alignItems:'center', gap:5 }}>
                  <FiGithub size={12}/> GitHub
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {p.featured && (
          <div style={{ position:'absolute', top:12, left:12, padding:'4px 12px', borderRadius:'999px', background:'rgba(100,255,218,.92)', color:'#0d1117', fontFamily:'var(--font-mono)', fontSize:'.63rem', fontWeight:700 }}>
            ✦ Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding:'20px' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
          {p.tags.map(t => <span key={t} className="tag" style={{ fontSize:'.65rem' }}>{t}</span>)}
        </div>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.03rem', fontWeight:700, marginBottom:8, letterSpacing:'-.01em', color:'var(--text-accent)' }}>{p.name}</h3>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'.8rem', color:'var(--text-secondary)', lineHeight:1.72, marginBottom:16 }}>{p.desc}</p>
        <div style={{ display:'flex', gap:14, flexWrap:'wrap', alignItems:'center' }}>
          {p.links.demo   && <a href={p.links.demo}   target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'var(--primary)', display:'flex', alignItems:'center', gap:4 }}><FiExternalLink size={11}/> Demo</a>}
          {p.links.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:4 }}><FiGithub size={11}/> GitHub</a>}
          {p.links.yt     && <a href={p.links.yt}     target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'#ff4444', display:'flex', alignItems:'center', gap:4 }}><FiYoutube size={11}/> Video</a>}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView({ threshold:.08, triggerOnce:true });
  const list = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" ref={ref} style={{ padding:'var(--py) var(--px)', background:'var(--bg-secondary)' }}>
      <div className="wrap">
        <motion.div initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20, marginBottom:32 }}>
          <div>
            <p className="sec-label">Projects</p>
            <h2 className="sec-title">Featured <span className="accent italic">Work</span></h2>
            <p className="sec-sub">A curated collection showcasing full-stack capability and creative problem-solving.</p>
          </div>
          <a href="https://github.com/vishvpatel210" target="_blank" rel="noopener noreferrer" className="btn-o" style={{ flexShrink:0, fontSize:'.82rem', padding:'10px 22px' }}>
            View All on GitHub →
          </a>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity:0,x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.15 }}
          style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`filter-tab ${filter===f?'active':''}`}
              style={{ padding:'7px 18px', borderRadius:'999px', fontFamily:'var(--font-mono)', fontSize:'.75rem', border:'1px solid', borderColor:filter===f?'var(--primary)':'var(--border-solid)', background:filter===f?'var(--primary)':'var(--surface)', color:filter===f?'#0d1117':'var(--text-secondary)', cursor:'pointer', transition:'all .2s' }}>
              {f}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(330px,1fr))', gap:18 }}>
            {list.map((p, i) => <Card key={p.id} p={p} inView={inView} i={i}/>)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
