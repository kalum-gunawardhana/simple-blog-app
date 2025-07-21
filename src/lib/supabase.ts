import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          visibility: 'public' | 'private' | 'premium'
          author_id: string
          created_at: string
          updated_at: string
          slug: string
          tags: string[]
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          visibility?: 'public' | 'private' | 'premium'
          author_id: string
          created_at?: string
          updated_at?: string
          slug: string
          tags?: string[]
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          visibility?: 'public' | 'private' | 'premium'
          author_id?: string
          created_at?: string
          updated_at?: string
          slug?: string
          tags?: string[]
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          subscription_status: 'active' | 'inactive' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}