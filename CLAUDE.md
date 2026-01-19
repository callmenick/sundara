# Sundara Web Platform

**Repository:** https://github.com/callmenick/sundara

## Project Overview

Custom website and ticketing platform for Sundara, a camping music festival in Trinidad and Tobago. The platform handles the public-facing website, content management, vendor/volunteer applications, and ticket sales.

**Current Edition:** 2026

## Tech Stack

| Layer     | Technology                                        |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router)                           |
| Language  | TypeScript (strict mode)                          |
| Styling   | Tailwind CSS v4 + shadcn/ui                       |
| Database  | Supabase (Postgres)                               |
| Auth      | Auth.js v5 (NextAuth) with TOTP MFA               |
| Payments  | Wam (TBD)                                         |
| Email     | Resend                                            |
| Testing   | Vitest + React Testing Library + MSW + Playwright |
| Hosting   | Vercel                                            |

## Core Principles

1. **Always consult documentation first** - Before implementing anything with a package, SDK, or API, read the official docs for best practices
2. **Domain-driven development** - Organize code by domain/entity, not by technical type
3. **Container/Presenter pattern** - Separate data fetching (containers) from rendering (presenters)
4. **Test-driven development** - Write tests first, verify they fail, then implement
5. **No superfluous comments** - Code should be self-documenting; only comment when truly necessary
6. **Exact dependency versions** - Pin all dependencies to exact versions
7. **Granular commits** - Commit small, focused changes with descriptive messages
8. **Security-first mindset** - Consider security implications in every feature

## Project Structure (Domain-Driven)

```
sundara-web/
├── src/
│   ├── domains/                    # Domain modules (business logic)
│   │   ├── editions/               # Festival editions (years)
│   │   │   ├── queries.ts          # Data fetching
│   │   │   ├── actions.ts          # Server actions
│   │   │   ├── types.ts            # Domain types
│   │   │   └── utils.ts            # Domain utilities
│   │   ├── artists/                # Lineup management
│   │   ├── workshops/              # Workshop/activities
│   │   ├── vendors/                # Vendor applications
│   │   ├── volunteers/             # Volunteer applications
│   │   ├── tickets/                # Ticket types and sales
│   │   ├── orders/                 # Order management
│   │   ├── customers/              # Customer accounts
│   │   ├── content/                # CMS content blocks
│   │   └── admin-users/            # Admin authentication
│   │
│   ├── components/                 # Shared UI components
│   │   ├── ui/                     # shadcn/ui primitives
│   │   └── shared/                 # App-wide shared components
│   │
│   ├── app/                        # Next.js App Router
│   │   ├── (public)/               # Public marketing pages
│   │   ├── (account)/              # Customer account
│   │   ├── (admin)/                # Admin dashboard
│   │   └── api/                    # API routes
│   │
│   ├── lib/                        # Infrastructure/utilities
│   │   ├── supabase/               # Supabase clients
│   │   ├── auth/                   # Auth configuration
│   │   ├── email/                  # Email utilities
│   │   └── utils.ts                # General utilities
│   │
│   ├── test/                       # Test utilities and mocks
│   │   ├── setup.ts                # Vitest setup
│   │   └── mocks/                  # MSW handlers
│   │
│   └── types/                      # Global TypeScript types
│       └── database.ts             # Generated Supabase types
│
├── e2e/                            # Playwright e2e tests
├── supabase/
│   └── migrations/                 # Database migrations
├── public/                         # Static assets
├── plans/                          # Planning documents
└── design/                         # Design assets
```

## File Naming Convention

**Strict conventions - follow consistently:**

| Type              | Convention                    | Example                  |
| ----------------- | ----------------------------- | ------------------------ |
| React components  | `kebab-case.tsx`              | `artist-card.tsx`        |
| Server components | `kebab-case.tsx`              | `artist-list.tsx`        |
| Client components | `kebab-case.client.tsx`       | `artist-form.client.tsx` |
| Test files        | `kebab-case.test.ts(x)`       | `artist-card.test.tsx`   |
| Utilities         | `kebab-case.ts`               | `format-price.ts`        |
| Types             | `kebab-case.ts` or `types.ts` | `types.ts`               |
| Hooks             | `use-[name].ts`               | `use-edition.ts`         |
| Server actions    | `actions.ts`                  | `actions.ts`             |
| Data queries      | `queries.ts`                  | `queries.ts`             |
| Constants         | `constants.ts`                | `constants.ts`           |
| Page files        | `page.tsx`                    | `page.tsx`               |
| Layout files      | `layout.tsx`                  | `layout.tsx`             |
| Loading states    | `loading.tsx`                 | `loading.tsx`            |
| Error states      | `error.tsx`                   | `error.tsx`              |

## Testing

### Philosophy: "Write tests. Not too many. Mostly integration."

Follow Kent C. Dodds' testing trophy approach:

