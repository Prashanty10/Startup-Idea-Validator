import React from 'react';
import Card from '../ui/Card';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import NarrativeBlock from '../ui/NarrativeBlock';
import { Lightbulb, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

export default function StartupIdeaOverviewSection({ data }) {
  const ideaOverview = data?.narrative_report?.startup_idea_overview;
  const idea = data?.startup_idea || '';
  const ideaAnalysis = data?.idea_analysis || {};

  const problem = ideaAnalysis.problem_statement || 'Pain point in existing customer workflow';
  const solution = ideaAnalysis.solution_concept || 'Proposed software-driven approach';
  const category = ideaAnalysis.industry || 'Technology & Digital Services';
  const targetUser = ideaAnalysis.target_customer || 'Target end user persona';

  return (
    <section id="idea-overview" className="space-y-6">
      <ReportSectionHeader
        number="02"
        category="CONCEPT FORMULATION"
        title="Startup Idea Overview"
        description="Detailed contextual narrative of how the proposed venture works, the core problem it solves, and value delivery mechanics."
      />

      {/* Main Narrative Analysis Block */}
      {ideaOverview && (
        <NarrativeBlock
          title="Startup Concept & Value Delivery Analysis"
          subtitle="Detailed narrative analysis connecting product mechanisms, user value, and operational scope."
          content={ideaOverview}
          icon={Lightbulb}
          badgeText="CONCEPT ANALYSIS"
        />
      )}

      {/* Structured Context Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4 bg-[#0b0b0f] border-l-4 border-l-indigo-500">
          <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm tracking-wide uppercase font-mono">
            <Layers className="w-4 h-4" />
            <span>Problem & Solution Architecture</span>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase block">Core Problem Identified:</span>
              <p className="text-zinc-100 font-medium mt-0.5 leading-relaxed">{problem}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase block">Proposed Solution:</span>
              <p className="text-zinc-100 font-medium mt-0.5 leading-relaxed">{solution}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4 bg-[#0b0b0f] border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm tracking-wide uppercase font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Target Domain & Audience</span>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase block">Industry Sector / Category:</span>
              <p className="text-zinc-100 font-medium mt-0.5">{category}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase block">Intended Primary Beneficiary:</span>
              <p className="text-zinc-100 font-medium mt-0.5">{targetUser}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
