import React, { useEffect, useRef } from 'react';

/**
 * InteractiveEffects Component
 * Combines Option 1 (Cursor Trail), Option 2 (Particle Burst), and Option 3 (Magnetic Effect)
 */
export default function InteractiveEffects() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const requestRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Cursor movement & Trail
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 18}px, ${cursorPos.current.y - 18}px)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    // 2. Particle Burst on Click
    const createParticle = (x, y) => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 60 + Math.random() * 40;
        
        particle.style.cssText = `
          width: ${3 + Math.random() * 4}px;
          height: ${3 + Math.random() * 4}px;
          background: #6fe7d2;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          left: ${x}px;
          top: ${y}px;
          box-shadow: 0 0 6px #6fe7d2;
        `;
        
        document.body.appendChild(particle);
        
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        particle.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
        ], {
          duration: 600,
          easing: 'cubic-bezier(0,0,0.2,1)'
        }).onfinish = () => particle.remove();
      }
    };

    const handleClick = (e) => createParticle(e.clientX, e.clientY);
    window.addEventListener('click', handleClick);

    // 3. Magnetic & Hover Effects
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform += ' scale(1.8)';
        cursorRef.current.style.borderColor = '#6fe7d2';
        cursorRef.current.style.background = 'rgba(111,231,210,0.08)';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.background = 'transparent';
      }
    };

    const applyInteractions = () => {
      const interactiveEls = document.querySelectorAll('a, button, .card, .project-card, .skill-pill, .filter-tab');
      
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        
        // Option 3: Magnetic Pull
        if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.classList.contains('btn')) {
          el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            el.style.transition = 'transform 0.1s ease';
          });
          
          el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0,0)';
            el.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          });
        }
      });
    };

    // Run once and on DOM change if needed
    applyInteractions();
    const observer = new MutationObserver(applyInteractions);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          width: '36px',
          height: '36px',
          border: '1.5px solid rgba(0, 220, 160, 0.6)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          backdropFilter: 'blur(2px)',
          boxShadow: '0 0 15px rgba(0, 220, 160, 0.3), inset 0 0 15px rgba(0, 220, 160, 0.05)',
          transition: 'transform 0.15s ease, opacity 0.3s ease, background 0.3s ease, border-color 0.3s ease',
          willChange: 'transform'
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          width: '6px',
          height: '6px',
          background: '#6fe7d2',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 100000,
          boxShadow: '0 0 10px #6fe7d2, 0 0 20px rgba(111,231,210,0.5)',
          transition: 'transform 0.05s ease',
          willChange: 'transform'
        }}
      />
      <style>{`
        body, a, button {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
