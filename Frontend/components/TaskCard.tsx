import React from 'react';
import { Calendar } from 'lucide-react';
import { TaskItem } from '../types';

const PriorityBadge = ({ level }: { level: string }) => {
  const colors: Record<string, string> = {
    Low: 'bg-slate-700 text-slate-300 border-slate-600',
    Medium: 'bg-blue-900/50 text-blue-300 border-blue-700',
    High: 'bg-orange-900/50 text-orange-300 border-orange-700',
    Critical: 'bg-red-900/50 text-red-300 border-red-600',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${colors[level] || colors.Low}`}>
      {level.toUpperCase()}
    </span>
  );
};

export const TaskCard: React.FC<{ task: TaskItem }> = ({ task }) => (
  <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 hover:border-cyan-500/30 transition-colors">
    <div className="flex justify-between items-start mb-1">
      <span className="font-medium text-slate-200">{task.title}</span>
      <PriorityBadge level={task.priority} />
    </div>
    <p className="text-xs text-slate-400 mb-2">{task.description}</p>
    <div className="flex items-center gap-4 text-xs text-slate-500">
      {task.due_date && task.due_date !== 'None' && (
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due: {task.due_date}</span>
      )}
      <span className="text-cyan-600 font-mono">→ {task.recommended_next_action}</span>
    </div>
  </div>
);