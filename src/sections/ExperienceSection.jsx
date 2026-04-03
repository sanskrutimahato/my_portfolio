/* ======================================
   EXPERIENCE SECTION — CHAPTER 4
   Internship timeline with animated icons
   ====================================== */

import { useEffect, useRef } from 'react';
import { internships } from '../data/portfolio';
import soundManager from '../utils/soundManager';

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            soundManager.playInteraction('hover');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" ref={sectionRef} id="experience">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="chapter-label">Chapter 4</span>
        <h2 className="section-title">
          Experience & <span className="neon-text">Internships</span>
        </h2>
        <div className="glow-line" style={{ margin: '16px auto 24px' }} />
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Learning from the best — real-world experience that shaped my craft.
        </p>
      </div>

      <div className="timeline">
        {internships.map((item, i) => (
          <div
            key={i}
            className="timeline-item"
            ref={(el) => (itemRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div
              className="timeline-node"
              style={{
                background: item.color,
                boxShadow: `0 0 15px ${item.color}80`,
              }}
            />
            <div className="timeline-card glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                <div>
                  <h3 className="timeline-title" style={{ marginBottom: '2px' }}>
                    {item.role}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: item.color,
                      fontWeight: 600,
                      letterSpacing: '1px',
                    }}
                  >
                    {item.company}
                  </span>
                </div>
              </div>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
