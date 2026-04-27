# Card Layout Style Guide (Material-Based)

## Overview
This guide defines a card-based website layout system for AI vibe coding tools.  
It is optimized for image/video-heavy creative presentation with concise content and clean interaction patterns.

The guidance follows Material card UI principles (M2 card component behavior and actions), adapted to your constraints:
- no icon dependency
- no fixed color/font directions
- large media blocks
- fluid responsive behavior

---

## General Layout Requirements
- **Color**: No fixed palette; keep monochrome/grayscale compatible direction
- **Fonts**: Do not prescribe font family; prioritize readability and modern hierarchy
- **Icons**: No icons in required UI flow
- **Images/Videos**: High-quality, relevant, visually strong
- **Text**: Proper, concise, impactful
- **Media Blocks**: Large media slots should be used in each section group
- **Responsiveness**: Fluent responsive behavior across breakpoints
- **Layering**: In-section layering allowed only when focus/readability remain clear
- **Outer Spacing**: Small left/right safe space allowed

---

## Card UI Principles (Material-Style)

### 1) Card as a Contained Surface
- Each card is a distinct content container
- Cards should separate content into scannable units
- Avoid merging unrelated content into one card

### 2) Card Anatomy
Recommended structure:
1. **Media area** (image/video slot, often top)
2. **Primary text** (title/headline)
3. **Supporting text** (short descriptor)
4. **Actions area** (buttons only)

Optional:
- Overline/category label
- Secondary metadata line

### 3) Actions (Material Behavior)
- Place actions in a dedicated card actions row
- Use text buttons / contained actions as needed
- Keep actions clear and limited (1 primary, optional 1 secondary)
- Action labels should be direct and outcome-oriented

### 4) Content Density
- Keep text compact and readable
- One key message per card
- Avoid long paragraphs inside cards

---

## Card Variants for Website Use

### Elevated Card
- Use when card needs stronger emphasis in a group

### Outlined Card
- Use when hierarchy is equal across many cards
- Good for dense collections and clean modular rhythm

### Media-First Card
- Dominant media zone with concise text/action below
- Use for creative portfolio/gallery storytelling

### Horizontal Card (Desktop Optional)
- Media and text/actions side-by-side inside card
- Reflow to vertical on smaller screens

---

## Layout System for Card Collections

### Card Grid Rules
- Use CSS Grid with responsive column count
- Keep consistent card rhythm (alignment, spacing, action placement)
- Maintain equal action-row alignment where possible
- Use wider section title measures for stronger visual headers

Example baseline:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
}
```

### Horizontal Card Rail Rules (Preview-Aligned)
Use horizontal scroll rails to display more cards and richer size variety:

```css
.rail {
  overflow-x: auto;
  overflow-y: hidden;
}

.rail-track {
  display: flex;
  gap: 1rem;
  min-width: max-content;
  align-items: stretch;
}

.rail-card {
  flex: 0 0 auto;
}
```

Benefits:
- Supports left/right browsing without overcrowding one viewport
- Enables mixed card sizes in one aligned section
- Improves discoverability for media-heavy collections

### Card Size Spectrum (Small to Large)
Use a controlled size system for variety:
- `xs` (micro utility card)
- `sm` (compact card)
- `md` (default content card)
- `lg` (narrative card)
- `xl` (hero rail card)

All sizes must keep the same anatomy (media, text, actions) and align on one rail track.

### Section Composition
Each section should include:
- Section heading + short intro
- Large featured media card(s)
- Supporting card set
- Clear section-level CTA path

---

## Media Handling Rules
- Media should fill card media slot cleanly
- Use `object-fit: cover` for consistency
- Keep media quality and ratio discipline across cards

```css
.card-media img,
.card-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Recommended ratios:
- Feature: `16:9` or `4:3`
- Gallery/portrait emphasis: `4:5`
- Utility/square: `1:1`

---

## Responsive / Fluent Behavior
- Desktop: multi-column card grid with clear hierarchy
- Tablet: reduce column count while preserving featured emphasis
- Mobile: single-column or two-column compact flow based on readability
- Keep action buttons easy to tap and consistently placed
- Preserve card hierarchy during reflow (featured cards remain prominent)
- Keep horizontal rails scrollable on all breakpoints when used
- On smaller screens, reduce very large rail card widths but preserve size hierarchy

---

## Accessibility and Usability Rules
- Keep text contrast and readability robust (implementation-level decision)
- Ensure card actions are keyboard and touch friendly
- Maintain logical reading order (media -> text -> actions)
- Avoid interaction overload in one card

---

## AI Output Requirements
When generating this style with AI, enforce:
- Material-style card anatomy with clear actions row
- Image/video-forward card sections with large media slots
- Concise text hierarchy in each card
- No icon dependency in required flows
- Fluid responsive card grid behavior
- Consistent action placement and clear CTA labeling
- Wider title treatment for section headers and featured cards
- Mixed small-to-large card size variety in at least one section
- Optional horizontal rail sections with aligned cards and clean scroll behavior

Reject outputs that:
- Mix unrelated content types in one card
- Overload cards with long text
- Scatter actions inconsistently
- Break hierarchy between featured and supporting cards
- Ignore responsive reflow quality
- Use only one card size throughout all sections
- Misalign cards within the same rail/section

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for a Material-style card UI website.

Goal:
- Build a clean, modern card system for image/video-heavy creative presentation.

Constraints:
- No fixed color palette instructions.
- No fixed font-family instructions.
- No icon requirements.
- Follow card anatomy: media, title, supporting text, actions row.
- Use large media slots in each major section.
- Keep text concise and impactful.
- Keep card actions clear and limited.
- Use fluid responsive grid behavior and rem-based spacing.
- Allow subtle in-section layering only if readability remains clear.
- Include at least one horizontal left/right scroll card rail.
- Include a small-to-large card size spectrum with aligned card anatomy.
- Use wider section title widths for better visual presence.

Output in markdown:
- Card anatomy and component rules
- Variant strategy (feature/support cards)
- Grid and responsive behavior rules
- Horizontal rail behavior and size-spectrum rules
- Media slot and ratio rules
- CTA/action rules
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create a card layout MD guide for AI vibe coding websites.

Rules:
- Material-style card structure (media + text + actions)
- Large image/video slots per section
- Concise readable card copy
- Minimal actions with clear CTA labels
- Fluid responsive card grid
- No fixed color/font/icon dependency
```

---

## Conclusion
Card layout is ideal for modular storytelling and scalable media-rich websites.  
This system ensures consistency, readability, and clear actions while staying flexible across devices.

