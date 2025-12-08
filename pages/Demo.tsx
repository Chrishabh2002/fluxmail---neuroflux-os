import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, BrainCircuit, CheckCircle2 } from 'lucide-react';

export const Demo: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
            {/* Navbar */}
            <nav className="relative z-50 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-900/50">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
                            <BrainCircuit className="w-6 h-6 text-cyan-400" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">NeuroFlux <span className="text-cyan-500">OS</span></span>
                    </Link>
                </div>
                <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <Play className="w-3 h-3 fill-current" /> Live Demonstration
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">See NeuroFlux in Action</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Watch how our autonomous agents handle complex workflows, from email management to full app generation.
                    </p>
                </div>

                {/* Video Player Container */}
                <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-900/20 group">
                    <iframe
                        src="https://gemini.google.com/share/af400e713e29"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="NeuroFlux Demo Video"
                    />
                </div>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {[
                        {
                            title: "Autonomous Workflow",
                            desc: "Watch agents collaborate to solve tasks without human intervention."
                        },
                        {
                            title: "Real-time Intelligence",
                            desc: "See how Gemini 3 Pro analyzes data and makes decisions in milliseconds."
                        },
                        {
                            title: "Instant App Generation",
                            desc: "Witness FluxForge build a complete UI from a single text prompt."
                        }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-6 rounded-xl bg-slate-900/30 border border-slate-800">
                            <div className="mt-1">
                                <CheckCircle2 className="w-6 h-6 text-cyan-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 text-center p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                    <h2 className="text-3xl font-bold mb-6">Ready to experience the future?</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/signup"
                            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
