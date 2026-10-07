import React from 'react';

const AtmosphereBackground = ({ imageUrl }) => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden bg-zinc-950">
      <img 
        src={imageUrl} 
        alt="Atmosphere"
        className="absolute inset-0 w-full h-full object-cover motion-reduce:transition-none"
        style={{ 
          animation: 'slowZoom 60s infinite alternate ease-in-out' 
        }}
      />
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .absolute.bg-cover {
            animation: none !important;
            transform: scale(1) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AtmosphereBackground;
