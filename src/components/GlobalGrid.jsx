import React, { useState, useEffect } from 'react';

export default function GlobalGrid() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: -100, y: -100 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const gridSize = 50;
  // Snap the exact mouse pixel coordinates to the nearest grid intersection (vertex)
  const crossX = Math.round(mousePos.x / gridSize) * gridSize;
  const crossY = Math.round(mousePos.y / gridSize) * gridSize;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 50, // High enough to cover backgrounds, low enough not to block tooltips or nav
      overflow: 'hidden'
    }}>
      {/* 1. Static Grid Lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(111,231,210,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(111,231,210,0.035) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }} />

      {/* 2. Highlighted Interactive Cross (+) at the intersection */}
      {/* Horizontal Light Beam */}
      <div style={{
        position: 'absolute',
        left: crossX,
        top: crossY,
        width: `${gridSize * 2}px`,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(111,231,210,0.6), transparent)',
        boxShadow: '0 0 10px rgba(111,231,210,0.2)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.15s ease, left 0.08s ease-out, top 0.08s ease-out',
        opacity: mousePos.x < 0 ? 0 : 1,
      }} />

      {/* Vertical Light Beam */}
      <div style={{
        position: 'absolute',
        left: crossX,
        top: crossY,
        width: '1px',
        height: `${gridSize * 2}px`,
        background: 'linear-gradient(180deg, transparent, rgba(111,231,210,0.6), transparent)',
        boxShadow: '0 0 10px rgba(111,231,210,0.2)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.15s ease, left 0.08s ease-out, top 0.08s ease-out',
        opacity: mousePos.x < 0 ? 0 : 1,
      }} />

      {/* Center Soft Glow (The 'Light Shadow' Core) */}
      <div style={{
        position: 'absolute',
        left: crossX,
        top: crossY,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'rgba(111,231,210,0.1)',
        boxShadow: '0 0 20px 8px rgba(111,231,210,0.15)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.15s ease, left 0.08s ease-out, top 0.08s ease-out',
        opacity: mousePos.x < 0 ? 0 : 1,
      }} />
      
      {/* 3. Subtle ambient glow around the cursor */}
      <div style={{
        position: 'absolute',
        left: mousePos.x,
        top: mousePos.y,
        width: '300px',
        height: '300px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(111,231,210,0.04) 0%, transparent 60%)',
        transition: 'opacity 0.2s ease',
        opacity: mousePos.x < 0 ? 0 : 1,
      }} />
    </div>
  );
}
