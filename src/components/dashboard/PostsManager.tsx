'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Crown } from 'lucide-react';

interface PostsManagerProps {
    onEditPost: (post: any) => void;
}

export function PostsManager({ onEditPost }: PostsManagerProps) {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching user's posts
        const fetchPosts = async () => {
            const mockPosts = [
                {
                    id: '1',
                    title: 'Getting Started with Next.js 13',
                    status: 'published',
                    isPremium: false,
                    publishedAt: new Date('2024-01-20'),
                    views: 1234
                },
                {
                    id: '2',
                    title: 'Advanced TypeScript Patterns',
                    status: 'draft',
                    isPremium: true,
                    publishedAt: null,
                    views: 0
                }
            ];

            setPosts(mockPosts);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const handleDelete = (postId: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(post => post.id !== postId));
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading posts...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
                    <button
                        onClick={() => onEditPost({ id: 'new', title: '', content: '', isPremium: false })}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New Post
                    </button>
                </div>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                                        {post.isPremium && (
                                            <Crown className="h-4 w-4 text-amber-500" />
                                        )}
                                        <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'published'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        {post.publishedAt && (
                                            <span>Published {post.publishedAt.toLocaleDateString()}</span>
                                        )}
                                        <span className="flex items-center">
                                            <Eye className="h-4 w-4 mr-1" />
                                            {post.views} views
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onEditPost(post)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}