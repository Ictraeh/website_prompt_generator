/**
 * Builds Mood → Motion map (JSON + Markdown) for Designer's pandora box.
 * Sources: motion-vibes.mjs, animation-ref-presets.mjs, reactbits-name-blurbs.mjs,
 *           MotionSites-style kit vocabulary (aligned with vibe-prompt-tool catalog).
 *
 * Run from repo root:
 *   node scripts/generate-mood-to-motion-map.mjs
 *
 * Override output directory:
 *   MOOD_MAP_DIR="/path/to/Mood to Motion Map" node scripts/generate-mood-to-motion-map.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { motionVibeOptions } from "../motion-vibes.mjs";
import {
  animationRefHubUrl,
  animationRefPresets,
  industryAnimationRefFit,
} from "../animation-ref-presets.mjs";
import { REACTBITS_BLURB_BY_NAME } from "../reactbits-name-blurbs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** Default: repo-local (CI + `npm run build`). Override for Desktop bundle: `MOOD_MAP_DIR=...` */
const defaultOut = path.join(root, "mood-to-motion-map-out");
const outDir = process.env.MOOD_MAP_DIR || defaultOut;

const TEXT_ANIM = new Set([
  "ASCIIText",
  "BlurText",
  "CircularText",
  "CountUp",
  "CurvedLoop",
  "DecryptedText",
  "FallingText",
  "FuzzyText",
  "GlitchText",
  "GradientText",
  "RotatingText",
  "ScrambledText",
  "ScrollFloat",
  "ScrollReveal",
  "ScrollVelocity",
  "ShinyText",
  "Shuffle",
  "SplitText",
  "TextCursor",
  "TextPressure",
  "TextType",
  "TrueFocus",
  "VariableProximity",
]);

const COMPONENTS = new Set([
  "AnimatedList",
  "BorderGlow",
  "BounceCards",
  "BubbleMenu",
  "CardNav",
  "CardSwap",
  "Carousel",
  "ChromaGrid",
  "CircularGallery",
  "Counter",
  "DecayCard",
  "Dock",
  "DomeGallery",
  "ElasticSlider",
  "FlowingMenu",
  "FluidGlass",
  "FlyingPosters",
  "Folder",
  "GlassIcons",
  "GlassSurface",
  "GooeyNav",
  "InfiniteMenu",
  "Lanyard",
  "MagicBento",
  "Masonry",
  "ModelViewer",
  "PillNav",
  "PixelCard",
  "ProfileCard",
  "ReflectiveCard",
  "ScrollStack",
  "SpotlightCard",
  "Stack",
  "StaggeredMenu",
  "Stepper",
  "TiltedCard",
]);

const BACKGROUNDS = new Set([
  "Aurora",
  "Balatro",
  "Ballpit",
  "Beams",
  "ColorBends",
  "DarkVeil",
  "Dither",
  "DotField",
  "DotGrid",
  "EvilEye",
  "FaultyTerminal",
  "FloatingLines",
  "Galaxy",
  "GradientBlinds",
  "Grainient",
  "GridDistortion",
  "GridMotion",
  "GridScan",
  "Hyperspeed",
  "Iridescence",
  "LetterGlitch",
  "Lightning",
  "LightPillar",
  "LightRays",
  "LineWaves",
  "LiquidChrome",
  "LiquidEther",
  "Orb",
  "Particles",
  "PixelBlast",
  "PixelSnow",
  "Plasma",
  "PlasmaWave",
  "Prism",
  "PrismaticBurst",
  "Radar",
  "RippleGrid",
  "ShapeGrid",
  "Silk",
  "SoftAurora",
  "Threads",
  "Waves",
]);

function rbCategory(name) {
  if (TEXT_ANIM.has(name)) return "TextAnimations";
  if (COMPONENTS.has(name)) return "Components";
  if (BACKGROUNDS.has(name)) return "Backgrounds";
  return "Animations";
}

function buildReactBitsIndex() {
  return Object.entries(REACTBITS_BLURB_BY_NAME).map(([name, blurb]) => ({
    name,
    category: rbCategory(name),
    vibeHint: blurb,
    docPath: `https://reactbits.dev/`, // landing; deep paths vary by component
  }));
}

/** External stacks other AIs should cross-read with this map */
const motionLibraries = [
  {
    id: "reactbits",
    label: "React Bits",
    homepage: "https://reactbits.dev/",
    intro: "https://reactbits.dev/get-started/introduction",
    note: "TSX components: Animations, Backgrounds, Components, TextAnimations. Bundled in vibe-prompt-tool Motion snippets.",
  },
  {
    id: "gsap",
    label: "GSAP + ScrollTrigger",
    homepage: "https://gsap.com/",
    scrollTrigger: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
    note: "Scroll-scrub video, pin, timelines; pair with reduced-motion fallbacks.",
  },
  {
    id: "animejs",
    label: "Anime.js",
    homepage: "https://animejs.com/",
    docs: "https://animejs.com/documentation/",
    note: "Lightweight timelines, stagger, springy UI micro-motion.",
  },
  {
    id: "motion_react",
    label: "Motion for React (Framer Motion successor)",
    homepage: "https://motion.dev/",
    note: "useSpring, useScroll, layout animations — common in Magic UI / Kokonut.",
  },
  {
    id: "magicui",
    label: "Magic UI",
    homepage: "https://magicui.design/",
    docs: "https://magicui.design/docs",
    components: "https://magicui.design/docs/components",
    note: "shadcn-style install; many blocks use motion/react + Tailwind.",
  },
  {
    id: "kokonutui",
    label: "Kokonut UI",
    homepage: "https://kokonutui.com/",
    docs: "https://kokonutui.com/docs",
    registryNote: "https://kokonutui.com/r/{name}.json — install via shadcn CLI @kokonutui/*",
    note: "Text effects, loaders, particle buttons, animated backgrounds; Motion + Tailwind v4.",
  },
  {
    id: "aceternity",
    label: "Aceternity UI (reference)",
    homepage: "https://ui.aceternity.com/",
    note: "Not bundled in vibe-prompt-tool; use when prompts name premium landing effects.",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS motion utilities",
    transitions: "https://tailwindcss.com/docs/transition-property",
    animation: "https://tailwindcss.com/docs/animation",
    note: "transition-*, duration-*, translate, opacity — baseline for any stack.",
  },
];

/** MotionSites §8-style kit ids (vibe-prompt-tool catalog) */
const motionSitesKits = [
  {
    id: "M-fade-rise",
    plane: "element",
    energy: "gentle",
    cssSketch: "opacity 0→1; translateY(1rem)→0; ~500–900ms ease-out; stagger with animation-delay",
  },
  {
    id: "M-char-cascade",
    plane: "element",
    energy: "playful",
    cssSketch: "per-char opacity+translateX; ~20–40ms/char; cap total ≤900ms",
  },
  {
    id: "M-delay-fade",
    plane: "element",
    energy: "gentle",
    cssSketch: "opacity only; long ease 800–1200ms; optional delay for calm luxury",
  },
  {
    id: "M-media-zoom",
    plane: "element",
    energy: "gentle",
    cssSketch: "group-hover:scale-[1.02–1.05] overflow-hidden rounded-* duration-500–700",
  },
  {
    id: "M-button-lift",
    plane: "element",
    energy: "gentle",
    cssSketch: "hover:-translate-y-0.5 transition-transform duration-150–220",
  },
  {
    id: "M-scroll-text-reveal",
    plane: "element",
    energy: "playful",
    jsSketch: "motion useScroll + useTransform on per-word opacity, or GSAP ScrollTrigger scrub text",
  },
  {
    id: "M-horizontal-marquee",
    plane: "element",
    energy: "playful",
    cssSketch: "duplicate flex row; animate translateX(-50%) linear infinite; mask edges",
  },
  {
    id: "M-scroll-scrub-video",
    plane: "background",
    energy: "bold",
    jsSketch: "gsap.to(video, { currentTime }) with ScrollTrigger scrub; seek coalescing",
  },
  {
    id: "M-video-raf-loop",
    plane: "background",
    energy: "gentle",
    jsSketch: "requestAnimationFrame near loop end; crossfade two <video> layers optional",
  },
  {
    id: "M-spotlight-mask",
    plane: "background",
    energy: "playful",
    cssSketch: "radial-gradient follows pointer; fallback static gradient on coarse pointers",
  },
  {
    id: "M-spline-bg",
    plane: "background",
    energy: "bold",
    jsSketch: "@splinetool/react-spline lazy; pointer-events-none on canvas vs CTAs",
  },
  {
    id: "minimal",
    plane: "both",
    energy: "gentle",
    note: "Hover/focus only; respect prefers-reduced-motion",
  },
];

/**
 * Human-first timing presets: pick a label, then paste snippets into Tailwind / anime / GSAP.
 * `technicalNote` is optional rough ms for developers who still want numbers.
 */
