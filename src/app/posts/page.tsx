'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import PostCard from '@/components/PostCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Grid, List } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  visibility: 'public' | 'private' | 'premium'
  created_at: string
  slug: string
  tags: string[]
  content: string
}

export default function PostsPage() {
  const { user, isSubscribed } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetchPosts()
  }, [user, isSubscribed])

  useEffect(() => {
    filterAndSortPosts()
  }, [posts, searchTerm, selectedTag, sortBy])

  const fetchPosts = async () => {
    try {
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        // Use mock data when Supabase is not configured
        const mockPosts = [
          {
            id: '1',
            title: 'Getting Started with Next.js',
            excerpt: 'Learn the fundamentals of building modern web applications with Next.js and React.',
            visibility: 'public' as const,
            created_at: new Date().toISOString(),
            slug: 'getting-started-nextjs',
            tags: ['nextjs', 'react', 'tutorial'],
            content: 'Mock content for demonstration'
          },
          {
            id: '2',
            title: 'Advanced TypeScript Patterns',
            excerpt: 'Explore advanced TypeScript patterns and techniques for better code organization.',
            visibility: 'premium' as const,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            slug: 'advanced-typescript-patterns',
            tags: ['typescript', 'patterns', 'advanced'],
            content: 'Mock premium content'
          },
          {
            id: '3',
            title: 'Building Scalable APIs',
            excerpt: 'Best practices for designing and implementing scalable REST APIs.',
            visibility: 'public' as const,
            created_at: new Date(Date.now() - 172800000).toISOString(),
            slug: 'building-scalable-apis',
            tags: ['api', 'backend', 'scalability'],
            content: 'Mock API content'
          }
        ]

        setPosts(mockPosts)

        // Extract all unique tags from mock data
        const tags = new Set<string>()
        mockPosts.forEach(post => post.tags?.forEach((tag: string) => tags.add(tag)))
        setAllTags(Array.from(tags))

        setLoading(false)
        return
      }

      // Get posts based on user status
      let query = supabase.from('posts').select('*')

      if (!user) {
        // Non-authenticated users see only public posts
        query = query.eq('visibility', 'public')
      } else if (!isSubscribed) {
        // Authenticated but not subscribed users see public and their own posts
        query = query.or(`visibility.eq.public,and(author_id.eq.${user.id})`)
      }
      // Subscribed users see all posts (no additional filter needed)

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error

      setPosts(data || [])

      // Extract all unique tags
      const tags = new Set<string>()
      data?.forEach(post => post.tags?.forEach((tag: string) => tags.add(tag)))
      setAllTags(Array.from(tags))
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortPosts = () => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = selectedTag === 'all' || post.tags?.includes(selectedTag)
      return matchesSearch && matchesTag
    })

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredPosts(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Posts</h1>
          <p className="text-gray-600">
            Discover articles, tutorials, and stories from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedTag && selectedTag !== 'all' && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">Active filter:</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedTag}
                <button onClick={() => setSelectedTag('all')}>
                  <Search className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedTag
                ? 'Try adjusting your search or filter criteria'
                : 'No posts are available yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}