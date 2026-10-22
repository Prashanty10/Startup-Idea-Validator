import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Globe,
  Lightbulb,
  Zap,
  FileText,
  Wrench,
  ShieldCheck,
  Search,
} from 'lucide-react';
import StartupLensLogo from './Logo';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Textarea from './ui/Textarea';
import Card from './ui/Card';

const PRESET_IDEAS = [
  {
    title: 'Healthy Meal Delivery (Pune)',
    idea: 'A subscription-based healthy meal delivery service for working professionals in Pune that provides affordable calorie-controlled home-style meals.',
    country: 'India',
    region: 'Maharashtra',
  },
  {
    title: 'AI Code Auditor for SaaS',
    idea: 'An automated security and compliance audit tool for fast-growing SaaS startups that scans pull requests and generates SOC2 compliance evidence in real-time.',
    country: 'India',
    region: 'Karnataka',
  },
  {
    title: 'Solar Installer CRM',
    idea: 'A vertical B2B SaaS platform specifically built for residential solar installations in Tier-2 Indian cities to manage site surveys, inventory, and government subsidy filings.',
    country: 'India',
    region: 'Gujarat',
  },
];

export default function StartupForm({ onSubmit, isLoading }) {
  const [startupIdea, setStartupIdea] = useState(
    'A subscription-based healthy meal delivery service for working professionals in Pune that provides affordable calorie-controlled home-style meals.'
  );
  const [targetCountry, setTargetCountry] = useState('India');
  const [targetRegion, setTargetRegion] = useState('Maharashtra');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startupIdea.trim()) return;
    if (!targetCountry.trim()) return;
    const isGlobal = targetCountry.trim().toLowerCase() === 'global';
    onSubmit({
      startup_idea: startupIdea.trim(),
      target_country: targetCountry.trim(),
      target_region: isGlobal ? '' : targetRegion.trim(),
    });
  };

  const applyPreset = (preset) => {
    setStartupIdea(preset.idea);
    setTargetCountry(preset.country);
    setTargetRegion(preset.country.toLowerCase() === 'global' ? '' : (preset.region || ''));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 space-y-16">
      {/* HERO SECTION */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        {/* Hero Small Badge */}
        <div className="inline-flex items-center">
          <Badge variant="violet" size="md">
            <StartupLensLogo className="w-3.5 h-3.5" />
            <span>Autonomous AI Validation Engine</span>
          </Badge>
        </div>

        {/* Large Headline with restrained violet accent */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.1]">
          Validate your startup idea with <span className="text-violet-600 dark:text-violet-400">AI intelligence.</span>
        </h1>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
          Instant market demand analysis, competitor benchmarking, customer personas, and pricing strategy powered by multi-agent reasoning.
        </p>

        {/* SEARCH & VALIDATOR INPUT CONTAINER */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 text-left transition-all duration-200 focus-within:border-violet-500/50"
        >
          {/* Main Idea Textarea */}
          <Textarea
            label="Describe your startup concept"
            rows={4}
            value={startupIdea}
            onChange={(e) => setStartupIdea(e.target.value)}
            placeholder="Describe your product concept, target customer, value proposition, and revenue model..."
            required
            maxLength={1500}
          />

          {/* Controls & Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
            {/* Location Selector Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Country Select (Compulsory) */}
              <div className="flex items-center space-x-1.5 bg-zinc-50 dark:bg-zinc-800/70 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700/80 text-xs text-zinc-700 dark:text-zinc-300">
                <Globe className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                <select
                  value={targetCountry}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setTargetCountry(selected);
                    if (selected === 'Global') {
                      setTargetRegion('');
                    }
                  }}
                  required
                  className="bg-transparent text-zinc-900 dark:text-zinc-100 font-medium outline-none cursor-pointer"
                >
                  <option value="Global">🌐 Global</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="European Union">European Union</option>
                </select>
              </div>

              {/* Region Input (Optional, disabled if Global) */}
              <div className={`flex items-center space-x-1.5 bg-zinc-50 dark:bg-zinc-800/70 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700/80 text-xs text-zinc-700 dark:text-zinc-300 flex-1 sm:flex-none ${
                targetCountry === 'Global' ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={targetCountry === 'Global' ? '' : targetRegion}
                  onChange={(e) => setTargetRegion(e.target.value)}
                  disabled={targetCountry === 'Global'}
                  placeholder={targetCountry === 'Global' ? 'N/A for Global' : 'City / State (optional)'}
                  className="bg-transparent text-zinc-900 dark:text-zinc-100 font-medium outline-none w-28 sm:w-36 disabled:cursor-not-allowed placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Primary Accent Submit Button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading || !startupIdea.trim()}
              className="w-full sm:w-auto shadow-md"
            >
              <Zap className="w-4 h-4" />
              <span>Validate Startup Idea</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Popular Preset Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Try an example:
          </span>
          {PRESET_IDEAS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 transition cursor-pointer font-medium"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURE CARDS SECTION */}
      <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="space-y-1.5 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            How StartupLens AI Works
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Comprehensive market research, competitor gap analysis, and build recommendations structured in seconds.
          </p>
        </div>

        {/* 3 Minimal Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card hoverable className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Market & SWOT Matrix
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Identify market demand trends, key growth drivers, core strengths, weaknesses, and potential risk factors.
              </p>
            </div>
            <div className="text-xs font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1">
              <span>Explore Market Signals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          <Card hoverable className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Competitors & Pricing
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Benchmark key competitors, uncover unserved market gaps, and structure optimized pricing tiers.
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>Analyze Gaps & Tiers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          <Card hoverable className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                MVP & Roadmap
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Actionable product v1.0 scope, out-of-scope exclusions, development priorities, and 7-point evaluation breakdown.
              </p>
            </div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>View Product Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </div>

        {/* Feature Pill Footer Row */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 pt-2 font-mono">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Fast Multi-Agent Reasoning</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Localized Regional Context</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Citation Evidence Included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
