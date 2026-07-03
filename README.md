# Dynamic Portfolio

Next.js portfolio with a self-hosted, authenticated admin dashboard (no third-party CMS). Content lives in your own Supabase Postgres database; you edit it from `/admin`.

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Once created, open **SQL Editor** → paste the contents of `supabase/schema.sql` → Run.
3. Go to **Storage** → **New bucket** → name it `media` → make it **Public**. (The storage policies in `schema.sql` assume this exact bucket name.)
4. Go to **Authentication → Users** → **Add user** to create your own admin login (this is how you and any collaborators sign in to `/admin`). Add one user per collaborator — no shared logins.
5. Go to **Project Settings → API** → copy the **Project URL** and **anon public key**.

## 2. Configure the app

```bash
cp .env.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from step 1.5.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site, `http://localhost:3000/admin/login` to sign in.

## 3. Deploy to Netlify

1. Push this project to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Netlify auto-detects Next.js (via `netlify.toml` + the `@netlify/plugin-nextjs` plugin — it installs automatically on first build).
4. Under **Site settings → Environment variables**, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Deploy. Your public site and `/admin` are both served from the same Netlify URL.

## How editing works

- Sign in at `/admin/login` with a user you created in Supabase Auth.
- Add/edit projects and posts from the dashboard — changes write directly to Postgres.
- Public pages (`/`, `/projects`, `/blog`, `/about`) fetch fresh on every request (`revalidate = 0`), so edits appear immediately with **no rebuild needed**.
- Images upload straight to Supabase Storage from the admin forms.

## Adding collaborators

Supabase Auth → Users → Add user. Any authenticated user can access `/admin` and edit all content — there are no per-user roles in this starter. If you need view-only or restricted roles later, that's a Row Level Security (RLS) policy change in `supabase/schema.sql`.

## Project structure

```
app/                   Public pages + /admin (App Router)
  admin/actions.js      All server actions: auth, CRUD, uploads
components/             Shared UI (forms, editor, nav)
lib/supabase/           Browser/server Supabase clients
supabase/schema.sql      Tables, RLS policies, storage policies
middleware.js            Session refresh + /admin route protection
```

## Extending it

- **Custom domain:** Netlify → Domain settings.
- **Draft previews:** posts already support `published: false` as a draft state — just don't publish until ready.
- **More content types:** copy the `projects` table + `ProjectForm` pattern for anything else (e.g. `talks`, `experience`).
