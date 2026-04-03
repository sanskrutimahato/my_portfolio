/* ======================================
   CODING SECTION — CHAPTER 5
   Problem solver arc: counters + platforms
   ====================================== */

import { useEffect, useRef, useState } from 'react';
import { codingStats } from '../data/portfolio';
import soundManager from '../utils/soundManager';

/** Animated counter hook */
function useCounter(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return value;
}

export default function CodingSection() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const count = useCounter(codingStats.problemsSolved, 2500, animated);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          soundManager.playInteraction('whoosh');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section className="section" ref={sectionRef} id="coding">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="chapter-label">Chapter 5</span>
        <h2 className="section-title">
          Problem <span className="neon-text">Solver</span> Arc
        </h2>
        <div className="glow-line" style={{ margin: '16px auto 24px' }} />
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Sharpening the blade — one problem at a time.
        </p>
      </div>

      <div className="stats-container">
        {/* Big counter */}
        <div style={{ textAlign: 'center' }}>
          <div className="stat-big-number">{count}+</div>
          <p className="stat-label">DSA Problems Solved</p>
        </div>

        {/* Animated bar visualization */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'flex-end',
            height: '80px',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => {
            const height = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30;
            return (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: animated ? `${height}px` : '4px',
                  background: `linear-gradient(to top, #e8a0b4, #b8a9d4)`,
                  borderRadius: '4px 4px 0 0',
                  opacity: animated ? 0.6 + Math.random() * 0.4 : 0.1,
                  transition: `height 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s, opacity 0.6s ease ${i * 0.05}s`,
                }}
              />
            );
          })}
        </div>

        {/* Platform cards */}
        <div className="platforms-row">
          {codingStats.platforms.map((platform, i) => (
            <div
              key={platform.name}
              className="platform-card glass"
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.15 + 0.8}s`,
              }}
              onMouseEnter={() => soundManager.playInteraction('hover')}
            >
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
