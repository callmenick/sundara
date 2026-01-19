# Sundara

The official website and ticketing platform for Sundara, a weekend camping music festival in Trinidad and Tobago.

## About

Sundara brings together two musical worlds:

- **LIVE** - Indie & rock music
- **RAVE** - Electronic music (house, underground)

Beyond music, the festival focuses on community building through camping, workshops, and local vendors.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** Supabase (Postgres)
- **Auth:** Auth.js v5 with TOTP MFA
- **Payments:** Wam
- **Email:** Resend
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase account
- Resend account (for emails)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd sundara-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local` and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase publishable key
   - `SUPABASE_SECRET_KEY` - Supabase secret key (server-side only)
   - `AUTH_SECRET` - Generate with `npx auth secret`
   - `MFA_ENCRYPTION_KEY` - For encrypting TOTP secrets
   - `RESEND_API_KEY` - Resend API key for emails

4. **Set up the database**

   ```bash
   npm run db:push
   npm run db:seed  # Optional: seed with sample data
   ```

5. **Generate TypeScript types**

   ```bash
   npm run db:types
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
sundara-web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (public)/     # Public pages
│   │   ├── (account)/    # Customer account
│   │   ├── (admin)/      # Admin dashboard
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities and clients
│   ├── types/            # TypeScript types
│   └── hooks/            # Custom hooks
├── supabase/
│   └── migrations/       # Database migrations
├── public/               # Static assets
└── plans/                # Planning documents
```

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start development server     |
| `npm run build`     | Build for production         |
| `npm run start`     | Start production server      |
| `npm run lint`      | Run ESLint                   |
| `npm run lint:fix`  | Fix lint errors              |
| `npm run format`    | Format code with Prettier    |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:push`   | Push database migrations     |
| `npm run db:reset`  | Reset database               |
| `npm run db:types`  | Generate types from schema   |

## Feature Flags

| Flag                            | Description                          |
| ------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_TICKETING_ENABLED` | Enable ticket sales (`true`/`false`) |

Ticketing is disabled in production by default until launch.

## Admin Access

The admin dashboard is available at `/admin`. Admin accounts are invitation-only with mandatory MFA for elevated roles.

### Roles

- **super_admin** - Full access
- **admin** - Content and order management
- **volunteer_lead** - Volunteer applications
- **checkin** - Event check-in only

## Documentation

- [Project Plan](./plans/sundara-project-plan.md) - Full project specification
- [CLAUDE.md](./CLAUDE.md) - Development conventions and patterns

## Deployment

The project deploys automatically to Vercel on push to `main`. Preview deployments are created for pull requests.

## License

Private - All rights reserved.
