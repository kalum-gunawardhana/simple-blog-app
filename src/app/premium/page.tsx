'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown, Star, Zap, BookOpen, Download, MessageCircle } from 'lucide-react'

export default function PremiumPage() {
  const { user, loading, isSubscribed } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else if (!isSubscribed) {
        router.push('/subscribe')
      }
    }
  }, [user, loading, isSubscribed, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !isSubscribed) {
    return null // Will redirect via useEffect
  }

  const premiumFeatures = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Exclusive Articles",
      description: "Access to in-depth tutorials and advanced topics"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Offline Reading",
      description: "Download articles for reading without internet"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Premium Discussions",
      description: "Join exclusive member-only conversations"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Early Access",
      description: "Get first access to new content and features"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              Premium Member
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Premium Content
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enjoy exclusive access to premium articles, advanced tutorials, and member-only features.
          </p>
        </div>

        {/* Premium Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {premiumFeatures.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center text-primary mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Content Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Advanced React Patterns",
              description: "Deep dive into advanced React patterns and best practices",
              readTime: "15 min read",
              category: "Development"
            },
            {
              title: "Scaling Node.js Applications",
              description: "Learn how to build and scale production-ready Node.js apps",
              readTime: "20 min read",
              category: "Backend"
            },
            {
              title: "Database Optimization Techniques",
              description: "Master database performance optimization strategies",
              readTime: "12 min read",
              category: "Database"
            },
            {
              title: "Advanced TypeScript Features",
              description: "Explore advanced TypeScript features for better code",
              readTime: "18 min read",
              category: "Development"
            },
            {
              title: "Microservices Architecture",
              description: "Design and implement scalable microservices",
              readTime: "25 min read",
              category: "Architecture"
            },
            {
              title: "Performance Monitoring",
              description: "Monitor and optimize application performance",
              readTime: "14 min read",
              category: "DevOps"
            }
          ].map((article, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <Crown className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {article.description}
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-3 w-3" />
                  {article.readTime}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Zap className="h-5 w-5" />
                More Premium Content Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We're constantly adding new premium content, tutorials, and exclusive features. 
                Stay tuned for updates and thank you for being a valued premium member!
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}