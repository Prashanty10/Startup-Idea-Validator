import React from 'react';
import { Terminal, Sun, Moon, Activity, Zap } from 'lucide-react';
import StartupLensLogo from './Logo';
import Button from './ui/Button';
import Badge from './ui/Badge';

export default function Header({ onReset, hasResults, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 h-16 sm:h-18 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/90 transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={hasResults ? onReset : undefined}
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white shadow-xs group-hover:border-violet-500 transition duration-200">
            <StartupLensLogo className="w-5 h-5 text-zinc-900 dark:text-white group-hover:scale-105 transition duration-200" />
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition">
              StartupLens
            </span>
            <Badge variant="violet" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" />
              <span>AI SaaS</span>
            </Badge>
          </div>
        </div>

        {/* Center: Engine Status Badges (Desktop) */}
        <div className="hidden md:flex items-center space-x-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
            <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>FastAPI Engine</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Real-Time Validation</span>
          </div>
        </div>

        {/* Right: Theme Toggle & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark/light theme"
            className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600" />
            )}
          </button>

          {hasResults ? (
            <Button
              variant="primary"
              size="sm"
              onClick={onReset}
              className="font-semibold shadow-xs"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Validate New</span>
            </Button>
          ) : (
            <div className="hidden sm:block text-xs font-mono text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              v2.0 • Intelligence
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
