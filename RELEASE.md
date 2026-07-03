# Release Process

## Versioning
Follow [semver](https://semver.org/):
- **Major** — breaking schema changes, API redesign
- **Minor** — new features (new content type, admin UX, public pages)
- **Patch** — bug fixes, dependency bumps, perf

## Pre-release checklist
- [ ] `npm run build` passes (no TS/compile errors)
- [ ] `npm run lint` passes (no warnings)
- [ ] `npm test` passes (all Vitest suites green)
- [ ] Admin CRUD works for all content types
- [ ] Public pages render (home, projects, blog, about)
- [ ] Auth flow works (login, session refresh, logout)
- [ ] New env vars documented in `.env.example`
- [ ] Schema changes applied to production Supabase (`supabase db push`)
- [ ] Migration tested against a staging Supabase project first
- [ ] `CHANGELOG.md` updated

## Release steps
```bash
# 1. Commit all changes
git add -A
git commit -m "chore: release v<version>"

# 2. Tag & push
git tag v<version>
git push origin main --tags

# 3. Netlify auto-deploys from main branch
#    Verify at https://app.netlify.com/sites/<site>/deploys
```

## Hotfix
```bash
git checkout main
git cherry-pick <fix-commit>
git tag v<version>
git push origin main --tags
```

## Rollback
- Netlify: Deploys → pick previous deploy → "Publish"
- Supabase: `supabase db diff` to reverse migration, or restore from backup
