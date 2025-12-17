import React from 'react';
import { CheckSquare } from 'lucide-react';

export const NextActionList: React.FC<{ actions: string[] }> = ({ actions }) => (
  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
       Recommended Actions
    </h4>
    <ul className="space-y-2">
      {actions.map((action, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
          <CheckSquare className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
          <span>{action}</span>
        </li>
      ))}
    </ul>
  </div>
);