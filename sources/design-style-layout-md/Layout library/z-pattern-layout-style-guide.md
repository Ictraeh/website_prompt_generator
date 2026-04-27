# Z-Pattern Layout Style Guide

## Overview
This guide defines a Z-Pattern layout system for AI vibe coding website design tools.  
It is best for landing pages and campaign pages where users scan quickly and need a clear path to a primary call-to-action (CTA).

The layout follows how many users scan simple web pages:
1. Top-left to top-right
2. Diagonal down to left
3. Bottom-left to bottom-right

This creates a visual "Z" path that guides attention through key content and actions.

---

## Why Z-Pattern Works
- Users scan web pages, not read every word
- Attention follows strong visual hierarchy and placement
- Z-Pattern creates predictable flow for minimal-to-moderate copy
- It is ideal for pages with one main goal (signup, start, buy, contact)

Use Z-Pattern when:
- Page is not text-heavy
- You need clear CTA progression
- You want controlled visual storytelling on a landing page

For text-heavy pages, prefer other patterns (such as F-pattern).

---

## General Layout Direction
- **Style**: Modern, bold, clean, image-forward
- **Color**: No fixed palette required; monochrome/grayscale compatible direction
- **Fonts**: Do not prescribe font family; prioritize readability and contemporary hierarchy
- **Icons**: No icon dependency
- **Images**: Use large, high-quality, relevant visuals
- **Text**: Use proper but concise text with clear message hierarchy
- **Spacing Units**: Use `rem`-based spacing and responsive rhythm
- **Responsiveness**: Fluid responsive behavior across viewport widths
- **Layering**: Overlap/layering is allowed when focus and readability remain clear

---

## Z-Pattern Core Structure

## Point 1 (Top-Left): Start
- Place brand/logo or top-level identity anchor
- Keep it clear and stable

## Point 2 (Top-Right): Early Action/Key Utility
- Place a secondary CTA or high-priority utility action
- Give this point visual weight so scanning lands here

## Diagonal Zone (Center): Interest Builder
- Use large hero media or central narrative block
- Support with short benefit/value statements
- Keep this area engaging without distracting from final CTA flow

## Point 3 (Bottom-Left): Persuasion Context
- Provide supporting proof, benefits, or trust statement
- Prepare users for final action

## Point 4 (Bottom-Right): Primary CTA
- Place strongest CTA here (finish line)
- Make this action explicit and outcome-focused

---

## Zig-Zag Extension (Multi-Section Z)
You can repeat Z movement across sections:
- Section 1: Z flow
- Section 2: another Z flow
- Section 3: final Z flow ending with major CTA

Use this for product/story feature walkthroughs:
- large media
- short supporting copy
- secondary "learn more" actions
- final strong conversion action

---

## Media and Content Rules

### Media
- Use large image/video blocks in each major section
- Keep one dominant visual anchor per section
- Maintain ratio consistency family across the page

### Text
- Keep headlines clear and high-impact
- Keep supporting text concise
- Avoid long copy blocks in Z-Pattern landing pages

### CTA
- Maintain clear CTA hierarchy:
  - top-right: secondary/early action
  - bottom-right: primary conversion action
- Keep CTA labels direct and outcome-oriented

---

## Visual Flow Techniques
Use these to guide the eye naturally:
- Contrast in block size (large media + concise text)
- Strategic whitespace around focus elements
- Alignment anchors across top and bottom rows
- Diagonal visual cues through composition and block placement
- Layered elements only when they reinforce flow

Avoid:
- Competing focal points on the same scan step
- Random decorative placements that break the Z path
- Dense paragraphs that interrupt scan behavior

---

## Responsive / Fluid Behavior
- Desktop: explicit Z composition with clear corner anchors
- Tablet: preserve Z logic with simplified spans
- Mobile: convert to vertical sequence while preserving priority order:
  1) Point 1 content
  2) Point 2 action/context
  3) Hero/diagonal narrative content
  4) Point 3 support
  5) Point 4 primary CTA

Do not collapse into generic stacked cards without hierarchy.

---

## AI Output Requirements
When generating this style with AI, enforce:
- True Z-pattern hierarchy with Point 1-2-3-4 logic
- Large media blocks in major sections
- Strong primary CTA at Z endpoint (bottom-right on desktop)
- Concise text and clear scan flow
- Fluid responsive behavior with `rem` spacing
- Optional layered elements only if readability stays strong

Reject outputs that:
- Ignore Z scan structure
- Place primary CTA away from finish point without reason
- Overload center with too much text
- Use weak hierarchy between top actions and final CTA
- Break flow through inconsistent spacing and alignment

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for a Z-Pattern landing page.

Goal:
- Build a modern, bold, clean, image-forward website layout that follows Z-pattern scan behavior.
- Optimize for clear CTA progression and fast scanning.

Constraints:
- No fixed color palette instructions.
- No fixed font-family instructions.
- No icon requirements.
- Use large media blocks in each major section.
- Use concise, proper text with strong hierarchy.
- Follow Z path: top-left -> top-right -> diagonal center -> bottom-left -> bottom-right.
- Place primary CTA at the Z finish point.
- Use fluid responsive behavior and rem-based spacing.
- Allow layering only if focus/readability remain clear.

Output in markdown:
- Z-pattern section map (Point 1-2-3-4)
- Content and media placement rules
- CTA hierarchy rules
- Responsive behavior rules
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create a Z-Pattern layout MD guide for AI vibe coding landing pages.

Rules:
- Modern bold clean style
- Large media blocks + concise text
- True Z scan flow with strong final CTA
- Fluid responsive layout with rem spacing
- No fixed color/font/icon dependency
- Optional layering only when readability stays clear
```

---

## Conclusion
This Z-Pattern system helps AI tools generate landing pages that match real scanning behavior, improve message clarity, and guide users to action through a deliberate visual path.

