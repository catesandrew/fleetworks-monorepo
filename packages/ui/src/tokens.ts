/**
 * Shared design tokens. Per-app accent stays a token (see @fleet-works/suite-nav
 * for the canonical per-app accentColor); everything else here is the unified
 * chrome shape across all 5 apps + the apex site.
 */
export const tokens = {
  color: {
    ink: '#0B0F14',
    paper: '#FFFFFF',
    muted: '#6B7280',
    border: '#E5E7EB',
    surface: '#F9FAFB',
  },
  font: {
    sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, "SF Mono", "Cascadia Code", monospace',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64] as const,
} as const;

export type Tokens = typeof tokens;
