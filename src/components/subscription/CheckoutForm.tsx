'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CheckoutFormProps {
    planId: string;
    onBack: () => void;
}

export function CheckoutForm({ planId, onBack }: CheckoutFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { user } = useAuth();

    const planDetails = {
        monthly: { name: 'Monthly', price: '$9.00', period: 'per month' },
        yearly: { name: 'Yearly', price: '$89.00', period: 'per year' }
    };

    const plan = planDetails[planId as keyof typeof planDetails];

    const handleCheckout = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!user) {
                router.push('/auth');
                return;
            }

            const response = await fetch('/api/stripe/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch (err) {
            console.error('Error creating checkout session:', err);
            setError('Failed to start checkout process. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Plans
            </button>

            <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Checkout
                        </h2>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-red-800">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {loading ? 'Processing...' : `Subscribe for ${plan.price}`}
                        </button>

                        <div className="mt-4 text-sm text-gray-500">
                            By clicking subscribe, you will be redirected to Stripe to complete your purchase securely.
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Order Summary
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Plan</span>
                                <span className="font-medium">{plan.name}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Price</span>
                                <span className="font-medium">{plan.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Billing</span>
                                <span className="font-medium">{plan.period}</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-lg font-bold text-blue-600">{plan.price}</span>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-4">
                            <Shield className="h-4 w-4 mr-2" />
                            <span>Secured by Stripe. Cancel anytime.</span>
                        </div>

                        <p className="text-xs text-gray-500">
                            By subscribing, you agree to our Terms of Service and Privacy Policy.
                            You can cancel your subscription at any time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}