import React, { useState, useEffect } from 'react';
import { WorkflowBuilder } from './WorkflowBuilder';
import { WorkflowCard } from './WorkflowCard';
import { ExecutionLogCard } from './ExecutionLogCard';
import { automationStore } from '../services/automationStore';
import { Workflow, ExecutionResult } from '../types';
import { Zap, Activity, Layers } from 'lucide-react';

export const AutomationPanel: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [logs, setLogs] = useState<ExecutionResult[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setWorkflows(automationStore.getWorkflows());
    setLogs(automationStore.getLogs());
  }, [refresh]);

  const handleUpdate = () => {
    setRefresh(prev => prev + 1);
  };

  const handleToggle = (id: string) => {
    automationStore.toggleStatus(id);
    handleUpdate();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      
      {/* Left Column: Builder */}
      <div className="lg:col-span-5 h-full">
        <WorkflowBuilder onWorkflowCreated={handleUpdate} />
      </div>

      {/* Right Column: Dashboard */}
      <div className="lg:col-span-7 h-full flex flex-col gap-6">
         
         {/* Workflows List */}
         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-1 overflow-y-auto custom-scrollbar">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
               <Layers className="w-4 h-4" /> Active Workflows
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflows.map(wf => (
                    <WorkflowCard 
                        key={wf.id} 
                        workflow={wf} 
                        onRunComplete={handleUpdate} 
                        onStatusToggle={() => handleToggle(wf.id)}
                    />
                ))}
                {workflows.length === 0 && (
                    <div className="col-span-full text-center py-8 text-slate-500">
                        No workflows configured.
                    </div>
                )}
            </div>
         </div>

         {/* Execution Logs */}
         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-1/2 overflow-y-auto custom-scrollbar">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
               <Activity className="w-4 h-4" /> Execution Live Log
            </h2>
            <div className="space-y-3">
                {logs.map((log, i) => (
                    <ExecutionLogCard key={i} log={log} />
                ))}
                {logs.length === 0 && (
                    <div className="text-center py-8 text-slate-500 font-mono text-xs">
                        WAITING FOR TRIGGER EVENTS...
                    </div>
                )}
            </div>
         </div>

      </div>
    </div>
  );
};