const TIMING_PRESETS = {
  whisper: {
    pickerLabel: "Whisper — almost still",
    paceInWords: { entrance: "barely there", betweenItems: "very long gaps or none", bounce: "none" },
    whatItFeelsLike: "Like a museum caption appearing: you feel calm, not speed.",
    technicalNote: "Think ~1.0–2.0s fades, almost no movement in px.",
    pasteSnippets: {
      tailwind: `transition-opacity duration-[1200ms] ease-out data-[in=true]:opacity-100`,
      animeJs: `anime({ targets: '.el', opacity: [0, 1], duration: 1200, easing: 'easeOutQuad' })`,
      gsap: `gsap.from('.el', { opacity: 0, y: 8, duration: 1.1, ease: 'power2.out', stagger: 0.1 })`,
    },
  },
  gentle: {
    pickerLabel: "Gentle — slow & soft",
    paceInWords: { entrance: "slow", betweenItems: "relaxed stagger", bounce: "none" },
    whatItFeelsLike: "Soft landing: sections float in, nothing snaps or jumps.",
    technicalNote: "Entrances often ~0.45–0.9s; stagger ~55–90ms; ease-out.",
    pasteSnippets: {
      tailwind: `transition-all duration-700 ease-out translate-y-2 data-[v=true]:translate-y-0 opacity-0 data-[v=true]:opacity-100`,
      animeJs: `anime({ targets: '.row > *', opacity: [0,1], translateY: [12,0], delay: anime.stagger(65), duration: 750, easing: 'easeOutQuad' })`,
      gsap: `gsap.from('.row > *', { opacity: 0, y: 14, duration: 0.75, ease: 'power2.out', stagger: 0.065 })`,
    },
  },
  luxury_slow: {
    pickerLabel: "Luxury slow — long & polished",
    paceInWords: { entrance: "slow to very slow", betweenItems: "wide gaps", bounce: "none" },
    whatItFeelsLike: "Editorial prestige: fades breathe; no bouncy UI.",
    technicalNote: "Entrances ~0.5–1.6s; stagger ~40–120ms; smooth deceleration.",
    pasteSnippets: {
      tailwind: `duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] transition-[opacity,transform]`,
      animeJs: `anime({ duration: 1000, easing: 'easeOutCubic', delay: anime.stagger(55) })`,
      gsap: `gsap.from('.line', { opacity: 0, y: 18, duration: 1, ease: 'power3.out', stagger: 0.08 })`,
    },
  },
  breathe: {
    pickerLabel: "Breathing — wellness loops",
    paceInWords: { entrance: "slow", betweenItems: "soft rhythm", bounce: "tiny (ambient only)" },
    whatItFeelsLike: "Motion mimics breath: slow gradients, gentle loops, calm UI.",
    technicalNote: "Loops 4–12s; UI entrances still slow ease-in-out.",
    pasteSnippets: {
      tailwind: `@keyframes breathe { 50% { opacity: 0.92 } } .ambient { animation: breathe 6s ease-in-out infinite }`,
      animeJs: `anime({ targets: '.glow', opacity: [0.85,1], duration: 6000, direction: 'alternate', loop: true, easing: 'easeInOutSine' })`,
      gsap: `gsap.to('.wash', { opacity: 0.92, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' })`,
    },
  },
  ambient_drift: {
    pickerLabel: "Ambient drift — background leads",
    paceInWords: { entrance: "very slow (BG)", betweenItems: "n/a on UI", bounce: "none" },
    whatItFeelsLike: "The room moves, not the words: hero type stays almost static.",
    technicalNote: "Background loops 8–24s; UI uses minimal fades only.",
    pasteSnippets: {
      tailwind: `@keyframes drift { to { transform: translate3d(-2%,-1%,0) } } .bg { animation: drift 18s linear infinite }`,
      animeJs: `anime({ targets: '.noise', opacity: [0.03,0.08], duration: 8000, direction: 'alternate', loop: true })`,
      gsap: `gsap.to('.gradient', { backgroundPosition: '200% 50%', duration: 20, ease: 'none', repeat: -1 })`,
    },
  },
  story_flow: {
    pickerLabel: "Story flow — chapter by chapter",
    paceInWords: { entrance: "normal to slow", betweenItems: "clear beats per section", bounce: "none" },
    whatItFeelsLike: "Each section gets one clear motion idea, like turning a page.",
    technicalNote: "Section reveals ~0.4–0.8s; stagger ~45–80ms.",
    pasteSnippets: {
      tailwind: `scroll-mt-24 transition-opacity duration-500 data-[in=true]:opacity-100`,
      animeJs: `anime({ targets: 'section h2', opacity: [0,1], translateY: [20,0], delay: anime.stagger(70), easing: 'easeOutQuad' })`,
      gsap: `ScrollTrigger.batch('section', { onEnter: b => gsap.from(b, { opacity: 0, y: 24, stagger: 0.07, duration: 0.55, ease: 'power2.out' }) })`,
    },
  },
  warm_friendly: {
    pickerLabel: "Warm & friendly — approachable",
    paceInWords: { entrance: "normal", betweenItems: "comfortable", bounce: "light on buttons only" },
    whatItFeelsLike: "Welcoming kitchen energy: lifts and fades, not slick tech.",
    technicalNote: "Entrances ~0.25–0.6s; stagger ~40–70ms.",
    pasteSnippets: {
      tailwind: `hover:-translate-y-0.5 transition-transform duration-300 ease-out`,
      animeJs: `anime({ targets: '.card', translateY: [8,0], opacity: [0,1], delay: anime.stagger(50), duration: 450, easing: 'easeOutQuad' })`,
      gsap: `gsap.from('.card', { y: 10, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' })`,
    },
  },
  product_default: {
    pickerLabel: "Product default — clear & normal",
    paceInWords: { entrance: "normal", betweenItems: "medium stagger", bounce: "none on layout" },
    whatItFeelsLike: "SaaS clarity: quick enough to feel alive, slow enough to read.",
    technicalNote: "Entrances ~0.15–0.35s; stagger ~30–55ms.",
    pasteSnippets: {
      tailwind: `transition-shadow duration-300 data-[in=true]:shadow-md`,
      animeJs: `anime({ targets: '.tile', opacity: [0,1], translateY: [10,0], delay: anime.stagger(40), duration: 280, easing: 'easeOutQuad' })`,
      gsap: `gsap.from('.tile', { opacity: 0, y: 12, duration: 0.28, stagger: 0.04, ease: 'power2.out' })`,
    },
  },
  editorial_glam: {
    pickerLabel: "Editorial glam — runway pacing",
    paceInWords: { entrance: "medium-slow", betweenItems: "elegant gaps", bounce: "none" },
    whatItFeelsLike: "Fashion story: image leads, type enters with poise.",
    technicalNote: "Entrances ~0.4–0.9s; stagger ~40–80ms.",
    pasteSnippets: {
      tailwind: `duration-[650ms] ease-out mix-blend-normal`,
      animeJs: `anime({ duration: 700, easing: 'easeOutCubic', delay: anime.stagger(55) })`,
      gsap: `gsap.timeline().from('.hero', { opacity: 0, duration: 0.7 }, 0).from('.k', { y: 20, opacity: 0, stagger: 0.06 }, 0.1)`,
    },
  },
  precise: {
    pickerLabel: "Precise & crisp — dashboards / trust",
    paceInWords: { entrance: "fast", betweenItems: "tight", bounce: "none" },
    whatItFeelsLike: "Clinical confidence: motion confirms state, never dances.",
    technicalNote: "Entrances ~0.12–0.28s; stagger ~12–40ms.",
    pasteSnippets: {
      tailwind: `transition-colors duration-150 ease-out focus-visible:ring-2`,
      animeJs: `anime({ targets: '.kpi', opacity: [0,1], duration: 200, easing: 'easeOutQuad' })`,
      gsap: `gsap.to('.tab', { '--x': '100%', duration: 0.18, ease: 'power2.out' })`,
    },
  },
  snappy: {
    pickerLabel: "Snappy — confident & quick",
    paceInWords: { entrance: "fast", betweenItems: "tight", bounce: "none" },
    whatItFeelsLike: "Decisive clicks: UI answers immediately, no mush.",
    technicalNote: "Entrances ~0.12–0.28s; stagger ~24–45ms.",
    pasteSnippets: {
      tailwind: `duration-200 ease-out active:scale-[0.98]`,
      animeJs: `anime({ duration: 220, easing: 'easeOutCubic', delay: anime.stagger(30) })`,
      gsap: `gsap.defaults({ duration: 0.2, ease: 'power2.out' })`,
    },
  },
  punchy: {
    pickerLabel: "Punchy — high energy hits",
    paceInWords: { entrance: "very fast", betweenItems: "tight", bounce: "tiny pulses allowed" },
    whatItFeelsLike: "Club / sale energy: short hits, strong contrast; still respect a11y.",
    technicalNote: "Entrances ~0.1–0.32s; stagger ~16–45ms; cap repeating pulses.",
    pasteSnippets: {
      tailwind: `duration-150 ease-out motion-safe:animate-pulse motion-reduce:animate-none`,
      animeJs: `anime({ duration: 180, easing: 'easeOutExpo', delay: anime.stagger(22) })`,
      gsap: `gsap.from('.hit', { scale: 0.96, opacity: 0, duration: 0.18, stagger: 0.03, ease: 'power3.out' })`,
    },
  },
  playful: {
    pickerLabel: "Playful — bouncy but controlled",
    paceInWords: { entrance: "medium", betweenItems: "medium", bounce: "light spring on small UI" },
    whatItFeelsLike: "Friendly bounce on buttons or mascots; paragraphs stay calm.",
    technicalNote: "Entrances ~0.2–0.45s; stagger ~35–60ms; spring on CTAs only.",
    pasteSnippets: {
      tailwind: `transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]`,
      animeJs: `anime({ targets: '.cta', translateY: [6,0], duration: 320, easing: 'easeOutBack' })`,
      gsap: `gsap.from('.cta', { y: 8, duration: 0.35, ease: 'back.out(1.4)' })`,
    },
  },
  cinematic: {
    pickerLabel: "Cinematic — scroll drama",
    paceInWords: { entrance: "slow to medium", betweenItems: "story-driven", bounce: "none" },
    whatItFeelsLike: "Hero feels like a trailer: scroll ties to reveals or scrub.",
    technicalNote: "Mix 0.4–1.2s UI with optional scroll-linked drivers; one heavy effect only.",
    pasteSnippets: {
      tailwind: `supports-[scroll-timeline]:scroll-fade /* pattern name only — implement per spec */`,
      animeJs: `// tie to scroll: threshold IntersectionObserver + opacity`,
      gsap: `ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: '+=800', scrub: 0.8 })`,
    },
  },
  cinematic_wide: {
    pickerLabel: "Cinematic wide — travel / property scale",
    paceInWords: { entrance: "slow", betweenItems: "broad section beats", bounce: "none" },
    whatItFeelsLike: "Big vistas: parallax or slow media; type stays readable with scrim.",
    technicalNote: "Similar to cinematic; favor parallax BG + one text reveal.",
    pasteSnippets: {
      tailwind: `transform-gpu will-change-transform`,
      animeJs: `// parallax: map scrollY to translateY on .bg only`,
      gsap: `gsap.to('.bg', { y: -80, ease: 'none', scrollTrigger: { scrub: true, start: 'top bottom', end: 'bottom top' } })`,
    },
  },
  digital_snappy: {
    pickerLabel: "Digital / HUD — sharp & stepped",
    paceInWords: { entrance: "very fast", betweenItems: "tight", bounce: "none (stepped ok)" },
    whatItFeelsLike: "Retro tech: glitches and snaps, not soft SaaS fades.",
    technicalNote: "Entrances ~0.08–0.26s; stepped or linear easing common.",
    pasteSnippets: {
      tailwind: `duration-150 [transition-timing-function:steps(4,end)]`,
      animeJs: `anime({ duration: 160, easing: 'steps(6)', direction: 'alternate', loop: false })`,
      gsap: `gsap.from('.hud', { opacity: 0, duration: 0.14, stagger: 0.02, ease: 'steps(6)' })`,
    },
  },
  snap: {
    pickerLabel: "Snap — brutal / instant",
    paceInWords: { entrance: "instant", betweenItems: "none", bounce: "none" },
    whatItFeelsLike: "Brutalist: position jumps, hard shadow moves — no motion blur fluff.",
    technicalNote: "Durations ~0.08–0.2s; linear; stagger minimal.",
    pasteSnippets: {
      tailwind: `transition-transform duration-100 ease-linear hover:translate-x-0.5 hover:translate-y-0.5`,
      animeJs: `anime.set('.blk', { translateX: 4, translateY: 4 }) /* snap states */`,
      gsap: `gsap.set('.blk', { x: 4, y: 4, duration: 0 })`,
    },
  },
  endless_steady: {
    pickerLabel: "Endless steady — logos / tickers",
    paceInWords: { entrance: "slow loop (linear)", betweenItems: "continuous", bounce: "none" },
    whatItFeelsLike: "Marquee drift: constant calm motion; pause on hover for accessibility.",
    technicalNote: "Loop period often 18–36s linear; UI elsewhere stays crisp.",
    pasteSnippets: {
      tailwind: `@keyframes marquee { to { transform: translateX(-50%) } } .track { animation: marquee 24s linear infinite }`,
      animeJs: `anime({ targets: '.track', translateX: ['0','-50%'], duration: 24000, easing: 'linear', loop: true })`,
      gsap: `gsap.to('.track', { xPercent: -50, ease: 'none', duration: 24, repeat: -1 })`,
    },
  },
  gallery_quiet: {
    pickerLabel: "Gallery quiet — almost static art",
    paceInWords: { entrance: "slow", betweenItems: "sparse", bounce: "none" },
    whatItFeelsLike: "Museum: image hover zoom only; captions fade once.",
    technicalNote: "Entrances ~0.5–1.0s; stagger ~40–80ms; almost no global motion.",
    pasteSnippets: {
      tailwind: `group-hover:scale-[1.02] transition-transform duration-700 ease-out`,
      animeJs: `anime({ targets: '.cap', opacity: [0,1], duration: 600, easing: 'easeOutQuad' })`,
      gsap: `gsap.utils.toArray('.piece').forEach((el,i)=>gsap.from(el,{opacity:0,duration:0.6,delay:i*0.05}))`,
    },
  },
};

/** Each mood cluster id → timing preset (human picker + paste snippets). */
const CLUSTER_TIMING_PRESET = {
  calm_natural: "gentle",
  elegant_luxe: "luxury_slow",
  snappy_confident: "snappy",
  playful_bouncy: "playful",
  cinematic_bold: "cinematic",
  technical_dense: "precise",
  ambient_atmosphere: "ambient_drift",
  story_narrative: "story_flow",
  dark_noir: "cinematic",
  retro_digital: "digital_snappy",
  luxury_jewelry: "luxury_slow",
  wellness_spa: "breathe",
  startup_saas: "product_default",
  fashion_runway: "editorial_glam",
  food_warmth: "warm_friendly",
  finance_trust: "precise",
  education_friendly: "playful",
  music_club: "punchy",
  travel_wanderlust: "cinematic_wide",
  social_proof: "endless_steady",
  minimal_brutal: "snap",
  wedding_romantic: "luxury_slow",
  real_estate_drone: "cinematic_wide",
  nonprofit_hope: "warm_friendly",
  gaming_hud: "digital_snappy",
  medical_clinical: "precise",
  sustainability_earth: "gentle",
  festival_poster: "playful",
  museum_archive: "gallery_quiet",
  sale_urgency: "punchy",
  ai_productivity: "precise",
};

function enrichMoodCluster(row) {
  const presetId = CLUSTER_TIMING_PRESET[row.id];
  if (!presetId || !TIMING_PRESETS[presetId]) {
    throw new Error(`[mood map] Missing CLUSTER_TIMING_PRESET for id="${row.id}"`);
  }
  const preset = TIMING_PRESETS[presetId];
  const { timing, guidanceHuman, ...rest } = row;
  return {
    ...rest,
    motionPersonalityTags: deriveClusterMotionTags(row.feelingTags),
    timing: {
      presetId,
      pickerLabel: preset.pickerLabel,
      paceInWords: preset.paceInWords,
      whatItFeelsLike: preset.whatItFeelsLike,
      technicalNote: preset.technicalNote,
      copyPaste: preset.pasteSnippets,
      legacyMsReference: timing,
    },
    guidanceHuman,
  };
}

/**
 * Canonical feeling tags — each cluster picks a subset via `feelingTags` (ids below).
 * Labels and blurbs are fixed vocabulary for search, chips, and briefs.
 */
const FEELING_TAG_CATALOG = [
  { id: "energetic", label: "Energetic", blurb: "Vibrant and lively." },
  { id: "calm", label: "Calm", blurb: "Peaceful and soothing." },
  { id: "trustworthy", label: "Trustworthy", blurb: "Reliable and stable." },
  { id: "playful", label: "Playful", blurb: "Fun and whimsical." },
  { id: "elegant", label: "Elegant", blurb: "Sophisticated and refined." },
  { id: "warm", label: "Warm", blurb: "Inviting and cozy." },
  { id: "fresh", label: "Fresh", blurb: "Clean and rejuvenating." },
  { id: "bold", label: "Bold", blurb: "Strong and confident." },
  { id: "nostalgic", label: "Nostalgic", blurb: "Sentimental and reflective." },
  { id: "innovative", label: "Innovative", blurb: "Creative and forward-thinking." },
  { id: "joyful", label: "Joyful", blurb: "Happy and uplifting." },
  { id: "serene", label: "Serene", blurb: "Tranquil and restful." },
  { id: "adventurous", label: "Adventurous", blurb: "Exciting and daring." },
  { id: "charming", label: "Charming", blurb: "Delightful and enchanting." },
  { id: "authentic", label: "Authentic", blurb: "Genuine and real." },
  { id: "dynamic", label: "Dynamic", blurb: "Active and energetic." },
  { id: "sophisticated", label: "Sophisticated", blurb: "Cultured and refined." },
  { id: "mysterious", label: "Mysterious", blurb: "Intriguing and enigmatic." },
  { id: "supportive", label: "Supportive", blurb: "Nurturing and encouraging." },
  { id: "optimistic", label: "Optimistic", blurb: "Positive and hopeful." },
  { id: "fearless", label: "Fearless", blurb: "Bold and unafraid." },
  { id: "reflective", label: "Reflective", blurb: "Thoughtful and introspective." },
  { id: "comforting", label: "Comforting", blurb: "Reassuring and warm." },
  { id: "luxurious", label: "Luxurious", blurb: "Rich and indulgent." },
];

