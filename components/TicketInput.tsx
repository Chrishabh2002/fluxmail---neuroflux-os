
import React, { useState } from 'react';
import { SupportTicketInput } from '../types';
import { LifeBuoy, Search, Sparkles, Trash2, HelpCircle } from 'lucide-react';

interface Props {
  onAnalyze: (text: string) => void;
  onGenerateFAQ: () => void;
  loading: boolean;
  onClear: () => void;
}

export const TicketInput: React.FC<Props> = ({ onAnalyze, onGenerateFAQ, loading, onClear }) => {
  const [text, setText] = useState('');

  const loadExample = () => {
    setText("I've been trying to export my project data for the last 2 hours but the button is greyed out. This is urgent as I have a board meeting in 30 mins! I'm on the Enterprise plan. Please fix this ASAP or I'm cancelling.");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <LifeBuoy className="w-4 h-4" /> New Ticket
        </h2>
        <div className="flex gap-2">
            <button onClick={loadExample} className="text-xs text-cyan-600 hover:text-cyan-400 font-mono px-2 py-1 rounded hover:bg-cyan-950/30 transition-colors">
                EXAMPLE
            </button>
            <button onClick={() => { setText(''); onClear(); }} className="text-slate-600 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-2">
         <label className="text-xs text-slate-500 font-mono ml-1">CUSTOMER MESSAGE</label>
         <textarea 
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none font-sans leading-relaxed min-h-[200px]"
            placeholder="Paste customer email, chat log, or complaint here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
         />
      </div>

      <div className="mt-6 flex flex-col gap-3">
         <button 
            onClick={() => onAnalyze(text)}
            disabled={loading || !text}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                loading || !text
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/20'
            }`}
        >
            {loading ? (
                <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    ANALYZING...
                </>
            ) : (
                <>
                    <Search className="w-5 h-5" />
                    ANALYZE TICKET
                </>
            )}
        </button>
        
        <button 
            onClick={onGenerateFAQ}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
        >
            <HelpCircle className="w-4 h-4" /> Generate FAQs from History
        </button>
      </div>
    </div>
  );
};
