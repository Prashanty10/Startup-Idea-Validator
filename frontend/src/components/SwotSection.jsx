import React from 'react';
import { ShieldCheck, AlertTriangle, TrendingUp, ShieldAlert } from 'lucide-react';
import Card from './ui/Card';
import ReportSectionHeader from './ui/ReportSectionHeader';

export default function SwotSection({ data }) {
  const strengths = Array.isArray(data?.key_strengths) ? data.key_strengths : [];
  const weaknesses = Array.isArray(data?.key_weaknesses) ? data.key_weaknesses : [];
  const opportunities = Array.isArray(data?.opportunities) ? data.opportunities : [];
  const threats = Array.isArray(data?.threats) ? data.threats : [];

  const cards = [
    {
      title: 'STRENGTHS',
      items: strengths,
      icon: ShieldCheck,
      badgeText: 'Internal Capabilities',
      headerColor: 'text-emerald-400',
      badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
      itemBg: 'bg-zinc-950 border-emerald-500/30',
      bulletColor: 'text-emerald-400',
    },
    {
      title: 'WEAKNESSES',
      items: weaknesses,
      icon: AlertTriangle,
      badgeText: 'Internal Limitations',
      headerColor: 'text-amber-400',
      badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
      itemBg: 'bg-zinc-950 border-amber-500/30',
      bulletColor: 'text-amber-400',
    },
    {
      title: 'OPPORTUNITIES',
      items: opportunities,
      icon: TrendingUp,
      badgeText: 'External Catalysts',
      headerColor: 'text-blue-400',
      badgeClass: 'bg-blue-950/60 text-blue-300 border-blue-800/60',
      itemBg: 'bg-zinc-950 border-blue-500/30',
      bulletColor: 'text-blue-400',
    },
    {
      title: 'THREATS',
      items: threats,
      icon: ShieldAlert,
      badgeText: 'External Risks',
      headerColor: 'text-red-400',
      badgeClass: 'bg-red-950/60 text-red-300 border-red-800/60',
      itemBg: 'bg-zinc-950 border-red-500/30',
      bulletColor: 'text-red-400',
    },
  ];

  return (
    <section id="swot" className="space-y-6">
      <ReportSectionHeader
        number="08"
        category="RISK & CAPABILITY EVALUATION"
        title="Strategic SWOT Analysis"
        description="Internal capabilities and external forces shaping the startup opportunity."
      />

      {/* Large 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => {
          const CardIcon = card.icon;

          return (
            <Card key={idx} className="flex flex-col justify-between space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center space-x-3">
                    <CardIcon className={`w-6 h-6 ${card.headerColor}`} />
                    <h3 className={`font-extrabold tracking-wider text-lg sm:text-xl ${card.headerColor}`}>
                      {card.title}
                    </h3>
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-full border ${card.badgeClass}`}>
                    {card.badgeText}
                  </span>
                </div>

                {card.items.length > 0 ? (
                  <ul className="space-y-3.5 text-sm sm:text-base text-zinc-100">
                    {card.items.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3.5 p-4 rounded-xl border leading-relaxed ${card.itemBg}`}
                      >
                        <span className={`font-bold text-lg ${card.bulletColor}`}>•</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-400 italic py-4 text-center bg-zinc-950 rounded-xl border border-white/10 font-mono">
                    No explicit factors identified.
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono font-semibold text-zinc-400 text-right uppercase tracking-wider">
                {card.items.length} Factors Identified
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
