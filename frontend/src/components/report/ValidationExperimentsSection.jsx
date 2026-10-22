import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import { FlaskConical, Target, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ValidationExperimentsSection({ data }) {
  const experiments = Array.isArray(data?.validation_experiments) ? data.validation_experiments : [];

  return (
    <section id="experiments" className="space-y-6">
      <ReportSectionHeader
        number="10"
        category="LEAN VALIDATION ENGINE"
        title="Validation Experiment Cards"
        description="Actionable, hypothesis-driven validation experiments with quantitative pass/fail thresholds before building."
      />

      {experiments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp, idx) => (
            <Card key={idx} hoverable className="p-6 space-y-5 flex flex-col justify-between border-t-4 border-t-purple-500 bg-[#0b0b0f]">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 font-bold text-base font-mono">
                      E{idx + 1}
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">
                      Experiment 0{idx + 1}
                    </span>
                  </div>
                  <Badge variant="violet" size="sm" icon={Clock}>
                    {exp.estimated_effort || '3-5 days'}
                  </Badge>
                </div>

                {/* Hypothesis */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-purple-400 block tracking-wider">
                    TESTABLE HYPOTHESIS
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                    "{exp.hypothesis}"
                  </p>
                </div>

                {/* Experiment Details */}
                <div className="space-y-2.5 text-sm sm:text-base text-zinc-200">
                  <div className="flex items-start gap-2.5">
                    <FlaskConical className="w-4.5 h-4.5 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white font-bold">Action / Test:</strong> {exp.experiment}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Target className="w-4.5 h-4.5 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white font-bold">Target Cohort:</strong> {exp.target_audience} (Sample size: {exp.sample_size || '15-30 users'})
                    </div>
                  </div>
                </div>

                {/* Quantitative Thresholds */}
                <div className="grid grid-cols-2 gap-3 pt-1 font-mono">
                  <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4" /> PASS SIGNAL
                    </div>
                    <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">{exp.success_metric}</p>
                  </div>

                  <div className="bg-red-950/40 p-3.5 rounded-xl border border-red-500/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs sm:text-sm">
                      <XCircle className="w-4 h-4" /> FAIL SIGNAL
                    </div>
                    <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">{exp.failure_threshold}</p>
                  </div>
                </div>
              </div>

              {/* Decision Branches */}
              <div className="pt-4 border-t border-white/10 text-xs sm:text-sm font-mono space-y-1.5 text-zinc-300">
                <div><span className="text-emerald-400 font-bold">If Pass:</span> {exp.decision_if_pass}</div>
                <div><span className="text-amber-400 font-bold">If Fail:</span> {exp.decision_if_fail}</div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center text-sm text-zinc-400 font-mono">
          No experiments generated.
        </Card>
      )}
    </section>
  );
}
