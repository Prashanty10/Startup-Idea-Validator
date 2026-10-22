import React from 'react';

export default function Metrics() {
  const metrics = [
    { number: '7', label: 'AI AGENTS' },
    { number: 'LIVE', label: 'RESEARCH PIPELINE' },
    { number: '7 / 7', label: 'VALIDATION CRITERIA' },
    { number: '94%', label: 'EVIDENCE-BASED' },
  ];

  return (
    <div id="metrics" className="w-full max-w-[1100px] mx-auto py-6 px-4 border-y border-white/10 my-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 items-center justify-between text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
        {metrics.map((item, idx) => (
          <div key={idx} className="space-y-1 py-2 md:py-0 px-4">
            <div className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-white tracking-tight font-sans">
              {item.number}
            </div>
            <div className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
