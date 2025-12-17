import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    BrainCircuit,
    Mail,
    Microscope,
    Briefcase,
    Zap,
    LifeBuoy,
    BarChart3,
    Mic,
    Hammer,
    ShieldCheck,
    Users,
    LogOut
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('neuroflux_user') || '{}');

    // --- SECURITY: Auth Check & History Guard ---
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('neuroflux_token');
            if (!token) {
                navigate('/login', { replace: true });
            }
        };

        checkAuth();

        // Prevent back button navigation after logout
        window.history.pushState(null, '', window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('neuroflux_token');
        localStorage.removeItem('neuroflux_user');
        navigate('/login', { replace: true });
    };

    const navItems = [
        { to: '/dashboard/email', icon: Mail, label: 'FluxMail' },
        { to: '/dashboard/research', icon: Microscope, label: 'FluxResearch' },
        { to: '/dashboard/crm', icon: Briefcase, label: 'FluxCRM' },
        { to: '/dashboard/automation', icon: Zap, label: 'FluxAutomate' },
        { to: '/dashboard/support', icon: LifeBuoy, label: 'FluxSupport' },
        { to: '/dashboard/analytics', icon: BarChart3, label: 'FluxAnalytics' },
        { to: '/dashboard/voice', icon: Mic, label: 'FluxVoice' },
        { to: '/dashboard/collab', icon: Users, label: 'FluxCollab' },
        { to: '/dashboard/forge', icon: Hammer, label: 'FluxForge' },
        { to: '/dashboard/admin', icon: ShieldCheck, label: 'Admin' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
                    <div className="bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20">
                        <BrainCircuit className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="font-bold tracking-tight text-white">NeuroFlux <span className="text-cyan-500">OS</span></span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
              `}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user.name || 'User'}</p>
                            <p className="text-xs text-slate-500 truncate">{user.email || 'user@neuroflux.os'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex md:hidden items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20">
                            <BrainCircuit className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="font-bold tracking-tight text-white">NeuroFlux <span className="text-cyan-500">OS</span></span>
                    </div>
                    {/* Add mobile menu toggle here if needed */}
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8 bg-slate-950 relative">
                    {/* Background Grid/Glow */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[128px]" />
                    </div>
                    <div className="relative z-10 h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
