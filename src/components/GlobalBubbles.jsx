import React, { useEffect, useRef } from 'react';

export default function GlobalBubbles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, pts = [], id;
    
    const resize = () => { 
      W = cv.width = window.innerWidth; 
      H = cv.height = window.innerHeight; 
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create 100 particles
    for (let i = 0; i < 100; i++) {
        pts.push({
            x: Math.random() * 2000, 
            y: Math.random() * 1400,
            vx: (Math.random() - .5) * .28, 
            vy: -(Math.random() * .35 + .05),
            r: Math.random() * 1.3 + .3,
            a: Math.random() * .45 + .07,
            c: Math.random() > .5 ? '111,231,210' : '111,231,210',
        });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        // Wrap around vertically and horizontally
        if (p.y < -50) { p.y = H + 50; p.x = Math.random() * 2000; }
        if (p.x < -50 || p.x > W + 50) p.vx *= -1;
        
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, ${p.a})`; 
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => { 
        window.removeEventListener('resize', resize); 
        cancelAnimationFrame(id); 
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 10,
        }} 
    />
  );
}
