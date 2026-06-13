# Verifex — Social Media System

This document defines what Verifex posts, why, and how.
Read this before writing any social content for Verifex.

**Companion files:**
- `social-media-templates.html` — open in browser to see what posts look like
- `DESIGN.md` — all visual rules. This file never overrides DESIGN.md.
- `Verifex_Brief.md` — full product context

---

## Phase 1 — Platform Strategy & Content Pillars

---

### Why Verifex Has a Social Presence

Verifex is a portfolio-grade open source project. Social media does one job: build trust with senior engineers and technical decision-makers so they star the repo, try the API, and remember the name when they need email validation.

Follower counts do not matter. GitHub stars, API signups, and inbound contributors are the only metrics that count.

Every post must earn one of these outcomes:
1. A developer clicks through to the repo or docs
2. A reader learns something they did not know about email validation
3. A technical decision-maker associates Verifex with quality and precision

If a post does not plausibly earn one of those three outcomes, do not post it.

---

### Audience Profile

#### LinkedIn
**Primary:** Engineering managers, CTOs, and technical founders evaluating developer tools. They make or influence buying and adoption decisions. They read LinkedIn during working hours. They respond to data, credibility signals, and concrete product benefits.

**Secondary:** Mid-to-senior developers who follow technical content and share useful tools with their teams. They discover Verifex through a colleague's share, not an algorithm.

**What they want to see:** Proof that the tool works, evidence that the builder knows what they are doing, and content that makes them look smart if they share it.

#### X (Twitter)
**Primary:** Developers, indie hackers, and open source contributors who follow technical accounts and discover tools through threads and replies. They move fast. They form opinions in seconds. They share what is sharp and concise.

**Secondary:** Technical founders building products who need validation infrastructure and are actively looking for solutions.

**What they want to see:** Precise takes, useful code snippets, honest build-in-public updates, and content that respects their time.

#### Instagram
**Primary:** Design-aware developers and brand-conscious builders who follow clean, well-designed technical accounts. They discover Verifex through aesthetics first, then investigate the product.

**Secondary:** General tech audience who may share visual content and expand reach to non-technical followers who influence technical decisions.

**What they want to see:** Visual clarity, typographic precision, and content that looks as good as the product it represents.

---

### Platform Role

Each platform has one primary job. Content that does not fit the platform's role does not get posted there — it gets adapted or skipped.

| Platform | Primary role | What it is NOT for |
|---|---|---|
| LinkedIn | Build credibility with decision-makers. Drive repo visits and API signups from people with budget and influence. | Personal updates, casual content, memes |
| X | Build reputation with the developer community. Drive GitHub stars and word-of-mouth among engineers. | Long-form content, product announcements without a hook |
| Instagram | Build brand presence and visual identity. Reach adjacent audiences who influence technical communities. | Technical depth, code-heavy content |

---

### Content Pillars

Every post belongs to exactly one pillar. If a post does not fit a pillar, it does not get posted.

The pillar determines the tone, the depth, and which platforms it belongs on.

---

#### Pillar 1 — Education (35% of content)
**What it covers:** How email validation works. What an MX record is. Why format checks are not enough. What causes email bounces. What happens when you send to an invalid address. The mechanics of DNS lookups. Common mistakes developers make with email handling.

**Goal:** Make the reader smarter. Position Verifex as the expert in this space.

**Tone:** Direct and precise. No hand-holding. Written for developers who already know how to code — not for beginners.

**Platform fit:**
- LinkedIn: Full explanation with context. 900–1,300 characters.
- X: One sharp insight per tweet. Under 240 characters. Thread format for deeper topics.
- Instagram: Visual stat or quote that represents the concept. Caption stays short.

**Examples:**
- "Why regex alone cannot validate an email address"
- "What MX records actually tell you — and what they don't"
- "The difference between a bounce and a block"
- "Why 23% of email lists decay every year"

---

#### Pillar 2 — Product (25% of content)
**What it covers:** New features. API updates. Open source milestones. Performance improvements. Integration guides. Changelog highlights.

**Goal:** Keep followers informed about what Verifex can do. Drive direct action — docs visit, API signup, GitHub star.

**Tone:** Announcement style. Confident, brief, CTA-driven. Never hype. State the feature, state what it does, link to docs or repo.

**Platform fit:**
- LinkedIn: Full announcement with context. Cream or White variant template.
- X: One-line announcement + link. Thread for major releases.
- Instagram: Announcement template. CTA always points to link in bio.

**Examples:**
- "MX record validation is live"
- "v1.0 shipped — here is what changed"
- "The free tier now supports 1,000 validations per day"
- "Verifex is now on npm"

---

#### Pillar 3 — Data & Stats (20% of content)
**What it covers:** Industry numbers around email deliverability, list decay, bounce rates, invalid email volumes. Always cite the source in the caption.

**Goal:** Make the problem visceral. A number is more persuasive than a claim.

**Tone:** Let the number speak. One sentence of context. No editorialising. The stat is the content.

