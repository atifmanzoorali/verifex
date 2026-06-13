# Verifex — Design System

Swiss International Typographic Style. Light only.

Inspired by the poster: Misfits / Meatmen / Necros, Freezer Theatre, Detroit, 1982.

Every design decision in this document is final unless explicitly changed here first.
No colour, font, spacing, or component style should be invented in the moment.
If something is not defined here, add it here before using it.

---

## Design Principles

Swiss design has four rules. Everything in this project follows them.

1. **Grid first.** Every element sits on the grid. Nothing floats freely.
2. **Typography is the design.** Font weight, size, and spacing do the visual work. Decoration is not needed.
3. **Colour has a job.** Every colour is used for a specific purpose. Colour for its own sake does not exist here.
4. **Clarity over personality.** The design should be invisible. The content should be obvious.

---

## 01 — Brand Foundation

### Personality
**Sharp and minimal.** Verifex is the kind of tool a senior engineer respects. No noise, no decoration, no hand-holding. Fast, precise, and confident.

### Tagline
**"Validate once. Trust always."**

Used in:
- Landing page hero
- Social media profile bios
- Email signatures
- README header

Never modify the tagline. Never use a variation of it.

### Logo System

**Style:** Icon + Wordmark

**Icon:** A geometric checkmark inside a thin-stroked square. Sharp corners. No fill — stroke only. References validation (the core function) while staying pure Swiss.

**Wordmark:** "Verifex" in Inter, weight 800, letter-spacing `-0.04em`. All lowercase. The icon sits to the left of the wordmark with a gap equal to the icon height.

**Three required versions:**

| Version | Usage | Background |
|---|---|---|
| Full colour | Primary use — light surfaces, product UI, print | Light (`#F0ECE3`, `#FFFFFF`) |
| White | Dark backgrounds — ink sections, social dark posts | Dark (`#111111`) |
| Ink | Fallback — greyscale contexts, watermarks | Any |

**Rules:**
- Minimum logo width: 80px
- Clear space around logo: equal to the height of the icon on all sides
- Never stretch, rotate, recolour, or add effects to the logo
- Never use the icon alone without the wordmark in the product UI — icon-only is for favicons and app icons only
- Never place the logo on a colour that does not appear in the colour palette

---

## 02 — Colour Palette

### Brand Colours
Extracted directly from the poster.

| Name | Hex | Where it comes from |
|---|---|---|
| `brand-cream` | `#E2DDD0` | Poster background |
| `brand-teal` | `#5BBFBE` | Poster teal block |
| `brand-yellow` | `#C9B827` | Poster mustard yellow block |
| `brand-green` | `#7A9638` | Poster olive green block |
| `brand-ink` | `#111111` | Poster text |

### Semantic Colours
How the brand colours map to UI roles.

| Token | Hex | Used For |
|---|---|---|
| `background` | `#F0ECE3` | Full page background — warm off-white, not pure white |
| `surface` | `#FFFFFF` | Cards, panels, modals, inputs |
| `surface-muted` | `#F7F4EE` | Subtle elevated surfaces, table rows, code blocks |
| `border` | `#D9D3C5` | Default borders on cards, inputs, dividers |
| `border-strong` | `#B8B0A0` | Focused inputs, active states, stronger dividers |
| `text-primary` | `#111111` | All main body text and headings |
| `text-secondary` | `#555047` | Subdued text, descriptions, metadata |
| `text-muted` | `#8A8278` | Placeholders, captions, disabled text |
| `primary` | `#1A7A78` | Primary buttons, links, active nav items — darkened teal for contrast |
| `primary-hover` | `#155E5C` | Hover state of primary elements |
| `primary-foreground` | `#FFFFFF` | Text on primary-coloured backgrounds |
| `accent-yellow` | `#C9B827` | Warnings, highlighted callouts — use sparingly |
| `accent-green` | `#7A9638` | Success states — use sparingly |
| `destructive` | `#B83232` | Delete actions, error messages, danger zone |
| `destructive-foreground` | `#FFFFFF` | Text on destructive backgrounds |

### Colour Rules
- The page background is always `background` (`#F0ECE3`) — never pure white
- Cards and panels are always `surface` (`#FFFFFF`) — they contrast against the background
- `brand-yellow` and `brand-green` are accent colours only — never use as primary action colours
- Never use more than two colours on a single component
- `brand-teal` (`#5BBFBE`) is display-only — for large graphic elements on the landing page. The UI uses `primary` (`#1A7A78`) for interactive elements because it has better contrast.

---

## 03 — Typography

### Font Family
**Inter** — already installed. No other font is used.

```css
font-family: 'Inter', sans-serif;
```

Swiss design uses one typeface and exploits weight and size for all hierarchy.
Inter is the closest modern web equivalent to Helvetica Neue — the typeface used in the poster.

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 12px | 16px | 400 | Timestamps, fine print |
| `text-sm` | 14px | 20px | 400 | Table data, secondary labels, badge text |
| `text-base` | 16px | 24px | 400 | Body text, form inputs, descriptions |
| `text-lg` | 18px | 28px | 500 | Card titles, section subheadings |
| `text-xl` | 20px | 28px | 600 | Page section headings |
| `text-2xl` | 24px | 32px | 700 | Dashboard page titles |
| `text-3xl` | 30px | 36px | 700 | Landing section headings |
| `text-4xl` | 36px | 40px | 800 | Landing hero subheading |
| `text-5xl` | 48px | 52px | 800 | Landing hero heading |
| `text-6xl` | 60px | 64px | 900 | Large display text |
| `text-7xl` | 72px | 76px | 900 | Hero poster-style display |

### Typography Rules
- **Headings are heavy.** Dashboard titles: weight 700. Landing page headings: weight 800–900.
- **Body is regular.** Never use weight above 500 for paragraphs.
- **Letter spacing on display text.** Apply `tracking-tight` (`-0.025em`) to all headings `text-3xl` and above.
- **No italic.** Swiss design does not use italic. Use weight contrast instead.
- **Uppercase for labels only.** Small uppercase labels (`text-xs`, `font-semibold`, `tracking-widest`) are allowed for category labels, stat card titles, table column headers.
- **Line lengths.** Body text max width: 65 characters (`max-w-prose`). Never wider.

### Typography Examples

```
Dashboard page title:    text-2xl font-bold text-primary        (24px / 700)
Dashboard section head:  text-xl font-semibold text-primary     (20px / 600)
Card title:              text-lg font-medium text-primary       (18px / 500)
Body / description:      text-base font-normal text-secondary   (16px / 400)
Label / metadata:        text-sm font-normal text-muted         (14px / 400)
Stat card label:         text-xs font-semibold uppercase tracking-widest text-muted
Landing hero:            text-5xl font-extrabold tracking-tight (48px / 800)
Landing section head:    text-3xl font-bold tracking-tight      (30px / 700)
```

---

## 04 — Spacing

Base unit: **4px**. Every spacing value is a multiple of 4.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight gaps — icon to label, badge padding |
| `space-2` | 8px | Inner padding for small elements |
| `space-3` | 12px | Input padding, tight card padding |
| `space-4` | 16px | Standard padding — buttons, form fields |
| `space-5` | 20px | Card padding (small) |
| `space-6` | 24px | Card padding (standard), section gaps |
| `space-8` | 32px | Between cards, between form sections |
| `space-10` | 40px | Page section padding |
| `space-12` | 48px | Large section gaps |
| `space-16` | 64px | Between major page sections |
| `space-20` | 80px | Landing page section padding |
| `space-24` | 96px | Large landing page gaps |

---

## 05 — Border Radius

Swiss design is geometric. Corners are sharp or nearly sharp.

| Token | Value | Used On |
|---|---|---|
| `rounded-none` | 0px | Dividers, separators |
| `rounded-sm` | 2px | Buttons, inputs, cards, badges — default for everything |
| `rounded` | 4px | Modals, dropdowns |
| `rounded-full` | 9999px | Avatar circles only |

