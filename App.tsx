import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages for High Performance
const LandingPage = lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const Demo = lazy(() => import('./pages/Demo').then(module => ({ default: module.Demo })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const Login = lazy(() => import('./pages/auth/Login').then(module => ({ default: module.Login })));
const Signup = lazy(() => import('./pages/auth/Signup').then(module => ({ default: module.Signup })));
const SuperAdminLogin = lazy(() => import('./pages/auth/SuperAdminLogin').then(module => ({ default: module.SuperAdminLogin })));
const SuperAdminDashboard = lazy(() => import('./pages/SuperAdminDashboard').then(module => ({ default: module.SuperAdminDashboard })));
const DashboardLayout = lazy(() => import('./components/DashboardLayout').then(module => ({ default: module.DashboardLayout })));

// Lazy Load Panels
const EmailPanel = lazy(() => import('./components/EmailPanel').then(module => ({ default: module.EmailPanel })));
const ResearchPanel = lazy(() => import('./components/ResearchPanel').then(module => ({ default: module.ResearchPanel })));
const CRMPanel = lazy(() => import('./components/CRMPanel').then(module => ({ default: module.CRMPanel })));
const AutomationPanel = lazy(() => import('./components/AutomationPanel').then(module => ({ default: module.AutomationPanel })));
const SupportPanel = lazy(() => import('./components/SupportPanel').then(module => ({ default: module.SupportPanel })));
const AnalyticsPanel = lazy(() => import('./components/AnalyticsPanel').then(module => ({ default: module.AnalyticsPanel })));
const VoicePanel = lazy(() => import('./components/VoicePanel').then(module => ({ default: module.VoicePanel })));
const ForgePanel = lazy(() => import('./components/ForgePanel').then(module => ({ default: module.ForgePanel })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));
const CollabPanel = lazy(() => import('./components/CollabPanel').then(module => ({ default: module.CollabPanel })));

const LoadingScreen = () => (
    <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-slate-500 font-mono text-sm">INITIALIZING NEUROFLUX OS...</p>
        </div>
    </div>
);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Super Admin Routes */}
                    <Route path="/super-admin/login" element={<SuperAdminLogin />} />
                    <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />

                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Navigate to="email" replace />} />
                        <Route path="email" element={<EmailPanel />} />
                        <Route path="research" element={<ResearchPanel />} />
                        <Route path="crm" element={<CRMPanel />} />
                        <Route path="automation" element={<AutomationPanel />} />
                        <Route path="support" element={<SupportPanel />} />
                        <Route path="analytics" element={<AnalyticsPanel />} />
                        <Route path="voice" element={<VoicePanel />} />
                        <Route path="collab" element={<CollabPanel />} />
                        <Route path="forge" element={<ForgePanel />} />
                        <Route path="admin" element={<AdminPanel />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
