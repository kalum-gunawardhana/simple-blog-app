import { TrendingUp, Star, Users, BookOpen } from 'lucide-react';

export function BlogSidebar() {
    const stats = [
        { icon: BookOpen, label: 'Total Posts', value: '127' },
        { icon: Users, label: 'Active Readers', value: '2.4k' },
        { icon: Star, label: 'Premium Posts', value: '45' },
        { icon: TrendingUp, label: 'This Month', value: '18' }
    ];

    const popularTags = [
        'React', 'TypeScript', 'Next.js', 'JavaScript', 'Node.js',
        'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB'
    ];

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Stats</h3>
                <div className="space-y-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <stat.icon className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{stat.label}</span>
                            </div>
                            <span className="font-semibold text-gray-900">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                        <button
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-sm p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-blue-100 mb-4">
                    Get the latest posts delivered to your inbox.
                </p>
                <div className="space-y-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}