import React from 'react';
import { Lightbulb, Search, Brain, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'IDEA',
    desc: 'Define your core startup concept, value proposition, and regional target market.',
    icon: Lightbulb,
    active: true,
  },
  {
    num: '02',
    title: 'RESEARCH',
    desc: 'Live market signals, competitor pricing, and regional industry trends.',
    icon: Search,
    active: true,
  },
  {
    num: '03',
    title: 'INTELLIGENCE',
    desc: 'Multiple AI agents synthesize evidence, buyer personas, and unit economics.',
    icon: Brain,
    active: true,
  },
  {
    num: '04',
    title: 'VALIDATION',
    desc: 'Evidence-backed validation report with score and recommended MVP action plan.',
    icon: CheckCircle2,
    active: true,
  },
];

export default function AnalysisPipeline() {
  return (
    <div id="pipeline" className="w-full max-w-[1100px] mx-auto py-10 px-4 space-y-8">
      {/* Section Title */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-purple-400">
          AUTONOMOUS RESEARCH PIPELINE
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How Startup Validator AI Operates
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto">
          Four automated intelligence stages connecting raw startup ideas to deep market decisions.
        </p>
      </div>

      {/* Staggered Pipeline Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/50">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#0b0b0f] border border-white/10 flex items-center justify-center text-purple-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Stage {idx + 1} Pipeline
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
