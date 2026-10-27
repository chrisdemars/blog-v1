// Tailwind only generates classes it can find written out in full, so map
// variants to complete class names instead of building `surface-${variant}`.
export const SURFACE_CLASS = {
  primary: 'surface-primary',
  secondary: 'surface-secondary',
} as const;

export type SurfaceVariant = keyof typeof SURFACE_CLASS;
