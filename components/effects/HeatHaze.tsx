import React from 'react';

const HeatHaze = () => {
  return (
    <div className="absolute w-0 h-0 overflow-hidden pointer-events-none">
      <svg>
        <defs>
          <filter id="heat-haze">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01 0.015" 
              numOctaves="2" 
              result="turbulence" 
              seed="5"
            >
              <animate 
                attributeName="baseFrequency" 
                dur="15s" 
                values="0.01 0.015; 0.01 0.025; 0.01 0.015" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="turbulence" 
              scale="2" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default HeatHaze;