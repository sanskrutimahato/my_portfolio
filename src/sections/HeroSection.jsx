/* ======================================
   HERO SECTION — INTRO SCENE
   Name reveal, floating code, scroll hint
   ====================================== */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

// Floating code snippets
const codeSnippets = [
  'const future = await build();',
  'function solve(problem) {',
  'git commit -m "init"',
  'import { passion } from "life";',
  'while(alive) { learn(); }',
  'export default Developer;',
  '<Component />',
  'npm run dream',
  'class Engineer extends Student',
  'return success;',
  '// TODO: change the world',
  'async function grow() {',
  'SELECT * FROM skills;',
  'docker build -t future .',
  'System.out.println("Hello");',
];

export default function HeroSection() {
  const sectionRef = useRef(null);

  return (
    <section className="hero" ref={sectionRef} id="hero">
      {/* Floating code snippets */}
      <div className="floating-elements">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="floating-code"
            style={{
              left: `${5 + (i * 6.5) % 90}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
              fontSize: `${0.6 + Math.random() * 0.3}rem`,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Main hero content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          A page from my journey ✿
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          Hi, I'm{' '}
          <span className="neon-text">{personalInfo.name}</span>
        </motion.h1>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.4 }}
        >
          {personalInfo.role} | {personalInfo.tagline}
        </motion.p>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 3.6 }}
          style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}
        >
          📍 {personalInfo.location}
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4.2 }}
      >
        <span className="scroll-hint-text">Turn the page ↓</span>
        <div className="scroll-hint-arrow" />
      </motion.div>
    </section>
  );
}
