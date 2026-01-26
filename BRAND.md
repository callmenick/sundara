# Sundara Brand Guidelines

Visual identity system for Sundara, a camping music festival in Trinidad & Tobago.

## Brand Essence

Sundara embodies the spirit of a tropical music escape - **earthy, warm, vibrant, and connected to nature**. The visual identity draws from lush jungle landscapes, golden sunlight, and the energy of live music under open skies.

**Keywords:** Natural, Inviting, Festive, Tropical, Communal, Alive

---

## Typography

Three fonts create a clear visual hierarchy:

| Font              | CSS Variable           | Tailwind Class | Role                                              |
| ----------------- | ---------------------- | -------------- | ------------------------------------------------- |
| **Tan Maple**     | `--font-tan-maple`     | `text-display` | Brand wordmark, hero headlines, major page titles |
| **Girlish Waves** | `--font-girlish-waves` | `font-heading` | Subheadings, taglines, section headers, countdown |
| **Inter**         | `--font-inter`         | `font-sans`    | Body text, navigation, forms, UI elements         |

### Font Characteristics

**Tan Maple** (Display)

- Bold, chunky, retro 70s festival poster aesthetic
- Use sparingly for maximum impact
- Best at large sizes (48px+)
- Perfect for: "SUNDARA" wordmark, hero text, major announcements
- **Note:** `text-display` includes a metrics fix (padding-top) for vertical overflow. Override with `--display-offset` if needed.

**Girlish Waves** (Heading)

- Wavy sans-serif with playful, summer vibes
- More legible than script while still decorative
- Works well at medium sizes (24-48px)
- Perfect for: Section titles, countdown labels, taglines, content page headers

**Inter** (Body)

- Clean, modern, highly readable
- Excellent for long-form content and UI
- Use for everything else
- Perfect for: Paragraphs, navigation, buttons, forms, captions

### Typography Scale

```
Display (Tan Maple):
- Hero:     text-6xl md:text-8xl text-display    (SUNDARA wordmark)
- Title:    text-4xl md:text-6xl text-display    (Major page titles)

Heading (Girlish Waves):
- H1:       text-3xl md:text-4xl font-heading    (Page headers)
- H2:       text-2xl md:text-3xl font-heading    (Section titles)
- H3:       text-xl md:text-2xl font-heading     (Subsections)
- Label:    text-lg font-heading                 (Countdown, tags)

Body (Inter):
- Large:    text-lg font-sans                    (Lead paragraphs)
- Base:     text-base font-sans                  (Body text)
- Small:    text-sm font-sans                    (Captions, meta)
- XSmall:   text-xs font-sans                    (Fine print)
```

### Usage Examples

```tsx
// Hero section with brand wordmark
<h1 className="text-display text-6xl md:text-8xl text-forest">
  SUNDARA
</h1>

// Section heading
<h2 className="font-heading text-2xl md:text-3xl text-jungle">
  Music & Camping Festival
</h2>

// Body content
<p className="font-sans text-base text-foreground">
  Join us for a weekend of live music...
</p>
```

---

## Color Palette

Five core colors inspired by the tropical festival environment:

| Name       | Hex       | CSS Variable    | Tailwind                   | Character                       |
| ---------- | --------- | --------------- | -------------------------- | ------------------------------- |
| **Forest** | `#005d41` | `var(--forest)` | `bg-forest`, `text-forest` | Deep, grounding, sophisticated  |
| **Jungle** | `#00855e` | `var(--jungle)` | `bg-jungle`, `text-jungle` | Fresh, natural, balanced        |
| **Lime**   | `#7ab034` | `var(--lime)`   | `bg-lime`, `text-lime`     | Energetic, vibrant, alive       |
| **Amber**  | `#db9c3e` | `var(--amber)`  | `bg-amber`, `text-amber`   | Warm, inviting, action-oriented |
| **Sand**   | `#eedda0` | `var(--sand)`   | `bg-sand`, `text-sand`     | Soft, warm, approachable        |

### Color Progression

The palette flows like a journey from jungle shade to sunlit clearing:

```
Forest → Jungle → Lime → Amber → Sand
(dark)                          (light)
(cool)                          (warm)
```

### Semantic Mapping