**Platform fit:**
- LinkedIn: Stat template (Teal or Dark). Number in the image. Context in the caption. Source in the caption.
- X: Number + one-line context. Under 240 characters.
- Instagram: Stat template. Number must be readable at mobile size.

**Rule:** Never post an unverified stat. Always know the source before posting. Cite it.

**Examples:**
- "23% of email lists decay every year"
- "2.3 billion invalid emails are sent every day"
- "The average email bounce rate is 2%. Above 5% and your sender reputation is at risk."

---

#### Pillar 4 — Build in Public (15% of content)
**What it covers:** Decisions made while building Verifex. Lessons learned. What went wrong. What was harder than expected. What was simpler. Why a specific architectural choice was made.

**Goal:** Build trust by being transparent. Attract contributors. Humanise the project without making it personal.

**Tone:** Honest and reflective. Not self-promotional. Not a complaint. A lesson with a point.

**Platform fit:**
- LinkedIn: Full reflection. 900–1,300 characters. Quote or Announcement template.
- X: Short take or thread. Threads work well for "here is what we learned" format.
- Instagram: Quote template with the core lesson. Caption adds context.

**Rule:** Never build-in-public content that reveals an unresolved security issue, an embarrassing bug in production, or internal disagreements. The lesson must be resolved before it gets posted.

**Examples:**
- "We rewrote the MX validation layer three times. Here is why."
- "Why we chose dns/promises over a DNS library"
- "What we would do differently if we started Verifex today"
- "The test that caught a bug we did not know existed"

---

#### Pillar 5 — Community (5% of content)
**What it covers:** GitHub contributors. Developers using Verifex in production. Questions answered in the community. Shoutouts to useful adjacent tools.

**Goal:** Acknowledge the people building with and around Verifex. Signal that the project is active and cared for.

**Tone:** Warm but brief. Never sycophantic. One sentence of thanks, one sentence of context, done.

**Platform fit:**
- LinkedIn: Milestone template. Cream or Teal variant.
- X: Short shoutout. Tag the person or repo.
- Instagram: Milestone template.

**Rule:** Only post community content when there is something genuinely worth sharing. Do not manufacture community content to fill a schedule.

**Examples:**
- "500 GitHub stars in the first week — built in public, thank you"
- "@username shipped an integration with Verifex and Resend — link below"
- "First external contributor merged today"

---

### Pillar Mix by Platform

| Platform | Education | Product | Data/Stats | Build in Public | Community |
|---|---|---|---|---|---|
| LinkedIn | 35% | 25% | 20% | 15% | 5% |
| X | 40% | 20% | 20% | 15% | 5% |
| Instagram | 25% | 30% | 25% | 15% | 5% |

Instagram skews slightly more Product and Data because visuals carry those content types better than long-form education.

---

### What Is Never Posted (Any Platform)

- Opinions on politics, culture, or anything unrelated to email validation and developer tooling
- Content that names a competitor negatively
- Reposted content without original commentary
- Motivational quotes unrelated to the product or domain
- "Like and share" requests of any kind
- Engagement bait questions ("What do you think?") without a genuine point of view attached
- Announcements of features that are not yet live
- Apologies for downtime or bugs posted on social — those go to the status page and email only

---

## Phase 2 — Content Type Specs & Caption Templates

Six content types. Each one defined, specified, and given a ready-to-use caption template for every platform.

Fill in the `[brackets]`. Do not change the structure. The structure is the brand.

---

### Content Type 1 — Quote / Insight

**What it is:** A single sharp observation about email validation, developer tooling, or a technical truth that most people overlook. Typography is the visual. No supporting graphic needed.

**When to use it:** When there is a genuine insight worth sharing. Not on a schedule — only when the idea earns it. Minimum: once per week. Maximum: twice per week across all platforms combined.

**Must contain:**
- One central idea. Not two. One.
- A contrast or tension (what people think vs. what is true, what is easy vs. what is right)
- The Verifex logo and tagline on the image
- A question or CTA in the caption

**Must not contain:**
- More than one idea per post
- Vague inspiration ("success takes hard work")
- A claim that cannot be verified or explained if challenged

**Recommended colour variant:** Dark (ink) as default. Cream for a warmer tone when the insight is reflective rather than declarative.

**Platform fit:**
- LinkedIn: Best format — caption adds context and invites discussion
- X: Works as a standalone tweet — the image reinforces the text
- Instagram: Strong — big typography reads well as a visual

---

**Caption Template — LinkedIn**

```
[The insight in one sentence. This is the hook. Under 20 words. Make it land without the image.]

[1–2 sentences of context. Why is this true? What does it mean in practice?]

[Optional: one concrete example — "For instance, gmail.com passes every format check. So does gmail.cm."]

[Closing line: a question that invites a genuine reply, or a direct statement that closes the thought.]
```

Character target: 600–1,000. No hashtags. No emojis.

**Example:**
```
Most email validation tools check format. None of them tell you if the email works.

A regex can confirm that user@domain.com looks right. It cannot confirm that domain.com has a mail server, that the server is accepting connections, or that the inbox exists.

Format checks catch typos. MX checks catch dead addresses. You need both.

What does your current validation flow look like?
```

