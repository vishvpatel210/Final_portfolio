import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FALLBACK_STATS = {
  "totalSolved": 70,
  "totalSubmissions": [
    {"difficulty":"All","count":71,"submissions":110},
    {"difficulty":"Easy","count":63,"submissions":102},
    {"difficulty":"Medium","count":8,"submissions":8},
    {"difficulty":"Hard","count":0,"submissions":0}
  ],
  "totalQuestions": 3902, "easySolved": 62, "totalEasy": 937,
  "mediumSolved": 8, "totalMedium": 2042, "hardSolved": 0, "totalHard": 923,
  "ranking": 1958872, "contributionPoint": 47, "reputation": 0,
  "submissionCalendar": {"1770422400":3,"1771286400":1,"1771372800":3,"1771459200":8,"1771545600":20,"1771632000":8,"1771718400":11,"1771804800":2,"1771891200":1,"1771977600":1,"1772064000":16,"1772236800":1,"1772323200":3,"1772409600":5,"1772755200":1,"1773100800":1,"1774828800":1,"1774915200":3,"1775001600":1,"1775088000":1,"1775433600":2,"1775520000":2,"1775606400":1,"1775692800":5,"1775779200":1,"1775865600":1,"1776038400":2,"1776124800":2,"1776211200":3}
};

