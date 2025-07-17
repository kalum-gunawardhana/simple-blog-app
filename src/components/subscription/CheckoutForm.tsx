'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Shield } from 'lucide-react';

interface CheckoutFormProps {
    planId: string;
    onBack: () => void;
}

export function CheckoutForm({ planId, onBack }: CheckoutFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: '',
        country: 'US'
    });

    const planDetails = {
        monthly: { name: 'Monthly', price: '$9.00', period: 'per month' },
        yearly: { name: 'Yearly', price: '$89.00', period: 'per year' }
    };

    const plan = planDetails[planId as keyof typeof planDetails];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // This would normally integrate with Stripe
        console.log('Processing payment for:', { planId, formData });

        setLoading(false);
        alert('Payment successful! Welcome to BlogHub Premium!');
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
                            Payment Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Number
                                </label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.cardNumber}
                                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="1234 5678 9012 3456"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.expiry}
                                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="MM/YY"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cvc}
                                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="123"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cardholder Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                {loading ? 'Processing...' : `Subscribe for ${plan.price}`}
                            </button>
                        </form>
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

                        <div className="text-xs text-gray-500">
                            By subscribing, you agree to our Terms of Service and Privacy Policy.
                            You can cancel your subscription at any time.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}