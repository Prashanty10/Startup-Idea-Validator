import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component according to Design System:
 * - Radius: 8px (rounded-lg)
 * - Height: 40px – 44px (h-10 to h-11)
 * - Typography: 14px (text-sm), font-weight: 600 (font-semibold)
 * - Transitions: 150ms - 250ms
 * - Full support for default, hover, focus, active, disabled, loading
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold text-sm transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] rounded-lg';

  const variantStyles = {
    // Primary Button: Light: #18181B text white, Dark: #FAFAFA text black
    primary:
      'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent shadow-sm',

    // Accent Button: Violet #7C3AED (hover #6D28D9)
    accent:
      'bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 border border-transparent shadow-sm shadow-violet-500/10',

    // Secondary Button: Light #F4F4F5 text #18181B, Dark #27272A text #FAFAFA
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-700',

    // Outline Button: 1px border #E4E4E7 (dark #27272A)
    outline:
      'bg-transparent border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800/60',

    // Ghost Button: No background or border
    ghost:
      'bg-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60',
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 sm:h-12 px-5 text-sm sm:text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${
        sizeStyles[size] || sizeStyles.md
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
