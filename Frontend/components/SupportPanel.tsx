
import React, { useState } from 'react';
import { analyzeSupportTicket, generateSupportFAQ } from '../services/geminiService';
import { supportStore } from '../services/supportStore';
import { SupportResponse } from '../types';
import { TicketInput } from './TicketInput';
import { SupportOutput } from './SupportOutput';
import { FAQCard } from './FAQCard';
import { LifeBuoy, HelpCircle } from 'lucide-react';

export const SupportPanel: React.FC = () => {
  const [result, setResult] = useState<SupportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFAQs, setShowFAQs] = useState(false);

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setShowFAQs(false);

    try {
      const data = await analyzeSupportTicket(text);
      setResult(data);
      supportStore.saveTicket(data);
    } catch (err) {
      setError("Failed to process ticket. Verify input and API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFAQ = async () => {
    setLoading(true);
    setError(null);
    try {
      // Gather summaries from past tickets for context
      const history = supportStore.getTickets().map(t => t.summary).join("\n");
      const defaultContext = "Common issues: Login failures, billing errors, feature requests.";
      
      const response = await generateSupportFAQ(history || defaultContext);
      supportStore.saveFAQs(response.faqs);
      setShowFAQs(true);
    } catch (err) {
      setError("Failed to generate FAQs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left Column: Input */}
      <div className="lg:col-span-5 h-full">
        <TicketInput 
            onAnalyze={handleAnalyze} 
            onGenerateFAQ={handleGenerateFAQ}
            loading={loading}
            onClear={() => { setResult(null); setError(null); }}
        />
      </div>

      {/* Right Column: Output */}
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

            {!result && !loading && !showFAQs && (
                 <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center">
                        <LifeBuoy className="w-10 h-10 opacity-30" />
                    </div>
                    <p className="font-mono text-sm opacity-50">FLUX_SUPPORT STANDING BY...</p>
                </div>
            )}

            {loading && (
                 <div className="h-full flex flex-col items-center justify-center text-emerald-400 space-y-6">
                    <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="text-center space-y-1">
                        <p className="text-lg font-mono">SUPPORT INTELLIGENCE ACTIVE</p>
                        <p className="text-xs text-slate-500">Diagnosing root cause...</p>
                    </div>
                </div>
            )}

            {result && !showFAQs && <SupportOutput data={result} />}

            {showFAQs && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                           <HelpCircle className="w-4 h-4" /> Knowledge Base Updates
                        </h2>
                        <button onClick={() => setShowFAQs(false)} className="text-xs text-cyan-400 hover:underline">
                            Back to Analysis
                        </button>
                    </div>
                    <div className="grid gap-4">
                        {supportStore.getFAQs().map((faq, i) => (
                            <FAQCard key={i} faq={faq} />
                        ))}
                    </div>
                    {supportStore.getFAQs().length === 0 && (
                        <p className="text-slate-500 text-sm text-center py-10">No FAQs generated yet. Analyze some tickets first.</p>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
