import React, { useState, useEffect, useRef } from 'react';

const ANCHORS = [
  { id: 'summary', label: '01 Executive Summary' },
  { id: 'idea-overview', label: '02 Idea Overview' },
  { id: 'evidence', label: '03 Evidence Ledger' },
  { id: 'market', label: '04 Market Opportunity' },
  { id: 'competition', label: '05 Competitor Analysis' },
  { id: 'customers', label: '06 Target Customers' },
  { id: 'pricing', label: '07 Business Model & Pricing' },
  { id: 'breakdown', label: '08 Evaluation Audit' },
  { id: 'swot', label: '09 SWOT Analysis' },
  { id: 'unknowns', label: '10 Risk Analysis' },
  { id: 'technical-feasibility', label: '11 Technical Feasibility' },
  { id: 'mvp', label: '12 MVP Recommendations' },
  { id: 'action-plan', label: '13 Recommended Next Steps' },
  { id: 'conclusion', label: '14 Overall Assessment' },
];

export default function AnchorNav() {
  const [activeAnchor, setActiveAnchor] = useState('summary');
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 140;
          for (let i = ANCHORS.length - 1; i >= 0; i--) {
            const section = document.getElementById(ANCHORS[i].id);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveAnchor(ANCHORS[i].id);
              break;
            }
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-[88px] z-40 bg-[#050506]/95 dark:bg-[#050506]/95 backdrop-blur-md border-y border-white/10 py-2.5 transition-colors shadow-md print:hidden">
      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar font-mono text-xs">
        <span className="text-zinc-500 font-semibold pr-2 flex-shrink-0 hidden lg:inline">
          Report Section:
        </span>
        {ANCHORS.map((anchor) => {
          const isActive = activeAnchor === anchor.id;
          return (
            <button
              key={anchor.id}
              key={anchor.id}
              type="button"
              onClick={() => scrollToSection(anchor.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {anchor.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
