import Link from 'next/link';
import { Calendar, Clock, Crown, User } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';

interface PostCardProps {
    post: {
        id: string;
        title: string;
        excerpt: string;
        author: string;
        publishedAt: Date;
        isPremium: boolean;
        tags: string[];
        readTime: number;
    };
}

export function PostCard({ post }: PostCardProps) {
    const { user } = useAuth();
    const hasAccess = !post.isPremium || user?.subscription?.active;

    return (
        <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                        </span>
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {post.publishedAt.toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min read
                        </span>
                    </div>

                    {post.isPremium && (
                        <div className="flex items-center text-amber-600">
                            <Crown className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">Premium</span>
                        </div>
                    )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link
                        href={`/post/${post.id}`}
                        className="hover:text-blue-600 transition-colors"
                    >
                        {post.title}
                    </Link>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link
                        href={`/post/${post.id}`}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${hasAccess
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {hasAccess ? 'Read More' : 'Preview'}
                    </Link>
                </div>
            </div>
        </article>
    );
}