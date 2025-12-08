
import React from 'react';
import { CheckSquare } from 'lucide-react';

export const InternalTaskList: React.FC<{ tasks: string[] }> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
         Internal Action Items
      </h4>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <CheckSquare className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
