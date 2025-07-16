import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { headers } from 'next/headers'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const userId = session.metadata?.supabase_user_id

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              is_premium: true,
              subscription_status: 'active',
            })
            .eq('id', userId)
        }
        break

      case 'customer.subscription.updated':
        const subscription = event.data.object
        const customerId = subscription.customer as string

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              is_premium: subscription.status === 'active',
              subscription_status: subscription.status,
            })
            .eq('id', profile.id)
        }
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        const deletedCustomerId = deletedSubscription.customer as string

        // Find user by Stripe customer ID
        const { data: deletedProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', deletedCustomerId)
          .single()

        if (deletedProfile) {
          await supabase
            .from('profiles')
            .update({
              is_premium: false,
              subscription_status: 'cancelled',
            })
            .eq('id', deletedProfile.id)
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}