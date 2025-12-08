import React, { useState } from 'react';
import { Workflow, ExecutionResult } from '../types';
import { executeWorkflow } from '../services/geminiService';
import { automationStore } from '../services/automationStore';
import { Play, Power, CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';

interface Props {
  workflow: Workflow;
  onRunComplete: () => void;
  onStatusToggle: () => void;
}

export const WorkflowCard: React.FC<Props> = ({ workflow, onRunComplete, onStatusToggle }) => {
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    try {
        const result: ExecutionResult = await executeWorkflow(workflow);
        automationStore.logExecution(result);
        onRunComplete();
    } catch (e) {
        console.error(e);
    } finally {
        setRunning(false);
    }
  };

  return (
    <div className={`p-4 rounded-xl border transition-all ${
        workflow.status === 'active' 
        ? 'bg-slate-800/40 border-slate-700 hover:border-cyan-500/30' 
        : 'bg-slate-900 border-slate-800 opacity-60'
    }`}>
      <div className="flex justify-between items-start mb-3">
         <div>
            <h3 className="font-semibold text-slate-200 text-sm mb-1">{workflow.workflow_name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    IF: {workflow.trigger.type.replace(/_/g, ' ')}
                </span>
                <ArrowRight className="w-3 h-3" />
                <span>{workflow.actions.length} Actions</span>
            </div>
         </div>
         <button 
            onClick={onStatusToggle}
            className={`p-1.5 rounded transition-colors ${
                workflow.status === 'active' ? 'text-green-400 hover:text-green-300' : 'text-slate-600 hover:text-slate-400'
            }`}
            title={workflow.status === 'active' ? 'Deactivate' : 'Activate'}
         >
            <Power className="w-4 h-4" />
         </button>
      </div>

      <div className="flex justify-end">
          <button 
             onClick={handleRun}
             disabled={running || workflow.status === 'inactive'}
             className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-3 py-1.5 rounded transition-colors"
          >
             {running ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
             RUN NOW
          </button>
      </div>
    </div>
  );
};