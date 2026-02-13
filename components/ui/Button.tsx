import React, { useRef, useEffect } from 'react';

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'brand'; 
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}> = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Auto-animate glow on mount for mobile/touch fidelity
  useEffect(() => {
    // Only animate Brand variant automatically to draw attention
    if (variant === 'brand' && glowRef.current) {
        // Simple pulse animation for the glow opacity
        const animation = glowRef.current.animate([
            { opacity: 0.3 },
            { opacity: 0.8 },
            { opacity: 0.3 }
        ], {
            duration: 3000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
        
        return () => animation.cancel();
    }
  }, [variant]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1. Direct Gradient Update (No Re-render)
    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      // Adjust glow color based on context
      // Brand variant uses the H1 orange (fire-500 #f97316) for the cursor glow
      const glowColor = variant === 'brand' ? 'rgba(249, 115, 22, 0.35)' : 'rgba(255, 255, 255, 0.2)';
      glowRef.current.style.background = `radial-gradient(120px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
    }

    // 2. Magnetic Effect Math
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Move button 20% of the distance towards the mouse
    const moveX = (e.clientX - centerX) * 0.2;
    const moveY = (e.clientY - centerY) * 0.2;
    
    // Direct Transform Update (No Re-render)
    buttonRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0px, 0px)';
    }
    if (glowRef.current) {
      // Revert to low opacity rather than 0 if brand (for auto-animation to be visible)
      glowRef.current.style.opacity = variant === 'brand' ? '0.3' : '0';
    }
  };
  
  // Added whitespace-nowrap to prevent text breaking
  // Updated rounded-xl to rounded-lg to match the industrial/tech aesthetic of the site (badges, topics)
  const base = "group relative inline-flex items-center justify-center rounded-lg text-sm font-bold tracking-tight transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden will-change-transform whitespace-nowrap";
  
  // Intelligent default: If className doesn't specify a background, default to zinc-950 for primary
  const hasBg = className.includes('bg-');
  const primaryBg = hasBg ? '' : 'bg-zinc-950 hover:bg-zinc-900';

  const variants = {
    primary: `text-white shadow-angled hover:shadow-soft-xl ${primaryBg}`,
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
    outline: "border border-zinc-200 text-zinc-600 hover:border-fire-600/30 hover:text-fire-600 bg-white hover:bg-fire-50/10",
    
    // Premium Brand Variant: Glassy Aesthetic + H1 Orange Accents
    // UPDATED: Now active by default (Orange Border + Glow) based on user request
    brand: "text-white bg-gradient-to-r from-fire-500/20 to-fire-400/20 backdrop-blur-md border border-fire-500/60 hover:border-fire-400 hover:from-fire-500/30 hover:to-fire-400/30 shadow-[0_0_25px_rgba(249,115,22,0.25)] hover:shadow-[0_0_40px_rgba(249,115,22,0.45)]"
  };

  // Magnetic & Glow effect enabled for Primary and Brand
  if (variant === 'primary' || variant === 'brand') {
    return (
        <button 
          ref={buttonRef}
          type={type}
          className={`${base} ${variants[variant]} ${className}`} 
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cursor-Following Internal Glow */}
          <div 
            ref={glowRef}
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 z-0 mix-blend-overlay blur-lg"
          />
          
          {/* Top Edge Highlight (Glassy feel) */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30" />
          
          {/* Bottom Edge subtle color accent for brand matching H1 */}
          {variant === 'brand' && (
             <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-fire-500/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          )}
          
          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
  }

  // Non-magnetic, non-glow version for other variants (lighter weight)
  return (
    <button 
      type={type}
      className={`${base} ${variants[variant]} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;