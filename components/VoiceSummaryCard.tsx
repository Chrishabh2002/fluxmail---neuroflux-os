
import React from 'react';
import { FileText, List, Scale } from 'lucide-react';
import { FluxVoiceResponse } from '../types';

export const VoiceSummaryCard: React.FC<{ data: FluxVoiceResponse }> = ({ data }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-5">
      
      {/* Summary */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
           <FileText className="w-4 h-4" /> Meeting Summary
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed">{data.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-800">
          {/* Key Points */}
          <div>
            <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
               <List className="w-4 h-4" /> Key Points
            </h3>
            <ul className="space-y-1.5">
                {data.key_points.map((pt, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-indigo-500 mt-1.5 text-[8px]">●</span> {pt}
                    </li>
                ))}
            </ul>
          </div>
          
          {/* Decisions */}
          <div>
            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
               <Scale className="w-4 h-4" /> Decisions Made
            </h3>
            <ul className="space-y-1.5">
                {data.decisions.map((dec, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1.5 text-[8px]">●</span> {dec}
                    </li>
                ))}
                {data.decisions.length === 0 && <li className="text-xs text-slate-600 italic">No formal decisions detected.</li>}
            </ul>
          </div>
      </div>
    </div>
  );
};
