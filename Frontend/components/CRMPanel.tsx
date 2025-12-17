import React, { useState } from 'react';
import { analyzeLead } from '../services/geminiService';
import { crmStore } from '../services/crmStore';
import { CRMInput, CRMResponse } from '../types';
import { LeadForm } from './LeadForm';
import { LeadCard } from './LeadCard';
import { Users } from 'lucide-react';

export const CRMPanel: React.FC = () => {
  const [input, setInput] = useState<CRMInput>({
    lead_name: '',
    company: '',
    email: '',
    phone: '',
    deal_value: '',
    notes: ''
  });
  
  const [result, setResult] = useState<CRMResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.lead_name) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeLead(input);
      setResult(data);
      crmStore.saveLead(data);
    } catch (err) {
      setError("Failed to analyze lead. Please check inputs and API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setInput({
      lead_name: "Sarah Chen",
      company: "Apex Innovations",
      email: "sarah.c@apexinnovations.com",
      phone: "+1 (415) 555-0199",
      deal_value: "$150,000",
      notes: "Met at TechSummit. Interested in enterprise license for 500 seats. Budget approval pending Q3 board meeting. Mentioned they are also talking to Competitor X."
    });
  };

  const clear = () => {
    setInput({
      lead_name: '', company: '', email: '', phone: '', deal_value: '', notes: ''
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left Input */}
      <div className="lg:col-span-5 h-full">
        <LeadForm 
            input={input} 
            setInput={setInput} 
            onAnalyze={handleAnalyze} 
            loading={loading}
            onLoadExample={loadExample}
            onClear={clear}
        />
      </div>

      {/* Right Output */}
      <div className="lg:col-span-7 h-full flex flex-col">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 shadow-xl overflow-y-auto custom-scrollbar relative">
             {error && (
                <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-20 backdrop-blur-sm p-8">
                    <div className="bg-red-950/50 border border-red-500/30 p-6 rounded-xl text-center">
                        <p className="text-red-300 mb-4">{error}</p>
                        <button onClick={() => setError(null)} className="px-4 py-2 bg-red-900/40 rounded text-red-200 text-sm">Dismiss</button>
                    </div>
                </div>
            )}

            {!result && !loading && (
                 <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center">
                        <Users className="w-10 h-10 opacity-30" />
                    </div>
                    <p className="font-mono text-sm opacity-50">AWAITING LEAD DATA...</p>
                </div>
            )}

            {loading && (
                 <div className="h-full flex flex-col items-center justify-center text-orange-400 space-y-6">
                    <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    <div className="text-center space-y-1">
                        <p className="text-lg font-mono">FluxCRM INTELLIGENCE</p>
                        <p className="text-xs text-slate-500">Calculating deal probability...</p>
                    </div>
                </div>
            )}

            {result && <LeadCard data={result} />}
        </div>
      </div>
    </div>
  );
};