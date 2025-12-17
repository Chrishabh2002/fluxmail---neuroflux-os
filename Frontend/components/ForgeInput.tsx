
import React, { useState } from 'react';
import { Hammer, Trash2, Sparkles, Terminal } from 'lucide-react';

interface Props {
  onGenerate: (prompt: string) => void;
  loading: boolean;
  onClear: () => void;
}

export const ForgeInput: React.FC<Props> = ({ onGenerate, loading, onClear }) => {
  const [prompt, setPrompt] = useState('');

  const loadExample = (type: 'crm' | 'task' | 'invoice') => {
    const examples = {
        crm: "Build a lightweight CRM dashboard that displays a list of leads with a status badge (New, Contacted, Closed). Include a detailed view for each lead and a form to add new leads. Use Tailwind for a clean dark mode UI.",
        task: "Create a Kanban board application with three columns: To Do, In Progress, Done. Allow users to drag and drop tasks between columns (simulate drag and drop logic). Include a button to add new tasks.",
        invoice: "Create an Invoice Calculator tool. Users should be able to add line items (Description, Qty, Price), see a live subtotal, add a tax percentage, and calculate the final total. Provide a 'Print to PDF' button stub."
    };
    setPrompt(examples[type]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Hammer className="w-4 h-4" /> App Specifications
        </h2>
        <div className="flex gap-2">
             <button onClick={() => { setPrompt(''); onClear(); }} className="text-slate-600 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-2">
         <label className="text-xs text-slate-500 font-mono ml-1">DESCRIBE YOUR TOOL</label>
         <textarea 
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none font-sans leading-relaxed min-h-[200px]"
            placeholder="e.g., 'Create a lead scoring tool that takes user inputs and calculates a score based on budget and timeline...'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
         />
      </div>

      <div className="my-4 space-y-2">
         <span className="text-[10px] text-slate-600 font-mono uppercase">Quick Templates:</span>
         <div className="flex gap-2 flex-wrap">
             <button onClick={() => loadExample('crm')} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700">CRM Dashboard</button>
             <button onClick={() => loadExample('task')} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700">Kanban Board</button>
             <button onClick={() => loadExample('invoice')} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors border border-slate-700">Invoice Calc</button>
         </div>
      </div>

      <div className="mt-2">
         <button 
            onClick={() => onGenerate(prompt)}
            disabled={loading || !prompt}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                loading || !prompt
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-900/20'
            }`}
        >
            {loading ? (
                <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    FORGING APP...
                </>
            ) : (
                <>
                    <Terminal className="w-5 h-5" />
                    GENERATE APP PACKAGE
                </>
            )}
        </button>
      </div>
    </div>
  );
};
