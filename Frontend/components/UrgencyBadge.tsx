
import React from 'react';
import { AlertCircle, Clock, Zap } from 'lucide-react';

interface Props {
  level: 'Low' | 'Medium' | 'High' | 'Critical';
}

export const UrgencyBadge: React.FC<Props> = ({ level }) => {
  const config = {
    Low: { color: 'text-slate-300', bg: 'bg-slate-700', border: 'border-slate-600', icon: Clock },
    Medium: { color: 'text-blue-300', bg: 'bg-blue-900/50', border: 'border-blue-700', icon: Clock },
    High: { color: 'text-orange-300', bg: 'bg-orange-900/50', border: 'border-orange-700', icon: AlertCircle },
    Critical: { color: 'text-red-300', bg: 'bg-red-900/50', border: 'border-red-600', icon: Zap },
  };

  const style = config[level] || config.Low;
  const Icon = style.icon;

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-semibold ${style.bg} ${style.border} ${style.color}`}>
      <Icon className="w-3 h-3" />
      {level.toUpperCase()}
    </div>
  );
};
