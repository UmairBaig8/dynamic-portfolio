# Changelog

All notable changes to this project are documented here.

## [1.1.0] - 2026-07-03

### Added
- OG / Twitter card metadata on home, project detail, and post detail pages
- Custom 404 page matching site design
- Dynamic sitemap.xml for SEO
- RSS feed at /blog/rss.xml
- Loading skeletons on all public routes (loading.js)
- Reading time estimate on blog posts
- Project categories (category field + filter bar on /projects)
- Scheduled publishing (publish_at datetime field)
- Related projects/posts (by overlapping tech_stack/tags)
- Drag-to-reorder projects (dnd-kit based sortable table)
- Search/filter in admin projects and posts tables
- Bulk actions for posts (publish/unpublish/delete with checkboxes)
- Preview button on draft posts (auth-protected /preview/[slug] route)
- Autosave to localStorage + unsaved-changes warning (beforeunload)
- Recent activity feed on dashboard (last 5 edited projects + posts)
- Cover image thumbnails in admin projects and posts tables
- Image optimization (Next.js <Image> for all public images)
- `NEXT_PUBLIC_SITE_URL` env var for RSS/sitemap/robots
- Project-level AGENTS.md, TEST.md, RELEASE.md, CHANGELOG.md
- GitHub Actions CI (build + test on push/PR)
- Vitest with first test suite (slugify)

### Fixed
- `cookies()` async compatibility for Next.js 16 + Node 22 — all `createClient()` calls now use `await`

## [1.0.0] - 2026-06-??

### Added
- Initial release: Next.js portfolio with self-hosted admin dashboard
- Projects CRUD with featured/sort ordering
- Blog posts with rich text editor (TipTap)
- Auth via Supabase, session refresh via middleware
- Image uploads to Supabase Storage
- Site settings (name, bio, social links)
- Netlify deployment config