---

**Caption Template — X**

```
[The full insight in one tweet. Under 240 characters. The image already shows the quote — the tweet must add something, not just repeat it.]
```

Character target: Under 240. No hashtags. No emojis.

**Example:**
```
Most validation tools check email format. Almost none check whether the mail server exists. That's the check that actually prevents bounces.
```

---

**Caption Template — Instagram**

```
[One sentence hook — the same as the quote on the image, or a sharper version of it.]

[One line of context.]

[CTA: "Link in bio" or a question.]
```

Character target: 100–200. No hashtags. No emojis. Line breaks between each element.

**Example:**
```
Format valid. Domain valid. MX record valid. That's the only check that matters.

Most tools stop at the first step.

Link in bio to see how Verifex does all three.
```

---

### Content Type 2 — Stat Drop

**What it is:** A single data point — a number that makes the email validation problem concrete and urgent. The number lives on the image at large scale. The caption provides source and context.

**When to use it:** When a verified, sourceable stat is available that reinforces one of the content pillars. Maximum once per week. Never post a stat without a source.

**Must contain:**
- One number. One label. Nothing else in the stat area of the image.
- A source cited in the caption (publication, study, or dataset)
- Context in the caption explaining what the number means for the reader

**Must not contain:**
- Unverified or estimated numbers presented as fact
- Two stats in one post
- A stat that is older than 3 years without noting the date

**Recommended colour variant:** Teal as default. Dark as alternative for a more serious tone.

**Platform fit:**
- LinkedIn: Best format — caption can add full context and source
- X: Works well — number in image, context in tweet
- Instagram: Strong — the oversized number is the visual

---

**Caption Template — LinkedIn**

```
[Restate the stat in a sentence. "X% of email lists decay every year." Do not just say "wow".]

[What does this mean in practice? One concrete consequence — lost revenue, missed invoice, failed signup email.]

[Why does it happen? One sentence explanation.]

[What can a developer do about it? One sentence — this is where Verifex is implied, not pushed.]

Source: [Publication / Study / Dataset, Year]
```

Character target: 500–900. No hashtags. No emojis.

**Example:**
```
23% of email lists decay every year.

That means nearly 1 in 4 addresses you collected 12 months ago will bounce, go undelivered, or hit a spam trap today. For a list of 10,000, that is 2,300 wasted sends per campaign — and each bounce damages your sender reputation.

It happens because people change jobs, abandon inboxes, and close accounts. The email address looks valid. The domain still exists. But the mailbox is gone.

A format check will not catch it. An MX record lookup will.

Source: HubSpot Email Marketing Benchmarks, 2024
```

---

**Caption Template — X**

```
[Stat in one sentence.] [What it means in one sentence.] [Source.]
```

Character target: Under 240. No hashtags. No emojis.

**Example:**
```
23% of email lists decay every year. 1 in 4 addresses you collected 12 months ago will bounce today. Source: HubSpot 2024.
```

---

**Caption Template — Instagram**

```
[Restate the stat in one short sentence.]

[One line: what this means for anyone sending email.]

Source: [Publication, Year]
```

Character target: 80–150. No hashtags. No emojis.

**Example:**
```
23% of email lists decay every year.

If you're not validating before you send, you're burning your sender reputation.

Source: HubSpot Email Benchmarks, 2024
```

---

### Content Type 3 — Announcement

**What it is:** A product update, feature launch, open source milestone, or significant release. The image carries the headline. The caption provides detail and a direct link or CTA.

**When to use it:** When something ships. Not for features that are "coming soon" — only for things that are live and usable today.

**Must contain:**
- An eyebrow label on the image ("New Feature", "Open Source", "Now Live")
- A headline on the image that states the feature or milestone in plain English
- A CTA on the image (Read the docs / Star on GitHub / Try it free)
- A caption that explains what changed and what the reader can do with it

**Must not contain:**
- Hype language ("game-changing", "revolutionary", "excited to announce")
- A feature description longer than 2 sentences in the caption — link to docs for detail
- An announcement for something that requires a waitlist, invite, or delay

**Recommended colour variant:** Cream as default (warm, readable, launch energy). White for technical releases where clean precision matters more.

**Platform fit:**
- LinkedIn: Best format — decision-makers see it, share it internally
- X: Works for launches — link in tweet, not in image
- Instagram: Works — CTA always points to link in bio

---

**Caption Template — LinkedIn**

```
[State what shipped in one sentence. No "excited to announce". Just: "[Feature] is live."]

[What does it do? One sentence — from the user's perspective, not the engineer's.]

[Why does it matter? One sentence — what problem does it solve that wasn't solved before?]

[How do you use it? One sentence or a short code snippet if it fits.]

[CTA: link to docs, GitHub, or signup page.]
```

Character target: 400–800. No hashtags. No emojis.

**Example:**
```
MX record validation is live in Verifex.

It checks whether the email domain has an active mail server — not just whether the address looks valid. A format check tells you the structure is right. An MX check tells you whether the email can actually be delivered.

Most validation tools stop at format. This is the check they skip.

Full API reference: verifex.dev/docs
```

