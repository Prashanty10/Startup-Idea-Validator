import React from 'react';

/**
 * StartupLens Logo component matching AI SaaS visual identity
 * Uses violet accent (#7C3AED / #8B5CF6) for spark detail.
 */
export default function StartupLensLogo({ className = "w-6 h-6", glow = false }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      {glow && (
        <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-md pointer-events-none" />
      )}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Outer Camera Aperture Lens Ring */}
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" strokeOpacity="0.5" />
        
        {/* Aperture Lens Blades / Focus Brackets */}
        <path d="M16 6V9M16 23V26M6 16H9M23 16H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        
        {/* Central Startup Lens Spark Focus with Violet AI Tint */}
        <path
          d="M16 7L18.2 13.8L25 16L18.2 18.2L16 25L13.8 18.2L7 16L13.8 13.8L16 7Z"
          fill="#8B5CF6"
        />
        
        {/* Inner Glint Dot */}
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}