**Rule:** Default border radius is `rounded-sm` (2px). Nothing uses `rounded-lg`, `rounded-xl`, or `rounded-2xl`. Those radii are too soft for this design language.

Update `tailwind.config.ts` `--radius` CSS variable to `2px`.

---

## 06 — Shadows

Swiss design uses borders, not shadows, to define depth.

| Token | Value | Used On |
|---|---|---|
| `shadow-none` | none | Default — almost everything |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.06)` | Cards on the dashboard (very subtle lift) |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Dropdowns, modals |

**Rule:** Never use `shadow-lg`, `shadow-xl`, or `shadow-2xl`. If something needs more visual separation, use a border.

---

## 07 — Grid & Layout

### Page Layout
- Max content width: `1280px` (`max-w-screen-xl`)
- Page horizontal padding: `24px` on desktop, `16px` on mobile
- Dashboard sidebar width: `240px` fixed
- Dashboard main content: fills remaining width

### Dashboard Grid
- Content area uses a 12-column grid
- Standard card grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Stat cards: always 3 across on desktop

### Vertical Rhythm
- Space between page title and first content: `32px`
- Space between sections on a page: `48px`
- Space between cards in a grid: `24px`
- Space between a label and its input: `8px`
- Space between form fields: `20px`

---

## 08 — Components

### Buttons

Three variants only. No others.

**Primary** — for the single most important action on the page
```
bg: primary (#1A7A78)
text: white
border: none
padding: 10px 20px
font: text-sm font-semibold
radius: rounded-sm (2px)
hover: primary-hover (#155E5C)
```

**Secondary** — for secondary actions
```
bg: surface (white)
text: text-primary (#111111)
border: 1px solid border (#D9D3C5)
padding: 10px 20px
font: text-sm font-medium
radius: rounded-sm (2px)
hover bg: surface-muted (#F7F4EE)
```

**Destructive** — for delete and danger actions only
```
bg: destructive (#B83232)
text: white
border: none
padding: 10px 20px
font: text-sm font-semibold
radius: rounded-sm (2px)
hover bg: #9A2A2A
```

**Rules:**
- One primary button per view — maximum
- Never place two primary buttons side by side
- Destructive button never appears without a confirmation dialog first

---

### Cards

```
bg: surface (white)
border: 1px solid border (#D9D3C5)
shadow: shadow-sm
radius: rounded-sm (2px)
padding: 24px
```

Cards never have coloured backgrounds. The colour comes from the `background` (`#F0ECE3`) that surrounds them.

---

### Inputs

```
bg: surface (white)
border: 1px solid border (#D9D3C5)
radius: rounded-sm (2px)
padding: 10px 14px
font: text-base text-primary
placeholder: text-muted

focus:
  border: 1px solid primary (#1A7A78)
  outline: 2px solid primary at 20% opacity

error:
  border: 1px solid destructive (#B83232)
```

---

### Badges

Two variants.

**Default**
```
bg: surface-muted (#F7F4EE)
text: text-secondary (#555047)
border: 1px solid border (#D9D3C5)
padding: 2px 8px
font: text-xs font-medium
radius: rounded-sm (2px)
```

**Valid** (green — for validation results)
```
bg: #EEF5E8
text: #3A6A1A
border: 1px solid #B8D49A
```

**Invalid** (red — for validation results)
```
bg: #FBF0EE
text: #8A2020
border: 1px solid #E8B4B0
```

---

### Navigation (Sidebar)

```
sidebar bg: surface (white)
sidebar border-right: 1px solid border (#D9D3C5)
sidebar width: 240px

nav item default:
  text: text-secondary
  font: text-sm font-medium
  padding: 8px 16px
  radius: rounded-sm

nav item hover:
  bg: surface-muted (#F7F4EE)
  text: text-primary

nav item active:
  bg: #EAF3F3  (very light teal tint)
  text: primary (#1A7A78)
  font: text-sm font-semibold
  border-left: 2px solid primary (#1A7A78)
```

---

### Stat Cards

Used on the dashboard overview for Total, Valid, Invalid counts.

```
layout: card (white, border, shadow-sm)
label: text-xs font-semibold uppercase tracking-widest text-muted
value: text-4xl font-bold text-primary (36px / 800)
```

The large number is the focus. The label is secondary. Nothing else on the card.

---

### Code Blocks

Used in the API docs page for curl examples and JSON responses.

```
bg: #111111  (near-black — the only dark surface in the light theme)
text: #F0ECE3 (cream — matches the page background)
font: 'JetBrains Mono', 'Fira Code', monospace — add to next.config.ts
font-size: text-sm (14px)
padding: 24px
radius: rounded-sm (2px)
border: none
```

Syntax highlighting via Shiki using the `github-dark` theme — already configured in `lib/shiki.ts`.

---

### Toast / Notifications

```
bg: surface (white)
border: 1px solid border (#D9D3C5)
shadow: shadow-md
radius: rounded-sm (2px)
padding: 16px

success icon: accent-green (#7A9638)
error icon: destructive (#B83232)
```

---

## 09 — Landing Page Design Language

The landing page is the one place where Swiss design is expressed most boldly. This is where the poster aesthetic shows most clearly.

### Colour Blocks
The landing page uses the brand colours as large geometric background sections — directly referencing the poster.

- Hero section background: `brand-cream` (`#E2DDD0`)
- How It Works section: `background` (`#F0ECE3`)
- Response Preview section: `brand-ink` (`#111111`) — full dark section, white text
- FAQ section: `surface` (`#FFFFFF`)
- CTA section: `primary` (`#1A7A78`) — full teal section, white text

### Landing Typography
- Hero headline: `text-6xl` or `text-7xl`, weight 900, `tracking-tight`, `text-brand-ink`
- Section headings: `text-4xl`, weight 800, `tracking-tight`
- No centred body text — Swiss design is left-aligned

### Landing Rules
- No decorative illustrations
- No gradients
- No shadows on hero elements
- Large typographic scale is the visual impact — not imagery

---

## 10 — Brand Voice

### Core Tone
**Direct but clear.** Verifex never talks down to the user, but never leaves them confused either. Say what needs to be said. Use the simplest word that is accurate.

### Voice Rules

| Rule | Do | Don't |
|---|---|---|
| Contractions | "You don't have any API keys yet." | "You do not have any API keys yet." |
| User address | "Your API key was created." | "API key created." or "The user's key was created." |
| Emojis | Never | — |
| Hashtags | Never | — |
| Passive voice | Avoid — state who did what | "The key was revoked" → "Your key was revoked" |
| Jargon | Explain it when it must appear | Never assume the reader knows DNS, MX, SMTP |

### UI Copy Examples

**Empty states:**
- "You don't have any API keys yet. Create one to get started."
- "No validations yet. Make your first API call to see results here."

**Success messages:**
- "Your API key was created."
- "Your password has been updated."

**Error messages:**
- "This email has no mail server. It will bounce."
- "That key doesn't exist or has been revoked."
- "You've reached your rate limit. Try again in 60 seconds."

**Confirmation dialogs:**
- "Delete this key? This can't be undone."
- "Are you sure? Your account and all data will be permanently removed."

### Caption Length (Social Media)
1–3 lines maximum. No exceptions. If you cannot say it in 3 lines, cut it — don't expand it.

---

## 11 — Social Media Guidelines

### Platforms
LinkedIn, X (Twitter), Instagram.

### Template Style
**Text-dominant.** Typography is the hero on every post. One or two lines of text on a brand-colour background block. Logo in the corner. No illustrations, no stock photos, no decorative elements.

This directly references the poster — large type on flat colour is the visual language.

### Post Sizes

| Platform | Format | Size |
|---|---|---|
| LinkedIn | Square post | 1200 × 1200px |
| LinkedIn | Portrait post | 1080 × 1350px |
| X (Twitter) | Landscape card | 1600 × 900px |
| Instagram | Square post | 1080 × 1080px |
| Instagram | Portrait / Story | 1080 × 1920px |

### Layout Specification (all templates)

```
Background: one flat brand colour — cream, teal, ink, or primary
Text: Inter, weight 800–900 for the main line, weight 400 for a subline
Text colour: brand-ink (#111111) on light backgrounds, brand-cream (#F0ECE3) on dark
Logo: bottom-left corner, white version on dark, full-colour on light
Padding: 64px on all sides (desktop), 48px on mobile
Alignment: left-aligned always — never centred
```

### Colour Usage per Template Type

| Post Type | Background | Text | Logo Version |
|---|---|---|---|
| Insight / quote | `brand-cream` (`#E2DDD0`) | `brand-ink` (`#111111`) | Full colour |
| Product / feature | `primary` (`#1A7A78`) | `#FFFFFF` | White |
| Dark statement | `brand-ink` (`#111111`) | `brand-cream` (`#E2DDD0`) | White |
| Accent highlight | `brand-teal` (`#5BBFBE`) | `brand-ink` (`#111111`) | Ink |

### Content by Platform

**LinkedIn**
- Product updates and new features
- Technical explainers: "How email validation works", "What MX records actually do"
- Open source building journey — decisions, tradeoffs, lessons
- Tone: Professional, direct, no fluff

**X (Twitter)**
- Sharp one-liners about email validation edge cases
- API tips and developer insights
- Quick builder updates
- Technical threads (5 tweets max — each tweet must stand alone)
- Tone: Blunt, confident, fast

**Instagram**
- Design showcase: UI screenshots, component close-ups
- Swiss poster-style quote cards using brand colours
- Behind the build: process, design decisions
- Tone: Visual-first, minimal caption

### Caption Rules (all platforms)
- No emojis
- No hashtags
- 1–3 lines maximum
- Left-aligned body text always
- Never sell — inform, show, or share

### Banned on Social
- Gradients on any graphic
- Stock photography
- Centred text on graphics
- More than two brand colours in one post
- Decorative icons or illustrations
- Rounded corners on graphic elements — use sharp corners consistent with the design system

---

## 12 — Email Communications

### Style
On-brand but brief. Emails look and feel like the product — not a generic transactional mailer.

### Specification

```
Background: background (#F0ECE3) — same as the product
Container: surface (#FFFFFF) card, border (#D9D3C5), max-width 600px, centered
Logo: top of container, full-colour, left-aligned
Body font: Inter, 16px, text-secondary (#555047)
Heading: Inter, 20px, weight 700, text-primary (#111111)
Primary CTA button: primary (#1A7A78), white text, rounded-sm (2px)
Footer: text-muted, 13px — unsubscribe link where required by law
```

### Email Types and Copy Tone

| Email | Subject Line Style | Body Length |
|---|---|---|
| Welcome | "You're in. Here's how to start." | 3–4 sentences + one CTA |
| Password reset | "Reset your Verifex password" | 2 sentences + one CTA |
| Usage alert (80%) | "You're at 80% of your monthly limit" | 2 sentences + one CTA |
| Usage alert (100%) | "You've hit your monthly limit" | 2 sentences + one CTA |

**Rules:**
- One CTA per email — never two
- No images except the logo
- No decorative dividers or coloured header banners
- Subject lines are factual — never clickbait

---

## 13 — README Voice

The README is for contributors and evaluators — a different audience from the product's users.

### Exception to Brand Voice
The README uses a **warmer and more welcoming** tone than the product UI. It still uses Inter-style clarity (no fluff, no padding), but it invites contribution rather than instructing a user.

### README Rules
- Open with what Verifex is in one sentence
- Follow with the tagline: "Validate once. Trust always."
- No marketing language — this is a technical document
- Use second person: "you", "your"
- Include a "Contributing" section that explicitly welcomes first-time contributors
- Tone: clear, warm, technically precise

---

## 14 — Iconography

Use **Lucide React** — already installed.

Rules:
- Size: `16px` (`size-4`) for inline icons, `20px` (`size-5`) for standalone icons
- Stroke width: `1.5` (default Lucide) — do not change
- Colour: always matches the surrounding text colour — never a different colour
- Never use icons for decoration — only for function

---

## 15 — What Is Banned

These patterns are explicitly banned. They conflict with Swiss design principles.

| Banned | Use Instead |
|---|---|
| Gradients on backgrounds | Flat colour |
| Box shadows larger than `shadow-md` | Borders |
| Border radius larger than `rounded` (4px) | `rounded-sm` (2px) |
| Decorative illustrations or abstract graphics | Typography and colour blocks |
| More than 2 colours on a single component | Simplify |
| Centered body text | Left-aligned text |
| Font weight below 400 for any visible text | 400 minimum |
| Any font other than Inter | Inter only |
| Hover animations that move elements | Colour-only hover states |
| `rounded-lg`, `rounded-xl`, `rounded-2xl` | `rounded-sm` |
| Emojis anywhere in the product or communications | Plain text |
| Hashtags in any social post | No hashtags |
| Stock photography | Typography and brand colour blocks |
| Passive voice in UI copy | Direct, active voice |

---

## 17 — Accessibility

Verifex targets WCAG 2.1 AA compliance on every page. Accessibility is part of the design — not a retrofit.

### Contrast Ratios

Every colour combination used in the UI must meet minimum contrast ratios.

| Foreground | Background | Ratio | Use | Passes AA |
|---|---|---|---|---|
| `text-primary` `#111111` | `background` `#F0ECE3` | 16.9:1 | Body text on page | Yes |
| `text-primary` `#111111` | `surface` `#FFFFFF` | 21:1 | Body text on cards | Yes |
| `text-secondary` `#555047` | `background` `#F0ECE3` | 7.1:1 | Descriptions on page | Yes |
| `text-secondary` `#555047` | `surface` `#FFFFFF` | 8.2:1 | Descriptions on cards | Yes |
| `text-muted` `#8A8278` | `background` `#F0ECE3` | 3.2:1 | Labels — large text only | Large text only |
| `primary-fg` `#FFFFFF` | `primary` `#1A7A78` | 4.6:1 | Button text | Yes |
| `#FFFFFF` | `destructive` `#B83232` | 5.1:1 | Destructive button text | Yes |
| `#3A6A1A` | `#EEF5E8` | 5.8:1 | Valid badge text | Yes |
| `#8A2020` | `#FBF0EE` | 6.2:1 | Invalid badge text | Yes |

**Rule:** Never introduce a new colour combination without checking its contrast ratio first. Use the WebAIM contrast checker.

### Focus States

Every interactive element must have a visible focus ring for keyboard navigation.

```
Default focus ring (all interactive elements):
  outline: 2px solid primary (#1A7A78)
  outline-offset: 2px

On dark backgrounds:
  outline: 2px solid brand-cream (#E2DDD0)
  outline-offset: 2px
```

**Rule:** Never use `outline: none` or `outline: 0` without replacing it with a visible custom focus indicator. This is a WCAG hard requirement.

### ARIA Patterns

| Component | Required ARIA |
|---|---|
| Icon-only buttons | `aria-label="Action name"` |
| Modal / dialog | `role="dialog"` + `aria-labelledby` + `aria-modal="true"` |
| Loading state | `aria-busy="true"` on the container |
| Error message | `aria-live="polite"` for inline errors |
| Nav landmark | `<nav aria-label="Main navigation">` |
| Stats | `aria-label="2,847 total validations"` on stat cards |
| Badge status | `aria-label="Status: valid"` — colour alone does not convey meaning |

### Skip Navigation

Every page must include a visually hidden skip link as the first focusable element:

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-sm">
  Skip to main content
</a>
```

### Keyboard Navigation Order

Dashboard tab order: Skip link → Logo → Nav items (top to bottom) → Main content → Page actions → Footer

Never trap focus outside of modals. Modal focus must be trapped inside while open and returned to the trigger element when closed.

---

## 18 — Motion System

Verifex uses motion sparingly. Swiss design is static — motion exists only to communicate state, not to decorate.

### Duration Tokens

| Token | Value | Used For |
|---|---|---|
| `duration-fast` | 100ms | Colour transitions — buttons, links, badges |
| `duration-base` | 200ms | Component state changes — input focus, nav active |
| `duration-slow` | 300ms | Panel transitions — modal open, toast slide-in |
| `duration-enter` | 200ms | Elements entering the DOM |
| `duration-exit` | 150ms | Elements leaving the DOM — exits are always faster than entrances |

### Easing Curves

| Token | Curve | Used For |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default — most transitions |
| `ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering — decelerates into position |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving — accelerates out |

### What Animates

| Element | Property | Duration | Easing |
|---|---|---|---|
| Button background | `background-color` | `duration-fast` | `ease-standard` |
| Input border | `border-color`, `box-shadow` | `duration-base` | `ease-standard` |
| Nav item background | `background-color` | `duration-fast` | `ease-standard` |
| Toast notification | `transform` (slide in from right) | `duration-slow` | `ease-enter` |
| Modal overlay | `opacity` | `duration-slow` | `ease-enter` |
| Modal panel | `transform` (scale from 0.97 to 1) + `opacity` | `duration-slow` | `ease-enter` |
| Skeleton shimmer | `background-position` | 1500ms loop | `linear` |
| Dropdown | `opacity` + `transform` (translate 4px up) | `duration-base` | `ease-enter` |

### What Does Not Animate

- Page background colour — never
- Typography size or weight — never
- Layout shifts — elements do not move on hover
- Border radius — never transitions
- Shadows — never transitions

### Reduced Motion

Every animation must respect `prefers-reduced-motion`. When the user has requested reduced motion, all transitions collapse to instant:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 19 — Component States

Every interactive component must be designed for all five states. Nothing is "just the default."

### State Definitions

| State | When | Visual Treatment |
|---|---|---|
| **Default** | Component is idle and available | Standard spec — defined per component above |
| **Hover** | Cursor is over the component | Colour change only — no movement |
| **Focus** | Component has keyboard focus | 2px teal outline + outline-offset 2px |
| **Disabled** | Action is unavailable | 40% opacity, `cursor: not-allowed`, no hover or focus response |
| **Loading** | Action is in progress | Spinner replaces label on buttons; skeleton replaces content in cards |
| **Error** | Validation failed or action errored | Destructive border/text colour, error message below |
| **Empty** | No data to display | Structured empty state — label + brief instruction |

### Disabled State Rules

```
opacity: 0.4
cursor: not-allowed
pointer-events: none  (on the element, not the wrapper — wrapper must still be focusable for ARIA)
No hover background change
No focus ring (disabled elements are not focusable)
```

### Loading — Button

```
Primary button in loading state:
  background: primary (#1A7A78) — unchanged
  text: hidden (opacity 0) — replaced by spinner
  spinner: white, 16px, stroke-width 2, border-top transparent, animation spin 600ms linear infinite
  width: locked to pre-loading width — never collapses
  cursor: not-allowed
  pointer-events: none
```

### Loading — Skeleton Screen

Used when content is being fetched. Replaces stat cards, table rows, and key cards.

```
skeleton base: surface-muted (#F7F4EE)
skeleton shimmer: linear-gradient left-to-right — surface-muted → #EDEAD9 → surface-muted
animation: shimmer 1500ms ease-in-out infinite
border-radius: matches the element being replaced (rounded-sm)
```

Skeleton blocks must match the exact height and width of the content they replace. Never use a generic grey box.

### Empty States

Every list or table that can have zero items must have a defined empty state.

**Structure:**
```
Container: centered vertically and horizontally in the available space
Icon: Lucide icon, 32px, text-muted colour — functional, not decorative
Heading: text-base font-medium text-primary
Description: text-sm text-muted — one sentence, tells the user what to do
CTA: optional — only when there is one clear next action
```

**Copy examples (per Brand Voice rules):**
- API Keys empty: "You don't have any API keys yet." + "Create key" button
- Activity empty: "No validations yet. Make your first API call to see results here."
- Settings: no empty state — settings always has content

---

## 20 — Data Visualisation

The usage dashboard will display charts. Charts are data — they follow the same visual rules as the rest of the system.

### Chart Colour Palette

Charts use a fixed sequence. Never invent a colour for a chart series.

| Order | Colour | Hex | Used For |
|---|---|---|---|
| 1st series | Primary teal | `#1A7A78` | Main metric — total validations |
| 2nd series | Brand green | `#7A9638` | Positive metric — valid count |
| 3rd series | Destructive | `#B83232` | Negative metric — invalid count |
| 4th series | Brand yellow | `#C9B827` | Warning metric — rate limited |
| 5th series | Text muted | `#8A8278` | Secondary / neutral metric |

Never use more than 5 series on a single chart. If more are needed, group smaller series into "Other."

### Chart Typography

```
Axis labels:     text-xs (12px), font-normal, text-muted (#8A8278)
Tick labels:     text-xs (12px), font-normal, text-muted
Legend text:     text-sm (14px), font-medium, text-secondary
Tooltip heading: text-sm (14px), font-semibold, text-primary
Tooltip value:   text-sm (14px), font-normal, text-secondary
```

### Chart Style Rules

```
Grid lines: 1px solid border (#D9D3C5), horizontal only — never vertical
Chart background: surface (#FFFFFF)
Chart border: 1px solid border (#D9D3C5)
Bar radius: 2px (matches --radius)
Line stroke-width: 2px
Dot on line charts: 4px filled circle, same colour as line
No chart title inside the chart — title lives above in the card header
No legend inside the chart area — legend sits below the chart
```

### Chart Types Permitted

| Chart | Used For | Not Used For |
|---|---|---|
| Line chart | Validation volume over time | Comparisons between categories |
| Bar chart | Comparing valid vs. invalid counts | Trends over time |
| Donut chart | Ratio (valid %) | More than 3 segments |

Never use: pie charts (use donut), area charts with fill (too decorative), 3D charts (never), radar charts.

---

## 21 — Open Graph & Meta Images

When a Verifex URL is shared on LinkedIn, X, or iMessage, a preview card appears. This card is a brand touchpoint.

### OG Image Specification

```
Size: 1200 × 630px
Format: PNG
Background: brand-cream (#E2DDD0)
```

**Layout:**
```
Left side (60% width):
  Logo: full-colour, top-left, 40px tall
  Headline: Inter 900, 56px, brand-ink (#111111), tracking-tight, max 2 lines
  Tagline: "Validate once. Trust always." — Inter 400, 18px, text-secondary

Right side (40% width):
  Vertical block filled with primary (#1A7A78)
  White checkmark icon centred — same geometric icon as logo, scaled to 80px
```

**Page-specific OG images:**
| Page | Headline |
|---|---|
| Home / Landing | "Email validation. Free. Open source." |
| Docs | "Verifex API Documentation" |
| Dashboard (logged in) | Use default — do not expose user data in OG |

### Twitter Card

```
Type: summary_large_image
Same image as OG — 1200 × 630px
```

### Meta Tags Required (every page)

```html
<meta property="og:title" content="Verifex — Email Validation API" />
<meta property="og:description" content="Validate once. Trust always." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/og-image.png" />
```

---

## 22 — Favicon & App Icon

The wordmark logo does not work at small sizes. The favicon uses only the geometric checkmark icon.

### Required Files

| File | Size | Used In |
|---|---|---|
| `favicon.ico` | 16×16 + 32×32 (multi-size) | Browser tab, legacy browsers |
| `favicon-16x16.png` | 16×16 | Browser tab fallback |
| `favicon-32x32.png` | 32×32 | Browser tab, retina |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `android-chrome-192x192.png` | 192×192 | Android home screen |
| `android-chrome-512x512.png` | 512×512 | Android splash screen |
| `og-image.png` | 1200×630 | Social sharing |

### Favicon Design Rules

```
16×16 — 32×32:
  Background: primary (#1A7A78)
  Icon: white checkmark only — no square border at this size (too small)
  No wordmark

180×180 and above:
  Background: primary (#1A7A78)
  Icon: white geometric checkmark inside thin white square border
  Padding: 20% of canvas size on all sides
```

---

## 23 — Responsive Behaviour

### Breakpoints

| Name | Width | Description |
|---|---|---|
| `mobile` | `< 768px` | Single column, stacked layout |
| `tablet` | `768px – 1023px` | Two column where needed, collapsed sidebar |
| `desktop` | `≥ 1024px` | Full layout with sidebar |
| `wide` | `≥ 1280px` | Max content width cap at 1280px |

### Dashboard — Mobile Behaviour

```
Sidebar:
  Hidden on mobile — replaced by a bottom navigation bar
  Bottom nav: 4 icons (Overview, Keys, Docs, Settings), icon + label
  Bottom nav height: 64px
  Background: surface (#FFFFFF), border-top: 1px solid border

Stat cards:
  3 columns on desktop → 1 column on mobile (stacked)
  Card padding: 16px on mobile (down from 24px)

Page padding:
  Desktop: 40px 48px
  Tablet:  32px 32px
  Mobile:  24px 16px
```

### Typography Scaling — Mobile

| Token | Desktop | Mobile |
|---|---|---|
| Landing hero (`text-7xl`) | 72px | 40px (`text-4xl`) |
| Landing hero (`text-6xl`) | 60px | 36px (`text-4xl`) |
| Section heading (`text-4xl`) | 36px | 28px (`text-3xl`) |
| Dashboard title (`text-2xl`) | 24px | 20px (`text-xl`) |
| Body text | 16px | 16px — unchanged |

### Component Behaviour — Responsive

| Component | Desktop | Mobile |
|---|---|---|
| Stat card grid | 3 columns | 1 column |
| Component grid (keys) | 2 columns | 1 column |
| Landing hero | 2 column (text + API preview) | 1 column, API preview hidden |
| Nav | Left sidebar, 240px | Bottom bar, 64px tall |
| Buttons | Inline | Full width on forms, inline elsewhere |
| Tables | Full columns visible | Horizontal scroll — never collapse columns |

---

## 24 — Token Architecture

Verifex uses a three-tier token system. This is the structural backbone that allows the design to scale without breaking.

### Three Tiers

**Tier 1 — Global Tokens (raw values)**
These are the primitive values. They are never used directly in components.

```css
/* Colours */
--color-teal-600:   #1A7A78;
--color-teal-700:   #155E5C;
--color-cream-100:  #F0ECE3;
--color-cream-200:  #E2DDD0;
--color-ink:        #111111;
--color-red-600:    #B83232;
--color-green-600:  #7A9638;
--color-yellow-500: #C9B827;
--color-teal-400:   #5BBFBE;
--color-white:      #FFFFFF;

/* Typography */
--font-sans: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Scale */
--size-1: 4px;   --size-2: 8px;   --size-3: 12px;
--size-4: 16px;  --size-6: 24px;  --size-8: 32px;
--size-10: 40px; --size-12: 48px; --size-16: 64px;

/* Radius */
--radius-sharp:  2px;
--radius-soft:   4px;
--radius-round:  9999px;

/* Motion */
--duration-fast: 100ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-enter:    cubic-bezier(0, 0, 0.2, 1);
--ease-exit:     cubic-bezier(0.4, 0, 1, 1);
```

**Tier 2 — Semantic Tokens (role assignments)**
These map global values to roles. Used everywhere in the product.

```css
--background:         var(--color-cream-100);
--surface:            var(--color-white);
--surface-muted:      #F7F4EE;
--border:             #D9D3C5;
--border-strong:      #B8B0A0;
--text-primary:       var(--color-ink);
--text-secondary:     #555047;
--text-muted:         #8A8278;
--primary:            var(--color-teal-600);
--primary-hover:      var(--color-teal-700);
--primary-foreground: var(--color-white);
--destructive:        var(--color-red-600);
--accent-green:       var(--color-green-600);
--accent-yellow:      var(--color-yellow-500);
--radius:             var(--radius-sharp);
```

**Tier 3 — Component Tokens (component-specific)**
These allow individual components to be changed without touching semantic tokens.

```css
/* Buttons */
--button-primary-bg:         var(--primary);
--button-primary-bg-hover:   var(--primary-hover);
--button-primary-text:       var(--primary-foreground);
--button-secondary-bg:       var(--surface);
--button-secondary-border:   var(--border);
--button-radius:             var(--radius);
--button-padding-x:          20px;
--button-padding-y:          10px;

/* Inputs */
--input-bg:            var(--surface);
--input-border:        var(--border);
--input-border-focus:  var(--primary);
--input-text:          var(--text-primary);
--input-placeholder:   var(--text-muted);
--input-radius:        var(--radius);
--input-padding-x:     14px;
--input-padding-y:     10px;

/* Cards */
--card-bg:       var(--surface);
--card-border:   var(--border);
--card-shadow:   0 1px 2px rgba(0,0,0,0.06);
--card-radius:   var(--radius);
--card-padding:  var(--size-6);

/* Nav */
--nav-active-bg:     #EAF3F3;
--nav-active-text:   var(--primary);
--nav-active-border: var(--primary);
--nav-hover-bg:      var(--surface-muted);
```

**Rule:** When changing something — ask which tier it belongs to. Changing a brand colour is Tier 1. Changing what "primary" means is Tier 2. Changing a specific button's appearance is Tier 3. Never modify a higher tier to fix a lower-tier problem.

---

## 25 — Z-Index Scale

Without a defined z-index scale, developers invent values on the spot and stacking conflicts happen. Every value in use must come from this table.

| Token | Value | Used On |
|---|---|---|
| `z-base` | `0` | Normal document flow |
| `z-raised` | `1` | Cards with shadow, sticky table headers |
| `z-dropdown` | `10` | Nav dropdowns, select menus, date pickers |
| `z-sticky` | `20` | Fixed sidebar, sticky page header |
| `z-overlay` | `30` | Modal backdrop, drawer backdrop |
| `z-modal` | `40` | Modal panel, drawer panel |
| `z-toast` | `50` | Toast notifications — always on top |

**Rules:**
- Never use a z-index value not in this table
- If a new layer is needed, add it here first with justification
- Never use `z-index: 999` or `z-index: 9999` — these are signs of a conflict, not a solution

---

## 26 — Modal & Dialog

Modals are used for: creating an API key, confirming a destructive action, and displaying inline documentation.

### Structure

```
Overlay:
  background: rgba(17, 17, 17, 0.4)   ← brand-ink at 40%
  z-index: z-overlay (30)
  backdrop-filter: none               ← no blur — Swiss design is sharp

Modal panel:
  background: surface (#FFFFFF)
  border: 1px solid border (#D9D3C5)
  shadow: shadow-md
  radius: rounded (4px)              ← one step up from default for modals
  z-index: z-modal (40)
  max-height: 90vh
  overflow-y: auto (panel only)
```

### Size Variants

| Variant | Width | Used For |
|---|---|---|
| Small | 400px | Confirmation dialogs — "Delete this key?" |
| Default | 560px | Create/edit forms — API key creation |
| Large | 720px | Multi-step flows, preview modals |

### Internal Layout

```
Header:
  padding: 20px 24px
  border-bottom: 1px solid border
  title: text-lg font-semibold text-primary
  close button: top-right, 20px × 20px, Lucide X icon, text-muted colour

Body:
  padding: 24px
  overflow-y: auto when content exceeds available height

Footer:
  padding: 16px 24px
  border-top: 1px solid border
  layout: flex, justify-content: flex-end, gap: 8px
  button order: Secondary (Cancel) left, Primary right
  Destructive modals: Secondary (Cancel) left, Destructive right
```

### Behaviour Rules

- Focus must be trapped inside the modal while it is open
- First focusable element inside modal receives focus on open
- `Escape` key closes the modal — always
- On close, focus returns to the element that triggered the modal
- Page body scroll must be disabled while modal is open (`overflow: hidden` on `<body>`)
- Clicking the overlay closes the modal — except for destructive confirmation modals (require explicit button click)

---

## 27 — Inline Alerts & Banners

Inline alerts are permanent, in-page components. They are different from toasts (which are temporary and floating).

**Use inline alerts for:** account warnings, API rate limit warnings, validation summaries, feature deprecation notices, form-level error summaries.

**Use toasts for:** action confirmations ("Key created"), transient success/error feedback.

### Four Variants

**Info** — informational, neutral
```
bg: #EAF3F3
border: 1px solid #A8D4D3
text: var(--primary) (#1A7A78)
icon: Lucide Info, 16px, primary colour
```

**Success**
```
bg: #EEF5E8
border: 1px solid #B8D49A
text: #3A6A1A
icon: Lucide CheckCircle, 16px, #3A6A1A
```

**Warning**
```
bg: #FBF8E8
border: 1px solid #E0D48A
text: #7A6200
icon: Lucide AlertTriangle, 16px, #7A6200
```

**Error**
```
bg: #FBF0EE
border: 1px solid #E8B4B0
text: #8A2020
icon: Lucide AlertCircle, 16px, #8A2020
```

### Layout (all variants)

```
padding: 12px 16px
radius: rounded-sm (2px)
layout: flex, align-items: flex-start, gap: 10px
icon: 16px, flex-shrink: 0, margin-top: 2px (optical alignment)
title (optional): text-sm font-semibold, same colour as text
body: text-sm font-normal, same colour as text, line-height 1.5
dismiss button (optional): Lucide X, 14px, top-right, same text colour
```

### Rules

- One alert per page section maximum — if multiple issues exist, use a list inside one error alert
- Never use an alert for success feedback after a form submission — use a toast
- Alerts do not auto-dismiss — the user dismisses them or they are removed by a state change

---

## 28 — Form Patterns

Individual input specs are in section 08. This section defines how inputs combine into complete forms.

### Label Rules

- Labels always sit **above** the field — never inline, never to the left
- `text-sm font-medium text-primary`
- Gap between label and input: `8px`
- Required fields: append `*` in `text-destructive` after the label text — `Email *`
- Never use placeholder text as a substitute for a label

### Helper Text

- Sits below the input, before any error message
- `text-sm text-muted`
- Describes what the field expects — not what the label already says
- Disappears and is replaced by the error message when validation fails

### Validation Timing

- **On blur** — validate when the user leaves a field. Never validate on every keystroke.
- **On submit** — if the user submits with unfilled required fields, validate all fields at once and scroll to the first error
- Error message replaces helper text below the input
- Error message: `text-sm text-destructive`

### Field Grouping

- Related fields are grouped with `16px` gap between them
- Groups are separated by `32px`
- Group labels (optional): `text-xs font-semibold uppercase tracking-widest text-muted` — same as stat card labels

### Form-Level Error Summary

When a form is submitted with multiple errors:

```
Position: top of the form, above all fields
Component: Error inline alert (see section 27)
Content: "Your form has X errors. Please fix them before continuing."
Each error: bulleted list below the description, linking to the field by anchor
```

### Submit Button Rules

- Always at the bottom of the form
- Always a Primary button — one per form
- Label describes the action: "Create key", "Save changes", "Send reset link" — never just "Submit"
- In loading state while the request is in flight — prevent double submission

### Form Width

- Max form width on standalone pages (login, register): `400px`
- Max form width inside modals: fills the modal body
- Max form width inside dashboard settings: `480px`

---

## 29 — Table Patterns

### Base Spec

```
Table wrapper:
  background: surface (#FFFFFF)
  border: 1px solid border (#D9D3C5)
  border-radius: rounded-sm (2px)
  overflow: hidden

Header row:
  background: surface-muted (#F7F4EE)
  border-bottom: 1px solid border
  font: text-xs font-bold uppercase tracking-widest text-muted
  padding: 12px 24px
  position: sticky top:0 (inside scrollable containers)

Body rows:
  font: text-sm text-secondary
  padding: 14px 24px
  border-bottom: 1px solid surface-muted (#F7F4EE)
  hover: background surface-muted

Last row: no border-bottom
```

### Sortable Columns

```
Sortable column header: cursor-pointer, hover colour text-primary
Sort icon: Lucide ArrowUp / ArrowDown, 12px, inline after label
Unsorted: Lucide ArrowUpDown, 12px, text-muted
Active sort: icon in text-primary colour
```

### Column Alignment Rules

- Text columns: left-aligned
- Number columns: right-aligned
- Status badges: left-aligned
- Action buttons: right-aligned (last column)

### Row Actions

- Actions column always last on the right
- Use text buttons or icon buttons — never a dropdown unless more than 3 actions
- Destructive actions (delete, revoke) always require confirmation modal

### Pagination

```
Position: below the table, right-aligned
Components: "Previous" and "Next" secondary buttons + page indicator text
Page indicator: "Page 2 of 14" — text-sm text-muted
When 10 or fewer results: hide pagination entirely
```

### Mobile Behaviour

Tables never collapse columns on mobile. The table wrapper gets `overflow-x: auto` and the user scrolls horizontally. Column data is never truncated or hidden to fit mobile.

---

## 30 — Link Styles

Inline text links appear in body copy, descriptions, and the docs page.

### Spec

```
colour: primary (#1A7A78)
text-decoration: underline always
underline colour: primary (#1A7A78)
font-weight: inherits from surrounding text — no bold
cursor: pointer

hover:
  colour: primary-hover (#155E5C)
  underline colour: primary-hover

focus:
  outline: 2px solid primary
  outline-offset: 2px

visited:
  colour: primary — no visited state change
```

### Rules

- Never use a colour other than `primary` for inline links
- Never remove the underline from inline links — underline is the signal that it is a link
- Navigation links (sidebar, breadcrumbs) are **not** inline links — they follow nav item spec
- "Learn more", "View docs", "Read the guide" — always link text describes the destination, never "click here"
- External links: add `target="_blank" rel="noopener noreferrer"` — no visual indicator needed at this scale

---

## 31 — Error Page Design

Error pages are the brand under stress. They must be calm, direct, and never expose technical details.

### 404 — Not Found

```
Layout: full-page, background (#F0ECE3), logo top-left with full padding
Content: vertically and horizontally centred

Status code: text-xs font-bold uppercase tracking-widest text-muted — "404"
Headline: text-4xl font-bold text-primary — "Page not found."
Description: text-base text-secondary — "The page you're looking for doesn't exist."
CTA: Primary button — "Go home"
```

### 500 — Server Error

```
Status code: "500"
Headline: "Something went wrong."
Description: "We're looking into it. Try refreshing — if the problem continues, check back in a few minutes."
CTA: Secondary button — "Refresh" + Primary button — "Go home"
```

### Rules

- Never expose stack traces, database errors, or technical messages to the user
- Never say "Error 500: Internal Server Error" — plain English only
- The logo on error pages links back to the home page
- Error pages use the full `background` colour — never a white or dark background
- No decorative illustrations — a large typographic status code is the only visual element

---

## 32 — Inline Code Style

Used for `<code>` tags within prose text — API endpoint names, parameter names, key prefixes, terminal commands inside sentences.

```
font-family: JetBrains Mono, Fira Code, monospace
font-size: 0.875em (87.5% of surrounding text — slightly smaller)
background: surface-muted (#F7F4EE)
border: 1px solid border (#D9D3C5)
border-radius: rounded-sm (2px)
padding: 2px 6px
colour: text-primary (#111111)
line-height: inherits from parent
```

**Rules:**
- Inline code never wraps — if it would wrap, use a full code block instead
- Never use inline code for entire commands — use a code block
- Use inline code for: key prefixes (`vfx_live_`), endpoints (`/api/v1/validate`), parameter names (`X-API-Key`), short values (`true`, `false`, `null`)

---

## 33 — Selection & Scrollbar

Small details that separate a considered system from a generic one.

### Text Selection

```css
::selection {
  background: rgba(26, 122, 120, 0.15);  /* primary at 15% opacity */
  color: var(--text-primary);
}
```

### Custom Scrollbar (Webkit)

```css
/* Applies to all scrollable containers */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;  /* horizontal scrollbar */
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);          /* #D9D3C5 */
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--border-strong);   /* #B8B0A0 */
}
```

**Note:** Firefox uses `scrollbar-color: var(--border) transparent` and `scrollbar-width: thin`.

---

## 34 — Dark Mode Decision

Verifex does not support dark mode. This is a deliberate design decision, not an oversight.

**Why:**
Swiss International Typographic Style is rooted in print design. The warmth of the `background` (`#F0ECE3`) and the contrast of black type on a light field is inseparable from the aesthetic. A dark mode version would be a different design language — not a translation of this one.

**The secondary reason:**
Verifex is a portfolio-grade SaaS. A single, immaculately executed light theme is more impressive to senior engineers than a light theme plus a dark theme done to half the standard.

**If a user requests dark mode:**
The answer is no. The design system does not accommodate dark mode. The `prefers-color-scheme: dark` media query is intentionally ignored.

**If the product ever needs dark mode in the future:**
It must be designed from scratch as a separate theme — not retrofitted. A new token set, a new colour palette, a new set of component specs. It is not a simple inversion.

---

## 35 — Tooltip

Tooltips appear on hover over icon-only buttons and any element whose label is truncated or hidden.

### Spec

```
background:   brand-ink (#111111)
text:         brand-cream (#E2DDD0)
font:         text-xs (12px), font-medium
padding:      6px 10px
radius:       rounded-sm (2px)
shadow:       shadow-md
max-width:    200px
white-space:  nowrap (unless content requires wrapping)
```

### Position

```
Default:      above the trigger, centred horizontally
Gap:          6px between trigger and tooltip
Arrow:        4px triangle pointing down toward the trigger, brand-ink colour
Fallback:     if no space above, appear below with arrow pointing up
```

### Behaviour

```
Appear delay:   400ms after hover begins — prevents flicker on fast cursor movement
Disappear:      immediate on cursor leave — no delay
Keyboard:       appears on focus (same delay), disappears on blur
Touch:          never appears on touch devices — do not show on tap
```

### Rules

- Never use a tooltip on an element that already has a visible text label
- Never use a tooltip to convey critical information — it is invisible to screen readers unless `aria-label` is set
- Always set `aria-label` on the trigger element — the tooltip is a visual affordance only
- Tooltip text must be short enough to read in one glance — if it needs more than one line, reconsider whether a tooltip is the right pattern
- Never put interactive elements (links, buttons) inside a tooltip

### When to Use

| Use tooltip | Do not use tooltip |
|---|---|
| Icon-only buttons (copy, revoke, edit) | Buttons with visible text labels |
| Truncated text in a table cell | Form field errors — use inline error text |
| Stat card additional context | Navigation items — label is always visible |

---

## 36 — Dropdown & Select

Used in forms for choosing from a list of options.

### Native Select (default)

Use the native `<select>` element unless there are more than 8 options or options need custom rendering.

```
appearance: none  (remove browser default arrow)
background: surface (#FFFFFF)
border: 1px solid border (#D9D3C5)
radius: rounded-sm (2px)
padding: 10px 36px 10px 14px  (extra right padding for custom arrow)
font: text-base Inter text-primary
height: 42px
cursor: pointer

custom arrow:
  Lucide ChevronDown, 16px, text-muted
  position: absolute, right 12px, vertically centred
  pointer-events: none

focus:
  border: 1px solid primary (#1A7A78)
  ring: 2px solid primary at 20% opacity

disabled:
  opacity: 0.4
  cursor: not-allowed
```

### Custom Dropdown (for more than 8 options or custom rendering)

```
Trigger: identical to native select spec above
Dropdown panel:
  background: surface (#FFFFFF)
  border: 1px solid border (#D9D3C5)
  shadow: shadow-md
  radius: rounded (4px)
  max-height: 240px
  overflow-y: auto
  z-index: z-dropdown (10)
  margin-top: 4px

Option item:
  padding: 10px 14px
  font: text-sm text-secondary
  cursor: pointer
  hover: background surface-muted, text text-primary

Selected option:
  background: #EAF3F3
  text: primary (#1A7A78)
  font-weight: 500

Dividers between option groups:
  1px solid border, margin: 4px 0
```

### Rules

- Never use a custom dropdown just for styling — native select is preferred for its accessibility
- Keyboard navigation must work: Arrow keys move through options, Enter selects, Escape closes
- Selected option must be visible when dropdown opens — scroll to it if needed

---

## 37 — Usage / Progress Meter

Used to display monthly validation usage against the plan limit, and rate limit status.

### Spec

```
Track:
  background: surface-muted (#F7F4EE)
  border: 1px solid border (#D9D3C5)
  height: 6px
  radius: rounded-full (9999px)
  width: 100%

Fill:
  height: 100%
  radius: rounded-full
  transition: width 300ms ease-standard

Fill colours by threshold:
  0–79%:   primary (#1A7A78)
  80–99%:  accent-yellow (#C9B827)
  100%:    destructive (#B83232)
```

### Label Patterns

```
Above meter:   "X of Y validations used this month" — text-sm text-secondary
Right of label: percentage — text-sm font-semibold text-primary (or yellow/red at threshold)
Below meter:   only when at 80%+ — show inline warning alert (see section 27)
```

### Usage Card (dashboard)

```
Container: white card, border, shadow-sm, padding 24px
Header: stat card label style — text-xs font-semibold uppercase tracking-widest text-muted
Value: "X / Y" — text-2xl font-bold text-primary
Meter: sits below the value with 12px gap
Footer: "Resets on [date]" — text-xs text-muted, 8px below meter
```

### Rate Limit Meter

Used in the API docs page to show requests-per-minute limit.

```
Same spec as above
Fill colour: always primary until 100%, then destructive
Label: "X / Y requests per minute"
```

---

## 38 — Toast Timing & Stacking

The visual spec for toasts is in section 08. This section defines behaviour.

### Timing

| Toast type | Auto-dismiss after |
|---|---|
| Success | 4 seconds |
| Info | 5 seconds |
| Warning | 6 seconds |
| Error | Never auto-dismisses — user must dismiss manually |

**Why errors never auto-dismiss:** Error messages need to be read, understood, and potentially acted on. Auto-dismissing an error before the user has read it is a failure of communication.

### Position & Stacking

```
Position:     bottom-right of the viewport
Margin:       24px from right edge, 24px from bottom edge
z-index:      z-toast (50) — always on top
Width:        320px fixed
```

**Stacking order:**
- Toasts stack vertically upward — newest toast appears at the bottom, above previous toasts
- Gap between stacked toasts: 8px
- Maximum simultaneous toasts: 3
- When a 4th toast arrives: the oldest toast is immediately dismissed

### Entry & Exit Animation

```
Entry:  slide in from right + fade in — transform: translateX(100%) → translateX(0), opacity: 0 → 1
        duration: duration-slow (300ms), ease: ease-enter

Exit:   slide out to right + fade out
        duration: duration-exit (150ms), ease: ease-exit
        triggered by: auto-dismiss timer OR user clicking dismiss button
```

### Dismiss Button

Every toast has a dismiss button — `X` icon, 14px, top-right corner, same text colour as the toast content.

---

## 39 — Browser Support

Verifex supports modern evergreen browsers only. No legacy browser support.

### Support Matrix

| Browser | Minimum Version | Notes |
|---|---|---|
| Chrome | 100+ | Primary development and testing browser |
| Edge | 100+ | Chromium-based — same as Chrome support |
| Firefox | 100+ | Full support |
| Safari | 15+ | Test specifically — CSS behaviour differs |
| Mobile Safari (iOS) | 15+ | Test on real device — not just simulator |
| Chrome Android | 100+ | Full support |
| Internet Explorer | None | Not supported — not a consideration |
| Opera | 85+ | Chromium-based — passively supported |

### Safari-Specific Warnings

- Custom scrollbar CSS (`::-webkit-scrollbar`) applies — but Firefox requires `scrollbar-color` separately
- `aspect-ratio` support: safe on Safari 15+
- `gap` in flexbox: safe on Safari 14.1+
- `dvh` / `svh` units: safe on Safari 15.4+ — use `100vh` as fallback

### Testing Requirements

Before any phase is marked complete:
- Test on Chrome (latest) — primary
- Test on Safari (latest) — required
- Test on Firefox (latest) — required
- Test on mobile Safari (iPhone, Safari 15+) — required for responsive work

---

## 40 — Copy Deck

Every UI string in one place. This is the single source of truth for all copy in the product.

### Navigation

| Location | String |
|---|---|
| Sidebar — item 1 | Overview |
| Sidebar — item 2 | API Keys |
| Sidebar — item 3 | Docs |
| Sidebar — item 4 | Settings |
| Sidebar — user section | [user email] |

### Buttons

| Context | Primary | Secondary | Destructive |
|---|---|---|---|
| API Keys page | Create key | — | Revoke |
| Create key modal | Create key | Cancel | — |
| Revoke confirmation | Revoke key | Cancel | — |
| Delete account | — | — | Delete account |
| Settings | Save changes | Cancel | — |
| Login page | Sign in | — | — |
| Register page | Create account | — | — |
| Forgot password page | Send reset link | Back to sign in | — |
| Error pages | Go home | Refresh (500 only) | — |

### Empty States

| Location | Heading | Description | CTA |
|---|---|---|---|
| API Keys — no keys | You don't have any API keys yet. | Create a key to start making validation requests. | Create key |
| Activity — no data | No validations yet. | Make your first API call to see results here. | — |
| Usage — no data | No usage data yet. | Your validation counts will appear here once you make your first request. | — |

### Toast Messages

| Trigger | Type | Message |
|---|---|---|
| API key created | Success | Your API key was created. |
| API key revoked | Success | Your key has been revoked. |
| Settings saved | Success | Your settings have been saved. |
| Password changed | Success | Your password has been updated. |
| Copy key to clipboard | Success | Copied to clipboard. |
| Any network failure | Error | Something went wrong. Try again. |
| Rate limit hit | Warning | You've reached your rate limit. Try again in 60 seconds. |
| Session expired | Info | Your session has expired. Sign in again. |

### Confirmation Dialogs

| Action | Heading | Body | Confirm button | Cancel button |
|---|---|---|---|---|
| Revoke API key | Revoke this key? | This can't be undone. Any requests using this key will stop working immediately. | Revoke key | Cancel |
| Delete account | Delete your account? | All your data — keys, usage history, and settings — will be permanently removed. This can't be undone. | Delete account | Cancel |

### Error Messages (UI Validation)

| Field | Condition | Message |
|---|---|---|
| Email | Empty on submit | Email address is required. |
| Email | Invalid format | Enter a valid email address. |
| Password | Empty on submit | Password is required. |
| Password | Too short | Password must be at least 8 characters. |
| Key name | Empty on submit | Give your key a name. |
| Key name | Too long (>50 chars) | Key name must be 50 characters or fewer. |

### Error Messages (API / Server)

| Situation | Message shown to user |
|---|---|
| 401 — not authenticated | Sign in to continue. |
| 403 — forbidden | You don't have permission to do that. |
| 404 — not found | Page not found. |
| 429 — rate limited | You've reached your rate limit. Try again in 60 seconds. |
| 500 — server error | Something went wrong. We're looking into it. |
| Network offline | Check your connection and try again. |

### Form Labels & Helper Text

| Field | Label | Helper text |
|---|---|---|
| Login email | Email address | — |
| Login password | Password | — |
| Register name | Full name | — |
| Register email | Email address | — |
| Register password | Password | At least 8 characters. |
| Key name | Key name | Give this key a name to identify it later. |
| Key environment | Environment | — |

---

## 41 — Divider & Separator

Used to visually separate sections of content within a page or component.

### Spec

```
Horizontal divider:
  border: none
  border-top: 1px solid border (#D9D3C5)
  width: 100%
  height: 0

Vertical divider (inline, rare):
  border-left: 1px solid border (#D9D3C5)
  height: 1em (matches surrounding text height)
  width: 0
  margin: 0 12px
```

### Rules

- Use `border-top` on the container element directly — do not add a separate `<hr>` element unless the divider has semantic meaning (separating distinct content sections)
- `border-strong` (`#B8B0A0`) is never used for decorative dividers — only for focus rings and active states
- Never stack two dividers with no content between them
- Dividers inside cards always use `border` (`#D9D3C5`) — never a different colour
- Spacing above a divider must equal spacing below it — maintain vertical rhythm

### When to Use

| Use divider | Do not use divider |
|---|---|
| Between modal header and body | Between every item in a list — use gap instead |
| Between card sections | To separate visual sections that already have different backgrounds |
| Between form field groups | Between individual form fields — use gap instead |
| Below page title in settings | Between nav items in the sidebar |

---

## 42 — Performance Budget

Verifex is a portfolio piece targeting senior engineers. Performance is evaluated as part of code quality. Every page must meet these targets before shipping.

### Lighthouse Score Targets (Mobile)

| Metric | Target | Fail threshold |
|---|---|---|
| Performance | 90+ | Below 80 |
| Accessibility | 95+ | Below 90 |
| Best Practices | 95+ | Below 90 |
| SEO | 90+ | Below 85 |

### Core Web Vitals Targets

| Metric | Target | What it measures |
|---|---|---|
| LCP (Largest Contentful Paint) | Under 2.5s | When the main content is visible |
| FID / INP (Interaction to Next Paint) | Under 200ms | How fast the page responds to input |
| CLS (Cumulative Layout Shift) | Under 0.1 | How much content jumps around while loading |
| FCP (First Contentful Paint) | Under 1.5s | When first content appears |
| TTFB (Time to First Byte) | Under 600ms | Server response speed |

### Implementation Requirements

**Fonts:**
```css
font-display: swap;   /* prevent invisible text during font load */
```
Preload Inter font files in `<head>` for the weights used above the fold (700, 800).

**Images:**
- All images must use `next/image` — automatic WebP conversion, lazy loading, size hints
- No `<img>` tags with fixed pixel dimensions — always use responsive sizing
- Alt text on every image — descriptive, not filename

**CSS:**
- Tailwind purge must be configured — zero unused CSS in production
- No inline styles in production code (HTML preview excluded)
- CSS bundle: under 50KB gzipped

**JavaScript:**
- No third-party analytics scripts that block rendering
- Route-based code splitting — Next.js handles this automatically
- No `useEffect` on every render — minimise client-side waterfalls

**Fonts used above the fold:**
Preload Inter 700 and 800 weights. 400 and 500 can load normally.

---

## 16 — Tailwind Config Updates Required

When implementing this design system, update `tailwind.config.ts` and `globals.css`:

**`globals.css` — update CSS variables:**
```css
:root {
  --background: 42 20% 91%;        /* #F0ECE3 */
  --foreground: 0 0% 7%;           /* #111111 */
  --surface: 0 0% 100%;            /* #FFFFFF */
  --card: 0 0% 100%;               /* #FFFFFF */
  --card-foreground: 0 0% 7%;      /* #111111 */
  --border: 38 16% 82%;            /* #D9D3C5 */
  --input: 38 16% 82%;             /* #D9D3C5 */
  --primary: 179 63% 29%;          /* #1A7A78 */
  --primary-foreground: 0 0% 100%; /* #FFFFFF */
  --secondary: 38 13% 95%;         /* #F7F4EE */
  --secondary-foreground: 0 0% 7%; /* #111111 */
  --muted: 38 13% 95%;             /* #F7F4EE */
  --muted-foreground: 30 8% 40%;   /* #6B6459 */
  --accent: 38 13% 95%;            /* #F7F4EE */
  --accent-foreground: 0 0% 7%;    /* #111111 */
  --destructive: 0 58% 46%;        /* #B83232 */
  --destructive-foreground: 0 0% 100%;
  --ring: 179 63% 29%;             /* #1A7A78 */
  --radius: 2px;                   /* Sharp corners — Swiss design */
}
```

**`tailwind.config.ts` — add brand colours:**
```ts
brand: {
  cream: '#E2DDD0',
  teal: '#5BBFBE',
  yellow: '#C9B827',
  green: '#7A9638',
  ink: '#111111',
},
```
