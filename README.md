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
