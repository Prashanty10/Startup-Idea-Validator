import React from 'react';

/**
 * Reusable Skeleton loader component according to Design System:
 * - Skeleton loader matching content shape
 * - Light mode: #E4E4E7
 * - Dark mode: #27272A
 */
export default function Skeleton({ className = '', variant = 'text' }) {
  const variantStyles = {
    text: 'h-4 rounded-md',
    title: 'h-7 rounded-lg w-2/3',
    card: 'h-36 rounded-2xl',
    circle: 'rounded-full',
  };

  return (
    <div
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 ${
        variantStyles[variant] || ''
      } ${className}`}
    />
  );
}
