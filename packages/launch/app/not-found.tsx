import Link from 'next/link';
import { Brand } from '../components/ui';
export default function NotFound() {
  return (
    <main id="main" className="legal-page">
      <Brand />
      <h1>A little off course.</h1>
      <p>We couldn’t find that lesson or page. There’s plenty more to explore.</p>
      <Link className="button" href="/studio">
        Explore lessons
      </Link>
    </main>
  );
}
