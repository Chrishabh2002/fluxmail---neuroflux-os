import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';

export const SuperAdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [accessKey, setAccessKey] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Hardcoded Super Admin Key for Demo
        // In production, this would verify against a secure backend endpoint
        setTimeout(() => {
            if (accessKey === 'NEUROFLUX-MASTER-KEY-8829') {
                localStorage.setItem('neuroflux_super_admin', 'true');
                setLoading(false);
                navigate('/super-admin/dashboard');
            } else {
                setError('Invalid Master Access Key. Access Denied.');
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[128px]" />

            <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="bg-red-500/10 p-4 rounded-2xl border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                        <ShieldCheck className="w-10 h-10 text-red-500" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-wider">SUPER ADMIN</h2>
                    <p className="text-red-400/60 text-xs font-mono uppercase tracking-widest">Restricted Access // Level 5 Clearance</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-950/50 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1.5 ml-1">MASTER ACCESS KEY</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="password"
                                required
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors font-mono tracking-widest"
                                placeholder="ENTER-KEY-HERE"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/20"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Authenticate <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
                    <p className="text-xs text-slate-600 font-mono">
                        UNAUTHORIZED ACCESS ATTEMPTS WILL BE LOGGED AND REPORTED.
                    </p>
                </div>
            </div>
        </div>
    );
};
