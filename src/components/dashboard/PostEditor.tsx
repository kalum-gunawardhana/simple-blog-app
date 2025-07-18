'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useAuth } from '@/hooks/useAuth';
import { createPost, updatePost } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Image as ImageIcon,
    Link,
    Heading,
    X,
    Loader2,
    Save,
} from 'lucide-react';

interface PostEditorProps {
    post?: {
        id: string;
        title: string;
        content: string;
        excerpt: string;
        is_premium: boolean;
        tags: string[];
    };
    onSave?: () => void;
    onCancel?: () => void;
}

export function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
    const [title, setTitle] = useState(post?.title || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [isPremium, setIsPremium] = useState(post?.is_premium || false);
    const [tags, setTags] = useState<string[]>(post?.tags || []);
    const [tagInput, setTagInput] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content: post?.content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[200px]',
            },
        },
    });

    const handleSave = async () => {
        if (!editor || !user) return;

        try {
            setSaving(true);
            setError(null);

            const postData = {
                title,
                content: editor.getHTML(),
                excerpt,
                is_premium: isPremium,
                author_id: user.id,
                published_at: new Date().toISOString(),
            };

            if (post?.id) {
                await updatePost(post.id, postData);
            } else {
                await createPost(postData);
            }

            onSave?.();
        } catch (err) {
            console.error('Error saving post:', err);
            setError('Failed to save post. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (file: File) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${user?.id}/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            editor?.chain().focus().setImage({ src: publicUrl }).run();
        } catch (err) {
            console.error('Error uploading image:', err);
            setError('Failed to upload image. Please try again.');
        }
    };

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-red-800">
                    {error}
                </div>
            )}

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="w-full text-3xl font-bold mb-4 p-2 border-b focus:outline-none focus:border-blue-500"
            />

            <div className="border rounded-lg mb-4">
                <div className="flex items-center gap-2 p-2 border-b">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
                    >
                        <Bold className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
                    >
                        <Italic className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
                    >
                        <List className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
                    >
                        <ListOrdered className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''}`}
                    >
                        <Heading className="h-5 w-5" />
                    </button>
                    <label className="p-1 rounded hover:bg-gray-100 cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file);
                            }}
                        />
                        <ImageIcon className="h-5 w-5" />
                    </label>
                </div>

                <EditorContent editor={editor} className="p-4" />
            </div>

            <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a brief excerpt..."
                className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
            />

            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Premium content</span>
                </label>
            </div>

            <div className="mb-6">
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        placeholder="Add tags..."
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={addTag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-blue-800"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving || !title}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}