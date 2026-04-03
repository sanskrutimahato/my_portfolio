/* ======================================
   APP — Main Application Shell
   Smooth scroll, 3D scene, all sections
   ====================================== */

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import SceneCanvas from './components/three/SceneCanvas';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import soundManager from './utils/soundManager';

// Lazy-load sections for performance
const HeroSection = lazy(() => import('./sections/HeroSection'));
const EducationSection = lazy(() => import('./sections/EducationSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'));
const CodingSection = lazy(() => import('./sections/CodingSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Track scroll progress
    lenis.on('scroll', ({ progress }) => {
      setScrollProgress(progress);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Loading complete handler
  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Toggle sound
  const toggleSound = () => {
    const enabled = soundManager.toggle();
    setSoundEnabled(enabled);
  };

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* 3D Background scene */}
      <SceneCanvas scrollProgress={scrollProgress} />

      {/* Main content */}
      <main>
        <Suspense fallback={null}>
          <HeroSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <CodingSection />
          <ContactSection />
        </Suspense>
      </main>

      {/* Sound toggle button */}
      <button
        className="sound-toggle"
        onClick={toggleSound}
        aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
        title={soundEnabled ? 'Sound On' : 'Sound Off'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
    </>
  );
}
