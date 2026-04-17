import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-desc">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-p" style={{ marginTop: 24 }}>
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
