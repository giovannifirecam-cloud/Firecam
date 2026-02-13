import React, { useEffect, useState, useRef } from 'react';

const PrecisionCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is touch-capable (usually mobile/tablet)
    // We want to avoid custom cursor on touch devices to prevent losing the cursor entirely
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouch) {
      setIsVisible(true);
      // Add the class that forces cursor:none on everything
      document.body.classList.add('hide-system-cursor');
    }

    const onMouseMove = (e: MouseEvent) => {
      // Avoid stacking rAF calls if one is already pending
      if (rafRef.current) return;
      
      const { clientX, clientY } = e;

      rafRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          // Dot follows instantly using translate3d for performance
          cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      // Clean up class on unmount
      document.body.classList.remove('hide-system-cursor');
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-2.5 h-2.5 bg-fire-600 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(234,88,12,0.8)]"
    />
  );
};

export default PrecisionCursor;