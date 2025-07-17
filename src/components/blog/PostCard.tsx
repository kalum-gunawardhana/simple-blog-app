'use client';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    publishedAt: Date;
    isPremium: boolean;
    tags: string[];
    readTime: number;
}

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <article className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <span className="text-sm text-gray-500">{post.readTime} min read</span>
                </div>
                {post.isPremium && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Premium</span>
                )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    );
}