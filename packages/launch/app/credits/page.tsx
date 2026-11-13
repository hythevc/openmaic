import type { Metadata } from 'next';
import Link from 'next/link';
import { Brand } from '../../components/ui';
export const metadata: Metadata = { title: 'Open-source credits' };
export default function Credits() {
  return (
    <main id="main" className="legal-page">
      <Brand />
      <h1>Built on shared knowledge.</h1>
      <p>
        Syllivo is an independent product built on{' '}
        <a href="https://github.com/THU-MAIC/OpenMAIC">OpenMAIC</a>. Its open-source classroom
        engine is the foundation for Syllivo’s planned course-generation service. The public preview
        contains curated sample lessons and an independently designed interface.
      </p>
      <h2>OpenMAIC · MIT License</h2>
      <p>Copyright (c) 2026 THU-MAIC</p>
      <p>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this
        software and associated documentation files (the “Software”), to deal in the Software
        without restriction, including without limitation the rights to use, copy, modify, merge,
        publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
        to whom the Software is furnished to do so, subject to the following conditions:
      </p>
      <p>
        The above copyright notice and this permission notice shall be included in all copies or
        substantial portions of the Software.
      </p>
      <p>
        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
        INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
        FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
        DEALINGS IN THE SOFTWARE.
      </p>
      <h2>Interface tools</h2>
      <p>
        This preview uses Next.js, React, Inter, Lucide icons, and the Vercel Blob SDK. Their
        respective open-source licenses remain in the dependency distributions. Syllivo is not
        affiliated with or endorsed by these projects.
      </p>
      <nav className="legal-nav">
        <Link href="/">Home</Link>
        <Link href="/studio">Explore lessons</Link>
      </nav>
    </main>
  );
}
