# Early-access signup

The standalone launch site in `packages/launch` exposes a Node.js Next.js route
at `POST /api/early-access`. This records interest in early access; it does not
create a product account, send an email, or start a subscription.

## Form contract

Send JSON with `Content-Type: application/json` from the site's own origin:

```json
{
  "email": "person@example.com",
  "consent": true,
  "website": ""
}
```

`email` and the boolean `consent: true` are required. `website` is an optional
honeypot and must be empty if supplied. Keep its input out of keyboard navigation
and mark the wrapper `aria-hidden="true"`. The consent checkbox must start
unchecked and explain that the visitor agrees to receive Syllivo early-access
updates. Link the actual privacy notice alongside it.

Successful new and duplicate submissions both return `200 { "ok": true }`.
Failures return `{ "ok": false, "error": "..." }` with a controlled `400`,
`403`, `413`, `415`, `429`, or `503` status. Show the server error in the form;
never display a successful signup when the request fails.

## Storage configuration

Connect a **private** Vercel Blob store to the launch project and provide
`BLOB_READ_WRITE_TOKEN` as a server-only environment variable. Do not prefix it
with `NEXT_PUBLIC_`. A missing or unavailable storage credential produces `503`;
the route does not fall back to an in-memory or browser-only signup.

The optional `SIGNUP_ORIGIN` is an exact origin such as
`https://syllivo.example`, without a trailing slash or path. When omitted, the
route requires the request's `Origin` to match the request URL's origin. This
lets canonical domains and Vercel preview domains each accept their own forms.

The API stores one JSON document per normalized email at
`early-access/v1/<sha256-of-email>.json`. Contents include the email, the creation
time, the source, and a versioned record of consent. Object access is private and
overwriting is disabled. Duplicate requests confirm the existing object and
keep its original consent record. Concurrent duplicate writes are acknowledged
only after the route confirms that the object exists in durable storage.

No emails, IP addresses, tokens, Blob URLs, or storage error details are logged
or returned to visitors. The email itself remains personal data even when its
object path uses a hash. Access the private store through the hosting account;
there is deliberately no public list or export endpoint.

## Request limits and operations

- The route accepts at most 2,048 bytes of streamed JSON, including requests
  without a `Content-Length` header.
- Email addresses have length and structural validation; unknown fields,
  non-boolean consent, and populated honeypots are rejected.
- Same-origin and browser fetch-site checks reject cross-site submissions.
- An in-memory limiter permits eight attempts per client per ten minutes in
  each running instance and bounds its client map. It stores only a digest of
  the client address. On Vercel, the platform supplies `x-forwarded-for`; another
  hosting proxy must replace that header before forwarding requests.
- This limiter is best-effort, not a distributed anti-abuse service. Configure
  the hosting firewall's rate limits for production traffic across instances.
- Error responses are non-cacheable. Storage failures produce a retryable
  message without claiming that the visitor has been added.

The operator must define a retention period, maintain the published privacy
notice and contact method, and handle deletion/unsubscribe requests. A signup
does not authorize unrelated marketing or automatic enrollment into a paid plan.
There is no outbound email integration in this endpoint.

## Verification

With launch dependencies installed, run on Node 24:

```sh
cd packages/launch
node --experimental-test-module-mocks --test tests/signup.test.mjs
```

The focused tests cover validation, missing consent, honeypot rejection, actual
body size limits, foreign origins, missing storage, private writes, existing and
concurrent duplicates, controlled provider failures, and repeated requests.
They mock the Blob SDK and do not write test addresses to production storage.

Before accepting real visitors, verify a new submission in the connected
private store, verify a duplicate returns the same public response, and remove
the test record afterward.
