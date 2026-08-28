# Follow-ups — Fleetworks pitch site (2026-08-27)

## Blocked on the user (decisions / approvals / access)

- [ ] Confirm real screenshots (containing live staff emails and seeded
      `acme.test`/demo data) stay acceptable if this site's audience ever
      expands beyond the internal call it was built for — currently fine
      per the user's own "internal stakeholder pitch" framing, but re-check
      before any wider distribution.
- [ ] Decide timing for porting the site into `fleetworks-web` as a real
      route (`fleetworks.dev/pitch`) — see ADR 0001. No urgency assigned;
      purely the user's call on when.

## Blocked on work (do next)

- [ ] `git init` the `fleetworks-pitch-site/` folder and push it to a new
      GitHub repo (mirroring `fleetworks-web`'s
      `github.com/catesandrew/fleetworks-web` convention) — it currently
      exists only on local disk plus whatever Vercel's CLI upload holds.
      First concrete step: `cd fleetworks-pitch-site && git init && git add
      -A && git commit -m "..."`, then create+push to a new
      `catesandrew/fleetworks-pitch` GitHub repo and (optionally) connect it
      to the existing Vercel project for git-based deploys instead of CLI
      uploads.
- [ ] Port the pitch site into `fleetworks-web` as
      `src/app/pitch/page.tsx` (or similar), reusing or overriding the
      shared `AppHeader`/`Footer` — see ADR 0001 for the two sub-options.

## Nice-to-have / later

- [ ] Run a Lighthouse/performance pass on `overview.fleetworks.dev` and
      note the numbers (the site-building process this was built under calls
      for "speed receipts" — skipped this session to stay ahead of the
      user's call).
- [ ] Actually exercise `prefers-reduced-motion` in a real browser (not just
      code-review the `matchMedia` branch in `hero-scrub.js`) — the Chrome
      DevTools MCP tool used this session had no direct control for that
      media feature.

## Known risks / watch-outs

- `fleetworks-pitch-site/` is not under version control. Losing the local
  disk copy loses the source (the Vercel deployment itself would survive,
  but future edits couldn't be tracked/diffed). See the git-init follow-up
  above.
- Higgsfield balance is now 81.5 of 110 credits after this session's hero
  video + 8-still batch (28.5 spent). Budget-check before generating another
  large batch.
- The pitch site's nav/footer will visually diverge from the rest of
  `fleetworks.dev` until/unless it's integrated as noted in ADR 0001 — fine
  for a standalone subdomain, worth knowing if someone navigates between
  `overview.fleetworks.dev` and the main site back-to-back.

## Done this session (for reference)

- [x] Full scroll-driven pitch site built (`fleetworks-pitch-site/index.html`
      + `assets/`), covering all 5 apps plus a dedicated Helmsman
      "control plane" section
- [x] Hero video generated (Higgsfield: `nano_banana_pro` frame +
      `kling3_0` video) and letterbox-cropped
- [x] 8 additional stills generated (3 section backgrounds, 5 per-app badges)
- [x] Architecture section rebuilt as a scroll-stepped progressive-reveal
      diagram, and a dangling extra SVG line bug fixed in both diagrams
- [x] `PITCH-NOTES.md` speaker-notes doc written for the live call
- [x] Deployed to Vercel (`fleetworks-pitch` project) and attached to
      `overview.fleetworks.dev`, verified live with no console errors
