'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PostCard from '@/components/PostCard'
import { Plus, BarChart3, FileText, Crown, Eye } from 'lucide-react'
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

interface Stats {
  total: number
  public: number
  private: number
  premium: number
}

export default function DashboardPage() {
  const { user, loading: authLoading, isSubscribed } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, public: 0, private: 0, premium: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchUserPosts()
    }
  }, [user])

  const fetchUserPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setPosts(data || [])
      
      // Calculate stats
      const newStats = {
        total: data?.length || 0,
        public: data?.filter(p => p.visibility === 'public').length || 0,
        private: data?.filter(p => p.visibility === 'private').length || 0,
        premium: data?.filter(p => p.visibility === 'premium').length || 0,
      }
      setStats(newStats)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.email}!
            </h1>
            <p className="text-gray-600">
              Manage your content and track your writing progress
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {isSubscribed && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Crown className="h-3 w-3 mr-1" />
                Premium Member
              </Badge>
            )}
            <Link href="/dashboard/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Public</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.public}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Private</CardTitle>
              <BarChart3 className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.private}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium</CardTitle>
              <Crown className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.premium}</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Posts</span>
              <Link href="/dashboard/create">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </Link>
            </CardTitle>
            <CardDescription>
              Manage and track all your published content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="relative">
                    <PostCard post={post} showVisibility />
                    <div className="absolute top-2 right-2">
                      <Link href={`/dashboard/edit/${post.id}`}>
                        <Button size="sm" variant="secondary">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start your writing journey by creating your first post.
                </p>
                <Link href="/dashboard/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}