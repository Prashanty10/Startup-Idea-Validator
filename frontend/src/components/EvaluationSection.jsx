import React from 'react';
import { FileText, HelpCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import ReportSectionHeader from './ui/ReportSectionHeader';

const CRITERIA_KEYS = [
  { key: 'market_demand', label: 'Market Opportunity & Demand', desc: 'Size & urgency of market pull' },
  { key: 'customer_need', label: 'Customer Need Severity', desc: 'Problem severity & buyer willingness to pay' },
  { key: 'competition', label: 'Competition Risk & Differentiation', desc: 'Differentiation & barrier to entry' },
  { key: 'business_potential', label: 'Business Model Potential', desc: 'Scalability & long-term margin upside' },
  { key: 'pricing_potential', label: 'Pricing Potential', desc: 'Price elasticity & monetizability' },
  { key: 'feasibility', label: 'Execution Feasibility', desc: 'Execution complexity & resource requirements' },
  { key: 'mvp_clarity', label: 'MVP Scope Clarity', desc: 'Actionable feature priority & build scope' }
];

export default function EvaluationSection({ data }) {
  const ev = data?.evaluation || {};

  const safeText = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    if (Array.isArray(value)) {
      return value.map(safeText).filter(Boolean).join(', ');
    }
    if (typeof value === 'object') {
      if (value.reason !== undefined) return safeText(value.reason);
      return Object.values(value).map(safeText).filter(Boolean).join(' — ');
    }
    return String(value);
  };

  const getConfBadge = (conf) => {
    switch (conf?.toUpperCase()) {
      case 'HIGH':
        return <Badge variant="success" size="sm">HIGH CONFIDENCE</Badge>;
      case 'LOW':
        return <Badge variant="error" size="sm">LOW CONFIDENCE</Badge>;
      default:
        return <Badge variant="violet" size="sm">MEDIUM CONFIDENCE</Badge>;
    }
  };

  return (
    <section id="breakdown" className="space-y-6">
      <ReportSectionHeader
        number="07"
        category="CRITERIA BREAKDOWN"
        title="Granular Validation & Confidence Breakdown"
        description="7-point evaluation scores (0 to 10) coupled with evidence confidence ratings, unproven assumptions, and validation actions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CRITERIA_KEYS.map((item, idx) => {
          const evalObj = ev[item.key] && typeof ev[item.key] === 'object' && !Array.isArray(ev[item.key])
            ? ev[item.key]
            : {};

          const score = typeof evalObj.score === 'number' ? Math.max(0, Math.min(10, evalObj.score)) : 7;
          const confidence = evalObj.confidence || 'MEDIUM';
          const reason = evalObj.reason ? safeText(evalObj.reason) : 'Sufficient baseline metrics observed for initial launch.';
          const evidence = evalObj.evidence ? evalObj.evidence : [];
          const assumptions = Array.isArray(evalObj.assumptions) ? evalObj.assumptions : [];
          const validationAction = evalObj.validation_action || '';

          return (
            <Card key={idx} hoverable className="flex flex-col justify-between space-y-4 p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                      {item.label}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-baseline space-x-1 font-mono">
                      <span className="text-2xl font-extrabold text-white">{score}</span>
                      <span className="text-xs text-zinc-400 font-semibold">/ 10</span>
                    </div>
                    {getConfBadge(confidence)}
                  </div>
                </div>

                {/* Progress Score Track */}
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full transition-all duration-700 rounded-full"
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-3.5 rounded-xl border border-white/10">
                  {reason}
                </p>

                {/* Assumptions if available */}
                {assumptions.length > 0 && (
                  <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/20 text-xs text-amber-300 space-y-1">
                    <div className="flex items-center gap-1 font-mono font-bold text-[10px] uppercase">
                      <AlertTriangle className="w-3 h-3" /> Unproven Assumption:
                    </div>
                    <p className="leading-tight">{assumptions.join('; ')}</p>
                  </div>
                )}

                {/* Validation Action */}
                {validationAction && (
                  <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-500/30 text-xs text-purple-200 font-mono">
                    💡 <strong>Next Validation Step:</strong> {validationAction}
                  </div>
                )}
              </div>

              {/* RAG Evidence Snippets */}
              {evidence.length > 0 && (
                <div className="pt-3 border-t border-white/10 text-[11px] text-zinc-400 font-mono space-y-1">
                  <div className="flex items-center gap-1 font-bold text-zinc-300">
                    <FileText className="w-3.5 h-3.5 text-purple-400" /> Grounding Evidence:
                  </div>
                  {evidence.map((e, eIdx) => (
                    <div key={eIdx} className="italic bg-zinc-950 p-2 rounded text-zinc-300 border border-white/5 truncate">
                      "{e.claim || e}"
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
