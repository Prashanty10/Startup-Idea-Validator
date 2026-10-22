import React from 'react';
import { Check, X, Layers, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import ReportSectionHeader from './ui/ReportSectionHeader';
import NarrativeBlock from './ui/NarrativeBlock';

export default function CompetitorSection({ data }) {
  const ca = data?.competitor_analysis || {};
  const competitorNarrative = data?.narrative_report?.competitor_analysis_narrative;
  
  const direct = Array.isArray(ca.direct_competitors) && ca.direct_competitors.length > 0
    ? ca.direct_competitors
    : Array.isArray(ca.competitor_list)
    ? ca.competitor_list.filter(c => c.competitor_type === 'DIRECT')
    : [];

  const indirect = Array.isArray(ca.indirect_competitors) && ca.indirect_competitors.length > 0
    ? ca.indirect_competitors
    : Array.isArray(ca.competitor_list)
    ? ca.competitor_list.filter(c => c.competitor_type === 'INDIRECT')
    : [];

  const substitutes = Array.isArray(ca.substitutes) && ca.substitutes.length > 0
    ? ca.substitutes
    : Array.isArray(ca.competitor_list)
    ? ca.competitor_list.filter(c => c.competitor_type === 'SUBSTITUTE')
    : [];

  const allCompetitors = Array.isArray(ca.competitor_list) && ca.competitor_list.length > 0
    ? ca.competitor_list
    : [...direct, ...indirect, ...substitutes];

  const marketGaps = Array.isArray(ca.market_gaps) 
    ? ca.market_gaps 
    : typeof ca.market_gaps === 'string' ? [ca.market_gaps] : [];

  const competitiveRisks = Array.isArray(ca.competitive_risks) 
    ? ca.competitive_risks 
    : typeof ca.competitive_risks === 'string' ? [ca.competitive_risks] : [];

  const renderCompetitorCards = (compList, categoryLabel, badgeColor) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
          {categoryLabel} ({compList.length})
        </span>
        <Badge variant={badgeColor} size="sm">{categoryLabel}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {compList.map((comp, idx) => {
          const name = comp.name || `Competitor ${idx + 1}`;
          const product = comp.product || 'N/A';
          const pricing = comp.pricing || 'Unknown / insufficient evidence';
          const strengths = Array.isArray(comp.strengths) ? comp.strengths : [];
          const weaknesses = Array.isArray(comp.weaknesses) ? comp.weaknesses : [];

          return (
            <Card key={idx} hoverable className="flex flex-col justify-between space-y-4 p-5">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3 border-b border-white/10 pb-3">
                  <h4 className="font-bold text-white text-base tracking-tight">{name}</h4>
                  <Badge variant={pricing.includes('Unknown') ? 'warning' : 'outline'} size="sm">
                    {pricing}
                  </Badge>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block font-mono mb-0.5">
                      Product Scope
                    </span>
                    <p className="text-zinc-300 font-medium leading-relaxed">
                      {product}
                    </p>
                  </div>

                  {comp.differentiation && (
                    <div className="bg-purple-950/40 p-2.5 rounded-lg border border-purple-800/40 text-[11px] text-purple-200">
                      ✨ <strong>Differentiation:</strong> {comp.differentiation}
                    </div>
                  )}

                  {/* Strengths */}
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block font-mono mb-1 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> Key Strengths
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {strengths.length > 0 ? (
                        strengths.map((str, sIdx) => (
                          <Badge key={sIdx} variant="default" size="sm">{str}</Badge>
                        ))
                      ) : (
                        <span className="text-xs text-zinc-500 italic font-mono">None specified</span>
                      )}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block font-mono mb-1 flex items-center gap-1">
                      <X className="w-3 h-3 text-zinc-400" /> Weaknesses
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {weaknesses.length > 0 ? (
                        weaknesses.map((wk, wIdx) => (
                          <span key={wIdx} className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/10">
                            {wk}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-zinc-500 italic font-mono">None specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="competition" className="space-y-6">
      <ReportSectionHeader
        number="05"
        category="COMPETITIVE LANDSCAPE"
        title="Competitors & Status-Quo Substitutes"
        description="Granular analysis classifying direct competitors, indirect alternatives, and manual substitutes."
      />

      {/* Main Narrative Prose */}
      {competitorNarrative && (
        <NarrativeBlock
          title="Competitive Landscape & Strategic Differentiation"
          subtitle="Detailed prose analysis of competitor capabilities, incumbent barriers, and wedge positioning."
          content={competitorNarrative}
          icon={Layers}
          badgeText="COMPETITIVE NARRATIVE"
        />
      )}

      {/* Render Direct Competitors */}
      {direct.length > 0 && renderCompetitorCards(direct, 'Direct Competitors', 'violet')}

      {/* Render Indirect Competitors */}
      {indirect.length > 0 && renderCompetitorCards(indirect, 'Indirect Alternatives', 'outline')}

      {/* Render Substitutes */}
      {substitutes.length > 0 && renderCompetitorCards(substitutes, 'Status-Quo Substitutes', 'warning')}

      {/* Fallback if list combined */}
      {allCompetitors.length > 0 && direct.length === 0 && indirect.length === 0 && substitutes.length === 0 && (
        renderCompetitorCards(allCompetitors, 'Market Competitors', 'violet')
      )}

      {allCompetitors.length === 0 && (
        <Card className="text-center py-8 text-zinc-400 text-xs font-mono">
          No explicit direct competitors identified in this specific niche. First-mover or status-quo substitute dynamic is high.
        </Card>
      )}

      {/* Market Gaps & Competitive Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <Card className="space-y-4 p-6 sm:p-8">
          <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 tracking-tight">
            <div className="w-7 h-7 rounded-lg bg-violet-950 border border-violet-800 flex items-center justify-center text-violet-400">
              <Layers className="w-4 h-4" />
            </div>
            <span>Unserved Market Gaps</span>
          </h3>
          {marketGaps.length > 0 ? (
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {marketGaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                  <span className="text-violet-400 font-bold">•</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-zinc-500 italic p-3 text-center bg-zinc-950 rounded-xl border border-white/10 font-mono">
              No market gaps listed.
            </p>
          )}
        </Card>

        <Card className="space-y-4 p-6 sm:p-8">
          <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 tracking-tight">
            <div className="w-7 h-7 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span>Competitive Barrier & Incumbent Risks</span>
          </h3>
          {competitiveRisks.length > 0 ? (
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {competitiveRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-zinc-500 italic p-3 text-center bg-zinc-950 rounded-xl border border-white/10 font-mono">
              No competitive risks specified.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
