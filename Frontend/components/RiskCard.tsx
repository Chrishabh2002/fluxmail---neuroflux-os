import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const RiskCard: React.FC<{ content: string }> = ({ content }) => (
  <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/20 text-red-100 flex items-start gap-3 hover:border-red-500/40 transition-colors">
    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
    <p className="text-sm leading-relaxed">{content}</p>
  </div>
);