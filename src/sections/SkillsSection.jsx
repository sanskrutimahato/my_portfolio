/* ======================================
   SKILLS SECTION — CHAPTER 2
   Skill bars + orbiting tags
   ====================================== */

import { useEffect, useRef, useState } from 'react';
import { skills } from '../data/portfolio';
import soundManager from '../utils/soundManager';

const categoryLabels = {
  languages: 'Languages',
  core: 'Core Concepts',
  tools: 'Tools & Platforms',
  tech: 'Technologies',
};

const categoryColors = {
  languages: '#d4837d',
  core: '#b8a9d4',
  tools: '#8b7355',
  tech: '#a3b899',
};

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          soundManager.playInteraction('whoosh');
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  // Collect all skills as flat tags for the orbit display
  const allSkills = Object.entries(skills).flatMap(([cat, items]) =>
    items.map((s) => ({ ...s, category: cat }))
  );

  return (
    <section className="section" ref={sectionRef} id="skills">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="chapter-label">Chapter 2</span>
        <h2 className="section-title">
          Skills <span className="neon-text">Evolution</span>
        </h2>
        <div className="glow-line" style={{ margin: '16px auto 24px' }} />
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          From fundamentals to frameworks — a continuous journey of leveling up.
        </p>
      </div>

      {/* Skill bars by category */}
      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-category glass">
            <div
              className="skill-category-title"
              style={{ color: categoryColors[category] }}
            >
              {categoryLabels[category]}
            </div>
            {items.map((skill, i) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className={`skill-fill ${animated ? 'animate' : ''}`}
                    style={{
                      width: animated ? `${skill.level}%` : '0%',
                      transitionDelay: `${i * 0.1 + 0.3}s`,
                      background: `linear-gradient(90deg, ${categoryColors[category]}, ${categoryColors[category]}88)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Skill tags cloud */}
      <div className="skill-orbit-container">
        {allSkills.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-tag glass"
            style={{
              borderColor: `${categoryColors[skill.category]}33`,
              color: categoryColors[skill.category],
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05 + 0.5}s`,
            }}
            onMouseEnter={() => soundManager.playInteraction('hover')}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
}
