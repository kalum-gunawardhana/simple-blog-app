'use client';

import Link from 'next/link';
import { Calendar, Clock, Tag, Lock } from 'lucide-react';
import type { Post } from '@/lib/api';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const readTime = Math.ceil(post.content.split(' ').length / 200); // Estimate read time based on word count

    return (
        <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <Link href={`/post/${post.id}`}>
                <div className="p-6">
                    <header className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                {post.title}
                            </h2>
                            {post.is_premium && (
                                <span className="flex items-center text-amber-600">
                                    <Lock className="h-4 w-4 mr-1" />
                                    Premium
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            {post.author?.full_name && (
                                <span>By {post.author.full_name}</span>
                            )}
                            {post.published_at && (
                                <span className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(post.published_at).toLocaleDateString()}
                                </span>
                            )}
                            <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {readTime} min read
                            </span>
                        </div>
                    </header>

                    <p className="text-gray-600 mb-4">
                        {post.excerpt || post.content.slice(0, 150) + '...'}
                    </p>

                    <footer>
                        <div className="flex flex-wrap gap-2">
                            {post.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                >
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </footer>
                </div>
            </Link>
        </article>
    );
}