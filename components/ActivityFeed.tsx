
import React from 'react';
import { ActivityItem } from '../types';
import { Zap, CheckSquare, FileText, MessageSquare } from 'lucide-react';

export const ActivityFeed: React.FC<{ feed: ActivityItem[] }> = ({ feed }) => {
  const getIcon = (type: ActivityItem['type']) => {
     switch(type) {
        case 'note': return <FileText className="w-3 h-3 text-cyan-400" />;
        case 'task': return <CheckSquare className="w-3 h-3 text-emerald-400" />;
        case 'comment': return <MessageSquare className="w-3 h-3 text-indigo-400" />;
        default: return <Zap className="w-3 h-3 text-slate-400" />;
     }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-[250px] flex flex-col">
       <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Live Activity</h3>
       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
          {feed.map(item => (
             <div key={item.id} className="flex gap-3 text-xs">
                <div className="mt-0.5">{getIcon(item.type)}</div>
                <div>
                   <span className="text-slate-200 font-semibold">{item.user}</span> <span className="text-slate-400">{item.action}</span>
                   <div className="text-[10px] text-slate-600 mt-0.5">{item.timestamp}</div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};
