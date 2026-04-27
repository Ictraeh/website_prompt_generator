# Font Size Proportion Guideline (Website UI + Marketing Headers)

## Overview
This guideline defines a practical typography proportion system for website UI and marketing pages.  
It is optimized for AI vibe coding prompts and implementation handoff.

Core goals:
- Keep hierarchy consistent across layouts.
- Maintain readability and rhythm across breakpoints.
- Prevent oversized, noisy hero headers that break balance.
- Apply stricter rules for marketing/branding headers.

---

## 1) System Foundation (M3-Aligned + Web Practical)

Use a role-based hierarchy instead of ad-hoc font sizes:
- `Display` (hero-level marketing headline)
- `Headline` (section headlines)
- `Title` (component titles)
- `Body` (paragraphs)
- `Label` (buttons, chips, metadata, form labels)

Recommended base and scale:
- Base body size: `1rem` (16px reference)
- Preferred ratio: `1.2` to `1.25` for web readability
- Keep the number of active sizes small (usually 6-8 total styles)

Suggested desktop token set:
- `display-lg`: `3.5rem` / line-height `1.1`
- `display-md`: `2.875rem` / line-height `1.15`
- `headline-lg`: `2.25rem` / line-height `1.2`
- `headline-md`: `1.75rem` / line-height `1.25`
- `title-lg`: `1.375rem` / line-height `1.3`
- `title-md`: `1.125rem` / line-height `1.35`
- `body-lg`: `1.0625rem` / line-height `1.6`
- `body-md`: `1rem` / line-height `1.6`
- `label-lg`: `0.9375rem` / line-height `1.4`
- `label-md`: `0.875rem` / line-height `1.4`

Suggested mobile adjustment:
- Reduce only the top of the scale (`display`, `headline`) by 1 step.
- Keep body and label sizes mostly stable.
- Preserve line-height behavior (do not over-tighten body text).

---

## 2) Universal Typography Token System (Product + Design + Marketing + AI)

Inspired by token architecture patterns used in modern design systems, use a layered model:

### A) Primitive tokens (raw scales)
- `font-family`
- `font-weight`
- `letter-spacing`
- `font-size`
- `line-height`

These are neutral values and do not encode use case.

### B) Semantic tokens (role-based)
- `text-display-*`
- `text-headline-*`
- `text-title-*`
- `text-body-*`
- `text-label-*`
- `text-caption-*`

These map primitive tokens into UI intent and make tokens reusable across:
- product UI
- design systems
- marketing pages
- AI vibe coding toolchains

### C) Locale/language modifiers (multi-language)
- Keep semantic token names universal and language-agnostic.
- Add locale-specific overrides only where needed:
  - `--line-height-*-latin`
  - `--line-height-*-cjk`
  - `--line-height-*-thai`
  - `--line-height-*-arabic`
- Increase line-height slightly for dense glyph systems (CJK/Thai) and scripts with taller joining behavior (Arabic).
- Avoid all-caps assumptions outside Latin scripts.

### D) Universal naming convention

Use a clear 4-part pattern:
- `--{system}-{category}-{scale}-{property}`

Examples:
- `--type-size-250`
- `--type-line-250`
- `--type-weight-strong`
- `--text-headline-lg-size`
- `--text-headline-lg-line`
- `--text-body-md-size`

This keeps tokens portable across Figma, CSS, JSON tokens, and AI prompt generation.

---

## 3) Full Font Size Scale (0.75rem to 6rem)

This is the universal recommended size ramp:

| Token | Rem | Typical use |
|---|---:|---|
| `size-075` | `0.75rem` | tiny legal, tooltip, micro meta |
| `size-081` | `0.8125rem` | helper text, dense metadata |
| `size-087` | `0.875rem` | label-sm, compact UI |
| `size-093` | `0.9375rem` | label-md, nav utility |
| `size-100` | `1rem` | body default |
| `size-112` | `1.125rem` | body-large, title-sm |
| `size-125` | `1.25rem` | title-md |
| `size-137` | `1.375rem` | title-lg |
| `size-150` | `1.5rem` | headline-xs |
| `size-175` | `1.75rem` | headline-sm |
| `size-200` | `2rem` | headline-md |
| `size-225` | `2.25rem` | headline-lg |
| `size-250` | `2.5rem` | display-xs |
| `size-275` | `2.75rem` | display-sm |
| `size-300` | `3rem` | display-md |
| `size-350` | `3.5rem` | display-lg |
| `size-400` | `4rem` | display-xl |
| `size-450` | `4.5rem` | display-2xl |
| `size-500` | `5rem` | campaign hero strong |
| `size-600` | `6rem` | campaign hero extreme (controlled) |

