import React, { useEffect, useRef } from 'react';

const FlashlightGrid = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      if (rafRef.current) return; // Drop frame if busy
      
      rafRef.current = requestAnimationFrame(() => {
         // Double check ref existence as component might have unmounted before frame fires
         if (overlayRef.current) {
            const x = e.clientX;
            const y = e.clientY;
            
            // Directly update style to avoid React render cycle
            const gradient = `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`;
            overlayRef.current.style.maskImage = gradient;
            overlayRef.current.style.webkitMaskImage = gradient;
            overlayRef.current.style.opacity = '0.15';
         }
         rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply">
      {/* 
        Base Grid: Standard Dot Pattern
        Subtle dots providing texture without overwhelming structure.
      */}
      <div 
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(circle, #e4e4e7 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 
        Interactive Highlight: The "Flashlight"
        Reveals a slightly darker dot grid around the mouse.
      */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          backgroundImage: 'radial-gradient(circle, #ea580c 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          // Initial mask center
          maskImage: 'radial-gradient(350px circle at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(350px circle at 50% 50%, black, transparent)',
        }}
      />
    </div>
  );
};

export default FlashlightGrid;