1. **Focus on integration tests** - They provide the best confidence-to-effort ratio
2. **Avoid excessive mocking** - Mocks reduce confidence in real component integration
3. **Don't chase 100% coverage** - Aim for ~70-80%, focus on critical paths
4. **Test behavior, not implementation** - Tests should survive refactors

### Test-Driven Development Workflow

1. **Write tests first** based on expected behavior
2. **Verify tests fail** - don't write implementation yet
3. **Commit the tests**
4. **Implement code** to make tests pass
5. **Verify implementation quality** - ensure it's not overfitting to tests
6. **Commit the code**

### Testing Stack

| Tool                      | Purpose                    |
| ------------------------- | -------------------------- |
| Vitest                    | Unit and integration tests |
| React Testing Library     | Component testing          |
| MSW (Mock Service Worker) | API mocking                |
| Playwright                | End-to-end testing         |

### Test Organization

```
src/
├── domains/artists/
│   ├── queries.ts
│   ├── queries.test.ts        # Unit tests for queries
│   ├── actions.ts
│   └── actions.test.ts        # Integration tests for actions
├── components/
│   ├── artist-card.tsx
│   └── artist-card.test.tsx   # Component tests
└── test/
    ├── setup.ts               # Vitest setup with MSW
    └── mocks/
        ├── handlers.ts        # MSW request handlers
        └── server.ts          # MSW server setup

e2e/
├── admin-login.spec.ts        # E2E test for admin login flow
└── ticket-purchase.spec.ts    # E2E test for purchase flow
```

### What to Test

**Do test:**

- Critical user flows (ticket purchase, admin login)
- Form validation and submission
- API integrations (via MSW mocks)
- Access control and permissions
- Edge cases that could break the app

**Don't test:**

- Implementation details
- Third-party library internals
- Styling/layout (unless critical)
- Simple pass-through components

### Commands

```bash
npm run test              # Run Vitest in watch mode
npm run test:run          # Run tests once
npm run test:coverage     # Run with coverage report
npm run test:e2e          # Run Playwright tests
npm run test:e2e:ui       # Run Playwright with UI
```

## Security

### Admin Panel & CMS Security

The admin panel handles sensitive operations. Apply defense in depth:

**Authentication:**

- TOTP MFA required for elevated roles (super_admin, admin, volunteer_lead)
- Session timeout after inactivity
- Rate limiting on login attempts
- Secure password requirements (min length, complexity)

**Authorization:**

- Role-based access control (RBAC) enforced at route and action level
- Verify permissions server-side, never trust client
- Audit log for sensitive operations

**Input Validation:**

- Validate ALL inputs with Zod schemas
- Sanitize user-generated content before storage and display
- Use parameterized queries (Supabase handles this)

**Data Protection:**

- Never expose sensitive data in client bundles
- Encrypt MFA secrets at rest
- Use environment variables for all secrets
- Never log full API keys or secrets

### OWASP Top 10 Awareness

Always consider these risks when implementing features:

1. **Injection** - Use parameterized queries, validate inputs
2. **Broken Authentication** - Implement MFA, rate limiting, secure sessions
3. **Sensitive Data Exposure** - Encrypt sensitive data, use HTTPS
4. **XML External Entities** - Not applicable (we use JSON)
5. **Broken Access Control** - Verify permissions server-side
6. **Security Misconfiguration** - Review defaults, disable debug in prod
7. **XSS** - React escapes by default, sanitize dangerouslySetInnerHTML
8. **Insecure Deserialization** - Validate all incoming data shapes
9. **Using Components with Known Vulnerabilities** - Keep deps updated
10. **Insufficient Logging** - Log auth events, admin actions

### Security Checklist for New Features

- [ ] All inputs validated with Zod
- [ ] Authorization checked server-side
- [ ] Sensitive data not exposed to client
- [ ] Rate limiting considered for public endpoints
- [ ] Error messages don't leak internal details
- [ ] Audit logging for sensitive operations

## UX Best Practices

### Admin Panel UX

Design for clarity and error prevention:

**Forms:**

- Clear labels and helpful placeholder text
- Inline validation with immediate feedback
- Confirmation dialogs for destructive actions
- Preserve form state on validation errors
- Show loading states during submission

**Data Display:**

- Sortable, filterable tables
- Pagination for large datasets
- Clear empty states with calls to action
- Search that works across relevant fields

**Navigation:**

- Consistent sidebar navigation
- Breadcrumbs for deep pages
- Quick actions visible and accessible
- Mobile-responsive admin (for check-in at gate)

**Feedback:**

- Toast notifications for actions
- Clear success/error states
- Progress indicators for long operations

### Public Site UX

Festival attendees expect:

**Mobile-First:**

- 80%+ of ticket purchases happen on mobile
- Touch-friendly tap targets (min 44px)
- Fast load times on 3G/4G

**Accessibility:**

- Color contrast ratios (WCAG AA minimum)
- Keyboard navigable
- Screen reader friendly
- Alt text for images

**Trust Signals:**