/** “Motion ingredients” — how each attribute reads emotionally (spec §1). */
const MOTION_ATTRIBUTE_GUIDE = [
  { attribute: "Speed", controls: "How fast elements move", emotionalImpact: "Fast feels energetic, urgent, bold. Slow feels calm, elegant, reflective." },
  { attribute: "Easing", controls: "How motion accelerates/decelerates", emotionalImpact: "Smooth easing feels natural. Linear feels mechanical. Sharp easing feels confident or aggressive." },
  { attribute: "Rhythm", controls: "Repetition and pacing", emotionalImpact: "Regular rhythm feels stable. Irregular rhythm feels playful, organic, or mysterious." },
  { attribute: "Direction", controls: "Up, down, sideways, circular, diagonal", emotionalImpact: "Upward feels optimistic. Downward feels heavy. Diagonal feels adventurous. Circular feels soft or playful." },
  { attribute: "Scale", controls: "Grow, shrink, pulse, zoom", emotionalImpact: "Expansion feels expressive. Subtle scale feels elegant. Sudden scale feels bold." },
  { attribute: "Shape behavior", controls: "Morphing, bouncing, stretching, snapping", emotionalImpact: "Rounded morphs feel friendly. Angular cuts feel bold or techy. Fluid forms feel calm or luxurious." },
  { attribute: "Opacity", controls: "Fade in/out, reveal, dissolve", emotionalImpact: "Soft fades feel serene. Hard reveals feel bold. Partial opacity feels mysterious." },
  { attribute: "Blur / focus", controls: "Motion blur, depth blur, focus transitions", emotionalImpact: "Blur adds speed, dreaminess, luxury, or mystery depending on use." },
  { attribute: "Color behavior", controls: "Shifts, gradients, flashes, glow", emotionalImpact: "Bright shifts feel joyful. Neon glow feels innovative. Subtle tones feel elegant." },
  { attribute: "Timing density", controls: "Number of animated events at once", emotionalImpact: "Sparse motion feels refined. Dense motion feels energetic, festival-like, or playful." },
];

/** General motion style tags + best feeling-tag matches (spec §2). */
const MOTION_PERSONALITY_TAGS = [
  { id: "soft", label: "Soft", motionStyle: "Slow fades, gentle scale, rounded movement", bestFeelingTagMatches: ["calm", "serene", "comforting", "warm"] },
  { id: "sharp", label: "Sharp", motionStyle: "Fast cuts, snap easing, strong directional motion", bestFeelingTagMatches: ["bold", "fearless", "dynamic", "innovative"] },
  { id: "bouncy", label: "Bouncy", motionStyle: "Elastic easing, overshoot, playful rebounds", bestFeelingTagMatches: ["playful", "joyful", "charming"] },
  { id: "fluid", label: "Fluid", motionStyle: "Morphing shapes, liquid transitions, flowing paths", bestFeelingTagMatches: ["calm", "elegant", "luxurious", "serene"] },
  { id: "mechanical", label: "Mechanical", motionStyle: "Linear paths, precise timing, grid-based movement", bestFeelingTagMatches: ["trustworthy", "innovative", "sophisticated"] },
  { id: "organic", label: "Organic", motionStyle: "Uneven pacing, hand-drawn feel, natural drift", bestFeelingTagMatches: ["authentic", "warm", "nostalgic"] },
  { id: "cinematic", label: "Cinematic", motionStyle: "Slow reveals, depth, shadows, dramatic pacing", bestFeelingTagMatches: ["mysterious", "luxurious", "reflective"] },
  { id: "explosive", label: "Explosive", motionStyle: "Bursts, quick scale, particles, impact", bestFeelingTagMatches: ["energetic", "adventurous", "fearless"] },
  { id: "minimal", label: "Minimal", motionStyle: "Subtle transitions, low movement count", bestFeelingTagMatches: ["elegant", "sophisticated", "trustworthy"] },
  { id: "layered", label: "Layered", motionStyle: "Parallax, staggered reveals, depth shifts", bestFeelingTagMatches: ["innovative", "luxurious", "mysterious"] },
  { id: "airy", label: "Airy", motionStyle: "Light movement, upward drift, soft opacity", bestFeelingTagMatches: ["fresh", "optimistic", "serene"] },
  { id: "tactile", label: "Tactile", motionStyle: "Weight, friction, drag, physical response", bestFeelingTagMatches: ["authentic", "supportive", "comforting"] },
];

/** Per feeling id: overview + practical preset + surprise + motion tag ids (spec §3–4, §8–9). */
const MOOD_FEELING_MOTION_PROFILES = {
  energetic: { motionPersonality: "Vibrant, lively, punchy", speed: "Fast", shapeBehavior: "Bursts, pulses, quick slides", colorTreatment: "Bright, saturated, high contrast", practicalPresetName: "Pulse Burst", practicalPresetDescription: "Elements pop in with scale, emit short particles, then settle quickly.", surpriseDirection: "Dark neon pulses instead of bright rainbow motion.", motionTagIds: ["explosive", "sharp", "bouncy"], timingHint: "Micro 120–350ms; larger 400–700ms; ease-out / elastic / back-out." },
  calm: { motionPersonality: "Peaceful, soothing", speed: "Slow", shapeBehavior: "Smooth drifting, fades, gentle scale", colorTreatment: "Soft, cool, low contrast", practicalPresetName: "Soft Drift", practicalPresetDescription: "Elements fade in while drifting slightly upward or sideways.", surpriseDirection: "Warm desert drift instead of blue water motion.", motionTagIds: ["soft", "fluid", "airy"], timingHint: "600–1400ms; ambient loops 6–20s; ease-in-out / sine-like." },
  trustworthy: { motionPersonality: "Stable, reliable", speed: "Medium-slow", shapeBehavior: "Linear, structured, steady reveals", colorTreatment: "Blue, neutral, clear contrast", practicalPresetName: "Steady Reveal", practicalPresetDescription: "Cards appear in a clean vertical stagger with consistent timing.", surpriseDirection: "Small human micro-bounce in an otherwise stable system.", motionTagIds: ["mechanical", "minimal", "soft"], timingHint: "250–600ms; ease-out / ease-in-out; even stagger steps." },
  playful: { motionPersonality: "Fun, whimsical", speed: "Medium-fast", shapeBehavior: "Bounces, wiggles, squash/stretch", colorTreatment: "Bright, candy, pastel, surprising", practicalPresetName: "Bounce Pop", practicalPresetDescription: "Icons overshoot, squash slightly, then settle with friendly bounce.", surpriseDirection: "Retro rubber-hose motion or sticker-like reveals.", motionTagIds: ["bouncy", "organic", "sharp"], timingHint: "200–700ms; elastic / back-out / spring; slight delay variation." },
  elegant: { motionPersonality: "Refined, graceful", speed: "Slow-medium", shapeBehavior: "Smooth fades, delicate slides", colorTreatment: "Muted, monochrome, metallic", practicalPresetName: "Silk Fade", practicalPresetDescription: "Content appears through slow opacity and delicate mask movement.", surpriseDirection: "Almost motionless transitions with tiny refined details.", motionTagIds: ["fluid", "minimal", "cinematic"], timingHint: "500–1200ms; ease-in-out / slow cubic; few animated elements." },
  warm: { motionPersonality: "Cozy, inviting", speed: "Slow-medium", shapeBehavior: "Soft expansion, gentle glow", colorTreatment: "Warm neutrals, amber, cream", practicalPresetName: "Amber Glow", practicalPresetDescription: "Components softly expand while a warm glow fades in.", surpriseDirection: "Cool dusty-blue accent with soft cozy movement.", motionTagIds: ["soft", "tactile", "organic"], timingHint: "400–900ms; ease-out / soft spring." },
  fresh: { motionPersonality: "Clean, light, renewing", speed: "Medium", shapeBehavior: "Upward motion, clean wipes", colorTreatment: "White, mint, aqua, pale green", practicalPresetName: "Clean Wipe", practicalPresetDescription: "Panels reveal through crisp white-space-driven wipes.", surpriseDirection: "Crisp geometric wipe with icy clarity.", motionTagIds: ["airy", "mechanical", "minimal"], timingHint: "300–700ms; clean ease-out." },
  bold: { motionPersonality: "Strong, confident", speed: "Fast-medium", shapeBehavior: "Hard cuts, large scale, direct motion", colorTreatment: "High contrast, strong blocks", practicalPresetName: "Impact Slide", practicalPresetDescription: "Large blocks slide in quickly with sharp easing and strong contrast.", surpriseDirection: "Monochrome hard cuts and oversized typography.", motionTagIds: ["sharp", "explosive", "minimal"], timingHint: "180–500ms; expo-out / sharp ease-out." },
  nostalgic: { motionPersonality: "Sentimental, reflective", speed: "Slow", shapeBehavior: "Film fades, soft jitter, parallax", colorTreatment: "Faded, grainy, warm muted tones", practicalPresetName: "Film Memory", practicalPresetDescription: "Images fade with grain, slight jitter, and soft parallax.", surpriseDirection: "Pixel-era or early-web transition style.", motionTagIds: ["organic", "cinematic", "soft"], timingHint: "700–1600ms; soft ease-in-out; intentional pauses." },
  innovative: { motionPersonality: "Futuristic, forward-thinking", speed: "Medium-fast", shapeBehavior: "Morphs, grids, data-like motion", colorTreatment: "Neon accents, gradients, dark/light tech", practicalPresetName: "Morph Grid", practicalPresetDescription: "Shapes transform between modular grid states.", surpriseDirection: "Warm human tech motion instead of cold neon.", motionTagIds: ["mechanical", "layered", "sharp"], timingHint: "250–900ms; staggered sequences; designed, not chaotic." },
  joyful: { motionPersonality: "Happy, uplifting", speed: "Medium-fast", shapeBehavior: "Bounces, upward arcs, confetti", colorTreatment: "Bright, sunny, colorful", practicalPresetName: "Lift Confetti", practicalPresetDescription: "Elements rise with bounce and trigger brief colorful particles.", surpriseDirection: "Sophisticated joy with small upward light bursts.", motionTagIds: ["bouncy", "airy", "explosive"], timingHint: "250–800ms; bounce / back-out; brief celebration." },
  serene: { motionPersonality: "Tranquil, restful", speed: "Very slow", shapeBehavior: "Floating, breathing, waves", colorTreatment: "Pale, airy, low saturation", practicalPresetName: "Breathing Light", practicalPresetDescription: "Large soft shapes slowly scale and fade like breathing.", surpriseDirection: "Dark night serenity with slow star-like motion.", motionTagIds: ["soft", "fluid", "airy", "minimal"], timingHint: "1000–2500ms; ambient 10–30s loops; very soft ease-in-out." },
  adventurous: { motionPersonality: "Exciting, daring", speed: "Fast-variable", shapeBehavior: "Diagonal movement, zooms, swipes", colorTreatment: "High contrast, outdoor or electric accents", practicalPresetName: "Trail Zoom", practicalPresetDescription: "Content moves diagonally with motion trails and zoom depth.", surpriseDirection: "Slow cinematic exploration instead of constant speed.", motionTagIds: ["explosive", "layered", "sharp"], timingHint: "250–900ms; variable speed / acceleration." },
  charming: { motionPersonality: "Delightful, enchanting", speed: "Medium", shapeBehavior: "Small surprises, twinkles, soft bounce", colorTreatment: "Pastel, warm, delicate highlights", practicalPresetName: "Tiny Spark", practicalPresetDescription: "Small twinkles and delicate bounces highlight key moments.", surpriseDirection: "Tiny magical sparkles in a dark elegant palette.", motionTagIds: ["bouncy", "soft", "airy"], timingHint: "300–900ms; soft spring / subtle elastic." },
  authentic: { motionPersonality: "Genuine, real", speed: "Medium-slow", shapeBehavior: "Handcrafted, imperfect, tactile", colorTreatment: "Earthy, muted, textured", practicalPresetName: "Paper Touch", practicalPresetDescription: "Cards slide like paper with slight uneven timing and texture.", surpriseDirection: "Digital authenticity through tactile UI feedback.", motionTagIds: ["organic", "tactile", "soft"], timingHint: "400–1000ms; natural ease-out; slight timing variation." },
  dynamic: { motionPersonality: "Active, kinetic", speed: "Fast", shapeBehavior: "Staggered motion, parallax, directional flow", colorTreatment: "Strong accents, gradients", practicalPresetName: "Kinetic Stack", practicalPresetDescription: "Multiple layers move in staggered parallax.", surpriseDirection: "Layered parallax, restrained colors, precise timing.", motionTagIds: ["layered", "sharp", "explosive"], timingHint: "200–700ms; overlapping motion with clear hierarchy." },
  sophisticated: { motionPersonality: "Cultured, refined", speed: "Slow-medium", shapeBehavior: "Precise, layered, minimal", colorTreatment: "Deep neutrals, restrained tones", practicalPresetName: "Editorial Mask", practicalPresetDescription: "Typography and images reveal through precise masks.", surpriseDirection: "Subtle glassmorphism, precise grid motion, muted gradients.", motionTagIds: ["minimal", "cinematic", "mechanical"], timingHint: "500–1300ms; intentional delay; fewer events." },
  mysterious: { motionPersonality: "Intriguing, enigmatic", speed: "Slow-variable", shapeBehavior: "Reveals, shadows, partial opacity", colorTreatment: "Dark, smoky, low light", practicalPresetName: "Shadow Reveal", practicalPresetDescription: "Content emerges slowly from darkness or blur.", surpriseDirection: "White fog, pale silver, slow disappearing/reappearing forms.", motionTagIds: ["cinematic", "layered", "fluid"], timingHint: "700–1800ms; pauses and delayed timing." },
  supportive: { motionPersonality: "Nurturing, encouraging", speed: "Medium-slow", shapeBehavior: "Gentle lift, cushioning, soft response", colorTreatment: "Warm/cool balanced, friendly colors", practicalPresetName: "Gentle Lift", practicalPresetDescription: "Success or guidance states rise softly into view.", surpriseDirection: "Stable blue UI with warm micro-animations and gentle progress motion.", motionTagIds: ["soft", "tactile", "airy"], timingHint: "300–800ms; soft ease-out / gentle spring." },
  optimistic: { motionPersonality: "Hopeful, positive", speed: "Medium", shapeBehavior: "Upward easing, sunrise-like reveals", colorTreatment: "Bright, warm, airy", practicalPresetName: "Sunrise Expand", practicalPresetDescription: "Radial light or shapes expand upward and outward.", surpriseDirection: "Pale dawn colors, slow upward fades, gentle light expansion.", motionTagIds: ["airy", "bouncy", "soft"], timingHint: "350–900ms; ease-out / airy cubic; avoid heavy downward motion." },
  fearless: { motionPersonality: "Bold, unafraid", speed: "Fast", shapeBehavior: "Impact, zoom, collision, sharp transforms", colorTreatment: "Red, black, neon, high contrast", practicalPresetName: "Slash Cut", practicalPresetDescription: "Angular masks cut rapidly across the screen.", surpriseDirection: "Black screen, one red line, fast decisive reveal.", motionTagIds: ["sharp", "explosive", "minimal"], timingHint: "100–450ms; expo-out / snap / hard ease-out." },
  reflective: { motionPersonality: "Thoughtful, introspective", speed: "Slow", shapeBehavior: "Loops, ripples, fades, pauses", colorTreatment: "Muted, deep, contemplative", practicalPresetName: "Ripple Pause", practicalPresetDescription: "Elements fade in with water-like ripples and intentional pauses.", surpriseDirection: "Sepia, cream, slow paper-like transitions.", motionTagIds: ["soft", "cinematic", "organic"], timingHint: "800–2000ms; ease-in-out; pauses matter." },
  comforting: { motionPersonality: "Reassuring, warm", speed: "Slow-medium", shapeBehavior: "Soft pulses, rounded easing", colorTreatment: "Cream, warm beige, soft brown", practicalPresetName: "Cushion Pulse", practicalPresetDescription: "UI softly pulses, expands, and settles warmly.", surpriseDirection: "Cocoa, plum, candlelight gold, slow glowing motion.", motionTagIds: ["soft", "tactile", "fluid"], timingHint: "400–1000ms; ease-out / soft spring." },
  luxurious: { motionPersonality: "Rich, indulgent", speed: "Slow", shapeBehavior: "Fluid, cinematic, layered reveals", colorTreatment: "Deep, metallic, jewel-tone", practicalPresetName: "Velvet Reveal", practicalPresetDescription: "Slow cinematic mask reveal with depth, shadow, and refined highlights.", surpriseDirection: "Warm ivory, no gold, very slow typography reveal, soft shadow movement.", motionTagIds: ["fluid", "cinematic", "layered", "minimal"], timingHint: "700–1800ms; slow cubic ease-in-out; premium delay." },
};

