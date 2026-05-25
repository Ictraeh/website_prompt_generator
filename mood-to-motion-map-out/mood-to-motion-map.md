# Mood to Motion Map

Machine- and human-readable map from canonical feeling tags to motion implementation: each feeling maps to a motion profile (speed, shape, color, practical preset, surprise) in moodFeelingMotionProfiles; clusters merge motionPersonalityTags from those profiles. Includes motionAttributeGuide, motionPersonalityTags vocabulary, motionBlends, surpriseMotionByFeeling, moodScoreExamples, motionFeatureSchema, and motionMoodEngine philosophy — guidelines, not rigid rules. Timing presets carry human pace + Tailwind / anime.js / GSAP paste snippets. Cross-read React Bits, Magic UI, Kokonut UI, GSAP, Motion via libraries[] and moodClusters.

**Version:** 1.2.0 · **Generated:** 2026-04-29

## How other AIs should use this map

1. **Match mood** from the brief to a **mood cluster**: read `moodTitle` + `feelingTags` (ids from `feelingTagDefinitions`) in `moodClusters[]`.
2. Open **`timing.pickerLabel`** + **`paceInWords`** (slow / normal / fast / jump / …) and **`whatItFeelsLike`**. Use **`timing.copyPaste`** to paste starter values into Tailwind / anime.js / GSAP.
3. Read **`motionPersonalityTags`** on the cluster (merged from `moodFeelingMotionProfiles` via each feeling tag) plus **`motionAttributeGuide`** / **`motionPersonalityTags` definitions** — motion has mood like color: combine speed, easing, rhythm, direction, scale, opacity, blur, color behavior, and density.
4. For nuanced briefs, use **`motionBlends`**, **`surpriseMotionByFeeling`**, and score-style hints in **`moodScoreExamples`** + **`motionFeatureSchema`** before locking presets.
5. Pick **one primary stack** (CSS vs anime.js vs GSAP) per section; avoid stacking competing scroll drivers.
6. Cross-link **animationHubRefIds** to files under the animation-reference hub (URLs in `animationReferenceHub`).
7. Map UI vs BG: **motionSitesKits** use `plane` in catalog; React Bits categories mirror production taxonomies.

## Motion mood engine

_Motion mood is created by how movement feels, not only how fast it moves. Speed, easing, rhythm, shape, color, and timing work together to create emotional character. Motion should behave the way the mood would move if it had a body._

**Analyze:** speed, easing, rhythm, direction, scale behavior, opacity behavior, shape behavior, color behavior, contrast, density, texture, interaction feedback.

**Score / rank by:** motion intensity, timing softness, predictability, shape personality, visual density, directional symbolism, color-motion relationship, industry expectation, surprise potential.

**Emit:** primary mood, secondary mood, motion tags, recommended animation presets, timing range, easing style, shape behavior, color behavior, industry fit, surprise variant.

## Motion attributes (design variables)

| Attribute | What it controls | Emotional impact |
|-----------|------------------|-------------------|
| **Speed** | How fast elements move | Fast feels energetic, urgent, bold. Slow feels calm, elegant, reflective. |
| **Easing** | How motion accelerates/decelerates | Smooth easing feels natural. Linear feels mechanical. Sharp easing feels confident or aggressive. |
| **Rhythm** | Repetition and pacing | Regular rhythm feels stable. Irregular rhythm feels playful, organic, or mysterious. |
| **Direction** | Up, down, sideways, circular, diagonal | Upward feels optimistic. Downward feels heavy. Diagonal feels adventurous. Circular feels soft or playful. |
| **Scale** | Grow, shrink, pulse, zoom | Expansion feels expressive. Subtle scale feels elegant. Sudden scale feels bold. |
| **Shape behavior** | Morphing, bouncing, stretching, snapping | Rounded morphs feel friendly. Angular cuts feel bold or techy. Fluid forms feel calm or luxurious. |
| **Opacity** | Fade in/out, reveal, dissolve | Soft fades feel serene. Hard reveals feel bold. Partial opacity feels mysterious. |
| **Blur / focus** | Motion blur, depth blur, focus transitions | Blur adds speed, dreaminess, luxury, or mystery depending on use. |
| **Color behavior** | Shifts, gradients, flashes, glow | Bright shifts feel joyful. Neon glow feels innovative. Subtle tones feel elegant. |
| **Timing density** | Number of animated events at once | Sparse motion feels refined. Dense motion feels energetic, festival-like, or playful. |

## Motion personality tags (animation tone)

- **Soft** (`soft`) — Slow fades, gentle scale, rounded movement · *Often fits:* Calm, Serene, Comforting, Warm
- **Sharp** (`sharp`) — Fast cuts, snap easing, strong directional motion · *Often fits:* Bold, Fearless, Dynamic, Innovative
- **Bouncy** (`bouncy`) — Elastic easing, overshoot, playful rebounds · *Often fits:* Playful, Joyful, Charming
- **Fluid** (`fluid`) — Morphing shapes, liquid transitions, flowing paths · *Often fits:* Calm, Elegant, Luxurious, Serene
- **Mechanical** (`mechanical`) — Linear paths, precise timing, grid-based movement · *Often fits:* Trustworthy, Innovative, Sophisticated
- **Organic** (`organic`) — Uneven pacing, hand-drawn feel, natural drift · *Often fits:* Authentic, Warm, Nostalgic
- **Cinematic** (`cinematic`) — Slow reveals, depth, shadows, dramatic pacing · *Often fits:* Mysterious, Luxurious, Reflective
- **Explosive** (`explosive`) — Bursts, quick scale, particles, impact · *Often fits:* Energetic, Adventurous, Fearless
- **Minimal** (`minimal`) — Subtle transitions, low movement count · *Often fits:* Elegant, Sophisticated, Trustworthy
- **Layered** (`layered`) — Parallax, staggered reveals, depth shifts · *Often fits:* Innovative, Luxurious, Mysterious
- **Airy** (`airy`) — Light movement, upward drift, soft opacity · *Often fits:* Fresh, Optimistic, Serene
- **Tactile** (`tactile`) — Weight, friction, drag, physical response · *Often fits:* Authentic, Supportive, Comforting

## Animation reference hub (canonical prose)

Tree: https://github.com/Ictraeh/designers-pandora-box/tree/main/docs/animation-reference

- **readme** — [Animation reference — overview](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/README.md)
- **prompt-workflow** — [Prompt workflow (use refs in Cursor)](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/prompt-workflow.md)
- **tone-to-motion** — [Tone to motion (words → timing)](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/tone-to-motion.md)
- **patterns-json** — [Patterns index (JSON)](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/patterns.json)
- **tone-vibes** — [Tone vibes (JSON)](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/tone-vibes.json)
- **motion-react** — [Motion for React](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/motion.md)
- **gsap** — [GSAP](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/gsap.md)
- **animejs** — [Anime.js](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/animejs.md)
- **css-tailwind** — [CSS / Tailwind motion](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/css-tailwind.md)
- **recipes** — [Recipes (copy-paste patterns)](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/recipes.md)
- **galleries** — [Galleries (ideas only, not source)](https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference/galleries.md)

## Motion vibe presets (vibe-prompt-tool)

### Natural & calm — organic, soft, breathing (`natural_calm`)
- **Keywords:** natural, calm, soft, organic, slow, ease-out, understated
- **UI refs:** readme, tone-to-motion, motion-react, css-tailwind, recipes
- **BG refs:** readme, tone-to-motion, galleries, patterns-json

### Elegant & refined — minimal, luxe timing (`elegant_refined`)
- **Keywords:** elegant, refined, polished, restrained, precise, editorial
- **UI refs:** readme, tone-to-motion, motion-react, recipes, css-tailwind
- **BG refs:** readme, tone-to-motion, galleries, patterns-json

### Snappy & energetic — fast, confident (`snappy_energetic`)
- **Keywords:** snappy, crisp, energetic, decisive, short durations, confident
- **UI refs:** tone-to-motion, motion-react, css-tailwind, tone-vibes, recipes
- **BG refs:** readme, css-tailwind, patterns-json, galleries

### Playful & bouncy — joyful micro-motion (`playful_bouncy`)
- **Keywords:** playful, bouncy, springy, friendly, elastic, whimsical
- **UI refs:** tone-to-motion, motion-react, animejs, recipes, tone-vibes
- **BG refs:** readme, galleries, tone-vibes, tone-to-motion

### Cinematic & bold — hero drama, scroll stories (`cinematic_bold`)
- **Keywords:** cinematic, bold, dramatic, scroll-driven, immersive, high impact
- **UI refs:** gsap, motion-react, tone-to-motion, recipes
- **BG refs:** galleries, gsap, patterns-json, tone-to-motion

### Technical & precise — dashboards, dense UI (`technical_precise`)
- **Keywords:** technical, precise, system, subtle, functional, low-noise
- **UI refs:** readme, prompt-workflow, motion-react, css-tailwind, patterns-json
- **BG refs:** readme, patterns-json, tone-to-motion, css-tailwind

### Ambient-first — quiet hero, motion as atmosphere (`ambient_light`)
- **Keywords:** ambient, atmospheric, slow, gentle parallax, background-led, soft
- **UI refs:** readme, css-tailwind, motion-react, tone-to-motion
- **BG refs:** galleries, tone-to-motion, patterns-json, tone-vibes, motion-react

### Story & scroll — narrative sections, reveals (`story_scroll`)
- **Keywords:** storytelling, scroll, reveal, section transitions, narrative pacing
- **UI refs:** gsap, motion-react, tone-to-motion, recipes
- **BG refs:** galleries, patterns-json, tone-to-motion, prompt-workflow

## Motion libraries (external)

### React Bits (`reactbits`)
- **homepage:** https://reactbits.dev/
- **intro:** https://reactbits.dev/get-started/introduction
- **note:** TSX components: Animations, Backgrounds, Components, TextAnimations. Bundled in vibe-prompt-tool Motion snippets.

### GSAP + ScrollTrigger (`gsap`)
- **homepage:** https://gsap.com/
- **scrollTrigger:** https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **note:** Scroll-scrub video, pin, timelines; pair with reduced-motion fallbacks.

### Anime.js (`animejs`)
- **homepage:** https://animejs.com/
- **docs:** https://animejs.com/documentation/
- **note:** Lightweight timelines, stagger, springy UI micro-motion.

### Motion for React (Framer Motion successor) (`motion_react`)
- **homepage:** https://motion.dev/
- **note:** useSpring, useScroll, layout animations — common in Magic UI / Kokonut.

### Magic UI (`magicui`)
- **homepage:** https://magicui.design/
- **docs:** https://magicui.design/docs
- **components:** https://magicui.design/docs/components
- **note:** shadcn-style install; many blocks use motion/react + Tailwind.