function LeetCodeHeatmap({ calendarStr }) {
  const [weeks, setWeeks] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const scrollRef = React.useRef(null);

  useEffect(() => {
    if (!calendarStr) return;
    
    let calendarData = {};
    try {
      calendarData = typeof calendarStr === 'string' ? JSON.parse(calendarStr) : calendarStr;
    } catch (e) {
      console.error("Failed to parse calendar", e);
    }

    // Map timestamps to YYYY-MM-DD
    const submissionsByDate = {};
    for (const [timestamp, count] of Object.entries(calendarData)) {
      const date = new Date(parseInt(timestamp, 10) * 1000);
      const dateString = date.toISOString().split('T')[0];
      submissionsByDate[dateString] = (submissionsByDate[dateString] || 0) + count;
    }

    const today = new Date();
    const startDate = new Date();
    // 52 weeks * 7 days = 364 days.
    startDate.setDate(today.getDate() - 364);

    const generatedWeeks = [];
    let currentDate = new Date(startDate);

    for (let c = 0; c < 52; c++) {
      const week = [];
      for (let r = 0; r < 7; r++) {
        const dateString = currentDate.toISOString().split('T')[0];
        week.push({
          date: dateString,
          count: submissionsByDate[dateString] || 0
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      generatedWeeks.push(week);
    }

    setWeeks(generatedWeeks);
    
    const formatDate = (d) => `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
    setDateRange({ start: formatDate(startDate), end: formatDate(today) });
    
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      }
    }, 100);
    
  }, [calendarStr]);

  if (!weeks.length) return <div className="heatmap-skeleton" />;

  return (
    <div className="lc-heatmap-container" ref={scrollRef}>
      <div className="lc-heatmap-grid">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="lc-heatmap-col">
            {week.map((day, dIndex) => {
              let bg = '#1a1a1a';
              if (day.count > 0 && day.count <= 2) bg = 'rgba(0, 217, 166, 0.3)';
              else if (day.count > 2 && day.count <= 5) bg = 'rgba(0, 217, 166, 0.55)';
              else if (day.count > 5 && day.count <= 9) bg = 'rgba(0, 217, 166, 0.75)';
              else if (day.count >= 10) bg = '#00d9a6';

              return (
                <div 
                  key={dIndex} 
                  className="lc-heatmap-cell"
                  style={{ backgroundColor: bg }} 
                  title={`${day.count} submissions on ${day.date}`} 
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="lc-heatmap-labels">
        <span>{dateRange.start}</span>
        <span>{dateRange.end}</span>
      </div>
    </div>
  );
}

function LeetCodeCard({ inView }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/vishvpatel0210');
        if (!res.ok) throw new Error('API down');
        const data = await res.json();
        if (data && data.totalQuestions) {
          setStats(data);
        } else {
          setStats(FALLBACK_STATS);
        }
      } catch (err) {
        console.error('Error fetching LeetCode stats, using fallback:', err);
        setStats(FALLBACK_STATS);
      } finally {
        setLoading(false);
      }
    };
    if (inView) {
      fetchStats();
    }
  }, [inView]);

  const r = 36;
  const circ = 2 * Math.PI * r;
  const percent = stats && stats.totalQuestions ? (stats.totalSolved / stats.totalQuestions) * 100 : 0;
  const offset = inView ? circ - (percent / 100) * circ : circ;

  return (
    <motion.div
      className="community-card lc-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" width={18} height={18} />
          <h3 className="card-title">LeetCode</h3>
        </div>
      </div>

      <div className="card-content">
        <div className="inner-card">
          {loading || !stats ? (
            <div className="lc-skeleton-state">
              <div className="skeleton-line" style={{ width: '40%', height: 24, marginBottom: 40 }} />
              <div style={{ display: 'flex', gap: 30 }}>
                <div className="skeleton-circle" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              </div>
              <div className="skeleton-line" style={{ width: '30%', marginTop: 40, height: 16 }} />
              <div className="skeleton-box" />
              <div style={{ textAlign: 'center', marginTop: 20, color: '#a0a0a0', fontFamily: 'monospace' }}>
                Loading LeetCode stats...
              </div>
            </div>
          ) : (
            <>
              {/* Row: Username and Ranking */}
              <div className="lc-top-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" width={22} height={22} />
                  <span className="lc-username">vishvpatel0210</span>
                </div>
                <span className="lc-rank">#{stats.ranking.toLocaleString()}</span>
              </div>

              {/* Row: Circle and Stats Table */}
              <div className="lc-middle-row">
                <div className="lc-circle-wrapper">
                  <svg width="84" height="84" viewBox="0 0 84 84">
                    <circle cx="42" cy="42" r={r} fill="none" stroke="#333333" strokeWidth="6" />
                    <motion.circle
                      cx="42" cy="42" r={r} fill="none" stroke="#00d9a6" strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circ}
                      initial={{ strokeDashoffset: circ }}
                      animate={inView ? { strokeDashoffset: offset } : {}}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                      style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                    />
                  </svg>
                  <div className="lc-circle-text">
                    <div className="lc-solved-count">{stats.totalSolved}</div>
                  </div>
                </div>

                <div className="lc-stats-table">
                  <div className="lc-stat-row">
                    <span className="lc-stat-label">Easy</span>
                    <span className="lc-stat-nums">{stats.easySolved} / {stats.totalEasy}</span>
                    <div className="lc-progress-bg">
                      <motion.div 
                        className="lc-progress-fill"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(stats.easySolved / stats.totalEasy) * 100}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <div className="lc-stat-row">
                    <span className="lc-stat-label">Medium</span>
                    <span className="lc-stat-nums">{stats.mediumSolved} / {stats.totalMedium}</span>
                    <div className="lc-progress-bg">
                      <motion.div 
                        className="lc-progress-fill"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(stats.mediumSolved / stats.totalMedium) * 100}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                  </div>
                  <div className="lc-stat-row">
                    <span className="lc-stat-label">Hard</span>
                    <span className="lc-stat-nums">{stats.hardSolved} / {stats.totalHard}</span>
                    <div className="lc-progress-bg">
                      <motion.div 
                        className="lc-progress-fill"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(stats.hardSolved / stats.totalHard) * 100}%` } : {}}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lc-divider" />

              {/* Row: Heatmap */}
              <div className="lc-heatmap-section">
                <span className="lc-heatmap-title">Heatmap (Last 52 Weeks)</span>
                <LeetCodeHeatmap calendarStr={stats.submissionCalendar} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card-footer">
        <a href="https://leetcode.com/u/vishvpatel0210/" target="_blank" rel="noopener noreferrer" className="view-profile-link">
          View Profile →
        </a>
      </div>
    </motion.div>
  );
}

function GitHubCard({ inView }) {
  return (
    <motion.div
      className="community-card gh-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="card-header gh-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" width={18} height={18} />
          <h3 className="card-title">GitHub</h3>
        </div>
        <div className="live-badge">
          <span className="live-dot" /> Live Activity
        </div>
      </div>

      <div className="card-content">
        <div className="inner-card">
          <div className="gh-top">
            <h4 className="gh-subhead">Commit History</h4>
            <p className="gh-subtitle">Open Source Contributions</p>
          </div>

          <div className="gh-graph-box" style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            overflow: 'hidden',
            margin: '20px 0px 40px 0px',
            minHeight: '140px' /* Matches visual weight of leetcode */
          }}>
             <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
                <img 
                  src="https://ghchart.rshah.org/3bfacc/vishvpatel210" 
                  alt="GitHub contributions"
                  style={{ 
                    width: '160%', 
                    minWidth: '160%',
                    maxWidth: 'none', 
                    filter: 'invert(0.8) hue-rotate(180deg) brightness(1.3) contrast(1.2)' 
                  }}
                />
             </div>
          </div>

          <div className="gh-bottom-labels">
            <span className="gh-count-text">381 contributions in the last year</span>
            <div className="gh-legend">
              <span>Less</span>
              <div className="gh-squares">
                <span style={{ background: '#2e2e2e' }} />
                <span style={{ background: 'rgba(0,217,166,0.25)' }} />
                <span style={{ background: 'rgba(0,217,166,0.5)' }} />
                <span style={{ background: 'rgba(0,217,166,0.75)' }} />
                <span style={{ background: '#00d9a6' }} />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <a href="https://github.com/vishvpatel210" target="_blank" rel="noopener noreferrer" className="view-profile-link">
          View Profile →
        </a>
      </div>
    </motion.div>
  );
}

