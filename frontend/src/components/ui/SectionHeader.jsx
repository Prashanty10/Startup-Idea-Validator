import React from 'react';
import Badge from './Badge';

/**
 * Reusable Section Header component according to Design System:
 * - Section Heading: 24px - 30px, weight 600
 * - Optional icon & category badge
 */
export default function SectionHeader({
  title,
  subtitle,
  badgeText,
  icon: Icon,
  className = '',
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-6 ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/60 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-xs">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {badgeText && (
        <div className="self-start sm:self-auto">
          <Badge variant="default" size="md">
            {badgeText}
          </Badge>
        </div>
      )}
    </div>
  );
}
