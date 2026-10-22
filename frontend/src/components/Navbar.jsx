import React from 'react';
import { Sun, Moon, Terminal } from 'lucide-react';

export default function Navbar({ onReset, hasResults, theme, onToggleTheme }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] sm:w-[calc(100%-48px)] max-w-[1320px]">
      <header className="h-16 px-5 sm:px-6 rounded-2xl sm:rounded-3xl bg-[rgba(18,18,23,0.78)] backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all">
        {/* Left: Brand Logo */}
        <div
          onClick={hasResults ? onReset : () => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          {/* Small Purple 4-Point Star Logo */}
          <div className="w-6 h-6 flex items-center justify-center text-purple-400 group-hover:scale-110 transition duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-400">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>

          <span className="font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-purple-300 transition">
            Startup Validator AI
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-zinc-400">
          <button
            type="button"
            onClick={() => scrollToSection('pipeline')}
            className="hover:text-white transition duration-200 cursor-pointer"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('input-card')}
            className="hover:text-white transition duration-200 cursor-pointer"
          >
            What we analyze
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('metrics')}
            className="hover:text-white transition duration-200 cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* Right: Engine Online Status & Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-400">ENGINE ONLINE</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-xl border border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:border-white/20 flex items-center justify-center transition cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {hasResults && (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition duration-150 flex items-center space-x-1.5 shadow-sm cursor-pointer"
                title="Download or Print Full PDF Report"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <path d="M6 14h12v8H6z" />
                </svg>
                <span className="hidden sm:inline">PDF Report</span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs px-3.5 py-1.5 rounded-xl transition duration-150 flex items-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Validate New</span>
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
