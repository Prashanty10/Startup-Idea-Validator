import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import { AlertCircle, CheckCircle, Calculator, TrendingUp } from 'lucide-react';

export default function UnitEconomicsSection({ data }) {
  const ue = data?.unit_economics || {};
  const isApplicable = ue.is_applicable !== false;
  const modelType = ue.business_model_type || 'General';

  const metrics = [
    { label: 'Revenue / Customer', value: ue.revenue_per_customer || 'Unknown — requires validation' },
    { label: 'Variable Cost', value: ue.variable_cost || 'Unknown — requires validation' },
    { label: 'Contribution Margin', value: ue.contribution_margin || 'Unknown — requires validation' },
    { label: 'Gross Margin Benchmark', value: ue.gross_margin_estimate || 'Unknown — requires validation' },
    { label: 'Estimated CAC', value: ue.estimated_cac || 'Unknown — requires validation' },
    { label: 'Estimated LTV', value: ue.estimated_ltv || 'Unknown — requires validation' },
    { label: 'LTV : CAC Ratio', value: ue.ltv_cac_ratio || 'Unknown — requires validation' },
    { label: 'CAC Payback Period', value: ue.cac_payback_months || 'Unknown — requires validation' },
  ];

  const unproven = Array.isArray(ue.unproven_financial_assumptions) ? ue.unproven_financial_assumptions : [];
  const validationSteps = Array.isArray(ue.how_to_validate_unit_economics) ? ue.how_to_validate_unit_economics : [];

  const isUnknown = (val) => typeof val === 'string' && val.includes('Unknown');

  return (
    <div className="space-y-6">
      <ReportSectionHeader
        number="05"
        category="FINANCIAL ARCHITECTURE"
        title="Unit Economics & Financial Validation"
        description="Structured unit economics framework for this startup model type. Highlights proven metrics vs required founder validation."
      />

      <Card className="p-6 sm:p-8 space-y-6 bg-[#0b0b0f]">
        {/* Header callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4.5 h-4.5 text-purple-400" />
              <span>Financial Model Archetype</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {modelType} Unit Economics Framework
            </h3>
          </div>

          <Badge variant="outline" size="sm">
            {isApplicable ? 'Model Active' : 'Non-financial'}
          </Badge>
        </div>

        {/* 8 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => {
            const unknown = isUnknown(m.value);
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                  unknown
                    ? 'bg-zinc-950 border-amber-500/40'
                    : 'bg-zinc-950 border-emerald-500/40'
                }`}
              >
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-300">
                  {m.label}
                </span>
                <div className={`text-lg sm:text-xl font-extrabold font-mono leading-snug ${unknown ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {m.value}
                </div>
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 pt-1">
                  {unknown ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>Requires Validation</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Benchmark Calculated</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Unproven Financial Assumptions & Validation Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Unproven Assumptions */}
          <div className="bg-zinc-950 p-6 rounded-2xl border border-white/10 space-y-3.5">
            <h4 className="font-bold text-amber-400 text-base flex items-center gap-2 font-mono uppercase tracking-wider">
              <AlertCircle className="w-4.5 h-4.5 text-amber-400" /> Unproven Financial Assumptions
            </h4>
            {unproven.length > 0 ? (
              <ul className="space-y-2.5 text-sm sm:text-base text-zinc-200">
                {unproven.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-zinc-900/80 p-3 rounded-xl border border-white/10">
                    <span className="text-amber-400 font-bold">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-400 italic font-mono">
                No unproven financial assumptions listed.
              </p>
            )}
          </div>

          {/* Validation Steps */}
          <div className="bg-zinc-950 p-6 rounded-2xl border border-white/10 space-y-3.5">
            <h4 className="font-bold text-purple-400 text-base flex items-center gap-2 font-mono uppercase tracking-wider">
              <TrendingUp className="w-4.5 h-4.5 text-purple-400" /> How to Validate Unit Economics
            </h4>
            {validationSteps.length > 0 ? (
              <ul className="space-y-2.5 text-sm sm:text-base text-zinc-200">
                {validationSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-zinc-900/80 p-3 rounded-xl border border-white/10">
                    <span className="text-purple-400 font-bold font-mono">{i + 1}.</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-400 italic font-mono">
                Test CAC via small ad experiments and pilot pricing cohorts.
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
