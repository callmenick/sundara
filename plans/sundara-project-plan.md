# Sundara Platform - Project Plan

## Overview

A custom website and ticketing platform for **Sundara**, a weekend camping festival in Trinidad and Tobago. The platform serves as the primary digital presence for the festival, handling content, community engagement, vendor/volunteer applications, and ticket sales.

**Current Edition:** 2026 (May dates TBD)
**Expected ticket sales:** ~700
**Go-live target:** TBD (website first, ticketing to follow)

---

## Goals

1. Build a fully branded festival website that captures the Sundara identity
2. Own the customer data and relationship (replace dependency on third-party ticketing)
3. Integrate with Wam for payments, including payment plans via subscriptions (details TBD)
4. Create an admin panel for non-technical team members to manage content
5. Support vendor and volunteer applications through the platform
6. Architecture should be multi-year aware (2026 is current, future editions become "current" later)
7. Keep it simple—avoid over-engineering for hypothetical future needs

---

## Brand Identity

Sundara has two musical pillars:

- **LIVE:** Indie & rock music
- **RAVE:** Electronic music (house, underground, etc.)

Beyond music, the festival emphasizes:

- Community building
- Camping experience
- Workshops and activities
- Local vendors (food & market)

Design should reflect this duality—earthy/organic meets electronic/vibrant.

---

## Tech Stack

**Principle:** Use latest stable versions of all packages.

| Layer             | Choice                      | Notes                                     |
| ----------------- | --------------------------- | ----------------------------------------- |
| **Framework**     | Next.js 16 (App Router)     | React Server Components, Server Actions   |
| **Styling**       | Tailwind CSS v4 + shadcn/ui | Consistent, accessible component library  |
| **Database**      | Supabase (Postgres)         | Also provides storage for images          |
| **Auth**          | NextAuth.js v5 (Auth.js)    | Admin authentication with TOTP MFA        |
| **Payments**      | Wam                         | Full payments + subscriptions (TBD)       |
| **Email**         | Resend                      | Ticket delivery, confirmations, reminders |
| **Hosting**       | Vercel                      | Preview deployments, edge functions       |
| **QR Generation** | `qrcode` npm package        | For ticket QR codes                       |
| **TOTP**          | `otplib`                    | For MFA implementation                    |

---

## Site Structure

```
sundara.com
├── /                        → Landing page (hero, elevator pitch, dates, CTAs)
│                              Post-event: switches to "Thank you" / aftermovie view
├── /music                   → Music experience (RAVE + LIVE split)
│   └── /lineup              → Full artist lineup (when announced)
├── /camping                 → Camping info, amenities, setup guide
├── /workshops               → Workshops & activities list
├── /volunteer               → Work 2 Play program + application form
├── /vendors                 → Vendor program info + application form
├── /tickets                 → Ticket selection & purchase (feature-flagged)
├── /faq                     → Frequently asked questions
├── /contact                 → Contact form, social links
│
├── /account                 → Customer portal (authenticated)
│   ├── /account/orders      → Order history
│   └── /account/tickets     → View/transfer tickets
│
├── /admin                   → Admin dashboard (authenticated, role-gated, MFA required)
│   ├── /admin               → Dashboard overview
│   ├── /admin/setup-account → New admin account setup (from invite)
│   ├── /admin/setup-mfa     → TOTP MFA setup (QR code display)
│   ├── /admin/verify-mfa    → MFA verification on login
│   ├── /admin/content       → Edit page content (CMS)
│   ├── /admin/lineup        → Manage artists
│   ├── /admin/workshops     → CRUD workshops
│   ├── /admin/vendors       → Review vendor applications
│   ├── /admin/volunteers    → Review volunteer applications
│   ├── /admin/sales         → Ticket sales overview
│   ├── /admin/orders        → Order management
│   ├── /admin/checkin       → QR scanner for door check-in
│   └── /admin/users         → Manage admin users + invitations
│
└── /api                     → API routes
    ├── /api/auth/[...nextauth] → NextAuth.js routes
    ├── /api/webhooks/wam    → Wam payment webhooks
    └── /api/tickets/validate → QR validation endpoint
```

