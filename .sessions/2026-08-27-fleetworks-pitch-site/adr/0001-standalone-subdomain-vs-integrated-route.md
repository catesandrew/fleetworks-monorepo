# ADR 0001: Ship the pitch site as a standalone Vercel subdomain, not a fleetworks-web route

- **Status:** accepted
- **Date:** 2026-08-27
- **Deciders:** user (Andrew Cates), assistant

## Context

The pitch site needed to be live and reachable on a real Fleetworks domain
ahead of an internal stakeholder call. Two real hosting options existed: ship
it as its own Vercel project on a subdomain, or integrate it as a route inside
the existing `fleetworks-web` Next.js app (which serves `fleetworks.dev` and
already has routes like `/helmsman`, `/yellow-pages`, etc.).

Investigation of `fleetworks-web` found: Next.js 15 App Router, root
`layout.tsx` unconditionally wraps every route in a shared `<AppHeader />` and
`<Footer appName="Fleetworks" ... />` with no route-group override currently
in place. The pitch site has its own fully custom nav, hero, and footer built
for its scroll-video design. Dropping it in as-is would double up chrome
(their header + the pitch site's own nav, their footer + the pitch site's own
footer).

## Options considered

1. **Standalone Vercel project on a subdomain** (`overview.fleetworks.dev`) —
   ship the already-built, already-tested static site exactly as-is. Pros:
   minutes to live, zero regression risk to a site that was just fully
   verified. Cons: lives outside `fleetworks-web`'s routing/nav system;
   `fleetworks.dev/pitch` isn't a real URL yet.
2. **Integrate as a `fleetworks-web` route now** (e.g.
   `src/app/pitch/page.tsx`) — port the static HTML into a React page,
   either reuse the shared header/footer or add a route-group layout override
   to suppress them for this one route, move video/images into `public/`.
   Pros: correct long-term home, native `fleetworks.dev/pitch` URL. Cons:
   real porting work with some chance of introducing a last-minute bug in a
   site meant to be presented on a call happening soon.

## Decision

Ship as a standalone Vercel project (`fleetworks-pitch`) attached to
`overview.fleetworks.dev`, **because** the call was time-sensitive and the
static site was already fully built and verified — introducing a Next.js
port at that moment traded a known-good asset for new integration risk with
no benefit to the call itself. Integrating into `fleetworks-web` as a real
route is treated as a deliberate follow-up, not skipped work.

## Consequences

- **Positive:** Live in under two minutes via `vercel --prod` + `vercel
  domains add`, with zero DNS work since `fleetworks.dev`'s Cloudflare zone
  already had a wildcard `*.fleetworks.dev` A record pointing at Vercel.
  Nothing about the already-tested site changed to make it deployable.
- **Negative / cost:** Two separate deploy surfaces to maintain until
  integrated (`fleetworks-pitch` project vs. `fleetworks-web`). The pitch
  site's nav/footer visually diverges from the rest of `fleetworks.dev`.
  `overview.fleetworks.dev` is not currently git-tracked anywhere (see
  `FOLLOWUPS.md`).
- **Follow-on:** Port into `fleetworks-web` as `src/app/pitch/page.tsx` (or
  similar) once there's no call pressure — either reuse
  `AppHeader`/`Footer` and drop the site's own nav/footer, or add a
  route-group layout override to keep the site's current fully custom chrome.
  See `FOLLOWUPS.md`.

## Notes

- `fleetworks-web` root layout: `src/app/layout.tsx` (repo:
  `fleetworks-web`, read but not modified this session).
- Domain verification evidence: `vercel domains verify
  overview.fleetworks.dev` → `"reason": "configured_correctly"`,
  `"configuredBy": "A"`, existing wildcard A record, zero DNS changes made.
