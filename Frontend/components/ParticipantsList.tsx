
import React from 'react';
import { UserCircle2 } from 'lucide-react';

export const ParticipantsList: React.FC<{ participants: string[] }> = ({ participants }) => {
  if (!participants || participants.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {participants.map((name, i) => (
        <div key={i} className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700 rounded-full px-3 py-1 text-xs text-slate-300">
          <UserCircle2 className="w-3 h-3 text-cyan-400" />
          {name}
        </div>
      ))}
    </div>
  );
};
