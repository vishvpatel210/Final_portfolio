import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CERTS, STATS, TIMELINE } from '../../data/portfolioData';
import { useCountUp } from '../../hooks/useCountUp';

const CERTIFICATE_ITEMS = [
  {
    id: 'sih-certificate',
    title: 'Smart India Hackathon Certificate',
    issuer: 'Hackathon Recognition',
    year: '2026',
    color: '#7cffa6',
    icon: 'Award',
    image: 'https://res.cloudinary.com/drj44l5df/image/upload/v1774779942/su_hackathon_nqifsm.jpg',
    link: 'https://res.cloudinary.com/drj44l5df/image/upload/v1774779942/su_hackathon_nqifsm.jpg',
  },
];

function CertCard({ cert, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="cert-card card"
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-solid)',
        transition: 'none',
        cursor: 'default',
      }}
    >
      <div style={{ height: '4px', background: cert.color, opacity: 0.9 }} />
      {cert.image && (
        <a
          href={cert.link || cert.image}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', height: '330px', background: '#09111f', overflow: 'hidden' }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            style={{
              width: '330px',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              transform: 'rotate(270deg) scale(1.08)',
              transformOrigin: 'center',
              margin: '0 auto',
            }}
          />
        </a>
      )}
      <div style={{ padding: '22px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 10 }}>
          <span style={{ fontSize: cert.icon.length > 2 ? '.72rem' : '1.8rem', fontFamily: 'var(--font-mono)', color: cert.color, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            {cert.icon}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '.68rem',
              color: cert.color,
              background: `${cert.color}18`,
              padding: '3px 10px',
              borderRadius: '999px',
              border: `1px solid ${cert.color}33`,
            }}
          >
            {cert.year}
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '.97rem', fontWeight: 700, color: 'var(--text-accent)', lineHeight: 1.35, marginBottom: 8 }}>
          {cert.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: cert.color, marginBottom: 18, letterSpacing: '.02em' }}>
          {cert.issuer}
        </p>
        {cert.link ? (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: '.73rem',
              color: cert.color,
              background: 'transparent',
              border: `1px solid ${cert.color}44`,
              borderRadius: 'var(--r-sm)',
              padding: '8px 14px',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            Open Certificate
          </a>
        ) : (
          <button
            type="button"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '.73rem',
              color: cert.color,
              background: 'transparent',
              border: `1px solid ${cert.color}44`,
              borderRadius: 'var(--r-sm)',
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all .2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${cert.color}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Certificate
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function Certificates() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="certificates" ref={ref} style={{ padding: 'var(--py) var(--px)', background: 'var(--bg-primary)' }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          <p className="sec-label">Achievements</p>
          <h2 className="sec-title">Certificates &amp; <span className="accent italic">Recognition</span></h2>
          <p className="sec-sub">Validated skills through certifications, course work, and hackathon recognition.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 640px)', justifyContent: 'center', gap: 16 }}>
          {CERTIFICATE_ITEMS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }) {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [count, start] = useCountUp(stat.val, 1800);

  React.useEffect(() => {
    if (inView) start();
  }, [inView, start]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6 }}
      className="stat-card card"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-solid)',
        borderRadius: 'var(--r-lg)',
        padding: '32px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color .25s,box-shadow .25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(100,255,218,.3)';
        e.currentTarget.style.boxShadow = '0 14px 45px rgba(100,255,218,.07)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-solid)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{stat.icon}</div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2.2rem,5vw,3rem)',
          background: 'linear-gradient(135deg,var(--primary),var(--secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}
      >
        {count}
        {stat.sfx}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--text-secondary)', marginTop: 8, letterSpacing: '.06em' }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} style={{ padding: 'var(--py) var(--px)', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(6rem,18vw,16rem)',
          color: 'rgba(100,255,218,.03)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-.05em',
        }}
      >
        STATS
      </div>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 50 }}
        >
          <p className="sec-label" style={{ justifyContent: 'center' }}>Dashboard</p>
          <h2 className="sec-title">Developer <span className="accent italic">Stats</span></h2>
          <p className="sec-sub" style={{ margin: '10px auto 0', textAlign: 'center' }}>Numbers that define my journey so far.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {STATS.map(stat => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, i, inView }) {
  const isWork = item.type === 'work';

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      style={{ display: 'flex', gap: '28px', position: 'relative' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: isWork ? 'rgba(0,245,255,.15)' : 'rgba(100,255,218,.12)',
            border: `2px solid ${isWork ? 'var(--secondary)' : 'var(--primary)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: '.65rem', fontFamily: 'var(--font-mono)', color: isWork ? 'var(--secondary)' : 'var(--primary)' }}>
            {isWork ? 'WORK' : 'EDU'}
          </span>
        </div>
        {i < TIMELINE.length - 1 && (
          <div
            style={{
              width: '1px',
              flex: 1,
              background: `linear-gradient(to bottom,${isWork ? 'var(--secondary)' : 'var(--primary)'},transparent)`,
              minHeight: '40px',
              margin: '6px 0',
            }}
          />
        )}
      </div>

      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--r-lg)',
          border: '1px solid var(--border-solid)',
          padding: '22px 24px',
          flex: 1,
          marginBottom: '20px',
          transition: 'border-color .25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${isWork ? 'var(--secondary)' : 'var(--primary)'}44`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-solid)';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 700, color: 'var(--text-accent)' }}>{item.title}</h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '.71rem',
              color: isWork ? 'var(--secondary)' : 'var(--primary)',
              background: isWork ? 'rgba(0,245,255,.1)' : 'rgba(100,255,218,.1)',
              padding: '4px 12px',
              borderRadius: '999px',
              border: `1px solid ${isWork ? 'rgba(0,245,255,.2)' : 'rgba(100,255,218,.2)'}`,
              whiteSpace: 'nowrap',
            }}
          >
            {item.year}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: isWork ? 'var(--secondary)' : 'var(--primary)', marginBottom: 12, letterSpacing: '.02em' }}>
          @ {item.org}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16 }}>
          {item.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {item.tags.map(tag => (
            <span key={tag} className="tag" style={{ fontSize: '.66rem' }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="timeline" ref={ref} style={{ padding: 'var(--py) var(--px)', background: 'var(--bg-primary)' }}>
      <div className="wrap" style={{ maxWidth: 780, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 44 }}
        >
          <p className="sec-label">Journey</p>
          <h2 className="sec-title">Experience &amp; <span className="accent italic">Education</span></h2>
        </motion.div>
        <div>
          {TIMELINE.map((item, i) => (
            <TimelineItem key={`${item.year}-${item.title}`} item={item} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
