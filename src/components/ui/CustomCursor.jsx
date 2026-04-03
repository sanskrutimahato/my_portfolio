/* ======================================
   CUSTOM CURSOR
   Neon glow cursor with hover detection
   ====================================== */

import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth <= 768) return;

    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('.glass:hover')
      ) {
        setHovering(true);
      }
    };

    const handleMouseOut = () => {
      setHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${hovering ? 'hovering' : ''}`} />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