Use semantic aliases on top of this ramp; do not use raw size tokens directly everywhere.

---

## 4) Marketing Header + Branding Use Case Rules

For website hero/branding headers:
- Header headline must be limited to **2 lines maximum**.
- Supporting content below headline must be **fewer than 3 lines**.
- Prefer one strong headline and one short supporting sentence.
- Do not stack multiple competing heavy headlines in a single viewport.

Recommended marketing hero proportions:
- Headline size to body size ratio: roughly `2.5:1` to `3:1` max.
- Avoid ratios greater than `3:1` in normal website use.
- If headline is visually very large, reduce weight (e.g., use semibold instead of extra bold).

Marketing hero spacing:
- Space above headline: `1.25` to `2` times body line-height.
- Space below headline: `0.375` to `0.75` times body line-height.
- Keep CTA group close to supporting copy, not floating far from content context.

---

## 5) Heading Hierarchy Rules (Imperavi-Focused)

### Balance first
- A heading should guide attention, not dominate all UI.
- Large headings in data-dense views (dashboards, control panels) should be quieter.
- Landing pages can use stronger heading contrast than productivity screens.

### Weight vs size tradeoff
- Do not increase both size and weight aggressively at the same time.
- Often weight alone creates enough contrast without oversized text.
- Use ultra-heavy weights sparingly; usually only one dominant heading per view.

### Ratio discipline
- Heading-to-body proportion should generally stay within `1:3` or less.
- If heading contrast feels too extreme, either:
  - reduce heading size, or
  - increase lead paragraph size slightly.

### Line-height by heading size
- Heading line-height usually works between `1.1` and `1.4`.
- Larger headings should have tighter line-height than smaller headings.
- Always test headings in two-line state to prevent break issues on responsive widths.

### All caps and letter spacing
- Large all-caps headings are hard to read and should be avoided.
- If all-caps is used, keep it short and increase letter spacing slightly.
- For large mixed-case headings, small negative tracking can improve visual cohesion.

### Rhythm and divider placement
- Before-heading spacing should be larger than after-heading spacing.
- Keep heading + paragraph as one semantic block.
- If using dividers, place dividers above the heading unless intentional separation is required.

---

## 6) NICE-Style Structural Guidance for Reliable UI

- Use semantic heading tags (`h1` -> `h2` -> `h3`) without skipping levels.
- Keep visual style and semantic structure aligned whenever possible.
- Use sentence case for headings in most product interfaces.
- Maintain readable measure for long text blocks (roughly 60-70 characters per line target).

Accessibility and consistency guardrails:
- Keep contrast and readability high for body text.
- Avoid tiny body text in content-heavy products.
- Limit one-off exceptions; scale systems should be reusable and predictable.

---

## 7) Proportion Presets by Website Type

### A) Marketing / Brand Landing
- `display-md` for hero title (2 lines max)
- `body-lg` for supporting line (under 3 lines)
- `headline-md` for major sections
- `title-md` for cards/modules

### B) SaaS / Product / Dashboard
- Start with `headline-md` instead of display
- Keep heading contrast moderate
- Use `body-md` + `label-md` for dense UI
- Reserve display size for rare launch banners only

### C) Editorial / Content-heavy
- Prefer stronger body readability first
- Use `headline-lg` for article headers
- Keep paragraph line-height around `1.6`
- Maintain strict vertical rhythm between heading and paragraphs

---

## 8) Extreme Cases (Use Carefully, Still Readable)

These are valid creative edge cases. They are allowed, but should be used with control.

### A) XXL bold modern header text
- Use for campaign hero, launch statement, fashion/editorial opening, or immersive brand moments.
- Suggested token: `display-xxl` around `4.5rem` to `6rem` (desktop), line-height `1.0` to `1.1`.
- Keep headline to **1-2 lines only**.
- Keep supporting copy short (1-2 lines preferred, max 3 lines).
- Prefer fewer words with stronger semantic impact.
- If size increases, reduce either weight or tracking intensity to preserve shape clarity.

### B) Tiny small text (footer/disclaimer/tooltips/metadata)
- Use only for non-primary information: legal text, timestamps, helper hints, minor metadata.
- Suggested range: `0.6875rem` to `0.8125rem` (about 11px-13px).
- Increase line-height to `1.35` to `1.55` for tiny text blocks.
- Never use tiny sizes for key actions, core instructions, or high-frequency reading.
- On mobile, avoid going below `0.75rem` where possible.

### C) Flexibility rules (not overly strict)
- Treat this guideline as a system, not a rigid template.
- Small controlled deviations are allowed when layout context requires it.
- Keep hierarchy relationships intact even when exact values change.
- Prioritize visual harmony, readability, and content intent over perfect numeric purity.

