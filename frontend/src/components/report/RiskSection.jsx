import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import { AlertOctagon } from 'lucide-react';

export default function RiskSection({ data }) {
  const threats = Array.isArray(data?.threats) ? data.threats : [];
  const compRisks = Array.isArray(data?.competitor_analysis?.competitive_risks) 
    ? data.competitor_analysis.competitive_risks 
    : typeof data?.competitor_analysis?.competitive_risks === 'string'
    ? [data.competitor_analysis.competitive_risks]
    : [];
  const pricingRisks = Array.isArray(data?.pricing_analysis?.pricing_risks)
    ? data.pricing_analysis.pricing_risks
    : typeof data?.pricing_analysis?.pricing_risks === 'string'
    ? [data.pricing_analysis.pricing_risks]
    : [];

  // Combine all risk items with assigned severity levels
  const allRisks = [
    ...threats.map((text, idx) => ({
      text,
      severity: idx === 0 ? 'HIGH' : 'MEDIUM',
      category: 'Market & External Threat',
    })),
    ...compRisks.map((text) => ({
      text,
      severity: 'MEDIUM',
      category: 'Competitive Landscape Risk',
    })),
    ...pricingRisks.map((text) => ({
      text,
      severity: 'LOW',
      category: 'Monetization Risk',
    })),
  ];

  const defaultRisks = [
    { text: 'Customer acquisition cost scalability in targeted geographic tier', severity: 'HIGH', category: 'Market Risk' },
    { text: 'Brand awareness and customer trust building in early stages', severity: 'MEDIUM', category: 'Customer Risk' },
    { text: 'Retention & unit economics optimization post-launch', severity: 'MEDIUM', category: 'Business Model Risk' },
    { text: 'Regional competitor replication velocity', severity: 'LOW', category: 'Competitive Risk' },
  ];

  const displayRisks = allRisks.length > 0 ? allRisks : defaultRisks;

  const severityBadgeVariant = {
    HIGH: 'error',
    MEDIUM: 'warning',
    LOW: 'outline',
  };

  return (
    <section id="risks" className="space-y-6">
      <ReportSectionHeader
        number="09"
        category="RISK MONITORING"
        title="Key Risks to Monitor"
        description="Identified execution risks, market uncertainties, and competitive threats requiring active founder mitigation."
      />

      <Card className="p-6 sm:p-8 space-y-3">
        <div className="space-y-2.5">
          {displayRisks.map((riskItem, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 transition hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <div className="flex items-start gap-3">
                <AlertOctagon className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    {riskItem.category}
                  </span>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
                    {typeof riskItem.text === 'string' ? riskItem.text : JSON.stringify(riskItem.text)}
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center flex-shrink-0">
                <Badge variant={severityBadgeVariant[riskItem.severity] || 'outline'} size="sm">
                  {riskItem.severity} RISK
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
