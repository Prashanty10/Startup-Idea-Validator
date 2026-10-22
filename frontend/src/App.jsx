import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundNetwork from './components/BackgroundNetwork';
import Hero from './components/Hero';
import StartupInput from './components/StartupInput';
import Metrics from './components/Metrics';
import AnalysisPipeline from './components/AnalysisPipeline';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import ReportHeader from './components/report/ReportHeader';
import ValidationScoreHero from './components/report/ValidationScoreHero';
import ExecutiveSummary from './components/report/ExecutiveSummary';
import StartupIdeaOverviewSection from './components/report/StartupIdeaOverviewSection';
import TechnicalFeasibilitySection from './components/report/TechnicalFeasibilitySection';
import EvidenceLedgerSection from './components/report/EvidenceLedgerSection';
import MarketSection from './components/MarketSection';
import CompetitorSection from './components/CompetitorSection';
import PersonaSection from './components/PersonaSection';
import PricingSection from './components/PricingSection';
import UnitEconomicsSection from './components/report/UnitEconomicsSection';
import EvaluationSection from './components/EvaluationSection';
import SwotSection from './components/SwotSection';
import CriticalUnknownsSection from './components/report/CriticalUnknownsSection';
import MVPSection from './components/MVPSection';
import ValidationExperimentsSection from './components/report/ValidationExperimentsSection';
import FounderActionPlanSection from './components/report/FounderActionPlanSection';
import FinalConclusion from './components/report/FinalConclusion';
import SourcesSection from './components/SourcesSection';
import AnchorNav from './components/ui/AnchorNav';
import Button from './components/ui/Button';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { validateStartupIdea } from './services/api';
import { ArrowUp, Terminal, ShieldCheck, Printer } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'results' | 'error'
  const [resultData, setResultData] = useState(null);
  const [errorObj, setErrorObj] = useState(null);

  // Theme Management
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('startuplens_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('startuplens_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleValidate = async (formData) => {
    setStatus('loading');
    setErrorObj(null);
    try {
      const data = await validateStartupIdea(formData);
      setResultData(data);
      setStatus('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Validation error:', err);
      setErrorObj(err);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResultData(null);
    setErrorObj(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#F5F5F7] flex flex-col relative selection:bg-purple-500/30 selection:text-purple-300 bg-cinematic-glow transition-colors duration-200">
      {/* AI Network Overlay Background */}
      <BackgroundNetwork />

      {/* Floating Glass Navbar */}
      <Navbar 
        onReset={handleReset} 
        hasResults={status === 'results'} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Sticky Anchor Jump Bar for Report Results */}
      {status === 'results' && (
        <div className="pt-20">
          <AnchorNav />
        </div>
      )}

      {/* Main Full-Screen Content Viewport */}
      <main className={`flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 ${status === 'results' ? 'py-8' : 'pt-24 pb-16'} relative z-10`}>
        {status === 'idle' && (
          <div className="space-y-12">
            <Hero />
            <StartupInput onSubmit={handleValidate} isLoading={false} />
            <Metrics />
            <AnalysisPipeline />
          </div>
        )}

        {status === 'loading' && <LoadingState />}

        {status === 'error' && (
          <ErrorState error={errorObj} onRetry={handleReset} />
        )}

        {status === 'results' && resultData && (
          <ErrorBoundary fallbackTitle="Validation Report Error" fallbackMessage="There was a rendering error loading the validation results. Please try validating again.">
            <div className="space-y-16 animate-fadeIn pb-12">
            {/* Top Report Title & Metadata */}
            <ReportHeader
              country={resultData.target_country}
              region={resultData.target_region}
            />

            {/* Validation Score Hero Banner */}
            <ValidationScoreHero data={resultData} />

            {/* Section 01: Executive Summary & Metrics Grid */}
            <ExecutiveSummary data={resultData} />

            {/* Section 02: Startup Idea Overview & Value Delivery */}
            <StartupIdeaOverviewSection data={resultData} />

            {/* Section 03: Evidence vs Assumptions Ledger */}
            <EvidenceLedgerSection data={resultData} />

            {/* Section 04: Market Opportunity */}
            <MarketSection data={resultData} />

            {/* Section 05: Competitive Landscape */}
            <CompetitorSection data={resultData} />

            {/* Section 06: Target Customer Personas */}
            <PersonaSection data={resultData} />

            {/* Section 07: Business Model, Pricing & Unit Economics */}
            <div className="space-y-12">
              <PricingSection data={resultData} />
              <UnitEconomicsSection data={resultData} />
            </div>

            {/* Section 08: Validation Breakdown */}
            <EvaluationSection data={resultData} />

            {/* Section 09: Strategic SWOT Analysis */}
            <SwotSection data={resultData} />

            {/* Section 10: Risk Analysis & Critical Unknowns */}
            <CriticalUnknownsSection data={resultData} />

            {/* Section 11: Technical and Operational Feasibility */}
            <TechnicalFeasibilitySection data={resultData} />

            {/* Section 12: Recommended MVP & Validation Experiments */}
            <div className="space-y-12">
              <MVPSection data={resultData} />
              <ValidationExperimentsSection data={resultData} />
            </div>

            {/* Section 13: Recommended Next Steps (7/30/90-Day Plan) */}
            <FounderActionPlanSection data={resultData} />

            {/* Section 14: Overall Assessment & Strategic Conclusion */}
            <FinalConclusion data={resultData} />

            {/* Research Citations & Sources */}
            <SourcesSection data={resultData} />

            {/* Bottom Actions Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 print:hidden">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Full Evidence-Based Startup Validation Report Complete • Startup Validator AI Intelligence Engine</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-purple-400" /> Print / Save as PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollToTop}
                >
                  <ArrowUp className="w-3.5 h-3.5" /> Back to top
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReset}
                >
                  <Terminal className="w-3.5 h-3.5" /> Validate Another Idea
                </Button>
              </div>
            </div>
            </div>
          </ErrorBoundary>
        )}
      </main>

      {/* SaaS Footer */}
      <footer className="border-t border-white/10 bg-[#050506]/90 text-xs text-zinc-400 py-8 relative z-10 print:hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-purple-400">✦</span>
            <span className="font-bold text-white">Startup Validator AI</span>
            <span>• Evidence-Aware Autonomous Intelligence Platform</span>
          </div>
          <div className="font-mono text-[11px] text-zinc-500">
            © {new Date().getFullYear()} Startup Validator AI • Built for ambitious founders
          </div>
        </div>
      </footer>
    </div>
  );
}