### Kokonut UI (`kokonutui`)
- **homepage:** https://kokonutui.com/
- **docs:** https://kokonutui.com/docs
- **registryNote:** https://kokonutui.com/r/{name}.json — install via shadcn CLI @kokonutui/*
- **note:** Text effects, loaders, particle buttons, animated backgrounds; Motion + Tailwind v4.

### Aceternity UI (reference) (`aceternity`)
- **homepage:** https://ui.aceternity.com/
- **note:** Not bundled in vibe-prompt-tool; use when prompts name premium landing effects.

### Tailwind CSS motion utilities (`tailwind`)
- **transitions:** https://tailwindcss.com/docs/transition-property
- **animation:** https://tailwindcss.com/docs/animation
- **note:** transition-*, duration-*, translate, opacity — baseline for any stack.

## Timing presets (human pick → paste snippets)

Use **`timingPresets`** in JSON for the full catalog. Each preset has **`pickerLabel`**, **`paceInWords`** (entrance / betweenItems / bounce), **`whatItFeelsLike`**, optional **`technicalNote`**, and **`pasteSnippets`** (`tailwind`, `animeJs`, `gsap`).

## Feeling tags + motion profiles (24 moods)

- **Energetic** — Vibrant and lively. — *Vibrant, lively, punchy* · speed **Fast** · shape **Bursts, pulses, quick slides** · color **Bright, saturated, high contrast** · preset **Pulse Burst** (Elements pop in with scale, emit short particles, then settle quickly.) · surprise: _Dark neon pulses instead of bright rainbow motion._ · motion tags: Explosive, Sharp, Bouncy
- **Calm** — Peaceful and soothing. — *Peaceful, soothing* · speed **Slow** · shape **Smooth drifting, fades, gentle scale** · color **Soft, cool, low contrast** · preset **Soft Drift** (Elements fade in while drifting slightly upward or sideways.) · surprise: _Warm desert drift instead of blue water motion._ · motion tags: Soft, Fluid, Airy
- **Trustworthy** — Reliable and stable. — *Stable, reliable* · speed **Medium-slow** · shape **Linear, structured, steady reveals** · color **Blue, neutral, clear contrast** · preset **Steady Reveal** (Cards appear in a clean vertical stagger with consistent timing.) · surprise: _Small human micro-bounce in an otherwise stable system._ · motion tags: Mechanical, Minimal, Soft
- **Playful** — Fun and whimsical. — *Fun, whimsical* · speed **Medium-fast** · shape **Bounces, wiggles, squash/stretch** · color **Bright, candy, pastel, surprising** · preset **Bounce Pop** (Icons overshoot, squash slightly, then settle with friendly bounce.) · surprise: _Retro rubber-hose motion or sticker-like reveals._ · motion tags: Bouncy, Organic, Sharp
- **Elegant** — Sophisticated and refined. — *Refined, graceful* · speed **Slow-medium** · shape **Smooth fades, delicate slides** · color **Muted, monochrome, metallic** · preset **Silk Fade** (Content appears through slow opacity and delicate mask movement.) · surprise: _Almost motionless transitions with tiny refined details._ · motion tags: Fluid, Minimal, Cinematic
- **Warm** — Inviting and cozy. — *Cozy, inviting* · speed **Slow-medium** · shape **Soft expansion, gentle glow** · color **Warm neutrals, amber, cream** · preset **Amber Glow** (Components softly expand while a warm glow fades in.) · surprise: _Cool dusty-blue accent with soft cozy movement._ · motion tags: Soft, Tactile, Organic
- **Fresh** — Clean and rejuvenating. — *Clean, light, renewing* · speed **Medium** · shape **Upward motion, clean wipes** · color **White, mint, aqua, pale green** · preset **Clean Wipe** (Panels reveal through crisp white-space-driven wipes.) · surprise: _Crisp geometric wipe with icy clarity._ · motion tags: Airy, Mechanical, Minimal
- **Bold** — Strong and confident. — *Strong, confident* · speed **Fast-medium** · shape **Hard cuts, large scale, direct motion** · color **High contrast, strong blocks** · preset **Impact Slide** (Large blocks slide in quickly with sharp easing and strong contrast.) · surprise: _Monochrome hard cuts and oversized typography._ · motion tags: Sharp, Explosive, Minimal
- **Nostalgic** — Sentimental and reflective. — *Sentimental, reflective* · speed **Slow** · shape **Film fades, soft jitter, parallax** · color **Faded, grainy, warm muted tones** · preset **Film Memory** (Images fade with grain, slight jitter, and soft parallax.) · surprise: _Pixel-era or early-web transition style._ · motion tags: Organic, Cinematic, Soft
- **Innovative** — Creative and forward-thinking. — *Futuristic, forward-thinking* · speed **Medium-fast** · shape **Morphs, grids, data-like motion** · color **Neon accents, gradients, dark/light tech** · preset **Morph Grid** (Shapes transform between modular grid states.) · surprise: _Warm human tech motion instead of cold neon._ · motion tags: Mechanical, Layered, Sharp
- **Joyful** — Happy and uplifting. — *Happy, uplifting* · speed **Medium-fast** · shape **Bounces, upward arcs, confetti** · color **Bright, sunny, colorful** · preset **Lift Confetti** (Elements rise with bounce and trigger brief colorful particles.) · surprise: _Sophisticated joy with small upward light bursts._ · motion tags: Bouncy, Airy, Explosive
- **Serene** — Tranquil and restful. — *Tranquil, restful* · speed **Very slow** · shape **Floating, breathing, waves** · color **Pale, airy, low saturation** · preset **Breathing Light** (Large soft shapes slowly scale and fade like breathing.) · surprise: _Dark night serenity with slow star-like motion._ · motion tags: Soft, Fluid, Airy, Minimal
- **Adventurous** — Exciting and daring. — *Exciting, daring* · speed **Fast-variable** · shape **Diagonal movement, zooms, swipes** · color **High contrast, outdoor or electric accents** · preset **Trail Zoom** (Content moves diagonally with motion trails and zoom depth.) · surprise: _Slow cinematic exploration instead of constant speed._ · motion tags: Explosive, Layered, Sharp
- **Charming** — Delightful and enchanting. — *Delightful, enchanting* · speed **Medium** · shape **Small surprises, twinkles, soft bounce** · color **Pastel, warm, delicate highlights** · preset **Tiny Spark** (Small twinkles and delicate bounces highlight key moments.) · surprise: _Tiny magical sparkles in a dark elegant palette._ · motion tags: Bouncy, Soft, Airy
- **Authentic** — Genuine and real. — *Genuine, real* · speed **Medium-slow** · shape **Handcrafted, imperfect, tactile** · color **Earthy, muted, textured** · preset **Paper Touch** (Cards slide like paper with slight uneven timing and texture.) · surprise: _Digital authenticity through tactile UI feedback._ · motion tags: Organic, Tactile, Soft
- **Dynamic** — Active and energetic. — *Active, kinetic* · speed **Fast** · shape **Staggered motion, parallax, directional flow** · color **Strong accents, gradients** · preset **Kinetic Stack** (Multiple layers move in staggered parallax.) · surprise: _Layered parallax, restrained colors, precise timing._ · motion tags: Layered, Sharp, Explosive
- **Sophisticated** — Cultured and refined. — *Cultured, refined* · speed **Slow-medium** · shape **Precise, layered, minimal** · color **Deep neutrals, restrained tones** · preset **Editorial Mask** (Typography and images reveal through precise masks.) · surprise: _Subtle glassmorphism, precise grid motion, muted gradients._ · motion tags: Minimal, Cinematic, Mechanical
- **Mysterious** — Intriguing and enigmatic. — *Intriguing, enigmatic* · speed **Slow-variable** · shape **Reveals, shadows, partial opacity** · color **Dark, smoky, low light** · preset **Shadow Reveal** (Content emerges slowly from darkness or blur.) · surprise: _White fog, pale silver, slow disappearing/reappearing forms._ · motion tags: Cinematic, Layered, Fluid
- **Supportive** — Nurturing and encouraging. — *Nurturing, encouraging* · speed **Medium-slow** · shape **Gentle lift, cushioning, soft response** · color **Warm/cool balanced, friendly colors** · preset **Gentle Lift** (Success or guidance states rise softly into view.) · surprise: _Stable blue UI with warm micro-animations and gentle progress motion._ · motion tags: Soft, Tactile, Airy
- **Optimistic** — Positive and hopeful. — *Hopeful, positive* · speed **Medium** · shape **Upward easing, sunrise-like reveals** · color **Bright, warm, airy** · preset **Sunrise Expand** (Radial light or shapes expand upward and outward.) · surprise: _Pale dawn colors, slow upward fades, gentle light expansion._ · motion tags: Airy, Bouncy, Soft
- **Fearless** — Bold and unafraid. — *Bold, unafraid* · speed **Fast** · shape **Impact, zoom, collision, sharp transforms** · color **Red, black, neon, high contrast** · preset **Slash Cut** (Angular masks cut rapidly across the screen.) · surprise: _Black screen, one red line, fast decisive reveal._ · motion tags: Sharp, Explosive, Minimal
- **Reflective** — Thoughtful and introspective. — *Thoughtful, introspective* · speed **Slow** · shape **Loops, ripples, fades, pauses** · color **Muted, deep, contemplative** · preset **Ripple Pause** (Elements fade in with water-like ripples and intentional pauses.) · surprise: _Sepia, cream, slow paper-like transitions._ · motion tags: Soft, Cinematic, Organic
- **Comforting** — Reassuring and warm. — *Reassuring, warm* · speed **Slow-medium** · shape **Soft pulses, rounded easing** · color **Cream, warm beige, soft brown** · preset **Cushion Pulse** (UI softly pulses, expands, and settles warmly.) · surprise: _Cocoa, plum, candlelight gold, slow glowing motion._ · motion tags: Soft, Tactile, Fluid
- **Luxurious** — Rich and indulgent. — *Rich, indulgent* · speed **Slow** · shape **Fluid, cinematic, layered reveals** · color **Deep, metallic, jewel-tone** · preset **Velvet Reveal** (Slow cinematic mask reveal with depth, shadow, and refined highlights.) · surprise: _Warm ivory, no gold, very slow typography reveal, soft shadow movement._ · motion tags: Fluid, Cinematic, Layered, Minimal

## Motion blends (secondary moods)