---

**Caption Template — X**

```
[Feature name] is live.

[What it does in one sentence.]

[Link to docs or repo.]
```

Character target: Under 280. No hashtags. No emojis.

**Example:**
```
MX record validation is live in Verifex.

Checks whether the domain has an active mail server — not just whether the address looks right.

verifex.dev/docs
```

---

**Caption Template — Instagram**

```
[What shipped in one sentence.]

[What it does — one line.]

[CTA: "Link in bio."]
```

Character target: 80–150. No hashtags. No emojis.

**Example:**
```
MX record validation is now live.

Check if the mail server actually exists — not just the email format.

Link in bio.
```

---

### Content Type 4 — Code / Dev Tip

**What it is:** A working code snippet or a numbered technical tip aimed at developers. The code or steps are on the image. The caption explains what it does and why it matters.

**When to use it:** When there is a genuinely useful snippet or technique that a developer can copy and use today. Not tutorial content — one precise, actionable thing.

**Must contain:**
- Working, copy-pasteable code on the image (not pseudocode)
- Language or framework context (if it is TypeScript-specific, say so)
- A caption that explains what the code does and what problem it solves — not just what it says

**Must not contain:**
- Broken or incomplete code
- Code that requires a library or setup step not mentioned
- Code longer than 8 lines on the image — if it is longer, link to a full example in the docs

**Recommended colour variant:** Dark as default (code on dark reads like a terminal). White as alternative for a cleaner editorial look.

**Platform fit:**
- LinkedIn: Best format — developers save code posts
- X: Works well — code images get high engagement in developer communities
- Instagram: Avoid — code is unreadable at mobile scale in the feed

---

**Caption Template — LinkedIn**

```
[What does this code do? One sentence from the output perspective, not the syntax perspective.]

[Why would a developer use this instead of doing it another way? One sentence.]

[What does the response contain? List the key fields: valid, mx, reason — briefly.]

[Link to full docs if there is more context worth reading.]
```

Character target: 300–700. No hashtags. No emojis.

**Example:**
```
One fetch call. Format check, domain check, and MX record lookup — all returned in a single JSON response.

Most validation setups run these as separate steps, or skip the MX check entirely. This runs all three in under 50ms and returns a reason field when validation fails — so you know exactly why an address was rejected.

Response shape: { valid: boolean, mx: boolean, reason: string | null }

Full reference: verifex.dev/docs
```

---

**Caption Template — X**

```
[What this code does in one sentence.]
[One line: what makes it useful.]
[Link to docs.]
```

Character target: Under 240. No hashtags. No emojis.

**Example:**
```
One call. Format + domain + MX check. Returns valid, mx, and reason in a single JSON response.

Full reference: verifex.dev/docs
```

---

**Caption Template — Instagram**

*Note: Code / Dev Tip posts are not recommended for Instagram feed. If posting, use a simplified numbered-steps version instead of a code block.*

```
[The technique in plain English — no code in the caption.]

[What problem it solves. One sentence.]

[Link in bio for the full code example.]
```

Character target: 80–150. No hashtags. No emojis.

**Example:**
```
Validate email format, domain, and MX record in a single API call.

Most tools only check format. This checks all three.

Link in bio for the full code example.
```

---

### Content Type 5 — Milestone / Win

**What it is:** A concrete achievement — a number reached, a version shipped, a community milestone hit. Brief, factual, and grounded. Not a celebration for its own sake — a data point that signals the project is growing.

**When to use it:** Only when a real milestone is reached. Do not manufacture milestones. Do not post "100 followers" as a milestone — that is vanity. Post "500 GitHub stars", "v1.0 shipped", "first external contributor merged" — those are signals.

**Must contain:**
- The milestone number or event stated plainly on the image
- One sentence of context in the caption — why this matters or what it took
- A brief acknowledgement of the community when appropriate

**Must not contain:**
- Excessive gratitude or over-celebration
- Claims about what the milestone "means" that are speculative
- A sales pitch attached to the milestone

**Recommended colour variant:** Teal as default (energy, momentum). Cream as alternative for a calmer, more reflective tone.

**Platform fit:**
- LinkedIn: Best format — milestone posts earn high engagement from networks
- X: Works — keep it short and let the image carry it
- Instagram: Works — Teal Milestone template reads well visually

---

**Caption Template — LinkedIn**

```
[State the milestone in one sentence. Plain, factual.]

[One sentence of context: what it represents, how long it took, or what made it possible.]

[Optional: one sentence acknowledging contributors or the community — only if genuine.]

[One forward-looking line: what comes next. Not a promise — a direction.]
```

Character target: 200–500. No hashtags. No emojis.

**Example:**
```
500 GitHub stars in the first week.

Verifex was built in public, documented from day one, and shipped with tests before launch. This is what that looks like.

Thank you to the developers who tried it, reported issues, and shared it with their teams.

Next: the npm package and a Python client.
```

---

