
import React from 'react';
import { VoiceActionItem } from '../types';
import { CheckSquare, Calendar, User } from 'lucide-react';

export const ActionItemList: React.FC<{ actions: VoiceActionItem[] }> = ({ actions }) => {
  const getPriorityColor = (p: string) => {
    switch (p.toLowerCase()) {
      case 'critical': return 'text-red-400 border-red-500/50 bg-red-950/20';
      case 'high': return 'text-orange-400 border-orange-500/50 bg-orange-950/20';
      case 'medium': return 'text-blue-400 border-blue-500/50 bg-blue-950/20';
      default: return 'text-slate-400 border-slate-600 bg-slate-800/50';
    }
  };

  return (
    <div className="space-y-3">
      {actions.map((item, i) => (
        <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 hover:border-cyan-500/30 transition-all">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-slate-200 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-cyan-500" />
              {item.title}
            </h4>
            <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${getPriorityColor(item.priority)}`}>
              {item.priority}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {item.owner}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {item.due_date}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
