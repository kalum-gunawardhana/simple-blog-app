'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogHeader } from '@/app/components/blog/BlogHeader';
import { DashboardSidebar } from '@/app/components/dashboard/DashboardSidebar';
import { PostsManager } from '@/app/components/dashboard/PostsManager';
import { PostEditor } from '@/app/components/dashboard/PostEditor';
import { ProfileSettings } from '@/app/components/dashboard/ProfileSettings';
import { useAuth } from '@/app/providers/AuthProvider';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('posts');
    const [editingPost, setEditingPost] = useState<any>(null);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
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