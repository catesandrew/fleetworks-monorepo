export interface SuiteApp {
  /** Stable machine-readable key, matches the app's repo/subdomain label. */
  id: string;
  /** Display name. */
  name: string;
  /** One-line description of what the app does. */
  description: string;
  /** Live production URL. */
  url: string;
  /** Brand accent color (hex) used in the switcher + chrome. */
  accentColor: string;
}

/**
 * Canonical registry of every app in the Fleetworks suite, including the
 * apex/hub site itself. Hardcoded on purpose — this is the seed for what
 * eventually becomes a live lookup against the Yellow Pages service catalog.
 */
export const suiteApps: SuiteApp[] = [
  {
    id: 'fleetworks',
    name: 'Fleetworks',
    description: 'Home — the internal developer platform suite.',
    url: 'https://fleetworks.dev',
    accentColor: '#111827',
  },
  {
    id: 'yellow-pages',
    name: 'Yellow Pages',
    description: 'Service catalog — services, teams, AWS accounts, labels.',
    url: 'https://yp.fleetworks.dev',
    accentColor: '#1A7F5A',
  },
  {
    id: 'rolodex',
    name: 'Rolodex',
    description: 'Directory — LDAP Sync Cache lookups for users & groups.',
    url: 'https://rolodex.fleetworks.dev',
    accentColor: '#7C3AED',
  },
  {
    id: 'chorus',
    name: 'Chorus',
    description: 'DNS — record & domain management.',
    url: 'https://chorus.fleetworks.dev',
    accentColor: '#10A47A',
  },
  {
    id: 'helmsman',
    name: 'Helmsman',
    description: 'Deployments & agentic workloads control plane.',
    url: 'https://helmsman.fleetworks.dev',
    accentColor: '#2E62C9',
  },
  {
    id: 'warden',
    name: 'Warden',
    description: 'Terraform Cloud & cloud governance — the governed front door.',
    url: 'https://warden.fleetworks.dev',
    accentColor: '#2FA25E',
  },
];

export function getSuiteApp(id: string): SuiteApp | undefined {
  return suiteApps.find((app) => app.id === id);
}

export function otherSuiteApps(currentId: string): SuiteApp[] {
  return suiteApps.filter((app) => app.id !== currentId);
}
