# Architecture — Fleetworks pitch site (2026-08-27)

## Context

A single-page, scroll-driven pitch site with no build step (plain HTML/CSS/JS,
per the skill this was built under), that needed: a cinematic AI-generated
video hero scrubbed by scroll position, real product screenshots as proof, and
a progressively-revealing diagram — all served as static files with no server
component.

## Shape

```
fleetworks-pitch-site/                  (sibling dir, NOT under fleetworks-monorepo, NOT git-tracked)
├── index.html                          one page, all sections
├── PITCH-NOTES.md                      speaker notes for the live call
├── assets/
│   ├── css/style.css                   design tokens + all styles
│   ├── js/
│   │   ├── hero-scrub.js               drives the sticky-video hero
│   │   ├── arch-scroll.js              drives the architecture diagram reveal
│   │   └── main.js                     generic .reveal fade-ins
│   ├── video/hero.mp4                  processed hero clip
│   └── img/                            processed screenshots, stills, badges
├── .vercel/                            Vercel CLI project link (project: fleetworks-pitch)
└── _review/                            raw/unprocessed assets — NOT shipped, gitignored
```

Two independent scroll-driven mechanisms, both plain JS + `IntersectionObserver`
/ `requestAnimationFrame`, no animation library:

1. **Hero scrub** (`hero-scrub.js`) — a 600vh section with a `position:
   sticky` stage. On scroll, computes progress `0..1` across the section,
   maps it to the video's `currentTime`, and lerps toward that target in a
   rAF loop so seeks stay smooth and never overlap (`seeking` flag gates
   re-entry). The video is fetched as a `Blob` up front so `currentTime`
   scrubbing doesn't re-request over the network. Falls back to a static
   poster image on `file://` (fetch is blocked there) or
   `prefers-reduced-motion`.

2. **Architecture diagram reveal** (`arch-scroll.js`) — five stacked text
   "steps" next to a `position: sticky` SVG diagram. An `IntersectionObserver`
   watches each step; whichever one is centered marks itself active and
   reveals every diagram element (`data-step <= n`) up through its own step
   number, via CSS class toggles (`stroke-dashoffset` for lines, `opacity` +
   `transform: scale()` for nodes/labels). Reversible — scrolling back up
   un-reveals later steps because the observer re-fires as steps leave view.

Deploy topology: static files uploaded directly via `vercel --prod` (no git
repo involved), served from Vercel's edge, reachable at both the default
`fleetworks-pitch.vercel.app` and the attached custom domain
`overview.fleetworks.dev` (covered by `fleetworks.dev`'s existing wildcard DNS
record in Cloudflare — see ADR 0001).

## Key decisions

- Ship as a standalone Vercel project on a subdomain rather than a route
  inside the existing `fleetworks-web` Next.js app — see
  `adr/0001-standalone-subdomain-vs-integrated-route.md`.
- No animation library (GSAP considered, declined) — the hand-rolled
  scroll math was already smooth with zero console errors, so a dependency
  wasn't justified for effects the vanilla approach already achieved.

## Invariants

1. The page must remain fully static — no build step, no server, one
   `index.html` plus an `assets/` folder, openable via any static file host.
2. The hero must degrade gracefully to a static poster image whenever the
   video can't play (`file://`, `prefers-reduced-motion`, fetch failure) —
   the page is never allowed to look broken with the video missing.
3. Every screenshot and stat quoted in copy must trace back to something
   real (a live app screenshot, a plan doc, or a number from research) — no
   invented metrics.

## What's deliberately not here

- No framework, bundler, or package.json — intentional, per the skill this
  was built under (plain HTML/CSS/JS, single folder, one-command deploy).
- No CMS or data layer — all copy is hand-authored directly in `index.html`.
- No integration with `fleetworks-web`'s shared `AppHeader`/`Footer`
  components yet — this site has its own nav/footer. Integrating as a real
  route is deferred (see `FOLLOWUPS.md`).
