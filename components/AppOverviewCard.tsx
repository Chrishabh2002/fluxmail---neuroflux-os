
import React from 'react';
import { AppPackage } from '../types';
import { Box, Layers, PlayCircle } from 'lucide-react';

export const AppOverviewCard: React.FC<{ app: AppPackage }> = ({ app }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30">
            <Box className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{app.app_name}</h2>
            <span className="text-xs text-indigo-300 bg-indigo-900/40 px-2 py-0.5 rounded border border-indigo-800">
               {app.recommended_route}
            </span>
          </div>
        </div>
        <div className="text-right">
             <span className="text-xs text-slate-500 uppercase font-mono block">Files Generated</span>
             <span className="text-xl font-mono text-white">{app.file_structure.length}</span>
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-6 border-l-2 border-indigo-500/50 pl-4">
        {app.app_description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Integration Points
            </h4>
            <ul className="space-y-1">
                {app.integration.agent_usage.map((agent, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        {agent}
                    </li>
                ))}
            </ul>
         </div>

         <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <PlayCircle className="w-3 h-3" /> Run Instructions
            </h4>
            <p className="text-xs text-slate-400 font-mono">
                {app.run_instructions}
            </p>
         </div>
      </div>
    </div>
  );
};
