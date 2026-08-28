# Session: Fleetworks pitch site — 2026-08-27

> Resume pointer + index for this session's dossier. Read this first.

## State in one paragraph

Built and shipped a complete, verified, scroll-driven pitch site for the
Fleetworks suite at `/Volumes/dev-ssd/repos/personal/fleetworks-pitch-site/`
(sibling to this repo, not inside it). It is live at
`https://overview.fleetworks.dev` (also `https://fleetworks-pitch.vercel.app`),
console-clean, verified at desktop and mobile widths. `PITCH-NOTES.md`
(speaker notes for the live call) ships alongside it. Nothing is blocked for
the call itself. The one real gap: the site folder is not git-tracked yet.

## Resume prompt (paste into a new session)

```
Resume the fleetworks-pitch-site work. Read
.sessions/2026-08-27-fleetworks-pitch-site/README.md and FOLLOWUPS.md.
State: pitch site is live and verified at https://overview.fleetworks.dev,
call-ready. Next action: git-init fleetworks-pitch-site/ and push it to a
new GitHub repo (see FOLLOWUPS.md for the exact steps).
```

## Repo state

| Repo | Branch | Last commit | Committed? | Pushed? | Notes |
|------|--------|-------------|-----------|---------|-------|
| `fleetworks-pitch-site` (sibling dir, not under this repo) | n/a | n/a | **not git-tracked at all** | n/a | Deployed directly via `vercel --prod` CLI upload, no repo required. See `FOLLOWUPS.md`. |
| `fleetworks-monorepo` (this repo) | main | `054036f fix(infra): set WEB app type for chorus and yellow-pages OIDC clients` | yes | ahead 1 | Pre-existing state from before this session; untouched by this work. |
| `fleetworks-web` | main | (unchanged) | yes | in sync | Read-only this session (inspected `src/app/layout.tsx` and `src/app/helmsman/page.tsx` to inform ADR 0001). Not modified. |

## Read first (rebuilds context fastest)

1. `SUMMARY.md` — everything that was built, generated, and deployed
2. `FOLLOWUPS.md` — what's left, especially the git-init gap
3. `adr/0001-standalone-subdomain-vs-integrated-route.md` — why it's a
   standalone subdomain today instead of a `fleetworks-web` route
4. `../../fleetworks-pitch-site/PITCH-NOTES.md` — the actual speaker notes
   for the call (lives in the site repo, not this dossier)
5. `LESSONS.md` — the DNS-wildcard and credential-check lessons, worth
   knowing before touching `fleetworks.dev` infra again

## First action

Nothing is blocking the call — the site is live and verified. The next real
piece of work is the git-init/GitHub-push follow-up in `FOLLOWUPS.md`, which
has no urgency until someone needs to edit the site again from a different
machine or wants real diff history.

## Dossier contents

- `SUMMARY.md` — what was done
- `LESSONS.md` — lessons learned
- `ARCHITECTURE.md` — the site's scroll-mechanism architecture
- `adr/0001-standalone-subdomain-vs-integrated-route.md` — the hosting decision
- `FOLLOWUPS.md` — open items
- `BLOG.md` — public write-up (⚠ review before publishing — sanitized, but confirm before posting anywhere)
