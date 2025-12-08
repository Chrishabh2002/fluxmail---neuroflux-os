import React from 'react';
import { Action, ActionType } from '../types';
import { Trash2, Plus, Zap, ArrowDown } from 'lucide-react';

interface Props {
  actions: Action[];
  onChange: (actions: Action[]) => void;
}

export const ActionList: React.FC<Props> = ({ actions, onChange }) => {
  const addAction = () => {
    onChange([...actions, { type: 'create_task', parameters: '' }]);
  };

  const removeAction = (index: number) => {
    const newActions = [...actions];
    newActions.splice(index, 1);
    onChange(newActions);
  };

  const updateAction = (index: number, field: keyof Action, value: string) => {
    const newActions = [...actions];
    newActions[index] = { ...newActions[index], [field]: value };
    onChange(newActions);
  };

  const actionTypes: ActionType[] = ['send_email_reply', 'update_crm', 'run_research', 'create_task'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs text-slate-400 font-mono uppercase">Workflow Actions</label>
        <button onClick={addAction} className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
          <Plus className="w-3 h-3" /> Add Step
        </button>
      </div>

      {actions.map((action, idx) => (
        <div key={idx} className="relative group">
           {idx > 0 && (
             <div className="absolute -top-4 left-6 w-0.5 h-4 bg-slate-700 flex items-center justify-center">
                <ArrowDown className="w-3 h-3 text-slate-600 bg-slate-900" />
             </div>
           )}
           
           <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex gap-3 items-start relative hover:border-indigo-500/30 transition-colors">
              <div className="mt-1 bg-slate-800 p-1.5 rounded text-indigo-400">
                <Zap className="w-4 h-4" />
              </div>
              
              <div className="flex-1 space-y-2">
                 <select 
                    value={action.type}
                    onChange={(e) => updateAction(idx, 'type', e.target.value as ActionType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50"
                 >
                    {actionTypes.map(t => (
                        <option key={t} value={t}>{t.replace(/_/g, ' ').toUpperCase()}</option>
                    ))}
                 </select>
                 
                 <input 
                    type="text"
                    value={action.parameters}
                    onChange={(e) => updateAction(idx, 'parameters', e.target.value)}
                    placeholder="Configuration parameters..."
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-400 focus:outline-none focus:border-indigo-500/50"
                 />
              </div>

              <button 
                onClick={() => removeAction(idx)}
                className="text-slate-600 hover:text-red-400 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
           </div>
        </div>
      ))}
      
      {actions.length === 0 && (
        <div className="text-center p-4 border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
            No actions defined. Add a step to begin.
        </div>
      )}
    </div>
  );
};