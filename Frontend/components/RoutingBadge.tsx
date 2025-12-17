
import React from 'react';
import { ArrowRightCircle } from 'lucide-react';

export const RoutingBadge: React.FC<{ moduleName: string; onExecute: () => void }> = ({ moduleName, onExecute }) => {
  if (!moduleName || moduleName.toLowerCase() === 'none') return null;

  return (
    <div className="bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 border border-violet-500/30 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ArrowRightCircle className="w-5 h-5 text-violet-400" />
        <div>
          <span className="text-xs text-violet-300 font-semibold uppercase tracking-wider block">Suggested Workflow</span>
          <span className="text-sm text-slate-200">Route to <strong>Flux{moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}</strong> Agent</span>
        </div>
      </div>
      <button
        onClick={onExecute}
        className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded transition-colors"
      >
        Execute
      </button>
    </div>
  );
};
