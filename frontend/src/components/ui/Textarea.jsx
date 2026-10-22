import React from 'react';

/**
 * Reusable Textarea component according to Design System:
 * - Minimum height: 120px
 * - Border: 1px solid #E4E4E7 (dark #27272A)
 * - Radius: 8px - 10px
 * - Focus: violet border + subtle ring
 * - Character count display
 * - Helper text support
 */
export default function Textarea({
  label,
  value = '',
  maxLength,
  error,
  helperText,
  rows = 4,
  className = '',
  id,
  onChange,
  ...props
}) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}

        {typeof value === 'string' && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            {value.length} {maxLength ? `/ ${maxLength}` : 'chars'}
          </span>
        )}
      </div>

      <textarea
        id={textareaId}
        rows={rows}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full p-3.5 rounded-xl text-sm leading-relaxed bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 border border-zinc-200 dark:border-zinc-800 outline-none transition-all duration-200 focus:border-violet-500 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-y min-h-[120px] ${
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
