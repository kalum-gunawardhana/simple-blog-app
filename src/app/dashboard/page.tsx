'use client';

import { useState } from 'react';
import { BlogHeader } from '@/app/components/blog/BlogHeader';
import { DashboardSidebar } from '@/app/components/dashboard/DashboardSidebar';
import { PostsManager } from '@/components/dashboard/PostsManager';
import { PostEditor } from '@/components/dashboard/PostEditor';
import { ProfileSettings } from '@/components/dashboard/ProfileSettings';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('posts');
    const [editingPost, setEditingPost] = useState<any>(null);
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                    <p className="text-gray-600">Please sign in to access the dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <BlogHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    <div className="lg:col-span-3">
                        {activeTab === 'posts' && !editingPost && (
                            <PostsManager onEditPost={setEditingPost} />
                        )}
                        {activeTab === 'posts' && editingPost && (
                            <PostEditor post={editingPost} onBack={() => setEditingPost(null)} />
                        )}
                        {activeTab === 'profile' && <ProfileSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
}