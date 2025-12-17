import React, { useState, useEffect } from 'react'
import { analyzeAdminAction } from '../services/geminiService'
import { adminService, SystemStats } from '../services/adminService'
import { AdminActionResponse, User, SystemLog, SystemSettings } from '../types'
import {
  ShieldCheck, Sparkles, ClipboardList, TerminalSquare, AlertTriangle,
  Users, Settings, Activity, LayoutDashboard, Search, Plus, MoreVertical,
  CheckCircle, XCircle, RefreshCw, Server, Database, Menu, ChevronRight, Trash2
} from 'lucide-react'

const INITIAL_SETTINGS: SystemSettings = {
  email_module: true,
  crm_module: true,
  research_module: true,
  automation_module: true,
  support_module: true,
  analytics_module: true,
  voice_module: true,
  forge_module: false,
  collab_module: true,
  analytics_refresh: '1h',
  automation_safety: 'Strict'
}

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'settings' | 'logs' | 'ai'>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Live Data State
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [logs, setLogs] = useState<SystemLog[]>([])

  // AI Command State
  const [request, setRequest] = useState('')
  const [result, setResult] = useState<AdminActionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data State
  const [users, setUsers] = useState<User[]>([])
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS)

  // User Management State
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer', password: '' })
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  // --- Real-time Data Effects ---

  useEffect(() => {
    // Initial Fetch
    fetchData()

    // Polling Intervals
    const statsInterval = setInterval(async () => {
      const newStats = await adminService.getSystemStats()
      setStats(newStats)
    }, 1000) // Update stats every second

    const logsInterval = setInterval(async () => {
      const newLogs = await adminService.getRealtimeLogs()
      setLogs(newLogs)
    }, 2500) // Poll logs

    return () => {
      clearInterval(statsInterval)
      clearInterval(logsInterval)
    }
  }, [])

  const fetchData = async () => {
    const s = await adminService.getSystemStats()
    setStats(s)
    const u = await adminService.getUsers()
    setUsers(u)
  }

  // --- Handlers ---

  const handleAnalyze = async () => {
    if (!request.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await analyzeAdminAction(request)
      setResult(res)
    } catch (e: any) {
      setError(e?.message || 'Admin analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const quickFill = (text: string) => {
    setRequest(text)
  }

  const toggleSetting = (key: keyof SystemSettings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }
  }

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) return;
    try {
      await adminService.createUser(newUser as any);
      setShowAddUserModal(false);
      setNewUser({ name: '', email: '', role: 'Viewer', password: '' });
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Failed to create user');
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(id);
        fetchData();
      } catch (e) {
        console.error(e);
        alert('Failed to delete user');
      }
    }
    setActiveMenu(null);
  }

  // --- Renderers ---

  const renderSidebar = () => (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 h-full`}>
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        {sidebarOpen && <h2 className="font-bold text-slate-100 tracking-wider">ADMIN<span className="text-cyan-500">OS</span></h2>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
          {sidebarOpen ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5 mx-auto" />}
        </button>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'settings', label: 'System Settings', icon: Settings },
          { id: 'logs', label: 'Audit Logs', icon: Activity },
          { id: 'ai', label: 'AI Command', icon: TerminalSquare },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === item.id
              ? 'bg-cyan-950/30 text-cyan-400 border border-cyan-900/50'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-500'}`} />
            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            {sidebarOpen && activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
            CR
          </div>
          {sidebarOpen && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-200 truncate">Chris Rishabh</p>
              <p className="text-xs text-slate-500 truncate">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderOverview = () => {
    if (!stats) return <div className="p-10 text-slate-500">Initializing Telemetry...</div>

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12%', icon: Users, color: 'text-blue-400' },
            { label: 'System Health', value: `${stats.systemHealth}%`, change: 'Stable', icon: Activity, color: 'text-green-400' },
            { label: 'Active Sessions', value: stats.activeSessions.toLocaleString(), change: '+5%', icon: Server, color: 'text-purple-400' },
            { label: 'Network Traffic', value: `${stats.networkTraffic} Mbps`, change: 'High', icon: Activity, color: 'text-cyan-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-slate-800/50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-500" /> Real-time CPU Load
            </h3>
            <div className="flex items-center justify-center h-48">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * stats.cpuLoad) / 100}
                    className="transition-all duration-1000 ease-out"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-bold text-slate-100">{stats.cpuLoad}%</span>
                  <p className="text-xs text-slate-500">LOAD</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-500" /> Active Modules
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(settings).filter(([k, v]) => typeof v === 'boolean' && k.includes('module')).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-800">
                  <span className="text-sm text-slate-300 capitalize">{key.replace('_module', '')}</span>
                  <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-600'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderUsers = () => (
    <div className="space-y-4 animate-in fade-in duration-500 relative">
      {showAddUserModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Add New User</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-cyan-500 outline-none"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-cyan-500 outline-none"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-cyan-500 outline-none"
                value={newUser.password}
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              />
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-cyan-500 outline-none"
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddUserModal(false)} className="px-3 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
              <button onClick={handleAddUser} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-500">Create User</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 w-64"
          />
        </div>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-visible">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/50 text-slate-400 font-medium">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Active</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No users found in the system.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors relative">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${user.role === 'Admin' ? 'bg-purple-950/30 text-purple-400 border-purple-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${user.verified ? 'text-green-400' : 'text-slate-500'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.verified ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                      {user.verified ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">Just now</td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeMenu === user.id && (
                      <div className="absolute right-8 top-8 w-32 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-20 py-1">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-slate-800 flex items-center gap-2"
                        >
                          <Trash2 className="w-3 h-3" /> Delete User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-500" /> Module Configuration
        </h3>
        <div className="space-y-4">
          {Object.entries(settings).filter(([k, v]) => typeof v === 'boolean').map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${value ? 'bg-cyan-950/30 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-200 capitalize">{key.replace('_module', '').replace('_', ' ')} Module</p>
                  <p className="text-xs text-slate-500">Enable or disable this subsystem</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting(key as keyof SystemSettings)}
                className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-cyan-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Security Policy</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2 uppercase">Automation Safety Level</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50"
                value={settings.automation_safety}
                onChange={(e) => setSettings({ ...settings, automation_safety: e.target.value as any })}
              >
                <option value="Strict">Strict (Recommended)</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Data Refresh</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2 uppercase">Analytics Interval</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50"
                value={settings.analytics_refresh}
                onChange={(e) => setSettings({ ...settings, analytics_refresh: e.target.value as any })}
              >
                <option value="1h">Every 1 Hour</option>
                <option value="6h">Every 6 Hours</option>
                <option value="24h">Every 24 Hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLogs = () => (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
          <h3 className="font-semibold text-slate-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-500" /> Live System Stream
          </h3>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-slate-500 font-mono">LIVE</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
          <div className="divide-y divide-slate-800/50">
            {logs.map((log) => (
              <div key={log.id} className="p-3 hover:bg-slate-800/30 transition-colors flex items-start gap-3 animate-in slide-in-from-left-2 duration-300">
                <div className={`mt-1 p-1 rounded-full ${log.type === 'info' ? 'bg-blue-950/30 text-blue-400' :
                  log.type === 'warning' ? 'bg-yellow-950/30 text-yellow-400' :
                    'bg-red-950/30 text-red-400'
                  }`}>
                  {log.type === 'info' ? <CheckCircle className="w-3 h-3" /> :
                    log.type === 'warning' ? <AlertTriangle className="w-3 h-3" /> :
                      <XCircle className="w-3 h-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-300 truncate">{log.action}</p>
                    <span className="text-[10px] text-slate-600 font-mono ml-2 whitespace-nowrap">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{log.details}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">User: {log.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAI = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-500">
      <div className="lg:col-span-5 h-full flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <TerminalSquare className="w-4 h-4" /> Command Interface
            </h2>
          </div>

          <div className="space-y-3 flex-1">
            <label className="text-xs text-slate-500 font-mono ml-1">NATURAL LANGUAGE REQUEST</label>
            <textarea
              className="w-full h-48 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none font-mono"
              placeholder="e.g., Add user Rishabh as Admin to Team Alpha, or Rotate API key for Gemini service..."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => quickFill("Add user 'Rishabh' as Admin to Team Alpha")}
              className="px-3 py-1 text-xs rounded border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-600/40 hover:bg-cyan-950/30 transition-colors"
            >
              Add Admin User
            </button>
            <button
              onClick={() => quickFill("Rotate API key for service 'genai' and store prefix only")}
              className="px-3 py-1 text-xs rounded border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-600/40 hover:bg-cyan-950/30 transition-colors"
            >
              Rotate API Key
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAnalyze}
              disabled={loading || !request}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${loading || !request
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/20'
                }`}
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> PROCESSING...
                </>
              ) : (
                <>
                  <TerminalSquare className="w-4 h-4" /> EXECUTE COMMAND
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 h-full flex flex-col">
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
                <ShieldCheck className="w-10 h-10 opacity-30" />
              </div>
              <p className="font-mono text-sm opacity-50">READY FOR ANALYSIS</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-cyan-400 space-y-6">
              <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              <div className="text-center space-y-1">
                <p className="text-lg font-mono">FLUX_ADMIN ENGINE</p>
                <p className="text-xs text-slate-500">Evaluating policies, roles, and secure operations...</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Analysis Complete</h3>
                  <p className="text-xs text-slate-500">Action plan generated successfully</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <ClipboardList className="w-4 h-4" /> Action Summary
                  </h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div><span className="text-slate-500">Type:</span> {result.action_type}</div>
                    <div><span className="text-slate-500">Status:</span> {result.status}</div>
                  </div>
                </div>
                <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" /> Reasoning
                  </h4>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{result.reasoning}</p>
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Suggested Next Steps</h4>
                <ul className="space-y-2">
                  {result.suggested_next_steps.map((s, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Affected Entities</h4>
                <div className="flex flex-wrap gap-2">
                  {result.affected_entities.map((e, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-full bg-slate-950 overflow-hidden">
      {renderSidebar()}

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950">
          <h1 className="text-xl font-bold text-slate-100">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'settings' && 'System Settings'}
            {activeTab === 'logs' && 'Audit Logs'}
            {activeTab === 'ai' && 'AI Command Center'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors relative">
              <Activity className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">v2.4.0-beta</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'logs' && renderLogs()}
          {activeTab === 'ai' && renderAI()}
        </div>
      </main>
    </div>
  )
}
