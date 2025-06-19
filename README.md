This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo


https://github.com/user-attachments/assets/3fc31a5d-bfde-4136-a134-d66a01599583




## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Setting Up Locally
- Run Postgres in Docker
- Get Better Auth Secrets
- Get Google Client OAuth secrets

## TODO

Use book search if there is a suitable API for it (was originally going to use ISBNdb API, but it is not free).

## Reminders

Google OAuth auto deletes projects if they are inactive for 6 months. So, if there are auth issues, check this.

## How to Deploy
- Set production callback URL for OAuth
- Host Postregs DB somewhere and set production Database URL in .env