---

## 9) Comprehensive CSS Typographic Scale System

This section provides an AI-ready CSS system inspired by modern scale approaches using `pow()` and `:heading()`, with practical fallback for real production use.

### A) Token setup (universal + multilingual + responsive)

```css
:root {
  /* Core base */
  --type-base: 1rem; /* 16px */

  /* Scale options */
  --scale-minor-third: 1.2;
  --scale-major-third: 1.25;
  --scale-perfect-fourth: 1.333;

  /* Active scale (default) */
  --type-scale: var(--scale-major-third);

  /* Heading behavior */
  --heading-max-level: 6;
  --heading-line-height: 1.2;
  --heading-letter-spacing: -0.015em;

  /* Primitive size scale (0.75rem -> 6rem) */
  --type-size-075: 0.75rem;
  --type-size-081: 0.8125rem;
  --type-size-087: 0.875rem;
  --type-size-093: 0.9375rem;
  --type-size-100: 1rem;
  --type-size-112: 1.125rem;
  --type-size-125: 1.25rem;
  --type-size-137: 1.375rem;
  --type-size-150: 1.5rem;
  --type-size-175: 1.75rem;
  --type-size-200: 2rem;
  --type-size-225: 2.25rem;
  --type-size-250: 2.5rem;
  --type-size-275: 2.75rem;
  --type-size-300: 3rem;
  --type-size-350: 3.5rem;
  --type-size-400: 4rem;
  --type-size-450: 4.5rem;
  --type-size-500: 5rem;
  --type-size-600: 6rem;

  /* Semantic aliases */
  --text-label-sm-size: var(--type-size-087);
  --text-label-md-size: var(--type-size-093);
  --text-body-sm-size: var(--type-size-093);
  --text-body-md-size: var(--type-size-100);
  --text-body-lg-size: var(--type-size-112);
  --text-title-md-size: var(--type-size-125);
  --text-title-lg-size: var(--type-size-137);
  --text-headline-sm-size: var(--type-size-175);
  --text-headline-md-size: var(--type-size-200);
  --text-headline-lg-size: var(--type-size-225);
  --text-display-md-size: var(--type-size-300);
  --text-display-lg-size: var(--type-size-350);
  --text-display-xl-size: var(--type-size-450);

  /* Line-height primitives */
  --type-line-tight: 1.1;
  --type-line-heading: 1.2;
  --type-line-title: 1.3;
  --type-line-body: 1.6;
  --type-line-small: 1.45;

  /* Locale-specific line-height tuning */
  --type-line-body-latin: 1.6;
  --type-line-body-cjk: 1.72;
  --type-line-body-thai: 1.75;
  --type-line-body-arabic: 1.7;

  /* Creative extreme */
  --type-display-xxl: clamp(4.5rem, 8vw, 6rem); /* size-450 -> size-600 */
}
```

### B) Progressive-enhancement heading scale (`pow()` + `:heading()`)

```css
/* Experimental pattern: elegant but currently limited support */
:heading {
  font-size: calc(
    var(--type-base) *
      pow(var(--type-scale), var(--heading-max-level) - sibling-index())
  );
  line-height: var(--heading-line-height);
  letter-spacing: var(--heading-letter-spacing);
}
```

### C) Stable fallback for production (recommended default)

```css
h1 { font-size: calc(var(--type-base) * pow(var(--type-scale), 5)); line-height: 1.1; }
h2 { font-size: calc(var(--type-base) * pow(var(--type-scale), 4)); line-height: 1.15; }
h3 { font-size: calc(var(--type-base) * pow(var(--type-scale), 3)); line-height: 1.2; }
h4 { font-size: calc(var(--type-base) * pow(var(--type-scale), 2)); line-height: 1.25; }
h5 { font-size: calc(var(--type-base) * pow(var(--type-scale), 1)); line-height: 1.3; }
h6 { font-size: calc(var(--type-base) * pow(var(--type-scale), 0)); line-height: 1.35; }

p, li { font-size: var(--text-body-md-size); line-height: var(--type-line-body-latin); }
small, .meta, .tooltip { font-size: var(--text-label-sm-size); line-height: var(--type-line-small); }
.tiny, .legal, .disclaimer { font-size: var(--type-size-075); line-height: 1.5; }

.hero-xxl {
  font-size: var(--type-display-xxl);
  line-height: 1.02;
  letter-spacing: -0.02em;
  max-width: 18ch; /* keeps large headlines readable */
}
```

