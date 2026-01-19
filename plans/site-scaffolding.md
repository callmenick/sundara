# Site Scaffolding Plan

**Branch:** `feature/site-scaffolding`
**Purpose:** Build the public site structure with header, footer, navigation, and placeholder content.

## Goals

1. Create reusable site layout components (header, footer)
2. Build legal/info pages
3. Create an impressive hero section with countdown timer
4. Establish the visual foundation for the Sundara brand (placeholders until assets provided)

## Tasks

### 1. Site Layout

**Header (`src/components/shared/header.tsx`)**

- Logo placeholder (left)
- Main navigation links:
  - Music
  - Camping
  - Workshops
  - Vendors
  - Volunteer
  - FAQ
- Tickets CTA button (right)
- Mobile hamburger menu
- Sticky on scroll (optional)

**Footer (`src/components/shared/footer.tsx`)**

- Logo/brand
- Navigation columns:
  - Festival: Music, Camping, Workshops, FAQ
  - Get Involved: Vendors, Volunteer
  - Legal: Privacy Policy, Terms & Conditions, Cookie Policy
  - Contact
- Social media links (placeholders)
- Copyright notice
- Edition year (2026)

**Root Layout (`src/app/layout.tsx`)**

- Wrap all pages with header/footer
- Set up font loading
- Meta tags

### 2. Legal & Info Pages

Create these pages with placeholder content (can be edited via CMS later):

| Route      | Page                                    |
| ---------- | --------------------------------------- |
| `/contact` | Contact page with info/form placeholder |
| `/privacy` | Privacy Policy                          |
| `/terms`   | Terms & Conditions                      |
| `/cookies` | Cookie Policy                           |
| `/faq`     | FAQ page (placeholder)                  |

Use a consistent layout for legal pages (simple prose styling).

### 3. Home Page Hero

**Inspiration:** [Shambhala Music Festival](https://shambhalamusicfestival.com/)

**Elements:**

- Full-viewport hero section
- Background: placeholder image/gradient (video-ready for later)
- Festival name: "SUNDARA"
- Tagline placeholder
- Date display: "May 2026" (exact dates TBD)
- **Countdown timer** component:
  - Days / Hours / Minutes / Seconds until festival
  - Configurable target date
  - Animated/styled boxes
- Primary CTA: "Get Tickets" (links to /tickets)
- Secondary CTA: "Learn More" (scrolls to content)

### 4. Route Structure

Set up the App Router structure:

```
src/app/
├── (public)/
│   ├── layout.tsx        # Public layout with header/footer
│   ├── page.tsx          # Home page with hero
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── cookies/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── music/
│   │   └── page.tsx      # Placeholder
│   ├── camping/
│   │   └── page.tsx      # Placeholder
│   ├── workshops/
│   │   └── page.tsx      # Placeholder
│   ├── vendors/
│   │   └── page.tsx      # Placeholder
│   └── volunteer/
│       └── page.tsx      # Placeholder
└── layout.tsx            # Root layout (fonts, meta)
```

## Implementation Order

1. **Root layout** - Set up fonts, meta, base structure
2. **Header component** - Navigation, mobile menu
3. **Footer component** - Links, layout
4. **Public layout** - Wrap pages with header/footer
5. **Legal pages** - Privacy, Terms, Cookies, Contact
6. **Home hero** - Full-viewport with countdown
7. **Placeholder pages** - Music, Camping, etc. (simple "Coming Soon" style)

## Design Notes

- **Mobile-first** - 80%+ of visitors on phones
- **Color palette** - Use neutral placeholders (zinc/slate) until brand colors provided
- **Typography** - Clean, modern sans-serif (system fonts or Inter for now)
- **Spacing** - Generous whitespace, festival vibe
- **Countdown** - Make it visually striking, central focus of hero

## Assets Needed (from client)

- [ ] Logo (SVG preferred)
- [ ] Brand colors
- [ ] Hero background image/video
- [ ] Social media links
- [ ] Actual legal text content
- [ ] Exact festival dates for countdown

## Notes

- This branch runs parallel to `feature/db-auth` (database + admin auth)
- Keep components reusable - they'll integrate with CMS content later
- Don't over-engineer - placeholder content is fine, focus on structure
