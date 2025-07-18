'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTags } from '@/lib/api';

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Load tags for filtering
        const loadTags = async () => {
            try {
                const tagData = await getTags();
                setTags(tagData);
            } catch (error) {
                console.error('Error loading tags:', error);
            }
        };

        loadTags();

        // Set initial values from URL
        const q = searchParams.get('q') || '';
        const filter = searchParams.get('filter') || 'all';
        setSearchTerm(q);
        setSelectedFilter(filter);
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const params = new URLSearchParams();
        if (searchTerm) params.set('q', searchTerm);
        if (selectedFilter !== 'all') params.set('filter', selectedFilter);

        router.push(`/?${params.toString()}`);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="search"
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search posts..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Posts</option>
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                        <option value="recent">Recent</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.name}>
                                {tag.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>
        </form>
    );
}