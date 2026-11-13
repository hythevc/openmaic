# SaaS launch readiness

Audited upstream OpenMAIC 1.4.1 on 2026-11-06. A rebrand and improved interface can ship independently; the upstream application does not by itself provide a paid, account-based SaaS. Do not describe a public marketing deployment as the production classroom service.

## Commercial use and ownership

The root [MIT license](../LICENSE) permits commercial use, modification, distribution and sale. Preserve its THU-MAIC copyright and permission notice in copies and substantial portions. Retain third-party notices for bundled dependencies and assets. Your brand and modifications are yours; the upstream software remains MIT-licensed. A proposed new product name still needs domain and trademark clearance before commercial commitment.

## Required launch work

| Area | Observed implementation | Requirement before paid public launch |
| --- | --- | --- |
| Hosting | Server-side generation workers persist beyond requests. `instrumentation.ts` requires PostgreSQL. | Run an always-on Node 22.19+ container/process with PostgreSQL 16 and persistent `data/`; use HTTPS. Vercel is unsupported for the current classroom application (1.2.0+). |
| Accounts | Anonymous cookie per browser by default; Compose defaults to one shared owner. An auth extension seam exists. | Integrate real accounts through `configureOwnerAuthentication` in `instrumentation.ts`; verify sessions or signed gateway JWTs. Set `anonymousFallback: false`, `OWNER_SINGLE_USER=false`, and disable unused anonymous premint. Account IDs must remain stable across devices. |
| Course privacy | Writes/deletes are owner-checked. Reads intentionally permit anyone who knows a live course ID, including courses not marked public. | Decide and implement a private-course read policy before promising confidentiality; cover document and referenced asset reads. A hidden library entry is not access control. |
| Payments | No application checkout, subscription or payment-webhook implementation found. | Add a payment provider, real product/price IDs, verified idempotent webhooks, an owner-linked entitlement table and customer portal. Never grant paid access from a checkout return URL alone. |
| Usage and budgets | Generation admission/execution hooks, concurrency limits and asset quotas exist. Usage logs are best-effort JSONL, without owner attribution. | Enforce server-side plan budgets transactionally and maintain a durable owner-attributed ledger. Meter course generation, classroom chat, workbench, extraction and media. `onRunEvent` is explicitly best effort and must not be the billing ledger. |
| AI providers | Provider-neutral `openmaic.yml`, server-managed allowlists and slot locks exist. | Supply real credentials via hosting secrets; configure authorized models, lock paid capabilities as appropriate and choose whether user keys are allowed. Confirm a complete generation and chat run with funded credentials. |
| Data operations | Courses/media use PostgreSQL or S3; uploaded materials, extraction results, usage logs and instance secret still need persistent disk. | Back up PostgreSQL, `data/` and `OPENMAIC_SECRET_KEY`; restore-test them. Multiple instances need the same secret and shared persistent data directory. Configure retention and deletion behavior. |

The material-extraction runner for agent workbench session attachments does not currently pass the generation metering hooks. Upload admission hooks also do not cover media created inside a background generation. Account and budget tests must exercise those paths rather than assuming a single hook covers every expense.

## Feasible deployment paths

1. **Recommended first production classroom:** one always-on Docker host with the existing Dockerfile, PostgreSQL 16, persistent `/app/data`, HTTPS proxy and account integration. A persistent-container PaaS or VM can host this; provisioning requires an actual hosting account and secrets. The default Compose single-user identity must be replaced for unrelated customers.
2. **Separate marketing site:** deploy a standalone static/Next.js marketing experience to Vercel, with a clearly identified demo and a configured link to the separately hosted classroom application. This does not make background classroom generation available on Vercel.
3. **Scaling later:** multiple compatible server processes sharing PostgreSQL, the instance secret and persistent data; configure worker concurrency and model-provider budgets. Review migrations before updates: do not run incompatible versions against the same database.

Avoid downgrading to release/1.1.x merely to fit serverless hosting: it changes the product and omits current fixes and architecture.

## Concrete acceptance checks

- Two signed-in accounts cannot edit or delete each other's work; private-course reads follow the chosen policy. Sign-in on a second device recovers the same library.
- A funded provider can generate a lesson, keep working after its browser closes and resume safely after a process restart.
- Payment webhook retries do not double-grant credits; canceled/failed subscriptions and exhausted budgets refuse new paid operations server-side.
- Upload, extraction, narration, image/video generation, classroom chat and workbench operations honor the plan's cost limits.
- Backup restoration preserves courses, media and encrypted provider settings; HTTPS owner cookies remain stable.
- Domain, support address, terms, privacy notice, actual plan limits and unit economics are configured before accepting payment.

## Sources

- [Deployment requirements](../packages/docs/content/docs/deployment.mdx)
- [Owner identity, storage contracts and host hooks](../packages/docs/content/docs/hosting.mdx)
- [Model and secret configuration](../packages/docs/content/docs/configuration.mdx)
- [Document access implementation](../lib/persistence/document-access.ts)
- [Usage logging implementation](../lib/server/usage-storage.ts)
- [Owner authentication registration](../lib/server/identity/registry.ts)