| Semantic      | Maps To              | Usage                                 |
| ------------- | -------------------- | ------------------------------------- |
| `primary`     | Amber                | Primary CTAs, key actions             |
| `secondary`   | Sand                 | Secondary buttons, subtle backgrounds |
| `accent`      | Jungle               | Links, focus states, highlights       |
| `destructive` | Red (#dc2626)        | Delete, errors, warnings              |
| `muted`       | Warm gray            | Disabled states, subtle text          |
| `background`  | Off-white (#fffdf8)  | Page background                       |
| `foreground`  | Near-black (#1a1a1a) | Primary text                          |

### Usage Guidelines

**Forest** - Use for:

- Footer backgrounds
- Dark section backgrounds
- High-contrast text on light backgrounds
- Premium/important elements

**Jungle** - Use for:

- Links and interactive elements
- Focus rings and outlines
- Secondary emphasis
- Icons and accents

**Lime** - Use for:

- Success states
- Highlights and badges
- Hover states on green elements
- Fresh/new indicators

**Amber** - Use for:

- Primary call-to-action buttons
- Important highlights
- Countdown timers
- "Buy Tickets" and key actions

**Sand** - Use for:

- Card backgrounds
- Section backgrounds
- Secondary button fills
- Warm, inviting areas

### Button Patterns

```tsx
// Primary CTA (Buy Tickets, Sign Up)
<Button className="bg-amber text-foreground hover:bg-amber/90">
  Buy Tickets
</Button>

// Secondary action
<Button variant="secondary" className="bg-sand text-foreground hover:bg-sand/80">
  Learn More
</Button>

// Outline/Ghost
<Button variant="outline" className="border-jungle text-jungle hover:bg-jungle/10">
  View Lineup
</Button>

// Link style
<a className="text-jungle hover:text-forest underline-offset-4 hover:underline">
  Read more
</a>
```

---

## Component Patterns

### Cards

```tsx
// Standard card
<div className="bg-card rounded-lg border p-6">
  <h3 className="font-heading text-xl text-jungle">Card Title</h3>
  <p className="text-muted-foreground">Card content...</p>
</div>

// Featured/highlighted card
<div className="bg-sand rounded-lg p-6">
  <h3 className="font-heading text-xl text-forest">Featured</h3>
  <p className="text-foreground">Important content...</p>
</div>

// Dark card (for contrast sections)
<div className="bg-forest rounded-lg p-6">
  <h3 className="font-heading text-xl text-sand">On Dark</h3>
  <p className="text-sand/90">Light text on dark...</p>
</div>
```

### Section Backgrounds

```tsx
// Light section (default)
<section className="bg-background py-16">...</section>

// Warm section
<section className="bg-sand py-16">...</section>

// Muted section
<section className="bg-muted py-16">...</section>

// Dark section
<section className="bg-forest py-16 text-sand">...</section>
```

### Text on Backgrounds

| Background               | Recommended Text Colors          |
| ------------------------ | -------------------------------- |
| `background` (off-white) | `foreground`, `forest`, `jungle` |
| `sand`                   | `foreground`, `forest`           |
| `muted`                  | `foreground`, `forest`, `jungle` |
| `forest`                 | `sand`, `white`                  |
| `jungle`                 | `sand`, `white`                  |
| `amber`                  | `foreground`, `forest`           |

---

## Spacing & Layout

Use Tailwind's default spacing scale. Key values:

| Size | Value | Use Case                  |
| ---- | ----- | ------------------------- |
| `4`  | 16px  | Base padding, small gaps  |
| `6`  | 24px  | Card padding, medium gaps |
| `8`  | 32px  | Section gaps              |
| `12` | 48px  | Large section gaps        |
| `16` | 64px  | Section vertical padding  |
| `24` | 96px  | Hero section padding      |

### Container

```tsx
// Standard content container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">...</div>
```

---

## Iconography

- Use [Lucide React](https://lucide.dev) icons (already included via shadcn)
- Icon size: `size-5` for inline, `size-6` for standalone
- Icon color: inherit from text or use brand colors

```tsx
import { Music, Tent, Calendar } from 'lucide-react'
;<Music className="text-jungle size-5" />
```

---

## Motion & Animation

Keep animations subtle and purposeful:

- **Transitions**: `transition-colors duration-200` for hovers
- **Transforms**: `hover:scale-105 transition-transform` for cards
- **Avoid**: Excessive animation, anything that could cause motion sickness

---

## Accessibility

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Forest on Sand: ✓ passes
- Jungle on white: ✓ passes
- Amber on white: ⚠️ use for large text or add dark text
- All interactive elements must have visible focus states
- Use `ring-jungle` for focus indicators

---

## Quick Reference

### Tailwind Classes

```
Fonts:       text-display | font-heading | font-sans
Colors:      text-forest | text-jungle | text-lime | text-amber | text-sand
Backgrounds: bg-forest | bg-jungle | bg-lime | bg-amber | bg-sand
Semantic:    bg-primary | bg-secondary | bg-accent | bg-muted | bg-background
```

### CSS Variables

```css
--forest: #005d41;
--jungle: #00855e;
--lime: #7ab034;
--amber: #db9c3e;
--sand: #eedda0;

--font-tan-maple: ...;
--font-girlish-waves: ...;
--font-inter: ...;
```
