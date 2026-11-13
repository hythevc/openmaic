import { describe, expect, it } from 'vitest';
import { DEFAULT_BRAND } from '@/lib/brand/brand-config';

describe('DEFAULT_BRAND (single-brand build)', () => {
  it('uses the Syllivo identity for full chrome', () => {
    expect(DEFAULT_BRAND.productName).toBe('Syllivo');
    expect(DEFAULT_BRAND.shortName).toBe('Syllivo');
    expect(DEFAULT_BRAND.markSrc).toBe('/syllivo-mark.svg');
    expect(DEFAULT_BRAND.themeColor).toBe('#244c38');
  });

  it('marks its horizontal logo as already containing the wordmark', () => {
    expect(DEFAULT_BRAND.logoHasWordmark).toBe(true);
    expect(DEFAULT_BRAND.logoSrc).toBe('/syllivo-wordmark.svg');
  });
});
