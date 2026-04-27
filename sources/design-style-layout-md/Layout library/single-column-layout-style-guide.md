# Single-Column Layout Style Guide

## Overview
This guide defines a modern single-column layout system for AI vibe coding website design tools.  
The layout uses a clear top-to-bottom reading flow and minimizes distractions so users can focus on one narrative path.

---

## Core Characteristics

### Vertical Flow
- Content is arranged logically from top to bottom
- The user follows one natural reading path
- Section order should match narrative priority

### Minimalist Structure
- Standard structure:
  1. Header
  2. Main content area
  3. Footer
- Avoid unnecessary side modules that compete with core content

### Centered Alignment (Desktop)
- Keep the main content column centered
- Use generous left/right margins for readability and focus
- Maintain controlled line length for long text

### Visual Rhythm
- Distinguish sections with clear rhythm while scrolling
- Alternating section backgrounds (for example light/dark bands) are allowed
- Keep transitions clean and consistent
- Recommended pattern: alternating A/B section bands with consistent vertical padding

---

## When to Use Single-Column Layout

### Mobile-First Experiences
- Default pattern for smaller screens where sidebars are impractical
- Best for responsive-first projects

### Text-Heavy Pages
- Ideal for blogs, long-form articles, and documentation
- Removes side-content distractions and supports deep reading

### Landing Pages
- Effective for storytelling or single-product communication
- Helps guide users toward one primary call-to-action

### Portfolios and Galleries
- Useful for large image/video presentation
- Supports full-width visual moments with strong narrative pacing

---

## Design Advantages
- **Enhanced Focus**: Reduces competing UI elements and keeps attention on main message
- **Improved Readability**: Familiar document-like flow improves scanning and comprehension
- **Easier Development**: Faster to implement and maintain than complex multi-column systems
- **Accessibility**: Linear structure is easier for assistive technologies and keyboard navigation

---

## Layout Rules for AI Generation

### Content Hierarchy
- Use clear heading tiers and concise section intros
- Keep one key idea per section
- Avoid dense, unbroken text walls
- Keep section intros short before media or lists

### Spacing and Rhythm
- Use `rem`-based spacing tokens
- Keep consistent vertical spacing between sections and components
- Use rhythm changes intentionally, not randomly
- Use larger spacing between major sections than between inner elements

### CTA Strategy
- Prefer one primary CTA per key section
- Keep CTA labels direct and action-oriented
- Avoid multiple competing CTAs in the same viewport
- Recommended cadence: one CTA in hero, one CTA near close

### Media Usage
- Use large, relevant visuals to break reading monotony
- Keep media placement consistent with narrative pacing
- For galleries/portfolios, allow full-width media sections
- Use outlined media slots in wireframe/prototype mode for clear visual placeholders

### Responsive Behavior
- Maintain single-column logic across all breakpoints
- On desktop, center the readable content column
- On mobile, preserve hierarchy and spacing without collapsing clarity
- Keep navigation wrapping cleanly on narrow screens

---

## Reference Implementation (HTML/CSS-Aligned)
Use the following implementation baseline to match preview quality:

### Structure
- `header` with:
  - top row (`logo + nav`)
  - hero title
  - hero subtitle
  - compact CTA row
- alternating content `section` blocks
- closing `footer`

### Width and Alignment
- Content wrapper centered on desktop
- Recommended readable width: around `52rem` for body sections
- Full-width section backgrounds with centered inner content

### Suggested Spacing Tokens
- `0.5rem`, `1rem`, `1.5rem`, `2.5rem`, `4rem`
- Use larger token for section top/bottom spacing
- Use smaller tokens for internal text/component spacing

### Visual Rhythm System
- Alternate section backgrounds (A/B pattern)
- Keep headings, paragraph blocks, media blocks, and lists in predictable order
- Maintain consistent gap values between repeated section patterns

### Wireframe Media Pattern
- Media slot block:
  - outlined container
  - centered media label
  - large enough visual footprint to break text monotony

### CTA Distribution
- Hero section: one primary CTA
- Final content section: one final action CTA
- Avoid CTA repetition in every section

---

## AI Output Requirements
When generating this style with AI, enforce:
- True single-column reading flow
- Centered readable content on larger screens
- Clear section rhythm and clean transitions
- Text hierarchy optimized for scanning
- `rem`-based spacing and responsive behavior
- Minimal, focused structure (header/main/footer)
- Alternating section rhythm with centered readable inner width
- Large media placeholders integrated as narrative pauses

Reject outputs that:
- Introduce unnecessary multi-column side distractions
- Overcrowd sections with competing elements
- Break vertical flow with inconsistent structure
- Use inconsistent spacing that harms readability
- Over-repeat CTA buttons in every section
- Place text in full-width long lines that reduce readability

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for a modern single-column website.

Goal:
- Build a simple, clear, top-to-bottom reading experience with high focus and readability.

Constraints:
- Use a single-column layout with vertical narrative flow.
- Use minimalist structure: header, main content, footer.
- Center main content on desktop with generous side margins.
- Use rem-based spacing and consistent section rhythm.
- Allow alternating section backgrounds to create visual rhythm.
- Keep text concise and readable.
- Use large media blocks where helpful for storytelling.
- Keep CTA strategy simple and focused.
- Prefer one hero CTA and one closing CTA.
- Use outlined media placeholders in prototype mode.

Output in markdown:
- Structure map
- Typography and spacing rules
- Media rhythm rules
- CTA placement rules
- Responsive behavior rules
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create a single-column layout MD guide for AI vibe coding tools.

Rules:
- Vertical top-to-bottom flow
- Header + main + footer minimalist structure
- Centered readable column on desktop
- rem-based spacing and consistent rhythm
- Text-heavy and storytelling friendly
- Responsive and accessibility-friendly
```

---

## Conclusion
Single-column layout is a reliable pattern for focused reading, storytelling, and mobile-first delivery.  
It combines clarity, accessibility, and implementation simplicity while keeping attention on the core message.

