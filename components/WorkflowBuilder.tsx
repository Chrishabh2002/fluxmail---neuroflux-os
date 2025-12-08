import React, { useState } from 'react';
import { Workflow, AutomationSuggestion } from '../types';
import { TriggerSelector } from './TriggerSelector';
import { ActionList } from './ActionList';
import { analyzeAutomationIdea } from '../services/geminiService';
import { automationStore } from '../services/automationStore';
import { Sparkles, Save, Play, Bot } from 'lucide-react';

interface Props {
  onWorkflowCreated: () => void;
}

export const WorkflowBuilder: React.FC<Props> = ({ onWorkflowCreated }) => {
  const [idea, setIdea] = useState('');
  const [loadingIdea, setLoadingIdea] = useState(false);
  
  const [workflow, setWorkflow] = useState<Workflow>({
    id: '',
    workflow_name: '',
    trigger: { type: 'email_received', conditions: '' },
    actions: [],
    status: 'active'
  });

  const generateFromIdea = async () => {
    if (!idea.trim()) return;
    setLoadingIdea(true);
    try {
      const suggestion: AutomationSuggestion = await analyzeAutomationIdea(idea);
      setWorkflow({
        id: crypto.randomUUID(),
        workflow_name: suggestion.workflow_name,
        trigger: { 
            type: suggestion.recommended_trigger as any, 
            conditions: suggestion.reasoning 
        },
        actions: suggestion.recommended_actions.map(a => ({
            type: 'create_task', // Defaulting for visual simplicity in demo
            parameters: a
        })),
        status: 'active'
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingIdea(false);
    }
  };

  const saveWorkflow = () => {
    if (!workflow.workflow_name) return;
    const newWf = { ...workflow, id: workflow.id || crypto.randomUUID() };
    automationStore.saveWorkflow(newWf);
    
    // Reset form
    setWorkflow({
        id: '',
        workflow_name: '',
        trigger: { type: 'email_received', conditions: '' },
        actions: [],
        status: 'active'
    });
    setIdea('');
    onWorkflowCreated();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col h-full shadow-xl">
       <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
             <Bot className="w-4 h-4" /> Workflow Builder
          </h2>
       </div>

       <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* AI Input */}
          <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-4 rounded-xl border border-indigo-500/20">
             <label className="text-xs text-indigo-300 font-mono mb-2 block flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> AI WORKFLOW GEN
             </label>
             <div className="flex gap-2">
                <input 
                   type="text"
                   value={idea}
                   onChange={e => setIdea(e.target.value)}
                   placeholder="e.g. 'When a VIP client emails, alert me and create a high priority task'"
                   className="flex-1 bg-slate-950 border border-indigo-500/30 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button 
                    onClick={generateFromIdea}
                    disabled={loadingIdea || !idea}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded transition-colors disabled:opacity-50"
                >
                    {loadingIdea ? <Sparkles className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                </button>
             </div>
          </div>

          <div className="border-t border-slate-800 my-4"></div>

          {/* Manual Builder */}
          <div className="space-y-4">
             <div className="space-y-1">
                <label className="text-xs text-slate-500 font-mono ml-1">WORKFLOW NAME</label>
                <input 
                   type="text"
                   value={workflow.workflow_name}
                   onChange={e => setWorkflow({...workflow, workflow_name: e.target.value})}
                   placeholder="My Automation Rule"
                   className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                />
             </div>

             <TriggerSelector 
                trigger={workflow.trigger} 
                onChange={t => setWorkflow({...workflow, trigger: t})} 
             />

             <ActionList 
                actions={workflow.actions} 
                onChange={a => setWorkflow({...workflow, actions: a})} 
             />
          </div>
       </div>

       <div className="mt-6 pt-4 border-t border-slate-800">
           <button 
               onClick={saveWorkflow}
               disabled={!workflow.workflow_name}
               className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${
                 !workflow.workflow_name 
                 ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                 : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20'
               }`}
           >
               <Save className="w-4 h-4" /> SAVE WORKFLOW
           </button>
       </div>
    </div>
  );
};