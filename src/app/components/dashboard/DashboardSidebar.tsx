'use client';

interface DashboardSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'profile', label: 'Profile' }
    ];

    return (
        <nav className="bg-white shadow rounded-lg p-4">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-md mb-2 ${
                        activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
} 