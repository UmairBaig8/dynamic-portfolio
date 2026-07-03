# Roadmap

## v1.2 — Content & analytics
- [ ] **Talks / Experience content type** — new table + admin CRUD + public page (same pattern as projects)
- [ ] **Analytics widget** — basic page-view tracking on dashboard

## v1.3 — Performance & reliability
- [ ] **Image lazy loading + blur placeholders** — Next.js Image already in use, add blurDataURL via placeholder="blur"
- [ ] **Rate-limit / CAPTCHA on login** — protect `/admin/login` from brute force
- [ ] **Loading skeletons for admin pages** — extend loading.js pattern to admin routes

## v2.0 — Collaboration & automation
- [ ] **Scheduled publish cron** — auto-flip `published=true` when `publish_at` is past due (Supabase pg_cron or Edge Function)
- [ ] **Collaborator roles** — `profiles` table with admin/editor role, RLS restricting deletes to admins
- [ ] **Activity log** — audit trail of who edited what
- [ ] **Image gallery picker** — browse previously uploaded media instead of re-uploading
