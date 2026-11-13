import Link from 'next/link';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand${compact ? ' brand--compact' : ''}`} aria-label="Syllivo home">
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M2 20C2 9 9 2 20 2h18v26c0 6-4 10-10 10H2Z" fill="#244c38" />
        <path d="M9 31C12 16 19 12 32 9c-3 14-10 21-23 22Z" fill="#dafa70" />
      </svg>
      <span>Syllivo</span>
    </Link>
  );
}

export function CourseArt({ kind }: { kind: string }) {
  if (kind === 'ai')
    return (
      <svg
        className="course-art"
        viewBox="0 0 400 180"
        role="img"
        aria-label="Three layers, representing AI, machine learning, and deep learning"
      >
        <rect width="400" height="180" fill="#f7f0dd" />
        <path d="m102 123 98-40 98 40-98 40Z" fill="#244c38" />
        <path d="m102 91 98-40 98 40-98 40Z" fill="#7ba579" />
        <path d="m102 59 98-40 98 40-98 40Z" fill="#dafa70" />
      </svg>
    );
  if (kind === 'thinking')
    return (
      <svg
        className="course-art"
        viewBox="0 0 400 180"
        role="img"
        aria-label="Overlapping circles representing assumptions and fundamental facts"
      >
        <rect width="400" height="180" fill="#ece4f5" />
        <circle cx="159" cy="90" r="65" fill="#d9c5ed" stroke="#244c38" strokeWidth="2" />
        <circle
          cx="241"
          cy="90"
          r="65"
          fill="#e5f7a4"
          fillOpacity=".8"
          stroke="#244c38"
          strokeWidth="2"
        />
      </svg>
    );
  return (
    <svg
      className="course-art"
      viewBox="0 0 400 180"
      role="img"
      aria-label="Small steps leading to a goal"
    >
      <rect width="400" height="180" fill="#e5f2df" />
      <path
        d="M68 144h42v-30h55v-30h85V55h49V20"
        fill="none"
        stroke="#244c38"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g fill="#244c38">
        <circle cx="68" cy="144" r="9" />
        <circle cx="165" cy="114" r="9" />
        <circle cx="250" cy="84" r="9" />
      </g>
      <path d="m300 20 37 14-37 15Z" fill="#dafa70" />
    </svg>
  );
}