- Clear pricing, no hidden fees
- Secure payment indicators
- Easy-to-find contact/support

## Code Conventions

### Container/Presenter Pattern

Separate concerns clearly:

```typescript
// Container: handles data fetching (Server Component)
// src/app/(public)/music/page.tsx
import { getArtists } from '@/domains/artists/queries'
import { ArtistGrid } from './artist-grid'

export default async function MusicPage() {
  const artists = await getArtists()
  return <ArtistGrid artists={artists} />
}

// Presenter: handles rendering (can be Server or Client)
// src/app/(public)/music/artist-grid.tsx
import { Artist } from '@/domains/artists/types'
import { ArtistCard } from './artist-card'

interface ArtistGridProps {
  artists: Artist[]
}

export function ArtistGrid({ artists }: ArtistGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  )
}
```

### Domain Module Structure

Each domain should be self-contained:

```typescript
// src/domains/artists/types.ts
export interface Artist {
  id: string
  name: string
  bio: string | null
  imageUrl: string | null
  genres: string[]
  stage: 'LIVE' | 'RAVE'
  isHeadliner: boolean
}

// src/domains/artists/queries.ts
import { createClient } from '@/lib/supabase/server'
import { Artist } from './types'

export async function getArtists(editionId: string): Promise<Artist[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('edition_id', editionId)
    .eq('active', true)
    .order('order')

  if (error) throw error
  return data
}

// src/domains/artists/actions.ts
;('use server')

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const createArtistSchema = z.object({
  name: z.string().min(1),
  stage: z.enum(['LIVE', 'RAVE']),
})

export async function createArtist(formData: FormData) {
  const parsed = createArtistSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: 'Invalid data' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('artists').insert(parsed.data)

  if (error) return { error: error.message }

  revalidatePath('/admin/lineup')
  return { success: true }
}
```

### TypeScript

- Use strict mode (enabled in tsconfig)
- Prefer `interface` over `type` for object shapes
- Use `const` over `let`
- Use named exports (not default exports) except for pages

### React/Next.js

- Server Components by default
- Only add `'use client'` when required (interactivity, browser APIs, hooks)
- Use Server Actions for mutations
- Keep page components thin - delegate to domain modules

### Styling

- Tailwind utility classes only
- shadcn/ui as component foundation
- Mobile-first responsive design
- CSS variables for theming (in globals.css)

### Comments

- No superfluous comments
- Only comment when logic is genuinely non-obvious
- JSDoc for public APIs only when necessary

## Git Workflow

### Commits

- **Granular**: One logical change per commit
- **Descriptive messages**: Explain what and why, not how
- **No co-author tags**
- **No "generated with" tags**
- **Present tense**: "Add artist form" not "Added artist form"

Example commit messages:

```
feat: add artist card component
fix: correct price formatting for TTD currency
refactor: extract edition queries to domain module
chore: update supabase to 2.39.0
test: add integration tests for artist queries
```

### Pre-commit Hooks (Husky + lint-staged)

Automatically run on commit:

- ESLint (pre-commit)
- Prettier (pre-commit)

Run on push:

- TypeScript check (pre-push)

## Environment Variables

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TICKETING_ENABLED=true

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_PROJECT_ID=

# Auth.js
AUTH_SECRET=

# MFA Encryption
MFA_ENCRYPTION_KEY=

# Email (Resend)
RESEND_API_KEY=

# Payments (Wam) - TBD
WAM_API_KEY=
WAM_WEBHOOK_SECRET=
```

## Common Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build               # Production build
npm run start               # Start production server

# Code Quality
npm run lint                # Run ESLint
npm run lint:fix            # Fix lint errors
npm run format              # Format with Prettier
npm run typecheck           # TypeScript check

# Testing
npm run test                # Run Vitest in watch mode
npm run test:run            # Run tests once
npm run test:coverage       # Run with coverage
npm run test:e2e            # Run Playwright e2e tests
npm run test:e2e:ui         # Playwright with UI

# Database
npm run db:push             # Push migrations
npm run db:reset            # Reset database
npm run db:types            # Generate types from schema
```

## Auth Roles

| Role             | Access                                |
| ---------------- | ------------------------------------- |
| `super_admin`    | Full access, manage admins            |
| `admin`          | Content, lineup, orders, applications |
| `volunteer_lead` | Volunteer applications only           |
| `checkin`        | Check-in page only                    |

MFA required for all roles except `checkin`.

## Feature Flags

| Flag                            | Description                 |
| ------------------------------- | --------------------------- |
| `NEXT_PUBLIC_TICKETING_ENABLED` | Enable/disable ticket sales |

## Resources

**Always check these first before implementing:**

- [Project Plan](./plans/sundara-project-plan.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase API Keys](https://supabase.com/docs/guides/api/api-keys)
- [shadcn/ui](https://ui.shadcn.com)
- [Auth.js v5](https://authjs.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)
- [MSW](https://mswjs.io)
