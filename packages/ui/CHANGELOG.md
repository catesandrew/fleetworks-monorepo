# @fleet-works/ui

## 0.1.1

### Patch Changes

- Fix published `@fleet-works/suite-nav` dependency range — 0.1.0 shipped the raw
  `workspace:*` protocol specifier instead of a resolvable semver range, which
  broke `pnpm install` (and likely npm/yarn) for every consumer outside this
  monorepo.
