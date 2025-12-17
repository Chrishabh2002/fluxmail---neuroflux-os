
import React from 'react';
import { CollabTask } from '../types';
import { Circle, CheckCircle2, Clock, Plus } from 'lucide-react';

interface Props {
  tasks: CollabTask[];
  onStatusChange: (id: string, status: CollabTask['status']) => void;
  onAddTask: () => void;
}

export const SharedTaskBoard: React.FC<Props> = ({ tasks, onStatusChange, onAddTask }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[300px]">
       <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Team Tasks</h3>
          <button onClick={onAddTask} className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
             <Plus className="w-3 h-3" /> Add
          </button>
       </div>
       
       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
          {tasks.map(task => (
             <div key={task.id} className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 flex items-center justify-between group hover:border-slate-600 transition-colors">
                <div>
                   <p className="text-sm text-slate-200 font-medium">{task.title}</p>
                   <p className="text-xs text-slate-500">{task.owner}</p>
                </div>
                <button 
                   onClick={() => {
                       const next = task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'done' : 'todo';
                       onStatusChange(task.id, next);
                   }}
                   className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                   {task.status === 'todo' && <Circle className="w-4 h-4" />}
                   {task.status === 'in-progress' && <Clock className="w-4 h-4 text-orange-400" />}
                   {task.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
             </div>
          ))}
       </div>
    </div>
  );
};