```css
/* Semantic usage */
body { font-size: var(--text-body-md-size); line-height: var(--type-line-body-latin); }
.label { font-size: var(--text-label-md-size); line-height: var(--type-line-small); }
.title { font-size: var(--text-title-lg-size); line-height: var(--type-line-title); }
.headline { font-size: var(--text-headline-md-size); line-height: var(--type-line-heading); }
.display { font-size: var(--text-display-lg-size); line-height: var(--type-line-tight); }
```

```css
/* Locale-aware overrides */
[lang="ja"], [lang="zh"], [lang="ko"] {
  --type-line-body-latin: var(--type-line-body-cjk);
}

[lang="th"] {
  --type-line-body-latin: var(--type-line-body-thai);
}

[lang="ar"] {
  --type-line-body-latin: var(--type-line-body-arabic);
}
```

### D) Responsive scale shifts

```css
/* More compact on narrow screens */
:root { --type-scale: var(--scale-minor-third); }

@media (min-width: 48rem) {
  :root { --type-scale: var(--scale-major-third); }
}

@media (min-width: 87.5rem) {
  :root { --type-scale: var(--scale-perfect-fourth); }
}
```

### E) AI usage note
- Use the fallback block as the default implementation.
- Use the experimental `:heading()` block only when toolchain/browser support is confirmed.
- Always validate line wrapping in real content, especially hero and tiny text states.
- Keep primitive tokens stable; tune semantic aliases per product/marketing context.

---

## 10) AI Prompt Rules (Drop-in)

Use these instructions directly in prompts:
- "Create a typography hierarchy using role tokens (display, headline, title, body, label)."
- "For hero marketing header: max 2 lines headline, and supporting copy under 3 lines."
- "Keep heading-to-body ratio under 3:1, with balanced line-height and rhythm."
- "Prioritize balance over dramatic contrast; avoid oversized all-caps hero text."
- "Use semantic heading order and consistent spacing before/after headings."
- "Allow controlled creative extremes: XXL hero display and tiny utility text, while preserving readability."
- "Implement typographic scale tokens with CSS custom properties and responsive ratio shifts."
- "Use universal semantic token names so the same typography system works for product UI, design systems, and marketing pages."
- "Include language-aware line-height overrides for multilingual rendering."

---

## 11) Command Presets (Strict / Balanced / Creative)

Use one of these command presets directly with this guideline:

- **Strict**
  - `@font-size-proportion-guideline.md (102-103) Use the 0.75rem to 6rem scale as the source of truth; preserve semantic hierarchy and ratio consistency across breakpoints, and allow only minimal deviation for accessibility and multilingual readability.`

- **Balanced (recommended)**
  - `@font-size-proportion-guideline.md (102-103) Apply the 0.75rem to 6rem scale as the primary system, keep hierarchy and readability clear, and allow moderate contextual adjustments for product UI, marketing headers, and multilingual content while maintaining aesthetic proportion.`

- **Creative / Relaxed**
  - `@font-size-proportion-guideline.md (102-103) Treat the 0.75rem to 6rem scale as a creative range, prioritize visual rhythm and expressive hierarchy, and adapt sizes fluidly by layout intent (campaign, editorial, product, multilingual) without breaking readability.`

---

## 12) Quick Checklist

- Is there only one dominant heading in the viewport?
- Is hero headline <= 2 lines?
- Is supporting hero copy < 3 lines?
- Is heading/body proportion <= 3:1?
- Do heading line-heights look stable in two-line scenarios?
- Is spacing rhythm consistent before and after headings?
- Are XXL and tiny text used only in appropriate contexts?
- Are semantic tokens mapped from a single primitive size scale (0.75rem -> 6rem)?
- Are multilingual line-height overrides in place where needed?

---

## Sources
- [Material Design 3 - Applying Type](https://m3.material.io/styles/typography/applying-type)
- [NICE Design System - Typography](https://design-system.nice.org.uk/foundations/typography/)
- [Imperavi UI Typography - Headings](https://imperavi.com/books/ui-typography/elements/headings/)
- [Design Systems Collective - Typography Systems](https://www.designsystemscollective.com/typography-systems-the-hierarchy-rules-most-designers-break-7187fdc4adb2)
- [Firefly Design (Medium) - Typographic System for Web](https://medium.com/firefly-design/https-medium-com-rachel-and-a-typographic-system-for-web-433c60a17ac)
- [Always Twisted - Typographic Scales in CSS with :heading(), sibling-index(), and pow()](https://www.alwaystwisted.com/articles/building-typographic-scales-with-headings-sibling-index-and-pow)
- [Shopify Polaris Typography Tokens](https://polaris-react.shopify.com/design/typography/typography-tokens)
- [LINE Design System - Typography Foundation](https://designsystem.line.me/LDSG/foundation/typography-en)
