import { supabase } from './supabase';
import { PostgrestError } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author_id: string;
  is_premium: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: Profile;
  tags?: string[];
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan_id: string;
  status: string;
  current_period_end: string | null;
};

// Profile functions
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}

// Post functions
export async function getPosts(options: {
  page?: number;
  limit?: number;
  tag?: string;
  authorId?: string;
  isPremium?: boolean;
  search?: string;
  orderBy?: 'published_at' | 'created_at' | 'rank';
}) {
  const {
    page = 1,
    limit = 10,
    tag,
    authorId,
    isPremium,
    search,
    orderBy = 'published_at'
  } = options;

  let query = supabase
    .from('posts')
    .select(`
      *,
      author:profiles(*),
      tags:posts_tags(tags(*))
    `);

  if (tag) {
    query = query.contains('tags', [tag]);
  }

  if (authorId) {
    query = query.eq('author_id', authorId);
  }

  if (typeof isPremium === 'boolean') {
    query = query.eq('is_premium', isPremium);
  }

  if (search) {
    query = query.textSearch('fts', search);
  }

  query = query.order(orderBy, { ascending: false });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query
    .range(from, to)
    .select('*', { count: 'exact' });

  if (error) throw error;

  return {
    posts: data as Post[],
    total: count || 0,
    page,
    limit
  };
}

export async function getPost(postId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(*),
      tags:posts_tags(tags(*))
    `)
    .eq('id', postId)
    .single();

  if (error) throw error;
  return data as Post;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

export async function updatePost(postId: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

export async function deletePost(postId: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
}

// Tag functions
export async function getTags() {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

// Subscription functions
export async function getSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as Subscription | null;
}

export async function updateSubscription(
  userId: string,
  subscription: Partial<Subscription>
) {
  const { data, error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      ...subscription
    })
    .select()
    .single();

  if (error) throw error;
  return data as Subscription;
} 