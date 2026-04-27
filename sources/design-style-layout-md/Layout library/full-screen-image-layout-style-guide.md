# Full-Screen Image Layout Style Guide

## Overview
This guide defines a full-screen image/video presentation system for AI vibe coding website design tools.  
Use this layout when users need image-heavy or video-heavy storytelling with immersive transitions and strong visual focus.

Core intent:
- Experience-first presentation
- Large visual storytelling
- Minimal but high-impact text
- Clear guided navigation between screens
- 1-2 buttons per section maximum

---

## When to Use This Layout
Use this system when a project requires:
- A lot of images and/or videos
- Creative agency or portfolio storytelling
- High-end campaign pages
- Editorial visual narratives
- Product storytelling through cinematic sections

This pattern is ideal for websites where visuals are the main content and text is supporting.

---

## Design Direction

### General Layout
- **Style**: Modern, minimal, sharp, clear
- **Visual Tone**: Upscale, bold, immersive, contemporary
- **Interaction Tone**: Experience-focused and guided

### Visual Constraints
- **Color**: No specific color instructions; keep direction monochrome/grayscale compatible
- **Fonts**: Do not prescribe font family or decorative typography
- **Icons**: No icon dependency

### Content Constraints
- **Images/Videos**:
  - Use high-quality, visually striking, relevant media
  - Prioritize full-viewport visual blocks
  - Preserve aspect quality and composition intent
- **Text**:
  - Keep copy minimal, concise, and impactful
  - Large titles + short subtitles + direct CTA buttons

---

## Core Layout Structure

### 1) Full-Viewport Hero Screen
- Media covers full viewport (`100vw` x `100vh/svh/dvh` behavior)
- Large title as primary textual anchor
- Short subtitle for context
- Primary CTA button(s) to guide flow (max 1-2)

### 2) Sequential Full-Screen Story Screens
- Users scroll to the next full-screen media section
- Each section has:
  - Main media (image or video)
  - Large title
  - Small subtitle
  - CTA(s): next, explore, open detail (max 1-2)

### 3) Optional Image-to-Image Slideshow Mode
- Allow click or tap progression between visual frames
- One visual focus per frame
- Keep controls minimal and obvious
- Preserve narrative continuity across slides
- Slideshow control set should stay minimal (1-2 primary controls)

### 4) Guided End Screen
- Closing statement or recap
- CTA options (restart or continue path; keep to 1-2 maximum)

---

## Interaction Model

### Scroll Narrative
- Vertical progression through full-screen sections
- Strong separation between screens (each screen is a complete stage)
- Smooth continuity without overcrowding text

### Click/Tap Slideshow Narrative
- Frame-by-frame visual progression
- Direct navigation actions:
  - Start / Continue
  - Optional direct slide jump only when necessary
- Keep interaction friction low

### Hybrid Mode (Recommended)
- Scroll for chapter transitions
- Click/tap inside a chapter for media sequence

---

## Typography and Content Hierarchy
- **Title**: Large and commanding, short line count
- **Subtitle**: Small, concise, support message only
- **Buttons**: Clear action language (example: `Next`, `View Series`, `Explore`)
- **Body text**: Minimal or omitted unless needed

Content should never compete with media dominance.

---

## Layout and Responsiveness Rules

### Fluid/Liquid Requirements
- Use fluid dimensions and responsive layout logic
- Sections adapt to viewport width/height cleanly
- Avoid fixed-width content wrappers that break immersion
- Use viewport-height fallback strategy:
  - base: `100vh`
  - modern mobile-safe: `100svh`
  - dynamic viewport: `100dvh`

### Spacing Rules
- Use `rem`-based spacing tokens
- Keep consistent spacing between title, subtitle, and CTA group
- Preserve breathing room around text overlays

### Alignment Rules
- Maintain consistent anchor positions for text and buttons across screens
- Align overlay blocks to a reliable grid or safe-area system
- Avoid random repositioning per section unless narratively intentional
- Keep overlay width fluid and constrained to readable copy measure
- Keep media layer full-screen, with overlay anchored consistently (e.g. bottom-left safe area)

---

## Reference Implementation Tokens (HTML/CSS)
Use these concrete implementation standards to reproduce consistent quality:

- `--space-1: 0.5rem`
- `--space-2: 1rem`
- `--space-3: 1.5rem`
- `--space-4: 2.5rem`
- `--space-5: 4rem`
- `--space-6: 6rem`
- `--max-copy: 52ch`
- `--viewport-h: 100vh` with `@supports` overrides for `100svh` and `100dvh`

Structural pattern:
- `.chapter` uses `min-height: var(--viewport-h)`
- `.media` uses `min-height: var(--viewport-h)` and occupies full stage
- `.overlay` is anchored and fluid:
  - absolute positioned
  - bottom + left safe inset
  - bounded width with clamp/calc logic
- `.title` uses large clamp scale and short line-height
- `.actions` is minimal and should contain only 1-2 buttons

Button constraints:
- Per full-screen section: 1-2 buttons maximum
- Slideshow controls: 1-2 primary controls maximum
- Avoid persistent global button clusters that distract from media

---

## Media Guidelines
- Prefer one dominant visual per screen
- Avoid collage-style clutter on immersive screens
- Maintain consistent media quality level across all sections
- For video:
  - Ensure autoplay behavior is respectful and stable where applicable
  - Keep controls minimal if exposed

---

## AI Output Requirements
When generating this layout with AI, enforce:
- Full-screen media-first section system
- Large title + short subtitle + button group on each key screen
- Scroll-down storytelling continuity
- Optional click/tap slideshow behavior
- Minimal text and high visual clarity
- No icon dependency
- No decorative overload
- `rem`-based spacing rhythm
- Responsive and fluid viewport adaptation
- 1-2 buttons per section maximum
- Full-viewport media sizing using `vh/svh/dvh` fallback logic

Reject outputs that:
- Treat sections as small cards instead of full-screen stages
- Overload screens with long text
- Use weak visual hierarchy between title/subtitle/CTA
- Break immersion with inconsistent alignment
- Depend on icons or heavy decorative UI for navigation
- Add dense button groups that compete with media
- Use fixed-height media that does not fill viewport stages

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for a full-screen image/video storytelling website.

Goal:
- Build an immersive, upscale, bold, modern, minimal, experience-focused layout system.
- Support image-heavy and video-heavy creative storytelling.

Constraints:
- No color-specific instructions.
- No font-specific instructions.
- No icon requirements.
- Use full-screen media sections as the primary structure.
- Include large titles, short subtitles, and clear CTA buttons.
- Limit CTA count to 1-2 buttons per section.
- Support scroll-down narrative through multiple full-screen sections.
- Support optional click/tap image-to-image slideshow mode.
- Keep text minimal and impactful.
- Use fluid responsive behavior and rem-based spacing.
- Ensure media fills full viewport using vh/svh/dvh fallback logic.

Output in the markdown:
- Layout zones and section flow
- Scroll narrative behavior
- Slideshow interaction behavior
- Title/subtitle/button hierarchy rules
- Responsiveness and alignment rules
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create an AI design markdown guide for a full-screen image/video storytelling website.

Rules:
- Immersive full-viewport media sections
- Large title + short subtitle + CTA buttons
- 1-2 CTA buttons max per section
- Scroll storytelling and optional click slideshow
- Minimal text, high visual impact
- No color/font/icon specs
- Fluid responsive layout with rem-based spacing
```

---

## Conclusion
This Full-Screen Image Layout system helps AI vibe coding tools generate high-quality visual storytelling websites where media leads, text supports, and interaction guides the user through an intentional narrative journey.

