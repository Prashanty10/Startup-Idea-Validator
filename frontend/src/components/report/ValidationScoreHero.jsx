import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Award, ShieldAlert, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ValidationScoreHero({ data }) {
  const score = typeof data?.overall_score === 'number' ? data.overall_score : 50;
  const verdict = data?.verdict || 'Moderate Potential';
  const confidence = data?.evidence_confidence || 'MEDIUM';

  // Semicircle / Circle gauge calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Dynamic Score Semantic Colors
  const getScoreTheme = (scoreValue) => {
    if (scoreValue >= 80) {
      return {
        colorClass: 'text-emerald-400',
        strokeClass: 'stroke-emerald-400',
        badgeVariant: 'success',
        icon: ShieldCheck,
      };
    } else if (scoreValue >= 60) {
      return {
        colorClass: 'text-purple-400',
        strokeClass: 'stroke-purple-400',
        badgeVariant: 'violet',
        icon: Award,
      };
    } else if (scoreValue >= 40) {
      return {
        colorClass: 'text-amber-400',
        strokeClass: 'stroke-amber-400',
        badgeVariant: 'warning',
        icon: Award,
      };
    } else {
      return {
        colorClass: 'text-red-400',
        strokeClass: 'stroke-red-400',
        badgeVariant: 'error',
        icon: ShieldAlert,
      };
    }
  };

  const getConfidenceBadgeVariant = (conf) => {
    switch (conf?.toUpperCase()) {
      case 'HIGH':
        return 'success';
      case 'LOW':
        return 'error';
      default:
        return 'violet';
    }
  };

  const theme = getScoreTheme(score);
  const VerdictIcon = theme.icon;

  const ev = data?.evaluation || {};
  const dimensions = [
    { label: 'Market Opportunity', key: 'market_demand' },
    { label: 'Customer Demand', key: 'customer_need' },
    { label: 'Competition Risk & Gaps', key: 'competition' },
    { label: 'Business Potential', key: 'business_potential' },
    { label: 'Pricing Potential', key: 'pricing_potential' },
    { label: 'Execution Feasibility', key: 'feasibility' },
  ];

  return (
    <Card className="p-5 sm:p-6 lg:p-7 shadow-sm border-l-4 border-l-purple-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left 5 Cols: Score & Confidence Display */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-5 lg:pb-0 lg:pr-6">
          <div className="relative flex items-center justify-center flex-shrink-0">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-zinc-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                className={`${theme.strokeClass} transition-all duration-1000 ease-out`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-2xl sm:text-3xl font-extrabold ${theme.colorClass} font-sans tracking-tight`}>
                {score}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono font-semibold">/ 100</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block font-mono">
              VALIDATION SCORE & CONFIDENCE
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
              <span>{score} / 100</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <Badge variant={theme.badgeVariant} size="sm" icon={VerdictIcon}>
                {verdict}
              </Badge>
              <Badge variant={getConfidenceBadgeVariant(confidence)} size="sm">
                Confidence: {confidence}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Dimension Scores Breakdown */}
        <div className="lg:col-span-7 space-y-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block font-mono">
            Supporting Validation Dimensions & Confidence
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {dimensions.map((dim, idx) => {
              const itemObj = ev[dim.key] || {};
              const itemScore = typeof itemObj.score === 'number' ? itemObj.score : 7;
              const itemConf = itemObj.confidence || 'MEDIUM';
              return (
                <div
                  key={idx}
                  className="bg-[#0b0b0f] p-2.5 rounded-xl border border-white/10 space-y-1"
                >
                  <span className="text-[11px] text-zinc-400 block font-medium truncate">
                    {dim.label}
                  </span>
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-sm font-extrabold text-white">
                      {itemScore} <span className="text-[10px] text-zinc-500 font-normal">/ 10</span>
                    </span>
                    <span className={`text-[9px] font-semibold uppercase ${
                      itemConf === 'HIGH' ? 'text-emerald-400' : itemConf === 'LOW' ? 'text-amber-400' : 'text-purple-400'
                    }`}>
                      {itemConf} Conf
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
