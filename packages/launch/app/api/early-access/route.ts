import {
  checkSignupOrigin,
  checkSignupRate,
  readSignup,
  saveSignup,
  SignupError,
} from '../../../lib/signup';

export const runtime = 'nodejs';

function response(body: object, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...(status === 429 ? { 'Retry-After': '600' } : {}),
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    checkSignupOrigin(request);
    checkSignupRate(request);
    const signup = await readSignup(request);
    await saveSignup(signup);
    return response({ ok: true });
  } catch (error) {
    if (error instanceof SignupError) {
      return response({ ok: false, error: error.message }, error.status);
    }
    return response(
      {
        ok: false,
        error: 'Signups are temporarily unavailable. Please try again later.',
      },
      503,
    );
  }
}