**Caption Template — X**

```
[Milestone in one sentence.] [One line of context.] [Optional: thank you in one line.]
```

Character target: Under 240. No hashtags. No emojis.

**Example:**
```
500 GitHub stars in the first week. Built in public, shipped with tests. Thank you to everyone who tried it.
```

---

**Caption Template — Instagram**

```
[Milestone stated in one sentence.]

[One line: what it represents.]

[Optional: one line of thanks.]
```

Character target: 80–150. No hashtags. No emojis.

**Example:**
```
500 GitHub stars in the first week.

Built in public. Shipped with tests. Documented from day one.

Thank you.
```

---

### Content Type 6 — Event / Webinar

**What it is:** A live session, AMA, demo, or talk related to Verifex or email validation. The image carries the date, title, and registration CTA. The caption provides the detail needed to decide whether to attend.

**When to use it:** When an event is confirmed and a registration link is live. Post 3–5 times in the week before the event, not earlier. The day of the event, post once more as a reminder.

**Must contain:**
- Date and time (with timezone) on the image
- Title of the event on the image
- A registration link in the caption
- What the attendee will learn — not a description of the session, but the takeaway

**Must not contain:**
- Vague descriptions ("join us for an exciting session")
- An event post without a working registration link
- A post more than 7 days before the event

**Recommended colour variant:** Dark as default. Cream as alternative for daytime/professional events.

**Platform fit:**
- LinkedIn: Best format — professional events convert well here
- X: Works for reminders — short, direct, link in tweet
- Instagram: Works — Stories work better than feed for event reminders

---

**Caption Template — LinkedIn**

```
[Event name and date in one sentence. "On [Day Date] at [Time timezone], [Event name]."]

[What will attendees learn or walk away with? Two or three bullet points. Concrete, not vague.]

[Who is it for? One sentence — be specific so the wrong people self-select out.]

[Registration link. Free or paid — state it clearly.]
```

Character target: 300–700. No hashtags. No emojis.

**Example:**
```
On Thursday 26 June at 3pm UTC: How We Built a Zero-Downtime Email Validation API.

What you'll walk away with:
— The architecture behind Verifex's validation pipeline
— Why we chose dns/promises over a DNS library, and what it cost us
— How we handled rate limiting without a Redis dependency

For developers building or evaluating validation infrastructure. Free to attend.

Register: verifex.dev/events
```

---

**Caption Template — X**

```
[Event + date in one line.] [What you'll learn — one sentence.] [Link.]
```

Character target: Under 240. No hashtags. No emojis.

**Example:**
```
Thu 26 Jun, 3pm UTC — live walkthrough of how we built Verifex's validation pipeline. Architecture, trade-offs, lessons. Free. verifex.dev/events
```

---

**Caption Template — Instagram**

```
[Event + date in one sentence.]

[What attendees will learn — one line.]

[CTA: "Register — link in bio."]
```

Character target: 80–150. No hashtags. No emojis.

**Example:**
```
Live on 26 June, 3pm UTC.

How we built a zero-downtime email validation API — architecture, decisions, lessons.

Register free — link in bio.
```

---

## Phase 3 — Profile Copy & Link-in-Bio

All copy below is ready to paste. Do not paraphrase. Do not add to it.
If something needs updating, update it here first, then update the platform.

---

### LinkedIn

#### Company Page Tagline
*120 characters max. Appears under the company name in search results and on the page.*

```
Open source email validation API. Format + MX record check in a single call. Free tier. Self-hostable.
```
*(101 characters)*

---

#### Company Page About Section
*2,000 characters max. The full description of what Verifex is.*

```
Verifex is an open source email validation API built for developers who need to know whether an email address actually works — not just whether it looks right.

Most validation tools check format. Verifex checks format, domain, and MX record in a single API call, returning a structured JSON response with a reason field when validation fails.

Built with Next.js 14, Supabase, and TypeScript. Strict mode throughout. Full test coverage. Deployed on Vercel.

— One endpoint: POST /api/v1/validate
— Returns: { valid, mx, reason }
— Free tier available. No credit card required.
— Self-hostable. MIT licensed.
— Full API reference at verifex.dev/docs

Verifex is a portfolio project built in public by Atif Manzoor. The code is the product. Every architectural decision is documented. Every component is tested.

If you are evaluating the technical quality: the GitHub repository is the best place to start.
```
*(893 characters)*

---

#### Featured Section
*The 3 items pinned to the top of the company page. Update only on major releases.*

| Slot | What to feature | Link |
|---|---|---|
| 1 | GitHub repository | github.com/atifmanzoorali/verifex |
| 2 | API documentation | verifex.dev/docs |
| 3 | Most recent major announcement post | The LinkedIn post URL |

**Rule:** Slot 3 updates every time a major feature ships. Slots 1 and 2 are permanent.

---

#### Pinned Post Strategy
Pin the most recent Announcement or Milestone post. Never pin a Quote or Stat post — those are scroll content, not profile content.

Update the pinned post when:
- A new feature ships
- A significant GitHub milestone is reached (500 stars, 1K stars, etc.)
- A major version is released

