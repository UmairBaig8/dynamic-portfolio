# Dynamic Portfolio

Next.js portfolio with a self-hosted, authenticated admin dashboard (no third-party CMS). Content lives in your own Supabase Postgres database; you edit it from `/admin`.

---

## Local Dev Setup

### Prerequisites
- Node.js 18+
- Supabase CLI (`brew install supabase/tap/supabase` or `npm i -g supabase`)
- Git

### 1. Clone & install
```bash
git clone https://github.com/UmairBaig8/dynamic-portfolio
cd dynamic-portfolio
npm install
```

### 2. Create Supabase project
- Go to [supabase.com](https://supabase.com) → **New project**
- Note the **project ref** from **Project Settings → General → Reference ID**

### 3. Link & push schema
```bash
supabase login              # generates a token via browser
supabase link --project-ref <your-ref>
supabase db push            # deploys schema.sql → creates tables + RLS + triggers
```

### 4. Create storage bucket & admin user
Do these in the Supabase dashboard:

- **Storage** → **New bucket** → name: `media` → **Public bucket**
- **Authentication → Users** → **Add user** → your email + password

### 5. Environment variables
```bash
cp .env.example .env.local
```
Get values from **Project Settings → API**:
- `NEXT_PUBLIC_SUPABASE_URL` = your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key

### 6. Run
```bash
npm run dev
```
- Public site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

---

## Deploy to Netlify

1. Push to GitHub
2. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from GitHub** → pick repo
3. Netlify reads `netlify.toml` automatically
4. **Site settings → Environment variables** → add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Redeploy: **Deploys → Trigger deploy → Deploy site**
6. Public + admin both at `https://your-site.netlify.app`

---

## Redeploy from scratch

**Supabase:**
- Create new project at supabase.com
- `supabase link --project-ref <new-ref>`
- `supabase db push`
- Create `media` bucket (Public)
- Add user in Auth

**Local:**
- Update `.env.local` with new URL + anon key
- `npm run dev`

**Netlify:**
- Import repo, add env vars, deploy

---

## How editing works

- Sign in at `/admin/login`
- Add/edit projects, posts, and site settings — writes directly to Postgres
- Public pages fetch fresh every request (`revalidate: 0`) — **no rebuild needed**
- Images upload to Supabase Storage from admin forms

## Project structure

```
app/                    App Router pages (public + admin)
  admin/actions.js      All server actions: auth, CRUD, uploads
components/             Shared UI (forms, rich text editor, nav)
lib/supabase/           Browser + server Supabase clients
supabase/schema.sql     Tables, RLS policies, storage policies
supabase/migrations/    Versioned migrations (pushed via supabase db push)
middleware.js           Session refresh + /admin route protection
netlify.toml            Netlify build config
```

## Extending

- **Draft previews:** posts support `published: false` — won't show on public blog
- **New content types:** copy the `projects` table + `ProjectForm` pattern
- **Custom domain:** Netlify → Domain settings