function deriveClusterMotionTags(feelingTagIds) {
  const order = [];
  const seen = new Set();
  for (const fid of feelingTagIds || []) {
    const p = MOOD_FEELING_MOTION_PROFILES[fid];
    if (!p?.motionTagIds) continue;
    for (const t of p.motionTagIds) {
      if (!seen.has(t)) {
        seen.add(t);
        order.push(t);
      }
    }
  }
  return order.slice(0, 5);
}

const MOTION_FEATURE_SCHEMA = {
  speed: "slow | medium | fast | variable",
  easing: "linear | easeOut | easeInOut | spring | elastic | bounce | expo | custom",
  rhythm: "regular | staggered | irregular | ambient | explosive",
  direction: "up | down | horizontal | diagonal | circular | radial | random | layered",
  scaleBehavior: "none | subtle | pulse | zoom | overshoot | breathing",
  opacityBehavior: "none | fade | dissolve | reveal | flicker",
  shapeBehavior: "rigid | rounded | morphing | liquid | angular | organic | tactile",
  contrastBehavior: "low | medium | high | dramatic",
  colorBehavior: "static | gradualShift | flash | glow | gradient | neon",
  density: "minimal | moderate | dense | maximal",
  texture: "clean | grainy | glossy | paper | glass | metallic",
  timingConfidence: "predictable | playful | cinematic | chaotic",
};

const MOOD_SCORE_EXAMPLES = {
  energetic: {
    speed: ["fast", "variable"],
    easing: ["spring", "elastic", "expo", "easeOut"],
    rhythm: ["staggered", "explosive"],
    direction: ["diagonal", "radial", "horizontal"],
    shapeBehavior: ["pulse", "burst", "overshoot"],
    colorBehavior: ["flash", "glow", "neon", "highSaturation"],
    density: ["moderate", "dense"],
    penalty: ["verySlow", "lowContrast", "longFadeOnly"],
  },
  calm: {
    speed: ["slow"],
    easing: ["easeInOut", "softCubic"],
    rhythm: ["ambient", "regular"],
    direction: ["horizontal", "verticalDrift", "circular"],
    shapeBehavior: ["rounded", "liquid", "breathing"],
    opacityBehavior: ["fade", "dissolve"],
    colorBehavior: ["gradualShift", "softGradient"],
    density: ["minimal", "moderate"],
    penalty: ["sharpSnap", "flash", "chaoticRhythm", "highSpeed"],
  },
  trustworthy: {
    speed: ["medium", "mediumSlow"],
    easing: ["easeOut", "easeInOut"],
    rhythm: ["regular", "predictable"],
    direction: ["horizontal", "vertical", "gridBased"],
    shapeBehavior: ["rigid", "structured", "minimal"],
    opacityBehavior: ["fade", "cleanReveal"],
    density: ["minimal", "moderate"],
    bonus: ["consistentTiming", "clearHierarchy", "stableLayout"],
    penalty: ["randomMotion", "excessiveBounce", "flashyEffects"],
  },
  luxurious: {
    speed: ["slow", "mediumSlow"],
    easing: ["easeInOut", "slowCubic"],
    rhythm: ["cinematic", "layered"],
    direction: ["vertical", "parallax", "maskedReveal"],
    shapeBehavior: ["fluid", "smooth", "refined"],
    opacityBehavior: ["fade", "softReveal"],
    colorBehavior: ["metallic", "deepGradient", "controlledGlow"],
    density: ["minimal", "moderate"],
    bonus: ["depth", "shadow", "premiumDelay", "lowColorNoise"],
    penalty: ["cartoonBounce", "chaoticTiming", "overlyFastTransitions"],
  },
};

const MOTION_BLENDS = [
  { blend: "Trustworthy + Innovative", motionDirection: "Stable grid motion with subtle morphs and clean data transitions", bestFor: "Fintech, SaaS, AI platforms" },
  { blend: "Calm + Serene", motionDirection: "Very slow ambient motion, soft fades, breathing scale", bestFor: "Meditation, wellness, sleep" },
  { blend: "Elegant + Luxurious", motionDirection: "Cinematic reveals, refined masks, slow parallax", bestFor: "Fashion, jewelry, hospitality" },
  { blend: "Playful + Joyful", motionDirection: "Bouncy elements, upward arcs, confetti, cheerful timing", bestFor: "Kids, education, rewards" },
  { blend: "Warm + Comforting", motionDirection: "Soft pulses, rounded expansion, slow glow", bestFor: "Home, therapy, family brands" },
  { blend: "Bold + Fearless", motionDirection: "Hard cuts, large scale, angular swipes, impact motion", bestFor: "Sports, streetwear, campaigns" },
  { blend: "Fresh + Optimistic", motionDirection: "Upward reveals, clean wipes, bright airy motion", bestFor: "Health, productivity, wellness" },
  { blend: "Mysterious + Sophisticated", motionDirection: "Slow masked reveals, shadow depth, restrained parallax", bestFor: "Editorial, luxury, film" },
  { blend: "Authentic + Nostalgic", motionDirection: "Grain, paper motion, imperfect timing, tactile transitions", bestFor: "Heritage, artisan, food" },
  { blend: "Adventurous + Dynamic", motionDirection: "Diagonal movement, zooms, parallax, speed variation", bestFor: "Travel, outdoor, action brands" },
  { blend: "Supportive + Trustworthy", motionDirection: "Predictable motion with gentle feedback and reassuring transitions", bestFor: "Healthcare, education, finance" },
  { blend: "Reflective + Serene", motionDirection: "Long fades, ripples, pauses, quiet loops", bestFor: "Journaling, memorials, poetry" },
];

const SURPRISE_BY_FEELING = [
  { feelingId: "energetic", safeRelated: ["dynamic", "bold", "joyful"], surpriseDirection: "Dark neon pulses instead of bright rainbow motion." },
  { feelingId: "calm", safeRelated: ["serene", "fresh", "comforting"], surpriseDirection: "Warm desert drift instead of blue water motion." },
  { feelingId: "trustworthy", safeRelated: ["supportive", "sophisticated", "innovative"], surpriseDirection: "Small human micro-bounce in an otherwise stable system." },
  { feelingId: "playful", safeRelated: ["joyful", "charming", "energetic"], surpriseDirection: "Retro rubber-hose motion or sticker-like reveals." },
  { feelingId: "elegant", safeRelated: ["sophisticated", "luxurious", "calm"], surpriseDirection: "Almost motionless transitions with tiny refined details." },
  { feelingId: "warm", safeRelated: ["comforting", "authentic", "nostalgic"], surpriseDirection: "Cool dusty-blue accent with soft cozy movement." },
  { feelingId: "fresh", safeRelated: ["optimistic", "calm", "serene"], surpriseDirection: "Crisp geometric wipe with icy clarity." },
  { feelingId: "bold", safeRelated: ["fearless", "dynamic", "energetic"], surpriseDirection: "Monochrome hard cuts and oversized typography." },
  { feelingId: "nostalgic", safeRelated: ["reflective", "authentic", "warm"], surpriseDirection: "Pixel-era or early-web transition style." },
  { feelingId: "innovative", safeRelated: ["dynamic", "fresh", "trustworthy"], surpriseDirection: "Warm human tech motion instead of cold neon." },
  { feelingId: "joyful", safeRelated: ["playful", "optimistic", "charming"], surpriseDirection: "Sophisticated joy with small upward light bursts." },
  { feelingId: "serene", safeRelated: ["calm", "reflective", "comforting"], surpriseDirection: "Dark night serenity with slow star-like motion." },
  { feelingId: "adventurous", safeRelated: ["dynamic", "fearless", "optimistic"], surpriseDirection: "Slow cinematic exploration instead of constant speed." },
  { feelingId: "charming", safeRelated: ["playful", "joyful", "elegant"], surpriseDirection: "Tiny magical sparkles in a dark elegant palette." },
  { feelingId: "authentic", safeRelated: ["warm", "nostalgic", "supportive"], surpriseDirection: "Digital authenticity through tactile UI feedback." },
  { feelingId: "dynamic", safeRelated: ["energetic", "innovative", "adventurous"], surpriseDirection: "Refined kinetic layout with minimal color." },
  { feelingId: "sophisticated", safeRelated: ["elegant", "luxurious", "trustworthy"], surpriseDirection: "Subtle tech grid motion with editorial restraint." },
  { feelingId: "mysterious", safeRelated: ["reflective", "luxurious", "sophisticated"], surpriseDirection: "Bright foggy mystery instead of dark noir." },
  { feelingId: "supportive", safeRelated: ["comforting", "trustworthy", "warm"], surpriseDirection: "Professional support with soft green progress motion." },
  { feelingId: "optimistic", safeRelated: ["joyful", "fresh", "supportive"], surpriseDirection: "Quiet dawn-like reveal instead of cheerful bounce." },
  { feelingId: "fearless", safeRelated: ["bold", "adventurous", "energetic"], surpriseDirection: "Silent dramatic reveal with one decisive motion." },
  { feelingId: "reflective", safeRelated: ["serene", "nostalgic", "mysterious"], surpriseDirection: "Warm paper-like introspection." },
  { feelingId: "comforting", safeRelated: ["warm", "supportive", "calm"], surpriseDirection: "Deep candlelit palette with slow glow." },
  { feelingId: "luxurious", safeRelated: ["elegant", "sophisticated", "mysterious"], surpriseDirection: "Minimal ivory luxury without metallic effects." },
];

const MOTION_MOOD_ENGINE = {
  analyze: [
    "speed",
    "easing",
    "rhythm",
    "direction",
    "scale behavior",
    "opacity behavior",
    "shape behavior",
    "color behavior",
    "contrast",
    "density",
    "texture",
    "interaction feedback",
  ],
  scoreMoodBy: [
    "motion intensity",
    "timing softness",
    "predictability",
    "shape personality",
    "visual density",
    "directional symbolism",
    "color-motion relationship",
    "industry expectation",
    "surprise potential",
  ],
  output: [
    "primary mood",
    "secondary mood",
    "motion tags",
    "recommended animation presets",
    "timing range",
    "easing style",
    "shape behavior",
    "color behavior",
    "industry fit",
    "surprise variant",
  ],
  philosophy:
    "Motion mood is created by how movement feels, not only how fast it moves. Speed, easing, rhythm, shape, color, and timing work together to create emotional character. Motion should behave the way the mood would move if it had a body.",
};

