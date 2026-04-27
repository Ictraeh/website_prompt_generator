# Magazine Layout Style Guide for Website and Mobile UI

## Purpose
This document defines a magazine-inspired layout system for digital interfaces.  
It is intended for future AI-assisted coding and design generation, so outputs stay consistent while still feeling creative and editorial.

Focus:
- Layout structure only
- Spatial rhythm and hierarchy
- Reusable patterns for web and mobile UI

Out of scope:
- Color direction
- Specific graphic style
- Brand visuals

---

## Core Layout Philosophy

### 1) Invisible Structure
Use layout as a hidden system that organizes content clearly.  
The structure should be felt through rhythm, grouping, and reading flow, not shown as decoration.

### 2) Editorial Hierarchy
Build strong content hierarchy using:
- Feature zones
- Supporting story zones
- Utility zones (navigation, metadata, links)

The user should immediately understand:
- What is most important now
- What to read next
- What can be explored later

### 3) Rhythmic Composition
Treat layout as a rhythm system:
- Vertical rhythm controls scan comfort
- Horizontal rhythm controls alignment and grouping
- Repeated intervals create consistency across pages

### 4) Proportion-Led Blocks
Compose content in proportion-aware blocks (for text and media containers) instead of random box sizes.  
Block sizes should scale in a related family (small, medium, large, hero) to maintain order.

### 5) Flexible Precision
Use strict underlying rules with flexible presentation.  
The layout should feel intentional, not rigid.

---

## Foundation System

### Grid Base
Use a column grid for page-level composition:
- Desktop web: 12 columns as default
- Tablet: 8 columns as default
- Mobile: 4 columns as default

Allow occasional asymmetric placements when hierarchy benefits from it.

### Baseline Rhythm
Use a vertical spacing unit tied to body text rhythm:
- Define a base unit
- Keep spacing, block heights, and key alignments on unit multiples when practical

This supports visual calm and editorial continuity.

### Gutter Logic
Keep gutters consistent within a section.  
Gutter width may change between breakpoints, but should remain proportional to the base unit.

### Margin Strategy
Use outer margins as framing space.  
Margins can be slightly generous for long-form reading pages to improve focus.

### Layout Technical Approach (Required)
Use a **Fluid/Liquid Layout** as the default implementation model:
- Canvas width: fluid (`100%`), not fixed-width artboard
- Page framing: fluid horizontal padding with clamp logic
- Grid math: `fr`-based responsive columns
- Breakpoints:
  - Desktop: 12 columns
  - Tablet: 8 columns
  - Mobile: 4 columns
- Module spans reflow by breakpoint; avoid absolute pixel locking

---

## Production Layout Tokens (Reference Quality)
Use these as baseline tokens when generating HTML/CSS layouts:

- Vertical spacing scale: `0.5rem`, `1rem`, `1.75rem`, `3rem`, `5rem`, `7rem`
- Grid gutter: `clamp(1rem, 2vw, 2.25rem)`
- Readability measure: around `72ch`
- Module internal rhythm:
  - top separator line
  - top padding
  - heading block
  - image slot
  - paragraph
  - link row
- Shared module cadence must be consistent across all sections

### Typography Proportion (Fashion Editorial Direction)
- Prefer bold scale contrast:
  - Page hero title: very large, compact line-height
  - Section title: strong but smaller than hero
  - Module headline: prominent and tight
  - Paragraph: calm, readable measure
- Keep line-heights tight for headlines, relaxed for body copy
- Keep heading width constrained (short measure) to preserve editorial tension

### Image Slot System (No Real Images in Guideline Files)
- Use placeholder slots only (for structure testing)
- Include many slots to stress-test rhythm and hierarchy
- Use contemporary editorial ratios:
  - Primary: `4:5`
  - Secondary: `4:3`
  - Optional utility: `3:2`
- Slots should align with text flow and share module cadence
- Slot labels should be structural (example: "Image slot 4:5")

### Alignment and Cleanliness Rules (Hard Constraints)
- Reset default element margins that break rhythm (especially `figure`)
- Keep all modules aligned to the same grid and gutter system
- Use consistent section separators (lines) for visual order
- Keep side stacks using explicit internal gaps
- Do not mix random spacing values between modules
- If one layout option uses a rhythm model, all options must follow it

---

## Layout Components (Structure Only)

### Hero / Lead Area
Use at top of key pages for primary story or collection lead.
- Large content block spanning multiple columns
- Optional adjacent supporting block
- Clear transition into body sections

### Feature Grid
For high-priority content clusters.
- Mix block scales (large + medium + small)
- Maintain alignment anchors
- Avoid visual randomness; variation must still follow rhythm

### Story Stream
For chronological or thematic reading.
- Vertical stack with consistent cadence
- Alternating density (some entries compact, some expanded)
- Predictable metadata and excerpt placement

### Split Narrative Layout
For detailed articles or analysis pages.
- Main reading column plus secondary rail
- Secondary rail can hold related items, key points, or navigation anchors
- Keep secondary rail supportive, not dominant

