import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, ArrowRight, Loader2, CheckCircle2, Mail, RefreshCw } from 'lucide-react';

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'details' | 'verify'>('details');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Verification State
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(30);

    // Timer for resend code
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === 'verify' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [step, timeLeft]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup-init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false);
                setStep('verify');
                setTimeLeft(30);
                // If dev mode (no email creds), the server logs the OTP. 
                // In prod, it sends email.
                if (data.message.includes("Check server console")) {
                    alert("DEV MODE: Check your backend terminal for the OTP code!");
                } else {
                    alert(`Verification code sent to ${formData.email}`);
                }
            } else {
                alert(data.message || "Signup failed");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to connect to server. Is the backend running?");
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredCode = verificationCode.join('');

        if (enteredCode.length !== 6) {
            alert("Please enter the full 6-digit code.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    otp: enteredCode
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('neuroflux_token', data.token);
                localStorage.setItem('neuroflux_user', JSON.stringify(data.user));
                setLoading(false);
                navigate('/dashboard');
            } else {
                alert(data.message || "Verification failed");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("Verification error");
            setLoading(false);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const resendCode = async () => {
        if (timeLeft > 0) return;
        setLoading(true);

        // Re-trigger signup init to resend email
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup-init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setLoading(false);
                setTimeLeft(30);
                alert("New code sent!");
            } else {
                setLoading(false);
                alert("Failed to resend code");
            }
        } catch (e) {
            setLoading(false);
            alert("Network error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px]" />

            <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                        <BrainCircuit className="w-8 h-8 text-cyan-400" />
                    </div>
                </div>

                {step === 'details' ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-white mb-2">Initialize System</h2>
                        <p className="text-slate-400 text-center mb-8 text-sm">Create your neural identity to begin.</p>

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-slate-500 mb-1.5 ml-1">FULL NAME</label>
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
                                <label className="block text-xs font-mono text-slate-500 mb-1.5 ml-1">EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 mb-1.5 ml-1">PASSWORD</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Verify Identity <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Verify Email</h2>
                            <p className="text-slate-400 text-sm">
                                We've sent a 6-digit code to <br />
                                <span className="text-white font-medium">{formData.email}</span>
                            </p>
                        </div>

                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="flex justify-center gap-2">
                                {verificationCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`code-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-10 h-12 text-center bg-slate-950 border border-slate-800 rounded-lg text-lg font-bold text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || verificationCode.join('').length !== 6}
                                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Confirm Access <CheckCircle2 className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={resendCode}
                                    disabled={timeLeft > 0 || loading}
                                    className="text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                                    {timeLeft > 0 ? `Resend code in ${timeLeft}s` : 'Resend Verification Code'}
                                </button>
                            </div>
                        </form>
                    </>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        {step === 'verify' ? (
                            <button onClick={() => setStep('details')} className="text-slate-400 hover:text-white transition-colors">
                                ← Back to details
                            </button>
                        ) : (
                            <>
                                Already have an identity?{' '}
                                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                                    Access System
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};
