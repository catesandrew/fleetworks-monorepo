# Summary — Fleetworks pitch site (2026-08-27)

## Goal

Build a cinematic, scroll-driven marketing/pitch site explaining why to use the
Fleetworks suite (Yellow Pages, Rolodex, Chorus, Helmsman, Warden) for an
internal stakeholder pitch call, then get it live on a real domain in time for
that call.

## What was done

The deliverable repo, `fleetworks-pitch-site/`, is a **sibling directory** to
this repo (`/Volumes/dev-ssd/repos/personal/fleetworks-pitch-site/`), not a
subdirectory of `fleetworks-monorepo`. It is currently **not git-tracked** —
see `FOLLOWUPS.md`.

### Research (parallel forks, no code)

- Read every file in `/Users/acates/Documents/obsidian/vault/Projects/fleetworks/`
  (CTO pitch decks, notes, todos, `platform-map.html`) for the platform's
  positioning and pitch narrative arc.
- Read this repo's `.omc/plans/{identity-correlation-externalid-decision,
  sso-saml-scim-platform-identity}.md` and the
  `.sessions/2026-08-24-zitadel-sso-phase1/` dossier for real
  engineering-credibility signals (adversarial AI review catching real bugs,
  test counts, RLS audit).
- Read cross-repo plans under `/Volumes/dev-ssd/repos/personal/.omc/plans/`
  (`fleetworks-auth-rollout.md`, `fleetworks-mobile-auth-parity.md`,
  `workloom-auth-platform.md`, `uptime-monitoring-rollout.md`, etc.) for the
  Workloom→Fleetworks platform lineage.
- Read `.omc/plans/` in each of the five sibling app repos (`yellow-pages`,
  `rolodex`, `chorus`, `helmsman`, `warden`) for per-app capabilities and best
  "reason to use it" per app.
- Read `/Users/acates/Documents/obsidian/vault/YT/ai-agents-the-most-valuable-skill-you-can-learn-in-2026-full-course.md`
  to characterize Remy's plain-language, concrete-before/after copywriting
  voice, used as the site's tone model.

### Site build — `fleetworks-pitch-site/`

- `index.html` — full single-page site: sticky-video scroll-scrub hero (600vh),
  problem section, 5-card app suite (real screenshots), Helmsman "control
  plane" spotlight section (added mid-session per user request, sourced from
  the real `fleetworks.dev/helmsman` and `fleetworks.dev/helmsman/cloud-agents`
  pages), proof/credibility section, scroll-stepped architecture diagram,
  honest "where this stands" status section, CTA linking to all 5 live apps.
- `assets/css/style.css` — design tokens (Space Grotesk / IBM Plex Sans /
  JetBrains Mono, per-app accent colors sampled from each app's real brand),
  hero scrub styles, card system, scroll-stepped SVG diagram styles.
- `assets/js/hero-scrub.js` — fetches the hero video as a Blob, lerps
  `video.currentTime` in a rAF loop gated against overlapping seeks, falls
  back to a static poster on `file://` or `prefers-reduced-motion`.
- `assets/js/arch-scroll.js` — IntersectionObserver-driven progressive reveal
  of the architecture diagram's nodes/lines/labels, one per scroll step,
  reversible on scroll-up.
- `assets/js/main.js` — generic `.reveal` fade-ins + intro-diagram draw-in.
- `assets/video/hero.mp4`, `assets/img/*` — processed media (see below).
- `PITCH-NOTES.md` — speaker notes for the live call: per-section talking
  points, the real numbers to quote, likely questions with answers.

### Media generated (Higgsfield MCP)

- Hero: 1 image frame (`nano_banana_pro`, 2k, 2 credits) → 1 video
  (`kling3_0`, pro mode, 6s, no sound, 10.5 credits vs 24 for MiniMax H3 vs
  54 for Seedance 2.5 — user chose Kling on cost). Re-cropped in `ffmpeg` to
  remove ~130px of baked-in black letterboxing the model rendered into the
  frame itself.
- 8 additional stills in one `generate_image_batch` call (16 credits total):
  3 section background textures (`bg-control`, `bg-proof`, `bg-cta`) and 5
  per-app "knot" accent badges (amber/purple/red/blue/green), used in place
  of the plain color dot next to each app name on the suite cards.
- Total Higgsfield spend this session: **28.5 of 110 credits** (balance now
  81.5).

### Real screenshots (Chrome DevTools MCP)

Captured from the user's own logged-in sessions at `yp.fleetworks.dev`,
`rolodex.fleetworks.dev`, `chorus.fleetworks.dev`, `helmsman.fleetworks.dev`,
`warden.fleetworks.dev`, plus `fleetworks.dev`, `fleetworks.dev/helmsman`, and
`fleetworks.dev/helmsman/cloud-agents`. Cropped/resized with `ffmpeg` into
`assets/img/*-card.jpg` and `assets/img/cloud-agents-diagram.jpg`.

### Deploy

- `npx vercel --prod` from `fleetworks-pitch-site/` created a new Vercel
  project `fleetworks-pitch` under the `catesandrew` account (no git repo
  required — Vercel CLI uploads the directory directly).
- Live at `https://fleetworks-pitch.vercel.app`, then attached the custom
  domain `overview.fleetworks.dev` via `vercel domains add`. It verified as
  `configured-correctly` immediately — `fleetworks.dev`'s Cloudflare DNS zone
  (zone id `7832c8a66e59e4e2676fc7d93d14d320`) already carries a wildcard
  `*.fleetworks.dev` A record pointing at Vercel, so no new DNS record was
  needed.
- Confirmed live at `https://overview.fleetworks.dev` via direct HTTPS
  request (200) and a real Chrome navigation (no console errors).

## Verification

- Copy-review gate run twice (after initial build and after the control-plane
  section addition): `grep` for em dashes and the stock-corporate-word list
  across `index.html` — clean both times.
- Chrome DevTools MCP checks at every major milestone: console messages
  (always empty), scroll-scrub behavior at multiple scroll depths, the
  architecture section's step-by-step reveal (both directions), suite cards
  and badges at desktop and mobile widths (~500px viewport — the harness's
  `resize_page` intermittently failed to shrink below 1440px on the original
  tab; closing and reopening the tab fixed it), and the `file://` protocol
  fallback (shows the static poster, does not attempt the video fetch, no
  console errors).
- Not verified: `prefers-reduced-motion` behavior (no direct emulation
  control exposed by the Chrome MCP tool used this session) — the code path
  is a straightforward `matchMedia` check that skips the fetch entirely, but
  it was not empirically exercised in a browser.
- Not verified: Lighthouse/performance numbers for `overview.fleetworks.dev`
  — skipped to stay ahead of the user's call.

## Commits

None. Neither `fleetworks-pitch-site` (untracked, no `.git`) nor
`fleetworks-monorepo` (untouched this session — see `git status` below) had
any commits made during this session.

`fleetworks-monorepo` was already 1 commit ahead of `origin/main`
(`054036f fix(infra): set WEB app type for chorus and yellow-pages OIDC
clients`) before this session started; that commit predates this work and was
not touched.

## Out of scope / deferred

- Porting the pitch site into `fleetworks-web` as a real Next.js route
  (`fleetworks.dev/pitch`) — deferred by explicit user choice in favor of
  shipping the standalone subdomain before the call. See `FOLLOWUPS.md`.
- Git-tracking `fleetworks-pitch-site/` itself.
- A Marp/slide-deck version of the pitch (user chose speaker notes + live
  site instead).
