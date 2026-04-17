import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiMessageSquare } from 'react-icons/fi';
import { CHATBOT_KB } from '../data/portfolioData';

const CHIPS = ['Who are you?','Your skills?','Show projects','Certificates?','How to contact?','Available for work?'];

const getReply = q => {
  const l = q.toLowerCase();
  if (l.match(/hi|hello|hey|what.s up/)) return CHATBOT_KB.greetings;
  if (l.match(/who|about|introduce/))    return CHATBOT_KB.about;
  if (l.match(/skill|tech|stack|know/))  return CHATBOT_KB.skills;
  if (l.match(/project|work|build/))     return CHATBOT_KB.projects;
  if (l.match(/cert|course|learn/))      return CHATBOT_KB.certs;
  if (l.match(/contact|reach|email|hire/)) return CHATBOT_KB.contact;
  if (l.match(/available|open|freelance|job/)) return CHATBOT_KB.available;
  return "I'm not sure about that! Try asking about Vishv's skills, projects, certificates, or how to contact him. 😊";
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs]  = useState([{ from:'bot', text:"Hey! 👋 I'm Vishv's AI assistant. Ask me anything!" }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, typing]);

  const send = async txt => {
    const q = (txt || input).trim();
    if (!q) return;
    setInput('');
    setMsgs(m => [...m, { from:'user', text:q }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    setMsgs(m => [...m, { from:'bot', text:getReply(q) }]);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale:1.08 }} whileTap={{ scale:.95 }}
        style={{ position:'fixed', bottom:28, right:28, width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary),var(--secondary))', border:'none', cursor:'pointer', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', color:'#0b1f1a', boxShadow:'0 8px 30px rgba(111,231,210,.4)' }}
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}><FiX size={20}/></motion.span>
            : <motion.span key="c" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><FiMessageSquare size={19}/></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:20, scale:.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:20, scale:.95 }}
            transition={{ type:'spring', damping:26, stiffness:200 }}
            style={{ position:'fixed', bottom:90, right:28, width:'min(360px, calc(100vw - 40px))', height:'min(480px,70vh)', background:'var(--bg-secondary)', border:'1px solid var(--border-solid)', borderRadius:'var(--r-lg)', display:'flex', flexDirection:'column', overflow:'hidden', zIndex:999, boxShadow:'0 24px 60px rgba(0,0,0,.5)' }}
          >
            {/* Header */}
            <div style={{ padding:'14px 18px', background:'var(--surface)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary),var(--secondary))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>🤖</div>
              <div>
                <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.88rem', color:'var(--text-accent)' }}>Vishv's AI Assistant</p>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', color:'var(--primary)', display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--primary)', display:'inline-block' }}/> Online
                </p>
              </div>
              <button onClick={() => setOpen(false)} style={{ marginLeft:'auto', color:'var(--text-secondary)', padding:'4px', borderRadius:'50%', transition:'color .2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--text-primary)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                <FiX size={16}/>
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex:1, overflowY:'auto', padding:'14px 16px', display:'flex', flexDirection:'column', gap:10 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display:'flex', justifyContent:m.from==='user'?'flex-end':'flex-start' }}>
                  <div style={{ maxWidth:'82%', padding:'10px 14px', borderRadius:m.from==='user'?'14px 14px 4px 14px':'14px 14px 14px 4px', background:m.from==='user'?'linear-gradient(135deg,var(--primary),var(--secondary))':'var(--surface)', color:m.from==='user'?'#0b1f1a':'var(--text-primary)', fontFamily:'var(--font-mono)', fontSize:'.8rem', lineHeight:1.7, whiteSpace:'pre-line', border:m.from==='bot'?'1px solid var(--border-solid)':'none' }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display:'flex', gap:4, padding:'10px 14px', background:'var(--surface)', borderRadius:'14px 14px 14px 4px', width:'fit-content', border:'1px solid var(--border-solid)' }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--text-secondary)' }}
                      animate={{ y:[0,-5,0] }} transition={{ duration:.6, delay:i*.18, repeat:Infinity }}/>
                  ))}
                </div>
              )}
              <div ref={bottomRef}/>
            </div>

            {/* Chips */}
            {msgs.length <= 2 && (
              <div style={{ padding:'6px 12px 2px', display:'flex', flexWrap:'wrap', gap:6 }}>
                {CHIPS.map(c => (
                  <button key={c} onClick={() => send(c)}
                    style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', padding:'4px 10px', borderRadius:'999px', background:'var(--surface)', border:'1px solid var(--border-solid)', color:'var(--text-secondary)', cursor:'pointer', transition:'all .2s', whiteSpace:'nowrap' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--primary)';e.currentTarget.style.color='var(--primary)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-solid)';e.currentTarget.style.color='var(--text-secondary)';}}>
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding:'10px 12px', borderTop:'1px solid var(--border)', display:'flex', gap:8 }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask me anything…"
                style={{ flex:1, background:'var(--bg-tertiary)', border:'1px solid var(--border-solid)', borderRadius:'999px', padding:'8px 14px', color:'var(--text-primary)', fontFamily:'var(--font-mono)', fontSize:'.8rem', outline:'none', transition:'border-color .2s' }}
                onFocus={e=>e.currentTarget.style.borderColor='var(--primary)'}
                onBlur={e=>e.currentTarget.style.borderColor='var(--border-solid)'}
              />
              <button onClick={() => send()}
                style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary),var(--secondary))', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, color:'#0b1f1a', transition:'transform .2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                <FiSend size={14}/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
