import { useEffect, useRef } from 'react';

/**
 * useScrollFadeIn
 * Attaches an IntersectionObserver to the returned ref.
 * The element fades in + slides up when it enters the viewport.
 *
 * @param {number} threshold - How much of the element must be visible (0–1). Default 0.12
 * @param {string} duration  - CSS transition duration. Default '0.7s'
 * @param {string} delay     - CSS transition delay. Default '0s'
 */
export function useScrollFadeIn(threshold = 0.12, duration = '0.7s', delay = '0s') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial hidden state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity ${duration} cubic-bezier(0.16,1,0.3,1) ${delay}, transform ${duration} cubic-bezier(0.16,1,0.3,1) ${delay}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          // Unobserve after animating in — fires only once
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, duration, delay]);

  return ref;
}
