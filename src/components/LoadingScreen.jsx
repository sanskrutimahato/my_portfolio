/* ======================================
   LOADING SCREEN
   "Entering the world" animation
   ====================================== */

import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // total ms
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      // Ease-out progress curve
      const t = current / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => onComplete?.(), 800);
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      {/* Subtle background particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#e8a0b4' : i % 3 === 1 ? '#b8a9d4' : '#f5e6ca',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `floatUp ${Math.random() * 10 + 8}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="loading-title">
        Opening my diary...
      </div>

      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="loading-percent">{progress}%</div>
    </div>
  );
}
