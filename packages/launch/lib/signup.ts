import { createHash } from 'node:crypto';
import { BlobNotFoundError, head, put } from '@vercel/blob';

export const MAX_SIGNUP_BYTES = 2048;

export class SignupError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'SignupError';
    this.status = status;
  }
}

export type Signup = { email: string; consent: true };

export function validateSignup(value: unknown): Signup {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new SignupError(400, 'Please check the form and try again.');
  }

  const input = value as Record<string, unknown>;
  if (Object.keys(input).some((key) => !['email', 'consent', 'website'].includes(key))) {
    throw new SignupError(400, 'Please check the form and try again.');
  }
  if (input.website !== undefined && input.website !== '') {
    throw new SignupError(400, 'Please check the form and try again.');
  }
  if (input.consent !== true) {
    throw new SignupError(400, 'Please agree to receive early-access updates.');
  }
  if (typeof input.email !== 'string' || input.email.length > 320) {
    throw new SignupError(400, 'Enter a valid email address.');
  }

  const email = input.email.trim().toLowerCase();
  const [local, domain, extra] = email.split('@');
  const labels = domain?.split('.') ?? [];
  const validLocal =
    local &&
    local.length <= 64 &&
    /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/i.test(local) &&
    !local.startsWith('.') &&
    !local.endsWith('.') &&
    !local.includes('..');
  const validDomain =
    labels.length >= 2 &&
    labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));

  if (extra !== undefined || email.length > 254 || !validLocal || !validDomain) {
    throw new SignupError(400, 'Enter a valid email address.');
  }
  return { email, consent: true };
}

export async function readSignup(request: Request): Promise<Signup> {
  if (request.headers.get('content-type')?.split(';', 1)[0].trim() !== 'application/json') {
    throw new SignupError(415, 'Send the form as JSON.');
  }
  const length = request.headers.get('content-length');
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_SIGNUP_BYTES)) {
    throw new SignupError(413, 'The form is too large.');
  }
  if (!request.body) throw new SignupError(400, 'Please check the form and try again.');

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_SIGNUP_BYTES) {
        await reader.cancel();
        throw new SignupError(413, 'The form is too large.');
      }
      chunks.push(chunk.value);
    }
  } finally {
    reader.releaseLock();
  }

  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks)));
  } catch {
    throw new SignupError(400, 'Please check the form and try again.');
  }
  return validateSignup(value);
}

export function checkSignupOrigin(request: Request): void {
  const origin = request.headers.get('origin');
  const expected = process.env.SIGNUP_ORIGIN || new URL(request.url).origin;
  if (!origin || origin !== expected || request.headers.get('sec-fetch-site') === 'cross-site') {
    throw new SignupError(403, 'Please submit the form from this website.');
  }
}

// Best-effort protection per server instance. The host firewall should enforce
// distributed limits; a local map cannot coordinate separate serverless instances.
const rateWindows = new Map<string, { count: number; until: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const MAX_TRACKED_CLIENTS = 5000;

export function checkSignupRate(request: Request): void {
  const now = Date.now();
  for (const [key, window] of rateWindows) {
    if (window.until <= now) rateWindows.delete(key);
  }
  // Vercel supplies x-forwarded-for; outside Vercel the reverse proxy must
  // replace it. Store only a digest in memory, never the address itself.
  const address = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const key = createHash('sha256').update(address).digest('hex');
  const window = rateWindows.get(key);
  if (window) {
    if (window.count >= MAX_REQUESTS) {
      throw new SignupError(429, 'Too many attempts. Please try again in 10 minutes.');
    }
    window.count += 1;
    return;
  }
  if (rateWindows.size >= MAX_TRACKED_CLIENTS) {
    throw new SignupError(429, 'Too many attempts. Please try again in 10 minutes.');
  }
  rateWindows.set(key, { count: 1, until: now + WINDOW_MS });
}

export async function saveSignup(signup: Signup): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new SignupError(503, 'Signups are temporarily unavailable. Please try again later.');
  }
  const digest = createHash('sha256').update(signup.email).digest('hex');
  const pathname = `early-access/v1/${digest}.json`;
  const options = { token, abortSignal: AbortSignal.timeout(8000) };

  try {
    await head(pathname, options);
    return;
  } catch (error) {
    if (!(error instanceof BlobNotFoundError)) {
      throw new SignupError(503, 'Signups are temporarily unavailable. Please try again later.');
    }
  }

  try {
    await put(
      pathname,
      JSON.stringify({
        email: signup.email,
        consent: { earlyAccessUpdates: true, version: '2026-11-06' },
        createdAt: new Date().toISOString(),
        source: 'syllivo-launch',
      }),
      {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: 'application/json',
        ...options,
      },
    );
  } catch {
    // A simultaneous duplicate may have created the same object. Confirm that
    // durable storage now exists before acknowledging success; never infer it
    // from a generic storage error or reveal its URL to the visitor.
    try {
      await head(pathname, { token, abortSignal: AbortSignal.timeout(4000) });
      return;
    } catch {
      throw new SignupError(503, 'Signups are temporarily unavailable. Please try again later.');
    }
  }
}
