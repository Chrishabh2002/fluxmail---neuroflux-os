
import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  insights: string[];
  warnings: string[];
  recommendations: string[];
}

export const InsightsList: React.FC<Props> = ({ insights, warnings, recommendations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
         <h4 className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
            <Lightbulb className="w-4 h-4" /> Strategic Insights
         </h4>
         <ul className="space-y-3">
            {insights.map((item, i) => (
                <li key={i} className="text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-indigo-500 mt-1">•</span> {item}
                </li>
            ))}
         </ul>
      </div>

      <div className="bg-red-950/10 rounded-xl p-5 border border-red-900/30">
         <h4 className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-4">
            <AlertTriangle className="w-4 h-4" /> Critical Warnings
         </h4>
         <ul className="space-y-3">
            {warnings.map((item, i) => (
                <li key={i} className="text-sm text-red-200/80 leading-relaxed flex items-start gap-2">
                    <span className="text-red-500 mt-1">!</span> {item}
                </li>
            ))}
         </ul>
      </div>

      <div className="bg-emerald-950/10 rounded-xl p-5 border border-emerald-900/30">
         <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
            <CheckCircle2 className="w-4 h-4" /> Recommended Actions
         </h4>
         <ul className="space-y-3">
            {recommendations.map((item, i) => (
                <li key={i} className="text-sm text-emerald-200/80 leading-relaxed flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">→</span> {item}
                </li>
            ))}
         </ul>
      </div>
    </div>
  );
};
