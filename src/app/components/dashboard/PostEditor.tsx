'use client';

import { useState } from 'react';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    publishedAt: Date;
    isPremium: boolean;
}

interface PostEditorProps {
    post: Post;
    onBack: () => void;
}

export function PostEditor({ post, onBack }: PostEditorProps) {
    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt);
    const [isPremium, setIsPremium] = useState(post.isPremium);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            onBack();
        } catch (error) {
            console.error('Failed to save post:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    {post.id ? 'Edit Post' : 'New Post'}
                </h2>
                <button
                    type="button"
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-800"
                >
                    Cancel
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt
                    </label>
                    <textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        id="premium"
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="premium" className="ml-2 block text-sm text-gray-900">
                        Premium Content
                    </label>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {saving ? 'Saving...' : 'Save Post'}
                </button>
            </div>
        </form>
    );
} 