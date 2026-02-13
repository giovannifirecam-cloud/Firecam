import React from 'react';

// Helper for Highlight Words (Letter-by-Letter Heat Wave with Time Sync)
export const HighlightWord: React.FC<{ 
  text: string; 
  revealDelay?: number; 
  sequence?: 1 | 2 | 3; 
  finalColor?: string; 
  initialColor?: string;
  className?: string;
}> = ({ 
  text, 
  revealDelay = 0, 
  sequence = 1,
  finalColor = "#ea580c", 
  initialColor = "#09090b",
  className = "",
}) => {
  const animationClassText = `animate-letter-text-${sequence}`;
  
  // --- SYNCHRONIZATION LOGIC ---
  const LOOP_DURATION = 5;
  const IGNITION_PERCENTAGES = { 1: 0.10, 2: 0.30, 3: 0.50 };
  const ignitionTimeInLoop = IGNITION_PERCENTAGES[sequence] * LOOP_DURATION;
  // Sync the color wave to start a bit after the reveal
  const targetAbsoluteTime = revealDelay + 0.1;
  const syncDelay = targetAbsoluteTime - ignitionTimeInLoop;

  // Split by spaces to group characters by word
  const words = text.split(' ');
  let globalCharIndex = 0;

  // CRITICAL FIX: Returning a Fragment (<>...</>) instead of a wrapper <span>.
  // This allows the words to sit directly in the parent H1 flow, ensuring
  // they interact with spaces and other text nodes correctly for wrapping.
  return (
    <>
      {words.map((word, wIndex) => {
         if (!word) return null;
         
         const isLastWord = wIndex === words.length - 1;

         // The word itself remains inline-block to support the transform animation (slide up)
         // We pass 'className' down to the individual word container to ensure alignment (e.g. align-baseline)
         const wordElement = (
          <React.Fragment key={wIndex}>
            <span 
              className={`inline-block whitespace-nowrap opacity-0 animate-word-reveal ${className}`}
              style={{ 
                  // Stagger the entry of words slightly if there are multiple words in the highlight block
                  animationDelay: `${revealDelay + (wIndex * 0.05)}s`, 
                  animationFillMode: 'forwards'
              }}
            >
              {word.split('').map((char, cIndex) => {
                 const letterDelay = syncDelay + (globalCharIndex * 0.05);
                 globalCharIndex++;

                 return (
                  <span key={cIndex} className="relative inline-block align-baseline">
                     <span 
                       className={`relative z-10 will-change-[color,text-shadow] ${animationClassText}`}
                       style={{
                         '--initial-color': initialColor,
                         '--final-color': finalColor,
                         animationDelay: `${letterDelay}s`,
                         animationFillMode: 'both',
                         animationIterationCount: 'infinite'
                       } as React.CSSProperties}
                     >
                       {char}
                     </span>
                  </span>
                 );
              })}
            </span>
            {/* 
               Insert a natural space if not the last word.
            */}
            {!isLastWord && ' '}
          </React.Fragment>
         );

         if (!isLastWord) {
             globalCharIndex++;
         }

         return wordElement;
      })}
    </>
  );
};