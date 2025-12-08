import React from 'react';
import { TrendingUp } from 'lucide-react';

export const OpportunityCard: React.FC<{ content: string }> = ({ content }) => (
  <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-100 flex items-start gap-3 hover:border-emerald-500/40 transition-colors">
    <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
    <p className="text-sm leading-relaxed">{content}</p>
  </div>
);