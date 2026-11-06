# Syllivo launch preview

Independent Syllivo product experience alongside the OpenMAIC classroom engine.
This app is deliberately deployable on Vercel without starting the upstream
background workers or exposing an unauthenticated generation service.

## Included

- Responsive landing page and learning studio in the Syllivo brand.
- Three curated four-chapter lessons, practice questions, answer explanations,
  hints, completion summaries, and local progress.
- A local course-brief editor; it does **not** generate a course in this preview.
- A consent-based early-access signup endpoint using private Vercel Blob storage.
  Registration is hidden when storage is not configured; the API fails closed.
- Preview terms, privacy notice, upstream MIT license and public credits.

## Run

Use Node 24 and npm. This directory is excluded from the parent pnpm workspace.

```sh
npm ci
npm run dev
npm run build
npm start
```

```sh
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
```

`PREVIEW_BASE_URL=https://your-deployment.example npm run test:e2e` targets an
existing deployment and avoids launching a local server. Browser tests only
exercise curated lessons and local drafts; they do not submit signup data.

## Deploy

The Vercel project is `syllivo`, in `jaime-henriques-projects`, linked to
`hythevc/openmaic`. Set Root Directory to `packages/launch`, framework Next.js,
Node 24, install command `npm ci --workspaces=false`, and build `npm run build`.
The production preview intentionally has public access. The parent app needs a
persistent Node/PostgreSQL host and is not deployed to Vercel.

Connect a **private** Vercel Blob store to this project. It creates the server-only
`BLOB_READ_WRITE_TOKEN`. Redeploy to enable the signup form. Do not use a
`NEXT_PUBLIC_` variable for this token. Optionally set `SIGNUP_ORIGIN` to the exact
production origin. No token means no form and no successful signup response.
See `../../docs/early-access.md` for the endpoint and operational limits.

## What remains before a paid SaaS launch

This preview does not offer customer authentication, live AI generation, cloud
progress, paid subscriptions, or private document uploads. The full classroom
engine remains in the repository and has been rebranded, with its generation
logic retained. Complete the requirements in `../../docs/saas-launch-audit.md`
before charging customers or advertising those features. In particular, use
real account-scoped owner authentication, durable budget enforcement, a
private-course read policy, monitored support/privacy contact, tested backups,
and a funded model provider on a persistent server.

The working brand and preliminary domain research are in `../../docs/brand.md`.
No domain has been purchased and no trademark clearance is claimed.
