'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Star, Zap } from 'lucide-react'

export default function SubscribePage() {
  const { user, isSubscribed } = useAuth()

  const features = [
    'Access to all premium articles',
    'Early access to new content',
    'Ad-free reading experience',
    'Exclusive member-only discussions',
    'Download articles for offline reading',
    'Priority support from authors'
  ]

  const handleSubscribe = () => {
    // This will be implemented when Stripe is configured
    alert('Stripe integration coming soon! Please check back later.')
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <CardTitle>You're Already a Premium Member!</CardTitle>
            <CardDescription>
              Thanks for supporting our community. Enjoy all premium features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/premium">Explore Premium Content</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-16 px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Premium Content
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of readers who get exclusive access to in-depth articles, tutorials, and expert insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Free
              </CardTitle>
              <CardDescription>Perfect for casual readers</CardDescription>
              <div className="text-3xl font-bold">$0<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Access to public articles
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Basic search functionality
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Community discussions
                </li>
              </ul>
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-primary shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Premium
              </CardTitle>
              <CardDescription>For serious readers and learners</CardDescription>
              <div className="text-3xl font-bold">$9<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={handleSubscribe}>
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What our premium members say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The premium content is incredibly detailed and practical. Worth every penny!",
                author: "Sarah Johnson",
                role: "Software Developer"
              },
              {
                quote: "I love the ad-free experience and exclusive access to expert insights.",
                author: "Michael Chen",
                role: "Design Lead"
              },
              {
                quote: "The offline reading feature is perfect for my daily commute.",
                author: "Emily Rodriguez",
                role: "Product Manager"
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}