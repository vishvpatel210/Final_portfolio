import { useState, useRef } from 'react';

export function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const start = () => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick); else setCount(end);
    };
    requestAnimationFrame(tick);
  };
  return [count, start];
}
