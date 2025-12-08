
import React from 'react';
import { Goal } from '../types';
import { Target } from 'lucide-react';

export const TeamGoalsCard: React.FC<{ goals: Goal[] }> = ({ goals }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-4">
       <h3 className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" /> Sprint Goals
       </h3>
       <div className="space-y-3">
          {goals.map(goal => (
             <div key={goal.id}>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                   <span>{goal.text}</span>
                   <span>{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                   <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                   ></div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};
