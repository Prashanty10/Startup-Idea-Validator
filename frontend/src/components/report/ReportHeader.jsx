import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Globe, MapPin, Calendar, Cpu, Printer, Download } from 'lucide-react';

export default function ReportHeader({ country = 'Global', region = '' }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pt-2 pb-5 border-b border-white/10 text-left print:border-zinc-300 print:pb-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="violet" size="sm">
            <span>STARTUP VALIDATION REPORT</span>
          </Badge>
          <span className="text-zinc-600 text-xs print:hidden">•</span>
          <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-zinc-400 print:text-zinc-600">
            AI-POWERED BUSINESS ANALYSIS
          </span>
        </div>

        {/* Action Button: Print / PDF Download */}
        <div className="print:hidden">
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            className="flex items-center gap-2 font-mono text-xs shadow-lg"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download Full PDF Report</span>
          </Button>
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.08] print:text-zinc-950">
        Startup Validation & <span className="text-gradient-purple-blue print:text-purple-700">Market Intelligence</span>
      </h1>

      <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed font-normal print:text-zinc-700">
        A comprehensive narrative assessment of market potential, target customer demand, competitor landscape, unit economics, risk factors, and the recommended path to MVP.
      </p>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-zinc-400 pt-1 print:text-zinc-700">
        <div className="flex items-center gap-1.5 bg-[#0b0b0f] px-2.5 py-1 rounded-md border border-white/10 print:bg-zinc-100 print:border-zinc-300">
          <Globe className="w-3 h-3 text-purple-400 print:text-purple-700" />
          <span>{country}</span>
        </div>
        {region && region.trim() && country.toLowerCase() !== 'global' && (
          <div className="flex items-center gap-1.5 bg-[#0b0b0f] px-2.5 py-1 rounded-md border border-white/10 print:bg-zinc-100 print:border-zinc-300">
            <MapPin className="w-3 h-3 text-zinc-400" />
            <span>{region}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 bg-[#0b0b0f] px-2.5 py-1 rounded-md border border-white/10 print:bg-zinc-100 print:border-zinc-300">
          <Calendar className="w-3 h-3 text-zinc-400" />
          <span>{currentDate}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0b0b0f] px-2.5 py-1 rounded-md border border-white/10 print:bg-zinc-100 print:border-zinc-300">
          <Cpu className="w-3 h-3 text-purple-400 print:text-purple-700" />
          <span>Startup Validator AI Engine</span>
        </div>
      </div>
    </div>
  );
}
