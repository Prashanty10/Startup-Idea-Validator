import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import Card from './Card';

/**
 * NarrativeBlock renders multi-paragraph, professional business analysis text.
 * Each paragraph explains the context, rationale, evidence, and founder implications.
 */
export default function NarrativeBlock({
  title = 'Strategic Business Analysis & Context',
  subtitle = 'In-depth narrative evaluation synthesized across multi-agent research findings.',
  content = '',
  icon: Icon = BookOpen,
  badgeText = 'NARRATIVE ANALYSIS',
  className = '',
}) {
  if (!content || typeof content !== 'string' || !content.trim()) {
    return null;
  }

  // Split content by double newlines or single newlines into distinct paragraphs
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <Card className={`p-6 sm:p-8 space-y-5 border-l-4 border-l-purple-500 bg-[#0b0b0f] shadow-lg print:shadow-none print:border-l-4 print:border-purple-600 print:bg-white print:p-4 ${className}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 print:border-zinc-300 print:pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800 flex items-center justify-center text-purple-400 print:bg-purple-100 print:text-purple-700 print:border-purple-300">
            <Icon className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg tracking-tight print:text-zinc-900">
              {title}
            </h4>
            {subtitle && (
              <p className="text-xs text-zinc-400 font-mono hidden sm:block print:text-zinc-600">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {badgeText && (
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-purple-400 bg-purple-950/60 border border-purple-800/80 px-2.5 py-1 rounded-md print:bg-purple-50 print:text-purple-800 print:border-purple-200">
            {badgeText}
          </span>
        )}
      </div>

      {/* Narrative Paragraphs */}
      <div className="space-y-4 text-zinc-200 text-base sm:text-[16.5px] leading-relaxed font-normal print:text-zinc-900 print:text-sm print:leading-normal">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="tracking-normal text-justify sm:text-left">
            {para}
          </p>
        ))}
      </div>
    </Card>
  );
}
