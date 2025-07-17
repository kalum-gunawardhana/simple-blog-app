'use client';

import { useState } from 'react';
import { BlogHeader } from '@/app/components/blog/BlogHeader';
import { SubscriptionPlans } from '@/app/components/subscription/SubscriptionPlans';
import { CheckoutForm } from '@/app/components/subscription/CheckoutForm';

export default function SubscribePage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <BlogHeader />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Unlock Premium Content
                    </h1>
                    <p className="text-xl text-gray-600">
                        Get access to exclusive articles, tutorials, and insights
                    </p>
                </div>

                {!selectedPlan ? (
                    <SubscriptionPlans onSelectPlan={setSelectedPlan} />
                ) : (
                    <CheckoutForm
                        planId={selectedPlan}
                        onBack={() => setSelectedPlan(null)}
                    />
                )}
            </main>
        </div>
    );
}