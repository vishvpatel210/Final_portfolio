import { useState, useEffect, useRef } from "react";

const phrases = ["React Interfaces/", "REST APIs/", "Full Stack Apps/", "Clean Code/"];

export default function IntroScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [typeText, setTypeText] = useState("");
  const typingRef = useRef({ pi: 0, ci: 0, deleting: false, timer: null });

  useEffect(() => {
    const autoExit = setTimeout(() => handleExit(), 5500);
    return () => clearTimeout(autoExit);
  }, []);

  useEffect(() => {
    const t = setTimeout(startTyping, 1800);
    return () => clearTimeout(t);
  }, []);

  function startTyping() {
    const ref = typingRef.current;
    function tick() {
      const word = phrases[ref.pi];
      if (!ref.deleting) {
        ref.ci++;
        setTypeText(word.slice(0, ref.ci));
        if (ref.ci === word.length) {
          ref.deleting = true;
          ref.timer = setTimeout(tick, 1400);
          return;
        }
      } else {
        ref.ci--;
        setTypeText(word.slice(0, ref.ci));
        if (ref.ci === 0) {
          ref.deleting = false;
          ref.pi = (ref.pi + 1) % phrases.length;
        }
      }
      ref.timer = setTimeout(tick, ref.deleting ? 60 : 90);
    }
    tick();
    return () => clearTimeout(ref.timer);
  }

  function handleExit() {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 600);
  }

  if (!visible) return null;

  return (
    <div
      onClick={handleExit}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#020c10",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(111,231,210,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(111,231,210,0.04) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, #020c10 80%)",
      }} />

      {/* Floating particles */}
      <Particles />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 350, height: 350, borderRadius: "50%",
        background: "rgba(111,231,210,0.12)", filter: "blur(80px)",
        top: "10%", left: "-5%", animation: "ambPulse 3s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "rgba(111,231,210,0.08)", filter: "blur(80px)",
        bottom: "10%", right: "-5%", animation: "ambPulse 3s ease-in-out 1s infinite alternate",
      }} />

      {/* Status pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        border: "1px solid rgba(111,231,210,0.25)", borderRadius: 999,
        padding: "6px 16px", marginBottom: 32,
        fontSize: 12, letterSpacing: "0.05em", color: "#aaa",
        animation: "fadeUp 0.6s ease 0.2s both",
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#6fe7d2", boxShadow: "0 0 6px #6fe7d2",
          display: "inline-block", animation: "dotBlink 1.5s ease-in-out infinite",
        }} />
        Available for opportunities
      </div>

      {/* Name */}
      <div style={{ textAlign: "center", animation: "fadeUp 0.8s ease 0.4s both", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 18, color: "#888", fontStyle: "italic", marginBottom: 4 }}>Hi, I'm</div>
        <div style={{
          fontSize: "clamp(52px, 8vw, 92px)",
          fontWeight: 900, lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#6fe7d2",
          textShadow: "0 0 50px rgba(111,231,210,0.3)",
        }}>
          Vishv <span style={{ color: "#fff" }}>Patel</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 1, background: "linear-gradient(to right, transparent, #6fe7d2, transparent)",
        margin: "20px auto 16px", animation: "lineGrow 0.7s ease 1s both",
        width: 300,
      }} />

      {/* Role */}
      <div style={{
        fontSize: 13, letterSpacing: "0.25em", color: "#556",
        textTransform: "uppercase", animation: "fadeUp 0.6s ease 1.1s both",
      }}>
        <span style={{ color: "#6fe7d2" }}>Full Stack Developer</span>
        &nbsp;·&nbsp; Portfolio
      </div>

      {/* Typewriter */}
      <div style={{
        marginTop: 12, fontSize: 16, color: "#aaa",
        fontStyle: "italic", animation: "fadeUp 0.6s ease 1.3s both", minHeight: 26,
      }}>
        I build{" "}
        <span style={{ color: "#6fe7d2", fontWeight: 600 }}>{typeText}</span>
        <span style={{
          display: "inline-block", width: 2, height: "1em",
          background: "#6fe7d2", marginLeft: 2, verticalAlign: "text-bottom",
          animation: "blink 0.7s step-end infinite",
        }} />
      </div>

      {/* Code card */}
      <div style={{
        position: "absolute", right: "5%", bottom: "8%",
        background: "#1a1e2e", border: "1px solid rgba(111,231,210,0.15)",
        borderRadius: 10, padding: "14px 18px",
        fontFamily: "'Courier New', monospace", fontSize: 12, minWidth: 210,
        animation: "fadeUp 1s ease 1.2s both",
      }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <span key={c} style={{ width:10,height:10,borderRadius:"50%",background:c,display:"inline-block" }} />
          ))}
        </div>
        <div style={{ color:"#888",fontSize:11,marginBottom:8 }}>developer.js</div>
        <div><span style={{color:"#79b8ff"}}>const</span> <span style={{color:"#6fe7d2"}}>vishv</span> = {"{"}</div>
        <div>&nbsp;&nbsp;<span style={{color:"#ffab70"}}>name</span>: <span style={{color:"#f97583"}}>'Vishv Patel'</span>,</div>
        <div>&nbsp;&nbsp;<span style={{color:"#ffab70"}}>role</span>: <span style={{color:"#f97583"}}>'Full-Stack Dev'</span>,</div>
        <div>&nbsp;&nbsp;<span style={{color:"#ffab70"}}>skills</span>: [</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#f97583"}}>'React'</span>, <span style={{color:"#f97583"}}>'Node.js'</span>,</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#f97583"}}>'TypeScript'</span>, <span style={{color:"#f97583"}}>'MongoDB'</span></div>
        <div>&nbsp;&nbsp;],</div>
        <div>{"}"}</div>
      </div>

      {/* Click hint */}
      <div style={{
        position: "absolute", bottom: 24,
        fontSize: 11, color: "#334", letterSpacing: "0.1em",
        textTransform: "uppercase", animation: "fadeUp 0.5s ease 2.5s both",
      }}>
        Click anywhere to enter
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 300px; }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes ambPulse {
          from { opacity: 0.5; transform: scale(1); }
          to   { opacity: 1; transform: scale(1.15); }
        }
        @keyframes riseUp {
          0%   { transform: translateY(100vh) scale(0); opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.4; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Particles() {
  const colors = ["#6fe7d2","#6fe7d2","#6fe7d2","#6fe7d2"];
  return (
    <>
      {Array.from({ length: 28 }, (_, i) => {
        const size = Math.random() * 3 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div key={i} style={{
            position: "absolute",
            width: size, height: size,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 ${size * 4}px ${color}`,
            left: `${Math.random() * 100}%`,
            animation: `riseUp ${Math.random() * 7 + 5}s linear ${Math.random() * 5}s infinite`,
            opacity: 0,
          }} />
        );
      })}
    </>
  );
}
