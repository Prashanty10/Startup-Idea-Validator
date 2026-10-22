import React from 'react';

/**
 * Reusable Card component according to Design System:
 * - Radius: 16px (rounded-2xl)
 * - Padding: 24px (p-6)
 * - Light: bg #FFFFFF, border 1px solid #E4E4E7
 * - Dark: bg #18181B, border 1px solid #27272A
 * - Subtle shadow, optional hover transform (-2px)
 */
export default function Card({
  children,
  hoverable = false,
  className = '',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 bg-white border border-zinc-200 dark:bg-zinc-900/90 dark:border-zinc-800/90 shadow-sm transition-all duration-200 ${
        hoverable
          ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
