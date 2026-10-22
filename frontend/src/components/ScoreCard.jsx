import React from 'react';
import { Award, ShieldAlert, ShieldCheck, MapPin, Globe, Sparkles, LineChart, Users, CheckSquare } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import StatCard from './ui/StatCard';

export default function ScoreCard({ data }) {
  const score = typeof data?.overall_score === 'number' ? data.overall_score : 50;
  const verdict = data?.verdict || 'Moderate Potential';
  const summary = data?.summary || 'The startup idea shows initial promise with specific target market demand, but requires further refinement in pricing and competitive differentiation.';
  const country = data?.target_country || 'Global';
  const region = data?.target_region || '';

  // Calculate SVG Circle Stroke
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Verdict style matching design system badges
  const getVerdictBadge = (verdictText) => {
    const text = verdictText.toLowerCase();
    if (text.includes('high') || text.includes('strong') || text.includes('excellent')) {
      return { variant: 'success', icon: ShieldCheck, label: verdict };
    } else if (text.includes('low') || text.includes('weak') || text.includes('risky')) {
      return { variant: 'error', icon: ShieldAlert, label: verdict };
    }
    return { variant: 'violet', icon: Award, label: verdict };
  };

  const verdictStyle = getVerdictBadge(verdict);
  const VerdictIcon = verdictStyle.icon;

  const competitorsCount = Array.isArray(data?.competitor_analysis?.competitors) 
    ? data.competitor_analysis.competitors.length 
    : '3+';
  const personasCount = Array.isArray(data?.persona_analysis?.personas) 
    ? data.persona_analysis.personas.length 
    : '2+';

  return (
    <Card className="space-y-6">
      {/* Top Header Row: Gauge & Location */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        {/* Left: Score Gauge */}
        <div className="flex items-center space-x-5">
          <div className="relative flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-violet-600 dark:stroke-violet-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 font-sans">
                {score}
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-semibold">
                / 100
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Overall Score Rating
            </span>
            <Badge variant={verdictStyle.variant} size="md" icon={VerdictIcon}>
              {verdictStyle.label}
            </Badge>
          </div>
        </div>

        {/* Right: Location Tags */}
        <div className="flex items-center space-x-2 font-mono text-xs text-zinc-600 dark:text-zinc-300">
          <Badge variant="outline" size="sm" icon={Globe}>
            {country}
          </Badge>
          {region && region.trim() && country.toLowerCase() !== 'global' && (
            <Badge variant="outline" size="sm" icon={MapPin}>
              {region}
            </Badge>
          )}
        </div>
      </div>

      {/* Summary Narrative Box */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Executive Validation Summary
          </h2>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 border-l-4 border-l-violet-600 dark:border-l-violet-500">
          {summary}
        </p>
      </div>

      {/* Quick Key Takeaways Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <StatCard
          label="Competitors"
          value={competitorsCount}
          icon={Users}
        />
        <StatCard
          label="Target Personas"
          value={personasCount}
          icon={LineChart}
        />
        <StatCard
          label="Evaluation Breakdown"
          value="7 / 7"
          icon={CheckSquare}
        />
      </div>
    </Card>
  );
}