/**
 * Expanded mood → execution map (feeling tags + moodTitle → motion grammar).
 * Each row links to motion vibe ids, hub refs, stacks, and concrete patterns.
 * `motionPersonalityTags` (in JSON) merges motion-tag vocabulary from each cluster’s feeling tags.
 */
const moodClusters = [
  {
    id: "calm_natural",
    moodTitle: "Calm",
    feelingTags: ["calm", "serene", "comforting", "reflective"],
    motionVibeIds: ["natural_calm", "__motion_auto__"],
    timing: { durationMs: [450, 900], staggerMs: [55, 90], easing: ["ease-out", "cubic-bezier(0.22,1,0.36,1)"] },
    css: [
      "transition-opacity duration-700 ease-out",
      "transform-gpu translate-y-2 opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100",
    ],
    animeJs: ["anime({ targets: '.row > *', opacity: [0,1], translateY: [12,0], delay: anime.stagger(60), easing: 'easeOutQuad' })"],
    gsap: ["gsap.from('.hero-line', { opacity: 0, y: 16, duration: 0.9, ease: 'power2.out', stagger: 0.07 });"],
    motionSitesKits: ["M-delay-fade", "M-fade-rise", "minimal"],
    reactBits: { text: ["VariableProximity", "CircularText", "FuzzyText"], bg: ["LineWaves", "LiquidEther", "Orb"], ui: ["FluidGlass", "Lanyard", "ProfileCard"] },
    magicUi: ["Meteors (sparse)", "Particles (low density)", "Ripple subtle"],
    kokonut: ["Aurora-style mesh bg", "GlassSurface slow lift", "Soft dot loaders"],
    animationHubRefIds: ["tone-to-motion", "css-tailwind", "motion-react", "recipes"],
    guidanceHuman:
      "Hero should feel like atmosphere first: backgrounds drift, type eases in slowly. No bouncy body copy. Use at most one heavy ambient layer.",
  },
  {
    id: "elegant_luxe",
    moodTitle: "Luxury",
    feelingTags: ["elegant", "sophisticated", "luxurious", "serene"],
    motionVibeIds: ["elegant_refined"],
    timing: { durationMs: [500, 1100], staggerMs: [40, 70], easing: ["cubic-bezier(0.16,1,0.3,1)"] },
    css: ["tracking-tight display; transition-colors duration-500", "mask-image linear reveal on headline once"],
    animeJs: ["stagger on lines only; opacity + slight letterSpacing shrink"],
    gsap: ["ScrollTrigger split lines luxury: scrub=false, once:true"],
    motionSitesKits: ["M-delay-fade", "M-char-cascade", "M-media-zoom"],
    reactBits: { text: ["TrueFocus", "ShinyText", "TextPressure"], bg: ["Iridescence", "Prism", "Silk"], ui: ["ReflectiveCard", "GlassSurface", "TiltedCard"] },
    magicUi: ["BorderBeam hairline", "AnimatedShinyText (quiet)"],
    kokonut: ["Champagne-edge cards", "GlassSurface + slow mask"],
    animationHubRefIds: ["tone-to-motion", "motion-react", "recipes"],
    guidanceHuman:
      "Luxury reads as patience: long, smooth fades and tight layout motion only. Skip rubber-band easing; let gold or metallic accents change opacity—not scale.",
  },
  {
    id: "snappy_confident",
    moodTitle: "Energy",
    feelingTags: ["energetic", "dynamic", "bold", "fresh"],
    motionVibeIds: ["snappy_energetic"],
    timing: { durationMs: [120, 280], staggerMs: [24, 45], easing: ["cubic-bezier(0.4,0,0.2,1)"] },
    css: ["transition-transform duration-150 ease-out", "active:scale-[0.98]"],
    animeJs: ["anime({ duration: 220, easing: 'easeOutCubic' })"],
    gsap: ["gsap.timeline({ defaults: { duration: 0.18, ease: 'power2.out' } });"],
    motionSitesKits: ["M-button-lift", "M-fade-rise", "M-horizontal-marquee"],
    reactBits: { text: ["Shuffle", "GlitchText", "TextCursor"], bg: ["PlasmaWave", "Lightning", "Hyperspeed"], ui: ["ChromaGrid", "Dock", "Counter"] },
    magicUi: ["AnimatedGradient (fast)", "RippleButton", "NumberTicker"],
    kokonut: ["Particle burst CTA", "Neon hover chips", "Snappy loaders"],
    animationHubRefIds: ["tone-vibes", "css-tailwind", "motion-react"],
    guidanceHuman:
      "Feels decisive and quick: small moves, clean stops, tight stagger. Do not add slow scroll drama unless the brand is cinematic.",
  },
  {
    id: "playful_bouncy",
    moodTitle: "Playful",
    feelingTags: ["playful", "joyful", "charming", "optimistic"],
    motionVibeIds: ["playful_bouncy"],
    timing: { durationMs: [200, 420], staggerMs: [35, 60], easing: ["cubic-bezier(0.34,1.56,0.64,1)"] },
    css: ["hover:-translate-y-1 transition duration-300", "rotate-1 hover:rotate-0 on stickers/cards"],
    animeJs: ["spring-like easing on CTAs; elastic out ≤320ms"],
    gsap: ["gsap.fromTo(btn, { y: 6 }, { y: 0, ease: 'back.out(1.4)', duration: 0.35 });"],
    motionSitesKits: ["M-char-cascade", "M-button-lift", "M-horizontal-marquee"],
    reactBits: { text: ["FallingText", "RotatingText", "CurvedLoop"], bg: ["Ballpit", "Balatro", "MetaBalls"], ui: ["BounceCards", "GooeyNav", "BubbleMenu"] },
    magicUi: ["Confetti (one-shot)", "RainbowButton"],
    kokonut: ["Springy cards", "Sticker-style hovers"],
    animationHubRefIds: ["animejs", "tone-to-motion", "tone-vibes"],
    guidanceHuman:
      "Playful = springy chips and buttons only—never the whole page. Pair bouncy UI with calmer backgrounds so it still feels premium.",
  },
  {
    id: "cinematic_bold",
    moodTitle: "Cinematic",
    feelingTags: ["bold", "mysterious", "dynamic", "sophisticated"],
    motionVibeIds: ["cinematic_bold", "story_scroll"],
    timing: { durationMs: [400, 1200], staggerMs: [50, 90], easing: ["power2.inOut", "power3.out"] },
    css: ["Ken Burns on hero still: scale 1→1.06 over 10–14s", "scrim gradient for legibility"],
    animeJs: ["timeline for section reveals; tie to scroll with IntersectionObserver thresholds"],
    gsap: ["ScrollTrigger.create({ scrub: true, pin: optional })", "gsap.to(video, { currentTime, ease: 'none' }) scrub"],
    motionSitesKits: ["M-scroll-scrub-video", "M-scroll-text-reveal", "M-video-raf-loop"],
    reactBits: { text: ["ScrollReveal", "ScrollVelocity", "DecryptedText"], bg: ["Galaxy", "LightPillar", "EvilEye"], ui: ["ScrollStack", "DomeGallery", "FlyingPosters"] },
    magicUi: ["Globe", "Lens + vignette stack"],
    kokonut: ["Cinematic hero video chrome", "Depth fog layers"],
    animationHubRefIds: ["gsap", "motion-react", "galleries"],
    guidanceHuman:
      "Choose one hero stunt only: either scroll-scrub video or heavy pinned UI—not both. Offer a simple static layout when reduced-motion is on.",
  },
  {
    id: "technical_dense",
    moodTitle: "Clinical",
    feelingTags: ["trustworthy", "fresh", "calm", "reflective"],
    motionVibeIds: ["technical_precise"],
    timing: { durationMs: [90, 220], staggerMs: [12, 28], easing: ["linear", "ease"] },
    css: ["transition-colors duration-150", "focus-visible:ring-2 ring-offset-2"],
    animeJs: ["numeric counters only where KPI changes"],
    gsap: ["rare; prefer CSS transitions for table row hover"],
    motionSitesKits: ["M-delay-fade", "M-button-lift", "minimal"],
    reactBits: { text: ["CountUp", "TextType", "ASCIIText"], bg: ["DotField", "ShapeGrid", "GridMotion"], ui: ["Stepper", "Folder", "ElasticSlider"] },
    magicUi: ["Terminal typing", "DotPattern precision"],
    kokonut: ["Toolbar micro-motion", "Data-dense inputs"],
    animationHubRefIds: ["patterns-json", "css-tailwind", "prompt-workflow"],
    guidanceHuman:
      "Motion is for state changes (sorted, saved, error)—not decoration behind dense tables. Keep charts readable first.",
  },
  {
    id: "ambient_atmosphere",
    moodTitle: "Hushed space",
    feelingTags: ["serene", "calm", "mysterious", "reflective"],
    motionVibeIds: ["ambient_light"],
    timing: { durationMs: [8000, 24000], staggerMs: [0, 0], easing: ["linear"] },
    css: ["@keyframes slow-pan { from { transform: translate3d(0,0,0) } to { transform: translate3d(-2%,-1%,0) } }"],
    animeJs: ["loop subtle noise opacity 0.03–0.08"],
    gsap: ["slow yoyo on BG gradient only; UI static"],
    motionSitesKits: ["M-video-raf-loop", "M-spotlight-mask", "minimal"],
    reactBits: { text: ["GradientText", "BlurText"], bg: ["Aurora", "Threads", "Plasma"], ui: ["FluidGlass", "GlassIcons"] },
    magicUi: ["Slow meteors", "Aurora text"],
    kokonut: ["Gradient mesh paths", "Low-FPS ambient loops"],
    animationHubRefIds: ["galleries", "tone-to-motion", "patterns-json"],
    guidanceHuman:
      "Let the background carry the mood; keep type almost still. Always put a scrim or panel behind text on moving video or gradients.",
  },
  {
    id: "story_narrative",
    moodTitle: "Story",
    feelingTags: ["reflective", "adventurous", "sophisticated", "optimistic"],
    motionVibeIds: ["story_scroll"],
    timing: { durationMs: [400, 800], staggerMs: [45, 80], easing: ["easeOut"] },
    css: ["section border-t fade-in", "sticky chapter numbers opacity tied to scroll"],
    animeJs: ["timeline per section; pause at reduced motion"],
    gsap: ["ScrollTrigger batch for .section h2 once"],
    motionSitesKits: ["M-scroll-text-reveal", "M-fade-rise", "M-media-zoom"],
    reactBits: { text: ["ScrollReveal", "DecryptedText", "SplitText"], bg: ["GradientBlinds", "FloatingLines", "LineWaves"], ui: ["ScrollStack", "Masonry", "StaggeredMenu"] },
    magicUi: ["ScrollProgress", "Section reveals"],
    kokonut: ["Chapter cards tied to scroll", "Sticky narrative rail"],
    animationHubRefIds: ["gsap", "prompt-workflow", "tone-to-motion"],
    guidanceHuman:
      "Tell the story in beats: each section gets one clear motion idea. Change the pattern section-to-section so it does not feel copy-pasted.",
  },
  {
    id: "dark_noir",
    moodTitle: "Noir",
    feelingTags: ["mysterious", "bold", "nostalgic", "sophisticated"],
    motionVibeIds: ["cinematic_bold", "elegant_refined"],
    timing: { durationMs: [500, 1400], staggerMs: [50, 100], easing: ["power2.out"] },
    css: ["spotlight radial-gradient following pointer (desktop only)", "vignette animate opacity"],
    animeJs: ["fade headline from black"],
    gsap: ["pin short beat on hero quote optional"],
    motionSitesKits: ["M-spotlight-mask", "M-scroll-text-reveal", "M-video-raf-loop"],
    reactBits: { text: ["TrueFocus", "GlitchText", "ScrambledText"], bg: ["DarkVeil", "LightPillar", "Radar"], ui: ["SpotlightCard", "ElectricBorder", "BorderGlow"] },
    magicUi: ["SpotlightSection", "Vignette stack"],
    kokonut: ["Noir glow frames", "Pointer-follow spotlight"],
    animationHubRefIds: ["motion-react", "gsap", "galleries"],
    guidanceHuman:
      "Noir is about light vs shadow: use spotlight, vignette, or slow fades—not rainbow gradients. Keep contrast WCAG-safe.",
  },
  {
    id: "retro_digital",
    moodTitle: "Nostalgia",
    feelingTags: ["nostalgic", "playful", "authentic", "charming"],
    motionVibeIds: ["snappy_energetic", "playful_bouncy"],
    timing: { durationMs: [80, 240], staggerMs: [16, 40], easing: ["steps(4)", "linear"] },
    css: ["image-rendering pixelated on deliberate assets", "scanline overlay opacity-10"],
    animeJs: ["RGB split micro jitter on hover only"],
    gsap: ["quick timeline on HUD panels"],
    motionSitesKits: ["M-horizontal-marquee", "M-button-lift"],
    reactBits: { text: ["ASCIIText", "GlitchText", "ScrambledText"], bg: ["FaultyTerminal", "PixelBlast", "PixelSnow"], ui: ["PixelCard", "Stack"] },
    magicUi: ["RetroGrid", "CRT frame (subtle)"],
    kokonut: ["CRT bezel kits", "8-bit button chrome"],
    animationHubRefIds: ["tone-vibes", "animejs"],
    guidanceHuman:
      "Retro motion can trigger discomfort: keep glitch steps coarse, short, and rare; offer a clean static frame for reduced-motion users.",
  },
  {
    id: "luxury_jewelry",
    moodTitle: "Fine jewelry",
    feelingTags: ["luxurious", "elegant", "sophisticated", "serene"],
    motionVibeIds: ["elegant_refined", "natural_calm"],
    timing: { durationMs: [700, 1600], staggerMs: [60, 120], easing: ["cubic-bezier(0.2,0.8,0.2,1)"] },
    css: ["slow crossfade product stills", "subtle scale on hover 1.01"],
    animeJs: ["opacity-only timelines"],
    gsap: ["minimal; optional smooth scrollTo"],
    motionSitesKits: ["M-media-zoom", "M-delay-fade", "minimal"],
    reactBits: { text: ["ShinyText", "BlurText", "TrueFocus"], bg: ["Iridescence", "LiquidChrome", "Silk"], ui: ["ReflectiveCard", "ModelViewer", "GlassSurface"] },
    magicUi: ["ShineBorder", "Lens blur stack"],
    kokonut: ["Jewelry carousel glass", "Specular highlights"],
    animationHubRefIds: ["tone-to-motion", "motion-react"],
    guidanceHuman:
      "Quiet premium: slow parallax or reflections only—no big bounces. Let materials (glass, metal) do the talking.",
  },
  {
    id: "wellness_spa",
    moodTitle: "Wellness",
    feelingTags: ["serene", "calm", "comforting", "optimistic"],
    motionVibeIds: ["natural_calm", "ambient_light"],
    timing: { durationMs: [600, 1200], staggerMs: [70, 120], easing: ["ease-in-out"] },
    css: ["slow gradient shift on hero wash", "gentle blur on nav scroll"],
    animeJs: ["loop opacity 'breathing' 4–8s on abstract shapes"],
    gsap: ["avoid unless editorial exception"],
    motionSitesKits: ["M-delay-fade", "M-video-raf-loop", "minimal"],
    reactBits: { text: ["ScrollFloat", "GradientText", "BlurText"], bg: ["SoftAurora", "Waves", "Grainient"], ui: ["FluidGlass", "DecayCard"] },
    magicUi: ["Gradient animation (slow)", "Breathing blur"],
    kokonut: ["Spa mesh gradients", "Breathing loaders"],
    animationHubRefIds: ["css-tailwind", "tone-to-motion"],
    guidanceHuman:
      "Should feel like breathing room: long loops, soft fades, no frantic cuts. Do not auto-play loud audio with motion.",
  },
  {
    id: "startup_saas",
    moodTitle: "Tech product",
    feelingTags: ["trustworthy", "fresh", "innovative", "dynamic"],
    motionVibeIds: ["technical_precise", "snappy_energetic"],
    timing: { durationMs: [150, 350], staggerMs: [30, 55], easing: ["easeOut"] },
    css: ["bento tiles stagger with animation-delay-*", "hover shadow-md"],
    animeJs: ["stagger children on feature grid mount"],
    gsap: ["optional ScrollTrigger for case-study band"],
    motionSitesKits: ["M-fade-rise", "M-button-lift", "M-media-zoom"],
    reactBits: { text: ["TextType", "CountUp", "DecryptedText"], bg: ["DotGrid", "Beams", "GridScan"], ui: ["MagicBento", "CardSwap", "Dock"] },
    magicUi: ["BentoGrid", "Logo marquee"],
    kokonut: ["Bento feature tiles", "Pricing table motion"],
    animationHubRefIds: ["patterns-json", "motion-react", "css-tailwind"],
    guidanceHuman:
      "Product clarity wins: motion highlights what changed (nav, selection, loaded data), not random decoration.",
  },
  {
    id: "fashion_runway",
    moodTitle: "Runway",
    feelingTags: ["elegant", "sophisticated", "bold", "luxurious"],
    motionVibeIds: ["elegant_refined", "cinematic_bold"],
    timing: { durationMs: [400, 900], staggerMs: [40, 80], easing: ["power1.out"] },
    css: ["full-bleed image crossfade", "thin letterspacing on caps"],
    animeJs: ["split headline lines"],
    gsap: ["horizontal scrub on lookbook optional"],
    motionSitesKits: ["M-media-zoom", "M-scroll-text-reveal", "M-horizontal-marquee"],
    reactBits: { text: ["SplitText", "ScrollVelocity", "ShinyText"], bg: ["ColorBends", "RippleGrid", "ShapeGrid"], ui: ["FlyingPosters", "CircularGallery", "CardNav"] },
    magicUi: ["HeroVideo", "TextReveal (mask)"],
    kokonut: ["Runway carousel", "Editorial mask text"],
    animationHubRefIds: ["galleries", "motion-react", "tone-vibes"],
    guidanceHuman:
      "Fashion is silhouette + crop: motion supports the cut of imagery and type hierarchy, not gimmicks on every line.",
  },
  {
    id: "food_warmth",
    moodTitle: "Cozy kitchen",
    feelingTags: ["warm", "comforting", "authentic", "joyful"],
    motionVibeIds: ["natural_calm", "playful_bouncy"],
    timing: { durationMs: [250, 600], staggerMs: [40, 70], easing: ["ease-out"] },
    css: ["steam-like slow translate on decorative SVG (low amplitude)"],
    animeJs: ["card hover lift on recipe tiles"],
    gsap: ["optional parallax on hero ingredients photo"],
    motionSitesKits: ["M-media-zoom", "M-fade-rise", "M-video-raf-loop"],
    reactBits: { text: ["CurvedLoop", "GradientText"], bg: ["Grainient", "Waves", "SoftAurora"], ui: ["Masonry", "Carousel", "ProfileCard"] },
    magicUi: ["WarmGradient", "SoftRipple"],
    kokonut: ["Recipe card lift", "Steam SVG accents"],
    animationHubRefIds: ["galleries", "css-tailwind"],
    guidanceHuman:
      "Warm and appetizing: favor gentle color washes or steam-like drift over busy geometric motion.",
  },
  {
    id: "finance_trust",
    moodTitle: "Trust",
    feelingTags: ["trustworthy", "calm", "supportive", "serene"],
    motionVibeIds: ["technical_precise", "elegant_refined"],
    timing: { durationMs: [120, 280], staggerMs: [20, 40], easing: ["ease-out"] },
    css: ["subtle underline grow on links", "numeric tabular-nums"],
    animeJs: ["CountUp for KPI with easingOutExpo"],
    gsap: ["charts only if spec demands"],
    motionSitesKits: ["M-button-lift", "M-delay-fade", "minimal"],
    reactBits: { text: ["CountUp", "TextType", "DecryptedText"], bg: ["DotGrid", "GridMotion", "DotField"], ui: ["Stepper", "Counter", "PillNav"] },
    magicUi: ["Minimal borders", "Subtle shine"],
    kokonut: ["Compliance-step motion", "Soft success ticks"],
    animationHubRefIds: ["patterns-json", "prompt-workflow"],
    guidanceHuman:
      "Banking calm: no gimmicks on pay, transfer, or form flows. Motion is subtle confirmation, always accessible.",
  },
  {
    id: "education_friendly",
    moodTitle: "Curious learning",
    feelingTags: ["playful", "supportive", "optimistic", "joyful", "charming"],
    motionVibeIds: ["playful_bouncy", "technical_precise"],
    timing: { durationMs: [200, 450], staggerMs: [35, 60], easing: ["easeOutBack (sparingly)"] },
    css: ["progress dots animate width", "celebrate success micro-bounce"],
    animeJs: ["stagger FAQ open height"],
    gsap: ["optional timeline on lesson steps"],
    motionSitesKits: ["M-fade-rise", "M-button-lift", "M-char-cascade"],
    reactBits: { text: ["RotatingText", "Shuffle", "FallingText"], bg: ["Ballpit", "Beams"], ui: ["Stepper", "BubbleMenu", "PillNav"] },
    magicUi: ["Confetti on success", "Progress shimmer"],
    kokonut: ["Lesson checklist motion", "Playful toasts"],
    animationHubRefIds: ["prompt-workflow", "motion-react"],
    guidanceHuman:
      "Celebrate milestones with small bursts, but keep reading and quiz flows visually steady—reward, don’t distract.",
  },
  {
    id: "music_club",
    moodTitle: "Night energy",
    feelingTags: ["energetic", "bold", "dynamic", "fearless", "playful"],
    motionVibeIds: ["snappy_energetic", "cinematic_bold"],
    timing: { durationMs: [100, 320], staggerMs: [16, 40], easing: ["linear", "ease-in-out"] },
    css: ["BPM-sync optional via small script; respect reduced-motion → disable beat"],
    animeJs: ["pulsing glow tied to audio analyser optional (user gesture)"],
    gsap: ["strobe-like effects forbidden—use hue rotate slow instead"],
    motionSitesKits: ["M-horizontal-marquee", "M-scroll-text-reveal", "M-video-raf-loop"],
    reactBits: { text: ["ScrollVelocity", "GlitchText", "ScrambledText"], bg: ["Hyperspeed", "Lightning", "Plasma"], ui: ["ElectricBorder", "ChromaGrid", "Dock"] },
    magicUi: ["NeonButton", "Equalizer bars"],
    kokonut: ["BPM-reactive glow", "Strobe-safe pulses"],
    animationHubRefIds: ["tone-vibes", "gsap"],
    guidanceHuman:
      "Club energy without danger: no strobing, cap pulsing frequency, respect reduced-motion with a non-flashing theme.",
  },
  {
    id: "travel_wanderlust",
    moodTitle: "Wanderlust",
    feelingTags: ["adventurous", "optimistic", "joyful", "fresh", "serene"],
    motionVibeIds: ["cinematic_bold", "story_scroll", "natural_calm"],
    timing: { durationMs: [500, 1200], staggerMs: [50, 90], easing: ["ease-out"] },
    css: ["parallax on hero background translateY at 0.2–0.35x scroll"],
    animeJs: ["fade sections on enter"],
    gsap: ["ScrollTrigger parallax layers with performance will-change guards"],
    motionSitesKits: ["M-scroll-scrub-video", "M-video-raf-loop", "M-scroll-text-reveal"],
    reactBits: { text: ["ScrollReveal", "ScrollFloat"], bg: ["Galaxy", "FloatingLines", "LineWaves"], ui: ["OrbitImages", "FlyingPosters", "FlowingMenu"] },
    magicUi: ["Globe", "Parallax hero"],
    kokonut: ["Map path reveals", "Horizon wash"],
    animationHubRefIds: ["gsap", "galleries", "motion-react"],
    guidanceHuman:
      "Big vistas need performance: compress hero media, lazy-load, and keep text legible with scrims—not more motion layers.",
  },
  {
    id: "social_proof",
    moodTitle: "Togetherness",
    feelingTags: ["trustworthy", "warm", "supportive", "optimistic"],
    motionVibeIds: ["snappy_energetic"],
    timing: { durationMs: [18000, 36000], staggerMs: [0, 0], easing: ["linear"] },
    css: ["infinite marquee logos duplicate row", "mask-image linear-gradient edges"],
    animeJs: ["translateX loop"],
    gsap: ["optional seamless loop with modifiers"],
    motionSitesKits: ["M-horizontal-marquee", "M-button-lift"],
    reactBits: { text: ["CurvedLoop", "GradientText"], bg: ["DotField", "GridMotion", "Beams"], ui: ["LogoLoop", "InfiniteMenu", "Dock"] },
    magicUi: ["Marquee", "Trust strip"],
    kokonut: ["Logo ticker", "Partner rail"],
    animationHubRefIds: ["css-tailwind", "recipes"],
    guidanceHuman:
      "Logos drift in a steady loop: pause the strip on hover and for reduced-motion users so people can actually read names.",
  },
  {
    id: "minimal_brutal",
    moodTitle: "Stark minimal",
    feelingTags: ["bold", "fresh", "authentic", "fearless"],
    motionVibeIds: ["technical_precise", "snappy_energetic"],
    timing: { durationMs: [80, 200], staggerMs: [0, 20], easing: ["linear"] },
    css: ["shadow-[4px_4px_0_0_rgb(0,0,0)] hover:translate-x-[2px] hover:translate-y-[2px]", "no blur"],
    animeJs: ["rare; snap states"],
    gsap: ["none unless scroll snap spec"],
    motionSitesKits: ["minimal", "M-button-lift"],
    reactBits: { text: ["ASCIIText", "TextType", "TextCursor"], bg: ["Dither", "GridDistortion", "ShapeGrid"], ui: ["PixelCard", "Stack", "Counter"] },
    magicUi: ["BrutalistCard", "Hard-offset hover"],
    kokonut: ["Mono stack cards", "Snap toggles"],
    animationHubRefIds: ["css-tailwind", "patterns-json"],
    guidanceHuman:
      "Brutalist motion snaps into place—hard offsets and shadows—not long soft fades or glassy blur.",
  },
  {
    id: "wedding_romantic",
    moodTitle: "Romance",
    feelingTags: ["elegant", "warm", "charming", "joyful", "luxurious"],
    motionVibeIds: ["elegant_refined", "natural_calm"],
    timing: { durationMs: [600, 1400], staggerMs: [55, 95], easing: ["ease-out"] },
    css: ["slow petal-like opacity on dividers", "script headings tracking-wide"],
    animeJs: ["gentle float on floral SVG ornaments"],
    gsap: ["optional timeline on RSVP modal only"],
    motionSitesKits: ["M-delay-fade", "M-char-cascade", "M-media-zoom"],
    reactBits: { text: ["ShinyText", "CurvedLoop", "SplitText"], bg: ["Silk", "SoftAurora", "Threads"], ui: ["FluidGlass", "BorderGlow", "GlassIcons"] },
    magicUi: ["SparklesText", "SoftBeam"],
    kokonut: ["Floral divider motion", "RSVP modal timeline"],
    animationHubRefIds: ["tone-to-motion", "motion-react", "galleries"],
    guidanceHuman:
      "Romantic flourishes belong in borders and accents—RSVP, forms, and long copy stay rock steady to read.",
  },
  {
    id: "real_estate_drone",
    moodTitle: "Spacious home",
    feelingTags: ["sophisticated", "trustworthy", "serene", "luxurious"],
    motionVibeIds: ["cinematic_bold", "ambient_light"],
    timing: { durationMs: [700, 1600], staggerMs: [50, 90], easing: ["ease-out"] },
    css: ["Ken Burns on stills", "slow parallax on hero facade"],
    animeJs: ["fade stats on scroll into view"],
    gsap: ["ScrollTrigger soft scrub on stats bar optional"],
    motionSitesKits: ["M-video-raf-loop", "M-scroll-text-reveal", "M-fade-rise"],
    reactBits: { text: ["CountUp", "ScrollReveal", "TextType"], bg: ["GradientBlinds", "LightRays", "FloatingLines"], ui: ["Carousel", "ReflectiveCard", "DomeGallery"] },
    magicUi: ["HeroVideo", "Parallax stills"],
    kokonut: ["Stats scrub bar", "Facade Ken Burns"],
    animationHubRefIds: ["gsap", "galleries", "motion-react"],
    guidanceHuman:
      "Property sites must feel trustworthy: scrim all video text, pick one hero motion story (parallax or reveal—not both fighting).",
  },
  {
    id: "nonprofit_hope",
    moodTitle: "Hopeful cause",
    feelingTags: ["optimistic", "warm", "supportive", "authentic", "joyful"],
    motionVibeIds: ["natural_calm", "story_scroll"],
    timing: { durationMs: [400, 800], staggerMs: [45, 80], easing: ["ease-out"] },
    css: ["testimonial cards lift 2px on hover", "progress bar width transition"],
    animeJs: ["donation thermometer CountUp"],
    gsap: ["impact section once"],
    motionSitesKits: ["M-fade-rise", "M-button-lift", "M-horizontal-marquee"],
    reactBits: { text: ["TextType", "GradientText", "ScrollFloat"], bg: ["Waves", "FloatingLines", "Beams"], ui: ["AnimatedList", "Stepper", "ProfileCard"] },
    magicUi: ["Donate progress", "Hope gradient"],
    kokonut: ["Impact thermometer", "Volunteer stories rail"],
    animationHubRefIds: ["prompt-workflow", "css-tailwind", "tone-to-motion"],
    guidanceHuman:
      "Grassroots honest: modest fades and small hovers—skip slick corporate gloss that feels off-brand.",
  },
  {
    id: "gaming_hud",
    moodTitle: "Game night",
    feelingTags: ["playful", "energetic", "bold", "dynamic", "fearless"],
    motionVibeIds: ["snappy_energetic", "playful_bouncy"],
    timing: { durationMs: [90, 260], staggerMs: [12, 35], easing: ["steps(6)", "ease-out"] },
    css: ["progress segments snap", "CRT optional border"],
    animeJs: ["damage numbers pop"],
    gsap: ["timeline on ability cooldown radial wipe"],
    motionSitesKits: ["M-horizontal-marquee", "M-button-lift", "M-char-cascade"],
    reactBits: { text: ["GlitchText", "ScrambledText", "ASCIIText"], bg: ["FaultyTerminal", "Radar", "GridScan"], ui: ["ElectricBorder", "Dock", "ChromaGrid"] },
    magicUi: ["HUD bars", "Cooldown radial"],
    kokonut: ["Damage pop numbers", "Ability radial wipe"],
    animationHubRefIds: ["animejs", "tone-vibes", "patterns-json"],
    guidanceHuman:
      "HUDs can be busy, but cap particles and glow stacks; on phones default to a calmer, mostly static HUD tier.",
  },
  {
    id: "medical_clinical",
    moodTitle: "Clinical care",
    feelingTags: ["trustworthy", "calm", "serene", "supportive", "fresh"],
    motionVibeIds: ["technical_precise", "elegant_refined"],
    timing: { durationMs: [120, 280], staggerMs: [16, 40], easing: ["ease-out"] },
    css: ["focus rings high visibility", "tab underline slide"],
    animeJs: ["sparse"],
    gsap: ["charts if any"],
    motionSitesKits: ["minimal", "M-delay-fade", "M-button-lift"],
    reactBits: { text: ["CountUp", "TextType"], bg: ["DotGrid", "GridMotion", "DotField"], ui: ["Stepper", "ElasticSlider", "Folder"] },
    magicUi: ["Clinical tabs", "High-vis focus"],
    kokonut: ["Lab result panels", "Accessible loaders"],
    animationHubRefIds: ["patterns-json", "css-tailwind"],
    guidanceHuman:
      "Clinical paths stay flat: labs, dosing, results—no bounce or play on critical flows; readability beats delight.",
  },
  {
    id: "sustainability_earth",
    moodTitle: "Earth",
    feelingTags: ["fresh", "authentic", "serene", "warm", "optimistic"],
    motionVibeIds: ["natural_calm", "ambient_light"],
    timing: { durationMs: [500, 1100], staggerMs: [50, 90], easing: ["ease-in-out"] },
    css: ["slow gradient shifts in forest greens", "leaf SVG subtle rotate"],
    animeJs: ["timeline on impact metrics once"],
    gsap: ["optional scrub on timeline infographic"],
    motionSitesKits: ["M-fade-rise", "M-scroll-text-reveal", "M-video-raf-loop"],
    reactBits: { text: ["ScrollFloat", "GradientText", "CurvedLoop"], bg: ["Waves", "FloatingLines", "Grainient"], ui: ["MagicBento", "FluidGlass", "AnimatedList"] },
    magicUi: ["Globe (slow)", "Leaf SVG drift"],
    kokonut: ["Impact timeline scrub", "Eco stat cards"],
    animationHubRefIds: ["tone-to-motion", "motion-react", "galleries"],
    guidanceHuman:
      "Earth-positive pacing: gentle growth metaphors—avoid hyperspeed sci-fi clichés that imply waste or rush.",
  },
  {
    id: "festival_poster",
    moodTitle: "Festival",
    feelingTags: ["energetic", "playful", "bold", "joyful", "adventurous"],
    motionVibeIds: ["playful_bouncy", "snappy_energetic"],
    timing: { durationMs: [150, 400], staggerMs: [25, 55], easing: ["back.out", "ease-out"] },
    css: ["rotate-2 hover:rotate-0 on poster tiles", "staggered drop-in"],
    animeJs: ["stagger headline words"],
    gsap: ["short burst timeline on hero date reveal"],
    motionSitesKits: ["M-char-cascade", "M-horizontal-marquee", "M-button-lift"],
    reactBits: { text: ["Shuffle", "FallingText", "RotatingText"], bg: ["ColorBends", "PrismaticBurst", "PlasmaWave"], ui: ["FlyingPosters", "ChromaGrid", "CardSwap"] },
    magicUi: ["AnimatedBeam", "Poster tilt"],
    kokonut: ["Lineup grid drop", "Date stamp burst"],
    animationHubRefIds: ["tone-vibes", "animejs", "galleries"],
    guidanceHuman:
      "Festival maximalism still needs a grid: motion never hides date, venue, or price—keep those pinned in clear type.",
  },
  {
    id: "museum_archive",
    moodTitle: "Gallery quiet",
    feelingTags: ["sophisticated", "serene", "reflective", "mysterious", "elegant"],
    motionVibeIds: ["elegant_refined", "technical_precise"],
    timing: { durationMs: [500, 1000], staggerMs: [40, 80], easing: ["ease-out"] },
    css: ["image zoom on hover inside frame", "caption fade"],
    animeJs: ["rare"],
    gsap: ["optional horizontal drag on digitized scroll exhibit"],
    motionSitesKits: ["M-media-zoom", "M-delay-fade", "minimal"],
    reactBits: { text: ["TrueFocus", "SplitText", "BlurText"], bg: ["DarkVeil", "Dither", "Silk"], ui: ["Masonry", "CircularGallery", "ModelViewer"] },
    magicUi: ["Quiet captions", "Frame zoom"],
    kokonut: ["Caption fade", "Exhibit drag-scroll"],
    animationHubRefIds: ["motion-react", "galleries", "patterns-json"],
    guidanceHuman:
      "The art is the star: captions and long labels stay simple; save motion for hover on works or light section reveals.",
  },
  {
    id: "sale_urgency",
    moodTitle: "Urgent sale",
    feelingTags: ["bold", "energetic", "fearless", "dynamic", "optimistic"],
    motionVibeIds: ["snappy_energetic"],
    timing: { durationMs: [100, 250], staggerMs: [20, 45], easing: ["ease-in-out"] },
    css: ["pulse opacity on badge max 3 cycles then stop", "respect reduced-motion → no pulse"],
    animeJs: ["CountUp to deadline"],
    gsap: ["timeline on banner strip optional"],
    motionSitesKits: ["M-button-lift", "M-horizontal-marquee"],
    reactBits: { text: ["CountUp", "ScrambledText", "Shuffle"], bg: ["Hyperspeed", "GridScan"], ui: ["Counter", "BorderGlow", "ChromaGrid"] },
    magicUi: ["FlashSale banner", "Pulse badge (capped)"],
    kokonut: ["Countdown strip", "Urgency ticker"],
    animationHubRefIds: ["css-tailwind", "tone-vibes"],
    guidanceHuman:
      "Sales urgency must stay accessible: countdowns and pulses also have a plain text state—never motion-only deadlines.",
  },
  {
    id: "ai_productivity",
    moodTitle: "Future desk",
    feelingTags: ["innovative", "fresh", "dynamic", "sophisticated", "trustworthy"],
    motionVibeIds: ["technical_precise", "snappy_energetic"],
    timing: { durationMs: [120, 300], staggerMs: [18, 40], easing: ["ease-out"] },
    css: ["typing indicator dots opacity stagger", "skeleton shimmer low contrast"],
    animeJs: ["token stream opacity stagger"],
    gsap: ["rare; prefer CSS"],
    motionSitesKits: ["M-delay-fade", "M-button-lift", "minimal"],
    reactBits: { text: ["TextType", "DecryptedText", "TextCursor"], bg: ["DotField", "GridMotion", "GridScan"], ui: ["Dock", "InfiniteMenu", "Stepper"] },
    magicUi: ["TypingIndicator", "Skeleton shimmer"],
    kokonut: ["Token stream list", "Copilot chrome"],
    animationHubRefIds: ["prompt-workflow", "patterns-json", "motion-react"],
    guidanceHuman:
      "Copilot UI: motion shows thinking, streaming tokens, errors, success—never random sparkle while the user waits.",
  },
];

