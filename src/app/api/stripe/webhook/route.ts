import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateSubscription(
  subscription: Stripe.Subscription,
  status: string
) {
  const userId = subscription.metadata.supabase_user_id;
  if (!userId) {
    console.error('No user id found in subscription metadata');
    return;
  }

  await supabase.from('subscriptions').upsert({
    id: subscription.id,
    user_id: userId,
    stripe_customer_id: subscription.customer as string,
    stripe_subscription_id: subscription.id,
    plan_id: subscription.items.data[0].price.id,
    status,
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        {
          const subscription = event.data.object as Stripe.Subscription;
          await updateSubscription(subscription, subscription.status);
        }
        break;

      case 'customer.subscription.deleted':
        {
          const subscription = event.data.object as Stripe.Subscription;
          await updateSubscription(subscription, 'canceled');
        }
        break;

      case 'checkout.session.completed':
        {
          const session = event.data.object as Stripe.Checkout.Session;
          // Handle successful checkout
          // You might want to send a welcome email or update user status
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 