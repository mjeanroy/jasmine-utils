# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`jasmine-utils` is a library of custom Jasmine matchers (`toStartWith`, `toBeSorted`, `toHaveBeenCalledOnce`, …) and spy helpers (`jasmine.spyAll`, `jasmine.spyIf`, …). It works with Jasmine 1.x through 4.x. The source is ES modules, and Rollup bundles it into one IIFE at `src/jasmine-utils.js`. That file is the package `main`, it is git-ignored, and you should never edit it by hand.

## Commands

The package manager is pnpm (see `pnpm-workspace.yaml`; CI uses pnpm 12 via `pnpm/setup` and Node 26 via `actions/setup-node`, and `.nvmrc` pins the local Node version). All scripts are gulp tasks defined in `gulpfile.js`, with their code in `scripts/`.

- `pnpm lint`: ESLint (airbnb-base) over root, `scripts/`, `src/` and `test/` (`.js` and `.ts`). Any warning fails the task. To lint only some paths, use `pnpm lint --file <path>`, which can be repeated and accepts files, directories or globs. The lint step that `test`, `build` and `release` run first always covers the whole project.
- `pnpm test`: clean, then lint, then Karma single run in headless Chrome. If `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` are set, it runs on SauceLabs instead.
- `pnpm tdd`: Karma in watch mode with real Chrome (`scripts/test/karma.tdd.conf.js`).
- `pnpm coverage`: Karma with istanbul coverage, written to `/coverage`.
- `pnpm build`: clean, then lint, then the Rollup bundle at `src/jasmine-utils.js`.
- `pnpm docs`: regenerates `README.md` from matcher JSDoc (see below).

By default every spec is bundled from the single entry `test/index.js`. `test`, `tdd` and `coverage` accept two options. They are parsed by the shared `scripts/cli/index.js`, which uses Node's built-in `parseArgs`, and passed to Karma:

- `--file <path>` runs only the given spec files instead of `test/index.js`. It can be repeated and accepts globs. Example: `pnpm test --file test/matchers/strings/to-start-with.spec.js`.
- `--filter <pattern>` runs only specs whose full name (describe + it) contains the pattern, and `/regex/flags` also works. Example: `pnpm test --filter "toStartWith should not pass"`.

The two can be combined, and both also accept the `--name=value` form.

## Architecture

### Matchers are version-agnostic functions

Each matcher in `src/core/matchers/<category>/<kebab-name>.js` is a plain function with the signature `(ctx, ...args) => ({ pass, message() })`:

- `ctx` holds `actual`, `isNot`, `pp`, `equals`, `callCount` and `argsFor`. These are adapters, so matchers never touch Jasmine APIs directly.
- `message()` returns a string with a `{{not}}` placeholder. `src/core/jasmine/negate-message.js` replaces it with `not` or removes it.
- Matchers return the positive result only. The factory flips `pass` for `.not`.

`src/core/jasmine/matcher-factory.js` chooses `j1`–`j4-matcher-factory.js` based on the detected Jasmine major version (`version.js`, falling back to the j3 factory). The chosen factory wraps each generic matcher in the Jasmine-specific matcher API and builds `ctx`. `src/index.js` registers every export of `src/core/matchers/index.js` through a global `beforeEach`, attaches every export of `src/core/spies/index.js` to `jasmine.*`, and adds the deprecated aliases (`toStartsWith`, etc.).

`src/core/util/` holds small dependency-free helpers (`is-*`, `for-each`, `keys`, …). The output must still run in old browsers and Jasmine 1.3, so matchers rely on these helpers instead of newer built-ins.

### Adding or changing a matcher touches several places

1. Matcher file in `src/core/matchers/<category>/`.
2. Export in `src/core/matchers/index.js`.
3. Typings in `src/index.d.ts`.
4. Unit spec in `test/matchers/<category>/<name>.spec.js`, plus an import in that folder's `index.js`. Unit specs call the function directly with `createFakeContext(actual)` from `test/testing/` and check `pass` and the raw message, `{{not}}` included.
5. Integration spec in `test/integrations/matchers/<category>/`, plus an import in its `index.js`. Integration specs import `src/index` and use the real `expect(...)`.
6. JSDoc on the matcher. `pnpm docs` uses `dox` to parse every matcher's JSDoc (`@message`, `@example`, `@param`, `@since`) and renders `scripts/docs/readme-template.txt` into `README.md`. Edit the template or the JSDoc, not the generated matcher section of the README.

Tests that need features missing from some browsers (Symbol, Map, Set, freeze, …) use the `assume*` helpers in `test/detect/`, which mark the spec as pending.

### Conventions

- Every source file starts with the MIT license header. Rollup strips per-module banners and prepends `LICENSE`.
- ESLint's `valid-jsdoc` rule is enforced. Every function, including those in `scripts/` and tests, needs JSDoc with described `@param`s and a described `@return`, even when it returns `void`. Lint fails without it.
- ESLint stays on v8 with the legacy `.eslintrc` format. Dependabot ignores ESLint major updates until the config is migrated to flat config. It also ignores major updates to `karma-jasmine-html-reporter`, whose next major requires Jasmine 4 or later.
- Installs are restricted by `pnpm-workspace.yaml`: a package version must be at least 2 days old (`minimumReleaseAge`), and `trustPolicy: no-downgrade` rejects packages whose publish trust level dropped. When an install fails on the trust policy, the existing fix is to add that exact version to `trustPolicyExclude`, in its own commit (e.g. `chore: trust chromium-bidi@…`). `.npmrc` sets `save-exact`, and `pnpm-workspace.yaml` repeats it as `saveExact` because pnpm 11+ ignores non-auth settings in `.npmrc`.
- GitHub Actions are pinned to commit SHAs with the version as a trailing comment (`uses: actions/checkout@<sha> # v7.0.1`). The workflow runs with `permissions: {}` and `persist-credentials: false`.
- Commit messages follow Conventional Commits, for example `chore(ci): …`, `chore(deps-dev): …` and `chore: …`. `CHANGELOG.md` has not been updated since 0.5.0, so don't add entries to it.
- Releases use `pnpm release:patch|minor|major`. The task runs lint, build, test and docs, then bumps `package.json`/`bower.json`. It force-adds the built `src/jasmine-utils.js` and commits, tags the release, and finally commits the bundle's removal ("prepare next release"). The bundle therefore exists only in tagged release commits.
