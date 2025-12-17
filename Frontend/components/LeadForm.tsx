import React from 'react';
import { CRMInput } from '../types';
import { Briefcase, User, Mail, Phone, DollarSign, FileText, Search, Sparkles } from 'lucide-react';

interface Props {
  input: CRMInput;
  setInput: React.Dispatch<React.SetStateAction<CRMInput>>;
  onAnalyze: () => void;
  loading: boolean;
  onLoadExample: () => void;
  onClear: () => void;
}

export const LeadForm: React.FC<Props> = ({ input, setInput, onAnalyze, loading, onLoadExample, onClear }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> New Opportunity
        </h2>
        <div className="flex gap-2">
            <button onClick={onLoadExample} className="text-xs text-cyan-600 hover:text-cyan-400 font-mono px-2 py-1 rounded hover:bg-cyan-950/30 transition-colors">
                EXAMPLE
            </button>
            <button onClick={onClear} className="text-xs text-slate-500 hover:text-red-400 font-mono px-2 py-1 transition-colors">
                CLEAR
            </button>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
         {/* Name & Company */}
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs text-slate-500 font-mono ml-1">LEAD NAME</label>
                <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
                    <input 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        value={input.lead_name}
                        onChange={(e) => setInput(prev => ({...prev, lead_name: e.target.value}))}
                        placeholder="John Doe"
                    />
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-xs text-slate-500 font-mono ml-1">COMPANY</label>
                <div className="relative">
                     <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
                    <input 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        value={input.company}
                        onChange={(e) => setInput(prev => ({...prev, company: e.target.value}))}
                        placeholder="Acme Inc."
                    />
                </div>
            </div>
         </div>

         {/* Contact Info */}
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs text-slate-500 font-mono ml-1">EMAIL</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
                    <input 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        value={input.email}
                        onChange={(e) => setInput(prev => ({...prev, email: e.target.value}))}
                        placeholder="john@acme.com"
                    />
                </div>
            </div>
             <div className="space-y-1">
                <label className="text-xs text-slate-500 font-mono ml-1">PHONE</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
                    <input 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        value={input.phone}
                        onChange={(e) => setInput(prev => ({...prev, phone: e.target.value}))}
                        placeholder="+1 (555)..."
                    />
                </div>
            </div>
         </div>

         {/* Deal Value */}
         <div className="space-y-1">
            <label className="text-xs text-slate-500 font-mono ml-1">ESTIMATED VALUE</label>
            <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
                <input 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                    value={input.deal_value}
                    onChange={(e) => setInput(prev => ({...prev, deal_value: e.target.value}))}
                    placeholder="$0.00"
                />
            </div>
         </div>

         {/* Notes */}
         <div className="space-y-1 flex-1 flex flex-col">
            <label className="text-xs text-slate-500 font-mono ml-1">NOTES & CONTEXT</label>
            <div className="relative flex-1">
                 <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
                 <textarea 
                    className="w-full h-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none font-sans leading-relaxed min-h-[120px]"
                    value={input.notes}
                    onChange={(e) => setInput(prev => ({...prev, notes: e.target.value}))}
                    placeholder="Paste email thread, call notes, or meeting summary here..."
                />
            </div>
         </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800">
         <button 
            onClick={onAnalyze}
            disabled={loading || !input.lead_name}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                loading || !input.lead_name
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-900/20'
            }`}
        >
            {loading ? (
                <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    ANALYZING DEAL...
                </>
            ) : (
                <>
                    <Search className="w-5 h-5" />
                    ANALYZE LEAD
                </>
            )}
        </button>
      </div>
    </div>
  );
};