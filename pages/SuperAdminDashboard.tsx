import React, { useState, useEffect } from 'react';
import { adminService, Organization, SystemStats, RevenueStats, UserDetails } from '../services/adminService';
import {
    LayoutDashboard, Building2, Key, Users, Activity,
    Plus, Search, Ban, CheckCircle, LogOut, ShieldCheck,
    Server, Globe, Database, Terminal, AlertOctagon,
    Cpu, HardDrive, Network, Lock, Zap, FileText,
    DollarSign, TrendingUp, CreditCard, Eye, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SuperAdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [revenueStats, setRevenueStats] = useState<RevenueStats | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'revenue' | 'infrastructure'>('overview');

    // Provisioning State
    const [showProvisionModal, setShowProvisionModal] = useState(false);
    const [newOrgName, setNewOrgName] = useState('');
    const [newOrgPlan, setNewOrgPlan] = useState<Organization['plan']>('Enterprise');

    // User Inspection State
    const [inspectingUser, setInspectingUser] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const isSuperAdmin = localStorage.getItem('neuroflux_super_admin');
            if (!isSuperAdmin) {
                navigate('/super-admin/login', { replace: true });
            }
        };

        checkAuth();
        fetchData();
        const interval = setInterval(fetchData, 2000);

        // Prevent back button navigation
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, '', window.location.href);
        };

        return () => {
            clearInterval(interval);
            window.onpopstate = null;
        };
    }, [navigate]);

    const fetchData = async () => {
        try {
            const s = await adminService.getSystemStats();
            setStats(s);
            const orgs = await adminService.getOrganizations();
            setOrganizations(orgs);
            const rev = await adminService.getRevenueStats();
            setRevenueStats(rev);
        } catch (e) {
            console.error("Dashboard Sync Error:", e);
        }
    };

    const handleProvisionOrg = async () => {
        if (!newOrgName) return;
        await adminService.createOrganization(newOrgName, newOrgPlan);
        await fetchData();
        setShowProvisionModal(false);
        setNewOrgName('');
    };

    const handleRevokeAccess = async (id: string) => {
        if (window.confirm('CRITICAL ACTION: Suspend this organization? Access will be immediately revoked.')) {
            await adminService.revokeAccess(id);
            await fetchData();
        }
    };

    const handleInspectUser = async (userId: string) => {
        setInspectingUser(userId);
        const details = await adminService.getUserDetails(userId);
        setUserDetails(details);
    };

    const handleLogout = () => {
        localStorage.removeItem('neuroflux_super_admin');
        navigate('/super-admin/login', { replace: true });
    };

    // --- Renderers ---

    const renderSidebar = () => (
        <div className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col h-full fixed left-0 top-16 z-10 pb-6">
            <div className="p-4 space-y-2">
                {[
                    { id: 'overview', label: 'Global Overview', icon: Globe },
                    { id: 'revenue', label: 'Revenue & Subs', icon: DollarSign },
                    { id: 'tenants', label: 'Tenant Management', icon: Building2 },
                    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group ${activeTab === item.id
                                ? 'bg-red-950/30 text-red-400 border border-red-900/50'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-red-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="mt-auto p-6 border-t border-slate-900 mb-8">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">System Status</h4>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-mono font-bold">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                        OPERATIONAL
                    </div>
                    <p className="text-[10px] text-slate-600 mt-1 font-mono">v2.5.0-RC1 // STABLE</p>
                </div>
            </div>
        </div>
    );

    const renderOverview = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* High Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-red-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono text-slate-500">TOTAL TENANTS</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{organizations.length}</h3>
                    <p className="text-sm text-slate-500">Active Organizations</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-green-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono text-slate-500">TOTAL REVENUE</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">${revenueStats?.totalRevenue.toLocaleString() || 0}</h3>
                    <p className="text-sm text-slate-500">Lifetime Earnings</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono text-slate-500">GLOBAL USERS</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{stats?.totalUsers || 0}</h3>
                    <p className="text-sm text-slate-500">Registered Accounts</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono text-slate-500">UPTIME</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{(stats?.uptime / 3600).toFixed(1) || 0}h</h3>
                    <p className="text-sm text-slate-500">Since Last Reboot</p>
                </div>
            </div>

            {/* Advanced Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-red-500" /> Live Resource Consumption
                    </h3>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                                    <circle cx="64" cy="64" r="56" stroke="#ef4444" strokeWidth="12" fill="none"
                                        strokeDasharray="351" strokeDashoffset={351 - (351 * (stats?.cpuLoad || 0)) / 100}
                                        className="transition-all duration-1000" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{stats?.cpuLoad}%</span>
                                    <span className="text-xs text-slate-500">CPU</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400">{stats?.cpuModel || 'Generic CPU'}</p>
                            <p className="text-xs text-slate-600">{stats?.cpuCores} Cores Active</p>
                        </div>

                        <div className="text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                                    <circle cx="64" cy="64" r="56" stroke="#3b82f6" strokeWidth="12" fill="none"
                                        strokeDasharray="351" strokeDashoffset={351 - (351 * (stats?.memoryUsage || 0)) / 100}
                                        className="transition-all duration-1000" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{stats?.memoryUsage}%</span>
                                    <span className="text-xs text-slate-500">RAM</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400">System Memory</p>
                            <p className="text-xs text-slate-600">High Performance Allocator</p>
                        </div>

                        <div className="text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                                    <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="none"
                                        strokeDasharray="351" strokeDashoffset={351 - (351 * 45) / 100}
                                        className="transition-all duration-1000" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-white">45%</span>
                                    <span className="text-xs text-slate-500">DISK</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400">NVMe Storage</p>
                            <p className="text-xs text-slate-600">Encrypted Volume</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-yellow-500" /> System Logs
                    </h3>
                    <div className="flex-1 bg-black rounded-xl p-4 font-mono text-xs overflow-y-auto custom-scrollbar border border-slate-800/50 shadow-inner">
                        <div className="space-y-2">
                            <div className="text-green-400">[SYSTEM] Kernel initialized successfully</div>
                            <div className="text-blue-400">[NETWORK] Port 5003 listening for secure traffic</div>
                            <div className="text-slate-500">[AUDIT] Super Admin session started from 127.0.0.1</div>
                            {organizations.slice(-3).map(org => (
                                <div key={org.id} className="text-yellow-400">
                                    [PROVISION] New tenant {org.name} onboarded ({org.plan})
                                </div>
                            ))}
                            <div className="text-slate-500 animate-pulse">_ Waiting for input...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderRevenue = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" /> Monthly Recurring Revenue (MRR)
                    </h3>
                    <div className="text-4xl font-bold text-white mb-1">${revenueStats?.mrr.toLocaleString() || 0}</div>
                    <p className="text-sm text-slate-500">Projected Annual: ${(revenueStats?.mrr * 12).toLocaleString()}</p>

                    <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[75%]"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Current</span>
                        <span>Goal: $100k</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-500" /> Recent Transactions
                    </h3>
                    <div className="space-y-3 mt-4 max-h-48 overflow-y-auto custom-scrollbar">
                        {revenueStats?.transactions.map((tx) => (
                            <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                                <div>
                                    <p className="text-sm font-bold text-white">{tx.orgName}</p>
                                    <p className="text-xs text-slate-500">{tx.plan} • {tx.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-400">+${tx.amount}</p>
                                    <p className="text-[10px] text-slate-600">{new Date(tx.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTenants = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white">Tenant Management</h2>
                    <p className="text-slate-500">Full control over all registered organizations.</p>
                </div>
                <button
                    onClick={() => setShowProvisionModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 hover:scale-105"
                >
                    <Plus className="w-5 h-5" /> Provision New Tenant
                </button>
            </div>

            {showProvisionModal && (
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 animate-in slide-in-from-top-4 shadow-2xl mb-6">
                    <h3 className="text-md font-semibold text-slate-200 mb-4">Provision New License</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs text-slate-500 mb-1">Company Name</label>
                            <input
                                type="text"
                                value={newOrgName}
                                onChange={(e) => setNewOrgName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-red-500 outline-none"
                                placeholder="e.g. Wayne Enterprises"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-500 mb-1">Plan Tier</label>
                            <select
                                value={newOrgPlan}
                                onChange={(e) => setNewOrgPlan(e.target.value as any)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-red-500 outline-none"
                            >
                                <option value="Starter">Starter</option>
                                <option value="Enterprise">Enterprise</option>
                                <option value="NeuroLink">NeuroLink (Unlimited)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setShowProvisionModal(false)} className="px-3 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
                        <button onClick={handleProvisionOrg} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-500">Generate License</button>
                    </div>
                </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-5">Organization</th>
                            <th className="px-6 py-5">Subscription</th>
                            <th className="px-6 py-5">Revenue</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-right">Controls</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {organizations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Building2 className="w-10 h-10 text-slate-700" />
                                        <p>No organizations found. Provision a new tenant to get started.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            organizations.map((org) => (
                                <tr key={org.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
                                                <Building2 className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="text-base font-bold">{org.name}</p>
                                                <p className="text-xs text-slate-500">ID: {org.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${org.plan === 'NeuroLink' ? 'bg-purple-950/30 text-purple-400 border-purple-500/30' :
                                                org.plan === 'Enterprise' ? 'bg-blue-950/30 text-blue-400 border-blue-500/30' :
                                                    'bg-slate-800 text-slate-400 border-slate-600'
                                            }`}>
                                            {org.plan}
                                        </span>
                                        <p className="text-[10px] text-slate-500 mt-1 ml-1">{org.renewalCount} Renewals</p>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-green-400 font-bold">
                                        ${org.totalRevenue.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-2 text-xs font-bold ${org.status === 'Active' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            <div className={`w-2 h-2 rounded-full ${org.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                            {org.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleInspectUser(org.id)}
                                                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                                                title="Inspect Activity"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleRevokeAccess(org.id)}
                                                className="p-2 hover:bg-red-950/50 text-slate-500 hover:text-red-400 rounded-lg border border-transparent hover:border-red-900/50"
                                                title="Revoke Access"
                                            >
                                                <Ban className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderInfrastructure = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-white mb-6">Infrastructure Control</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-blue-500" /> Server Specifications
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-slate-800">
                            <span className="text-slate-500">OS Platform</span>
                            <span className="text-white font-mono">{stats?.platform} ({stats?.arch})</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-800">
                            <span className="text-slate-500">CPU Architecture</span>
                            <span className="text-white font-mono">{stats?.cpuModel}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-800">
                            <span className="text-slate-500">Logical Cores</span>
                            <span className="text-white font-mono">{stats?.cpuCores} Threads</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-800">
                            <span className="text-slate-500">Network Interfaces</span>
                            <span className="text-white font-mono">{stats?.networkInterfaces} Active</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-500" /> Database Cluster
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Primary Node</p>
                                    <p className="text-xs text-slate-500">127.0.0.1:27017</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-green-400 bg-green-950/30 px-2 py-1 rounded">HEALTHY</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-800 rounded-lg text-slate-500">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-400">Replica Node A</p>
                                    <p className="text-xs text-slate-600">Syncing...</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-yellow-400 bg-yellow-950/30 px-2 py-1 rounded">STANDBY</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-500/30">
            {/* Top Bar */}
            <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-600/20">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="font-bold tracking-wider text-white text-lg">SUPER<span className="text-red-500">ADMIN</span> <span className="text-slate-600 text-xs ml-2 font-normal">v2.5.0</span></h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-red-950/30 border border-red-900/50 rounded-full text-xs text-red-400 font-mono flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        GOD MODE ACTIVE
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {renderSidebar()}

            <main className="pl-64 pt-8 p-8 max-w-7xl mx-auto">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'revenue' && renderRevenue()}
                {activeTab === 'tenants' && renderTenants()}
                {activeTab === 'infrastructure' && renderInfrastructure()}
            </main>

            {/* User Inspector Modal */}
            {inspectingUser && userDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                                    {userDetails.user?.name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{userDetails.user?.name || 'Unknown User'}</h3>
                                    <p className="text-sm text-slate-500">{userDetails.user?.email}</p>
                                </div>
                            </div>
                            <button onClick={() => setInspectingUser(null)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Live Session State */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                                <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-green-500" /> Live Session Telemetry
                                </h4>
                                <div className="space-y-3 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Current Path:</span>
                                        <span className="text-green-400">{userDetails.liveState.currentPath}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Last Action:</span>
                                        <span className="text-blue-400">{userDetails.liveState.lastAction}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Session Time:</span>
                                        <span className="text-white">{userDetails.liveState.sessionDuration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">IP Address:</span>
                                        <span className="text-slate-400">{userDetails.liveState.ip}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Log */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
                                <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-yellow-500" /> Activity Log
                                </h4>
                                <div className="flex-1 overflow-y-auto max-h-48 space-y-2 custom-scrollbar">
                                    {userDetails.logs.length > 0 ? userDetails.logs.map((log) => (
                                        <div key={log.id} className="text-xs font-mono">
                                            <span className="text-slate-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
                                            <span className="text-slate-300">{log.action}</span>
                                        </div>
                                    )) : (
                                        <div className="text-xs text-slate-600 italic">No recent activity logs found.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
