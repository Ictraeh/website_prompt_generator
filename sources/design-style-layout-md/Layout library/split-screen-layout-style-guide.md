# Split Screen Layout Style Guide

## Overview
This guide defines a Split Screen layout system for AI vibe coding website design tools.  
It is ideal for image/video-heavy creative websites that need to present two strong messages at once.

Core idea:
- One screen, two parallel messages
- Equal visual importance on both sides
- Clear user choice through two focused paths

---

## General Layout Direction
- **Style**: Modern, bold, full-filled, symmetrical, image-focused
- **Structure**: Two vertical panels side-by-side
- **Panel Logic**: Each split has its own title, supporting text, and button
- **Color**: No fixed palette; monochrome/grayscale compatible
- **Fonts**: Do not prescribe font family; prioritize readability and modern hierarchy
- **Icons**: No icon dependency
- **Images/Videos**: High-quality and visually striking
- **Text**: Proper, concise, impactful
- **Media Slots**: Use large blocks in each section
- **Responsiveness**: Fluid responsive behavior
- **Spacing Units**: Use `rem`-based spacing
- **Layering**: In-section overlap is allowed only when focus and clarity remain strong
- **Margins**: Small left/right safe space allowed

---

## Why Split Screen Works
- Gives equal prominence to two choices
- Creates strong contrast and visual tension
- Accelerates decision-making through clear dual pathways
- Works naturally with card-like content containers
- Adapts well to desktop/tablet and can stack on mobile

---

## Core Split Screen System

### 1) Two Balanced Panels
- Use a 50/50 split as the baseline
- Keep both panels visually complete and self-contained
- Each panel should include:
  - primary visual block (image/video)
  - short heading
  - short supporting text
  - one clear CTA

### 2) Dual Importance
- Both panels should feel equally meaningful unless intentionally weighted
- If one panel is primary, use subtle weighting (size, contrast, motion), not clutter

### 3) Card Mindset
- Treat each panel like a large card:
  - one message
  - one action
  - clear boundaries

### 4) Simplicity First
- Keep panel content minimal
- Avoid overloading both sides with dense text
- Too much detail breaks split-screen clarity

---

## Visual Cohesion Between Panels
Split screens are separate, but should still feel related.

Use one or more cohesion techniques:
- Shared spacing rhythm
- Repeated typography scale
- Mirrored content structure
- Aligned CTA row positions
- Optional overlap element crossing the divide (used sparingly)
- Optional overlay treatment for one side as continuation cue

---

## CTA and Focus Rules
- Each panel should have one primary CTA
- Keep CTA labels short and action-oriented
- Place CTA where eye naturally lands (lower content zone works well)
- Use negative space to improve CTA focus

---

## Responsive / Fluid Behavior

### Desktop
- Two columns side-by-side
- Equal height panel presentation
- Strong split line or visual boundary

### Tablet
- Keep split layout if space allows
- Reduce text density
- Maintain clear dual-choice structure

### Mobile
- Stack panels vertically
- Preserve panel order and message clarity
- Keep each panel self-contained (visual + text + CTA)

Implementation guidance:
- Use fluid widths (`fr`, `%`, `minmax`) with rem spacing
- Avoid rigid fixed-width panel internals

---

## Interaction and Animation Guidance
- Use subtle interactive effects to encourage action
- Hover/press states should reinforce clickability, not distract
- Optional micro-animation can guide user focus toward CTA
- Avoid heavy motion that competes with message clarity

---

## Content Strategy
- Keep headlines short and direct
- Keep support copy concise (1-3 lines preferred)
- Avoid long paragraphs in split panels
- Use media as primary narrative driver
- Keep one key message per panel

---

## AI Output Requirements
When generating this style with AI, enforce:
- True split-screen structure with two clear panel containers
- Equal or intentionally balanced visual weight
- Large media-first panel design
- Each panel has title + short text + one CTA
- Clean and minimal composition
- Fluid responsive behavior with rem-based spacing
- Mobile stacking that preserves narrative clarity

Reject outputs that:
- Make one panel visually empty or underdeveloped
- Overload both panels with dense text
- Break panel symmetry without clear intent
- Scatter multiple competing CTAs per panel
- Lose structural clarity on smaller screens

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for a Split Screen website layout.

Goal:
- Build a modern, bold, image-focused split-screen system with two equally clear message paths.

Constraints:
- No fixed color palette instructions.
- No fixed font-family instructions.
- No icon requirements.
- Use a two-panel split-screen structure (desktop baseline).
- Each panel must include: large media, short title, short text, one CTA.
- Keep content minimal and high-impact.
- Allow subtle in-section layering only when focus remains clear.
- Use fluid responsive behavior and rem-based spacing.
- Stack panels on mobile while preserving message hierarchy.

Output in markdown:
- Split-screen structure map
- Panel content model
- CTA placement rules
- Cohesion/flow rules between panels
- Responsive behavior rules
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create a Split Screen layout MD guide for AI vibe coding tools.

Rules:
- Two balanced panels, one screen two messages
- Large media + concise text + one CTA per panel
- Modern bold clean image-focused style
- Fluid responsive layout (stack on mobile)
- rem-based spacing
- No fixed color/font/icon dependency
```

---

## Conclusion
Split Screen layout is a strong choice for dual-message storytelling and fast user choice.  
It combines symmetry, clarity, and visual impact while staying flexible across screen sizes.