---

## Feature Flags

| Flag                            | Purpose                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_TICKETING_ENABLED` | When `false`, ticket pages show "Coming Soon". `true` in local/preview, `false` in prod until ready. |

---

## Database Schema

### Core Tables

#### editions

Supports multi-year operation. One edition is marked as current at any time.

| Column     | Type      | Notes                                 |
| ---------- | --------- | ------------------------------------- |
| id         | UUID      | Primary key                           |
| year       | INTEGER   | e.g., 2026                            |
| name       | TEXT      | e.g., "Sundara 2026"                  |
| start_date | DATE      | Event start date                      |
| end_date   | DATE      | Event end date                        |
| location   | TEXT      |                                       |
| status     | ENUM      | 'upcoming' \| 'active' \| 'completed' |
| is_current | BOOLEAN   | Only one true at a time               |
| created_at | TIMESTAMP |                                       |

**Edition status logic:**

- `upcoming`: Pre-event, normal marketing site
- `active`: During the event (optional, could just use dates)
- `completed`: Post-event, site shows "Thank you 2026" / aftermovie / gallery

When 2027 launches: create new edition, mark it `is_current`, set 2026 to `completed`.

#### admin_users

Admin accounts with invitation-based onboarding and TOTP MFA.

| Column            | Type      | Notes                                                     |
| ----------------- | --------- | --------------------------------------------------------- |
| id                | UUID      | Primary key                                               |
| email             | TEXT      | Unique                                                    |
| name              | TEXT      |                                                           |
| password_hash     | TEXT      | bcrypt hashed, null until account setup                   |
| role              | ENUM      | 'super_admin' \| 'admin' \| 'volunteer_lead' \| 'checkin' |
| mfa_secret        | TEXT      | TOTP secret (encrypted), null until MFA setup             |
| mfa_enabled       | BOOLEAN   | Default false                                             |
| invite_token      | TEXT      | For account setup, null after used                        |
| invite_expires_at | TIMESTAMP | Invite link expiration                                    |
| created_at        | TIMESTAMP |                                                           |
| last_login_at     | TIMESTAMP |                                                           |

---

### Content Management

#### content_blocks

Editable content sections for pages. Supports both regular and post-event content.

| Column        | Type      | Notes                                                  |
| ------------- | --------- | ------------------------------------------------------ |
| id            | UUID      | Primary key                                            |
| edition_id    | UUID      | FK → editions                                          |
| page          | TEXT      | e.g., 'home', 'music', 'camping'                       |
| section       | TEXT      | e.g., 'hero', 'intro', 'post_event_hero', 'aftermovie' |
| title         | TEXT      |                                                        |
| body          | TEXT      | Markdown supported                                     |
| media_urls    | JSONB     | Array of image/video URLs                              |
| order         | INTEGER   | For sorting sections                                   |
| is_post_event | BOOLEAN   | True for post-event content blocks                     |
| updated_at    | TIMESTAMP |                                                        |

#### faqs

FAQ entries.

| Column     | Type    | Notes                                 |
| ---------- | ------- | ------------------------------------- |
| id         | UUID    | Primary key                           |
| edition_id | UUID    | FK → editions                         |
| question   | TEXT    |                                       |
| answer     | TEXT    | Markdown supported                    |
| category   | TEXT    | e.g., 'tickets', 'camping', 'general' |
| order      | INTEGER |                                       |
| active     | BOOLEAN |                                       |

---

### Lineup & Programming

#### artists

| Column           | Type      | Notes                                    |
| ---------------- | --------- | ---------------------------------------- |
| id               | UUID      | Primary key                              |
| edition_id       | UUID      | FK → editions                            |
| name             | TEXT      |                                          |
| bio              | TEXT      |                                          |
| image_url        | TEXT      |                                          |
| genres           | TEXT[]    | Array of genre tags                      |
| stage            | TEXT      | e.g., 'LIVE', 'RAVE'                     |
| performance_day  | TEXT      | e.g., 'Friday', 'Saturday'               |
| performance_time | TEXT      |                                          |
| social_links     | JSONB     | { instagram, spotify, soundcloud, etc. } |
| is_headliner     | BOOLEAN   |                                          |
| order            | INTEGER   | Display order                            |
| active           | BOOLEAN   |                                          |
| created_at       | TIMESTAMP |                                          |

#### workshops

| Column           | Type      | Notes             |
| ---------------- | --------- | ----------------- |
| id               | UUID      | Primary key       |
| edition_id       | UUID      | FK → editions     |
| name             | TEXT      |                   |
| description      | TEXT      |                   |
| facilitator_name | TEXT      |                   |
| facilitator_bio  | TEXT      |                   |
| image_url        | TEXT      |                   |
| day              | TEXT      |                   |
| time             | TEXT      |                   |
| location         | TEXT      |                   |
| capacity         | INTEGER   | NULL if unlimited |
| active           | BOOLEAN   |                   |
| created_at       | TIMESTAMP |                   |

---

### Applications

#### vendor_applications

| Column              | Type      | Notes                                               |
| ------------------- | --------- | --------------------------------------------------- |
| id                  | UUID      | Primary key                                         |
| edition_id          | UUID      | FK → editions                                       |
| business_name       | TEXT      |                                                     |
| vendor_type         | ENUM      | 'food' \| 'market'                                  |
| contact_name        | TEXT      |                                                     |
| email               | TEXT      |                                                     |
| phone               | TEXT      |                                                     |
| description         | TEXT      | What they sell/offer                                |
| instagram           | TEXT      |                                                     |
| website             | TEXT      |                                                     |
| previous_experience | TEXT      |                                                     |
| status              | ENUM      | 'pending' \| 'approved' \| 'rejected' \| 'waitlist' |
| admin_notes         | TEXT      | Internal notes                                      |
| created_at          | TIMESTAMP |                                                     |
| reviewed_at         | TIMESTAMP |                                                     |

#### volunteer_applications

| Column            | Type      | Notes                                               |
| ----------------- | --------- | --------------------------------------------------- |
| id                | UUID      | Primary key                                         |
| edition_id        | UUID      | FK → editions                                       |
| name              | TEXT      |                                                     |
| email             | TEXT      |                                                     |
| phone             | TEXT      |                                                     |
| shifts_interested | TEXT[]    | Array of shift preferences                          |
| experience        | TEXT      |                                                     |
| why_volunteer     | TEXT      |                                                     |
| status            | ENUM      | 'pending' \| 'approved' \| 'rejected' \| 'waitlist' |
| assigned_shifts   | JSONB     | Assigned after approval                             |
| admin_notes       | TEXT      |                                                     |
| created_at        | TIMESTAMP |                                                     |
| reviewed_at       | TIMESTAMP |                                                     |

---

### Ticketing & Payments

#### customers

| Column     | Type      | Notes            |
| ---------- | --------- | ---------------- |
| id         | UUID      | Primary key      |
| email      | TEXT      | Unique, required |
| name       | TEXT      |                  |
| phone      | TEXT      |                  |
| created_at | TIMESTAMP |                  |

#### ticket_types

| Column         | Type      | Notes                       |
| -------------- | --------- | --------------------------- |
| id             | UUID      | Primary key                 |
| edition_id     | UUID      | FK → editions               |
| name           | TEXT      | e.g., "Weekender + Camping" |
| description    | TEXT      |                             |
| price          | INTEGER   | In cents (TTD)              |
| quantity_total | INTEGER   |                             |
| quantity_sold  | INTEGER   | Default 0                   |
| sale_start     | TIMESTAMP | When tickets go on sale     |
| sale_end       | TIMESTAMP | When sales close            |
| active         | BOOLEAN   |                             |
| created_at     | TIMESTAMP |                             |

#### orders

| Column              | Type      | Notes                                                         |
| ------------------- | --------- | ------------------------------------------------------------- |
| id                  | UUID      | Primary key                                                   |
| customer_id         | UUID      | FK → customers                                                |
| ticket_type_id      | UUID      | FK → ticket_types                                             |
| quantity            | INTEGER   |                                                               |
| amount_total        | INTEGER   | Total price in cents                                          |
| payment_type        | ENUM      | 'full' \| 'plan'                                              |
| payment_status      | ENUM      | 'pending' \| 'partial' \| 'paid' \| 'refunded' \| 'cancelled' |
| wam_payment_id      | TEXT      | For full payments                                             |
| wam_subscription_id | TEXT      | For payment plans                                             |
| installments_paid   | INTEGER   | Track progress on plans                                       |
| installments_total  | INTEGER   | Total installments expected                                   |
| created_at          | TIMESTAMP |                                                               |
| paid_at             | TIMESTAMP | When fully paid                                               |

#### tickets

| Column        | Type      | Notes                                                          |
| ------------- | --------- | -------------------------------------------------------------- |
| id            | UUID      | Primary key                                                    |
| order_id      | UUID      | FK → orders                                                    |
| qr_code       | TEXT      | Unique identifier encoded in QR                                |
| status        | ENUM      | 'pending' \| 'valid' \| 'used' \| 'transferred' \| 'cancelled' |
| holder_email  | TEXT      | For transfers                                                  |
| holder_name   | TEXT      |                                                                |
| checked_in_at | TIMESTAMP | Null until scanned                                             |
| created_at    | TIMESTAMP |                                                                |

#### payment_events

Audit log for all payment activity.

| Column     | Type      | Notes                                                       |
| ---------- | --------- | ----------------------------------------------------------- |
| id         | UUID      | Primary key                                                 |
| order_id   | UUID      | FK → orders                                                 |
| event_type | TEXT      | e.g., 'payment_received', 'payment_failed', 'refund_issued' |
| amount     | INTEGER   | In cents                                                    |
| wam_data   | JSONB     | Raw webhook payload                                         |
| created_at | TIMESTAMP |                                                             |

---

## Authentication & Security

### NextAuth.js v5 (Auth.js) Setup

**Admin Authentication:**

- Email/password credentials (primary)
- Optional: Google OAuth for convenience
- Session stored in JWT or database
- Role-based access control (RBAC) via `admin_users.role`

**Customer Authentication:**

- Magic link (email-based, passwordless)
- Only needed for `/account` access
- Customers can also access tickets via direct links in emails

### Admin Invitation & Onboarding Flow

Admins are manually selected and invited—they self-service their account setup:

1. **Super admin invites new admin:**
   - Goes to `/admin/users`
   - Enters email and selects role
   - System generates `invite_token`, sets `invite_expires_at` (e.g., 7 days)
   - Invitation email sent with unique link: `/admin/setup-account?token=xxx`

2. **New admin receives email, clicks link:**
   - Lands on `/admin/setup-account`
   - Token validated (exists, not expired, not used)
   - Admin enters their name and creates password

3. **If role requires MFA (super_admin, admin, volunteer_lead):**
   - Redirect to `/admin/setup-mfa`
   - Server generates TOTP secret using `otplib`
   - Display QR code (scannable by Google Authenticator, Authy, 1Password, etc.)
   - Also show manual entry key for apps that prefer text input
   - Admin scans QR / enters key in their authenticator app
   - Admin enters 6-digit code to verify setup works
   - On success: encrypt and save `mfa_secret`, set `mfa_enabled = true`

4. **Account setup complete:**
   - Clear `invite_token`
   - Redirect to `/admin`
   - Full access granted

### MFA Login Flow

For admins with `mfa_enabled = true`:

1. Admin enters email/password on `/admin/login`
2. Credentials validated
3. Redirect to `/admin/verify-mfa` (session marked as "pending MFA")
4. Admin enters 6-digit TOTP code from their authenticator app
5. Code validated against stored `mfa_secret`
6. On success: full session granted, redirect to `/admin`
7. On failure: allow retry, rate limit after X failures

### MFA Enforcement by Role

| Role             | MFA Required                                      |
| ---------------- | ------------------------------------------------- |
| `super_admin`    | Yes, mandatory                                    |
| `admin`          | Yes, mandatory                                    |
| `volunteer_lead` | Yes, mandatory                                    |
| `checkin`        | No (limited access, often shared devices at gate) |

### Security Measures

- All admin routes protected by middleware
- CSRF protection via NextAuth.js
- Rate limiting on auth endpoints (prevent brute force)
- Secure session cookies (httpOnly, secure, sameSite)
- MFA secrets encrypted at rest (use `crypto` with env-based key)
- Failed login attempt logging
- Invite tokens single-use and time-limited

---

## Wam Integration (TBD)

Pending confirmation call with Wam team. Key questions:

1. **Subscriptions:** Do they support recurring billing for payment plans?
2. **Webhooks:** What events are fired? How is signature verification done?
3. **Saved payment methods:** Can we charge a saved card on schedule?
4. **Sandbox:** Is there a test environment?
5. **Refunds:** Partial refund support?

### Fallback: Manual Installments

If Wam doesn't support auto-billing subscriptions:

1. Customer starts payment plan, pays first installment
2. Order created with `payment_status = 'partial'`
3. Scheduled job (Vercel Cron) sends reminder emails on schedule
4. Customer clicks link in email to pay next installment manually
5. Repeat until complete
6. On final payment: release ticket, send confirmation

This has higher friction but is workable.

### Wam Wrapper Module

```typescript
// /lib/wam.ts - abstract all Wam interactions
export const wam = {
  // Payments
  createPayment(amount, currency, metadata),
  getPayment(paymentId),
  refundPayment(paymentId, amount?),

  // Subscriptions (if supported)
  createSubscription(plan, customerEmail, metadata),
  getSubscription(subscriptionId),
  cancelSubscription(subscriptionId),

  // Webhooks
  verifyWebhookSignature(payload, signature),
  parseWebhookEvent(payload),
}
```

---

## Core User Flows

### Public Website

1. **Browse Festival Info**
   - Landing page with hero, dates, vibe
   - Music page showcasing LIVE + RAVE stages
   - Camping page with amenities and setup guide
   - Workshops page listing activities

2. **Post-Event Experience**
   - After edition ends, landing page transforms
   - Shows "Thank you 2026!" message
   - Embedded aftermovie video
   - Photo gallery
   - "See you in 2027" / mailing list signup

3. **Apply as Vendor**
   - Fill out vendor application form
   - Receive confirmation email
   - Admin reviews and approves/rejects
   - Approved vendors receive follow-up instructions

4. **Apply as Volunteer (Work 2 Play)**
   - Fill out volunteer application
   - Receive confirmation email
   - Admin reviews, approves, and assigns shifts

### Ticket Purchase (Full Payment)

1. Customer selects ticket type and quantity on `/tickets`
2. Customer enters email, name, phone
3. Customer clicks "Pay Now" → redirected to Wam checkout
4. Wam processes payment
5. Webhook fires → order marked paid → QR generated → email sent

### Ticket Purchase (Payment Plan)

_Flow depends on Wam capabilities—see TBD section above._

### Customer Account

1. Customer receives magic link email
2. Views order history and ticket status
3. Can transfer ticket to another person (regenerates QR)

### Admin Content Management

1. Admin logs in via NextAuth.js
2. Completes MFA verification
3. Navigates to content section
4. Edits page content (hero text, descriptions, images)
5. Changes publish immediately

### Check-in

1. Staff opens `/admin/checkin` on phone
2. Scans QR code with camera
3. System validates ticket and shows result
4. Green = valid, Red = invalid/used

---

## Email Templates

| Template                       | Trigger                                          |
| ------------------------------ | ------------------------------------------------ |
| Admin Invitation               | New admin invited                                |
| Order Confirmation (Full)      | Payment complete, includes ticket PDF            |
| Payment Plan Started           | First installment paid, explains ticket delivery |
| Installment Reminder           | X days before next payment due                   |
| Installment Received           | Each payment received                            |
| Payment Plan Complete          | Final payment, includes ticket PDF               |
| Payment Failed                 | Failed charge, link to retry                     |
| Order Cancelled                | Plan failed/cancelled                            |
| Refund Issued                  | Admin initiated refund                           |
| Ticket Transferred             | To both old and new holder                       |
| Vendor Application Received    | Confirmation                                     |
| Vendor Approved/Rejected       | Decision notification                            |
| Volunteer Application Received | Confirmation                                     |
| Volunteer Approved             | With shift assignments                           |

---

## Admin Dashboard

### /admin (Dashboard)

- Quick stats: tickets sold, revenue, applications pending
- Recent orders
- Upcoming tasks

### /admin/content

- List of editable page sections
- Rich text editor for body content
- Image upload to Supabase Storage
- Preview before publish

### /admin/lineup

- Add/edit/remove artists
- Upload images, set stage assignment
- Drag-and-drop ordering
- Bulk import (CSV) for convenience

### /admin/workshops

- CRUD workshops
- Assign facilitators, times, locations

### /admin/vendors & /admin/volunteers

- List of applications with status filters
- Review detail view
- Approve/reject with optional notes
- Email sent on status change

### /admin/sales

- Total revenue (paid + expected from active plans)
- Tickets sold/remaining by type
- Sales over time chart
- Payment plan completion rate

### /admin/orders

- Searchable order list
- Filter by status, ticket type, date
- Order detail: customer, payment history, tickets
- Actions: refund, cancel, resend email

### /admin/checkin

- Camera-based QR scanner
- Large valid/invalid indicators
- Recent scan history
- Manual lookup fallback

### /admin/users

- List admin users
- Invite new admin via email
- Change roles
- View MFA status
- Deactivate accounts

---

## Design References

Festivals with similar vibes to study:

| Festival                 | URL                        | Notes                                |
| ------------------------ | -------------------------- | ------------------------------------ |
| Shambhala                | shambhalamusicfestival.com | Electronic + camping, clean design   |
| Lightning in a Bottle    | libfestival.org            | Electronic + workshops/wellness      |
| Pickathon                | pickathon.com              | Indie/folk, intimate, minimal design |
| Desert Daze              | desertdaze.org             | Psych rock + electronic blend        |
| Meadows in the Mountains | meadowsinthemountains.com  | Intimate, beautiful aesthetic        |
| Lost Village             | lostvillage.com            | Immersive theming                    |
| Wonderfruit              | wonderfruit.co             | Premium design, art + music          |

**Design principles:**

- Mobile-first (most visitors on phones)
- Full-bleed hero imagery/video
- Clear date/location always visible
- Dual navigation: info sections + tickets CTA
- "Experience" sections that sell the vibe
- Earthy tones meet vibrant electronic accents

---

## Open Questions

### Business/Content

- [ ] Exact dates for 2026 edition
- [ ] Ticket types and pricing
- [ ] Payment plan terms (if offered): how many installments, over what period?
- [ ] Early bird / tiered pricing phases?
- [ ] Vendor fees and what's included
- [ ] Volunteer shift structure and benefits

### Technical

- [ ] Wam integration details (pending call)
- [ ] Domain and DNS setup
- [ ] Email sending domain verification (for Resend)
- [ ] Supabase project setup

---

## Out of Scope (For Now)

- Merch store
- Wristband top-ups / on-site payments
- Multi-tenant / white-label for other events
- Native mobile app
- Past edition archives UI (will add when 2027 launches—schema supports it)

---

## Next Steps

1. Confirm Wam integration details
2. Generate `CLAUDE.md` with project conventions
3. Create README
4. Create initial project scaffolding (Next.js 16, Tailwind v4, shadcn, Supabase)
5. Set up database schema
6. Build landing page and core public pages
7. Implement admin auth with MFA
8. Build lightweight CMS
9. Add ticketing flow (behind feature flag)
