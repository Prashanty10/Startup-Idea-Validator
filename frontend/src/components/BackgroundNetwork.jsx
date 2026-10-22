import React from 'react';

/**
 * BackgroundNetwork component
 * Renders an AI network background graph (connected lines, glowing nodes, pulsing dots)
 * matching the reference video design.
 */
export default function BackgroundNetwork() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="netGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.05" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Network Connection Lines */}
        <g stroke="url(#netGrad1)" strokeWidth="1" opacity="0.6">
          <line x1="15%" y1="20%" x2="35%" y2="15%" className="animate-line-shimmer" />
          <line x1="35%" y1="15%" x2="50%" y2="30%" />
          <line x1="50%" y1="30%" x2="65%" y2="18%" />
          <line x1="65%" y1="18%" x2="85%" y2="25%" className="animate-line-shimmer" />

          <line x1="10%" y1="45%" x2="25%" y2="40%" />
          <line x1="25%" y1="40%" x2="40%" y2="55%" />
          <line x1="40%" y1="55%" x2="60%" y2="48%" className="animate-line-shimmer" />
          <line x1="60%" y1="48%" x2="75%" y2="60%" />
          <line x1="75%" y1="60%" x2="90%" y2="45%" />

          <line x1="20%" y1="75%" x2="38%" y2="70%" />
          <line x1="38%" y1="70%" x2="55%" y2="82%" className="animate-line-shimmer" />
          <line x1="55%" y1="82%" x2="78%" y2="75%" />

          {/* Cross Vertical Connectors */}
          <line x1="35%" y1="15%" x2="25%" y2="40%" strokeDasharray="4 6" opacity="0.4" />
          <line x1="50%" y1="30%" x2="40%" y2="55%" strokeDasharray="4 6" opacity="0.4" />
          <line x1="65%" y1="18%" x2="60%" y2="48%" strokeDasharray="4 6" opacity="0.4" />
          <line x1="40%" y1="55%" x2="38%" y2="70%" strokeDasharray="4 6" opacity="0.4" />
          <line x1="75%" y1="60%" x2="78%" y2="75%" strokeDasharray="4 6" opacity="0.4" />
        </g>

        {/* Glowing Network Nodes */}
        <g fill="#A855F7" filter="url(#glow)">
          <circle cx="15%" cy="20%" r="3.5" className="animate-node-pulse" />
          <circle cx="35%" cy="15%" r="4.5" />
          <circle cx="50%" cy="30%" r="5" className="animate-node-pulse" />
          <circle cx="65%" cy="18%" r="4" />
          <circle cx="85%" cy="25%" r="4.5" className="animate-node-pulse" />

          <circle cx="10%" cy="45%" r="4" />
          <circle cx="25%" cy="40%" r="5" className="animate-node-pulse" />
          <circle cx="40%" cy="55%" r="4.5" />
          <circle cx="60%" cy="48%" r="5.5" className="animate-node-pulse" fill="#60A5FA" />
          <circle cx="75%" cy="60%" r="4" />
          <circle cx="90%" cy="45%" r="4.5" className="animate-node-pulse" />

          <circle cx="20%" cy="75%" r="4.5" />
          <circle cx="38%" cy="70%" r="4" className="animate-node-pulse" />
          <circle cx="55%" cy="82%" r="5" />
          <circle cx="78%" cy="75%" r="4.5" className="animate-node-pulse" />
        </g>

        {/* Floating Ring Brackets */}
        <g stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.3">
          <circle cx="50%" cy="30%" r="12" strokeDasharray="3 3" />
          <circle cx="60%" cy="48%" r="14" strokeDasharray="4 4" />
        </g>
      </svg>
    </div>
  );
}
