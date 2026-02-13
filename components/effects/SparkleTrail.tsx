import React, { useState, useEffect, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  xDrift: string;
  yDrift: string;
}

const SparkleTrail = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const nextId = useRef(0);
  const lastCreated = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Increased throttle to 50ms for lower density (less distracting)
      if (now - lastCreated.current < 50) return;
      lastCreated.current = now;

      // Fire ember palette: Deep Red, Orange, Amber, Yellow
      const colors = ['#c2410c', '#ea580c', '#f97316', '#fb923c', '#fbbf24'];
      
      const newSparkle: Sparkle = {
        id: nextId.current++,
        x: e.clientX,
        y: e.clientY,
        // Reverted to larger size (3px to 8px) while keeping fire aesthetic
        size: Math.random() * 5 + 3, 
        color: colors[Math.floor(Math.random() * colors.length)],
        // Gentler, more natural drift
        xDrift: `${(Math.random() - 0.5) * 25}px`,
        // Consistent upward heat rise
        yDrift: `-${Math.random() * 30 + 15}px`, 
      };

      setSparkles((prev) => [...prev, newSparkle].slice(-20)); // Limit active particles

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full animate-ember"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            // Subtle glow
            boxShadow: `0 0 3px ${s.color}`,
            '--x-drift': s.xDrift,
            '--y-drift': s.yDrift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default SparkleTrail;