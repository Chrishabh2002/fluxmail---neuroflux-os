import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, ArrowLeft, Users, Target, Zap, Globe } from 'lucide-react';

export const About: React.FC = () => {
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

            {/* Hero */}
            <div className="relative py-24 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8">Building the <span className="text-cyan-400">Autonomous Enterprise</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        We believe that the future of work isn't about working harder—it's about letting AI handle the operations so humans can focus on innovation.
                    </p>
                </div>
            </div>

            {/* Mission Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Target,
                            title: "Our Mission",
                            desc: "To empower every business with an intelligent, autonomous workforce that scales instantly."
                        },
                        {
                            icon: Zap,
                            title: "Our Technology",
                            desc: "Powered by Gemini 3 Pro and our proprietary NeuroFlux Kernel, we deliver state-of-the-art reasoning."
                        },
                        {
                            icon: Globe,
                            title: "Global Impact",
                            desc: "Helping thousands of teams across 50+ countries reduce manual workload by 70%."
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                                <item.icon className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Section */}
            <div className="py-24 px-6 border-t border-slate-900 bg-slate-900/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Meet the Builders</h2>
                        <p className="text-slate-400">The team behind the intelligence.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Alex Chen", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" },
                            { name: "Sarah Miller", role: "CTO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
                            { name: "David Kim", role: "Head of AI", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
                            { name: "Emily Davis", role: "Product Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" }
                        ].map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-cyan-500 transition-colors">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                <p className="text-cyan-500 text-sm font-mono">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-24 px-6 text-center">
                <h2 className="text-3xl font-bold mb-8">Join the revolution</h2>
                <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl transition-all shadow-xl"
                >
                    Start Building <Users className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};
