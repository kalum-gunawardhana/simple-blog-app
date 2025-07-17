import { Suspense } from 'react';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogPosts } from '@/components/blog/BlogPosts';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { SearchBar } from '@/components/blog/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SearchBar />
            <Suspense fallback={<div className="text-center py-8">Loading posts...</div>}>
              <BlogPosts />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}