import React from 'react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

/**
 * ScrollFadeIn
 * Wraps any section / block and animates it in when it scrolls into view.
 *
 * Props:
 *  - as          : HTML tag to render (default 'div')
 *  - threshold   : IntersectionObserver threshold (default 0.12)
 *  - duration    : CSS transition duration string (default '0.7s')
 *  - delay       : CSS transition delay string (default '0s')
 *  - style       : extra inline styles to spread in
 *  - className   : extra class names
 *  - children
 */
export default function ScrollFadeIn({
  as: Tag = 'div',
  threshold = 0.12,
  duration = '0.7s',
  delay = '0s',
  style = {},
  className = '',
  children,
  ...rest
}) {
  const ref = useScrollFadeIn(threshold, duration, delay);

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
