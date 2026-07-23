import { Logo } from './Logo.js';

export interface FooterProps {
  appName?: string;
  accentColor?: string;
}

export function Footer({ appName, accentColor }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--fw-color-border)',
        padding: 'var(--fw-space-5) var(--fw-space-4)',
        color: 'var(--fw-color-muted)',
        fontSize: '0.875rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Logo appName={appName} accentColor={accentColor} />
      <a href="https://fleetworks.dev" style={{ color: 'inherit' }}>
        Part of the Fleetworks platform
      </a>
    </footer>
  );
}
