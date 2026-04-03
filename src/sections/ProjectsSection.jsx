/* ======================================
   PROJECTS SECTION — CHAPTER 3
   3D tilt project cards with expand
   ====================================== */

import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/portfolio';
import soundManager from '../utils/soundManager';

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [animated, setAnimated] = useState(false);
  const cardRefs = useRef([]);

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

  // 3D tilt effect on mouse move
  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
  };

  const openProject = (index) => {
    setExpandedIndex(index);
    soundManager.playInteraction('click');
  };

  const closeProject = () => {
    setExpandedIndex(null);
  };

  return (
    <section className="section" ref={sectionRef} id="projects">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="chapter-label">Chapter 3</span>
        <h2 className="section-title">
          Project <span className="neon-text">Universe</span>
        </h2>
        <div className="glow-line" style={{ margin: '16px auto 24px' }} />
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Real-world projects that pushed boundaries and solved problems.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="project-card glass"
            style={{
              '--card-accent': project.color,
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.8s ease ${i * 0.2}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`,
            }}
            onClick={() => openProject(i)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
            onMouseEnter={() => soundManager.playInteraction('hover')}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '1.2rem',
                color: project.color,
              }}
            >
              {i === 0 ? '🌾' : i === 1 ? '♻️' : '📊'}
            </div>
            <h3 className="project-title" style={{ color: project.color }}>
              {project.title}
            </h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="project-tag"
                  style={{
                    borderColor: `${project.color}25`,
                    color: project.color,
                    background: `${project.color}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded project overlay */}
      {expandedIndex !== null && (
        <div className="project-expanded-overlay" onClick={closeProject}>
          <div
            className="project-expanded glass"
            style={{ position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="project-close-btn" onClick={closeProject}>
              ✕
            </button>
            <div style={{ marginBottom: '16px', fontSize: '2rem' }}>
              {expandedIndex === 0 ? '🌾' : expandedIndex === 1 ? '♻️' : '📊'}
            </div>
            <h3
              className="project-title"
              style={{
                color: projects[expandedIndex].color,
                fontSize: '1.6rem',
                marginBottom: '16px',
              }}
            >
              {projects[expandedIndex].title}
            </h3>
            <p className="project-desc" style={{ marginBottom: '24px' }}>
              {projects[expandedIndex].description}
            </p>
            <div className="project-tags">
              {projects[expandedIndex].tags.map((tag) => (
                <span
                  key={tag}
                  className="project-tag"
                  style={{
                    borderColor: `${projects[expandedIndex].color}25`,
                    color: projects[expandedIndex].color,
                    background: `${projects[expandedIndex].color}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
