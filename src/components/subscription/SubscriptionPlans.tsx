import { Check, Crown, Star } from 'lucide-react';

interface SubscriptionPlansProps {
    onSelectPlan: (planId: string) => void;
}

export function SubscriptionPlans({ onSelectPlan }: SubscriptionPlansProps) {
    const plans = [
        {
            id: 'monthly',
            name: 'Monthly',
            price: '$9',
            period: 'per month',
            features: [
                'Access to all premium articles',
                'Monthly newsletter',
                'Comment on articles',
                'Mobile app access',
                'Cancel anytime'
            ]
        },
        {
            id: 'yearly',
            name: 'Yearly',
            price: '$89',
            period: 'per year',
            popular: true,
            features: [
                'Access to all premium articles',
                'Monthly newsletter',
                'Comment on articles',
                'Mobile app access',
                'Priority support',
                'Exclusive events access',
                'Save 17% compared to monthly'
            ]
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className={`relative bg-white rounded-lg shadow-sm border-2 p-8 ${plan.popular ? 'border-blue-600' : 'border-gray-200'
                        }`}
                >
                    {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                <Star className="h-4 w-4 mr-1" />
                                Most Popular
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                            <Crown className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                        <div className="mt-2">
                            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                            <span className="text-gray-600 ml-2">{plan.period}</span>
                        </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => onSelectPlan(plan.id)}
                        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${plan.popular
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            }`}
                    >
                        Choose {plan.name}
                    </button>
                </div>
            ))}
        </div>
    );
}