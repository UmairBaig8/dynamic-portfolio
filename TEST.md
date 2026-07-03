# Testing

## Framework
Vitest (configured in `vitest.config.js` or via `next/vitest`).

## Setup
```bash
npm install -D vitest @vitejs/plugin-react
```

## Running tests
```bash
npm test              # single run
npm run test:watch    # watch mode
```

## Writing tests
- Unit tests go next to the file they test: `components/Button.test.js`
- No component-level E2E tests yet (add Cypress/Playwright later)
- Server actions can be tested by importing and calling them directly with mock formData

## Conventions
- Test files use `.test.js` extension
- Describe blocks use sentence case
- Prefer `toEqual` / `toStrictEqual` over `toBe` for objects
- Mock Supabase calls with `vi.mock('@/lib/supabase/server')`

## What to test first
- Server actions (edge cases, validation)
- Slugify utility
- Form validation
- Any new utility functions
