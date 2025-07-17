import { FileText, Settings, CreditCard, User } from 'lucide-react';

interface DashboardSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
    const tabs = [
        { id: 'posts', label: 'My Posts', icon: FileText },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'subscription', label: 'Subscription', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h2>

                <nav className="space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${activeTab === tab.id
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon className="h-5 w-5 mr-3" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}