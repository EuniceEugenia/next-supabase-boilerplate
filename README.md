# Project: Next.JS Boilerplate with Supabase, ShadCN, React Query

This is my personal training project notebook tracking my progress following a step-by-step tutorial series by the "Daily Web Coding" YouTube channel.

## Part 1: Initial Setup
**Description:** In this first part, I set up my initial boilerplate using Next.js, Supabase, Shadcn UI, and React Query. I am learning to integrate these specific technologies because I plan to use them as my go-to modern stack for starting new projects in the future.

## Tech Stack Used
- Next.js 16 (App Router)
- Supabase (Authentication & Database)
- Shadcn UI (Components & Tailwind v4)
- React Query (Data Fetching)
- Lucide React & React Icons (Icons and Logos)

**Resources/Links:**
- Glowbox Css: https://codepen.io/lonekorean/pen/rNOwVy
- Next.js: https://nextjs.org/docs/getting-start
- Shadcn: https://ui.shadcn.com/docs
- Emoji: https://emojidb.org/hand-emojis

## Part 2: Authentication & OAuth
**Description:** In this second part, I focused on implementing user authentication with Supabase. I successfully integrated GitHub and Google OAuth login providers, built the UI using Shadcn buttons and `react-icons`, and configured the async SSR callback route to safely exchange auth codes for persistent user sessions in Next.js 16+.

**Resources/Links:**
- Supabase SSR Client: https://supabase.com/docs/guides/auth/server-side/nextjs
- Supabase Main: https://supabase.com/
- Google Cloud Docs: https://docs.cloud.google.com/docs

## Part 3: Auth Trigger & Profile Table
**Description:** In this part, I set up an automated PostgreSQL Database Trigger to automatically create a profile in the `profiles` table whenever a new user signs up. I also learned several important things about Supabase and Postgres mapping:
- Making the `email` column `NOT NULL` since every registered user is guaranteed to have it.
- Allowing `display_name` and `image_url` to be Nullable.
- Exploring the use of the `COALESCE` function in SQL to intelligently map varying metadata structures between providers (like handling Google vs GitHub username keys).
- Setting the function to execute as `SECURITY DEFINER` rather than `INVOKER` to evade Row Level Security blocks during initial profile creation.

**Resources/Links:**
- Supabase Client Guide: https://supabase.com/docs/guides/auth/server-side/nextjs
- Supabase Main: https://supabase.com/
- Postgres Cascade Deletes: https://supabase.com/docs/guides/database/postgres/cascade-deletes
- Markdown Editor: https://stackedit.io/app#

## Part 4: Setup React Query
**Description:** In this part, I successfully configured React Query (TanStack Query) to handle data fetching across the app. In this module, I learned to setup the `QueryProvider` and `ReactQueryDevtools`, implement `useQuery` custom hooks (like `useUser`) to fetch authenticated session and profile data seamlessly, generate strict TypeScript types from the Supabase database using the Supabase CLI, and migrate Tailwind CSS animations (`fade`) inline to fit Tailwind v4.

**Resources/Links:**
- React Query Latest: https://tanstack.com/query/latest/
- React Query Devtools: https://tanstack.com/query/latest/docs/framework/react/devtools
- Supabase Generating Types: https://supabase.com/docs/guides/api/rest/generating-types

## Part 5: Logout & Page Protection
**Description:** In this part, I implemented secure logout routing and configured strict page protection using Next.js Middleware. I learned how to cleanly handle session termination by clearing React Query cache, signing out of Supabase, and redirecting gracefully. Moreover, I set up a robust middleware to intercept unauthenticated attempts to access protected routes, forwarding them to the login page along with a redirect query param so they can bounce back upon successful sign-in.

**Resources/Links:**
- Creating a Supabase Client: https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs

## Part 6: Setup Stripe UI
**Description:** In this part, I set up the initial user interface for managing Stripe subscriptions. I successfully built out the pricing component using Shadcn UI's grid and styling utilities, created the subscription routing, and added check icons using `lucide-react` to display the features of each tier.

**Resources/Links:**
- Lucide Icons (Circle Check): https://lucide.dev/icons/circle-check

## Part 7: Stripe Checkout Integration
**Description:** In this part, I successfully integrated Stripe Checkout for subscriptions. I resolved a deprecation issue with `@stripe/stripe-js` by utilizing standard browser redirection instead of `redirectToCheckout`. Additionally, I implemented a loading state on the "Getting Started" button during the checkout session creation, set up proper redirection to a success page upon successful payment, and tested the flow using Stripe's test environment.

**Resources/Links:**
- Stripe Main: https://stripe.com/
- Stripe Changelog (Deprecated redirectToCheckout): https://docs.stripe.com/changelog/clover/2025-09-30/remove-redirect-to-checkout
- Stripe Testing Cards: https://docs.stripe.com/testing#cards

## Part 8: Webhook & Protect Data
**Description:** In this part, I implemented the Stripe Webhook to synchronize subscription states with the Supabase database. I utilized the Supabase Admin API to securely bypass RLS and update users' subscription records directly from the server based on Stripe webhook events. I also protected route data on the frontend by checking the user's active subscription status before rendering the content.

**Resources/Links:**
- Supabase Admin API: https://supabase.com/docs/reference/javascript/admin-api
- Supabase Generating Types: https://supabase.com/docs/guides/api/rest/generating-types
- Stripe Events: https://docs.stripe.com/api/events
