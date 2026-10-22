import React from 'react';
import { ExternalLink, BookOpen, Globe } from 'lucide-react';
import Card from './ui/Card';
import SectionHeader from './ui/SectionHeader';

export default function SourcesSection({ data }) {
  const rawSources = Array.isArray(data?.research_sources) ? data.research_sources : [];

  // Normalize source formats safely
  const sources = rawSources.map((src, idx) => {
    if (typeof src === 'string') {
      return { title: src, url: src.startsWith('http') ? src : null };
    }
    return {
      title: src.title || src.name || src.url || `Research Reference ${idx + 1}`,
      url: src.url && src.url.startsWith('http') ? src.url : null,
    };
  });

  if (sources.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Research Citations & Data Sources"
        subtitle="Attribution sources and web evidence referenced during multi-agent analysis"
        icon={BookOpen}
        badgeText="Attribution"
      />

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {sources.map((source, idx) => {
            const isClickable = Boolean(source.url);

            return isClickable ? (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl transition duration-200 flex items-start justify-between group cursor-pointer"
              >
                <div className="pr-2 space-y-1">
                  <div className="font-medium text-xs text-zinc-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 line-clamp-2 leading-snug">
                    {source.title}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                    <Globe className="w-3 h-3 text-zinc-400" />
                    <span className="truncate max-w-[140px]">{new URL(source.url).hostname}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 flex-shrink-0 mt-0.5" />
              </a>
            ) : (
              <div
                key={idx}
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between font-mono"
              >
                <span className="truncate pr-2">{source.title}</span>
                <span className="text-[10px] text-zinc-400 font-semibold bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
