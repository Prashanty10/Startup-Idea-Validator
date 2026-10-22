import React from 'react';

/**
 * Reusable Badge component according to Design System:
 * - High readability font hierarchy & pill design
 */
export default function Badge({
  children,
  variant = 'default', // 'default' | 'violet' | 'success' | 'warning' | 'error' | 'outline'
  size = 'md', // 'sm' | 'md'
  className = '',
  icon: Icon,
  ...props
}) {
  const variantStyles = {
    default:
      'bg-zinc-800 text-zinc-200 border border-zinc-700',
    violet:
      'bg-purple-950/80 text-purple-200 border border-purple-700/80',
    success:
      'bg-emerald-950/80 text-emerald-200 border border-emerald-700/80',
    warning:
      'bg-amber-950/80 text-amber-200 border border-amber-700/80',
    error:
      'bg-red-950/80 text-red-200 border border-red-700/80',
    outline:
      'bg-zinc-950 text-zinc-300 border border-zinc-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5 font-semibold font-mono',
    md: 'text-xs sm:text-sm px-3.5 py-1.5 gap-2 font-bold font-mono',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-tight transition-colors ${
        variantStyles[variant] || variantStyles.default
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
