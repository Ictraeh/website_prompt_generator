# F-Pattern Layout Style Guide

## Overview
This guide defines an F-Pattern layout system for AI vibe coding website design tools.  
Use this pattern for content-heavy pages where users scan first and read second (blogs, news pages, knowledge content, search-style results).

The scan path typically looks like an "F":
1. A long horizontal scan across the top
2. A shorter horizontal scan below
3. A vertical scan down the left side

---

## Why This Pattern Works
- Most users do not read every line; they scan for relevance
- Attention is strongest at top-left and early horizontal lines
- Left-edge anchors help users navigate dense content quickly
- Clear hierarchy improves readability and reduces cognitive load

Use F-Pattern when:
- The page contains a lot of text
- Users need to find key points quickly
- You want predictable reading flow and strong structure

---

## General Layout Direction
- **Style**: Straightforward, organized, simple, clean
- **Color**: No fixed palette required; keep output monochrome/grayscale compatible
- **Fonts**: Do not specify font family; prioritize readability and hierarchy
- **Icons**: No icon dependency
- **Images**: Use large, high-quality media slots to support content
- **Text**: Proper, concise, meaningful copy
- **Responsiveness**: Fluent responsive behavior
- **Spacing**: Use `rem`-based spacing system
- **Layering**: In-section layering is allowed only when readability remains clear
- **Margins**: Small controlled left/right spacing is allowed

---

## Core F-Pattern Structure

### Top Horizontal Band (Primary Scan)
- Place headline and strongest value/context
- Put the most important message near top-left
- Keep this area immediately understandable

### Second Horizontal Band (Secondary Scan)
- Add key supporting heading/content
- Keep this line shorter than the first
- Use this area to reinforce relevance

### Left Vertical Spine
- Place scan anchors along the left edge:
  - section labels
  - metadata
  - short headings
  - bullets
- Start paragraphs with strong opening words

### Main Content Body
- Break content into short, digestible sections
- One main idea per paragraph
- Use bullet lists where possible
- Insert large media slots between text blocks to maintain engagement

---

## Readability Rules
- The first 1-2 paragraphs are critical; make them clear and specific
- Keep paragraph length controlled
- Maintain clear heading hierarchy
- Emphasize key terms for scanners
- Avoid long uninterrupted text walls

---

## Media Rhythm Rules
- Include at least one large media slot in each major section
- Use media as structured reading pauses, not decoration
- Keep media placement consistent with section rhythm

Suggested section cadence:
1. Heading + short intro
2. Core paragraph(s)
3. Large media slot
4. Bullet list or short follow-up

---

## CTA and Attention Placement
- Place actions where scanning naturally pauses:
  - end of top horizontal band
  - end of second horizontal band
  - key decision points in the main column
- Keep CTA labels direct and short
- Avoid excessive CTAs in every section

---

## Responsive / Fluid Behavior
- **Desktop**: Preserve full F structure (strong top scan + left spine)
- **Tablet**: Simplify grid while preserving left-led scan cues
- **Mobile**: Stack in priority order without losing hierarchy:
  1) Top key message
  2) Supporting scan line
  3) Left-spine equivalents (headings/labels/bullets)
  4) Media and deeper content

Do not reduce layout to generic equal cards with no scan logic.

---

## Prevent F-Pattern Monotony
F-pattern can feel repetitive if overused. Keep it engaging by:
- Alternating media position per section while preserving alignment
- Varying section density (dense text, then open visual)
- Using occasional in-section layered highlights
- Maintaining a consistent spacing system so variation feels intentional

---

## AI Output Requirements
When generating this style with AI, enforce:
- True F-scan hierarchy (top band, second band, left spine)
- Text-first clarity for content-heavy pages
- Large media slots across major sections
- Concise paragraphs and strong heading hierarchy
- Bullet/list support for scanning
- Fluent responsive behavior with `rem` spacing
- Clean, organized composition

Reject outputs that:
- Ignore scanning structure
- Present long unbroken text walls
- Omit media rhythm in heavy content
- Add visual noise that competes with reading
- Lose left-edge scan anchors on larger screens

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for an F-Pattern content-heavy website.

Goal:
- Build a clean, organized, scan-friendly layout for large amounts of text.
- Use F-pattern behavior to improve discoverability and readability.

Constraints:
- No fixed color palette instructions.
- No fixed font-family instructions.
- No icon requirements.
- Use proper text hierarchy with concise, impactful messaging.
- Follow F scan structure: top horizontal, second horizontal, left vertical anchors.
- Include large image/video slots in each major section.
- Keep layout fluent/responsive and use rem-based spacing.
- Allow in-section layering only when focus/readability stay clear.

Output in markdown:
- F-pattern section map
- Text hierarchy and scanning rules
- Media placement and rhythm rules
- CTA placement strategy
- Responsive behavior and spacing tokens
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create an F-Pattern layout MD guide for AI vibe coding tools.