Do not update the pinned post more than once per month. Stability on the pinned post signals a stable product.

---

#### Personal Profile Headline (if posting as an individual)
*220 characters max. Used if Atif posts from a personal LinkedIn account about Verifex.*

```
Building Verifex — open source email validation API · Next.js · TypeScript · Supabase · verifex.dev
```
*(99 characters)*

---

### X (Twitter)

#### Bio
*160 characters max.*

```
Open source email validation API. Format + MX record check in one call. Built in public. MIT licensed. verifex.dev
```
*(114 characters)*

---

#### Location Field
```
github.com/atifmanzoorali/verifex
```

*Use the GitHub repo URL in the location field, not a city. It signals open source credibility and drives repo visits.*

---

#### Website Field
```
verifex.dev
```

---

#### Pinned Tweet Strategy
Pin a Thread Cover Card post, not a single image post. A thread gives new visitors more to read and signals depth.

**What to pin:**
- The best-performing thread on a technical topic (architecture, MX validation, email deliverability)
- OR the most recent major launch announcement if no thread has been posted yet

**When to update:**
- When a new thread outperforms the pinned one in engagement
- When a major version ships and there is a launch thread to replace it with

**Never pin:** A stat drop, a quote card, or a standalone announcement without a thread attached. Those are not strong enough to represent the account to a first-time visitor.

---

#### Reply Name (Display Name)
```
verifex
```

All lowercase. Matches the wordmark. Never "Verifex" with a capital V in the display name — inconsistent with the brand.

---

### Instagram

#### Bio
*150 characters max. Line breaks are intentional — they display in the app.*

```
Open source email validation API.
Format + MX check in one call.
Free tier. MIT licensed.
↓ docs + repo
```
*(91 characters)*

**How to enter line breaks in Instagram:** Type the bio in Notes or a text editor first, then copy-paste into Instagram. The line breaks will carry over.

---

#### Link in Bio
**URL:** `verifex.dev`

Do not use Linktree or a link aggregator. A single direct link to the product site is cleaner and more credible for a developer audience. The product site has links to docs and GitHub from the landing page.

**When to update the link:**
- Point to `verifex.dev/docs` when shipping a new API feature
- Point to the GitHub repo during a launch week or milestone push
- Return to `verifex.dev` as the default between campaigns

**Every time the link changes:** Post a Link-in-Bio Story (Story 4 from `social-media-templates.html`) on the same day to tell followers where the link now points. Do not assume they will notice.

---

#### Highlight Strategy
Six Highlights are always live on the profile. They match the Highlight Cover icons built in Phase 4 of `social-media-templates.html`.

| Highlight | Cover icon | What goes in it | Update frequency |
|---|---|---|---|
| API / Docs | Code icon — Teal | Stories linking to the API docs, code snippets, integration examples | Every time docs update |
| Updates | Clock icon — Teal | Every Announcement story — feature launches, version releases | Every launch |
| About | Verifex logo — Cream | The brand story, what Verifex is, why it was built | Rarely — on repositioning only |
| FAQ | Question mark — Dark | Answers to real questions from comments and DMs | As questions come in |
| Tech Tips | Screen icon — Teal | Every Code/Dev Tip story | Weekly if active |
| Open Source | Star icon — Dark | GitHub milestone stories, contributor shoutouts, repo updates | On milestones |

**Rule:** Every Announcement and Code Tip story gets saved to the matching Highlight on the same day it is posted. Do not let stories expire without saving the relevant ones.

---

#### Pinned Posts (Profile Grid)
Instagram allows pinning up to 3 posts to the top of the profile grid. These are the first posts a new visitor sees.

| Pin slot | Post type | Content | When to update |
|---|---|---|---|
| 1 | Announcement — Cream | The most recent major feature launch | Every major release |
| 2 | Quote — Dark | The sharpest insight post on the account | When a better one is posted |
| 3 | Stat — Teal | The most impactful data point | When a more relevant stat is posted |

This combination (Announcement + Quote + Stat) shows a new visitor: what the product does, how it thinks, and why the problem matters — in 3 seconds.

---

### Cross-Platform Bio Rules

These rules apply to every platform's bio copy.

**Always include:**
- What Verifex is (one phrase: "open source email validation API")
- One differentiator (MX record check, or "format + MX in one call")
- A link or direction to the product

**Never include:**
- The word "excited" or any emotion about the product
- A list of technologies longer than 3 items
- A mission statement or vision statement
- The phrase "validate once, trust always" in the bio — that is the tagline for posts and images, not bios
- Hashtags in any bio field on any platform

**When bios get updated:**
- On a major version release (v1.0, v2.0)
- When a significant differentiator changes (new endpoint, new capability)
- Never for seasonal content, trending topics, or engagement tactics

**Consistency check:**
Every 3 months, verify that the bio copy on LinkedIn, X, and Instagram all describe the same product in compatible terms. They do not need to be identical — they need to be consistent. A visitor who follows Verifex on all three platforms should never feel confused about what the product is.

