import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BrainCircuit,
    Zap,
    ShieldCheck,
    Globe,
    ArrowRight,
    CheckCircle2,
    Mail,
    Microscope,
    Briefcase,
    LifeBuoy,
    BarChart3,
    Mic,
    Hammer,
    Users,
    Settings,
    MessageSquare,
    Layers,
    Cpu,
    TrendingUp,
    Code
} from 'lucide-react';

export const LandingPage: React.FC = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-cyan-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-900/50 bg-slate-950/50 backdrop-blur-md fixed top-0 w-full left-0 right-0">
                <div className="flex items-center gap-3">
                    <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
                        <BrainCircuit className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">NeuroFlux <span className="text-cyan-500">OS</span></span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Log In</Link>
                    <Link
                        to="/signup"
                        className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20 text-sm"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* 1. HERO SECTION */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div {...fadeInUp}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-cyan-400 text-xs font-mono mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            V3.0 NOW LIVE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                            Run Your Entire Business <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                With Autonomous AI Agents
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                            NeuroFlux OS is an AI-powered operating system that works like a team of digital employees — handling emails, research, support, sales, analytics, workflows, and even app creation.
                            All in one unified platform.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-cyan-900/20 flex items-center justify-center gap-2"
                            >
                                Get Started <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/demo"
                                className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all"
                            >
                                Book a Live Demo
                            </Link>
                        </div>
                        <div className="mt-12 text-slate-500 text-sm font-medium">
                            The Future of Work Is Autonomous. Your business runs itself.
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SUB-HERO / SOCIAL PROOF */}
            <section className="py-10 border-y border-slate-900 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-500 text-sm mb-6 uppercase tracking-wider">Trusted by teams, founders, agencies and AI-driven companies building the future</p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                        {/* Placeholder Logos */}
                        {['Acme Corp', 'Quantum AI', 'Nebula', 'Vertex', 'Hyperion'].map((logo) => (
                            <span key={logo} className="text-xl font-bold text-slate-400">{logo}</span>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600 font-mono">
                        <Zap className="w-3 h-3" /> Powered by Google Gemini 3 Pro
                    </div>
                </div>
            </section>

            {/* 3. PRODUCT OVERVIEW SECTION */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">A Complete AI Operating System for Modern Businesses</h2>
                        <p className="text-xl text-slate-400 leading-relaxed mb-8">
                            NeuroFlux OS combines 10 powerful AI agents that autonomously execute your daily operations — helping you run faster, smarter, and more efficiently than ever before.
                        </p>
                        <ul className="flex flex-col md:flex-row justify-center gap-4 text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-cyan-500" /> No more switching tools</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-cyan-500" /> No more manual work</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-cyan-500" /> Just pure automation</li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* 4. FEATURES SECTION (10 AI AGENTS) */}
            <section id="features" className="py-24 bg-slate-900/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Your AI Workforce</h2>
                        <p className="text-slate-400">10 specialized agents working in perfect harmony.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mail,
                                title: "FluxMail",
                                subtitle: "AI Email Executive",
                                desc: "Reads, prioritizes, summarizes, and replies to emails automatically. Understands tone, urgency, context, and follow-ups.",
                                useCase: "Inbox management, customer communication"
                            },
                            {
                                icon: Microscope,
                                title: "FluxResearch",
                                subtitle: "AI Research Analyst",
                                desc: "Generates deep competitive analysis, trend insights, summaries, and strategic recommendations.",
                                useCase: "Market research, product decisions"
                            },
                            {
                                icon: Briefcase,
                                title: "FluxCRM",
                                subtitle: "AI Sales Manager",
                                desc: "Manages leads, predicts close probability, generates follow-ups, and recommends next actions.",
                                useCase: "Sales teams, agencies, B2B companies"
                            },
                            {
                                icon: Zap,
                                title: "FluxAutomate",
                                subtitle: "AI Workflow Engine",
                                desc: "Build Zapier-style automations using natural language. Triggers + Actions → Automated tasks run in the background.",
                                useCase: "Operations, HR, marketing workflows"
                            },
                            {
                                icon: LifeBuoy,
                                title: "FluxSupport",
                                subtitle: "AI Support Agent",
                                desc: "Understands customer messages, classifies tickets, detects urgency, and writes perfect responses. Escalates when needed.",
                                useCase: "Customer support teams, SaaS companies"
                            },
                            {
                                icon: BarChart3,
                                title: "FluxAnalytics",
                                subtitle: "AI Insights & KPI Engine",
                                desc: "Transforms raw data into dashboards, KPIs, forecasts, and CEO-level insights.",
                                useCase: "Founders, managers, analysts"
                            },
                            {
                                icon: Mic,
                                title: "FluxVoice",
                                subtitle: "AI Meeting & Voice Assistant",
                                desc: "Analyzes call transcripts, summarizes meetings, extracts decisions & tasks, and generates follow-ups.",
                                useCase: "Managers, sales teams, remote teams"
                            },
                            {
                                icon: Code,
                                title: "FluxForge",
                                subtitle: "Auto-App Builder",
                                desc: "Describe any tool. AI builds the UI, logic, components, and file structure instantly.",
                                useCase: "Developers, agencies, internal tools"
                            },
                            {
                                icon: ShieldCheck,
                                title: "FluxAdmin",
                                subtitle: "Enterprise Control Panel",
                                desc: "Centralized admin controls: users, roles, permissions, API keys, settings, and logs.",
                                useCase: "Enterprises, IT teams"
                            },
                            {
                                icon: Users,
                                title: "FluxCollab",
                                subtitle: "Realtime Collaboration",
                                desc: "Shared notes, tasks, team presence, activity feed, comments, and AI collaboration hints.",
                                useCase: "Remote teams, agencies, startup teams"
                            }
                        ].map((agent, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all hover:bg-slate-800/50 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                        <agent.icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{agent.title}</h3>
                                        <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider">{agent.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[80px]">{agent.desc}</p>
                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-xs text-slate-500"><span className="text-slate-300 font-semibold">Best for:</span> {agent.useCase}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. WHY NEUROFLUX OS */}
            <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeInUp}>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for speed. <br />Built for automation. <br /><span className="text-cyan-400">Powered by AI.</span></h2>
                            <p className="text-xl text-slate-400 mb-8">This is not another SaaS tool — This is an AI Operating System for your entire business.</p>

                            <div className="space-y-4">
                                {[
                                    "Reduce manual work by 70%",
                                    "Close deals faster",
                                    "Improve support response time",
                                    "Make smarter decisions",
                                    "Automate workflows",
                                    "Increase team productivity",
                                    "Build apps instantly"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                                        <span className="text-slate-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            {...fadeInUp}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
                            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                                {/* Abstract UI Representation */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <div className="text-xs text-slate-500 font-mono">NEUROFLUX_KERNEL_V3</div>
                                    </div>
                                    <div className="space-y-2 font-mono text-sm">
                                        <div className="text-green-400">$ init_autonomous_protocols</div>
                                        <div className="text-slate-400">Loading agents... [OK]</div>
                                        <div className="text-slate-400">Connecting to FluxMail... [OK]</div>
                                        <div className="text-slate-400">Analyzing CRM data... [OK]</div>
                                        <div className="text-cyan-400">&gt;&gt; System Ready. Awaiting commands.</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 6. WHO IS IT FOR & 7. USE CASES */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Who is it for */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                <Users className="w-6 h-6 text-cyan-400" /> Who is it for?
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { title: "For Startups", desc: "Run everything with AI-powered operations." },
                                    { title: "For Agencies", desc: "Automate support, sales, reporting, and projects." },
                                    { title: "For Enterprises", desc: "Deep automation, analytics, and admin-level control." },
                                    { title: "For Teams", desc: "Collaborate in real-time with intelligent AI support." },
                                    { title: "For Freelancers", desc: "Manage clients, create proposals, and automate workflows." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1 h-full bg-slate-800 rounded-full" />
                                        <div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-slate-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                <Layers className="w-6 h-6 text-cyan-400" /> Real Scenarios
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { trigger: "Customer sends a support complaint", action: "AI responds → creates task → escalates → logs issue" },
                                    { trigger: "Lead asks for pricing", action: "AI generates reply → updates CRM → sets follow-up time" },
                                    { trigger: "Team meeting ends", action: "AI creates summary → next steps → owner assignments" },
                                    { trigger: "Founder wants a dashboard", action: "Paste data → AI creates full KPI dashboard" },
                                    { trigger: "Need a new tool?", action: "Describe an app → AI builds it automatically" }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                        <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item.trigger}
                                        </div>
                                        <div className="pl-6 text-xs text-cyan-400 font-mono">
                                            {item.action}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. PRICING SECTION */}
            <section id="pricing" className="py-24 px-6 bg-slate-900/30 border-y border-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing for Every Team</h2>
                        <p className="text-slate-400">Start small and scale as you grow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Starter",
                                price: "$9",
                                features: ["Email Agent", "Research Agent", "CRM Lite"]
                            },
                            {
                                name: "Pro",
                                price: "$29",
                                popular: true,
                                features: ["Workflow Automations", "Support AI", "Analytics Suite", "Voice Agent"]
                            },
                            {
                                name: "Business",
                                price: "$99",
                                features: ["Full AI Workforce", "App Builder", "Team Collaboration", "Admin Controls"]
                            },
                            {
                                name: "Enterprise",
                                price: "Custom",
                                features: ["Unlimited agents", "Custom automations", "Dedicated support", "On-premise deployment"]
                            }
                        ].map((tier, i) => (
                            <div key={i} className={`relative p-6 rounded-2xl border ${tier.popular ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-900/20' : 'bg-slate-950 border-slate-800'} flex flex-col`}>
                                {tier.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full">
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 className="text-lg font-bold text-white mb-2">{tier.name}</h3>
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">{tier.price}</span>
                                    {tier.price !== "Custom" && <span className="text-slate-500">/month</span>}
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {tier.features.map((feat, j) => (
                                        <li key={j} className="text-sm text-slate-300 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-500" /> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to={tier.price === "Custom" ? "/contact" : `/checkout?plan=${tier.name}&price=${tier.price}`}
                                    className={`w-full py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center ${tier.popular ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
                                >
                                    {tier.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. TESTIMONIALS SECTION */}
            <section id="testimonials" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "NeuroFlux OS replaced five tools for our team. We save more than 20 hours every week.",
                                author: "Amit Sharma",
                                role: "CEO"
                            },
                            {
                                quote: "The Automation Agent is a game changer. Our operations now run on autopilot.",
                                author: "Priya Mehta",
                                role: "Ops Lead"
                            },
                            {
                                quote: "The App Builder saved us weeks of development time.",
                                author: "Kabir Rao",
                                role: "Developer"
                            }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800"
                            >
                                <div className="mb-4 text-cyan-500">
                                    <MessageSquare className="w-8 h-8 opacity-50" />
                                </div>
                                <p className="text-lg text-slate-300 mb-6 italic">"{t.quote}"</p>
                                <div>
                                    <div className="font-bold text-white">{t.author}</div>
                                    <div className="text-sm text-slate-500">{t.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. CALL TO ACTION */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-cyan-900/20" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Automate Your Entire Business?</h2>
                    <p className="text-xl text-slate-400 mb-10">Get your own AI workforce today.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
                        >
                            Start Free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/demo"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-all"
                        >
                            Schedule a Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* 11. FOOTER CONTENT */}
            <footer className="py-12 border-t border-slate-900 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                        <div className="flex items-center gap-2">
                            <BrainCircuit className="w-6 h-6 text-cyan-500" />
                            <span className="text-lg font-bold">NeuroFlux OS</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                            <Link to="/about" className="hover:text-white transition-colors">About</Link>
                            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                            <a href="#features" className="hover:text-white transition-colors">Features</a>
                            <a href="#" className="hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="hover:text-white transition-colors">Careers</a>
                            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-900 text-sm text-slate-500">
                        <div>© 2025 NeuroFlux Technologies — All rights reserved.</div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