Rules:
- Straightforward, organized, clean, scan-friendly
- Text-heavy structure with strong hierarchy
- Top horizontal + second horizontal + left vertical scan anchors
- Large media slots per section to maintain engagement
- Fluent responsive behavior + rem spacing
- No fixed color/font/icon dependency
```

---

## Conclusion
This F-Pattern system helps AI tools produce readable, engaging, and well-structured content-heavy websites by aligning layout decisions with real scanning behavior.

# F-Pattern Layout Style Guide

## Overview
This guide defines an F-Pattern layout system for AI vibe coding website design tools.  
It is designed for content-heavy pages where users scan first, then read selectively (for example: blogs, news, guides, search-result style pages).

The F-Pattern follows typical scan behavior:
1. Top horizontal scan (first and widest line)
2. Second, shorter horizontal scan
3. Vertical scan down the left edge

This structure helps users find relevant information quickly and improves readability on text-dense pages.

---

## Why F-Pattern Works
- Users scan web content before committing to reading
- Most attention lands at top-left and along early lines
- Left-edge scanning helps users locate key entry points fast
- Strong hierarchy reduces cognitive load in long-form content

Use F-Pattern when:
- The page is text-heavy
- Users need fast content discovery
- You need clear structure for articles, lists, and summaries

---

## General Layout Direction
- **Style**: Straightforward, organized, clear direction, simple, clean
- **Color**: No fixed color palette required; monochrome/grayscale compatible
- **Fonts**: Do not prescribe font family; prioritize readability and modern text hierarchy
- **Icons**: No icon dependency
- **Images**: Use high-quality, relevant visuals in large media slots per section
- **Text**: Proper text structure with concise and impactful messaging
- **Responsiveness**: Fluent responsive layout behavior
- **Spacing Units**: Use `rem`-based spacing system
- **Layering**: In-section layering allowed only if focus and readability remain consistent
- **Margins**: Small, controlled left/right spacing is allowed

---

## Core F-Pattern Structure

### Top Scan Band (First Horizontal)
- Place page title and strongest summary/value statement here
- Include primary orientation content near top-left
- Keep this area high-clarity and easy to parse in seconds

### Secondary Scan Band (Second Horizontal)
- Place key section heading and short supporting content
- Keep this line shorter than top band to reflect natural scan behavior

### Left Vertical Spine
- Use left-aligned headings, labels, timestamps, tags, or bullets as scan anchors
- Start paragraphs with meaningful first words
- Keep key metadata and entry cues on the left edge

### Content Body
- Break into short sections
- One key idea per paragraph
- Use bullets/lists for fast scanning
- Insert media blocks between text groups to avoid monotony

---

## Text and Readability Rules
- Prioritize first two paragraphs (highest attention zone)
- Keep paragraphs short and purposeful
- Use heading hierarchy to indicate importance
- Emphasize key words/phrases for scanners
- Avoid wall-of-text sections without visual breaks

---

## Media and Visual Rhythm Rules
- Use large media blocks in each major section
- Media should support the narrative, not distract from scan flow
- Keep media placement predictable within section rhythm
- Use media to break repetitive text patterns and maintain engagement

Recommended section rhythm:
1. Heading + short intro
2. Key paragraph(s)
3. Large image/video slot
4. Bullet or concise follow-up

---

## CTA and Attention Placement
- Place important actions where scans pause:
  - End of top scan line
  - End of secondary scan line
  - Near left-edge decision moments in long sections
- Keep CTA labels concise and clear
- Do not overload each section with too many actions

---

## Responsive / Fluid Behavior
- Desktop: preserve F shape with strong top horizontal + left vertical spine
- Tablet: simplify structure while keeping left-oriented scan anchors
- Mobile: convert into stacked flow while preserving priority order:
  1) Top key message
  2) Secondary support line
  3) Left-edge anchor equivalents (headings/labels/bullets)
  4) Media and detailed content

Do not collapse to uniform cards that lose scan hierarchy.

---

## Advanced Balance: Avoid F-Pattern Monotony
F-pattern can become repetitive. To keep engagement:
- Alternate media positions between sections (while keeping alignment logic)
- Vary section density (dense text section, then open visual section)
- Introduce occasional layered in-section highlights
- Keep a consistent baseline spacing rhythm so variation feels intentional

---

## AI Output Requirements
When generating this style with AI, enforce:
- True F-scan hierarchy (top horizontal, second horizontal, left vertical anchors)
- Text-first clarity for content-heavy pages
- Large media slots integrated per section
- Concise paragraphs and strong heading hierarchy
- Bullet/list usage for scan support
- Fluent responsive behavior with `rem` spacing
- Clean, organized composition with clear reading direction

Reject outputs that:
- Ignore scan behavior and place key content randomly
- Use long unbroken text blocks
- Omit visual breaks in text-heavy pages
- Overload layout with decorative noise
- Lose left-edge scan anchors on desktop/tablet

---

## Prompt Template (Cursor / AI Reuse)

```md
Create a markdown layout guide for an F-Pattern content-heavy website.

Goal:
- Build a clean, organized, scan-friendly layout for large amounts of text.
- Use F-pattern behavior to improve readability and content discovery.

Constraints:
- No fixed color palette instructions.
- No fixed font-family instructions.
- No icon requirements.
- Use proper text hierarchy with concise, impactful messaging.
- Follow F scan structure: top horizontal, second horizontal, left vertical anchors.
- Include large image/video slots in each major section.
- Keep layout fluent/responsive and use rem-based spacing.
- Allow in-section layering only when focus/readability remain clear.

Output in markdown:
- F-pattern section map
- Text hierarchy and scanning rules
- Media placement and rhythm rules
- CTA placement strategy
- Responsive behavior and spacing tokens
- Quality checklist and rejection criteria
```

---

## Short Prompt Version

```md
Create an F-Pattern layout MD guide for AI vibe coding tools.

Rules:
- Straightforward, organized, clean, scan-friendly
- Text-heavy structure with strong hierarchy
- Top horizontal + second horizontal + left vertical scan anchors
- Large media slots per section to maintain engagement
- Fluent responsive behavior + rem spacing
- No fixed color/font/icon dependency
```

---

## Conclusion
This F-Pattern system helps AI tools generate readable, engaging, and well-structured content-heavy websites by aligning layout decisions with real scanning behavior.

