/* ======================================
   EDUCATION SECTION — CHAPTER 1
   Timeline of education journey
   ====================================== */

import { useEffect, useRef } from 'react';
import { education } from '../data/portfolio';
import soundManager from '../utils/soundManager';

export default function EducationSection() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            soundManager.playInteraction('whoosh');
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
    <section className="section" ref={sectionRef} id="education">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="chapter-label">Chapter 1</span>
        <h2 className="section-title">
          The <span className="neon-text">Beginning</span>
        </h2>
        <div className="glow-line" style={{ margin: '16px auto 24px' }} />
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Every great journey starts with a single step. Here's where mine began.
        </p>
      </div>

      <div className="timeline">
        {education.map((item, i) => (
          <div
            key={i}
            className="timeline-item"
            ref={(el) => (itemRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="timeline-node" />
            <div className="timeline-card glass">
              <div className="timeline-icon">{item.icon}</div>
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-title">{item.degree}</h3>
              <p className="timeline-score">{item.score}</p>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
