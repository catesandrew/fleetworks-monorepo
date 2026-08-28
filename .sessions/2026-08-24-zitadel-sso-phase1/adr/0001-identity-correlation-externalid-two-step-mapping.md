# ADR 0001: Identity correlation uses a two-step SCIM externalId mapping, rolodex-only

- **Status:** accepted
- **Date:** 2026-08-24
- **Deciders:** session, informed by 3 rounds of codex critic review

## Context

Rolodex's Gap 2 (shipped `fbbcd82`) added a `zitadel_subject` column and JIT
lookup ordering, matching Decision 5's original plan text: correlate existing
Supabase users to Zitadel subjects "on email." The Phase 0 spike's own later
findings concluded email is a weak join key and recommended SCIM's
`externalId` instead — but the plan document was never reconciled between
these two positions, and a first attempt at reconciling it conflated two
different values (the lookup key vs. the value actually stored) and assumed a
single `externalId` field could serve all 4 downstream apps at once, which
it structurally cannot (one field, four apps' independent local IDs for the
same person).

## Options considered

1. **Keep email correlation as originally planned.** Weak join key, real
   duplicate-row risk on any email mismatch. Rejected.
2. **A single externalId-based mechanism, applied suite-wide immediately.**
   Rejected: cardinality — one Zitadel user has one `externalId`; the same
   person has four independently-generated local IDs across
   rolodex/chorus/helmsman/warden's separate databases.
3. **A two-step mapping, rolodex/Phase-1-scoped only, with the suite-wide
   version explicitly deferred.** SCIM `externalId` (set to rolodex's own
   existing `users.id` at proactive provisioning time) locates the row during
   a one-time backfill; the Zitadel user's own `id`/`sub` — never the
   `externalId` itself — is what gets written into `zitadel_subject`.

## Decision

**Option 3.** The already-shipped `zitadel_subject` column + JIT lookup
(`fbbcd82`) stays exactly as built; only the backfill's data source changes,
and only when Phase 1 actually implements it. Chorus/helmsman/warden's own
Phase 4 correlation mechanism is explicitly recorded as an open, deferred
decision — not silently assumed solved by the same approach.

## Consequences

- **Positive:** closes the spike's own documented concern (email is weak)
  without any rework of already-shipped, working code in any of the four
  apps; the two-value conflation and cardinality bugs found by codex review
  are fixed, not just papered over.
- **Negative / cost:** Phase 4's correlation mechanism for the other three
  apps is still an open question — likely per-app Zitadel user metadata,
  unconfirmed on this Zitadel version — and needs its own investigation when
  each app's Phase 4 sub-task actually starts.
- **Follow-on:** recorded in `FOLLOWUPS.md`. Decision 2 (the separate
  `directory_users`/SCIM-reconciler correlation problem, Phase 2) is
  explicitly out of scope for this decision and needs its own.

## Notes

- Executed as 7 edits to `fleetworks-monorepo/.omc/plans/sso-saml-scim-platform-identity.md`
  (Decision 5, D2 forward-reference, architecture diagram, Phase 0 historical
  note, Phase 1 task line, risk-mitigation row, live "Identity migration"
  acceptance criterion, new dated cross-app survey section).
- Full plan + revision history: `fleetworks-monorepo/.omc/plans/identity-correlation-externalid-decision.md`
  (gitignored, local artifact — not a commit).
- Rolodex `fbbcd82` (Gap 2) referenced, not modified.
