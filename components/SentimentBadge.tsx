
import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface Props {
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
}

export const SentimentBadge: React.FC<Props> = ({ sentiment }) => {
  const config = {
    positive: { color: 'text-emerald-400', bg: 'bg-emerald-950/30', border: 'border-emerald-500/30', icon: Smile, label: 'Positive' },
    neutral: { color: 'text-slate-400', bg: 'bg-slate-800', border: 'border-slate-700', icon: Meh, label: 'Neutral' },
    negative: { color: 'text-red-400', bg: 'bg-red-950/30', border: 'border-red-500/30', icon: Frown, label: 'Negative' },
    mixed: { color: 'text-amber-400', bg: 'bg-amber-950/30', border: 'border-amber-500/30', icon: Meh, label: 'Mixed' },
  };

  const style = config[sentiment] || config.neutral;
  const Icon = style.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${style.bg} ${style.border}`}>
      <Icon className={`w-4 h-4 ${style.color}`} />
      <span className={`text-xs font-medium uppercase tracking-wider ${style.color}`}>{style.label}</span>
    </div>
  );
};