const globalRules = {
  accessibility: [
    "Honor prefers-reduced-motion: replace transforms with opacity ≤200ms or static layouts.",
    "Never pair two high-cost drivers (e.g. scroll-scrub video + heavy WebGL text) without perf tiering.",
    "Pause infinite marquees on hover and when user prefers reduced motion.",
  ],
  /** Human pace scale — pick a word first; use `timingPresets` in JSON for paste snippets. */
  paceScale: {
    whisper: "Almost no motion — opacity and 1–2px drift only.",
    slow: "Soft entrances; long ease-out; no bounce on body copy.",
    gentle: "Slow and readable; relaxed stagger between siblings.",
    normal: "Product-default speed: feels alive, still readable.",
    fast: "Snappy UI feedback; short durations; tight stagger.",
    punchy: "High-energy hits; still avoid seizure-like flashing.",
    jump: "Spring / overshoot — reserve for small controls (CTA, chip), never whole-page.",
    steady_loop: "Linear infinite drift (marquees); pause on hover / reduced-motion.",
  },
  vibePromptTool: {
    repoPath: root,
    files: [
      "motion-vibes.mjs — Motion vibe dropdown + keyword clusters",
      "animation-ref-presets.mjs — GitHub animation-reference hub URLs + industry fit",
      "build-catalog.mjs — motionKits + style blurbs + catalog bundle",
      "app.js — resolveMotionVibeForPrompt, buildAnimationReferenceBlock, pickDefaultMotions",
    ],
  },
};