- **Trustworthy + Innovative** — Stable grid motion with subtle morphs and clean data transitions · _Best for:_ Fintech, SaaS, AI platforms
- **Calm + Serene** — Very slow ambient motion, soft fades, breathing scale · _Best for:_ Meditation, wellness, sleep
- **Elegant + Luxurious** — Cinematic reveals, refined masks, slow parallax · _Best for:_ Fashion, jewelry, hospitality
- **Playful + Joyful** — Bouncy elements, upward arcs, confetti, cheerful timing · _Best for:_ Kids, education, rewards
- **Warm + Comforting** — Soft pulses, rounded expansion, slow glow · _Best for:_ Home, therapy, family brands
- **Bold + Fearless** — Hard cuts, large scale, angular swipes, impact motion · _Best for:_ Sports, streetwear, campaigns
- **Fresh + Optimistic** — Upward reveals, clean wipes, bright airy motion · _Best for:_ Health, productivity, wellness
- **Mysterious + Sophisticated** — Slow masked reveals, shadow depth, restrained parallax · _Best for:_ Editorial, luxury, film
- **Authentic + Nostalgic** — Grain, paper motion, imperfect timing, tactile transitions · _Best for:_ Heritage, artisan, food
- **Adventurous + Dynamic** — Diagonal movement, zooms, parallax, speed variation · _Best for:_ Travel, outdoor, action brands
- **Supportive + Trustworthy** — Predictable motion with gentle feedback and reassuring transitions · _Best for:_ Healthcare, education, finance
- **Reflective + Serene** — Long fades, ripples, pauses, quiet loops · _Best for:_ Journaling, memorials, poetry

## Mood clusters → motion grammar

### calm natural
- **Mood:** Calm
- **Feeling tags:** Calm, Serene, Comforting, Reflective
- **Motion personality tags (merged):** Soft, Fluid, Airy, Minimal, Tactile
- **Motion vibe ids:** `natural_calm`, `__motion_auto__`
- **Timing preset:** `gentle` — **Gentle — slow & soft**
- **Pace in words:** entrance *slow* · between items *relaxed stagger* · bounce *none*
- **What it feels like:** Soft landing: sections float in, nothing snaps or jumps.
- **Optional numbers (for devs):** Entrances often ~0.45–0.9s; stagger ~55–90ms; ease-out.
- **MotionSites kits:** M-delay-fade, M-fade-rise, minimal
- **React Bits (examples):** text: VariableProximity, CircularText, FuzzyText · bg: LineWaves, LiquidEther, Orb · ui: FluidGlass, Lanyard, ProfileCard
- **Magic UI:** Meteors (sparse); Particles (low density); Ripple subtle
- **Kokonut UI:** Aurora-style mesh bg; GlassSurface slow lift; Soft dot loaders
- **Hub ref ids:** tone-to-motion, css-tailwind, motion-react, recipes
- **Guidance:** Hero should feel like atmosphere first: backgrounds drift, type eases in slowly. No bouncy body copy. Use at most one heavy ambient layer.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-all duration-700 ease-out translate-y-2 data-[v=true]:translate-y-0 opacity-0 data-[v=true]:opacity-100
Anime.js: anime({ targets: '.row > *', opacity: [0,1], translateY: [12,0], delay: anime.stagger(65), duration: 750, easing: 'easeOutQuad' })
GSAP: gsap.from('.row > *', { opacity: 0, y: 14, duration: 0.75, ease: 'power2.out', stagger: 0.065 })
```
</details>

<details><summary>CSS patterns</summary>

```css
transition-opacity duration-700 ease-out
transform-gpu translate-y-2 opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100
```
</details>

<details><summary>Anime.js sketches</summary>

```js
anime({ targets: '.row > *', opacity: [0,1], translateY: [12,0], delay: anime.stagger(60), easing: 'easeOutQuad' })
```
</details>

<details><summary>GSAP sketches</summary>

```js
gsap.from('.hero-line', { opacity: 0, y: 16, duration: 0.9, ease: 'power2.out', stagger: 0.07 });
```
</details>

### elegant luxe
- **Mood:** Luxury
- **Feeling tags:** Elegant, Sophisticated, Luxurious, Serene
- **Motion personality tags (merged):** Fluid, Minimal, Cinematic, Mechanical, Layered
- **Motion vibe ids:** `elegant_refined`
- **Timing preset:** `luxury_slow` — **Luxury slow — long & polished**
- **Pace in words:** entrance *slow to very slow* · between items *wide gaps* · bounce *none*
- **What it feels like:** Editorial prestige: fades breathe; no bouncy UI.
- **Optional numbers (for devs):** Entrances ~0.5–1.6s; stagger ~40–120ms; smooth deceleration.
- **MotionSites kits:** M-delay-fade, M-char-cascade, M-media-zoom
- **React Bits (examples):** text: TrueFocus, ShinyText, TextPressure · bg: Iridescence, Prism, Silk · ui: ReflectiveCard, GlassSurface, TiltedCard
- **Magic UI:** BorderBeam hairline; AnimatedShinyText (quiet)
- **Kokonut UI:** Champagne-edge cards; GlassSurface + slow mask
- **Hub ref ids:** tone-to-motion, motion-react, recipes
- **Guidance:** Luxury reads as patience: long, smooth fades and tight layout motion only. Skip rubber-band easing; let gold or metallic accents change opacity—not scale.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] transition-[opacity,transform]
Anime.js: anime({ duration: 1000, easing: 'easeOutCubic', delay: anime.stagger(55) })
GSAP: gsap.from('.line', { opacity: 0, y: 18, duration: 1, ease: 'power3.out', stagger: 0.08 })
```
</details>

<details><summary>CSS patterns</summary>

```css
tracking-tight display; transition-colors duration-500
mask-image linear reveal on headline once
```
</details>

<details><summary>Anime.js sketches</summary>

```js
stagger on lines only; opacity + slight letterSpacing shrink
```
</details>

<details><summary>GSAP sketches</summary>

```js
ScrollTrigger split lines luxury: scrub=false, once:true
```
</details>

### snappy confident
- **Mood:** Energy
- **Feeling tags:** Energetic, Dynamic, Bold, Fresh
- **Motion personality tags (merged):** Explosive, Sharp, Bouncy, Layered, Minimal
- **Motion vibe ids:** `snappy_energetic`
- **Timing preset:** `snappy` — **Snappy — confident & quick**
- **Pace in words:** entrance *fast* · between items *tight* · bounce *none*
- **What it feels like:** Decisive clicks: UI answers immediately, no mush.
- **Optional numbers (for devs):** Entrances ~0.12–0.28s; stagger ~24–45ms.
- **MotionSites kits:** M-button-lift, M-fade-rise, M-horizontal-marquee
- **React Bits (examples):** text: Shuffle, GlitchText, TextCursor · bg: PlasmaWave, Lightning, Hyperspeed · ui: ChromaGrid, Dock, Counter
- **Magic UI:** AnimatedGradient (fast); RippleButton; NumberTicker
- **Kokonut UI:** Particle burst CTA; Neon hover chips; Snappy loaders
- **Hub ref ids:** tone-vibes, css-tailwind, motion-react
- **Guidance:** Feels decisive and quick: small moves, clean stops, tight stagger. Do not add slow scroll drama unless the brand is cinematic.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-200 ease-out active:scale-[0.98]
Anime.js: anime({ duration: 220, easing: 'easeOutCubic', delay: anime.stagger(30) })
GSAP: gsap.defaults({ duration: 0.2, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
transition-transform duration-150 ease-out
active:scale-[0.98]
```
</details>

<details><summary>Anime.js sketches</summary>

```js
anime({ duration: 220, easing: 'easeOutCubic' })
```
</details>

<details><summary>GSAP sketches</summary>

```js
gsap.timeline({ defaults: { duration: 0.18, ease: 'power2.out' } });
```
</details>

### playful bouncy
- **Mood:** Playful
- **Feeling tags:** Playful, Joyful, Charming, Optimistic
- **Motion personality tags (merged):** Bouncy, Organic, Sharp, Airy, Explosive
- **Motion vibe ids:** `playful_bouncy`
- **Timing preset:** `playful` — **Playful — bouncy but controlled**
- **Pace in words:** entrance *medium* · between items *medium* · bounce *light spring on small UI*
- **What it feels like:** Friendly bounce on buttons or mascots; paragraphs stay calm.
- **Optional numbers (for devs):** Entrances ~0.2–0.45s; stagger ~35–60ms; spring on CTAs only.
- **MotionSites kits:** M-char-cascade, M-button-lift, M-horizontal-marquee
- **React Bits (examples):** text: FallingText, RotatingText, CurvedLoop · bg: Ballpit, Balatro, MetaBalls · ui: BounceCards, GooeyNav, BubbleMenu
- **Magic UI:** Confetti (one-shot); RainbowButton
- **Kokonut UI:** Springy cards; Sticker-style hovers
- **Hub ref ids:** animejs, tone-to-motion, tone-vibes
- **Guidance:** Playful = springy chips and buttons only—never the whole page. Pair bouncy UI with calmer backgrounds so it still feels premium.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
Anime.js: anime({ targets: '.cta', translateY: [6,0], duration: 320, easing: 'easeOutBack' })
GSAP: gsap.from('.cta', { y: 8, duration: 0.35, ease: 'back.out(1.4)' })
```
</details>

<details><summary>CSS patterns</summary>

```css
hover:-translate-y-1 transition duration-300
rotate-1 hover:rotate-0 on stickers/cards
```
</details>

<details><summary>Anime.js sketches</summary>

```js
spring-like easing on CTAs; elastic out ≤320ms
```
</details>

<details><summary>GSAP sketches</summary>

```js
gsap.fromTo(btn, { y: 6 }, { y: 0, ease: 'back.out(1.4)', duration: 0.35 });
```
</details>

### cinematic bold
- **Mood:** Cinematic
- **Feeling tags:** Bold, Mysterious, Dynamic, Sophisticated
- **Motion personality tags (merged):** Sharp, Explosive, Minimal, Cinematic, Layered
- **Motion vibe ids:** `cinematic_bold`, `story_scroll`
- **Timing preset:** `cinematic` — **Cinematic — scroll drama**
- **Pace in words:** entrance *slow to medium* · between items *story-driven* · bounce *none*
- **What it feels like:** Hero feels like a trailer: scroll ties to reveals or scrub.
- **Optional numbers (for devs):** Mix 0.4–1.2s UI with optional scroll-linked drivers; one heavy effect only.
- **MotionSites kits:** M-scroll-scrub-video, M-scroll-text-reveal, M-video-raf-loop
- **React Bits (examples):** text: ScrollReveal, ScrollVelocity, DecryptedText · bg: Galaxy, LightPillar, EvilEye · ui: ScrollStack, DomeGallery, FlyingPosters
- **Magic UI:** Globe; Lens + vignette stack
- **Kokonut UI:** Cinematic hero video chrome; Depth fog layers
- **Hub ref ids:** gsap, motion-react, galleries
- **Guidance:** Choose one hero stunt only: either scroll-scrub video or heavy pinned UI—not both. Offer a simple static layout when reduced-motion is on.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: supports-[scroll-timeline]:scroll-fade /* pattern name only — implement per spec */
Anime.js: // tie to scroll: threshold IntersectionObserver + opacity
GSAP: ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: '+=800', scrub: 0.8 })
```
</details>

<details><summary>CSS patterns</summary>

```css
Ken Burns on hero still: scale 1→1.06 over 10–14s
scrim gradient for legibility
```
</details>

<details><summary>Anime.js sketches</summary>

```js
timeline for section reveals; tie to scroll with IntersectionObserver thresholds
```
</details>

<details><summary>GSAP sketches</summary>

```js
ScrollTrigger.create({ scrub: true, pin: optional })
gsap.to(video, { currentTime, ease: 'none' }) scrub
```
</details>

### technical dense
- **Mood:** Clinical
- **Feeling tags:** Trustworthy, Fresh, Calm, Reflective
- **Motion personality tags (merged):** Mechanical, Minimal, Soft, Airy, Fluid
- **Motion vibe ids:** `technical_precise`
- **Timing preset:** `precise` — **Precise & crisp — dashboards / trust**
- **Pace in words:** entrance *fast* · between items *tight* · bounce *none*
- **What it feels like:** Clinical confidence: motion confirms state, never dances.
- **Optional numbers (for devs):** Entrances ~0.12–0.28s; stagger ~12–40ms.
- **MotionSites kits:** M-delay-fade, M-button-lift, minimal
- **React Bits (examples):** text: CountUp, TextType, ASCIIText · bg: DotField, ShapeGrid, GridMotion · ui: Stepper, Folder, ElasticSlider
- **Magic UI:** Terminal typing; DotPattern precision
- **Kokonut UI:** Toolbar micro-motion; Data-dense inputs
- **Hub ref ids:** patterns-json, css-tailwind, prompt-workflow
- **Guidance:** Motion is for state changes (sorted, saved, error)—not decoration behind dense tables. Keep charts readable first.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-colors duration-150 ease-out focus-visible:ring-2
Anime.js: anime({ targets: '.kpi', opacity: [0,1], duration: 200, easing: 'easeOutQuad' })
GSAP: gsap.to('.tab', { '--x': '100%', duration: 0.18, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
transition-colors duration-150
focus-visible:ring-2 ring-offset-2
```
</details>

