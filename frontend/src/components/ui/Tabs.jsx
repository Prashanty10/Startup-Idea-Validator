import React from 'react';

/**
 * Reusable Tabs component according to Design System:
 * - Inactive: #71717A
 * - Active: #18181B (dark: #FAFAFA)
 * - Active indicator: subtle violet border bottom / indicator
 * - Restrained, clean tab buttons
 */
export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div
      className={`border-b border-zinc-200 dark:border-zinc-800 flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 border-b-2 -mb-px whitespace-nowrap ${
              isActive
                ? 'border-violet-600 text-zinc-900 dark:border-violet-500 dark:text-zinc-100 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {Icon && (
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-zinc-400 dark:text-zinc-500'
                }`}
              />
            )}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
