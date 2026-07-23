# @fleet-works/ui

Shared chrome for the Fleetworks suite: design tokens, the app switcher, logo
lockup, and footer. Per-app sidebar/topbar content stays in each app — this
package only owns the parts meant to look identical everywhere.

```tsx
import '@fleet-works/ui/tokens.css';
import { AppSwitcher, Footer } from '@fleet-works/ui';

<AppSwitcher currentId="chorus" />
<Footer appName="Chorus" accentColor="#10A47A" />
```

## Status

v0.1.0 ships tokens + `AppSwitcher` + `Logo` + `Footer` only. Extracting the
near-duplicate `app-sidebar.tsx` / `dashboard-topbar.tsx` / `public-chrome.tsx`
from each of the 5 apps into shared components here is the next phase — not
done yet, needs a careful per-app diff first since each has slightly different
nav sections.
