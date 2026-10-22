import React, { useState } from 'react';
import { ArrowRight, Globe, MapPin, Lightbulb, Zap } from 'lucide-react';

const PRESET_IDEAS = [
  {
    title: 'Global AI Code Auditor (SaaS)',
    idea: 'An automated security and compliance audit tool for fast-growing SaaS startups that scans pull requests and generates SOC2 compliance evidence in real-time.',
    country: 'Global',
    region: '',
  },
  {
    title: 'Healthy Meal Delivery (Pune)',
    idea: 'A subscription-based healthy meal delivery service for working professionals in Pune that provides affordable calorie-controlled home-style meals.',
    country: 'India',
    region: 'Maharashtra',
  },
  {
    title: 'Solar Installer CRM',
    idea: 'A vertical B2B SaaS platform specifically built for residential solar installations in Tier-2 Indian cities to manage site surveys, inventory, and government subsidy filings.',
    country: 'India',
    region: 'Gujarat',
  },
];

export default function StartupInput({ onSubmit, isLoading }) {
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
    setTargetRegion(preset.region);
  };

  return (
    <div id="input-card" className="w-full max-w-[1000px] mx-auto px-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 space-y-5 border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-300 focus-within:border-purple-500/50"
      >
        {/* Card Heading */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-zinc-400">
            STARTUP IDEA
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            {startupIdea.length} / 1500 chars
          </span>
        </div>

        {/* Textarea Input */}
        <textarea
          rows={3}
          value={startupIdea}
          onChange={(e) => setStartupIdea(e.target.value)}
          placeholder="Describe your startup concept, value proposition, target customer, and revenue model..."
          required
          maxLength={1500}
          className="w-full bg-[#0b0b0f] border border-white/10 focus:border-purple-500 rounded-xl p-4 text-white placeholder-zinc-500 text-sm sm:text-base leading-relaxed outline-none transition duration-200 resize-y min-h-[110px] focus:ring-2 focus:ring-purple-500/20"
        />

        {/* Location Controls & Analyze Button Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          {/* Country Select Input (Compulsory, includes Global) */}
          <div className="md:col-span-4 flex items-center space-x-2.5 bg-[#0b0b0f] border border-white/10 rounded-xl px-3.5 h-[46px] focus-within:border-purple-500/60">
            <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="flex flex-col w-full">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                Country <span className="text-red-400 text-[10px]">*</span>
              </span>
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
                className="bg-transparent text-white font-semibold text-xs sm:text-sm outline-none cursor-pointer w-full"
              >
                <option value="Global" className="bg-zinc-950 font-bold">🌐 Global</option>
                <option value="India" className="bg-zinc-950">India</option>
                <option value="United States" className="bg-zinc-950">United States</option>
                <option value="United Kingdom" className="bg-zinc-950">United Kingdom</option>
                <option value="Singapore" className="bg-zinc-950">Singapore</option>
                <option value="United Arab Emirates" className="bg-zinc-950">United Arab Emirates</option>
                <option value="Germany" className="bg-zinc-950">Germany</option>
                <option value="Canada" className="bg-zinc-950">Canada</option>
                <option value="Australia" className="bg-zinc-950">Australia</option>
                <option value="European Union" className="bg-zinc-950">European Union</option>
              </select>
            </div>
          </div>

          {/* Region / City Input (Optional, disabled if Global) */}
          <div className={`md:col-span-4 flex items-center space-x-2.5 bg-[#0b0b0f] border rounded-xl px-3.5 h-[46px] transition-all duration-200 ${
            targetCountry === 'Global' 
              ? 'border-white/5 opacity-50 cursor-not-allowed' 
              : 'border-white/10 focus-within:border-purple-500/60'
          }`}>
            <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Region / City</span>
                <span className="text-[8px] font-mono text-zinc-500 lowercase">(optional)</span>
              </div>
              <input
                type="text"
                value={targetCountry === 'Global' ? '' : targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                disabled={targetCountry === 'Global'}
                placeholder={targetCountry === 'Global' ? 'N/A for Global' : 'State or City (optional)'}
                className="bg-transparent text-white font-semibold text-xs sm:text-sm outline-none w-full disabled:cursor-not-allowed disabled:text-zinc-600 placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Primary Gradient Analyze Button */}
          <div className="md:col-span-4">
            <button
              type="submit"
              disabled={isLoading || !startupIdea.trim() || !targetCountry.trim()}
              className="w-full h-[46px] rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 hover:from-purple-500 hover:via-violet-500 hover:to-blue-500 text-white font-bold text-sm tracking-tight transition-all duration-200 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
            >
              <Zap className="w-4 h-4" />
              <span>Analyze Startup Idea</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
            </button>
          </div>
        </div>
      </form>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs">
        <span className="text-zinc-500 font-mono flex items-center gap-1 text-[11px]">
          <Lightbulb className="w-3 h-3 text-amber-400" /> Popular Presets:
        </span>
        {PRESET_IDEAS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => applyPreset(preset)}
            className="bg-[rgba(18,18,23,0.8)] hover:bg-zinc-800 text-zinc-300 hover:text-white px-3 py-1 rounded-lg border border-white/10 transition cursor-pointer text-xs font-medium"
          >
            {preset.title}
          </button>
        ))}
      </div>
    </div>
  );
}
