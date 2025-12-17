import React from 'react';
import { BarChart3 } from 'lucide-react';

interface Props {
  classification: string;
  confidence: number;
  sentiment: string;
}

export const ClassificationBadge: React.FC<Props> = ({ classification, confidence, sentiment }) => (
  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm h-full">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Classification</h3>
      <BarChart3 className="w-4 h-4 text-cyan-400" />
    </div>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xl font-bold text-white">{classification}</span>
      <span className="text-xs bg-slate-900 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-900">
        {Math.round(confidence * 100)}% Confidence
      </span>
    </div>
    <p className="text-sm text-slate-400">Detected Sentiment: <span className="text-slate-200">{sentiment}</span></p>
  </div>
);