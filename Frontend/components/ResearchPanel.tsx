import React, { useState } from 'react';
import { analyzeResearch } from '../services/geminiService';
import { ResearchResponse } from '../types';
import { ResearchInsights } from './ResearchInsights';
import {
    Search,
    Sparkles,
    Trash2,
    Globe2,
    Microscope,
    ArrowRight
} from 'lucide-react';

export const ResearchPanel: React.FC = () => {
    const [query, setQuery] = useState('');
    const [researchData, setResearchData] = useState<ResearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleResearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setResearchData(null);

        try {
            const result = await analyzeResearch(query);
            setResearchData(result);
        } catch (err: any) {
            if (err.message === "USAGE_LIMIT_EXCEEDED") {
                setError("USAGE_LIMIT_EXCEEDED");
            } else {
                setError("Research module encountered an error. Please verify input and API Key.");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadExample = () => {
        setQuery("The future of solid-state batteries in EV market 2025-2030");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

            {/* Left Panel: Query Input */}
            <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Microscope className="w-4 h-4" /> Research Parameters
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={loadExample} className="text-xs text-cyan-600 hover:text-cyan-400 font-mono px-2 py-1 rounded hover:bg-cyan-950/30 transition-colors">
                                EXAMPLE_QUERY
                            </button>
                            <button onClick={() => setQuery('')} className="text-slate-600 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label className="text-xs text-slate-500 font-mono ml-1 mb-2">RESEARCH TOPIC</label>
                        <textarea
                            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none font-sans leading-relaxed"
                            placeholder="Enter a topic, market sector, or complex question..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleResearch}
                            disabled={loading || !query}
                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${loading || !query
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-900/20'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Globe2 className="w-5 h-5 animate-spin" />
                                    RESEARCHING...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    INITIATE RESEARCH
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel: Output */}
            <div className="lg:col-span-8 h-full flex flex-col">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex-1 shadow-xl overflow-y-auto custom-scrollbar relative">
                    {error && (
                        <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-10 backdrop-blur-sm p-8">
                            <div className="bg-red-950/50 border border-red-500/30 p-6 rounded-xl max-w-md text-center">
                                <h3 className="text-red-400 font-semibold mb-2">
                                    {error === "USAGE_LIMIT_EXCEEDED" ? "Free Plan Limit Reached" : "System Error"}
                                </h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    {error === "USAGE_LIMIT_EXCEEDED"
                                        ? "You have used your 3 free generations. Upgrade to Pro for unlimited access."
                                        : error}
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => setError(null)}
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
                                    >
                                        DISMISS
                                    </button>
                                    {error === "USAGE_LIMIT_EXCEEDED" && (
                                        <button
                                            onClick={() => window.location.href = '/checkout?plan=Pro&price=$29'}
                                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded text-xs transition-all shadow-lg"
                                        >
                                            UPGRADE NOW
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {!researchData && !loading && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center">
                                <Microscope className="w-10 h-10 opacity-30" />
                            </div>
                            <p className="font-mono text-sm opacity-50">READY FOR DEEP ANALYSIS</p>
                        </div>
                    )}

                    {loading && (
                        <div className="h-full flex flex-col items-center justify-center text-indigo-400 space-y-6">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-lg font-mono">FLUX_RESEARCH_AGENT ACTIVE</p>
                                <p className="text-xs text-slate-500">Scanning Knowledge Base...</p>
                            </div>
                        </div>
                    )}

                    {researchData && <ResearchInsights data={researchData} />}
                </div>
            </div>

        </div>
    );
};