export default function CodeAndCommunity() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <section id="community" ref={ref} className="community-section">
      <div className="community-bg-grid" />
      <div className="community-faint-ring" />
      <div className="community-dashed-ring" />
      
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="community-particle"
          style={{ left: `${30 + (i * 25)}%`, top: `${20 + (i * 30)}%` }}
          animate={{ y: [-15, 15, -15], opacity: [0.01, 0.03, 0.01] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="community-wrap">
        <motion.div 
          className="community-header-col"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={textVariants}
        >
          <div className="community-tag-row">
            <span className="community-tag-line" />
            <span className="community-tag-text">COMMUNITY</span>
          </div>
          <h2 className="community-heading">
            Code &amp; <span style={{ color: '#00d9a6' }}>Community</span>
          </h2>
          <p className="community-subtitle">
            Numbers that define my journey so far.
          </p>
        </motion.div>

        <div className="community-cards-grid">
          <LeetCodeCard inView={inView} />
          
          <div className="connector-line" />
          <div className="connector-dot" />

          <GitHubCard inView={inView} />
        </div>
      </div>

      <style>{`
        .community-section {
          padding: 120px var(--px);
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }

        .community-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0, 217, 166, 0.03) 1px, transparent 1px);
          background-size: 24px 24px; z-index: 0;
        }

        .community-faint-ring {
          position: absolute; top: -100px; right: -150px;
          width: 600px; height: 600px; border-radius: 50%;
          border: 1px solid rgba(0, 217, 166, 0.05); pointer-events: none; z-index: 0;
        }

        .community-dashed-ring {
          position: absolute; bottom: -50px; left: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          border: 1px dashed rgba(0, 217, 166, 0.1);
          animation: spinSlow 30s linear infinite; pointer-events: none; z-index: 0;
        }

        .community-particle {
          position: absolute; width: 6px; height: 6px;
          border-radius: 50%; background: #00d9a6; pointer-events: none; z-index: 0;
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }

        .community-wrap {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
        }

        /* ── Header ── */
        .community-header-col {
          display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 50px;
        }

        .community-tag-row {
          display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
        }
        .community-tag-line { width: 40px; height: 1px; background: #00d9a6; }
        .community-tag-text {
          font-family: var(--font-mono), monospace; font-size: 0.85rem;
          color: #00d9a6; letter-spacing: 0.15em; font-weight: 600;
        }

        .community-heading {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.5rem, 4.5vw, 3.5rem); font-weight: 800; line-height: 1.1; margin: 0 0 16px 0;
        }

        .community-subtitle {
          color: #a0a0a0; font-family: var(--font-mono), monospace;
          font-size: 0.95rem; line-height: 1.8; margin: 0;
        }

        /* ── Grid & Connector ── */
        .community-cards-grid {
          position: relative;
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 30px;
          align-items: stretch;
        }

        .connector-line {
          position: absolute; top: 50%; left: 0%; right: 0%;
          height: 1px; background: rgba(0,217,166,0.1);
          z-index: 0; pointer-events: none;
        }

        .connector-dot {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 24px; height: 24px; border-radius: 50%;
          border: 1px solid rgba(0,217,166,0.2);
          background: var(--bg-primary); z-index: 2;
          display: flex; align-items: center; justify-content: center;
        }
        .connector-dot::after {
          content: ""; width: 6px; height: 6px; border-radius: 50%;
          background: #00d9a6; box-shadow: 0 0 10px rgba(0,217,166,0.5);
        }

        @media (max-width: 900px) {
          .community-cards-grid { grid-template-columns: minmax(0, 1fr); gap: 24px; }
          .connector-line, .connector-dot { display: none; }
          .inner-card { min-height: auto; }
        }

        @media (max-width: 600px) {
          .community-section { padding: 80px 20px !important; }
          .lc-top-row { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; margin-bottom: 24px !important; }
          .lc-middle-row { grid-template-columns: 1fr !important; gap: 24px !important; justify-items: center !important; text-align: center !important; margin-bottom: 24px !important; }
          .lc-stats-table { width: 100% !important; max-width: 300px !important; margin: 0 auto !important; }
          .gh-bottom-labels { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
          .inner-card { padding: 20px 16px !important; }
          .card-header { padding: 20px 16px 12px !important; }
          .card-content { padding: 0 16px !important; }
          .card-footer { padding: 16px !important; }
        }

        /* ── Cards Shared ── */
        .community-card {
          background: #1a202c;
          border: 1px solid rgba(0, 217, 166, 0.2);
          border-radius: 16px;
          display: flex; flex-direction: column;
          z-index: 1;
          height: 100%;
          width: 100%;
          min-width: 0;
          position: relative;
          overflow: hidden;
          /* Base transition for all hover effects */
          transition:
            transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        /* ── Shimmer sweep pseudo-element ── */
        .community-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(0, 217, 166, 0.07) 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
          transition: left 0.6s ease;
          pointer-events: none;
          z-index: 2;
        }
        .community-card:hover::before {
          left: 140%;
        }

        /* ── Top accent bar that slides in on hover ── */
        .community-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00d9a6, rgba(0,217,166,0.3), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          z-index: 3;
        }
        .community-card:hover::after {
          transform: scaleX(1);
        }

        /* ── Lift + glow on hover ── */
        .community-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 217, 166, 0.55);
          box-shadow:
            0 0 0 1px rgba(0,217,166,0.12),
            0 8px 32px rgba(0,217,166,0.14),
            0 24px 48px rgba(0,0,0,0.4);
        }

        /* ── Icon zoom on card hover ── */
        .community-card:hover .card-header img {
          transform: scale(1.2) rotate(-5deg);
          filter: drop-shadow(0 0 6px rgba(0,217,166,0.6));
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      filter 0.35s ease;
        }
        .card-header img {
          transition: transform 0.35s ease, filter 0.35s ease;
        }

        /* ── Inner card glow on parent hover ── */
        .community-card:hover .inner-card {
          border-color: rgba(0, 217, 166, 0.18);
          box-shadow: inset 0 0 24px rgba(0,217,166,0.04);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .inner-card {
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        /* ── Footer link arrow shoot on hover ── */
        .community-card:hover .view-profile-link {
          letter-spacing: 0.03em;
          color: #9ff3e5;
          text-shadow: 0 0 12px rgba(0,217,166,0.4);
        }

        .card-header {
          padding: 24px 24px 16px; display: flex; align-items: center; gap: 12px;
        }
        .gh-header {
          justify-content: space-between;
        }

        .card-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.1rem; font-weight: 700; color: #ffffff; margin: 0;
        }

        .card-content {
          padding: 0 24px; flex: 1; display: flex; flex-direction: column;
        }

        .inner-card {
          background: #1a202c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 24px;
          display: flex; flex-direction: column; flex: 1;
          height: 100%;
          justify-content: flex-start;
          min-height: 380px; 
          min-width: 0;
        }

        .card-footer {
          padding: 20px 24px 24px; display: flex; align-items: center; justify-content: center;
        }

        .view-profile-link {
          color: #00d9a6; font-family: var(--font-mono), monospace;
          font-size: 0.85rem; text-decoration: none; font-weight: 600;
          transition: color 0.25s, letter-spacing 0.25s, text-shadow 0.25s;
          display: inline-flex; align-items: center; gap: 4px;
        }
        .view-profile-link:hover {
          color: #9ff3e5;
          text-decoration: underline;
        }

        /* ── LeetCode Card Elements ── */
        .lc-top-row {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 30px;
        }
        .lc-username {
          font-family: var(--font-display), sans-serif; font-size: 1.25rem;
          font-weight: 700; color: #fff;
        }
        .lc-rank {
          font-family: var(--font-mono), monospace; font-size: 0.85rem;
          color: #fff; font-weight: 700;
        }

        .lc-middle-row {
          display: grid; grid-template-columns: 84px 1fr; gap: 36px;
          align-items: center; margin-bottom: 32px;
        }

        .lc-circle-wrapper {
          position: relative; width: 84px; height: 84px;
        }
        .lc-circle-text {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .lc-solved-count {
          font-family: var(--font-display), sans-serif; font-size: 1.5rem;
          font-weight: 800; color: #ffffff; line-height: 1;
        }

        .lc-stats-table {
          display: flex; flex-direction: column; width: 100%;
        }
        .lc-stat-row {
          display: grid; grid-template-columns: 60px 1fr; gap: 12px;
          align-items: center; margin-bottom: 12px;
        }
        .lc-stat-row:last-child { margin-bottom: 0; }
        .lc-stat-label {
          font-family: var(--font-display), sans-serif; font-size: 0.95rem;
          font-weight: 600; color: #fff;
        }
        .lc-stat-nums {
          font-family: var(--font-mono), monospace; font-size: 0.85rem;
          color: #fff; font-weight: 500; text-align: right;
        }
        .lc-progress-bg {
          grid-column: 1 / -1; height: 3px; background: rgba(255,255,255,0.1); 
          border-radius: 2px; overflow: hidden; margin-top: 2px;
        }
        .lc-progress-fill { height: 100%; background: #00d9a6; border-radius: 2px; }

        .lc-divider {
          height: 1px; background: rgba(255,255,255,0.06); width: 100%;
          margin: 0 0 24px 0;
        }

        .lc-heatmap-section {
          display: flex; flex-direction: column; gap: 12px;
        }
        .lc-heatmap-title {
          font-family: var(--font-mono), monospace; font-size: 0.75rem;
          color: #a0a0a0;
        }
        
        .lc-heatmap-container {
          display: flex; flex-direction: column; gap: 8px;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 12px;
        }
        
        .lc-heatmap-container::-webkit-scrollbar {
          height: 6px;
        }
        .lc-heatmap-container::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.03);
          border-radius: 4px;
        }
        .lc-heatmap-container::-webkit-scrollbar-thumb {
          background: rgba(0, 217, 166, 0.4);
          border-radius: 4px;
        }
        .lc-heatmap-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 217, 166, 0.7);
        }
        .lc-heatmap-grid {
          display: flex; gap: 2px;
        }
        .lc-heatmap-col {
          display: flex; flex-direction: column; gap: 2px;
        }
        .lc-heatmap-cell {
          width: 8px; height: 8px; border-radius: 1px;
        }
        .lc-heatmap-labels {
          display: flex; justify-content: space-between;
          font-size: 0.6rem; color: #a0a0a0; font-family: var(--font-mono), monospace;
          margin-top: 4px;
        }

        /* Skeleton styling */
        .lc-skeleton-state {
          width: 100%; display: flex; flex-direction: column;
        }
        .skeleton-line {
          background: rgba(255,255,255,0.05); border-radius: 4px;
          animation: pulse 1.5s infinite;
        }
        .skeleton-circle {
          width: 84px; height: 84px; border-radius: 50%;
          background: rgba(255,255,255,0.05); animation: pulse 1.5s infinite;
        }
        .skeleton-box {
          height: 80px; width: 100%; border-radius: 4px; margin-top: 10px;
          background: rgba(255,255,255,0.05); animation: pulse 1.5s infinite;
        }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 0.3; } 100% { opacity: 0.6; } }

        /* ── GitHub Card Elements ── */
        .live-badge {
          background: #00d9a6; color: #000; padding: 4px 10px;
          border-radius: 999px; font-family: var(--font-mono), monospace;
          font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 6px;
        }
        .live-dot {
          display: block; width: 6px; height: 6px;
          background: #000; border-radius: 50%; animation: dotBlink 1.5s infinite;
        }

        .gh-top {
          margin-bottom: 24px;
        }
        .gh-subhead {
          font-family: var(--font-display), sans-serif; font-size: 1.25rem;
          font-weight: 700; color: #fff; margin: 0 0 4px 0;
        }
        .gh-subtitle {
          font-family: var(--font-mono), monospace; font-size: 0.85rem;
          color: #a0a0a0; margin: 0;
        }

        .gh-months {
          display: flex; justify-content: space-between;
          font-family: var(--font-mono), monospace; font-size: 0.75rem;
          color: #a0a0a0; margin-bottom: 8px; padding: 0 4px;
        }

        .gh-graph-box {
          margin-bottom: 16px;
        }

        .gh-bottom-labels {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: auto;
        }
        .gh-count-text {
          font-family: var(--font-mono), monospace; font-size: 0.8rem;
          color: #a0a0a0;
        }
        .gh-legend {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono), monospace; font-size: 0.75rem; color: #a0a0a0;
        }
        .gh-squares { display: flex; gap: 3px; }
        .gh-squares span { width: 10px; height: 10px; border-radius: 2px; }

      `}</style>
    </section>
  );
}
