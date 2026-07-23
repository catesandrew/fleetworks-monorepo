# Changesets

Run `pnpm changeset` after any change to `packages/*` that should ship a new
version. Follow the prompts, commit the generated markdown file alongside your
change. Merging to `main` opens/updates a "Version Packages" PR; merging that
PR publishes to npm via `.github/workflows/release.yml`.

See https://github.com/changesets/changesets for the full docs.
