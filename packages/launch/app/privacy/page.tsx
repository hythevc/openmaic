import type { Metadata } from 'next';
import Link from 'next/link';
import { Brand } from '../../components/ui';
export const metadata: Metadata = { title: 'Privacy notice' };
export default function Privacy() {
  return (
    <main id="main" className="legal-page">
      <Brand />
      <h1>Your curiosity is yours.</h1>
      <p>Privacy notice · Updated November 6, 2026</p>
      <h2>This early-access preview</h2>
      <p>
        Syllivo is an independent learning product maintained by the owner of the{' '}
        <a href="https://github.com/hythevc/openmaic">hythevc/openmaic repository</a>. This preview
        offers curated sample lessons. It does not provide a paid account or generate courses from
        uploaded documents.
      </p>
      <h2>What stays on your device</h2>
      <p>
        Lesson progress and course briefs are stored in your browser’s local storage. Briefs are not
        sent to an AI provider in this preview. They do not sync across devices. You can remove them
        by clearing this site’s browser data. Avoid entering confidential or sensitive personal
        information in a course brief.
      </p>
      <h2>Early-access registration</h2>
      <p>
        When signup collection is enabled, the form asks for your email address and permission to
        send early-access updates. A successful submission stores your email, consent version, and
        signup time in a private Vercel Blob store. We use this information for Syllivo early-access
        updates. We do not sell signup information. No email is collected when the registration form
        is unavailable.
      </p>
      <h2>Hosting and technical data</h2>
      <p>
        Vercel hosts this preview and may process technical request data, including IP addresses,
        timestamps, and error logs, to deliver and protect the service. The signup service
        temporarily uses a hash of your network address for request limits. Syllivo has not added
        advertising trackers or third-party analytics to this preview. See{' '}
        <a href="https://vercel.com/legal/privacy-policy">Vercel’s privacy policy</a> for its
        processing practices.
      </p>
      <h2>Your choices</h2>
      <p>
        Clear this site’s browser data to delete local progress and briefs. If you receive an
        early-access update, reply to request removal, access, or correction of your signup
        information. Before outbound updates begin, the operator must provide a monitored reply
        address. Operator contact information, when available, is on the{' '}
        <a href="https://github.com/hythevc">maintainer’s profile</a>. Do not post email addresses
        or other personal information in public GitHub issues.
      </p>
      <p>
        Signup records should be deleted when no longer needed for early access, and no later than
        12 months after signup unless you separately choose to become a customer. This notice will
        be updated before accounts, payments, document uploads, or AI generation are enabled.
      </p>
      <nav className="legal-nav">
        <Link href="/">Home</Link>
        <Link href="/terms">Preview terms</Link>
        <Link href="/credits">Credits</Link>
      </nav>
    </main>
  );
}
