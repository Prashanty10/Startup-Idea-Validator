import React from 'react';
import Card from './Card';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6 border-l-4 border-l-amber-500 bg-[#0b0b0f] my-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-mono uppercase mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{this.props.fallbackTitle || 'Section Display Notice'}</span>
          </div>
          <p className="text-sm text-zinc-300">
            {this.props.fallbackMessage || 'This section encountered an issue rendering data. The rest of your report is unaffected.'}
          </p>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
