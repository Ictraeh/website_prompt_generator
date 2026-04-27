# Bento Grid Layout Style Guide

## Overview
This document defines a Bento Grid layout system for AI vibe coding website design workflows.  
The target look and feel is upscale, bold, modern, contemporary, minimal, sharp, and clear, driven by layout quality rather than visual decoration.

---

## Design Specifications

### General Layout
- **Style Direction**: Upscale, bold, modern, contemporary, minimal, sharp, clear
- **No Color Direction**: Do not define color palettes or branding colors
- **No Font Direction**: Do not define specific font families or type styles
- **No Icon Direction**: Do not include icon requirements
- **Core Principle**: Layout, proportion, and rhythm are the primary design language

### Layout Structure
- **Grid Model**: Bento grid with varied module sizes and placements
- **Responsiveness**: Fully fluid and responsive; modules reflow with viewport width
- **Units**: Use `rem` units for spacing, sizing, and rhythm rules wherever practical
- **Proportion Control**:
  - Strong image-to-text hierarchy
  - Large visual anchors balanced with concise text modules
  - Clear section rhythm using consistent spacing and outline boxes

### Content Guidelines
- **Images**:
  - Use high-quality visuals that are relevant and striking
  - Maintain deliberate aspect-ratio variation (hero, medium, compact)
  - Prevent random image sizing; image blocks should follow a ratio family
- **Text**:
  - Keep copy minimal and high-impact
  - Use short headlines, compact support text, and clear calls to action
- **Separators**:
  - Use outline boxes as the primary structure system
  - Do not use section separator lines
  - No shadows; hierarchy must come from layout and proportion

### Visual Standards
- Align with creative agency quality standards:
  - Professional composition
  - Clean alignment and spacing
  - Contemporary restraint with strong editorial confidence
- Overall experience should feel sophisticated, minimal, and user-friendly
- Layouts must feel intentional at every breakpoint, not auto-stacked by default

---

## Bento Grid System Rules

### 1) Module Families
Use a controlled set of module types:
- **Hero Module**: dominant visual + minimal text
- **Feature Module**: balanced image + short text
- **Text Module**: concise message + CTA
- **Support Module**: secondary visual/text utility block

### 2) Grid Behavior
- Desktop: multi-column bento arrangement with asymmetry
- Tablet: simplified bento structure with reduced span complexity
- Mobile: stacked sequence preserving hierarchy and rhythm
- Use explicit span variation (both column span and row span), not equal-height card rows
- Keep at least one anchor tile per layout variation (larger visual block)
- Include micro-tile modules (small spans) to increase density contrast and bento diversity

### 3) Alignment
- Keep all module edges anchored to a shared grid
- Keep gutters consistent within each section
- Ensure text baselines and image edges align cleanly whenever possible
- Keep wrappers clean; tile outlines carry most of the visual structure
- Smaller micro tiles must align to the same grid tracks as larger tiles
- Do not leave unbalanced gaps around micro tiles in desktop/tablet compositions

### 4) Density Control
- Alternate dense and open zones to create pacing
- Keep at least one prominent visual anchor per major section
- Avoid over-fragmentation into too many equal-weight blocks
- Use small tiles to fill structural gaps intentionally, not randomly
- Each section should feel complete: large, medium, and small modules should form a coherent matrix

---

## Example Layout Sections

### 1. Header
- Logo area
- Minimal navigation links

### 2. Main Content Area
- Large image block (primary visual anchor)
- Short text block (context statement)
- Secondary image block
- Text block with clear call-to-action

### 3. Footer
- Contact information
- Minimal social links

---

## AI Output Requirements
When using this guide for AI generation, require:
- Bento grid with varied but structured block sizes
- Responsive/fluid behavior across screen widths
- Strong image-to-text proportion hierarchy
- Minimal text and clear message hierarchy
- Outline-box structure without separator lines
- No color instructions, no font instructions, no icon instructions
- `rem`-based spacing and sizing logic
- Clean alignment across modules, text blocks, and image blocks
- Mixed span matrix behavior (example: span 3/4/5/6/7/8 and row spans)
- Micro-tile behavior included (example small tiles like span 2 / row 1)
- Small tiles must be filled with useful minimal content (label, short text, or CTA), not empty placeholders

Reject outputs that:
- Use random block sizing with weak proportion logic
- Overuse text or long paragraphs in module cards
- Collapse hierarchy on mobile
- Replace structural clarity with purely decorative effects
- Depend on shadow styling for visual hierarchy
- Use px-only spacing systems with inconsistent rhythm
- Add section divider lines as primary structure treatment
- Render Bento as editorial rows instead of tile matrix
- Leave small tiles empty or visually orphaned
- Misalign small tiles relative to the main bento grid tracks

---

## Cursor Prompt to Generate MD (Copy/Paste)

```md
Create a markdown file that will guide AI vibe coding website design tools.

Goal:
- Produce upscale, bold, modern, contemporary, minimal, sharp, and clear Bento Grid layout quality.
- Focus on layout system quality, not visual decoration.

Constraints:
- Do NOT specify color styles.
- Do NOT specify font styles or font families.
- Do NOT include icon requirements.
- Do NOT use shadow-based hierarchy.
- Use outline boxes only; do not use section separator lines.
- Use rem units for spacing and layout rhythm rules.
- Build a fluid/liquid, responsive Bento Grid that adapts to viewport width.
- Include varied Bento arrangements (multiple module span patterns).
- Use true Bento tile matrix behavior (mixed column spans + row spans).
- Prioritize strong image-to-text proportions
- Keep content minimal, concise, and high impact
- Keep alignment strict and professional to creative agency standards

Include sections:
1) Header (logo + minimal navigation)
2) Main area (large visual, short text, secondary visual, CTA text)
3) Footer (contact + minimal social links)

Required output in the markdown:
- Layout zones and purpose
- Fluid/liquid grid behavior (desktop/tablet/mobile)
- Module proportion map (image-heavy Bento ratios)
- Alignment rules and outline-box rules
- Micro-tile fill and alignment rules
- rem-based spacing token system
- Quality checklist for rejecting weak layout outputs
```

---

## Short Prompt Version

```md
Create an MD guide for AI vibe coding tools to generate an upscale, bold, modern, contemporary Bento Grid website layout.

Rules:
- Layout-only guidance (no color, no font, no icon specs)
- No shadows; outline boxes only; no separator lines
- Strong image proportion and minimal text
- Multiple Bento layout variations
- True tile matrix with mixed col/row spans
- Fluid/liquid responsive behavior by viewport width
- rem-based spacing and rhythm
- Creative agency-level alignment and cleanliness
```

---

## Conclusion
This Bento Grid system is intended to produce visually engaging, professional, and contemporary layouts for AI coding-tool websites.  
The design language should remain minimal and clear, with strong proportion discipline and responsive structural consistency.

