
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  icon?: React.FC<any>;
}

export const KpiCard: React.FC<Props> = ({ title, value, trend = 'neutral', color = 'text-slate-200', icon: Icon }) => {
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 backdrop-blur-sm hover:border-cyan-500/20 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
        {Icon && <Icon className={`w-4 h-4 opacity-50 ${color}`} />}
      </div>
      <div className="flex items-end gap-2">
        <span className={`text-2xl font-bold font-mono ${color}`}>{value}</span>
        {trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500 mb-1" />}
        {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500 mb-1" />}
        {trend === 'neutral' && <Minus className="w-4 h-4 text-slate-500 mb-1" />}
      </div>
      <div className="w-full bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
         <div className={`h-full opacity-50 rounded-full group-hover:w-full transition-all duration-1000 w-2/3 bg-current ${color}`}></div>
      </div>
    </div>
  );
};
