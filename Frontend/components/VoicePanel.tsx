
import React, { useState } from 'react';
import { analyzeVoiceInput } from '../services/geminiService';
import { voiceStore } from '../services/voiceStore';
import { FluxVoiceResponse } from '../types';
import { VoiceInput } from './VoiceInput';
import { VoiceOutput } from './VoiceOutput';
import { AudioWaveform } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export const VoicePanel: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<FluxVoiceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeVoiceInput(text);
      setResult(data);
      voiceStore.saveTranscript(text, data);
    } catch (err) {
      setError("Failed to process voice input. Verify transcript and API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteWorkflow = (module: string) => {
    if (!module) return;
    const target = module.toLowerCase();

    // Map module names to routes
    const routes: Record<string, string> = {
      'crm': '/dashboard/crm',
      'sales': '/dashboard/crm',
      'automation': '/dashboard/automation',
      'research': '/dashboard/research',
      'email': '/dashboard/email',
      'support': '/dashboard/support',
      'collab': '/dashboard/collab',
      'forge': '/dashboard/forge'
    };

    const path = routes[target];
    if (path) {
      navigate(path);
    } else {
      console.warn(`Unknown module: ${module}`);
      // Default fallback or error handling
      alert(`Navigation to ${module} agent is not yet implemented.`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left Column: Input */}
      <div className="lg:col-span-5 h-full">
        <VoiceInput
          onAnalyze={handleAnalyze}
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

          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center">
                <AudioWaveform className="w-10 h-10 opacity-30" />
              </div>
              <p className="font-mono text-sm opacity-50">FLUX_VOICE LISTENING...</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-violet-400 space-y-6">
              <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
              <div className="text-center space-y-1">
                <p className="text-lg font-mono">VOICE INTELLIGENCE ACTIVE</p>
                <p className="text-xs text-slate-500">Transcribing intent & extracting tasks...</p>
              </div>
            </div>
          )}

          {result && <VoiceOutput data={result} onExecute={handleExecuteWorkflow} />}
        </div>
      </div>
    </div>
  );
};