<details><summary>Anime.js sketches</summary>

```js
numeric counters only where KPI changes
```
</details>

<details><summary>GSAP sketches</summary>

```js
rare; prefer CSS transitions for table row hover
```
</details>

### ambient atmosphere
- **Mood:** Hushed space
- **Feeling tags:** Serene, Calm, Mysterious, Reflective
- **Motion personality tags (merged):** Soft, Fluid, Airy, Minimal, Cinematic
- **Motion vibe ids:** `ambient_light`
- **Timing preset:** `ambient_drift` — **Ambient drift — background leads**
- **Pace in words:** entrance *very slow (BG)* · between items *n/a on UI* · bounce *none*
- **What it feels like:** The room moves, not the words: hero type stays almost static.
- **Optional numbers (for devs):** Background loops 8–24s; UI uses minimal fades only.
- **MotionSites kits:** M-video-raf-loop, M-spotlight-mask, minimal
- **React Bits (examples):** text: GradientText, BlurText · bg: Aurora, Threads, Plasma · ui: FluidGlass, GlassIcons
- **Magic UI:** Slow meteors; Aurora text
- **Kokonut UI:** Gradient mesh paths; Low-FPS ambient loops
- **Hub ref ids:** galleries, tone-to-motion, patterns-json
- **Guidance:** Let the background carry the mood; keep type almost still. Always put a scrim or panel behind text on moving video or gradients.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: @keyframes drift { to { transform: translate3d(-2%,-1%,0) } } .bg { animation: drift 18s linear infinite }
Anime.js: anime({ targets: '.noise', opacity: [0.03,0.08], duration: 8000, direction: 'alternate', loop: true })
GSAP: gsap.to('.gradient', { backgroundPosition: '200% 50%', duration: 20, ease: 'none', repeat: -1 })
```
</details>

<details><summary>CSS patterns</summary>

```css
@keyframes slow-pan { from { transform: translate3d(0,0,0) } to { transform: translate3d(-2%,-1%,0) } }
```
</details>

<details><summary>Anime.js sketches</summary>

```js
loop subtle noise opacity 0.03–0.08
```
</details>

<details><summary>GSAP sketches</summary>

```js
slow yoyo on BG gradient only; UI static
```
</details>

### story narrative
- **Mood:** Story
- **Feeling tags:** Reflective, Adventurous, Sophisticated, Optimistic
- **Motion personality tags (merged):** Soft, Cinematic, Organic, Explosive, Layered
- **Motion vibe ids:** `story_scroll`
- **Timing preset:** `story_flow` — **Story flow — chapter by chapter**
- **Pace in words:** entrance *normal to slow* · between items *clear beats per section* · bounce *none*
- **What it feels like:** Each section gets one clear motion idea, like turning a page.
- **Optional numbers (for devs):** Section reveals ~0.4–0.8s; stagger ~45–80ms.
- **MotionSites kits:** M-scroll-text-reveal, M-fade-rise, M-media-zoom
- **React Bits (examples):** text: ScrollReveal, DecryptedText, SplitText · bg: GradientBlinds, FloatingLines, LineWaves · ui: ScrollStack, Masonry, StaggeredMenu
- **Magic UI:** ScrollProgress; Section reveals
- **Kokonut UI:** Chapter cards tied to scroll; Sticky narrative rail
- **Hub ref ids:** gsap, prompt-workflow, tone-to-motion
- **Guidance:** Tell the story in beats: each section gets one clear motion idea. Change the pattern section-to-section so it does not feel copy-pasted.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: scroll-mt-24 transition-opacity duration-500 data-[in=true]:opacity-100
Anime.js: anime({ targets: 'section h2', opacity: [0,1], translateY: [20,0], delay: anime.stagger(70), easing: 'easeOutQuad' })
GSAP: ScrollTrigger.batch('section', { onEnter: b => gsap.from(b, { opacity: 0, y: 24, stagger: 0.07, duration: 0.55, ease: 'power2.out' }) })
```
</details>

<details><summary>CSS patterns</summary>

```css
section border-t fade-in
sticky chapter numbers opacity tied to scroll
```
</details>

<details><summary>Anime.js sketches</summary>

```js
timeline per section; pause at reduced motion
```
</details>

<details><summary>GSAP sketches</summary>

```js
ScrollTrigger batch for .section h2 once
```
</details>

### dark noir
- **Mood:** Noir
- **Feeling tags:** Mysterious, Bold, Nostalgic, Sophisticated
- **Motion personality tags (merged):** Cinematic, Layered, Fluid, Sharp, Explosive
- **Motion vibe ids:** `cinematic_bold`, `elegant_refined`
- **Timing preset:** `cinematic` — **Cinematic — scroll drama**
- **Pace in words:** entrance *slow to medium* · between items *story-driven* · bounce *none*
- **What it feels like:** Hero feels like a trailer: scroll ties to reveals or scrub.
- **Optional numbers (for devs):** Mix 0.4–1.2s UI with optional scroll-linked drivers; one heavy effect only.
- **MotionSites kits:** M-spotlight-mask, M-scroll-text-reveal, M-video-raf-loop
- **React Bits (examples):** text: TrueFocus, GlitchText, ScrambledText · bg: DarkVeil, LightPillar, Radar · ui: SpotlightCard, ElectricBorder, BorderGlow
- **Magic UI:** SpotlightSection; Vignette stack
- **Kokonut UI:** Noir glow frames; Pointer-follow spotlight
- **Hub ref ids:** motion-react, gsap, galleries
- **Guidance:** Noir is about light vs shadow: use spotlight, vignette, or slow fades—not rainbow gradients. Keep contrast WCAG-safe.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: supports-[scroll-timeline]:scroll-fade /* pattern name only — implement per spec */
Anime.js: // tie to scroll: threshold IntersectionObserver + opacity
GSAP: ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: '+=800', scrub: 0.8 })
```
</details>

<details><summary>CSS patterns</summary>

```css
spotlight radial-gradient following pointer (desktop only)
vignette animate opacity
```
</details>

<details><summary>Anime.js sketches</summary>

```js
fade headline from black
```
</details>

<details><summary>GSAP sketches</summary>

```js
pin short beat on hero quote optional
```
</details>

### retro digital
- **Mood:** Nostalgia
- **Feeling tags:** Nostalgic, Playful, Authentic, Charming
- **Motion personality tags (merged):** Organic, Cinematic, Soft, Bouncy, Sharp
- **Motion vibe ids:** `snappy_energetic`, `playful_bouncy`
- **Timing preset:** `digital_snappy` — **Digital / HUD — sharp & stepped**
- **Pace in words:** entrance *very fast* · between items *tight* · bounce *none (stepped ok)*
- **What it feels like:** Retro tech: glitches and snaps, not soft SaaS fades.
- **Optional numbers (for devs):** Entrances ~0.08–0.26s; stepped or linear easing common.
- **MotionSites kits:** M-horizontal-marquee, M-button-lift
- **React Bits (examples):** text: ASCIIText, GlitchText, ScrambledText · bg: FaultyTerminal, PixelBlast, PixelSnow · ui: PixelCard, Stack
- **Magic UI:** RetroGrid; CRT frame (subtle)
- **Kokonut UI:** CRT bezel kits; 8-bit button chrome
- **Hub ref ids:** tone-vibes, animejs
- **Guidance:** Retro motion can trigger discomfort: keep glitch steps coarse, short, and rare; offer a clean static frame for reduced-motion users.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-150 [transition-timing-function:steps(4,end)]
Anime.js: anime({ duration: 160, easing: 'steps(6)', direction: 'alternate', loop: false })
GSAP: gsap.from('.hud', { opacity: 0, duration: 0.14, stagger: 0.02, ease: 'steps(6)' })
```
</details>

<details><summary>CSS patterns</summary>

```css
image-rendering pixelated on deliberate assets
scanline overlay opacity-10
```
</details>

<details><summary>Anime.js sketches</summary>

```js
RGB split micro jitter on hover only
```
</details>

<details><summary>GSAP sketches</summary>

```js
quick timeline on HUD panels
```
</details>

