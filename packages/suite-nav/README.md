# @fleet-works/suite-nav

Zero-dependency registry of every app in the Fleetworks suite. No React, no
runtime deps — just the `suiteApps` data + `SuiteApp` type, consumed by
`@fleet-works/ui`'s app switcher and anything else that needs to know what's
in the suite.

```ts
import { suiteApps, otherSuiteApps } from '@fleet-works/suite-nav';

otherSuiteApps('chorus'); // every app except Chorus itself
```

Rolodex's `accentColor` is a placeholder (`#7C3AED`) pending a real confirmed
brand color — update here once decided.
