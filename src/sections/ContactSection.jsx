/* ======================================
   CONTACT SECTION — FINAL CHAPTER
   Future vision + contact links + CTA
   ====================================== */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, contactLinks } from '../data/portfolio';
import soundManager from '../utils/soundManager';

export default function ContactSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section className="contact-section section" ref={sectionRef} id="contact">
      {/* Brighter gradient overlay for "future" feel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center bottom, rgba(232,160,180,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter-label">Final Chapter</span>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>
            The <span className="neon-text">Future</span> Awaits
          </h2>
          <div className="glow-line" style={{ margin: '0 auto 32px' }} />
        </motion.div>

        <motion.p
          className="contact-vision"
          initial={{ opacity: 0, y: 20 }}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Building scalable systems. Preparing for impactful tech roles.
          <br />
          Let's connect and build something extraordinary together.
        </motion.p>

        {/* Contact links grid */}
        <motion.div
          className="contact-links-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {contactLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-link glass"
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(15px)',
                transition: `all 0.6s ease ${i * 0.1 + 0.5}s`,
              }}
              onMouseEnter={() => soundManager.playInteraction('hover')}
              onClick={() => soundManager.playInteraction('click')}
            >
              <span className="contact-link-icon">{link.icon}</span>
              <div>
                <div className="contact-link-label">{link.label}</div>
                <div className="contact-link-value">{link.value}</div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="cta-button"
            onMouseEnter={() => soundManager.playInteraction('hover')}
            onClick={() => soundManager.playInteraction('click')}
          >
            Let's Write Together ✿
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="footer"
          initial={{ opacity: 0 }}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Designed & Built by {personalInfo.name} • {new Date().getFullYear()}
        </motion.div>
      </div>
    </section>
  );
}
