import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import NarrativeBlock from '../ui/NarrativeBlock';
import { HelpCircle, ShieldAlert } from 'lucide-react';

export default function CriticalUnknownsSection({ data }) {
  const riskNarrative = data?.narrative_report?.risk_analysis_narrative;
  const unknowns = Array.isArray(data?.critical_unknowns)
    ? data.critical_unknowns
    : Array.isArray(data?.risk_failure_analysis?.critical_unknowns)
    ? data.risk_failure_analysis.critical_unknowns
    : [];

  const failures = Array.isArray(data?.failure_scenarios)
    ? data.failure_scenarios
    : Array.isArray(data?.risk_failure_analysis?.failure_scenarios)
    ? data.risk_failure_analysis.failure_scenarios
    : [];

  const getPriorityBadge = (prio) => {
    switch (prio?.toUpperCase()) {
      case 'CRITICAL':
        return <Badge variant="error" size="sm">CRITICAL UNKNOWN</Badge>;
      case 'HIGH':
        return <Badge variant="warning" size="sm">HIGH PRIORITY</Badge>;
      default:
        return <Badge variant="outline" size="sm">{prio || 'MEDIUM'}</Badge>;
    }
  };

  return (
    <section id="unknowns" className="space-y-6">
      <ReportSectionHeader
        number="08"
        category="RISK & UNCERTAINTY MATRIX"
        title="Risk Analysis"
        description="Priority unanswered questions (Impact × Uncertainty) and realistic failure modes with early warning signals."
      />

      {/* Main Narrative Prose */}
      {riskNarrative && (
        <NarrativeBlock
          title="Risk Analysis & Practical Mitigation Playbook"
          subtitle="Detailed narrative explaining execution vulnerabilities, root causes, market triggers, and founder safeguards."
          content={riskNarrative}
          icon={ShieldAlert}
          badgeText="RISK NARRATIVE"
        />
      )}

      {/* Top Section: Critical Unknowns */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg tracking-tight font-mono uppercase">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span>Top Critical Unknowns (Prioritized by Impact × Uncertainty)</span>
        </div>

        {unknowns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {unknowns.map((item, idx) => (
              <Card key={idx} hoverable className="p-6 space-y-4 flex flex-col justify-between border-l-4 border-l-amber-500 bg-[#0b0b0f]">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      {item.category || 'Core Question'}
                    </span>
                    {getPriorityBadge(item.priority_score || item.impact)}
                  </div>

                  <h4 className="font-bold text-white text-lg sm:text-xl leading-snug tracking-tight">
                    {item.unknown}
                  </h4>

                  <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400 pt-1">
                    <span>Impact: <strong className="text-zinc-100 font-bold">{item.impact || 'HIGH'}</strong></span>
                    <span>•</span>
                    <span>Uncertainty: <strong className="text-zinc-100 font-bold">{item.uncertainty || 'HIGH'}</strong></span>
                  </div>
                </div>

                {item.how_to_validate && (
                  <div className="pt-3.5 border-t border-white/10 text-xs sm:text-sm text-amber-300 font-mono bg-zinc-950 p-3.5 rounded-xl border border-amber-500/30 leading-relaxed">
                    🔬 <strong>Validation Plan:</strong> {item.how_to_validate}
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-sm text-zinc-400 font-mono">
            No explicit critical unknowns generated.
          </Card>
        )}
      </div>

      {/* Lower Section: Failure Scenarios */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 text-red-400 font-bold text-lg tracking-tight font-mono uppercase">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          <span>Realistic Failure Scenarios & Early Warning Signals</span>
        </div>

        {failures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {failures.map((item, idx) => (
              <Card key={idx} className="p-6 space-y-4 border-l-4 border-l-red-500 bg-[#0b0b0f]">
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block">
                      Failure Mode {idx + 1}
                    </span>
                    <h4 className="font-bold text-white text-lg sm:text-xl tracking-tight">
                      {item.scenario}
                    </h4>
                  </div>
                  <Badge variant="error" size="sm">
                    {item.impact || 'HIGH'} IMPACT
                  </Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase block">
                      Root Cause:
                    </span>
                    <p className="text-zinc-200 leading-relaxed font-normal text-sm sm:text-base">
                      {item.why_it_could_happen}
                    </p>
                  </div>

                  {item.early_warning_signal && (
                    <div className="bg-zinc-950 p-3.5 rounded-xl border border-red-500/40 text-red-300 font-mono text-xs sm:text-sm leading-relaxed">
                      🚨 <strong>Early Warning Signal:</strong> {item.early_warning_signal}
                    </div>
                  )}

                  {item.mitigation_strategy && (
                    <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10 text-zinc-200 leading-relaxed text-xs sm:text-sm">
                      🛠️ <strong>Mitigation:</strong> {item.mitigation_strategy}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-sm text-zinc-400 font-mono">
            No failure scenarios flagged.
          </Card>
        )}
      </div>
    </section>
  );
}
