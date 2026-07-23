import type { CSSProperties } from 'react';

export interface LogoProps {
  /** The current app's display name, e.g. "Chorus". Omit to render just "Fleetworks". */
  appName?: string;
  accentColor?: string;
  style?: CSSProperties;
}

/** "Fleetworks" wordmark, optionally with " · <AppName>" appended in the app's accent. */
export function Logo({ appName, accentColor, style }: LogoProps) {
  return (
    <span style={{ fontWeight: 600, letterSpacing: '-0.01em', ...style }}>
      Fleetworks
      {appName ? (
        <>
          <span style={{ color: 'var(--fw-color-muted)', fontWeight: 400 }}> · </span>
          <span style={{ color: accentColor ?? 'inherit' }}>{appName}</span>
        </>
      ) : null}
    </span>
  );
}
