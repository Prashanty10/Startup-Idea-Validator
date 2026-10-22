import React from 'react';
import { Target, AlertCircle, HeartHandshake, DollarSign, Briefcase } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import ReportSectionHeader from './ui/ReportSectionHeader';
import NarrativeBlock from './ui/NarrativeBlock';

export default function PersonaSection({ data }) {
  const pa = data?.persona_analysis || {};
  const customerNarrative = data?.narrative_report?.target_customer_analysis;
  const personas = Array.isArray(pa.personas) ? pa.personas : [];

  return (
    <section id="customers" className="space-y-6">
      <ReportSectionHeader
        number="06"
        category="CUSTOMER PROFILING"
        title="Target Customer Analysis"
        description="Detailed profiles of primary target customer segments, their goals, key friction points, and willingness to pay."
      />

      {/* Main Narrative Prose */}
      {customerNarrative && (
        <NarrativeBlock
          title="Target Customer Analysis & Adoption Dynamics"
          subtitle="Detailed narrative on buyer personas, acute friction points, willingness to pay, and discovery requirements."
          content={customerNarrative}
          icon={Target}
          badgeText="CUSTOMER NARRATIVE"
        />
      )}

      {personas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((persona, idx) => {
            const name = persona.name || `Persona ${idx + 1}`;
            const role = persona.role || 'Target User';
            const businessType = persona.business_type || 'B2C / B2B';
            const goals = Array.isArray(persona.goals) ? persona.goals : [];
            const painPoints = Array.isArray(persona.pain_points) ? persona.pain_points : [];
            const needs = Array.isArray(persona.needs) ? persona.needs : [];
            const willingnessToPay = persona.willingness_to_pay || 'Moderate to High';

            return (
              <Card key={idx} hoverable className="flex flex-col justify-between space-y-6 p-6 sm:p-8 bg-[#0b0b0f]">
                <div className="space-y-5">
                  {/* Persona Avatar & Header */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center font-bold text-purple-300 text-xl font-mono">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg sm:text-xl tracking-tight">{name}</h3>
                        <p className="text-xs sm:text-sm text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
                          <Briefcase className="w-4 h-4 text-purple-400" /> {role}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm">
                      {businessType}
                    </Badge>
                  </div>

                  {/* Primary Goals */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block font-mono flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-purple-400" /> Primary Goals
                    </span>
                    <ul className="space-y-2.5 text-sm sm:text-base text-zinc-200">
                      {goals.map((g, gIdx) => (
                        <li key={gIdx} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pain Points */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block font-mono flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-400" /> Pain Points & Frustrations
                    </span>
                    <ul className="space-y-2.5 text-sm sm:text-base text-zinc-200">
                      {painPoints.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                          <span className="text-amber-400 font-bold">!</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Needs */}
                  {needs.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block font-mono flex items-center gap-1.5">
                        <HeartHandshake className="w-4 h-4 text-emerald-400" /> Core Needs from Solution
                      </span>
                      <ul className="space-y-2.5 text-sm sm:text-base text-zinc-200">
                        {needs.map((n, nIdx) => (
                          <li key={nIdx} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded-xl border border-white/10 leading-relaxed">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Willingness to Pay Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-zinc-300 font-mono flex items-center gap-2">
                    <DollarSign className="w-4.5 h-4.5 text-purple-400" /> Willingness to Pay
                  </span>
                  <Badge variant="violet" size="sm">
                    {willingnessToPay}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-8 text-zinc-400 text-sm font-mono">
          No personas generated.
        </Card>
      )}
    </section>
  );
}
