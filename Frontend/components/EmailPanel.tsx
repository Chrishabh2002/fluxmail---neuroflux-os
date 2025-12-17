import React, { useState } from 'react';
import { analyzeEmail } from '../services/geminiService';
import { FluxMailResponse, EmailInput } from '../types';
import { AnalysisDisplay } from './AnalysisDisplay';
import {
    Send,
    Trash2,
    Sparkles,
    Command,
} from 'lucide-react';

export const EmailPanel: React.FC = () => {
    const [emailInput, setEmailInput] = useState<EmailInput>({
        sender: '',
        subject: '',
        body: ''
    });
    const [emailResult, setEmailResult] = useState<FluxMailResponse | null>(null);
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleAnalyzeEmail = async () => {
        if (!emailInput.body.trim()) return;

        setEmailLoading(true);
        setEmailError(null);
        setEmailResult(null);

        try {
            const result = await analyzeEmail(emailInput);
            setEmailResult(result);
        } catch (err: any) {
            if (err.message === "USAGE_LIMIT_EXCEEDED") {
                setEmailError("USAGE_LIMIT_EXCEEDED");
            } else {
                setEmailError("Failed to process email. Please verify your API Key and try again.");
            }
            console.error(err);
        } finally {
            setEmailLoading(false);
        }
    };

    const clearEmail = () => {
        setEmailInput({ sender: '', subject: '', body: '' });
        setEmailResult(null);
        setEmailError(null);
    };

    const fillEmailSample = () => {
        setEmailInput({
            sender: "anita@techcorp.com",
            subject: "Project Report Deadline & Sync",
            body: `Hi Rishabh,
We need the updated project report by Tuesday.
Also, let me know if you’re available for a quick sync-up call tomorrow afternoon.

Regards,
Anita`
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
            {/* Left Panel: Input */}
            <div className="lg:col-span-5 flex flex-col gap-4 h-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Command className="w-4 h-4" /> Incoming Transmission
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={fillEmailSample} className="text-xs text-cyan-600 hover:text-cyan-400 font-mono px-2 py-1 rounded hover:bg-cyan-950/30 transition-colors">
                                LOAD_SAMPLE
                            </button>
                            <button onClick={clearEmail} className="text-slate-600 hover:text-red-400 transition-colors" title="Clear">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1 flex flex-col">
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500 font-mono ml-1">SENDER</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                placeholder="name@company.com"
                                value={emailInput.sender}
                                onChange={(e) => setEmailInput(prev => ({ ...prev, sender: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500 font-mono ml-1">SUBJECT</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                placeholder="Meeting Request / Project Update..."
                                value={emailInput.subject}
                                onChange={(e) => setEmailInput(prev => ({ ...prev, subject: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-1 flex-1 flex flex-col">
                            <label className="text-xs text-slate-500 font-mono ml-1">CONTENT</label>
                            <textarea
                                className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none font-mono leading-relaxed"
                                placeholder="Paste email body here..."
                                value={emailInput.body}
                                onChange={(e) => setEmailInput(prev => ({ ...prev, body: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleAnalyzeEmail}
                            disabled={emailLoading || !emailInput.body}
                            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${emailLoading || !emailInput.body
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/20'
                                }`}
                        >
                            {emailLoading ? (
                                <>
                                    <Sparkles className="w-4 h-4 animate-spin" />
                                    PROCESSING...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    ANALYZE EMAIL
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel: Output */}
            <div className="lg:col-span-7 h-full flex flex-col">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 shadow-xl overflow-y-auto custom-scrollbar relative">
                    {emailError && (
                        <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-10 backdrop-blur-sm p-8">
                            <div className="bg-red-950/50 border border-red-500/30 p-6 rounded-xl max-w-md text-center">
                                <h3 className="text-red-400 font-semibold mb-2">
                                    {emailError === "USAGE_LIMIT_EXCEEDED" ? "Free Plan Limit Reached" : "System Error"}
                                </h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    {emailError === "USAGE_LIMIT_EXCEEDED"
                                        ? "You have used your 3 free generations. Upgrade to Pro for unlimited access."
                                        : emailError}
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => setEmailError(null)}
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
                                    >
                                        DISMISS
                                    </button>
                                    {emailError === "USAGE_LIMIT_EXCEEDED" && (
                                        <button
                                            onClick={() => window.location.href = '/checkout?plan=Pro&price=$29'}
                                            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded text-xs transition-all shadow-lg"
                                        >
                                            UPGRADE NOW
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <AnalysisDisplay data={emailResult} loading={emailLoading} />
                </div>
            </div>
        </div>
    );
};
