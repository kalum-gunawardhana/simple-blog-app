'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import MarkdownEditor from '@/components/MarkdownEditor'
import { Save, ArrowLeft, X, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Post {
    id: string
    title: string
    content: string
    excerpt: string
    visibility: 'public' | 'private' | 'premium'
    tags: string[]
    slug: string
    author_id: string
}

export default function EditPostPage() {
    const { user } = useAuth()
    const router = useRouter()
    const params = useParams()
    const postId = params.id as string

    const [post, setPost] = useState<Post | null>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [visibility, setVisibility] = useState<'public' | 'private' | 'premium'>('public')
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (user && postId) {
            fetchPost()
        }
    }, [user, postId])

    const fetchPost = async () => {
        try {
            // Check if Supabase is properly configured
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
                process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
                // Use mock data when Supabase is not configured
                const mockPost = {
                    id: postId,
                    title: 'Sample Post Title',
                    content: '# Sample Post\n\nThis is a sample post for demonstration purposes.',
                    excerpt: 'This is a sample post excerpt.',
                    visibility: 'public' as const,
                    tags: ['sample', 'demo'],
                    slug: 'sample-post',
                    author_id: user?.id || 'mock-user'
                }

                setPost(mockPost)
                setTitle(mockPost.title)
                setContent(mockPost.content)
                setExcerpt(mockPost.excerpt)
                setVisibility(mockPost.visibility)
                setTags(mockPost.tags)
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', postId)
                .eq('author_id', user?.id)
                .single()

            if (error) {
                if (error.code === 'PGRST116') {
                    setError('Post not found or you do not have permission to edit it.')
                } else {
                    throw error
                }
                return
            }

            setPost(data)
            setTitle(data.title)
            setContent(data.content)
            setExcerpt(data.excerpt)
            setVisibility(data.visibility)
            setTags(data.tags || [])
        } catch (error: any) {
            console.error('Error fetching post:', error)
            setError('Failed to load post. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '-')
            .trim()
    }

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()])
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !post) return

        setError('')
        setSaving(true)

        try {
            // Check if Supabase is properly configured
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
                process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
                // Simulate successful save for demo
                setTimeout(() => {
                    setSaving(false)
                    router.push('/dashboard')
                }, 1000)
                return
            }

            const slug = generateSlug(title)

            const { error } = await supabase
                .from('posts')
                .update({
                    title,
                    content,
                    excerpt,
                    visibility,
                    tags,
                    slug,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', post.id)
                .eq('author_id', user.id)

            if (error) throw error

            router.push('/dashboard')
        } catch (error: any) {
            setError(error.message || 'An error occurred while updating the post')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!user || !post) return

        setError('')
        setDeleting(true)

        try {
            // Check if Supabase is properly configured
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
                process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
                // Simulate successful delete for demo
                setTimeout(() => {
                    setDeleting(false)
                    router.push('/dashboard')
                }, 1000)
                return
            }

            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', post.id)
                .eq('author_id', user.id)

            if (error) throw error

            router.push('/dashboard')
        } catch (error: any) {
            setError(error.message || 'An error occurred while deleting the post')
        } finally {
            setDeleting(false)
        }
    }

    if (!user) {
        router.push('/login')
        return null
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error && !post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-600 mb-4">{error}</p>
                        <Link href="/dashboard">
                            <Button>Back to Dashboard</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
                        <p className="text-gray-600">Update your post content and settings</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" disabled={deleting}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your post.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Link href="/dashboard">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Post Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter your post title"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Input
                                    id="excerpt"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="Brief description of your post"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="visibility">Visibility</Label>
                                    <Select value={visibility} onValueChange={(value: any) => setVisibility(value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="public">Public</SelectItem>
                                            <SelectItem value="private">Private</SelectItem>
                                            <SelectItem value="premium">Premium</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="tags"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            placeholder="Add a tag"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        />
                                        <Button type="button" onClick={addTag} variant="outline">
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <X
                                                className="h-3 w-3 cursor-pointer"
                                                onClick={() => removeTag(tag)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Content</Label>
                                <MarkdownEditor
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Write your post content here..."
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href="/dashboard">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={saving || !title || !content || !excerpt}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}