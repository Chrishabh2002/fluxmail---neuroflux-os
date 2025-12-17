
import React from 'react';

interface Props {
  notes: string;
  onChange: (val: string) => void;
}

export const SharedNotes: React.FC<Props> = ({ notes, onChange }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[300px]">
       <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Shared Notes</h3>
       <textarea 
          className="flex-1 w-full bg-slate-950/50 p-4 rounded-lg text-sm text-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-none leading-relaxed"
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type collaborative notes here..."
       />
       <div className="mt-2 text-[10px] text-slate-500 text-right">
          Last synced: Just now
       </div>
    </div>
  );
};
