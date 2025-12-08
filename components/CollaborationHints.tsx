
import React from 'react';
import { HintResponse } from '../types';
import { Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';

interface Props {
  hints: HintResponse | null;
  loading: boolean;
  onGenerate: () => void;
}

export const CollaborationHints: React.FC<Props> = ({ hints, loading, onGenerate }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-4">
       <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
             <Sparkles className="w-4 h-4 text-purple-400" /> FluxCollab AI Insights
          </h3>
          <button 
             onClick={onGenerate}
             disabled={loading}
             className="text-[10px] bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
          >
             {loading ? 'Analyzing...' : 'Refresh Insights'}
          </button>
       </div>

       {!hints && !loading && (
          <p className="text-xs text-slate-500 italic text-center py-2">Click refresh to analyze team dynamics.</p>
       )}

       {hints && (
          <div className="space-y-3">
             {hints.hints.length > 0 && (
                <div className="bg-purple-900/20 p-2 rounded border border-purple-500/20">
                   <p className="text-xs text-purple-200 flex items-start gap-2">
                      <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" /> {hints.hints[0]}
                   </p>
                </div>
             )}
             {hints.warnings.length > 0 && (
                <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                   <p className="text-xs text-red-200 flex items-start gap-2">
                      <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" /> {hints.warnings[0]}
                   </p>
                </div>
             )}
          </div>
       )}
    </div>
  );
};
