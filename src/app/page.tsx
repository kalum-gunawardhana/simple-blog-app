'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import PostCard from '@/components/PostCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, TrendingUp, Clock, Star } from 'lucide-react'
import Link from 'next/link'

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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
        console.log('Supabase not configured, using mock data')
        // Set mock data for development
        const mockPosts = [
          {
            id: '1',
            title: 'Welcome to Your Blog Platform',
            excerpt: 'This is a sample post to demonstrate the blog functionality. Connect to Supabase to start creating real posts.',
            visibility: 'public' as const,
            created_at: new Date().toISOString(),
            slug: 'welcome-to-your-blog',
            tags: ['welcome', 'demo'],
            content: 'This is sample content for your blog platform.'
          },
          {
            id: '2',
            title: 'Getting Started Guide',
            excerpt: 'Learn how to set up your blog and start publishing amazing content.',
            visibility: 'public' as const,
            created_at: new Date().toISOString(),
            slug: 'getting-started-guide',
            tags: ['guide', 'tutorial'],
            content: 'Getting started with your new blog platform is easy!'
          }
        ]
        setPosts(mockPosts)
        setFeaturedPosts(mockPosts)
        setLoading(false)
        return
      }

      // Fetch public posts only for the homepage
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('visibility', 'public')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error

      setPosts(data || [])
      setFeaturedPosts(data?.slice(0, 3) || [])
    } catch (error) {
      console.log('Supabase not available, using mock data')
      // Fallback to mock data on any error
      const mockPosts = [
        {
          id: '1',
          title: 'Welcome to Your Blog Platform',
          excerpt: 'This is a sample post to demonstrate the blog functionality. Connect to Supabase to start creating real posts.',
          visibility: 'public' as const,
          created_at: new Date().toISOString(),
          slug: 'welcome-to-your-blog',
          tags: ['welcome', 'demo'],
          content: 'This is sample content for your blog platform.'
        }
      ]
      setPosts(mockPosts)
      setFeaturedPosts(mockPosts)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Discover Amazing Stories
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore a curated collection of articles, tutorials, and insights from passionate writers around the world.
          </p>
          
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-full border-2 border-gray-200 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/posts">
              <Button size="lg" className="rounded-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                Browse All Posts
              </Button>
            </Link>
            <Link href="/premium">
              <Button variant="outline" size="lg" className="rounded-full">
                <Star className="mr-2 h-4 w-4" />
                Explore Premium
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            <Link href="/posts">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Latest Posts
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? `No posts found for "${searchTerm}"` : 'No posts available yet.'}
              </p>
              <Link href="/dashboard">
                <Button className="mt-4">
                  Create Your First Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of writers and share your unique perspective with the world.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="rounded-full">
              Start Writing Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}