### Module Matrix
For category pages, archives, and discovery.
- Repeating card rows
- Controlled variation in span and height
- Strong row/column rhythm for fast scanning

### Long-Form Reading Layout
For essays and deep content.
- Comfortable reading measure
- Stable vertical rhythm
- Occasional full-width interruption modules for pacing

---

## Website UI Usage Cases

### Home / Front Page
Recommended structure:
1. Lead story zone
2. Feature cluster
3. Thematic sections
4. Stream of latest items

Goal: balance editorial authority with fast discoverability.

### Section / Category Page
Recommended structure:
1. Section introduction block
2. Priority stories row
3. Repeating module matrix
4. Optional topic stream

Goal: maintain identity of section while maximizing scan speed.

### Article Page
Recommended structure:
1. Header block (title and metadata)
2. Main narrative column
3. Contextual side rail (desktop/tablet)
4. Related content modules near transitions and end

Goal: preserve reading focus while providing clear continuation paths.

### Special Feature / Editorial Package
Recommended structure:
1. Distinct opening composition
2. Alternating narrative and module chapters
3. Closing recirculation cluster

Goal: create pacing and depth without losing grid coherence.

---

## Mobile UI Adaptation

### Mobile Principles
- Prioritize vertical reading flow
- Convert multi-column logic into stacked modules
- Keep hierarchy through spacing and scale changes, not complexity

### Mobile Layout Patterns

#### 1) Stacked Lead
- Top lead module
- Secondary modules directly below
- Keep transitions clean and rhythm-consistent

#### 2) Compact Stream
- High-density list for quick browsing
- Periodic expanded modules for editorial emphasis

#### 3) Chunked Narrative
- Break long content into paced sections
- Use recurring structural markers between chunks
- Preserve predictable spacing intervals

#### 4) Rail-to-Section Conversion
Desktop side rail content becomes inline sections on mobile:
- Related stories
- Topic navigation
- Supplemental context

Place these at natural pauses, not mid-paragraph.

---

## Relaxed Rules for Creative Range
Use this section to keep outputs consistent but not mechanical.

1. Keep 80-90% of layout elements aligned to system rhythm.  
   Allow 10-20% intentional tension for editorial energy.

2. Keep core anchors stable (page margins, main text flow, major content edges).  
   Let secondary modules shift in span for variation.

3. Use one dominant composition move per section (for example: one oversized lead or one asymmetric row).  
   Do not stack multiple aggressive moves in the same viewport zone.

4. Break symmetry only when it improves hierarchy or narrative pacing.

5. Prefer predictable reading flow over novelty.

---

## Consistency Rules for AI Generation

When generating layouts with AI, enforce:
- Clear hierarchy: primary, secondary, tertiary content zones
- Repeating spacing rhythm
- Consistent module families (hero, feature, stream item, related block)
- Breakpoint-aware reflow from desktop to mobile
- Reading comfort for long text
- Fluid/Liquid behavior (no fixed canvas lock)
- Strong alignment between text blocks and image slots
- Fashion-editorial proportion (bold type scale + generous whitespace)
- Structural separators (line-based framing over decorative boxes)

Reject outputs that:
- Use arbitrary box sizes with no rhythm
- Over-fragment the page into too many equal-weight blocks
- Lose narrative flow between sections
- Force desktop complexity into mobile screens
- Show inconsistent spacing between image, paragraph, and link rows
- Produce misaligned stacks or broken column anchors

### Required Layout Options for Guideline Deliverables
When asked for "various magazine-inspired layouts", include at least 3:
1. **Editorial Split Front** (lead + support + feature field)
2. **Monument Lead + Rail** (large hero + vertical context rail)
3. **Spatial Asymmetric Mosaic** (controlled asymmetry with stable anchors)

Each option must:
- Share the same spacing token system
- Share the same breakpoint logic
- Include multiple image slots
- Keep links and body text aligned in module flow

---

## Prompt Template for Future AI Use
Use this template in AI design/coding prompts:

```md
Design a [page type] using a magazine-inspired layout system.

Constraints:
- Focus on layout structure only (no color or graphic style directions)
- Use a fluid/liquid grid with clear hierarchy
- Include: lead zone, feature grouping, and continuation path
- Keep spacing and block sizing consistent with editorial rhythm
- Enforce 12/8/4 responsive columns and fr-based reflow
- Use bold contemporary fashion-magazine proportions
- Include many image placeholders (no real images), mostly 4:5 ratio
- Keep strict alignment across sections, text blocks, and image slots
- Adapt cleanly for desktop and mobile
- Preserve readability and scanning flow

Output format:
- Layout zones and their purpose
- Desktop structure (columns and module spans)
- Mobile reflow strategy
- Spacing/ratio token table
- Notes on hierarchy and pacing
```

---

## Quick Checklist
- Is there an obvious primary focal zone?
- Is the reading/scanning path clear?
- Are spacing intervals rhythmically consistent?
- Do module sizes belong to a coherent family?
- Does mobile keep hierarchy while simplifying structure?
- Is the layout expressive but still controlled?

