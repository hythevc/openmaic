import type { Metadata } from 'next';
import Link from 'next/link';
import { Brand } from '../../components/ui';
export const metadata: Metadata = { title: 'Preview terms' };
export default function Terms() {
  return (
    <main id="main" className="legal-page">
      <Brand />
      <h1>A space to explore.</h1>
      <p>Preview terms · Updated November 6, 2026</p>
      <h2>What’s available</h2>
      <p>
        Syllivo currently provides a free early-access preview with curated sample lessons, local
        progress, and a local course-brief editor. Custom AI course generation, cloud accounts,
        collaboration, and paid subscriptions are not available in this preview. There is no
        purchase or subscription contract created by using it.
      </p>
      <h2>Educational use</h2>
      <p>
        Sample content is for general learning, not professional, medical, legal, or financial
        advice. It may contain errors. Use your judgment and verify consequential information with
        appropriate sources.
      </p>
      <h2>Your inputs and progress</h2>
      <p>
        You retain your own inputs. Only enter content you have a right to use. Local progress and
        briefs may be lost if you clear browser data, change devices, or use private browsing. This
        preview does not offer cloud backups or guaranteed availability.
      </p>
      <h2>Responsible use</h2>
      <p>
        Do not interfere with the service, attempt unauthorized access, submit others’ email
        addresses, or use signup forms for spam. Features and availability may change as the product
        develops.
      </p>
      <h2>Open-source foundation</h2>
      <p>
        The core product is derived from OpenMAIC, licensed under MIT. Syllivo is an independent
        product and is not endorsed by the upstream project. See{' '}
        <Link href="/credits">credits and license</Link>.
      </p>
      <nav className="legal-nav">
        <Link href="/">Home</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/credits">Credits</Link>
      </nav>
    </main>
  );
}
