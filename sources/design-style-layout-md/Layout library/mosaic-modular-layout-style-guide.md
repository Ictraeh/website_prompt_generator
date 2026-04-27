# Mosaic Modular Layout Style Guide

## Overview
This guide defines a Mosaic Modular layout system for AI vibe coding website design tools.  
It is intended for image/video-heavy creative websites that need bold visual variety, tight modular structure, and clean modern organization.

Core concept:
- Fill the canvas with diverse module sizes
- Keep modules tightly packed like a mosaic
- Preserve readability and focus while maximizing visual impact

---

## General Layout Direction
- **Style**: Modern, bold, organized, clean, diverse-sized modular mosaic
- **Mosaic Density**: Full-filled composition with no unnecessary empty gaps
- **Packing Rule**: Dense auto-placement is recommended to reduce leftover cells
- **Color**: No fixed palette required; monochrome/grayscale compatible direction
- **Fonts**: Do not prescribe font family; prioritize readability and modern hierarchy
- **Icons**: No icon dependency
- **Images/Videos**: High-quality, relevant, visually striking
- **Text**: Proper, concise, impactful messaging
- **Responsiveness**: Fluid responsive behavior
- **Spacing Units**: Use `rem`-based spacing
- **Layering**: In-section overlap is allowed only when focus and experience remain clear
- **Margins**: Small left/right page spacing is allowed

---

## Mosaic System Principles

### 1) Modular Diversity
- Use mixed module sizes (large, medium, small)
- Combine different column and row spans intentionally
- Avoid repetitive equal-card grids

### 2) Full-Filled Composition
- Mosaic should feel packed and complete
- Avoid accidental dead space
- Every module should contribute to narrative or navigation value
- If gaps appear, break large modules into smaller sub-mosaics to complete the row/area

### 3) Strong Visual Proportion
- Large media blocks anchor each mosaic region
- Smaller modules support rhythm and detail
- Keep text concise in smaller modules

### 4) Organized Complexity
- Even with diverse sizes, maintain clear alignment logic
- Keep a consistent baseline spacing rhythm
- Ensure hierarchy is obvious at a glance
- All section modules must align to the same parent grid tracks

---

## Recommended CSS Grid Foundation
Use CSS Grid as the primary engine for mosaic composition.

Baseline pattern (aligned with preview implementation):

```css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0;
  grid-auto-flow: dense;
}
```

Key notes:
- Use repeat/fr units for fluid width behavior
- Rows can be auto-calculated by browser when useful
- Set module spans with `grid-column` and `grid-row`
- Use `grid-auto-flow: dense` to backfill open cells where appropriate
- On small screens, simplify into fewer columns or a single-column stack
- Keep all sections on the same grid logic; do not shift to unrelated alignment systems

---

## Media Handling Rules
For image/video modules:

```css
.tile img,
.tile video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Guidelines:
- Use `object-fit: cover` to preserve visual quality across varied module sizes
- Keep media as primary visual content in most modules
- Maintain consistent quality across all tiles

---

## Span Strategy (Example Pattern)
Use predictable span groups to build a balanced mosaic:
- Hero tile: `span 4 columns / span 2 rows`
- Secondary tiles: `span 2 columns`
- Mid tiles: `span 3 columns`

Example:

```css
.tile:nth-child(1) { grid-column: span 4; grid-row: span 2; }
.tile:nth-child(2),
.tile:nth-child(3) { grid-column: span 2; }
.tile:nth-child(4),
.tile:nth-child(5) { grid-column: span 3; }
```

Use this as a template, then vary patterns by section.

Preview-aligned span token set:
- Columns: `c1`, `c2`, `c3`, `c4`, `c5`, `c6`, `c7`, `c8`
- Rows: `r1`, `r2`, `r3`
- Use mixed large + micro tiles in each section for density balance

---

## Content Strategy for Mosaic Modules
- Keep text minimal inside image-heavy tiles
- Use short headline + compact support line
- Reserve longer copy for larger modules only
- Keep CTA language short and direct
- Use wider title measures in larger modules to improve headline presence

Recommended module roles:
- **Anchor Tile**: dominant media + key message
- **Feature Tile**: media + short descriptor
- **Context Tile**: concise text support
- **Action Tile**: focused CTA
- **Micro Tile**: small filler tile for dense completion
- **Mini-Mosaic Tile**: nested 2x2 or similar micro-cluster inside a parent tile

---

## Responsive / Fluid Behavior
- Desktop: full mosaic diversity with mixed spans
- Tablet: reduce span complexity while preserving hierarchy
- Mobile: simplify to 1-2 column flow with preserved content priority

Implementation guidance:
- Keep layout fluid with `fr` columns
- Keep spacing in `rem`
- Use breakpoints to avoid cramped small-screen mosaics
- Maintain scan clarity after reflow
- If row spans become visually broken on small screens, reduce row span complexity

---

## Creative Storytelling Use Cases
Use this layout when users request:
- many images/videos in one experience
- creative and fun website presentation
- campaign storytelling with strong visual variety
- portfolio/gallery pages requiring high visual impact

---

## AI Output Requirements
When generating this style with AI, enforce:
- True mosaic modular structure with varied tile sizes
- Full-filled visual composition (no accidental empty areas)
- Large media blocks in each major section
- Concise and readable text hierarchy
- Fluid responsive behavior with rem-based spacing
- Alignment consistency despite varied module dimensions
- Optional in-section layering only when clarity remains strong
- Dense-packing behavior and/or micro-tile fallback for gap resolution
- Wider title treatment for major section headers and anchor modules

Reject outputs that:
- Look like uniform card grids
- Leave unresolved gaps in mosaic areas
- Overload small tiles with too much text
- Break hierarchy on mobile
- Depend on complex visual decoration over structure
- Misalign modules across different sections
- Use only large modules without micro-balance tiles where needed

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for a Mosaic Modular website layout.

Goal:
- Build a modern, bold, clean mosaic system with diverse module sizes and strong visual storytelling.

Constraints:
- No fixed color palette instructions.
- No fixed font-family instructions.
- No icon requirements.
- Use a full-filled mosaic look with minimal dead space.
- Use dense packing and micro-tile fallback to remove empty areas.
- Use large media blocks and concise text.
- Use fluid responsive CSS Grid behavior.
- Use rem-based spacing.
- Allow in-section overlap only if readability and focus remain clear.
- Keep section titles and major module titles visually wider.

Output in markdown:
- Mosaic structure and module roles
- CSS grid foundation and span strategy
- Dense-packing + micro-mosaic fallback strategy
- Media sizing rules (object-fit behavior)
- Responsive behavior rules
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create a Mosaic Modular layout MD guide for AI vibe coding tools.

Rules:
- Modern bold clean mosaic style
- Diverse module sizes, tightly filled composition
- Large media slots + concise text
- Fluid responsive CSS Grid + rem spacing
- No fixed color/font/icon dependency
- Optional in-section layering with clear focus
```

---

## Conclusion
Mosaic Modular layout is ideal for high-impact creative websites where media leads the experience.  
It combines visual diversity with structural discipline, giving AI tools a reliable system for dynamic yet readable storytelling pages.

