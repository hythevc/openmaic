import type { Metadata } from 'next';
import Studio from '../../components/studio';
export const metadata: Metadata = { title: 'Your learning studio' };
export default function StudioPage() {
  return <Studio />;
}
