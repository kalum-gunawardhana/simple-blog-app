import { Calendar, Clock, User, Tag } from 'lucide-react';

interface PostContentProps {
    post: {
        id: string;
        title: string;
        content: string;
        author: string;
        publishedAt: Date;
        tags: string[];
        readTime: number;
    };
}

export function PostContent({ post }: PostContentProps) {
    return (
        <article className="bg-white rounded-lg shadow-sm border">
            <div className="p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                        <span className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {post.author}
                        </span>
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {post.publishedAt.toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {post.readTime} min read
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </article>
    );
}