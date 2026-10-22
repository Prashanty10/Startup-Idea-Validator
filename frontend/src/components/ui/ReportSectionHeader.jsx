import React from 'react';

/**
 * Standardized Section Header for the Full-Screen Validation Report
 * - High readability font hierarchy with Plus Jakarta Sans & JetBrains Mono
 */
export default function ReportSectionHeader({
  number,
  category,
  title,
  description,
  className = '',
  action,
}) {
  return (
    <div className={`space-y-1.5 text-left mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {number && (
            <span className="text-sm font-bold font-mono tracking-widest text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800/60">
              {number}
            </span>
          )}
          {number && category && (
            <span className="text-zinc-500 text-xs">•</span>
          )}
          {category && (
            <span className="text-xs sm:text-sm font-bold font-mono tracking-wider uppercase text-purple-300">
              {category}
            </span>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
        {title}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
