# SOCIAL_MEDIA.md — Build Plan

Output file: `SOCIAL_MEDIA.md` at the project root.

This document is the written companion to `social-media-templates.html`.
The HTML shows what posts look like. This file defines what they say, why, and when.

Primary reader: Claude (or any AI agent) writing social content for Verifex.
Secondary reader: a content writer or social media manager following brand rules.

---

## Phase 1 — Platform Strategy & Content Pillars

**What gets written:**

### Brand Positioning on Social
One paragraph defining what Verifex's social presence is for.
Not "to grow followers" — the specific job it does: drive GitHub stars, API signups, developer trust.

### Audience Profile per Platform
Who is actually reading each platform.

| Platform | Primary audience | Secondary audience |
|---|---|---|
| LinkedIn | Engineering managers, CTOs, startup founders | Developers evaluating tools |
| X | Developers, indie hackers, open source community | Technical founders |
| Instagram | Designers, brand-aware developers, general tech audience | Potential contributors |

### Content Pillars
The 5 topic categories Verifex posts about. Every post belongs to one pillar.
No post gets written without knowing which pillar it serves.

| Pillar | What it covers | % of content |
|---|---|---|
| Education | How email validation works, what MX records are, why format checks aren't enough | 35% |
| Product | Features, updates, API changes, open source news | 25% |
| Data / Stats | Industry numbers, decay rates, bounce statistics | 20% |
| Build in Public | Progress, decisions, lessons learned building Verifex | 15% |
| Community | GitHub contributors, user shoutouts, developer questions answered | 5% |

### Platform Role (one sentence per platform)
What LinkedIn is for. What X is for. What Instagram is for.
These are decision rules — if content doesn't fit the platform's role, it doesn't get posted there.

---

## Phase 2 — Content Type Specs & Caption Templates

**What gets written:**

For each of the 6 content types (Quote, Stat, Announcement, Code Tip, Milestone, Event):

### Per content type:
- **What it is** — one sentence definition
- **When to use it** — the trigger condition (not a schedule)
- **What it must contain** — required elements
- **What it must not contain** — banned elements
- **Recommended colour variant** — from the design system
- **Platform fit** — which platforms it works on and why

### Caption templates (copy-paste ready)

For each content type × each platform, a fill-in-the-blank caption:

```
[QUOTE — LINKEDIN]
[Hook line — the quote itself or a sharp observation. Under 20 words.]

[2–3 lines of context. What makes this true? What does it mean for the reader?]

[One question or CTA on the final line.]
```

```
[QUOTE — X]
[The full quote in one tweet. Under 240 characters including punctuation.]
```

```
[STAT — LINKEDIN]
[The number + what it means in one sentence.]

[Why this matters for the reader's work.]

[Source: where the number comes from.]
[CTA]
```

All 6 types × 3 platforms = 18 caption templates total.

---

## Phase 3 — Profile Copy & Link-in-Bio

**What gets written:**

### LinkedIn Profile / Company Page Copy
- **Tagline** (the 120-character headline under the name)
- **About section** (the 2,000-character "About" for the company page)
- **Featured section** — what gets pinned and why
- **Pinned post strategy** — which post type stays pinned, when to update it

### X (Twitter) Profile Copy
- **Bio** (160 characters max)
- **Pinned tweet** — what it says and when to change it
- **Location field** — what Verifex uses here
- **Website field** — which URL

### Instagram Profile Copy
- **Bio** (150 characters max, line breaks count)
- **Link-in-bio** — what URL, which tool (Linktree vs. direct), what the page contains
- **Highlight strategy** — which 6 Highlights are always live (matches the covers built in Phase 4 of the HTML)
- **Pinned posts** — which 3 posts stay pinned to the profile grid

### Bio Rules
Rules that apply across all platforms:
- What must always appear
- What is banned from bios
- When bios get updated (launches only, not seasonally)

---

## Phase 4 — Posting Cadence & Engagement Rules

**What gets written:**

### Posting Cadence
Not a rigid calendar — a minimum frequency and content mix per platform.

| Platform | Minimum | Ideal | Content mix |
|---|---|---|---|
| LinkedIn | 2× per week | 4× per week | 2 Education, 1 Product, 1 Stat or Build |
| X | 3× per week | Daily | 2 Education/Quote, 1 Code Tip, 1 Product |
| Instagram | 2× per week | 3× per week | 1 Quote, 1 Stat or Announce, 1 Story |

### Best posting times (by platform and audience)
Research-backed times for developer audiences.
Written as rules, not suggestions.

### Engagement Rules
What to do when someone replies, comments, or DMs.

- **Reply policy** — which comments always get a reply, which never do
- **Reply timing** — within how many hours
- **Reply tone** — same brand voice as posts, never defensive
- **DM policy** — when to move a conversation to DMs
- **What never to do** — specific banned behaviours (deleting critical comments, arguing publicly)

### Thread Strategy (X-specific)
- When to write a thread vs. a single post
- How to structure a thread (numbers, last tweet CTA, reply timing)
- What topics earn thread treatment

### Story Cadence (Instagram-specific)
- How often to post stories
- Which story types get saved to Highlights
- Link-in-bio update rule

### Hashtag Policy (all platforms)
Final answer: no hashtags on any platform.
Written with the reason so future contributors don't reverse it.

---

## Build Order

| Phase | What gets written | Est. length |
|---|---|---|
| 1 | Platform strategy + content pillars | ~150 lines | ✅ Complete |
| 2 | Content type specs + 18 caption templates | ~300 lines | ✅ Complete |
| 3 | Profile copy + link-in-bio strategy | ~200 lines | ✅ Complete |
| 4 | Posting cadence + engagement rules | ~200 lines | ✅ Complete |

**Total estimated: ~850 lines.**

All phases written into a single `SOCIAL_MEDIA.md` file at the project root.
Each phase is a clearly marked section so it can be read in parts.

---

## Relationship to Other Files

| File | What it does | How SOCIAL_MEDIA.md relates |
|---|---|---|
| `DESIGN.md` | Visual rules — colours, fonts, components | SOCIAL_MEDIA.md defers to DESIGN.md for all visual decisions |
| `social-media-templates.html` | Visual reference — what posts look like | SOCIAL_MEDIA.md is the written companion — what posts say |
| `Verifex_Brief.md` | Product brief — what Verifex is | SOCIAL_MEDIA.md pulls brand voice and positioning from here |

SOCIAL_MEDIA.md never redefines visual rules — it only references them.
If there is a conflict between SOCIAL_MEDIA.md and DESIGN.md, DESIGN.md wins.
