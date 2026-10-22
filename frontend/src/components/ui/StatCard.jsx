import React from 'react';

/**
 * Reusable Stat/Metric Card component with enhanced typography
 */
export default function StatCard({
  label,
  value,
  change,
  changeType = 'neutral', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  className = '',
}) {
  const changeColorClass = {
    positive: 'text-emerald-300 bg-emerald-950/60 border border-emerald-800/60',
    negative: 'text-red-300 bg-red-950/60 border border-red-800/60',
    neutral: 'text-zinc-300 bg-zinc-800 border border-zinc-700',
  };

  return (
    <div
      className={`rounded-2xl p-5 bg-[#0b0b0f] border border-white/10 shadow-sm flex items-start justify-between ${className}`}
    >
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-mono">
          {label}
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          {value}
        </div>
        {change && (
          <div className="flex items-center gap-1">
            <span
              className={`text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full ${
                changeColorClass[changeType] || changeColorClass.neutral
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>

      {Icon && (
        <div className="w-11 h-11 rounded-xl bg-purple-950/50 border border-purple-800/60 flex items-center justify-center text-purple-400">
          <Icon className="w-5.5 h-5.5" />
        </div>
      )}
    </div>
  );
}
