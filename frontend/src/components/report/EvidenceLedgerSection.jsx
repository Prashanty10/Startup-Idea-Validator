import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ReportSectionHeader from '../ui/ReportSectionHeader';
import { ShieldCheck, HelpCircle, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function EvidenceLedgerSection({ data }) {
  const ledger = data?.evidence_ledger || {};
  const supported = Array.isArray(ledger.supported_claims) ? ledger.supported_claims : [];
  const inferred = Array.isArray(ledger.inferred_claims) ? ledger.inferred_claims : [];
  const assumptions = Array.isArray(ledger.assumptions) ? ledger.assumptions : [];
  const unknowns = Array.isArray(ledger.unknowns) ? ledger.unknowns : [];
  const overallConfidence = data?.evidence_confidence || ledger.overall_confidence || 'MEDIUM';

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'SUPPORTED':
        return <Badge variant="success" size="sm">SUPPORTED</Badge>;
      case 'INFERRED':
        return <Badge variant="violet" size="sm">INFERRED</Badge>;
      case 'ASSUMPTION':
        return <Badge variant="warning" size="sm">ASSUMPTION</Badge>;
      case 'UNKNOWN':
        return <Badge variant="error" size="sm">UNKNOWN</Badge>;
      default:
        return <Badge variant="outline" size="sm">{status || 'ASSUMPTION'}</Badge>;
    }
  };

  return (
    <section id="evidence" className="space-y-6">
      <ReportSectionHeader
        number="02"
        category="EVIDENCE SYNTHESIS"
        title="Evidence vs Assumptions Ledger"
        description="Transparent claim breakdown distinguishing verified facts from logical inferences, founder assumptions, and research unknowns."
      />

      {/* Top Banner: Overall Evidence Confidence */}
      <Card className="p-6 border-l-4 border-l-purple-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-[#0b0b0f]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4.5 h-4.5" />
            <span>Evidence Audit Score</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Overall Evidence Confidence: <span className="text-purple-400">{overallConfidence}</span>
          </h3>
          <p className="text-sm text-zinc-300 font-mono leading-relaxed">
            Evaluated across empirical RAG research, live web search, and structured founder claims.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-zinc-950 p-4 rounded-xl border border-white/10 text-sm font-mono">
          <div className="text-center px-3">
            <div className="text-emerald-400 font-extrabold text-xl">{supported.length}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Supported</div>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="text-center px-3">
            <div className="text-amber-400 font-extrabold text-xl">{assumptions.length}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Assumptions</div>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="text-center px-3">
            <div className="text-red-400 font-extrabold text-xl">{unknowns.length}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Unknowns</div>
          </div>
        </div>
      </Card>

      {/* 2x2 Ledger Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supported Claims */}
        <Card className="p-6 space-y-4 bg-[#0b0b0f]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-emerald-400 text-lg flex items-center gap-2 tracking-tight">
              <CheckCircle2 className="w-5 h-5" /> Supported Claims ({supported.length})
            </h4>
            <Badge variant="success" size="sm">HIGH EVIDENCE</Badge>
          </div>
          {supported.length > 0 ? (
            <div className="space-y-3.5">
              {supported.map((item, idx) => (
                <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-emerald-500/30 space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white leading-relaxed text-base">{item.claim}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  {item.evidence && (
                    <p className="text-zinc-300 font-mono italic text-xs sm:text-sm bg-zinc-900/80 p-2.5 rounded border border-white/10 leading-relaxed">
                      "{item.evidence}"
                    </p>
                  )}
                  {item.source && (
                    <div className="text-xs text-zinc-400 font-mono truncate pt-0.5">
                      Source: {item.source}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl font-mono">
              No direct supported claims found in initial query data.
            </p>
          )}
        </Card>

        {/* Assumptions */}
        <Card className="p-6 space-y-4 bg-[#0b0b0f]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-amber-400 text-lg flex items-center gap-2 tracking-tight">
              <AlertTriangle className="w-5 h-5" /> Founder Assumptions ({assumptions.length})
            </h4>
            <Badge variant="warning" size="sm">REQUIRES TEST</Badge>
          </div>
          {assumptions.length > 0 ? (
            <div className="space-y-3.5">
              {assumptions.map((item, idx) => (
                <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-amber-500/30 space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-zinc-100 leading-relaxed text-base">{item.claim}</span>
                    {getStatusBadge(item.status || 'ASSUMPTION')}
                  </div>
                  {item.validation_action && (
                    <div className="text-xs sm:text-sm text-amber-300 font-mono bg-amber-950/40 p-3 rounded-lg border border-amber-800/50 leading-relaxed">
                      💡 <strong>Validation Action:</strong> {item.validation_action}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl font-mono">
              No explicit founder assumptions flagged.
            </p>
          )}
        </Card>

        {/* Inferred Claims */}
        <Card className="p-6 space-y-4 bg-[#0b0b0f]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-purple-400 text-lg flex items-center gap-2 tracking-tight">
              <FileText className="w-5 h-5" /> Market Inferences ({inferred.length})
            </h4>
            <Badge variant="violet" size="sm">INFERRED</Badge>
          </div>
          {inferred.length > 0 ? (
            <div className="space-y-3.5">
              {inferred.map((item, idx) => (
                <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-purple-500/30 space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-zinc-100 leading-relaxed text-base">{item.claim}</span>
                    {getStatusBadge(item.status || 'INFERRED')}
                  </div>
                  {item.validation_action && (
                    <div className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                      Action: {item.validation_action}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl font-mono">
              No secondary market inferences listed.
            </p>
          )}
        </Card>

        {/* Unknowns */}
        <Card className="p-6 space-y-4 bg-[#0b0b0f]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-bold text-red-400 text-lg flex items-center gap-2 tracking-tight">
              <HelpCircle className="w-5 h-5" /> Research Gaps & Unknowns ({unknowns.length})
            </h4>
            <Badge variant="error" size="sm">UNKNOWN</Badge>
          </div>
          {unknowns.length > 0 ? (
            <div className="space-y-3.5">
              {unknowns.map((item, idx) => (
                <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-red-500/30 space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-zinc-100 leading-relaxed text-base">{item.claim}</span>
                    {getStatusBadge(item.status || 'UNKNOWN')}
                  </div>
                  {item.validation_action && (
                    <div className="text-xs sm:text-sm text-red-300 font-mono bg-red-950/40 p-3 rounded-lg border border-red-800/50 leading-relaxed">
                      🔬 <strong>How to Resolve:</strong> {item.validation_action}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400 italic p-4 text-center bg-zinc-950 rounded-xl font-mono">
              No explicit critical research gaps identified.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
