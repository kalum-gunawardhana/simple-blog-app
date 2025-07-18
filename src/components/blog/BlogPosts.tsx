'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PostCard } from '@/app/components/blog/PostCard';
import { useAuth } from '@/app/hooks/useAuth';
import { getPosts } from '@/lib/api';
import type { Post } from '@/lib/api';

export function BlogPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { user } = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        fetchPosts();
    }, [page, searchParams]);

    async function fetchPosts() {
        try {
            setLoading(true);
            setError(null);

            const searchQuery = searchParams.get('q') || '';
            const filter = searchParams.get('filter') || 'all';

            const result = await getPosts({
                page,
                limit: 10,
                search: searchQuery,
                tag: filter !== 'all' && !['free', 'premium', 'recent'].includes(filter) ? filter : undefined,
                isPremium: filter === 'premium' ? true : filter === 'free' ? false : undefined,
                orderBy: filter === 'recent' ? 'published_at' : undefined
            });

            setPosts(result.posts);
            setTotalPages(Math.ceil(result.total / result.limit));
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                {error}
            </div>
        );
    }

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

    if (posts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                No posts found.
            </div>
        );
    }

    return (
        <div>
            <div className="space-y-6 mb-8">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}