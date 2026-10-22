import React, { useState, useEffect } from 'react';
import { Cpu, Search, Users, DollarSign, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import Skeleton from './ui/Skeleton';
import Badge from './ui/Badge';
import Card from './ui/Card';

const STAGES = [
  { text: "Analyzing startup idea structure...", icon: Sparkles, stage: "Structuring Idea" },
  { text: "Researching market demand & regional trends...", icon: Search, stage: "Market Research" },
  { text: "Benchmarking competitors & unserved gaps...", icon: Target, stage: "Competitor Analysis" },
  { text: "Building target customer buyer personas...", icon: Users, stage: "Persona Profiling" },
  { text: "Evaluating pricing models & unit economics...", icon: DollarSign, stage: "Monetization Strategy" },
  { text: "Scoping MVP features & technical roadmap...", icon: Cpu, stage: "MVP Architecture" },
  { text: "Generating 7-point evaluation report...", icon: CheckCircle2, stage: "Final Synthesis" }
];

export default function LoadingState() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STAGES.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = STAGES[currentIndex].icon;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-10 text-center animate-fadeIn">
      {/* Outer Glow & Radar Icon Ring */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-violet-500/10 dark:bg-violet-500/20 blur-xl animate-pulse" />
        <div className="absolute inset-0 rounded-full border border-violet-200 dark:border-violet-800/60 animate-ping opacity-25" />
        <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-2xl border border-violet-200 dark:border-violet-800/80 flex items-center justify-center shadow-md dark:shadow-glow relative z-10">
          <CurrentIcon className="w-8 h-8 text-violet-600 dark:text-violet-400 animate-pulse" />
        </div>
      </div>

      {/* Dynamic Status Title */}
      <div className="space-y-2">
        <Badge variant="violet" size="sm">
          <span>Stage {currentIndex + 1} of {STAGES.length}</span>
          <span>•</span>
          <span>{STAGES[currentIndex].stage}</span>
        </Badge>

        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight transition-all duration-300 min-h-[2.5rem] flex items-center justify-center">
          {STAGES[currentIndex].text}
        </h2>

        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-mono">
          Multi-agent reasoning engines actively gathering and structuring insights...
        </p>
      </div>

      {/* Progress Steps Indicators */}
      <div className="flex items-center justify-center space-x-2 max-w-xs mx-auto">
        {STAGES.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex
                ? 'w-8 bg-violet-600 dark:bg-violet-400'
                : idx < currentIndex
                ? 'w-3 bg-violet-300 dark:bg-violet-800'
                : 'w-2 bg-zinc-200 dark:bg-zinc-800'
            }`}
          />
        ))}
      </div>

      {/* Matching Skeleton Loader Preview of Report Cards */}
      <div className="space-y-4 pt-6 text-left opacity-80">
        <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono text-center mb-2">
          Generating Validation Report Layout
        </div>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>
          <Skeleton className="w-full h-16 rounded-xl" />
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="space-y-3">
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-3/4 h-4" />
          </Card>
          <Card className="space-y-3">
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-3/4 h-4" />
          </Card>
        </div>
      </div>
    </div>
  );
}
