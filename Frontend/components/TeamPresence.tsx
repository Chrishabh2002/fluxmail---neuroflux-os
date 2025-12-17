
import React from 'react';
import { TeamMember } from '../types';
import { Users } from 'lucide-react';

export const TeamPresence: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
       case 'online': return 'bg-emerald-500';
       case 'typing': return 'bg-cyan-500 animate-pulse';
       case 'away': return 'bg-amber-500';
       case 'offline': return 'bg-slate-600';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
       <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" /> Team Presence
       </h3>
       <div className="flex flex-wrap gap-3">
          {members.map(m => (
             <div key={m.id} className="flex items-center gap-2 bg-slate-800/50 px-2 py-1.5 rounded-full border border-slate-700">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(m.status)}`}></div>
                <span className="text-xs text-slate-300 font-medium">{m.name}</span>
                {m.status === 'typing' && <span className="text-[10px] text-slate-500 italic">typing...</span>}
             </div>
          ))}
       </div>
    </div>
  );
};