function feelingTagLabels(doc, ids) {
  const cat = doc.feelingTagDefinitions || [];
  const map = new Map(cat.map((x) => [x.id, x.label]));
  return (ids || []).map((id) => map.get(id) || id).join(", ");
}

function motionPersonalityTagLabels(doc, ids) {
  const cat = doc.motionPersonalityTags || [];
  const map = new Map(cat.map((x) => [x.id, x.label]));
  return (ids || []).map((id) => map.get(id) || id).join(", ");
}

function moodFeelingProfileById(doc, id) {
  const rows = doc.moodFeelingMotionProfiles || [];
  return rows.find((r) => r.id === id);
}

function buildAnimationHubResolved() {
  const base = "https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference";
  return animationRefPresets.map((p) => ({
    id: p.id,
    label: p.label,
    url: p.url,
    planes: p.planes,
    rawMarkdownUrl: p.url.replace("github.com/Ictraeh", "raw.githubusercontent.com/Ictraeh").replace("/blob/", "/"),
  }));
}

function buildMarkdown(doc) {
  const lines = [];
  lines.push(`# ${doc.meta.title}`);
  lines.push("");
  lines.push(doc.meta.description);
  lines.push("");
  lines.push(`**Version:** ${doc.meta.version} · **Generated:** ${doc.meta.generated}`);
  lines.push("");
  lines.push("## How other AIs should use this map");
  lines.push("");
  lines.push(
    "1. **Match mood** from the brief to a **mood cluster**: read `moodTitle` + `feelingTags` (ids from `feelingTagDefinitions`) in `moodClusters[]`."
  );
  lines.push(
    "2. Open **`timing.pickerLabel`** + **`paceInWords`** (slow / normal / fast / jump / …) and **`whatItFeelsLike`**. Use **`timing.copyPaste`** to paste starter values into Tailwind / anime.js / GSAP."
  );
  lines.push(
    "3. Read **`motionPersonalityTags`** on the cluster (merged from `moodFeelingMotionProfiles` via each feeling tag) plus **`motionAttributeGuide`** / **`motionPersonalityTags` definitions** — motion has mood like color: combine speed, easing, rhythm, direction, scale, opacity, blur, color behavior, and density."
  );
  lines.push(
    "4. For nuanced briefs, use **`motionBlends`**, **`surpriseMotionByFeeling`**, and score-style hints in **`moodScoreExamples`** + **`motionFeatureSchema`** before locking presets."
  );
  lines.push("5. Pick **one primary stack** (CSS vs anime.js vs GSAP) per section; avoid stacking competing scroll drivers.");
  lines.push("6. Cross-link **animationHubRefIds** to files under the animation-reference hub (URLs in `animationReferenceHub`).");
  lines.push("7. Map UI vs BG: **motionSitesKits** use `plane` in catalog; React Bits categories mirror production taxonomies.");
  lines.push("");
  lines.push("## Motion mood engine");
  lines.push("");
  lines.push(`_${doc.motionMoodEngine.philosophy}_`);
  lines.push("");
  lines.push("**Analyze:** " + doc.motionMoodEngine.analyze.join(", ") + ".");
  lines.push("");
  lines.push("**Score / rank by:** " + doc.motionMoodEngine.scoreMoodBy.join(", ") + ".");
  lines.push("");
  lines.push("**Emit:** " + doc.motionMoodEngine.output.join(", ") + ".");
  lines.push("");
  lines.push("## Motion attributes (design variables)");
  lines.push("");
  lines.push("| Attribute | What it controls | Emotional impact |");
  lines.push("|-----------|------------------|-------------------|");
  for (const row of doc.motionAttributeGuide || []) {
    lines.push(`| **${row.attribute}** | ${row.controls} | ${row.emotionalImpact} |`);
  }
  lines.push("");
  lines.push("## Motion personality tags (animation tone)");
  lines.push("");
  for (const t of doc.motionPersonalityTags || []) {
    lines.push(
      `- **${t.label}** (\`${t.id}\`) — ${t.motionStyle} · *Often fits:* ${feelingTagLabels(doc, t.bestFeelingTagMatches)}`
    );
  }
  lines.push("");
  lines.push("## Animation reference hub (canonical prose)");
  lines.push("");
  lines.push(`Tree: ${doc.animationReferenceHub.treeUrl}`);
  lines.push("");
  for (const row of doc.animationReferenceHub.files.slice(0, 20)) {
    lines.push(`- **${row.id}** — [${row.label}](${row.url})`);
  }
  lines.push("");
  lines.push("## Motion vibe presets (vibe-prompt-tool)");
  lines.push("");
  for (const v of doc.motionVibesFromTool.filter((x) => !x.auto)) {
    lines.push(`### ${v.label} (\`${v.id}\`)`);
    lines.push(`- **Keywords:** ${v.keywords || "—"}`);
    lines.push(`- **UI refs:** ${(v.uiRefIds || []).join(", ") || "—"}`);
    lines.push(`- **BG refs:** ${(v.bgRefIds || []).join(", ") || "—"}`);
    lines.push("");
  }
  lines.push("## Motion libraries (external)");
  lines.push("");
  for (const lib of doc.motionLibraries) {
    lines.push(`### ${lib.label} (\`${lib.id}\`)`);
    for (const [k, v] of Object.entries(lib)) {
      if (k === "id" || k === "label") continue;
      if (typeof v === "string") lines.push(`- **${k}:** ${v}`);
    }
    lines.push("");
  }
  lines.push("## Timing presets (human pick → paste snippets)");
  lines.push("");
  lines.push(
    "Use **`timingPresets`** in JSON for the full catalog. Each preset has **`pickerLabel`**, **`paceInWords`** (entrance / betweenItems / bounce), **`whatItFeelsLike`**, optional **`technicalNote`**, and **`pasteSnippets`** (`tailwind`, `animeJs`, `gsap`)."
  );
  lines.push("");
  lines.push("## Feeling tags + motion profiles (24 moods)");
  lines.push("");
  for (const ft of doc.feelingTagDefinitions || []) {
    const prof = moodFeelingProfileById(doc, ft.id);
    const row =
      prof &&
      ` — *${prof.motionPersonality}* · speed **${prof.speed}** · shape **${prof.shapeBehavior}** · color **${prof.colorTreatment}** · preset **${prof.practicalPresetName}** (${prof.practicalPresetDescription}) · surprise: _${prof.surpriseDirection}_ · motion tags: ${motionPersonalityTagLabels(doc, prof.motionTagIds)}`;
    lines.push(`- **${ft.label}** — ${ft.blurb}${row || ""}`);
  }
  lines.push("");
  lines.push("## Motion blends (secondary moods)");
  lines.push("");
  for (const b of doc.motionBlends || []) {
    lines.push(`- **${b.blend}** — ${b.motionDirection} · _Best for:_ ${b.bestFor}`);
  }
  lines.push("");
  lines.push("## Mood clusters → motion grammar");
  lines.push("");
  for (const m of doc.moodClusters) {
    const t = m.timing || {};
    const pace = t.paceInWords || {};
    lines.push(`### ${m.id.replace(/_/g, " ")}`);
    if (m.moodTitle) lines.push(`- **Mood:** ${m.moodTitle}`);
    lines.push(`- **Feeling tags:** ${feelingTagLabels(doc, m.feelingTags)}`);
    lines.push(`- **Motion personality tags (merged):** ${motionPersonalityTagLabels(doc, m.motionPersonalityTags)}`);
    lines.push(`- **Motion vibe ids:** ${m.motionVibeIds.map((x) => "`" + x + "`").join(", ")}`);
    lines.push(`- **Timing preset:** \`${t.presetId || "?"}\` — **${t.pickerLabel || ""}**`);
    lines.push(
      `- **Pace in words:** entrance *${pace.entrance || "—"}* · between items *${pace.betweenItems || "—"}* · bounce *${pace.bounce || "—"}*`
    );
    lines.push(`- **What it feels like:** ${t.whatItFeelsLike || "—"}`);
    if (t.technicalNote) lines.push(`- **Optional numbers (for devs):** ${t.technicalNote}`);
    lines.push(`- **MotionSites kits:** ${m.motionSitesKits.join(", ")}`);
    lines.push(`- **React Bits (examples):** text: ${m.reactBits.text.join(", ")} · bg: ${m.reactBits.bg.join(", ")} · ui: ${m.reactBits.ui.join(", ")}`);
    lines.push(`- **Magic UI:** ${m.magicUi.join("; ")}`);
    lines.push(`- **Kokonut UI:** ${m.kokonut.join("; ")}`);
    lines.push(`- **Hub ref ids:** ${m.animationHubRefIds.join(", ")}`);
    lines.push(`- **Guidance:** ${m.guidanceHuman || "—"}`);
    if (t.copyPaste) {
      lines.push("");
      lines.push("<details><summary>Copy-paste starters (Tailwind / Anime / GSAP)</summary>\n\n```text");
      lines.push(`Tailwind: ${t.copyPaste.tailwind || ""}`);
      lines.push(`Anime.js: ${t.copyPaste.animeJs || ""}`);
      lines.push(`GSAP: ${t.copyPaste.gsap || ""}`);
      lines.push("```\n</details>");
    }
    lines.push("");
    lines.push("<details><summary>CSS patterns</summary>\n\n```css");
    lines.push(m.css.join("\n"));
    lines.push("```\n</details>");
    lines.push("");
    lines.push("<details><summary>Anime.js sketches</summary>\n\n```js");
    lines.push(m.animeJs.join("\n"));
    lines.push("```\n</details>");
    lines.push("");
    lines.push("<details><summary>GSAP sketches</summary>\n\n```js");
    lines.push(m.gsap.join("\n"));
    lines.push("```\n</details>");
    lines.push("");
  }
  lines.push("## Industry → animation hub bias (vibe-prompt-tool)");
  lines.push("");
  lines.push("| industry id | ordered ref ids |");
  lines.push("|-------------|-----------------|");
  for (const [ind, ids] of Object.entries(doc.industryAnimationRefFit)) {
    lines.push(`| ${ind} | ${ids.join(", ")} |`);
  }
  lines.push("");
  lines.push("## React Bits component index (name + category + hint)");
  lines.push("");
  lines.push("_Truncated in MD — see `mood-to-motion-map.json` → `reactBitsComponentIndex` for full list._");
  for (const row of doc.reactBitsComponentIndex.slice(0, 40)) {
    lines.push(`- **${row.name}** (${row.category}) — ${row.vibeHint}`);
  }
  lines.push("");
  lines.push("## Global rules");
  lines.push("");
  for (const r of doc.globalRules.accessibility) {
    lines.push(`- ${r}`);
  }
  lines.push("");
  lines.push("### Pace scale (words, not milliseconds)");
  lines.push("");
  for (const [k, v] of Object.entries(doc.globalRules.paceScale || {})) {
    lines.push(`- **${k}:** ${v}`);
  }
  lines.push("");
  return lines.join("\n");
}

