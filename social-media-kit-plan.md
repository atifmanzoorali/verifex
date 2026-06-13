# Social Media Template Kit — Build Plan

File: `social-media-templates.html`
Approach: Single self-contained HTML file, built in 5 phases.

---

## What Gets Built

A complete, brand-accurate social media template kit for Verifex.
Every template uses the exact design tokens from DESIGN.md.
The file is opened in a browser — no tools required.

---

## The 4 Colour Variants

Every content type gets built in all 4 colour variants.

| Variant | Background | Text | Accent | When to use |
|---|---|---|---|---|
| Dark | #111111 (Ink) | #F0ECE3 | #5BBFBE (Teal) | Insights, quotes, opinions |
| Teal | #1A7A78 (Primary) | #FFFFFF | #FFFFFF | Stats, numbers, bold claims |
| Cream | #E2DDD0 (Brand Cream) | #111111 | #1A7A78 | Announcements, feature launches |
| White | #FFFFFF (Surface) | #111111 | #1A7A78 | Clean, editorial, technical |

---

## The 6 Content Types

| # | Type | What it carries | Best backgrounds |
|---|---|---|---|
| 1 | Quote / Insight | Big typography statement, no visuals | Dark, Cream |
| 2 | Stat Drop | Oversized number + one-line label | Teal, Dark |
| 3 | Announcement | Eyebrow + headline + CTA link | Cream, White |
| 4 | Code / Dev Tip | Code block or numbered step | Dark, White |
| 5 | Milestone / Win | Achievement + context | Teal, Cream |
| 6 | Event / Webinar | Date + title + CTA | Dark, Cream |

---

## Phase 1 — Foundation + Colour Matrix

**What gets built:**
- Page header (project name, description, how to use)
- Design tokens reference strip (4 colour swatches, logo in all 3 variants)
- Template Matrix: 6 content types × 4 colour variants = 24 cards
  - All cards at 280×280px (uniform square for easy scanning)
  - Each card shows the layout, typography, and brand logo
  - Labelled by type and variant
- Spec reference: which variant works best with which content type

**Output:** The full combination matrix — every design pattern in one view.

---

## Phase 2 — LinkedIn Templates

**Dimensions:** 1200×627px feed posts, 1080×1080px square posts, 1584×396px banner
**Displayed at:** ~50% scale in browser

**What gets built:**
- Feed Landscape (1200×627): all 6 content types
- Feed Square (1080×1080): Quote, Stat, Announcement (3 most common on LinkedIn)
- Carousel (1080×1080): 4-slide sequence
  - Slide 1: Cover / Hook
  - Slide 2–3: Content slides (numbered points)
  - Slide 4: CTA slide with logo
- Company Banner (1584×396): 2 variants (Dark and Cream)
- Caption rules panel: character limits, hashtag rules, CTA patterns

---

## Phase 3 — X (Twitter) Templates

**Dimensions:** 1200×675px posts, 1500×500px banner
**Displayed at:** ~50% scale in browser

**What gets built:**
- Feed Post (1200×675): Quote, Stat, Announcement, Code Tip (4 types)
- Thread Cover Card: special format for opening a thread
- Profile Banner (1500×500): 1 variant
- Caption rules panel: character limit, no hashtag rule, tone reminders

---

## Phase 4 — Instagram Templates

**Dimensions:** Multiple (see below)
**Displayed at:** ~25% scale for stories, ~30% for portrait, ~35% for square

**What gets built:**

**Square Feed (1080×1080):** all 6 content types

**Portrait Feed (1080×1350):** Quote and Announcement — portrait gets more feed space on mobile

**Stories (1080×1920):** 4 designs
- Story 1: Quote / Insight (text-dominant)
- Story 2: Announcement with CTA button
- Story 3: Stat Drop
- Story 4: Link-in-Bio prompt

**Carousel (1080×1080):** 4-slide sequence (same structure as LinkedIn carousel)

**Highlight Covers (1080×1080, circular crop):** 6 branded icons
- API / Docs
- Updates / Changelog
- About / Story
- FAQ
- Tech Tips
- Open Source

---

## Phase 5 — Profile Assets + Spec Table

**What gets built:**

**Profile photo frames:** branded circular frame for LinkedIn and X (400×400)

**LinkedIn Company Page cover (1128×191):** 1 variant

**X Profile Banner (1500×500):** dark variant with tagline

**Master Spec Table:** every asset type across all platforms
| Asset | Platform | Dimensions | Colour variant | Notes |
|---|---|---|---|---|
| Feed post landscape | LinkedIn | 1200×627 | All 4 | Main post format |
| Feed post square | LinkedIn | 1080×1080 | Quote, Stat, Announce | Square performs well on mobile |
| Carousel slide | LinkedIn | 1080×1080 | Dark + Cream | Up to 10 slides |
| Company banner | LinkedIn | 1584×396 | Dark + Cream | Updated rarely |
| Feed post | X | 1200×675 | All 4 | 16:9 ratio |
| Profile banner | X | 1500×500 | Dark | Updated on launches |
| Feed square | Instagram | 1080×1080 | All 4 | Universal format |
| Feed portrait | Instagram | 1080×1350 | Dark + Cream | More feed space on mobile |
| Story | Instagram | 1080×1920 | Dark + Teal + Cream | 24hr lifespan |
| Carousel | Instagram | 1080×1080 | Dark + Cream | Up to 10 slides |
| Highlight cover | Instagram | 1080×1080 | Teal + Dark | Circular crop |

**Caption rules panel per platform:** lengths, hashtag policy, CTA style, emoji policy

---

## Build Order

| Phase | Section | Est. size | Status |
|---|---|---|---|
| 1 | Foundation + Colour Matrix (24 cards) | ~400 lines | ✅ Complete |
| 2 | LinkedIn (6 feed + 3 square + 4 carousel + 2 banners) | ~500 lines | ✅ Complete |
| 3 | X (4 posts + 1 thread card + 1 banner) | ~300 lines | ✅ Complete |
| 4 | Instagram (6 square + 2 portrait + 4 stories + 4 carousel + 6 highlights) | ~600 lines | ✅ Complete |
| 5 | Profile assets + master spec table | ~200 lines | ✅ Complete |

Total estimated: ~2000 lines of HTML.

All phases append to the same file. After each phase, open the file in browser to review before proceeding to the next.
