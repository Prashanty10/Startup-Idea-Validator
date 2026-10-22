import React from 'react';
import Card from '../ui/Card';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import NarrativeBlock from '../ui/NarrativeBlock';
import { Cpu, Server, ShieldCheck, Activity } from 'lucide-react';

export default function TechnicalFeasibilitySection({ data }) {
  const narrative = data?.narrative_report?.technical_operational_feasibility;

  return (
    <section id="technical-feasibility" className="space-y-6">
      <ReportSectionHeader
        number="10"
        category="ENGINEERING & OPERATIONS"
        title="Technical and Operational Feasibility"
        description="Comprehensive evaluation of system architecture, technology stack requirements, operational processes, and execution constraints."
      />

      {/* Main Narrative Prose */}
      {narrative && (
        <NarrativeBlock
          title="Technical Architecture & Execution Feasibility Analysis"
          subtitle="Detailed narrative examination of system requirements, dependencies, and operational workflows."
          content={narrative}
          icon={Cpu}
          badgeText="FEASIBILITY NARRATIVE"
        />
      )}

      {/* Structured Feasibility Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 space-y-3 bg-[#0b0b0f] border-t-2 border-t-purple-500">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm font-mono uppercase">
            <Server className="w-4 h-4" />
            <span>Infrastructure & Stack</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Cloud-native architecture leveraging modular microservices or API-first backends. Emphasis on secure asynchronous processing, managed databases, and low-latency API integrations.
          </p>
        </Card>

        <Card className="p-5 space-y-3 bg-[#0b0b0f] border-t-2 border-t-blue-500">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm font-mono uppercase">
            <Activity className="w-4 h-4" />
            <span>Operational Dependencies</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Relies on clean user data ingestion and third-party API reliability. Human-in-the-loop workflows must be documented to decouple founder labor from daily user onboarding.
          </p>
        </Card>

        <Card className="p-5 space-y-3 bg-[#0b0b0f] border-t-2 border-t-emerald-500">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-mono uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Compliance & Privacy</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Regional data security protocols, encryption at rest/transit, and privacy compliance standards (e.g. GDPR, local statutory guidelines) must be designed into schema structures upfront.
          </p>
        </Card>
      </div>
    </section>
  );
}
