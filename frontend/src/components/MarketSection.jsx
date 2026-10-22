import React from 'react';
import { Compass, Target, Zap, ArrowUpRight, AlertCircle, FileText } from 'lucide-react';
import Card from './ui/Card';
import ReportSectionHeader from './ui/ReportSectionHeader';
import NarrativeBlock from './ui/NarrativeBlock';

export default function MarketSection({ data }) {
  const mr = data?.market_research || {};
  const marketNarrative = data?.narrative_report?.market_opportunity_analysis;

  const safeText = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    if (Array.isArray(value)) return value.map(safeText).filter(Boolean).join(', ');
    if (typeof value === 'object') {
      const claim = value.claim ? String(value.claim) : '';
      const source = value.source ? String(value.source) : '';
      if (claim && source) return `${claim} — Source: ${source}`;
      if (claim) return claim;
      if (source) return `Source: ${source}`;
      return Object.values(value).map(safeText).filter(Boolean).join(' — ');
    }
    return String(value);
  };

  const asArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value !== null && value !== undefined && value !== '') return [value];
    return [];
  };

  const marketDemand = safeText(mr.market_demand || 'No market demand information available.');
  const targetMarket = safeText(mr.target_market || 'No target market information available.');

  const industryTrends = asArray(mr.industry_trends);
  const growthDrivers = asArray(mr.growth_drivers);
  const customerProblems = asArray(mr.customer_problems);
  const opportunities = asArray(mr.opportunities);
  const evidence = asArray(mr.evidence);

  return (
    <section id="market" className="space-y-6">
      <ReportSectionHeader
        number="04"
        category="MARKET ANALYSIS"
        title="Market Opportunity"
        description="Understanding market demand, regional scoping, growth drivers, and core customer problems."
      />

      {/* Main Narrative Prose */}
      {marketNarrative && (
        <NarrativeBlock
          title="Market Opportunity & Demand Dynamics"
          subtitle="Comprehensive narrative on market sizing, customer need drivers, and regional trends."
          content={marketNarrative}
          icon={Compass}
          badgeText="MARKET NARRATIVE"
        />
      )}

      {/* Primary Overview 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hoverable className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <div className="flex items-center gap-3 text-white font-bold text-lg sm:text-xl tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
              <Compass className="w-5 h-5" />
            </div>
            <span>Market Demand Analysis</span>
          </div>
          <p className="text-base sm:text-lg text-zinc-100 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-white/10 font-normal">
            {marketDemand}
          </p>
        </Card>

        <Card hoverable className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <div className="flex items-center gap-3 text-white font-bold text-lg sm:text-xl tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <Target className="w-5 h-5" />
            </div>
            <span>Target Market Scoping</span>
          </div>
          <p className="text-base sm:text-lg text-zinc-100 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-white/10 font-normal">
            {targetMarket}
          </p>
        </Card>
      </div>

      {/* Secondary Detailed Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <Zap className="w-5 h-5 text-purple-400" />
            Industry Trends
          </h3>

          {industryTrends.length > 0 ? (
            <ul className="space-y-3 text-sm sm:text-base text-zinc-200">
              {industryTrends.map((item, index) => (
                <li key={index} className="flex items-start gap-3 bg-zinc-950 p-4 rounded-xl border border-white/10 leading-relaxed">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{safeText(item)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl font-mono">
              No industry trends listed.
            </p>
          )}
        </Card>

        <Card className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <ArrowUpRight className="w-5 h-5 text-indigo-400" />
            Growth Drivers
          </h3>

          {growthDrivers.length > 0 ? (
            <ul className="space-y-3 text-sm sm:text-base text-zinc-200">
              {growthDrivers.map((item, index) => (
                <li key={index} className="flex items-start gap-3 bg-zinc-950 p-4 rounded-xl border border-white/10 leading-relaxed">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{safeText(item)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl font-mono">
              No growth drivers listed.
            </p>
          )}
        </Card>

        <Card className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Core Customer Problems
          </h3>

          {customerProblems.length > 0 ? (
            <ul className="space-y-3 text-sm sm:text-base text-zinc-200">
              {customerProblems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 bg-zinc-950 p-4 rounded-xl border border-white/10 leading-relaxed">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>{safeText(item)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl font-mono">
              No core problems specified.
            </p>
          )}
        </Card>

        <Card className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <FileText className="w-5 h-5 text-emerald-400" />
            Market Opportunities & Evidence
          </h3>

          {opportunities.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-mono">
                Key Opportunities:
              </span>
              <ul className="space-y-2.5 text-sm sm:text-base text-zinc-200">
                {opportunities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{safeText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evidence.length > 0 && (
            <div className="bg-zinc-950 p-4.5 rounded-2xl border border-white/10 text-xs sm:text-sm text-zinc-300 font-mono space-y-2">
              <span className="text-white font-bold block">
                Market Evidence Data:
              </span>
              {evidence.map((item, index) => (
                <p key={index} className="italic border-l-2 border-purple-500 pl-3 py-1 text-zinc-200 leading-relaxed">
                  "{safeText(item)}"
                </p>
              ))}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
