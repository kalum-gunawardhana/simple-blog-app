'use client';
import { useState, useMemo } from 'react';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    publishedAt: Date;
    isPremium: boolean;
}

interface PostsManagerProps {
    onEditPost: (post: Post) => void;
}

export function PostsManager({ onEditPost }: PostsManagerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'premium' | 'free'>('all');

    // Mock posts data
    const posts = [
        {
            id: '1',
            title: 'Getting Started with Next.js',
            excerpt: 'Learn the basics of Next.js and start building modern web applications.',
            publishedAt: new Date('2024-01-20'),
            isPremium: false
        },
        {
            id: '2',
            title: 'Advanced React Patterns',
            excerpt: 'Deep dive into advanced React patterns and best practices.',
            publishedAt: new Date('2024-01-18'),
            isPremium: true
        }
    ];

    // Filter and search posts
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesFilter = 
                filter === 'all' ||
                (filter === 'premium' && post.isPremium) ||
                (filter === 'free' && !post.isPremium);

            return matchesSearch && matchesFilter;
        });
    }, [posts, searchQuery, filter]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
                <button
                    onClick={() => onEditPost({ id: '', title: '', excerpt: '', publishedAt: new Date(), isPremium: false })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    New Post
                </button>
            </div>

            <div className="flex gap-4 items-center">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'premium' | 'free')}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Posts</option>
                    <option value="premium">Premium Only</option>
                    <option value="free">Free Only</option>
                </select>
            </div>

            <div className="grid gap-6">
                {filteredPosts.map(post => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600">{post.excerpt}</p>
                            </div>
                            {post.isPremium && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                    Premium
                                </span>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                                Published on {post.publishedAt.toLocaleDateString()}
                            </span>
                            <button
                                onClick={() => onEditPost(post)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Edit Post
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 