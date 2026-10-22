import React from 'react';
import { CheckCircle2, Rocket, Ban, ListOrdered, Sparkles, ArrowRight } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import ReportSectionHeader from './ui/ReportSectionHeader';
import NarrativeBlock from './ui/NarrativeBlock';

const TIMELINE_STEPS = [
  { step: '01', name: 'Validate', desc: 'Confirm customer demand & problem severity' },
  { step: '02', name: 'Build', desc: 'Develop core high-impact v1.0 experience' },
  { step: '03', name: 'Launch', desc: 'Test with targeted cohort of early adopters' },
  { step: '04', name: 'Measure', desc: 'Track key engagement, usage & conversion' },
  { step: '05', name: 'Iterate', desc: 'Refine feature roadmap based on real feedback' },
];

export default function MVPSection({ data }) {
  const mvp = data?.mvp_analysis || {};
  const mvpNarrative = data?.narrative_report?.mvp_recommendations;

  const safeText = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return value.map(safeText).filter(Boolean).join(', ');
    if (typeof value === 'object') {
      if (value.name !== undefined) return safeText(value.name);
      if (value.reason !== undefined) return safeText(value.reason);
      return Object.values(value).map(safeText).filter(Boolean).join(' — ');
    }
    return String(value);
  };

  const coreFeatures = Array.isArray(mvp.core_features) ? mvp.core_features : [];
  const futureFeatures = Array.isArray(mvp.future_features) ? mvp.future_features : [];
  const excludedFeatures = Array.isArray(mvp.excluded_features) ? mvp.excluded_features : [];
  const devPriority = Array.isArray(mvp.development_priority) ? mvp.development_priority : [];
  const mvpRationale = mvp.mvp_rationale
    ? safeText(mvp.mvp_rationale)
    : 'Focus initial release strictly on high-impact core problem solving to shorten time-to-market.';

  return (
    <section id="mvp" className="space-y-6">
      <ReportSectionHeader
        number="11"
        category="EXECUTION ROADMAP"
        title="MVP Recommendations"
        description="A structured 5-stage execution timeline, core v1.0 scope, post-launch expansion, and build priorities."
      />

      {/* Main Narrative Prose */}
      {mvpNarrative && (
        <NarrativeBlock
          title="Minimum Viable Product (MVP) Strategy & Scope Discipline"
          subtitle="Detailed narrative explaining MVP definition, core testable hypothesis, essential v1.0 features vs deferred scope, and user learning loops."
          content={mvpNarrative}
          icon={Rocket}
          badgeText="MVP NARRATIVE"
        />
      )}

      {/* Visual Roadmap Timeline */}
      <Card className="p-6 sm:p-8 space-y-4 bg-[#0b0b0f]">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-mono">
          5-Stage Product Execution Timeline
        </span>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {TIMELINE_STEPS.map((tStep, idx) => (
            <div key={idx} className="relative bg-zinc-950 p-4 sm:p-5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-purple-400 bg-purple-950 px-2.5 py-1 rounded border border-purple-800">
                  {tStep.step}
                </span>
                {idx < TIMELINE_STEPS.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-zinc-500 hidden md:block" />
                )}
              </div>
              <div className="font-bold text-white text-base sm:text-lg">{tStep.name}</div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">{tStep.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Strategic Rationale */}
      <Card className="space-y-3 p-6 sm:p-8 bg-[#0b0b0f]">
        <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
          <Sparkles className="w-5 h-5 text-purple-400" />
          MVP Strategic Rationale
        </h3>
        <p className="text-base sm:text-lg text-zinc-100 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-white/10 font-normal">
          {mvpRationale}
        </p>
      </Card>

      {/* Feature Scope Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CORE FEATURES */}
        <Card hoverable className="flex flex-col justify-between space-y-4 p-6 bg-[#0b0b0f]">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 tracking-tight">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Core MVP Features
              </h3>
              <Badge variant="success" size="sm">
                v1.0 Scope
              </Badge>
            </div>

            {coreFeatures.length > 0 ? (
              <ul className="space-y-3 text-sm sm:text-base text-zinc-200">
                {coreFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{safeText(feature)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-400 italic p-3 text-center bg-zinc-950 rounded-xl font-mono">
                No core features listed.
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 text-xs font-mono text-zinc-400 font-semibold text-right uppercase tracking-wider">
            {coreFeatures.length} Core Modules
          </div>
        </Card>

        {/* FUTURE FEATURES */}
        <Card hoverable className="flex flex-col justify-between space-y-4 p-6 bg-[#0b0b0f]">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 tracking-tight">
                <Rocket className="w-5 h-5 text-purple-400" />
                Future Expansion
              </h3>
              <Badge variant="violet" size="sm">
                Post-Launch
              </Badge>
            </div>

            {futureFeatures.length > 0 ? (
              <ul className="space-y-3 text-sm sm:text-base text-zinc-200">
                {futureFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{safeText(feature)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-400 italic p-3 text-center bg-zinc-950 rounded-xl font-mono">
                No future features listed.
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 text-xs font-mono text-zinc-400 font-semibold text-right uppercase tracking-wider">
            {futureFeatures.length} Roadmap Items
          </div>
        </Card>

        {/* EXCLUDED FEATURES */}
        <Card hoverable className="flex flex-col justify-between space-y-4 p-6 bg-[#0b0b0f]">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 tracking-tight">
                <Ban className="w-5 h-5 text-zinc-400" />
                Excluded Scope
              </h3>
              <Badge variant="outline" size="sm">
                Out of Scope
              </Badge>
            </div>

            {excludedFeatures.length > 0 ? (
              <ul className="space-y-3 text-sm sm:text-base text-zinc-300">
                {excludedFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                    <span className="text-zinc-400 font-bold">×</span>
                    <span>{safeText(feature)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-400 italic p-3 text-center bg-zinc-950 rounded-xl font-mono">
                No features explicitly excluded.
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 text-xs font-mono text-zinc-400 font-semibold text-right uppercase tracking-wider">
            {excludedFeatures.length} Out-of-scope Items
          </div>
        </Card>
      </div>

      {/* DEVELOPMENT PRIORITY */}
      {devPriority.length > 0 && (
        <Card className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <ListOrdered className="w-5 h-5 text-purple-400" />
            Recommended Development Sequence
          </h3>

          <div className="space-y-2.5">
            {devPriority.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-zinc-950 p-4 rounded-xl border border-white/10 text-sm sm:text-base text-zinc-100 font-mono"
              >
                <Badge variant="violet" size="sm">
                  P{idx + 1}
                </Badge>
                <span className="flex-1 leading-relaxed font-semibold">
                  {safeText(step)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </section>
  );
}
