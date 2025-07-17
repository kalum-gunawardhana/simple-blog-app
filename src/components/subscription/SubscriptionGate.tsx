import Link from 'next/link';
import { Crown, Lock } from 'lucide-react';

interface SubscriptionGateProps {
    post: {
        title: string;
        excerpt: string;
        author: string;
        tags: string[];
    };
}

export function SubscriptionGate({ post }: SubscriptionGateProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                        <Crown className="h-8 w-8 text-amber-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Premium Content</h1>
                    <p className="text-gray-600">
                        This article is available to premium subscribers only
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {post.author}</span>
                        <div className="flex gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <div className="inline-flex items-center text-gray-500 mb-6">
                        <Lock className="h-5 w-5 mr-2" />
                        <span>Subscribe to unlock this content</span>
                    </div>

                    <Link
                        href="/subscribe"
                        className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                        <Crown className="h-5 w-5 mr-2" />
                        Subscribe Now
                    </Link>

                    <p className="text-sm text-gray-500 mt-4">
                        Get access to all premium content and support quality writing
                    </p>
                </div>
            </div>
        </div>
    );
}