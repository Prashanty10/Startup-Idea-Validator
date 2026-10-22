import React, { useState } from 'react';
import { AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

export default function ErrorState({ error, onRetry }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center animate-fadeIn">
      <Card className="space-y-6">
        {/* Error Icon Header */}
        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/50 flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
          <AlertCircle className="w-6 h-6" />
        </div>

        {/* User-friendly Heading & Description */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Validation Could Not Complete
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We encountered an unexpected issue while communicating with the validation engine. Please check your backend connection and try again.
          </p>
        </div>

        {/* Expandable Technical Details */}
        <div className="text-left text-xs">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 font-mono py-1 cursor-pointer"
          >
            <span>Technical details</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showDetails && (
            <div className="mt-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-zinc-700 dark:text-zinc-300 break-words space-y-1">
              <div className="text-[11px] font-bold text-red-500">ERROR PAYLOAD:</div>
              <div>{error?.message || 'Failed to connect to FastAPI backend at http://127.0.0.1:8000'}</div>
            </div>
          )}
        </div>

        {/* Primary Retry Action Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={onRetry}
          className="w-full"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Validation Again</span>
        </Button>
      </Card>
    </div>
  );
}