---

## Phase 4 — Posting Cadence & Engagement Rules

---

### Posting Cadence

These are minimums. The ideal column is what a consistent, active presence looks like.
Do not post below the minimum. Do not exceed the ideal without a clear reason.

| Platform | Minimum | Ideal | Notes |
|---|---|---|---|
| LinkedIn | 2× per week | 4× per week | Never more than 1 post per day |
| X | 3× per week | 5× per week | Replies to others count — solo posts are not the only activity |
| Instagram | 2× per week | 3× per week | Stories are separate from feed posts |
| Instagram Stories | 3× per week | Daily when active | Stories do not count toward the feed post cadence |

**Rule:** Consistency beats volume. Two posts per week every week is better than eight posts one week and silence for three weeks. An inconsistent account signals an unmaintained project.

---

### Content Mix Per Posting Week

Use this as a default weekly plan. Adjust based on what is happening — if a feature ships, add an Announcement post and drop one Education post that week.

**LinkedIn (4 posts per week):**

| Day | Content type | Pillar |
|---|---|---|
| Monday | Quote / Insight | Education |
| Wednesday | Stat Drop or Code Tip | Data or Education |
| Thursday | Announcement or Build in Public | Product or Build |
| Friday | Quote / Insight or Milestone | Education or Community |

**X (5 posts per week):**

| Day | Content type | Pillar |
|---|---|---|
| Monday | Quote — short take | Education |
| Tuesday | Code Tip or Stat | Education or Data |
| Wednesday | Announcement or Build in Public | Product or Build |
| Thursday | Quote — sharp opinion | Education |
| Friday | Milestone or Community | Community |

**Instagram (3 posts per week + daily Stories):**

| Day | Content type | Format |
|---|---|---|
| Monday | Quote | Square or Portrait feed |
| Wednesday | Stat or Announcement | Square feed |
| Friday | Milestone or Quote | Square feed |
| Daily | Link-in-bio, tip, or behind-the-scenes | Story |

---

### Best Posting Times

Based on developer audience behaviour on each platform. Times are UTC.

**LinkedIn:**
- Tuesday–Thursday, 08:00–09:00 UTC — professionals check LinkedIn before their workday
- Tuesday–Thursday, 12:00–13:00 UTC — lunch scroll
- Avoid: Friday after 14:00 UTC, Saturday, Sunday

**X:**
- Monday–Friday, 07:00–09:00 UTC — developers check X before standup
- Monday–Friday, 18:00–20:00 UTC — post-work scroll, highest developer engagement
- Avoid: Saturday and Sunday unless it is a launch day

**Instagram:**
- Tuesday and Thursday, 11:00–13:00 UTC — peak engagement window
- Avoid: Monday morning (lowest engagement across all content types)

**Stories (Instagram):**
- Post stories at 08:00 UTC to be at the top of the story bar during the morning scroll
- Post a second story at 17:00–18:00 UTC if the first one has content that warrants a follow-up

---

### Engagement Rules

#### Reply Policy

**Always reply to:**
- Technical questions about how Verifex works
- Bug reports or issues raised in comments (acknowledge, redirect to GitHub Issues)
- Genuine compliments from developers — one line, no gushing
- First comments on a post within the first 2 hours — this signals the algorithm to boost the post

**Reply within:**
- LinkedIn: within 4 hours during working hours (08:00–18:00 UTC, Mon–Fri)
- X: within 2 hours if the comment has traction (replies or likes)
- Instagram: within 6 hours on feed posts, within 1 hour on Stories with replies

**Never reply to:**
- Trolling or bad-faith comments — ignore, do not engage, do not delete unless it violates platform rules
- Competitor comparisons designed to start an argument — ignore
- "DM me for a collaboration" or spam comments — delete silently
- Comments asking for features that are already in the roadmap — redirect to GitHub Discussions, do not commit to timelines publicly

#### Reply Tone

Same as the post voice: direct, brief, no emojis, no excessive positivity.

**Do:**
```
Good catch — that's a known edge case with disposable email domains. It's tracked in GitHub Issues #47.
```

**Do not:**
```
Thanks so much for this amazing feedback! We really appreciate you taking the time!! 🙏🙏
```

One sentence is almost always enough. Two is the maximum. Never write a reply longer than the original comment.

#### What Never to Do in Replies

- Delete a critical comment unless it is abusive or spam
- Argue with a negative opinion about the product
- Promise a feature or timeline publicly
- Reply with a question to every comment ("Great point! What do you think about X?") — this is engagement bait and degrades the brand voice
- Use "we" when it is a solo project — use "I" or "Verifex" instead

#### DM Policy

**LinkedIn and X DMs:**
- Reply to genuine technical questions within 24 hours
- Do not move sales conversations into DMs — Verifex has no sales motion
- If someone asks for a custom integration or enterprise feature, point them to GitHub Discussions

**Instagram DMs:**
- Reply to questions about the product or API
- Do not reply to collaboration or sponsorship requests — ignore

---

### Thread Strategy (X-specific)

