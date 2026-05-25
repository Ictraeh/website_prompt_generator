# Motion Interaction Catalog

Deduplicated motion patterns from vibe-prompt sources, organized for **future motion generation and creatives**.

- **motion-interaction-catalog.json** — machine-readable: triggers, objects, canonical patterns, merged aliases, speed variations, source excerpts.
- **motion-interaction-catalog.md** — human/LLM guide with the same taxonomy and quick lookup tables.

## How to use

1. Pick an **interaction trigger** (when motion runs) and **target object** (what moves).
2. Open the matching **pattern**; apply **slow & calm** or **fast & playful** timing.
3. Cross-reference **mood-to-motion-map** (`../mood-to-motion-map-out/`) for feeling → timing presets.

## Taxonomy

| Interaction triggers | Target objects |
|---------------------|----------------|
| `onPageLoad` | `typography` |
| `onInViewOnce` | `heroSection` |
| `onScrollScrub` | `card` |
| `onScrollProgress` | `button` |
| `onHover` | `navigation` |
| `onClickActive` | `overlayPanel` |
| `onOpenToggle` | `media` |
| `onAutoInterval` | `chartData` |
| `onAmbientLoop` | `background` |
| `onCursorMove` | `deckSlide` |

Patterns merged from duplicate prompts (e.g. `fadeInUp` + `useInView fade-in-up`, multiple marquees, scroll text highlights) are listed under **aliases** in JSON.
