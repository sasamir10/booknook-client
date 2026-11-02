# BookNook

BookNook is a small online library for discovering books, contributing titles, and managing short-term borrowing.

## Features

- Browse a live MongoDB-backed book collection and newest arrivals.
- Add, update, and remove books with owner-only controls.
- Register with email and password or sign in with Google.
- Borrow available books for a configurable seven-day period and return them.
- Upload book covers securely through a Next.js server handler.
- Responsive editorial-style interface with loading, empty, and error states.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Better Auth, MongoDB, shadcn/ui patterns, Lucide, Swiper, React Hook Form, Zod, and Sonner.

## Environment

Copy `.env.example` to `.env.local` and fill in the MongoDB URI, Better Auth secret and URL, Google OAuth credentials, ImgBB API key, and Express API URL. Never commit `.env.local`.

For Google OAuth, register the callback URL `${BETTER_AUTH_URL}/api/auth/callback/google` in the Google Cloud project. Keep the same production `BETTER_AUTH_URL` in the Express service so its JWKS verifier checks the matching issuer and audience.

## Local development

Install dependencies with `pnpm install`, then run `pnpm dev`. The Express server must also be running; see `../server/README.md`.

## Live site

Not deployed yet. Add the Vercel URL here after deployment.
