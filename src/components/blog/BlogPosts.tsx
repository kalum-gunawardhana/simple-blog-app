'use client';

import { useState, useEffect } from 'react';
import { PostCard } from '@/app/components/blog/PostCard';
import { useAuth } from '@/app/hooks/useAuth';

export function BlogPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        // Simulate fetching posts from Supabase
        const fetchPosts = async () => {
            const mockPosts = [
                {
                    id: '1',
                    title: 'Getting Started with Next.js 13',
                    excerpt: 'Learn the fundamentals of Next.js 13 and its new app directory structure.',
                    author: 'John Doe',
                    publishedAt: new Date('2024-01-20'),
                    isPremium: false,
                    tags: ['Next.js', 'React', 'Tutorial'],
                    readTime: 5
                },
                {
                    id: '2',
                    title: 'Advanced React Patterns for Production Applications',
                    excerpt: 'Explore advanced React patterns including compound components, render props, and more.',
                    author: 'Sarah Johnson',
                    publishedAt: new Date('2024-01-18'),
                    isPremium: true,
                    tags: ['React', 'JavaScript', 'Advanced'],
                    readTime: 8
                },
                {
                    id: '3',
                    title: 'Building Scalable APIs with Supabase',
                    excerpt: 'Learn how to build and scale your backend with Supabase.',
                    author: 'Mike Chen',
                    publishedAt: new Date('2024-01-15'),
                    isPremium: false,
                    tags: ['Supabase', 'API', 'Backend'],
                    readTime: 6
                },
                {
                    id: '4',
                    title: 'Mastering TypeScript in React Applications',
                    excerpt: 'Deep dive into TypeScript patterns and best practices for React development.',
                    author: 'Emily Rodriguez',
                    publishedAt: new Date('2024-01-12'),
                    isPremium: true,
                    tags: ['TypeScript', 'React', 'Best Practices'],
                    readTime: 10
                }
            ];

            setPosts(mockPosts);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="flex space-x-2">
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}