import React from 'react';

/**
 * Reusable Input component according to Design System:
 * - Height: 40px – 44px
 * - Border: 1px solid #E4E4E7 (dark #27272A)
 * - Radius: 8px
 * - Focus: border #8B5CF6 with subtle violet ring
 * - Placeholder: #A1A1AA
 */
export default function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`w-full h-11 px-3.5 rounded-lg text-sm bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 border border-zinc-200 dark:border-zinc-800 outline-none transition-all duration-200 focus:border-violet-500 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>
      ) : null}
    </div>
  );
}
