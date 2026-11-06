# Syllivo — Make knowledge click.

Syllivo is the independent product brand for this OpenMAIC-based business.
The working audience is professionals learning new skills. The original MIT
license and THU-MAIC attribution are preserved.

## Deploy result

| Field | Result |
| --- | --- |
| URL | https://syllivo-one.vercel.app |
| Target | Production hosting; early-access product preview |
| Status | READY |
| Code commit | `f3eabd9978c90f58ff84859b45a39c2db2b93e82` |
| Framework | Next.js 16.3.3 |
| Build and deployment | Approximately 30 seconds; remote build succeeded |
| Review | https://github.com/hythevc/openmaic/pull/1 (draft) |

Live-browser verification passed the complete lesson, saved progress, draft
reload, all public routes, 404 and mobile-overflow checks without browser errors.
The deployment returned HTTP 200 and the expected public page title. A runtime
error/fatal scan for the deployment found no matching logs in its first ten-minute
window; this is a launch check, not long-term monitoring. No monitoring integration
was added in this session. The code deployment is the commit above; later
handoff-only documentation commits do not change its application code.

## Public early-access preview

The independently deployable app is in [packages/launch](packages/launch).
It offers the new landing experience, a learning studio, three curated interactive
lessons, knowledge checks, completion summaries, and local progress/briefs.
It does not pretend that AI generation, customer accounts or payments are live.

The full OpenMAIC engine remains in the root app with updated Syllivo branding.
The root app requires an always-on Node/PostgreSQL host; the Vercel deployment
contains only the standalone preview.

## Verification

- Standalone Next.js production build and TypeScript check passed.
- Launch ESLint check passed.
- Nine signup validation/storage-failure/duplicate tests passed.
- Six browser tests passed across desktop and mobile Chromium, covering complete
  lessons, rereading without losing completion, draft persistence, preview
  navigation, every public route, 404s and horizontal overflow.
- Two existing brand configuration tests passed after the core rebrand.
- The full root app was not production-deployed or end-to-end tested with a funded
  AI provider/database in this session.

## Design verification

Visual direction was developed from generated landing and studio concepts. The
12ui hosted workflow was unavailable without separate sign-in; a generated
concept and local Chromium browser comparison were used. The connected Browser
app did not expose its required `js` control tool in this session, so visual and
interaction QA used Playwright with local Chromium.

Native desktop comparison used 1536 × 1024; mobile used 390 × 844. Concept and
latest production-build screenshots were both inspected with `view_image`.
The implementation was faithfully checked against the accepted concept across:

1. Hero headline/CTA copy and order, with no above-the-fold copy additions.
2. Split hero geometry and the lesson preview placement; first section boundary
   closely matches the design at approximately y=874.
3. Ivory, forest and chartreuse palette; clean white panel borders, no added tint.
4. Serif heading hierarchy and deliberate Inter control typography.
5. Four-chapter preview, tutor note placement, diagram geometry, buttons and icons.
6. Studio composer, sample-card rail, mobile stacking, and visible keyboard focus.

Material adjustments made during QA: mobile action widths, early-access fallback
button contrast, loading the actual Inter font in the player, honoring control
font weights, aligning the habit diagram, removing a broken duplicate skip link,
and preserving finished-lesson status during rereading.

Intentional deviations: a plain geometric SVG leaf mark and code-native vector
art replace the concept's image-rendered mark/diagrams; no fictitious profile
avatar is shown; the lesson player and lower landing sections extend the same
system for required navigation and product flows. The preview contains honest
curated content rather than invented live AI output. Registration stays hidden
until durable storage is configured. No material clipping or overflow remained
in inspected desktop/mobile views.

## Commercial launch gates

See [launch audit](docs/saas-launch-audit.md), [brand research](docs/brand.md),
[signup operations](docs/early-access.md), and [preview setup](packages/launch/README.md).

Private signup storage could not be provisioned: Vercel returned HTTP403 for store
creation, and the CLI had no configured login. Connect a private Blob store to
Vercel project `syllivo` and redeploy to enable registration. No signup data was
collected or test email submitted to live storage.

Before accepting money: configure the persistent application host/PostgreSQL and
funded AI provider; integrate account-scoped authentication and private-course
read authorization; add payment webhooks/entitlements and durable usage budgets;
configure monitored support/privacy contact and backups; choose/register a domain.
`syllivo.app` was available in preliminary research; it has not been purchased.
