import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import { SignupAvailabilityProvider } from '../components/signup-availability';

export const metadata: Metadata = {
  title: { default: 'Syllivo — Make knowledge click.', template: '%s | Syllivo' },
  description:
    'Turn curiosity into understanding. Explore interactive sample lessons, practice what you learn, and discover a more active way to build new skills.',
  icons: { icon: '/syllivo-mark.svg' },
  openGraph: {
    title: 'Syllivo — Make knowledge click.',
    description: 'Interactive lessons. At your pace.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f8f8f3' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SignupAvailabilityProvider enabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}>
          {children}
        </SignupAvailabilityProvider>
      </body>
    </html>
  );
}
