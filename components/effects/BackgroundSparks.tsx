import React, { useEffect, useRef } from 'react';

interface BackgroundSparksProps {
  density?: number;
  speed?: number;
}

const BackgroundSparks: React.FC<BackgroundSparksProps> = ({ 
  density = 30, 
  speed = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use ResizeObserver to ensure canvas matches container size exactly
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    const particles: Particle[] = [];
    const colors = ['#f97316', '#ea580c', '#fb923c', '#fdba74']; // Fire Palette

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      opacity: number;
      wobble: number;

      constructor(initialY?: number) {
        this.x = Math.random() * width;
        this.y = initialY ?? (height + Math.random() * 20);
        this.size = Math.random() * 2 + 0.5; 
        this.speedY = (Math.random() * 0.4 + 0.1) * speed; 
        this.speedX = (Math.random() - 0.5) * 0.3; 
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2; 
        this.wobble = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.wobble) * 0.3; 
        this.wobble += 0.02;
        
        if (this.y < height * 0.6) {
             this.opacity -= 0.005;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize
    for(let i=0; i<density; i++) {
        particles.push(new Particle(Math.random() * height));
    }

    let animationId: number;
    let isAnimating = false;

    const animate = () => {
      if (!isAnimating) return;

      ctx.clearRect(0, 0, width, height);
      
      // Maintain density
      if (particles.length < density && Math.random() < 0.1) {
        particles.push(new Particle());
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();
        
        if (p.opacity <= 0 || p.y < -20) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    
    // Intersection Observer to toggle animation
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isAnimating) {
          isAnimating = true;
          animate();
        }
      } else {
        isAnimating = false;
        cancelAnimationFrame(animationId);
      }
    }, { threshold: 0 }); // Trigger as soon as any pixel is visible

    visibilityObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [density, speed]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
      <canvas 
        ref={canvasRef}
        className="block w-full h-full opacity-60 mix-blend-screen"
      />
    </div>
  );
};

export default BackgroundSparks;