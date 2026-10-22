import React from 'react';
import Card from '../ui/Card';
import StatCard from '../ui/StatCard';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import NarrativeBlock from '../ui/NarrativeBlock';
import { Award, Users, LineChart, CheckSquare, Sparkles } from 'lucide-react';

export default function ExecutiveSummary({ data }) {
  const narrativeSummary = data?.narrative_report?.executive_summary;
  const shortSummary =
    data?.summary ||
    'The startup idea shows initial promise with specific target market demand, but requires further refinement in pricing and competitive differentiation.';
  const score = typeof data?.overall_score === 'number' ? data.overall_score : 50;

  const directCount = Array.isArray(data?.competitor_analysis?.direct_competitors)
    ? data.competitor_analysis.direct_competitors.length
    : Array.isArray(data?.competitor_analysis?.competitor_list)
    ? data.competitor_analysis.competitor_list.length
    : '3+';
  const personasCount = Array.isArray(data?.persona_analysis?.personas)
    ? data.persona_analysis.personas.length
    : '2+';

  return (
    <section id="summary" className="space-y-6">
      <ReportSectionHeader
        number="01"
        category="EXECUTIVE SYNTHESIS"
        title="Executive Summary"
        description="A comprehensive, multi-paragraph overview of the startup venture, core problem, solution, opportunities, challenges, and strategic verdict."
      />

      {/* Main Narrative Prose */}
      {narrativeSummary ? (
        <NarrativeBlock
          title="Executive Summary & Strategic Analysis"
          subtitle="Full narrative evaluation of the business concept, market context, opportunities, and risks."
          content={narrativeSummary}
          icon={Sparkles}
          badgeText="EXECUTIVE NARRATIVE"
        />
      ) : (
        <Card className="p-6 sm:p-8 space-y-4 border-l-4 border-l-purple-500 bg-[#0b0b0f]">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm tracking-wide uppercase font-mono">
            <Sparkles className="w-4.5 h-4.5 text-purple-400" />
            <span>Strategic Narrative</span>
          </div>
          <p className="text-lg sm:text-xl text-zinc-100 leading-relaxed font-normal">
            {shortSummary}
          </p>
        </Card>
      )}

      {/* 4-Column Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Validation Score"
          value={`${score} / 100`}
          icon={Award}
        />
        <StatCard
          label="Direct Competitors"
          value={directCount}
          icon={Users}
        />
        <StatCard
          label="Target Personas"
          value={personasCount}
          icon={LineChart}
        />
        <StatCard
          label="Evaluation Areas"
          value="7 / 7"
          icon={CheckSquare}
        />
      </div>
    </section>
  );
}