A thread is a sequence of connected tweets. Use threads for topics that cannot be said in one tweet and are worth saying in full.

**When to write a thread (not a single post):**
- A technical explanation that requires more than 3 steps
- A build-in-public story with a beginning, middle, and lesson
- A feature launch that deserves a full walkthrough
- An opinion that requires evidence and context to land

**When not to write a thread:**
- An announcement that fits in one tweet — do not stretch it
- A stat that speaks for itself
- A quote or insight — those must land in one tweet or they lose the impact

**Thread structure:**

```
Tweet 1 — Hook (the Thread Cover Card image goes here)
[The premise in one sentence. What will the reader learn?]
[One line on why it matters.]
[End with a colon or "Thread:" to signal there is more.]

Tweet 2–N — Content
[Number each tweet: 2/ 3/ 4/]
[One idea per tweet. No tweet longer than 240 characters.]
[Use line breaks between ideas — not walls of text.]

Final tweet — CTA
[Restate the core takeaway in one line.]
[One CTA: follow, link, or question.]
[Always the last tweet. Always.]
```

**Thread rules:**
- Maximum 10 tweets. If it needs more, publish a blog post instead and link to it.
- Reply to your own thread 2–3 hours after posting to boost algorithmic reach. The reply should add one new thought, not just say "what did you think?"
- Number every tweet from 2 onwards: "2/ 3/ 4/" — not "1/10 2/10" which feels mechanical
- The first tweet (hook) must stand alone. Someone who never swipes will see only that tweet. It must make sense and be worth reading on its own.

---

### Story Cadence (Instagram-specific)

Stories live for 24 hours. They are the highest-frequency format on Instagram and the only place where daily posting makes sense.

**What to post as a Story:**
- The same day a feed post goes up: a Story version of the post (drives people to the feed post)
- Link-in-bio update: every time the link changes, post Story 4 (Link-in-Bio template)
- Behind-the-scenes: quick text-on-background updates about what is being built — do not over-produce these
- Event reminders: one Story per day in the 3 days before an event

**What not to post as a Story:**
- Reposts of other accounts' content — Verifex Stories are original only
- A Story version of every single tweet — this creates noise
- Polls or question stickers without a genuine reason to ask — do not manufacture engagement

**Saving to Highlights:**
Every Story that fits one of the 6 Highlight categories (API/Docs, Updates, About, FAQ, Tech Tips, Open Source) gets saved to that Highlight before it expires.

Do not let a useful Story expire without saving it. Check at the end of each day and save anything worth keeping.

---

### Hashtag Policy

**Decision: No hashtags on any platform.**

This applies to all posts, all platforms, all content types. No exceptions.

**Reason for LinkedIn:** LinkedIn's algorithm deprioritised hashtag reach in 2024. Posts with hashtags now perform on average 15–20% worse than posts without. The Verifex brand relies on content quality for reach, not tagging.

**Reason for X:** Hashtags on X in 2025–2026 signal low-quality or automated content to both the algorithm and the developer audience Verifex targets. Senior engineers do not use hashtags and do not engage with accounts that do.

**Reason for Instagram:** Same as LinkedIn. Instagram's algorithm shifted away from hashtag-based discovery in 2023. Reach now comes from saves, shares, and profile visits — not tags.

**If a future platform update reverses this:** Update this document first. Do not start using hashtags based on general social media advice — update it here with a specific reason, then apply it.

---

### Launch Week Protocol

When a major feature ships (new endpoint, new SDK, version release), the posting cadence changes for that week only.

**Day 1 (Launch day):**
- LinkedIn: Announcement post (Cream variant)
- X: Announcement tweet + start of a launch thread if warranted
- Instagram: Announcement feed post + Link-in-Bio Story pointing to docs

**Day 2:**
- LinkedIn: Code Tip post showing how to use the new feature
- X: One tweet with a code snippet
- Instagram: Story with a simplified version of the tip

**Day 3:**
- LinkedIn: Stat or Quote post related to the problem the feature solves — not about the feature itself
- X: One follow-up take
- Instagram: Feed post (Quote variant)

**Day 4–5:**
- Return to normal cadence
- Do not repeat the launch announcement
- Do not keep posting "in case people missed it"

**Rule:** The launch gets 3 days of focused posting. After that, the content moves on. Repeating a launch announcement signals desperation, not confidence.

---

### When to Post Nothing

There are times when not posting is the right decision.

- **During an outage or known bug:** Do not post anything unrelated to the issue. Fix it first. Post about it (on the status page and via email) only if users are affected. Do not post social content while the product is broken.
- **When there is nothing genuine to say:** Silence is better than filler. A quote post written to fill a schedule slot is obvious and degrades trust.
- **During a platform controversy or outage:** If a platform (LinkedIn, X, Instagram) is experiencing a major public controversy, pause posting there for 24–48 hours. Do not wade into it.
- **During personal absence:** If Atif is unavailable for more than a week, the posting cadence drops to minimum (2× per week on LinkedIn, 3× per week on X). Do not schedule content that requires real-time engagement monitoring.