### luxury jewelry
- **Mood:** Fine jewelry
- **Feeling tags:** Luxurious, Elegant, Sophisticated, Serene
- **Motion personality tags (merged):** Fluid, Cinematic, Layered, Minimal, Mechanical
- **Motion vibe ids:** `elegant_refined`, `natural_calm`
- **Timing preset:** `luxury_slow` — **Luxury slow — long & polished**
- **Pace in words:** entrance *slow to very slow* · between items *wide gaps* · bounce *none*
- **What it feels like:** Editorial prestige: fades breathe; no bouncy UI.
- **Optional numbers (for devs):** Entrances ~0.5–1.6s; stagger ~40–120ms; smooth deceleration.
- **MotionSites kits:** M-media-zoom, M-delay-fade, minimal
- **React Bits (examples):** text: ShinyText, BlurText, TrueFocus · bg: Iridescence, LiquidChrome, Silk · ui: ReflectiveCard, ModelViewer, GlassSurface
- **Magic UI:** ShineBorder; Lens blur stack
- **Kokonut UI:** Jewelry carousel glass; Specular highlights
- **Hub ref ids:** tone-to-motion, motion-react
- **Guidance:** Quiet premium: slow parallax or reflections only—no big bounces. Let materials (glass, metal) do the talking.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] transition-[opacity,transform]
Anime.js: anime({ duration: 1000, easing: 'easeOutCubic', delay: anime.stagger(55) })
GSAP: gsap.from('.line', { opacity: 0, y: 18, duration: 1, ease: 'power3.out', stagger: 0.08 })
```
</details>

<details><summary>CSS patterns</summary>

```css
slow crossfade product stills
subtle scale on hover 1.01
```
</details>

<details><summary>Anime.js sketches</summary>

```js
opacity-only timelines
```
</details>

<details><summary>GSAP sketches</summary>

```js
minimal; optional smooth scrollTo
```
</details>

### wellness spa
- **Mood:** Wellness
- **Feeling tags:** Serene, Calm, Comforting, Optimistic
- **Motion personality tags (merged):** Soft, Fluid, Airy, Minimal, Tactile
- **Motion vibe ids:** `natural_calm`, `ambient_light`
- **Timing preset:** `breathe` — **Breathing — wellness loops**
- **Pace in words:** entrance *slow* · between items *soft rhythm* · bounce *tiny (ambient only)*
- **What it feels like:** Motion mimics breath: slow gradients, gentle loops, calm UI.
- **Optional numbers (for devs):** Loops 4–12s; UI entrances still slow ease-in-out.
- **MotionSites kits:** M-delay-fade, M-video-raf-loop, minimal
- **React Bits (examples):** text: ScrollFloat, GradientText, BlurText · bg: SoftAurora, Waves, Grainient · ui: FluidGlass, DecayCard
- **Magic UI:** Gradient animation (slow); Breathing blur
- **Kokonut UI:** Spa mesh gradients; Breathing loaders
- **Hub ref ids:** css-tailwind, tone-to-motion
- **Guidance:** Should feel like breathing room: long loops, soft fades, no frantic cuts. Do not auto-play loud audio with motion.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: @keyframes breathe { 50% { opacity: 0.92 } } .ambient { animation: breathe 6s ease-in-out infinite }
Anime.js: anime({ targets: '.glow', opacity: [0.85,1], duration: 6000, direction: 'alternate', loop: true, easing: 'easeInOutSine' })
GSAP: gsap.to('.wash', { opacity: 0.92, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
```
</details>

<details><summary>CSS patterns</summary>

```css
slow gradient shift on hero wash
gentle blur on nav scroll
```
</details>

<details><summary>Anime.js sketches</summary>

```js
loop opacity 'breathing' 4–8s on abstract shapes
```
</details>

<details><summary>GSAP sketches</summary>

```js
avoid unless editorial exception
```
</details>

