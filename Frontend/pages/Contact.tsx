import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Mail, MapPin, Phone, Send, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export const Contact: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real app, you would POST to /api/contact here
        console.log("Message sent:", formData);

        setLoading(false);
        setSent(true);
    };

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

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in touch</h1>
                        <p className="text-xl text-slate-400 mb-12">
                            Have questions about our AI agents? Need a custom enterprise solution?
                            Our team is ready to help you automate your future.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <Mail className="w-6 h-6 text-cyan-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Email Us</h3>
                                    <p className="text-slate-400">support@neuroflux.ai</p>
                                    <p className="text-slate-400">sales@neuroflux.ai</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <MapPin className="w-6 h-6 text-cyan-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Headquarters</h3>
                                    <p className="text-slate-400">101 AI Boulevard, Tech District</p>
                                    <p className="text-slate-400">San Francisco, CA 94107</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                    <Phone className="w-6 h-6 text-cyan-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Call Us</h3>
                                    <p className="text-slate-400">+1 (555) 123-4567</p>
                                    <p className="text-slate-500 text-sm">Mon-Fri from 8am to 5pm PST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                        {sent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-400 mb-8">We'll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-mono text-slate-500 mb-2">FULL NAME</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-slate-500 mb-2">EMAIL ADDRESS</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-2">SUBJECT</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    >
                                        <option value="">Select a topic...</option>
                                        <option value="sales">Sales Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-2">MESSAGE</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Send Message <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
