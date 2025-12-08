import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Replace with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_51O...');

const CheckoutForm = ({ plan, price }: { plan: string, price: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        // Simulating a payment process for demo purposes
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const token = localStorage.getItem('neuroflux_token');
            if (token) {
                const res = await fetch('http://localhost:5003/api/user/upgrade', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ plan: plan })
                });

                if (!res.ok) throw new Error('Upgrade failed');
            }

            // Mock success
            setSucceeded(true);
            setProcessing(false);

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Payment succeeded but upgrade failed. Please contact support.');
            setProcessing(false);
        }
    };

    if (succeeded) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                <p className="text-slate-400">Redirecting to your dashboard...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">Selected Plan</span>
                    <span className="font-bold text-white">{plan}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-cyan-400">
                    <span>Total</span>
                    <span>{price}/mo</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#fff',
                                    '::placeholder': {
                                        color: '#64748b',
                                    },
                                },
                                invalid: {
                                    color: '#ef4444',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/30 p-3 rounded-lg border border-red-900/30">
                    <AlertCircle className="w-4 h-4" /> {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {processing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                ) : (
                    <>
                        <Lock className="w-4 h-4" /> Pay {price}
                    </>
                )}
            </button>

            <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Payments secured by Stripe
            </p>
        </form>
    );
};

export const Checkout: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const plan = queryParams.get('plan') || 'Pro';
    const price = queryParams.get('price') || '$29';

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-2xl font-bold mb-8 text-center">Complete your subscription</h1>
                <Elements stripe={stripePromise}>
                    <CheckoutForm plan={plan} price={price} />
                </Elements>
            </div>
        </div>
    );
};