function main() {
  const reactBitsComponentIndex = buildReactBitsIndex();
  const moodFeelingMotionProfiles = Object.keys(MOOD_FEELING_MOTION_PROFILES)
    .sort()
    .map((id) => ({ id, ...MOOD_FEELING_MOTION_PROFILES[id] }));
  const doc = {
    meta: {
      title: "Mood to Motion Map",
      version: "1.2.0",
      generated: new Date().toISOString().slice(0, 10),
      description:
        "Machine- and human-readable map from canonical feeling tags to motion implementation: each feeling maps to a motion profile (speed, shape, color, practical preset, surprise) in moodFeelingMotionProfiles; clusters merge motionPersonalityTags from those profiles. Includes motionAttributeGuide, motionPersonalityTags vocabulary, motionBlends, surpriseMotionByFeeling, moodScoreExamples, motionFeatureSchema, and motionMoodEngine philosophy — guidelines, not rigid rules. Timing presets carry human pace + Tailwind / anime.js / GSAP paste snippets. Cross-read React Bits, Magic UI, Kokonut UI, GSAP, Motion via libraries[] and moodClusters.",
    },
    animationReferenceHub: {
      treeUrl: animationRefHubUrl,
      files: buildAnimationHubResolved(),
    },
    motionVibesFromTool: motionVibeOptions,
    industryAnimationRefFit,
    motionLibraries,
    motionSitesKits,
    timingPresets: TIMING_PRESETS,
    feelingTagDefinitions: FEELING_TAG_CATALOG,
    motionAttributeGuide: MOTION_ATTRIBUTE_GUIDE,
    motionPersonalityTags: MOTION_PERSONALITY_TAGS,
    moodFeelingMotionProfiles,
    motionFeatureSchema: MOTION_FEATURE_SCHEMA,
    moodScoreExamples: MOOD_SCORE_EXAMPLES,
    motionBlends: MOTION_BLENDS,
    surpriseMotionByFeeling: SURPRISE_BY_FEELING,
    motionMoodEngine: MOTION_MOOD_ENGINE,
    moodClusters: moodClusters.map(enrichMoodCluster),
    reactBitsComponentIndex,
    globalRules,
  };

  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, "mood-to-motion-map.json");
  const mdPath = path.join(outDir, "mood-to-motion-map.md");
  const readmePath = path.join(outDir, "README.md");

  fs.writeFileSync(jsonPath, JSON.stringify(doc, null, 2), "utf8");
  fs.writeFileSync(mdPath, buildMarkdown(doc), "utf8");
  fs.writeFileSync(
    readmePath,
    `# Mood to Motion Map

Generated by **vibe-prompt-tool** (\`node scripts/generate-mood-to-motion-map.mjs\`).

- **mood-to-motion-map.json** — full structured map: \`feelingTagDefinitions\` + per-cluster \`feelingTags\`, \`timingPresets\` (human pace + copy-paste snippets), \`moodClusters\` (each links to a preset via \`timing.presetId\`), libraries, React Bits index, industry bias, hub URLs.
- **mood-to-motion-map.md** — readable guide for humans and LLMs.

Source repo: \`${path.relative(process.cwd(), root) || "."}\`

Regenerate after editing \`motion-vibes.mjs\`, \`animation-ref-presets.mjs\`, \`reactbits-name-blurbs.mjs\`, or \`scripts/generate-mood-to-motion-map.mjs\` (clusters / presets).
`,
    "utf8"
  );

  const stat = fs.statSync(jsonPath);
  console.log("Wrote", jsonPath, `(${(stat.size / 1024).toFixed(1)} KB)`);
  console.log("Wrote", mdPath);
  console.log("Wrote", readmePath);

  const pubDir = path.join(root, "public");
  fs.mkdirSync(pubDir, { recursive: true });
  const pubJson = path.join(pubDir, "mood-to-motion-map.json");
  fs.copyFileSync(jsonPath, pubJson);
  console.log("Synced", pubJson, "(for mood-motion-demo.html)");
}

main();
