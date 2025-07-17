'use client';

import { useAuth } from '@/app/providers/AuthProvider';

interface DashboardSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
    const { signOut } = useAuth();

    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'profile', label: 'Profile' }
    ];

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <nav className="space-y-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                            activeTab === tab.id
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
                <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                    Sign Out
                </button>
            </nav>
        </div>
    );
} 