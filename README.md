# Simple Blog App

A modern blog platform built with Next.js, Supabase, and Stripe, featuring premium content and subscription capabilities.

## Features

- 🔐 User Authentication
- 📝 Rich Text Editor
- 💳 Subscription Management
- 🔍 Full-text Search
- 📱 Responsive Design
- 🖼️ Image Upload Support
- 🏷️ Tag Management
- 💎 Premium Content

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe
- **Editor**: TipTap
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

## Environment Variables

Create a `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
STRIPE_MONTHLY_PRICE_ID=your-monthly-price-id
STRIPE_YEARLY_PRICE_ID=your-yearly-price-id

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run database migrations:
   ```bash
   npm run migrate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

The project uses Supabase as the database. Run migrations to set up the database schema:

```bash
npm run migrate
```

This will create the following tables:
- profiles
- posts
- tags
- posts_tags
- subscriptions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run migrate` - Run database migrations

## Project Structure

```
simple-blog-app/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions and API
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
├── supabase/           # Database migrations
└── scripts/            # Utility scripts
```

## Features in Detail

### Authentication
- Email/password authentication
- Protected routes
- User profile management

### Blog Posts
- Rich text editor with image support
- Draft and publish workflow
- Tag management
- Premium content flags

### Subscriptions
- Stripe integration
- Monthly and yearly plans
- Premium content access
- Subscription management

### Search
- Full-text search
- Tag-based filtering
- Premium content filtering

## Deployment

1. Set up a Supabase project
2. Configure Stripe products and webhooks
3. Deploy to your preferred hosting platform (e.g., Vercel)
4. Set up environment variables
5. Run migrations

## License

MIT

## Support

For support, email [your-email] or open an issue on GitHub.
