import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import NarrativeBlock from '../ui/NarrativeBlock';
import { Calendar, CheckSquare, Rocket, TrendingUp, Flag } from 'lucide-react';

export default function FounderActionPlanSection({ data }) {
  const plan = data?.founder_action_plan || {};
  const nextStepsNarrative = data?.narrative_report?.recommended_next_steps;
  const day7 = Array.isArray(plan.seven_day_plan) ? plan.seven_day_plan : [];
  const day30 = Array.isArray(plan.thirty_day_plan) ? plan.thirty_day_plan : [];
  const day90 = Array.isArray(plan.ninety_day_plan) ? plan.ninety_day_plan : [];

  const [activeTab, setActiveTab] = useState('7day');

  return (
    <section id="action-plan" className="space-y-6">
      <ReportSectionHeader
        number="12"
        category="FOUNDER EXECUTION ROADMAP"
        title="Recommended Next Steps"
        description="Structured phase-by-phase founder action checklist tailored to this startup's specific model and validation needs."
      />

      {/* Main Narrative Prose */}
      {nextStepsNarrative && (
        <NarrativeBlock
          title="Recommended Next Steps & Sequential Validation Roadmap"
          subtitle="Detailed narrative explaining validation experiments, decision gates, qualitative signals, and pivot/kill triggers."
          content={nextStepsNarrative}
          icon={Rocket}
          badgeText="VALIDATION ROADMAP NARRATIVE"
        />
      )}

      <Card className="p-6 sm:p-8 space-y-6 bg-[#0b0b0f]">
        {/* Tab Buttons Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2.5 font-mono text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('7day')}
              className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === '7day'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-zinc-950 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>DAYS 1 - 7 (Discovery & Pricing)</span>
              <Badge variant="violet" size="sm">{day7.length}</Badge>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('30day')}
              className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === '30day'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-zinc-950 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>DAYS 8 - 30 (MVP & Pilots)</span>
              <Badge variant="violet" size="sm">{day30.length}</Badge>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('90day')}
              className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === '90day'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-zinc-950 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>DAYS 31 - 90 (Retention & Scale)</span>
              <Badge variant="violet" size="sm">{day90.length}</Badge>
            </button>
          </div>

          <div className="text-xs sm:text-sm font-mono text-purple-300 bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-800/40">
            {activeTab === '7day' && 'Objective: Validate problem severity & willingness to pay'}
            {activeTab === '30day' && 'Objective: Launch Concierge/v1.0 MVP to initial cohort'}
            {activeTab === '90day' && 'Objective: Measure unit economics, retention, & scale decision'}
          </div>
        </div>

        {/* Task List Content */}
        <div className="space-y-3.5">
          {activeTab === '7day' && (
            <div className="space-y-3.5 animate-fadeIn">
              {day7.length > 0 ? (
                day7.map((task, idx) => (
                  <div key={idx} className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-purple-500/30 flex items-start gap-3.5 text-base text-zinc-100">
                    <CheckSquare className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider block">
                        Task 0{idx + 1} • Day {idx + 1} Focus
                      </span>
                      <span className="leading-relaxed font-semibold text-sm sm:text-base">{task}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-400 italic font-mono p-4 text-center">No 7-day tasks generated.</p>
              )}
            </div>
          )}

          {activeTab === '30day' && (
            <div className="space-y-3.5 animate-fadeIn">
              {day30.length > 0 ? (
                day30.map((task, idx) => (
                  <div key={idx} className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-blue-500/30 flex items-start gap-3.5 text-base text-zinc-100">
                    <Rocket className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block">
                        Milestone 0{idx + 1} • Week {Math.ceil((idx + 1) / 1.5) + 1} Focus
                      </span>
                      <span className="leading-relaxed font-semibold text-sm sm:text-base">{task}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-400 italic font-mono p-4 text-center">No 30-day tasks generated.</p>
              )}
            </div>
          )}

          {activeTab === '90day' && (
            <div className="space-y-3.5 animate-fadeIn">
              {day90.length > 0 ? (
                day90.map((task, idx) => (
                  <div key={idx} className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-emerald-500/30 flex items-start gap-3.5 text-base text-zinc-100">
                    <Flag className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                        Phase 0{idx + 1} • Month {Math.ceil((idx + 1) / 2) + 1} Decision Goal
                      </span>
                      <span className="leading-relaxed font-semibold text-sm sm:text-base">{task}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-400 italic font-mono p-4 text-center">No 90-day tasks generated.</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
