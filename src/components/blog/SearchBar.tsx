'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = [
        { value: 'all', label: 'All Posts' },
        { value: 'free', label: 'Free' },
        { value: 'premium', label: 'Premium' },
        { value: 'recent', label: 'Recent' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Search:', searchTerm, 'Filter:', selectedFilter);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="search"
                        name="search"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        suppressHydrationWarning
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                        name="filter"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        suppressHydrationWarning
                    >
                        {filters.map((filter) => (
                            <option key={filter.value} value={filter.value}>
                                {filter.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
    );
}