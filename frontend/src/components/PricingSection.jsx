import React from 'react';
import { Check, AlertOctagon, Sparkles, Layers, ArrowRight, CreditCard, PieChart, Wallet } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import ReportSectionHeader from './ui/ReportSectionHeader';
import NarrativeBlock from './ui/NarrativeBlock';

export default function PricingSection({ data }) {
  const pa = data?.pricing_analysis || {};
  const bizNarrative = data?.narrative_report?.business_model_and_pricing;

  const pricingModel = pa.pricing_model || 'Subscription / Tiered SaaS';
  const recommendedPrice = pa.recommended_price || '₹499 - ₹1,999 / month';
  const pricingTiers = Array.isArray(pa.pricing_tiers) ? pa.pricing_tiers : [];
  const pricingRationale = pa.pricing_rationale || 'Monetization reflects regional purchasing power and value proposition.';
  
  const pricingRisks = Array.isArray(pa.pricing_risks) 
    ? pa.pricing_risks 
    : typeof pa.pricing_risks === 'string' ? [pa.pricing_risks] : [];

  return (
    <section id="pricing" className="space-y-6">
      <ReportSectionHeader
        number="07"
        category="MONETIZATION STRATEGY"
        title="Business Model and Pricing Strategy"
        description="Recommended pricing model, tier structures, value flow, unit economics, and risk factors."
      />

      {/* Main Narrative Prose */}
      {bizNarrative && (
        <NarrativeBlock
          title="Business Model, Pricing Architecture & Unit Economics"
          subtitle="Comprehensive narrative explaining revenue mechanics, CAC, LTV, contribution margins, and price sensitivity testing."
          content={bizNarrative}
          icon={CreditCard}
          badgeText="BUSINESS MODEL NARRATIVE"
        />
      )}

      {/* Hero Overview Box */}
      <Card className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-l-4 border-l-purple-500 bg-[#0b0b0f]">
        <div className="space-y-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-mono">
            Recommended Pricing Model
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {pricingModel}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono">
            Optimized for target market purchasing power & willingness to pay
          </p>
        </div>

        <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl text-center space-y-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-mono">
            Recommended Starting Price
          </span>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-400 font-sans tracking-tight">
            {recommendedPrice}
          </div>
        </div>
      </Card>

      {/* Value Flow Diagram Visualization */}
      <Card className="p-6 space-y-4 bg-[#0b0b0f]">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-mono">
          Monetization Value Flow
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2">
            <CreditCard className="w-6 h-6 text-purple-400 mx-auto" />
            <div className="font-bold text-base text-white">Customer Payment</div>
            <div className="text-xs text-zinc-400 font-mono">Subscription or Pay-per-use</div>
          </div>

          <div className="hidden md:flex items-center justify-center text-zinc-500">
            <ArrowRight className="w-6 h-6" />
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2">
            <PieChart className="w-6 h-6 text-blue-400 mx-auto" />
            <div className="font-bold text-base text-white">Platform Revenue</div>
            <div className="text-xs text-zinc-400 font-mono">SaaS Margin / Commission</div>
          </div>

          <div className="hidden md:flex items-center justify-center text-zinc-500">
            <ArrowRight className="w-6 h-6" />
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2">
            <Wallet className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="font-bold text-base text-white">Provider Earnings</div>
            <div className="text-xs text-zinc-400 font-mono">Net Value Delivered</div>
          </div>
        </div>
      </Card>

      {/* Pricing Tiers Grid */}
      {pricingTiers.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <Layers className="w-5 h-5 text-purple-400" /> Recommended Pricing Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, idx) => {
              const name = tier.name || `Tier ${idx + 1}`;
              const price = tier.price || 'Contact Sales';
              const targetAudience = tier.target_audience || tier.target_customer || 'General Users';
              const features = Array.isArray(tier.included_features) ? tier.included_features : Array.isArray(tier.features) ? tier.features : [];
              const isPopular = idx === 1;

              return (
                <Card
                  key={idx}
                  className={`flex flex-col justify-between relative p-6 sm:p-7 bg-[#0b0b0f] ${
                    isPopular
                      ? 'border-2 border-purple-500 shadow-lg scale-[1.02]'
                      : ''
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge variant="violet" size="sm">
                        Recommended Tier
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-xl sm:text-2xl tracking-tight">{name}</h4>
                      <p className="text-xs sm:text-sm text-zinc-400 font-mono">{targetAudience}</p>
                    </div>

                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans border-b border-white/10 pb-4">
                      {price}
                    </div>

                    <div className="space-y-3 text-sm sm:text-base text-zinc-200">
                      {features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4.5 h-4.5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-center">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                      Tier {idx + 1} Plan
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Rationale & Risks Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <Sparkles className="w-5 h-5 text-purple-400" /> Pricing Rationale
          </h3>
          <p className="text-base sm:text-lg text-zinc-100 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-white/10 font-normal">
            {typeof pricingRationale === 'string' ? pricingRationale : Array.isArray(pricingRationale) ? pricingRationale.join(' ') : JSON.stringify(pricingRationale)}
          </p>
        </Card>

        <Card className="space-y-4 p-6 sm:p-8 bg-[#0b0b0f]">
          <h3 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2.5 tracking-tight">
            <AlertOctagon className="w-5 h-5 text-amber-400" /> Pricing Risks & Considerations
          </h3>
          {pricingRisks.length > 0 ? (
            <ul className="space-y-3 text-sm sm:text-base text-zinc-200">
              {pricingRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-3 bg-zinc-950 p-4 rounded-xl border border-white/10 leading-relaxed">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl border border-white/10 font-mono">
              No explicit pricing risks flagged.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
