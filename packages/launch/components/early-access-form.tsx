'use client';
import { useId, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useSignupAvailability } from './signup-availability';

export function EarlyAccessForm() {
  const id = useId();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const enabled = useSignupAvailability();
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const data = new FormData(event.currentTarget);
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          consent: data.get('consent') === 'on',
          website: data.get('website'),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error(result.error || 'We couldn’t save your request. Please try again.');
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to connect. Please try again.');
    }
  }
  if (status === 'success')
    return (
      <div className="signup-success" role="status">
        <Check size={23} />
        <h3>You’re on the list.</h3>
        <p>Your request is saved. We’ll email you when early access opens.</p>
      </div>
    );
  if (!enabled)
    return (
      <div className="signup-success">
        <h3>A little more time to grow.</h3>
        <p>
          Early-access registration opens soon. For now, the sample lessons are free to explore — no
          account needed.
        </p>
        <Link className="button" href="/studio" style={{ marginTop: 20 }}>
          Explore sample lessons
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  return (
    <form className="early-access-form" onSubmit={submit}>
      <label htmlFor={`${id}-email`} className="signup-note">
        Your email address
      </label>
      <div className="signup-row">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          maxLength={254}
          disabled={status === 'sending'}
        />
        <button className="button" disabled={status === 'sending'} type="submit">
          {status === 'sending' ? 'Saving…' : 'Join early access'}
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this blank</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="signup-consent">
        <input name="consent" type="checkbox" required />{' '}
        <span>
          I agree to receive Syllivo early-access updates. I’ve read the{' '}
          <Link href="/privacy">privacy notice</Link>. I can unsubscribe by replying to any update.
        </span>
      </label>
      {message && (
        <p className="signup-message" data-error="true" role="alert">
          {message}
        </p>
      )}
      <p className="signup-note">
        Free preview today. Paid plans and custom course generation are coming later.
      </p>
    </form>
  );
}
