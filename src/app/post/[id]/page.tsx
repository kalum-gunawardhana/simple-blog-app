'use client';

import { useState, useEffect } from 'react';
import { BlogHeader } from '@/app/components/blog/BlogHeader';
import { PostContent } from '@/components/blog/PostContent';
import { SubscriptionGate } from '@/components/subscription/SubscriptionGate';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PostPage({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        // Simulate fetching post data
        const fetchPost = async () => {
            // This would normally fetch from Supabase
            const mockPost = {
                id: params.id,
                title: 'Advanced React Patterns for Production Applications',
                content: `
          <h2>Introduction</h2>
          <p>Modern React development requires understanding advanced patterns that help build scalable, maintainable applications...</p>
          <h2>Compound Components</h2>
          <p>This pattern allows you to create flexible, reusable components that work together...</p>
          <h2>Render Props</h2>
          <p>Render props provide a powerful way to share logic between components...</p>
        `,
                excerpt: 'Learn advanced React patterns including compound components, render props, and more.',
                author: 'Sarah Johnson',
                publishedAt: new Date('2024-01-15'),
                isPremium: true,
                tags: ['React', 'JavaScript', 'Advanced', 'Patterns'],
                readTime: 8
            };

            setPost(mockPost);
            setLoading(false);
        };

        fetchPost();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <BlogHeader />
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50">
                <BlogHeader />
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                    <Link href="/" className="text-blue-600 hover:text-blue-800">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const hasAccess = !post.isPremium || user?.subscription?.active;

    return (
        <div className="min-h-screen bg-gray-50">
            <BlogHeader />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Posts
                </Link>

                {hasAccess ? (
                    <PostContent post={post} />
                ) : (
                    <SubscriptionGate post={post} />
                )}
            </main>
        </div>
    );
}