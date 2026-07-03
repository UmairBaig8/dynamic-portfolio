# Agents — Project Conventions

## Overview
Next.js 16 App Router portfolio with Supabase Postgres backend. Admin dashboard at `/admin` uses server actions for all CRUD. No ORM — raw Supabase JS client.

## Code Style
- No comments in production code
- No semicolons
- Single quotes for strings
- 2-space indentation
- Inline styles over CSS modules (global styles in `app/globals.css`)
- `async/await` everywhere, no `.then()`

## Supabase
- Server client: `await createClient()` from `@/lib/supabase/server` (always async, `cookies()` returns Promise in Next 16)
- Browser client: `createClient()` from `@/lib/supabase/client`
- All pages use `export const revalidate = 0`
- Server actions in `app/admin/actions.js` — one file, all exported functions
- Every server action: `const supabase = await createClient()` at the top

## Data Model
- `projects` — uuid PK, title, slug, summary, description, tech_stack[], category, cover_image_url, live_url, repo_url, featured, sort_order
- `posts` — uuid PK, title, slug, excerpt, content (HTML), cover_image_url, tags[], published, published_at, publish_at (scheduled future publish)
- `site_settings` — single row (id=1), name, tagline, bio, avatar_url, resume_url, email, github_url, linkedin_url, twitter_url

## Admin Pattern
- Each content type has: `admin/<type>/page.js` (list), `admin/<type>/new/page.js` (create), `admin/<type>/[id]/edit/page.js` (edit)
- Forms are shared components in `components/` (ProjectForm, PostForm, SettingsForm)
- Server actions redirect or return `{ error: message }`
- Media uploads go to Supabase Storage bucket `media`

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — Next.js lint
- `npm test` — Vitest (if available)

## Special routes
- `/preview/[slug]` — auth-protected preview for unpublished posts (same page as blog detail, no published filter)
- `/blog/rss.xml` — RSS feed route
- `/sitemap.xml` — dynamic sitemap

## Admin features
- **Drag-to-reorder projects** — DragSortTable uses @dnd-kit; action `reorderProjectDrag(activeId, overId)` swaps sort_order
- **Bulk actions** — BulkActions component with checkbox selection; server action `bulkActionPosts(formData)`
- **Autosave** — useUnsavedChanges hook saves form state to localStorage every 5s, warns on beforeunload
- **Search/filter** — client-side filtering in admin tables via searchFields prop
- **Preview on drafts** — PostForm shows "preview" link, /preview/[slug] protected by middleware

## Adding a new content type
1. Add table to `supabase/schema.sql` with RLS policies
2. `supabase db push`
3. Create `app/admin/<type>/` routes (list, new, edit)
4. Add server actions to `app/admin/actions.js`
5. Create form component in `components/`
6. Create public page in `app/<type>/`
