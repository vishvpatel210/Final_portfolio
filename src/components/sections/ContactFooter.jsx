import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube, FiMail, FiMapPin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { PERSONAL, EMAILJS } from '../../data/portfolioData';

const SOCS = [
  { href:PERSONAL.socials.github,   Icon:FiGithub,   label:'GitHub',   color:'#e6edf3' },
  { href:PERSONAL.socials.linkedin, Icon:FiLinkedin, label:'LinkedIn', color:'#0077b5' },
  { href:PERSONAL.socials.leetcode, Icon:SiLeetcode, label:'LeetCode', color:'#ffa116' },
  { href:PERSONAL.socials.twitter,  Icon:FiTwitter,  label:'Twitter',  color:'#1da1f2' },
  { href:PERSONAL.socials.youtube,  Icon:FiYoutube,  label:'YouTube',  color:'#ff0000' },
];

export function Contact() {
  const [ref, inView] = useInView({ threshold:.08, triggerOnce:true });
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | ok | err
  const [fields, setFields] = useState({ from_name:'', reply_to:'', subject:'', message:'' });

  const handle = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const send = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS.serviceID, EMAILJS.templateID, formRef.current, EMAILJS.publicKey);
      setStatus('ok');
      setFields({ from_name:'', reply_to:'', subject:'', message:'' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('err');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" ref={ref} style={{ padding:'var(--py) var(--px)', background:'var(--bg-secondary)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,245,255,.04) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div className="wrap">
        <motion.div initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:48 }}>
          <p className="sec-label" style={{ justifyContent:'center' }}>Contact</p>
          <h2 className="sec-title">Let's <span className="accent italic">Work Together</span></h2>
          <p className="sec-sub" style={{ margin:'10px auto 0', textAlign:'center', maxWidth:520 }}>Have a project in mind or want to chat? I'm always open to new opportunities and collaborations.</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'40px', alignItems:'start' }} className="two-col">
          {/* ── Left info ── */}
          <motion.div initial={{ opacity:0,x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.15 }}>
            <div style={{ background:'var(--surface)', borderRadius:'var(--r-lg)', border:'1px solid var(--border-solid)', padding:'28px', marginBottom:18 }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', marginBottom:20, color:'var(--text-accent)' }}>Get in touch</h3>
              {[
                { Icon:FiMail,   val:PERSONAL.email,     href:`mailto:${PERSONAL.email}` },
                { Icon:FiMapPin, val:'India',              href:null },
              ].map(({ Icon, val, href }) => (
                <div key={val} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--bg-tertiary)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={15} color="var(--primary)"/>
                  </div>
                  {href
                    ? <a href={href} style={{ fontFamily:'var(--font-mono)', fontSize:'.82rem', color:'var(--text-secondary)', transition:'color .2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>{val}</a>
                    : <span style={{ fontFamily:'var(--font-mono)', fontSize:'.82rem', color:'var(--text-secondary)' }}>{val}</span>
                  }
                </div>
              ))}
              {/* Available badge */}
              <div style={{ marginTop:16, padding:'10px 14px', borderRadius:'var(--r-sm)', background:'rgba(100,255,218,.08)', border:'1px solid rgba(100,255,218,.2)', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--primary)', flexShrink:0, animation:'pulsea 2s infinite' }}/>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'.75rem', color:'var(--primary)' }}>Available for opportunities</span>
              </div>
            </div>

            {/* Socials grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {SOCS.map(({ href, Icon, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:'var(--r-sm)', background:'var(--surface)', border:'1px solid var(--border-solid)', transition:'all .2s', color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:'.78rem' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.color=color;e.currentTarget.style.background=`${color}0f`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-solid)';e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='var(--surface)';}}>
                  <Icon size={15}/> {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right form ── */}
          <motion.div initial={{ opacity:0,x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.2 }}>
            <div style={{ background:'var(--surface)', borderRadius:'var(--r-lg)', border:'1px solid var(--border-solid)', padding:'32px' }}>
              <form ref={formRef} onSubmit={send}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                  <div>
                    <label style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'var(--text-secondary)', display:'block', marginBottom:6, letterSpacing:'.06em' }}>NAME</label>
                    <input className="inp" name="from_name" placeholder="Vishv Patel" value={fields.from_name} onChange={handle} required/>
                  </div>
                  <div>
                    <label style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'var(--text-secondary)', display:'block', marginBottom:6, letterSpacing:'.06em' }}>EMAIL</label>
                    <input className="inp" name="reply_to" type="email" placeholder="you@email.com" value={fields.reply_to} onChange={handle} required/>
                  </div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'var(--text-secondary)', display:'block', marginBottom:6, letterSpacing:'.06em' }}>SUBJECT</label>
                  <input className="inp" name="subject" placeholder="Project collaboration" value={fields.subject} onChange={handle} required/>
                </div>
                <div style={{ marginBottom:22 }}>
                  <label style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'var(--text-secondary)', display:'block', marginBottom:6, letterSpacing:'.06em' }}>MESSAGE</label>
                  <textarea className="inp" name="message" rows={5} placeholder="Tell me about your project..." value={fields.message} onChange={handle} required style={{ resize:'vertical', minHeight:'120px' }}/>
                </div>

                <button type="submit" disabled={status==='sending'}
                  style={{ width:'100%', padding:'13px', borderRadius:'var(--r)', background: status==='ok'?'#10b981':status==='err'?'#ef4444':'var(--primary)', color:'#0d1117', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.9rem', transition:'all .25s', display:'flex', alignItems:'center', justifyContent:'center', gap:8, opacity:status==='sending'?.7:1, cursor:status==='sending'?'not-allowed':'pointer' }}>
                  {status==='idle'    && <><FiSend size={15}/> Send Message</>}
                  {status==='sending' && <>Sending…</>}
                  {status==='ok'      && <><FiCheck size={15}/> Message Sent!</>}
                  {status==='err'     && <><FiAlertCircle size={15}/> Error — Try Again</>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes pulsea{0%,100%{box-shadow:0 0 0 0 rgba(100,255,218,.5)}50%{box-shadow:0 0 0 7px rgba(100,255,218,0)}}`}</style>
    </section>
  );
}

/* ══════════════════════════════════
   FOOTER
══════════════════════════════════ */
export function Footer() {
  const scrollTop = () => window.scrollTo({ top:0, behavior:'smooth' });

  return (
    <footer style={{ background:'var(--bg-primary)', borderTop:'1px solid var(--border)', padding:'48px var(--px) 28px' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto auto', gap:'40px', marginBottom:40, flexWrap:'wrap' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'baseline', gap:2, marginBottom:12 }}>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.3rem', background:'linear-gradient(135deg,var(--primary),var(--secondary))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>VP</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'.82rem', color:'var(--text-secondary)' }}>/dev</span>
            </div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'.8rem', color:'var(--text-secondary)', lineHeight:1.8, maxWidth:240 }}>Full-Stack Developer building scalable &amp; beautiful web applications.</p>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', letterSpacing:'.16em', textTransform:'uppercase', color:'var(--text-secondary)', marginBottom:16 }}>Navigate</p>
            <ul style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {['About','Skills','Projects','Contact'].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} style={{ fontFamily:'var(--font-mono)', fontSize:'.82rem', color:'var(--text-secondary)', transition:'color .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='var(--primary)'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', letterSpacing:'.16em', textTransform:'uppercase', color:'var(--text-secondary)', marginBottom:16 }}>Connect</p>
            <ul style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { l:'GitHub',   h:PERSONAL.socials.github },
                { l:'LinkedIn', h:PERSONAL.socials.linkedin },
                { l:'LeetCode', h:PERSONAL.socials.leetcode },
                { l:'Twitter',  h:PERSONAL.socials.twitter },
                { l:'YouTube',  h:PERSONAL.socials.youtube },
              ].map(({ l, h }) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:'var(--font-mono)', fontSize:'.82rem', color:'var(--text-secondary)', transition:'color .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='var(--primary)'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:20, borderTop:'1px solid var(--border)', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'.78rem', color:'var(--text-secondary)' }}>
            © 2026 <a href={PERSONAL.socials.github} target="_blank" rel="noopener noreferrer" style={{ color:'var(--primary)' }}>Vishv Patel</a>. Built with React &amp; ♥
          </p>
          <button onClick={scrollTop}
            style={{ fontFamily:'var(--font-mono)', fontSize:'.78rem', color:'var(--text-secondary)', padding:'6px 14px', borderRadius:'var(--r-sm)', border:'1px solid var(--border-solid)', transition:'all .2s' }}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--primary)';e.currentTarget.style.borderColor='var(--primary)';}}
            onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.borderColor='var(--border-solid)';}}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
