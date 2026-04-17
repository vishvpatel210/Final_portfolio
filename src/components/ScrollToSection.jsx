import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_TO_SECTION = {
  '/': 'hero',
  '/about': 'about',
  '/skills': 'skills',
  '/projects': 'projects',
  '/certificates': 'certificates',
  '/education': 'education',
  '/community': 'community',
  '/contact': 'contact',
};

export default function ScrollToSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = ROUTE_TO_SECTION[pathname];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [pathname]);

  return null;
}