### startup saas
- **Mood:** Tech product
- **Feeling tags:** Trustworthy, Fresh, Innovative, Dynamic
- **Motion personality tags (merged):** Mechanical, Minimal, Soft, Airy, Layered
- **Motion vibe ids:** `technical_precise`, `snappy_energetic`
- **Timing preset:** `product_default` — **Product default — clear & normal**
- **Pace in words:** entrance *normal* · between items *medium stagger* · bounce *none on layout*
- **What it feels like:** SaaS clarity: quick enough to feel alive, slow enough to read.
- **Optional numbers (for devs):** Entrances ~0.15–0.35s; stagger ~30–55ms.
- **MotionSites kits:** M-fade-rise, M-button-lift, M-media-zoom
- **React Bits (examples):** text: TextType, CountUp, DecryptedText · bg: DotGrid, Beams, GridScan · ui: MagicBento, CardSwap, Dock
- **Magic UI:** BentoGrid; Logo marquee
- **Kokonut UI:** Bento feature tiles; Pricing table motion
- **Hub ref ids:** patterns-json, motion-react, css-tailwind
- **Guidance:** Product clarity wins: motion highlights what changed (nav, selection, loaded data), not random decoration.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-shadow duration-300 data-[in=true]:shadow-md
Anime.js: anime({ targets: '.tile', opacity: [0,1], translateY: [10,0], delay: anime.stagger(40), duration: 280, easing: 'easeOutQuad' })
GSAP: gsap.from('.tile', { opacity: 0, y: 12, duration: 0.28, stagger: 0.04, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
bento tiles stagger with animation-delay-*
hover shadow-md
```
</details>

<details><summary>Anime.js sketches</summary>

```js
stagger children on feature grid mount
```
</details>

<details><summary>GSAP sketches</summary>

```js
optional ScrollTrigger for case-study band
```
</details>

### fashion runway
- **Mood:** Runway
- **Feeling tags:** Elegant, Sophisticated, Bold, Luxurious
- **Motion personality tags (merged):** Fluid, Minimal, Cinematic, Mechanical, Sharp
- **Motion vibe ids:** `elegant_refined`, `cinematic_bold`
- **Timing preset:** `editorial_glam` — **Editorial glam — runway pacing**
- **Pace in words:** entrance *medium-slow* · between items *elegant gaps* · bounce *none*
- **What it feels like:** Fashion story: image leads, type enters with poise.
- **Optional numbers (for devs):** Entrances ~0.4–0.9s; stagger ~40–80ms.
- **MotionSites kits:** M-media-zoom, M-scroll-text-reveal, M-horizontal-marquee
- **React Bits (examples):** text: SplitText, ScrollVelocity, ShinyText · bg: ColorBends, RippleGrid, ShapeGrid · ui: FlyingPosters, CircularGallery, CardNav
- **Magic UI:** HeroVideo; TextReveal (mask)
- **Kokonut UI:** Runway carousel; Editorial mask text
- **Hub ref ids:** galleries, motion-react, tone-vibes
- **Guidance:** Fashion is silhouette + crop: motion supports the cut of imagery and type hierarchy, not gimmicks on every line.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-[650ms] ease-out mix-blend-normal
Anime.js: anime({ duration: 700, easing: 'easeOutCubic', delay: anime.stagger(55) })
GSAP: gsap.timeline().from('.hero', { opacity: 0, duration: 0.7 }, 0).from('.k', { y: 20, opacity: 0, stagger: 0.06 }, 0.1)
```
</details>

<details><summary>CSS patterns</summary>

```css
full-bleed image crossfade
thin letterspacing on caps
```
</details>

<details><summary>Anime.js sketches</summary>

```js
split headline lines
```
</details>

<details><summary>GSAP sketches</summary>

```js
horizontal scrub on lookbook optional
```
</details>

### food warmth
- **Mood:** Cozy kitchen
- **Feeling tags:** Warm, Comforting, Authentic, Joyful
- **Motion personality tags (merged):** Soft, Tactile, Organic, Fluid, Bouncy
- **Motion vibe ids:** `natural_calm`, `playful_bouncy`
- **Timing preset:** `warm_friendly` — **Warm & friendly — approachable**
- **Pace in words:** entrance *normal* · between items *comfortable* · bounce *light on buttons only*
- **What it feels like:** Welcoming kitchen energy: lifts and fades, not slick tech.
- **Optional numbers (for devs):** Entrances ~0.25–0.6s; stagger ~40–70ms.
- **MotionSites kits:** M-media-zoom, M-fade-rise, M-video-raf-loop
- **React Bits (examples):** text: CurvedLoop, GradientText · bg: Grainient, Waves, SoftAurora · ui: Masonry, Carousel, ProfileCard
- **Magic UI:** WarmGradient; SoftRipple
- **Kokonut UI:** Recipe card lift; Steam SVG accents
- **Hub ref ids:** galleries, css-tailwind
- **Guidance:** Warm and appetizing: favor gentle color washes or steam-like drift over busy geometric motion.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: hover:-translate-y-0.5 transition-transform duration-300 ease-out
Anime.js: anime({ targets: '.card', translateY: [8,0], opacity: [0,1], delay: anime.stagger(50), duration: 450, easing: 'easeOutQuad' })
GSAP: gsap.from('.card', { y: 10, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
steam-like slow translate on decorative SVG (low amplitude)
```
</details>

<details><summary>Anime.js sketches</summary>

```js
card hover lift on recipe tiles
```
</details>

<details><summary>GSAP sketches</summary>

```js
optional parallax on hero ingredients photo
```
</details>

### finance trust
- **Mood:** Trust
- **Feeling tags:** Trustworthy, Calm, Supportive, Serene
- **Motion personality tags (merged):** Mechanical, Minimal, Soft, Fluid, Airy
- **Motion vibe ids:** `technical_precise`, `elegant_refined`
- **Timing preset:** `precise` — **Precise & crisp — dashboards / trust**
- **Pace in words:** entrance *fast* · between items *tight* · bounce *none*
- **What it feels like:** Clinical confidence: motion confirms state, never dances.
- **Optional numbers (for devs):** Entrances ~0.12–0.28s; stagger ~12–40ms.
- **MotionSites kits:** M-button-lift, M-delay-fade, minimal
- **React Bits (examples):** text: CountUp, TextType, DecryptedText · bg: DotGrid, GridMotion, DotField · ui: Stepper, Counter, PillNav
- **Magic UI:** Minimal borders; Subtle shine
- **Kokonut UI:** Compliance-step motion; Soft success ticks
- **Hub ref ids:** patterns-json, prompt-workflow
- **Guidance:** Banking calm: no gimmicks on pay, transfer, or form flows. Motion is subtle confirmation, always accessible.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-colors duration-150 ease-out focus-visible:ring-2
Anime.js: anime({ targets: '.kpi', opacity: [0,1], duration: 200, easing: 'easeOutQuad' })
GSAP: gsap.to('.tab', { '--x': '100%', duration: 0.18, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
subtle underline grow on links
numeric tabular-nums
```
</details>

<details><summary>Anime.js sketches</summary>

```js
CountUp for KPI with easingOutExpo
```
</details>

<details><summary>GSAP sketches</summary>

```js
charts only if spec demands
```
</details>

### education friendly
- **Mood:** Curious learning
- **Feeling tags:** Playful, Supportive, Optimistic, Joyful, Charming
- **Motion personality tags (merged):** Bouncy, Organic, Sharp, Soft, Tactile
- **Motion vibe ids:** `playful_bouncy`, `technical_precise`
- **Timing preset:** `playful` — **Playful — bouncy but controlled**
- **Pace in words:** entrance *medium* · between items *medium* · bounce *light spring on small UI*
- **What it feels like:** Friendly bounce on buttons or mascots; paragraphs stay calm.
- **Optional numbers (for devs):** Entrances ~0.2–0.45s; stagger ~35–60ms; spring on CTAs only.
- **MotionSites kits:** M-fade-rise, M-button-lift, M-char-cascade
- **React Bits (examples):** text: RotatingText, Shuffle, FallingText · bg: Ballpit, Beams · ui: Stepper, BubbleMenu, PillNav
- **Magic UI:** Confetti on success; Progress shimmer
- **Kokonut UI:** Lesson checklist motion; Playful toasts
- **Hub ref ids:** prompt-workflow, motion-react
- **Guidance:** Celebrate milestones with small bursts, but keep reading and quiz flows visually steady—reward, don’t distract.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
Anime.js: anime({ targets: '.cta', translateY: [6,0], duration: 320, easing: 'easeOutBack' })
GSAP: gsap.from('.cta', { y: 8, duration: 0.35, ease: 'back.out(1.4)' })
```
</details>

<details><summary>CSS patterns</summary>

```css
progress dots animate width
celebrate success micro-bounce
```
</details>

<details><summary>Anime.js sketches</summary>

```js
stagger FAQ open height
```
</details>

<details><summary>GSAP sketches</summary>

```js
optional timeline on lesson steps
```
</details>

### music club
- **Mood:** Night energy
- **Feeling tags:** Energetic, Bold, Dynamic, Fearless, Playful
- **Motion personality tags (merged):** Explosive, Sharp, Bouncy, Minimal, Layered
- **Motion vibe ids:** `snappy_energetic`, `cinematic_bold`
- **Timing preset:** `punchy` — **Punchy — high energy hits**
- **Pace in words:** entrance *very fast* · between items *tight* · bounce *tiny pulses allowed*
- **What it feels like:** Club / sale energy: short hits, strong contrast; still respect a11y.
- **Optional numbers (for devs):** Entrances ~0.1–0.32s; stagger ~16–45ms; cap repeating pulses.
- **MotionSites kits:** M-horizontal-marquee, M-scroll-text-reveal, M-video-raf-loop
- **React Bits (examples):** text: ScrollVelocity, GlitchText, ScrambledText · bg: Hyperspeed, Lightning, Plasma · ui: ElectricBorder, ChromaGrid, Dock
- **Magic UI:** NeonButton; Equalizer bars
- **Kokonut UI:** BPM-reactive glow; Strobe-safe pulses
- **Hub ref ids:** tone-vibes, gsap
- **Guidance:** Club energy without danger: no strobing, cap pulsing frequency, respect reduced-motion with a non-flashing theme.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-150 ease-out motion-safe:animate-pulse motion-reduce:animate-none
Anime.js: anime({ duration: 180, easing: 'easeOutExpo', delay: anime.stagger(22) })
GSAP: gsap.from('.hit', { scale: 0.96, opacity: 0, duration: 0.18, stagger: 0.03, ease: 'power3.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
BPM-sync optional via small script; respect reduced-motion → disable beat
```
</details>

<details><summary>Anime.js sketches</summary>

```js
pulsing glow tied to audio analyser optional (user gesture)
```
</details>

<details><summary>GSAP sketches</summary>

```js
strobe-like effects forbidden—use hue rotate slow instead
```
</details>

### travel wanderlust
- **Mood:** Wanderlust
- **Feeling tags:** Adventurous, Optimistic, Joyful, Fresh, Serene
- **Motion personality tags (merged):** Explosive, Layered, Sharp, Airy, Bouncy
- **Motion vibe ids:** `cinematic_bold`, `story_scroll`, `natural_calm`
- **Timing preset:** `cinematic_wide` — **Cinematic wide — travel / property scale**
- **Pace in words:** entrance *slow* · between items *broad section beats* · bounce *none*
- **What it feels like:** Big vistas: parallax or slow media; type stays readable with scrim.
- **Optional numbers (for devs):** Similar to cinematic; favor parallax BG + one text reveal.
- **MotionSites kits:** M-scroll-scrub-video, M-video-raf-loop, M-scroll-text-reveal
- **React Bits (examples):** text: ScrollReveal, ScrollFloat · bg: Galaxy, FloatingLines, LineWaves · ui: OrbitImages, FlyingPosters, FlowingMenu
- **Magic UI:** Globe; Parallax hero
- **Kokonut UI:** Map path reveals; Horizon wash
- **Hub ref ids:** gsap, galleries, motion-react
- **Guidance:** Big vistas need performance: compress hero media, lazy-load, and keep text legible with scrims—not more motion layers.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transform-gpu will-change-transform
Anime.js: // parallax: map scrollY to translateY on .bg only
GSAP: gsap.to('.bg', { y: -80, ease: 'none', scrollTrigger: { scrub: true, start: 'top bottom', end: 'bottom top' } })
```
</details>

<details><summary>CSS patterns</summary>

```css
parallax on hero background translateY at 0.2–0.35x scroll
```
</details>

<details><summary>Anime.js sketches</summary>

```js
fade sections on enter
```
</details>

<details><summary>GSAP sketches</summary>

```js
ScrollTrigger parallax layers with performance will-change guards
```
</details>

### social proof
- **Mood:** Togetherness
- **Feeling tags:** Trustworthy, Warm, Supportive, Optimistic
- **Motion personality tags (merged):** Mechanical, Minimal, Soft, Tactile, Organic
- **Motion vibe ids:** `snappy_energetic`
- **Timing preset:** `endless_steady` — **Endless steady — logos / tickers**
- **Pace in words:** entrance *slow loop (linear)* · between items *continuous* · bounce *none*
- **What it feels like:** Marquee drift: constant calm motion; pause on hover for accessibility.
- **Optional numbers (for devs):** Loop period often 18–36s linear; UI elsewhere stays crisp.
- **MotionSites kits:** M-horizontal-marquee, M-button-lift
- **React Bits (examples):** text: CurvedLoop, GradientText · bg: DotField, GridMotion, Beams · ui: LogoLoop, InfiniteMenu, Dock
- **Magic UI:** Marquee; Trust strip
- **Kokonut UI:** Logo ticker; Partner rail
- **Hub ref ids:** css-tailwind, recipes
- **Guidance:** Logos drift in a steady loop: pause the strip on hover and for reduced-motion users so people can actually read names.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: @keyframes marquee { to { transform: translateX(-50%) } } .track { animation: marquee 24s linear infinite }
Anime.js: anime({ targets: '.track', translateX: ['0','-50%'], duration: 24000, easing: 'linear', loop: true })
GSAP: gsap.to('.track', { xPercent: -50, ease: 'none', duration: 24, repeat: -1 })
```
</details>

<details><summary>CSS patterns</summary>

```css
infinite marquee logos duplicate row
mask-image linear-gradient edges
```
</details>

<details><summary>Anime.js sketches</summary>

```js
translateX loop
```
</details>

<details><summary>GSAP sketches</summary>

```js
optional seamless loop with modifiers
```
</details>

### minimal brutal
- **Mood:** Stark minimal
- **Feeling tags:** Bold, Fresh, Authentic, Fearless
- **Motion personality tags (merged):** Sharp, Explosive, Minimal, Airy, Mechanical
- **Motion vibe ids:** `technical_precise`, `snappy_energetic`
- **Timing preset:** `snap` — **Snap — brutal / instant**
- **Pace in words:** entrance *instant* · between items *none* · bounce *none*
- **What it feels like:** Brutalist: position jumps, hard shadow moves — no motion blur fluff.
- **Optional numbers (for devs):** Durations ~0.08–0.2s; linear; stagger minimal.
- **MotionSites kits:** minimal, M-button-lift
- **React Bits (examples):** text: ASCIIText, TextType, TextCursor · bg: Dither, GridDistortion, ShapeGrid · ui: PixelCard, Stack, Counter
- **Magic UI:** BrutalistCard; Hard-offset hover
- **Kokonut UI:** Mono stack cards; Snap toggles
- **Hub ref ids:** css-tailwind, patterns-json
- **Guidance:** Brutalist motion snaps into place—hard offsets and shadows—not long soft fades or glassy blur.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-transform duration-100 ease-linear hover:translate-x-0.5 hover:translate-y-0.5
Anime.js: anime.set('.blk', { translateX: 4, translateY: 4 }) /* snap states */
GSAP: gsap.set('.blk', { x: 4, y: 4, duration: 0 })
```
</details>

<details><summary>CSS patterns</summary>

```css
shadow-[4px_4px_0_0_rgb(0,0,0)] hover:translate-x-[2px] hover:translate-y-[2px]
no blur
```
</details>

<details><summary>Anime.js sketches</summary>

```js
rare; snap states
```
</details>

<details><summary>GSAP sketches</summary>

```js
none unless scroll snap spec
```
</details>

### wedding romantic
- **Mood:** Romance
- **Feeling tags:** Elegant, Warm, Charming, Joyful, Luxurious
- **Motion personality tags (merged):** Fluid, Minimal, Cinematic, Soft, Tactile
- **Motion vibe ids:** `elegant_refined`, `natural_calm`
- **Timing preset:** `luxury_slow` — **Luxury slow — long & polished**
- **Pace in words:** entrance *slow to very slow* · between items *wide gaps* · bounce *none*
- **What it feels like:** Editorial prestige: fades breathe; no bouncy UI.
- **Optional numbers (for devs):** Entrances ~0.5–1.6s; stagger ~40–120ms; smooth deceleration.
- **MotionSites kits:** M-delay-fade, M-char-cascade, M-media-zoom
- **React Bits (examples):** text: ShinyText, CurvedLoop, SplitText · bg: Silk, SoftAurora, Threads · ui: FluidGlass, BorderGlow, GlassIcons
- **Magic UI:** SparklesText; SoftBeam
- **Kokonut UI:** Floral divider motion; RSVP modal timeline
- **Hub ref ids:** tone-to-motion, motion-react, galleries
- **Guidance:** Romantic flourishes belong in borders and accents—RSVP, forms, and long copy stay rock steady to read.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] transition-[opacity,transform]
Anime.js: anime({ duration: 1000, easing: 'easeOutCubic', delay: anime.stagger(55) })
GSAP: gsap.from('.line', { opacity: 0, y: 18, duration: 1, ease: 'power3.out', stagger: 0.08 })
```
</details>

<details><summary>CSS patterns</summary>

```css
slow petal-like opacity on dividers
script headings tracking-wide
```
</details>

<details><summary>Anime.js sketches</summary>

```js
gentle float on floral SVG ornaments
```
</details>

<details><summary>GSAP sketches</summary>

```js
optional timeline on RSVP modal only
```
</details>

### real estate drone
- **Mood:** Spacious home
- **Feeling tags:** Sophisticated, Trustworthy, Serene, Luxurious
- **Motion personality tags (merged):** Minimal, Cinematic, Mechanical, Soft, Fluid
- **Motion vibe ids:** `cinematic_bold`, `ambient_light`
- **Timing preset:** `cinematic_wide` — **Cinematic wide — travel / property scale**
- **Pace in words:** entrance *slow* · between items *broad section beats* · bounce *none*
- **What it feels like:** Big vistas: parallax or slow media; type stays readable with scrim.
- **Optional numbers (for devs):** Similar to cinematic; favor parallax BG + one text reveal.
- **MotionSites kits:** M-video-raf-loop, M-scroll-text-reveal, M-fade-rise
- **React Bits (examples):** text: CountUp, ScrollReveal, TextType · bg: GradientBlinds, LightRays, FloatingLines · ui: Carousel, ReflectiveCard, DomeGallery
- **Magic UI:** HeroVideo; Parallax stills
- **Kokonut UI:** Stats scrub bar; Facade Ken Burns
- **Hub ref ids:** gsap, galleries, motion-react
- **Guidance:** Property sites must feel trustworthy: scrim all video text, pick one hero motion story (parallax or reveal—not both fighting).

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transform-gpu will-change-transform
Anime.js: // parallax: map scrollY to translateY on .bg only
GSAP: gsap.to('.bg', { y: -80, ease: 'none', scrollTrigger: { scrub: true, start: 'top bottom', end: 'bottom top' } })
```
</details>

<details><summary>CSS patterns</summary>

```css
Ken Burns on stills
slow parallax on hero facade
```
</details>

<details><summary>Anime.js sketches</summary>

```js
fade stats on scroll into view
```
</details>

<details><summary>GSAP sketches</summary>

```js
ScrollTrigger soft scrub on stats bar optional
```
</details>

### nonprofit hope
- **Mood:** Hopeful cause
- **Feeling tags:** Optimistic, Warm, Supportive, Authentic, Joyful
- **Motion personality tags (merged):** Airy, Bouncy, Soft, Tactile, Organic
- **Motion vibe ids:** `natural_calm`, `story_scroll`
- **Timing preset:** `warm_friendly` — **Warm & friendly — approachable**
- **Pace in words:** entrance *normal* · between items *comfortable* · bounce *light on buttons only*
- **What it feels like:** Welcoming kitchen energy: lifts and fades, not slick tech.
- **Optional numbers (for devs):** Entrances ~0.25–0.6s; stagger ~40–70ms.
- **MotionSites kits:** M-fade-rise, M-button-lift, M-horizontal-marquee
- **React Bits (examples):** text: TextType, GradientText, ScrollFloat · bg: Waves, FloatingLines, Beams · ui: AnimatedList, Stepper, ProfileCard
- **Magic UI:** Donate progress; Hope gradient
- **Kokonut UI:** Impact thermometer; Volunteer stories rail
- **Hub ref ids:** prompt-workflow, css-tailwind, tone-to-motion
- **Guidance:** Grassroots honest: modest fades and small hovers—skip slick corporate gloss that feels off-brand.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: hover:-translate-y-0.5 transition-transform duration-300 ease-out
Anime.js: anime({ targets: '.card', translateY: [8,0], opacity: [0,1], delay: anime.stagger(50), duration: 450, easing: 'easeOutQuad' })
GSAP: gsap.from('.card', { y: 10, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
testimonial cards lift 2px on hover
progress bar width transition
```
</details>

<details><summary>Anime.js sketches</summary>

```js
donation thermometer CountUp
```
</details>

<details><summary>GSAP sketches</summary>

```js
impact section once
```
</details>

### gaming hud
- **Mood:** Game night
- **Feeling tags:** Playful, Energetic, Bold, Dynamic, Fearless
- **Motion personality tags (merged):** Bouncy, Organic, Sharp, Explosive, Minimal
- **Motion vibe ids:** `snappy_energetic`, `playful_bouncy`
- **Timing preset:** `digital_snappy` — **Digital / HUD — sharp & stepped**
- **Pace in words:** entrance *very fast* · between items *tight* · bounce *none (stepped ok)*
- **What it feels like:** Retro tech: glitches and snaps, not soft SaaS fades.
- **Optional numbers (for devs):** Entrances ~0.08–0.26s; stepped or linear easing common.
- **MotionSites kits:** M-horizontal-marquee, M-button-lift, M-char-cascade
- **React Bits (examples):** text: GlitchText, ScrambledText, ASCIIText · bg: FaultyTerminal, Radar, GridScan · ui: ElectricBorder, Dock, ChromaGrid
- **Magic UI:** HUD bars; Cooldown radial
- **Kokonut UI:** Damage pop numbers; Ability radial wipe
- **Hub ref ids:** animejs, tone-vibes, patterns-json
- **Guidance:** HUDs can be busy, but cap particles and glow stacks; on phones default to a calmer, mostly static HUD tier.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-150 [transition-timing-function:steps(4,end)]
Anime.js: anime({ duration: 160, easing: 'steps(6)', direction: 'alternate', loop: false })
GSAP: gsap.from('.hud', { opacity: 0, duration: 0.14, stagger: 0.02, ease: 'steps(6)' })
```
</details>

<details><summary>CSS patterns</summary>

```css
progress segments snap
CRT optional border
```
</details>

<details><summary>Anime.js sketches</summary>

```js
damage numbers pop
```
</details>

<details><summary>GSAP sketches</summary>

```js
timeline on ability cooldown radial wipe
```
</details>

### medical clinical
- **Mood:** Clinical care
- **Feeling tags:** Trustworthy, Calm, Serene, Supportive, Fresh
- **Motion personality tags (merged):** Mechanical, Minimal, Soft, Fluid, Airy
- **Motion vibe ids:** `technical_precise`, `elegant_refined`
- **Timing preset:** `precise` — **Precise & crisp — dashboards / trust**
- **Pace in words:** entrance *fast* · between items *tight* · bounce *none*
- **What it feels like:** Clinical confidence: motion confirms state, never dances.
- **Optional numbers (for devs):** Entrances ~0.12–0.28s; stagger ~12–40ms.
- **MotionSites kits:** minimal, M-delay-fade, M-button-lift
- **React Bits (examples):** text: CountUp, TextType · bg: DotGrid, GridMotion, DotField · ui: Stepper, ElasticSlider, Folder
- **Magic UI:** Clinical tabs; High-vis focus
- **Kokonut UI:** Lab result panels; Accessible loaders
- **Hub ref ids:** patterns-json, css-tailwind
- **Guidance:** Clinical paths stay flat: labs, dosing, results—no bounce or play on critical flows; readability beats delight.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-colors duration-150 ease-out focus-visible:ring-2
Anime.js: anime({ targets: '.kpi', opacity: [0,1], duration: 200, easing: 'easeOutQuad' })
GSAP: gsap.to('.tab', { '--x': '100%', duration: 0.18, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
focus rings high visibility
tab underline slide
```
</details>

<details><summary>Anime.js sketches</summary>

```js
sparse
```
</details>

<details><summary>GSAP sketches</summary>

```js
charts if any
```
</details>

### sustainability earth
- **Mood:** Earth
- **Feeling tags:** Fresh, Authentic, Serene, Warm, Optimistic
- **Motion personality tags (merged):** Airy, Mechanical, Minimal, Organic, Tactile
- **Motion vibe ids:** `natural_calm`, `ambient_light`
- **Timing preset:** `gentle` — **Gentle — slow & soft**
- **Pace in words:** entrance *slow* · between items *relaxed stagger* · bounce *none*
- **What it feels like:** Soft landing: sections float in, nothing snaps or jumps.
- **Optional numbers (for devs):** Entrances often ~0.45–0.9s; stagger ~55–90ms; ease-out.
- **MotionSites kits:** M-fade-rise, M-scroll-text-reveal, M-video-raf-loop
- **React Bits (examples):** text: ScrollFloat, GradientText, CurvedLoop · bg: Waves, FloatingLines, Grainient · ui: MagicBento, FluidGlass, AnimatedList
- **Magic UI:** Globe (slow); Leaf SVG drift
- **Kokonut UI:** Impact timeline scrub; Eco stat cards
- **Hub ref ids:** tone-to-motion, motion-react, galleries
- **Guidance:** Earth-positive pacing: gentle growth metaphors—avoid hyperspeed sci-fi clichés that imply waste or rush.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-all duration-700 ease-out translate-y-2 data-[v=true]:translate-y-0 opacity-0 data-[v=true]:opacity-100
Anime.js: anime({ targets: '.row > *', opacity: [0,1], translateY: [12,0], delay: anime.stagger(65), duration: 750, easing: 'easeOutQuad' })
GSAP: gsap.from('.row > *', { opacity: 0, y: 14, duration: 0.75, ease: 'power2.out', stagger: 0.065 })
```
</details>

<details><summary>CSS patterns</summary>

```css
slow gradient shifts in forest greens
leaf SVG subtle rotate
```
</details>

<details><summary>Anime.js sketches</summary>

```js
timeline on impact metrics once
```
</details>

<details><summary>GSAP sketches</summary>

```js
optional scrub on timeline infographic
```
</details>

### festival poster
- **Mood:** Festival
- **Feeling tags:** Energetic, Playful, Bold, Joyful, Adventurous
- **Motion personality tags (merged):** Explosive, Sharp, Bouncy, Organic, Minimal
- **Motion vibe ids:** `playful_bouncy`, `snappy_energetic`
- **Timing preset:** `playful` — **Playful — bouncy but controlled**
- **Pace in words:** entrance *medium* · between items *medium* · bounce *light spring on small UI*
- **What it feels like:** Friendly bounce on buttons or mascots; paragraphs stay calm.
- **Optional numbers (for devs):** Entrances ~0.2–0.45s; stagger ~35–60ms; spring on CTAs only.
- **MotionSites kits:** M-char-cascade, M-horizontal-marquee, M-button-lift
- **React Bits (examples):** text: Shuffle, FallingText, RotatingText · bg: ColorBends, PrismaticBurst, PlasmaWave · ui: FlyingPosters, ChromaGrid, CardSwap
- **Magic UI:** AnimatedBeam; Poster tilt
- **Kokonut UI:** Lineup grid drop; Date stamp burst
- **Hub ref ids:** tone-vibes, animejs, galleries
- **Guidance:** Festival maximalism still needs a grid: motion never hides date, venue, or price—keep those pinned in clear type.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
Anime.js: anime({ targets: '.cta', translateY: [6,0], duration: 320, easing: 'easeOutBack' })
GSAP: gsap.from('.cta', { y: 8, duration: 0.35, ease: 'back.out(1.4)' })
```
</details>

<details><summary>CSS patterns</summary>

```css
rotate-2 hover:rotate-0 on poster tiles
staggered drop-in
```
</details>

<details><summary>Anime.js sketches</summary>

```js
stagger headline words
```
</details>

<details><summary>GSAP sketches</summary>

```js
short burst timeline on hero date reveal
```
</details>

### museum archive
- **Mood:** Gallery quiet
- **Feeling tags:** Sophisticated, Serene, Reflective, Mysterious, Elegant
- **Motion personality tags (merged):** Minimal, Cinematic, Mechanical, Soft, Fluid
- **Motion vibe ids:** `elegant_refined`, `technical_precise`
- **Timing preset:** `gallery_quiet` — **Gallery quiet — almost static art**
- **Pace in words:** entrance *slow* · between items *sparse* · bounce *none*
- **What it feels like:** Museum: image hover zoom only; captions fade once.
- **Optional numbers (for devs):** Entrances ~0.5–1.0s; stagger ~40–80ms; almost no global motion.
- **MotionSites kits:** M-media-zoom, M-delay-fade, minimal
- **React Bits (examples):** text: TrueFocus, SplitText, BlurText · bg: DarkVeil, Dither, Silk · ui: Masonry, CircularGallery, ModelViewer
- **Magic UI:** Quiet captions; Frame zoom
- **Kokonut UI:** Caption fade; Exhibit drag-scroll
- **Hub ref ids:** motion-react, galleries, patterns-json
- **Guidance:** The art is the star: captions and long labels stay simple; save motion for hover on works or light section reveals.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: group-hover:scale-[1.02] transition-transform duration-700 ease-out
Anime.js: anime({ targets: '.cap', opacity: [0,1], duration: 600, easing: 'easeOutQuad' })
GSAP: gsap.utils.toArray('.piece').forEach((el,i)=>gsap.from(el,{opacity:0,duration:0.6,delay:i*0.05}))
```
</details>

<details><summary>CSS patterns</summary>

```css
image zoom on hover inside frame
caption fade
```
</details>

<details><summary>Anime.js sketches</summary>

```js
rare
```
</details>

<details><summary>GSAP sketches</summary>

```js
optional horizontal drag on digitized scroll exhibit
```
</details>

### sale urgency
- **Mood:** Urgent sale
- **Feeling tags:** Bold, Energetic, Fearless, Dynamic, Optimistic
- **Motion personality tags (merged):** Sharp, Explosive, Minimal, Bouncy, Layered
- **Motion vibe ids:** `snappy_energetic`
- **Timing preset:** `punchy` — **Punchy — high energy hits**
- **Pace in words:** entrance *very fast* · between items *tight* · bounce *tiny pulses allowed*
- **What it feels like:** Club / sale energy: short hits, strong contrast; still respect a11y.
- **Optional numbers (for devs):** Entrances ~0.1–0.32s; stagger ~16–45ms; cap repeating pulses.
- **MotionSites kits:** M-button-lift, M-horizontal-marquee
- **React Bits (examples):** text: CountUp, ScrambledText, Shuffle · bg: Hyperspeed, GridScan · ui: Counter, BorderGlow, ChromaGrid
- **Magic UI:** FlashSale banner; Pulse badge (capped)
- **Kokonut UI:** Countdown strip; Urgency ticker
- **Hub ref ids:** css-tailwind, tone-vibes
- **Guidance:** Sales urgency must stay accessible: countdowns and pulses also have a plain text state—never motion-only deadlines.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: duration-150 ease-out motion-safe:animate-pulse motion-reduce:animate-none
Anime.js: anime({ duration: 180, easing: 'easeOutExpo', delay: anime.stagger(22) })
GSAP: gsap.from('.hit', { scale: 0.96, opacity: 0, duration: 0.18, stagger: 0.03, ease: 'power3.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
pulse opacity on badge max 3 cycles then stop
respect reduced-motion → no pulse
```
</details>

<details><summary>Anime.js sketches</summary>

```js
CountUp to deadline
```
</details>

<details><summary>GSAP sketches</summary>

```js
timeline on banner strip optional
```
</details>

### ai productivity
- **Mood:** Future desk
- **Feeling tags:** Innovative, Fresh, Dynamic, Sophisticated, Trustworthy
- **Motion personality tags (merged):** Mechanical, Layered, Sharp, Airy, Minimal
- **Motion vibe ids:** `technical_precise`, `snappy_energetic`
- **Timing preset:** `precise` — **Precise & crisp — dashboards / trust**
- **Pace in words:** entrance *fast* · between items *tight* · bounce *none*
- **What it feels like:** Clinical confidence: motion confirms state, never dances.
- **Optional numbers (for devs):** Entrances ~0.12–0.28s; stagger ~12–40ms.
- **MotionSites kits:** M-delay-fade, M-button-lift, minimal
- **React Bits (examples):** text: TextType, DecryptedText, TextCursor · bg: DotField, GridMotion, GridScan · ui: Dock, InfiniteMenu, Stepper
- **Magic UI:** TypingIndicator; Skeleton shimmer
- **Kokonut UI:** Token stream list; Copilot chrome
- **Hub ref ids:** prompt-workflow, patterns-json, motion-react
- **Guidance:** Copilot UI: motion shows thinking, streaming tokens, errors, success—never random sparkle while the user waits.

<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>

```text
Tailwind: transition-colors duration-150 ease-out focus-visible:ring-2
Anime.js: anime({ targets: '.kpi', opacity: [0,1], duration: 200, easing: 'easeOutQuad' })
GSAP: gsap.to('.tab', { '--x': '100%', duration: 0.18, ease: 'power2.out' })
```
</details>

<details><summary>CSS patterns</summary>

```css
typing indicator dots opacity stagger
skeleton shimmer low contrast
```
</details>

<details><summary>Anime.js sketches</summary>

```js
token stream opacity stagger
```
</details>

<details><summary>GSAP sketches</summary>

```js
rare; prefer CSS
```
</details>

## Industry → animation hub bias (vibe-prompt-tool)

| industry id | ordered ref ids |
|-------------|-----------------|
| art_design | readme, tone-to-motion, motion-react, galleries, patterns-json |
| photography | readme, galleries, motion-react, css-tailwind, tone-vibes |
| portfolio_cv | readme, prompt-workflow, tone-to-motion, motion-react, galleries |
| fashion_beauty | readme, tone-vibes, galleries, motion-react, animejs |
| fitness_wellness | readme, tone-to-motion, css-tailwind, motion-react, patterns-json |
| food_restaurants | readme, galleries, motion-react, css-tailwind, tone-vibes |
| real_estate_home | readme, galleries, motion-react, gsap, patterns-json |
| travel_tourism | readme, galleries, gsap, motion-react, tone-to-motion |
| weddings_events | readme, tone-to-motion, animejs, motion-react, galleries |
| education | readme, prompt-workflow, motion-react, css-tailwind, patterns-json |
| professional_services | readme, prompt-workflow, tone-to-motion, css-tailwind, motion-react |
| community_nonprofits | readme, prompt-workflow, css-tailwind, motion-react, patterns-json |
| entertainment_media | readme, tone-vibes, gsap, animejs, galleries |
| hobbies_lifestyle | readme, galleries, motion-react, tone-vibes, patterns-json |
| saas_it_services | readme, prompt-workflow, motion-react, css-tailwind, patterns-json |
| ecommerce | readme, galleries, motion-react, css-tailwind, tone-to-motion |
| industrial | readme, prompt-workflow, gsap, motion-react, patterns-json |

## React Bits component index (name + category + hint)

_Truncated in MD — see `mood-to-motion-map.json` → `reactBitsComponentIndex` for full list._
- **AnimatedContent** (Animations) — Scroll once reveal children fade slide
- **Antigravity** (Animations) — Elements float with gentle drift easing
- **BlobCursor** (Animations) — Morphing blob follows cursor softly
- **ClickSpark** (Animations) — Burst sparks on click micro feedback
- **Crosshair** (Animations) — Crosshair reticle tracks pointer focus
- **Cubes** (Animations) — Rotating or stacked cube motif motion
- **ElectricBorder** (Animations) — Animated gradient border glow pulse
- **FadeContent** (Animations) — Simple opacity fade for content blocks
- **GhostCursor** (Animations) — Trailing ghost cursor afterimage effect
- **GlareHover** (Animations) — Diagonal shine sweep on hover cards
- **GradualBlur** (Animations) — Progressive blur mask along axis
- **ImageTrail** (Animations) — Images leave motion trail behind cursor
- **LaserFlow** (Animations) — Laser line sweep energy accent motion
- **LogoLoop** (Animations) — Infinite horizontal ticker logo strip
- **MagicRings** (Animations) — Concentric rings pulse or orbit hero
- **Magnet** (Animations) — Elements pull slightly toward cursor
- **MagnetLines** (Animations) — Field lines bend toward pointer
- **MetaBalls** (Animations) — Gooey metaballs merge and split
- **MetallicPaint** (Animations) — Iridescent metallic sheen on surfaces
- **Noise** (Animations) — Film grain or subtle animated noise
- **OrbitImages** (Animations) — Thumbnails orbit a central focal point
- **PixelTrail** (Animations) — Retro pixel dust trail on move
- **PixelTransition** (Animations) — Blocky pixel dissolve between states
- **Ribbons** (Animations) — Ribbon strands wave or flow backdrop
- **ShapeBlur** (Animations) — Organic blurred shapes drift slowly
- **SplashCursor** (Animations) — Liquid splash ripples from clicks
- **StarBorder** (Animations) — Twinkling star border frame accent
- **StickerPeel** (Animations) — Peelable sticker corner lift reveal
- **TargetCursor** (Animations) — Target rings lock onto cursor motion
- **Aurora** (Backgrounds) — Northern lights gradient shimmer backdrop
- **Balatro** (Backgrounds) — Psychedelic card deck glow atmosphere
- **Ballpit** (Backgrounds) — Bouncy spheres depth parallax field
- **Beams** (Backgrounds) — Light shafts sweep across dark space
- **ColorBends** (Backgrounds) — Smooth color ribbons bend and flow
- **DarkVeil** (Backgrounds) — Soft dark veil vignette over scene
- **Dither** (Backgrounds) — Retro ordered dither texture overlay
- **DotField** (Backgrounds) — Floating dot grid parallax depth
- **DotGrid** (Backgrounds) — Regular dot matrix subtle motion
- **EvilEye** (Backgrounds) — Pupil follows gaze creepy accent
- **FaultyTerminal** (Backgrounds) — CRT scanlines glitch terminal vibe

## Global rules

- Honor prefers-reduced-motion: replace transforms with opacity ≤200ms or static layouts.
- Never pair two high-cost drivers (e.g. scroll-scrub video + heavy WebGL text) without perf tiering.
- Pause infinite marquees on hover and when user prefers reduced motion.

### Pace scale (words, not milliseconds)

- **whisper:** Almost no motion — opacity and 1–2px drift only.
- **slow:** Soft entrances; long ease-out; no bounce on body copy.
- **gentle:** Slow and readable; relaxed stagger between siblings.
- **normal:** Product-default speed: feels alive, still readable.
- **fast:** Snappy UI feedback; short durations; tight stagger.
- **punchy:** High-energy hits; still avoid seizure-like flashing.
- **jump:** Spring / overshoot — reserve for small controls (CTA, chip), never whole-page.
- **steady_loop:** Linear infinite drift (marquees); pause on hover / reduced-motion.
