import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import NarrativeBlock from '../ui/NarrativeBlock';
import { Sparkles, ArrowRight, ShieldCheck, Scale } from 'lucide-react';

export default function FinalConclusion({ data }) {
  const verdict = data?.verdict || 'Moderate Potential';
  const confidence = data?.evidence_confidence || 'MEDIUM';
  const overallNarrative = data?.narrative_report?.overall_assessment;
  const shortSummary =
    data?.summary ||
    'The current analysis indicates a viable opportunity, but success will depend heavily on customer trust, unit economics sustainability, and regional market validation.';

  return (
    <section id="conclusion" className="space-y-6">
      <ReportSectionHeader
        number="13"
        category="STRATEGIC SYNTHESIS"
        title="Overall Assessment"
        description="Balanced concluding synthesis connecting market, customers, competition, unit economics, MVP, and risks."
      />

      {/* Main Narrative Prose */}
      {overallNarrative && (
        <NarrativeBlock
          title="Overall Assessment & Investment Readiness Synthesis"
          subtitle="Rigorous, balanced conclusion connecting empirical validation findings without false success guarantees."
          content={overallNarrative}
          icon={Scale}
          badgeText="OVERALL ASSESSMENT"
        />
      )}

      <Card className="p-6 sm:p-8 lg:p-10 space-y-6 border-2 border-purple-500/50 bg-[#0b0b0f]">
        {/* Large Status Badge Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block">
              FINAL VALIDATION RATING
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-3">
              <span>{verdict}</span>
              <span className="text-xs font-mono font-bold text-purple-400">({confidence} Confidence)</span>
            </div>
          </div>

          <Badge variant="violet" size="md" icon={ShieldCheck}>
            Validation Audit Complete
          </Badge>
        </div>

        {/* Highlighted Recommended Immediate Next Step Box */}
        <div className="bg-purple-950/40 border border-purple-800/60 p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-base tracking-tight font-mono">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Recommended Core Action Gate</span>
          </div>

          <p className="text-base sm:text-lg text-purple-100 leading-relaxed font-medium">
            Conduct 15 to 20 structured customer discovery interviews to confirm acute willingness to pay before committing substantial software engineering or hiring capital.
          </p>
        </div>
      </Card>
    </section>
  );
}
