import assert from 'node:assert/strict';
import { beforeEach, mock, test } from 'node:test';

class BlobNotFoundError extends Error {}
const head = mock.fn();
const put = mock.fn();
mock.module('@vercel/blob', { namedExports: { BlobNotFoundError, head, put } });

const {
  checkSignupOrigin,
  checkSignupRate,
  MAX_SIGNUP_BYTES,
  readSignup,
  saveSignup,
  SignupError,
  validateSignup,
} = await import('../lib/signup.ts');

const input = { email: 'person@example.com', consent: true, website: '' };
const request = (body, headers = {}) => new Request('https://syllivo.example/api/early-access', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: 'https://syllivo.example', ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

beforeEach(() => {
  delete process.env.SIGNUP_ORIGIN;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  head.mock.resetCalls();
  put.mock.resetCalls();
  head.mock.mockImplementation(async () => { throw new BlobNotFoundError(); });
  put.mock.mockImplementation(async () => ({ url: 'private-url-not-returned' }));
});

test('normalizes email and requires explicit consent and an empty honeypot', () => {
  assert.deepEqual(validateSignup({ ...input, email: ' Person@Example.com ' }), {
    email: 'person@example.com', consent: true,
  });
  for (const bad of [
    null, [], { ...input, consent: 'true' }, { ...input, consent: false },
    { ...input, website: 'https://spam.example' }, { ...input, email: 'a@' },
    { ...input, email: 'a..b@example.com' }, { ...input, email: 'a@example-.com' },
    { ...input, email: `${'a'.repeat(65)}@example.com` }, { ...input, extra: true },
  ]) {
    assert.throws(() => validateSignup(bad), (error) => error instanceof SignupError && error.status === 400);
  }
});

test('bounds actual streamed bytes even without a Content-Length header', async () => {
  await assert.rejects(readSignup(request(' '.repeat(MAX_SIGNUP_BYTES + 1))),
    (error) => error instanceof SignupError && error.status === 413);
  await assert.rejects(readSignup(request('{bad json')),
    (error) => error instanceof SignupError && error.status === 400);
  await assert.rejects(readSignup(request(input, { 'Content-Type': 'text/plain' })),
    (error) => error instanceof SignupError && error.status === 415);
  assert.deepEqual(await readSignup(request(input)), { email: input.email, consent: true });
});

test('rejects missing and foreign origins and cross-site browser requests', () => {
  checkSignupOrigin(request(input));
  for (const headers of [{ Origin: 'null' }, { Origin: 'https://attacker.example' },
    { Origin: '', 'sec-fetch-site': 'same-origin' }, { 'sec-fetch-site': 'cross-site' }]) {
    assert.throws(() => checkSignupOrigin(request(input, headers)),
      (error) => error instanceof SignupError && error.status === 403);
  }
  process.env.SIGNUP_ORIGIN = 'https://canonical.example';
  assert.throws(() => checkSignupOrigin(request(input)), { status: 403 });
  checkSignupOrigin(request(input, { Origin: 'https://canonical.example' }));
});

test('fails closed without a storage token', async () => {
  await assert.rejects(saveSignup(validateSignup(input)), { status: 503 });
  assert.equal(head.mock.callCount(), 0);
  assert.equal(put.mock.callCount(), 0);
});

test('stores consent in a private object with a digest path and no overwrite', async () => {
  process.env.BLOB_READ_WRITE_TOKEN = 'test-token';
  assert.equal(await saveSignup(validateSignup(input)), undefined);
  const [pathname, content, options] = put.mock.calls[0].arguments;
  assert.match(pathname, /^early-access\/v1\/[a-f0-9]{64}\.json$/);
  assert.ok(!pathname.includes('person'));
  assert.deepEqual(JSON.parse(content).consent, { earlyAccessUpdates: true, version: '2026-11-06' });
  assert.equal(options.access, 'private');
  assert.equal(options.allowOverwrite, false);
  assert.equal(options.addRandomSuffix, false);
});

test('acknowledges an existing durable signup without overwriting consent', async () => {
  process.env.BLOB_READ_WRITE_TOKEN = 'test-token';
  head.mock.mockImplementation(async () => ({}));
  assert.equal(await saveSignup(validateSignup(input)), undefined);
  assert.equal(put.mock.callCount(), 0);
});

test('confirms storage after a concurrent duplicate write loses its race', async () => {
  process.env.BLOB_READ_WRITE_TOKEN = 'test-token';
  let reads = 0;
  head.mock.mockImplementation(async () => {
    if (++reads === 1) throw new BlobNotFoundError();
    return {};
  });
  put.mock.mockImplementation(async () => { throw new Error('duplicate'); });
  assert.equal(await saveSignup(validateSignup(input)), undefined);
  assert.equal(head.mock.callCount(), 2);
});

test('does not report success or expose provider details on storage failures', async () => {
  process.env.BLOB_READ_WRITE_TOKEN = 'test-token';
  put.mock.mockImplementation(async () => { throw new Error('private details person@example.com'); });
  await assert.rejects(saveSignup(validateSignup(input)), (error) =>
    error.status === 503 && !error.message.includes('person@example.com'));
});

test('limits repeated requests per client digest in the running instance', () => {
  const req = request(input, { 'x-forwarded-for': '192.0.2.121' });
  for (let attempt = 0; attempt < 8; attempt += 1) checkSignupRate(req);
  assert.throws(() => checkSignupRate(req), { status: 429 });
  checkSignupRate(request(input, { 'x-forwarded-for': '192.0.2.122' }));
});
