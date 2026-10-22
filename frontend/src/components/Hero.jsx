import React from 'react';

export default function Hero() {
  return (
    <div className="relative pt-20 sm:pt-24 pb-8 text-center space-y-6 max-w-[1300px] mx-auto px-4">
      {/* Decorative Technical Side Annotations (Left & Right desktop absolute) */}
      <div className="hidden xl:flex items-center space-x-2 absolute top-32 left-6 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">
        <span className="w-6 h-[1px] bg-zinc-800" />
        <span>REAL-TIME MARKET SIGNALS</span>
      </div>

      <div className="hidden xl:flex items-center space-x-2 absolute top-32 right-6 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">
        <span>7 AUTONOMOUS AGENTS</span>
        <span className="w-6 h-[1px] bg-zinc-800" />
      </div>

      {/* Top Small Label */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-mono uppercase tracking-[0.2em]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-purple-400">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
        <span>AI STARTUP INTELLIGENCE</span>
      </div>

      {/* Headline (Scaled Down to Professional SaaS Proportions) */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-[-0.035em] leading-[1.05] max-w-4xl mx-auto">
        Turn your startup idea into an{' '}
        <span className="text-gradient-purple-blue">
          evidence-backed
        </span>{' '}
        decision.
      </h1>

      {/* Subtitle (Scaled Down) */}
      <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
        Research your market, competition, customers, pricing, MVP strategy, and startup viability with an AI-powered research pipeline.
      </p>

      {/* Lower Technical Annotations */}
      <div className="flex items-center justify-center space-x-5 text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-500 pt-1">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <span>LIVE RESEARCH PIPELINE</span>
        </div>
        <span>•</span>
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>EVIDENCE ENGINE v2.0</span>
        </div>
      </div>
    </div>
  );
}
