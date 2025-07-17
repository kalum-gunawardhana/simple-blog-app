'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Eye, Crown } from 'lucide-react';

interface PostEditorProps {
    post: any;
    onBack: () => void;
}

export function PostEditor({ post, onBack }: PostEditorProps) {
    const [formData, setFormData] = useState({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        tags: post.tags?.join(', ') || '',
        isPremium: post.isPremium || false
    });

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Simulate saving
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Saving post:', formData);
        setSaving(false);

        alert('Post saved successfully!');
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Posts
                    </button>

                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            className="flex items-center text-gray-600 hover:text-gray-800"
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                        </button>
                        <button
                            type="submit"
                            form="post-form"
                            disabled={saving}
                            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? 'Saving...' : 'Save Post'}
                        </button>
                    </div>
                </div>

                <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter post title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Brief description of the post"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={15}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your post content here..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="React, TypeScript, Tutorial"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isPremium"
                            checked={formData.isPremium}
                            onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-700">
                            <Crown className="inline h-4 w-4 mr-1 text-amber-500" />
                            Premium Content
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}