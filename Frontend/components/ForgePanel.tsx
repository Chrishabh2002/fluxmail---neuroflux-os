
import React, { useState } from 'react';
import { generateMiniApp } from '../services/geminiService';
import { forgeStore } from '../services/forgeStore';
import { AppPackage } from '../types';
import { ForgeInput } from './ForgeInput';
import { ForgeOutput } from './ForgeOutput';
import { Hammer } from 'lucide-react';

export const ForgePanel: React.FC = () => {
  const [result, setResult] = useState<AppPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateMiniApp(prompt);
      setResult(data);
      forgeStore.saveGeneratedApp(data);
    } catch (err) {
      setError("FluxForge failed to build the app. Please verify API key and Prompt.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left Column: Input */}
      <div className="lg:col-span-4 h-full">
        <ForgeInput 
            onGenerate={handleGenerate} 
            loading={loading}
            onClear={() => { setResult(null); setError(null); }}
        />
      </div>

      {/* Right Column: Output */}
      <div className="lg:col-span-8 h-full flex flex-col">
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
                        <Hammer className="w-10 h-10 opacity-30" />
                    </div>
                    <p className="font-mono text-sm opacity-50">FLUX_FORGE SYSTEM READY</p>
                </div>
            )}

            {loading && (
                 <div className="h-full flex flex-col items-center justify-center text-indigo-400 space-y-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                            <Hammer className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-lg font-mono">CONSTRUCTING APPLICATION</p>
                        <p className="text-xs text-slate-500">Generating components, styles, and logic...</p>
                    </div>
                </div>
            )}

            {result && <ForgeOutput app={result} />}
        </div>
      </div>
    </div>
  );
};
