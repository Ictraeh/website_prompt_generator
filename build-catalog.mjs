/**
 * One-shot builder: emits catalog.json with 50 styles × MotionSites contract fields.
 * Run: node build-catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  enrichDesignMdRefs,
  resolveDesignMdSlugs,
  DESIGN_MD_INDEX,
  DESIGN_MD_STITCH_FORMAT,
} from "./design-md-refs.mjs";

import { colorVibeGroups, colorVibes } from "./feel-color-vibes.mjs";
import {
  animationRefHubUrl,
  animationRefPresets,
  industryAnimationRefFit,
} from "./animation-ref-presets.mjs";
import { motionVibeOptions } from "./motion-vibes.mjs";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const designMdSlugsResolved = resolveDesignMdSlugs(fs, path, __dirname);
const designMdReferences = enrichDesignMdRefs(designMdSlugsResolved);

const pexelsPool = {
  heroVideos: [
    "https://videos.pexels.com/video-files/2495381/2495381-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/3044077/3044077-uhd_3840_2160_25fps.mp4",
    "https://videos.pexels.com/video-files/3129671/3129671-uhd_3840_2160_25fps.mp4",
    "https://videos.pexels.com/video-files/3195394/3195394-sd_640_360_25fps.mp4",
    "https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/2614134/2614134-sd_640_360_30fps.mp4",
    "https://videos.pexels.com/video-files/1448735/1448735-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/2796070/2796070-sd_640_360_24fps.mp4",
    "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/1916785/1916785-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/3255275/3255275-uhd_3840_2160_25fps.mp4",
  ],
  heroImages: [
    "https://images.pexels.com/photos/2387863/pexels-photo-2387863.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920",
  ],
  cardThumbs: [
    "https://images.pexels.com/photos/6476588/pexels-photo-6476588.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6476586/pexels-photo-6476586.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
};

/** MotionSites §4 — layout archetype contract snippets */
const l4Blueprint = {
  "L4.1":
    "§4.1 Full-bleed hero: `relative min-h-screen overflow-hidden`; media `absolute inset-0 object-cover` with explicit z (e.g. -z-10 vs content z-10); nav glass or transparent `max-w-7xl mx-auto justify-between`; hero placement: center stack | bottom anchor (`flex-1 flex flex-col justify-end pb-12 lg:pb-16`) | bottom-left editorial.",
  "L4.2":
    "§4.2 Email shell: outer dark `min-h-screen` + padding; inner `max-w-[640px] mx-auto ring-1 ring-white/5 shadow-2xl overflow-hidden`; dividers `h-px` centered; hero media `aspectRatio ~640/820` + gradient scrim % stops for legibility.",
  "L4.3":
    "§4.3 Multi-section landing: alternate full-bleed video vs solid sections; container `max-w-[1831px]` cinematic OR `max-w-7xl`; grids `lg:grid-cols-3|2|1` gap-6–8; closing high-contrast CTA band.",
  "L4.4":
    "§4.4 SaaS blocks: split hero (copy + mock), bento `rounded-[20px]–[32px]` + inner `aspect-*` or `pb-[100%]` ratio; calculator `lg:grid-cols-2` no gap `rounded-2xl overflow-hidden` with `divide-y` form column.",
  "L4.5":
    "§4.5 Editorial portfolio: large display + tight tracking; contrast words via `em.not-italic` pattern.",
  "L4.6":
    "§4.6 Card wall: `min-h-screen` + full-page `<BG_IMAGE>` cover + CSS grid fixed tiles (~384px, 16px gap); per-card loop video + scrim + 8–11px type + grotesk+script+mono font bundle aliases.",
  "L4.7":
    "§4.7 Slide deck: black stage; all slides mounted; `opacity`+`z-index`+`pointerEvents`; keyboard + dots; optional activationCount+key to replay enter while videos stay warm.",
  "L4.8":
    "§4.8 Scroll-scrub video: GSAP ScrollTrigger `scrub` → `video.currentTime`; seek coalescing while `video.seeking`; optional mouse parallax; buffer overlay until `canplay`.",
  "L4.11":
    "§4.11 Styleguide page: swatches, type ramp, button matrix, pseudo-3D press; panels at 900/600 style breakpoints → map to Tailwind md/lg or custom @media.",
  L4_DEFAULT:
    "Pick closest L4 from MotionSites-Prompt-Guide-Skill-Base §4; state hero placement, container max-width token, and forbidden overlays explicitly.",
};

/** Style library doc — Style Blend Reference (secondary intent) */
const styleBlends = [
  { id: "none", label: "None (no secondary blend)", hint: "" },
  {
    id: "aurora_glass",
    label: "Aurora + Glassmorphism",
    hint: "Dreamy translucent future UI — iridescent base + frosted panels; keep WCAG on body text.",
  },
  {
    id: "gothic_vapor",
    label: "Gothic + Vaporwave",
    hint: "Dark surreal neon nostalgia — blackletter/display tension + pastel glitch collage discipline.",
  },
  {
    id: "japandi_wabi",
    label: "Japandi + Wabi Sabi",
    hint: "Quiet natural minimal texture — low-chrome neutrals, asymmetry, slow transitions, tactile grain optional.",
  },
  {
    id: "neo_y2k",
    label: "Neo-Brutalism + Y2K",
    hint: "Bold glossy youth-forward — thick borders + chrome/holo accents; constrain motion budget (≤2–3 heavy effects per §3.2 perf note).",
  },
  {
    id: "deco_luxury_type",
    label: "Art Deco + Luxury Typography",
    hint: "Formal glamorous classic — symmetric geometry + extreme type-led whitespace; gold/jewel accents as tokens not ad-hoc gradients.",
  },
];

/** Optional stack modules — MotionSites §3.1 */
const stackProfiles = [
  {
    id: "vite_default",
    label: "Default: Vite + React 18 + TS + Tailwind 3 + lucide-react",
    optionalLines: [],
  },
  {
    id: "next_optional",
    label: "Add-on: Next.js 14 App Router (instead of Vite shell)",
    optionalLines: [
      "OPTIONAL framework: Next.js 14 App Router for routing/layout where spec requires SSR or nested routes; keep Tailwind content globs for `app/` + `components/`.",
    ],
  },
  {
    id: "hls_broadcast",
    label: "Add-on: long-form hero video · hls.js (.m3u8)",
    optionalLines: [
      "OPTIONAL media: `hls.js` + `<video>` with Safari native HLS fallback; `enableWorker: false` if sandboxed; attach MediaSource per MotionSites §3.1.",
    ],
  },
  {
    id: "gsap_scroll",
    label: "Add-on: GSAP timeline / ScrollTrigger (scrub, pin)",
    optionalLines: [
      "OPTIONAL timeline: `gsap` + `ScrollTrigger` (+ ScrollToPlugin if scroll-to anchors); version floor in package.json; respect reduced-motion.",
    ],
  },
  {
    id: "spline_3d",
    label: "Add-on: Spline 3D scene",
    optionalLines: [
      "OPTIONAL 3D: `@splinetool/react-spline` lazy scene; `pointer-events-none` on canvas chrome, `pointer-events-auto` on CTAs; mobile static fallback (perf tier S).",
    ],
  },
];

/** Kits where `plane` is element or both — used to rotate default UI motion per style id */
const ELEMENT_MOTION_KIT_IDS = new Set([
  "M-fade-rise",
  "M-char-cascade",
  "M-delay-fade",
  "M-media-zoom",
  "M-button-lift",
  "M-scroll-text-reveal",
  "M-horizontal-marquee",
  "M-clip-circle-menu",
  "M-slide-deck",
  "RB-Animations",
  "RB-Components",
  "RB-TextAnimations",
  "minimal",
]);

function hashMod(str, mod) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return mod ? Math.abs(h) % mod : Math.abs(h);
}

/** Each style gets a different first UI-motion candidate so prompts and models do not all latch onto M-fade-rise. */
function prioritizeStyleMotionOrder(styleId, ids) {
  const uniq = [...new Set((ids || []).filter(Boolean))];
  const elCandidates = uniq.filter((id) => ELEMENT_MOTION_KIT_IDS.has(id));
  if (!elCandidates.length) return uniq;
  const h = hashMod(`${styleId}|motionPri`, elCandidates.length);
  const primary = elCandidates[h];
  const rest = uniq.filter((id) => id !== primary);
  return [primary, ...rest];
}

function inferRecommendations(style) {
  const tags = new Set(style.skillTags || []);
  const id = style.id;
  const kw = (style.triggerKeywords || []).join(" ").toLowerCase();
  const fonts = new Set();
  const colors = new Set();
  const motions = new Set();

  const pf = (x) => fonts.add(x);
  const pc = (x) => colors.add(x);
  const pm = (x) => motions.add(x);

  if (tags.has("poster-type")) {
    pf("brutalist_poster");
    pf("automotive_bold");
    pc("midnight");
    pc("sunrise");
    pc("ocean");
    pc("neon");
  }
  if (tags.has("glass-nav")) {
    pm("M-fade-rise");
    pc("midnight");
    pc("aurora");
    pc("aurora");
  }
  if (tags.has("char-motion")) pm("M-char-cascade");
  if (tags.has("scroll-scrub-hero") || tags.has("gsap-heavy")) pm("M-scroll-scrub-video");
  if (tags.has("saas-grid") || tags.has("calculator")) {
    pf("warm_saas");
    pf("technical_ai");
    pc("slate");
    pc("slate");
    pc("arctic");
  }
  if (tags.has("script-accent")) pf("editorial_premium");
  if (tags.has("split-hero")) pf("warm_saas");
  if (tags.has("email-shell")) {
    pc("midnight");
    pc("cream");
    pf("editorial_premium");
  }
  if (tags.has("social-card-wall")) {
    pf("brutalist_poster");
    pm("M-media-zoom");
  }

  const neonish =
    /neon|cyber|synth|y2k|vapor|pixel|graffiti|arcade|hud|chrome|glitch/.test(id) || /neon|cyber|glitch|arcade/.test(kw);
  if (neonish) {
    pc("neon");
    pc("aurora");
    pf("spline_scifi");
    pm("M-scroll-text-reveal");
  }

  const soft = /ethereal|kawaii|coquette|shabby|japandi|wabi|light-academia|scrapbook|lace|pastel/.test(id);
  if (soft) {
    pc("petal");
    pc("lavender");
    pc("aurora");
    pf("warm_saas");
    pm("M-delay-fade");
  }

  const earth = /bohemian|farmhouse|south-west|western|steampunk|nautical|rustic|desert/.test(id) || /earth|terracotta|rust/.test(kw);
  if (earth) {
    pc("forest");
    pc("sand");
    pc("moss");
  }

  const lux =
    /luxury|baroque|filigree|victorian|tenebrism|deco|gothic|academia|neoclassical|acanthus|art-deco|filigree|coquette/.test(id) ||
    /luxury|gilded|heritage|museum|ceremonial/.test(kw);
  if (lux) {
    pc("void");
    pc("midnight");
    pc("copper");
    pf("editorial_premium");
  }

  const util = /utilitarian|bauhaus|bento|rebus|glassmorphism|neo-frutiger/.test(id);
  if (util) {
    pf("technical_ai");
    pc("slate");
    pc("arctic");
    pc("ocean");
  }

  if (tags.has("video-bg") && colors.size === 0) pc("midnight");
  pm("M-button-lift");
  if (![...motions].some((m) => m.startsWith("M-scroll"))) pm("M-fade-rise");

  if (fonts.size === 0) {
    pf("editorial_premium");
    pf("warm_saas");
  }
  if (colors.size === 0) {
    pc("cream");
    pc("slate");
  }

  const motionIds = prioritizeStyleMotionOrder(style.id, [...motions]);
  return {
    fontVibeIds: [...fonts].slice(0, 5),
    colorVibeIds: [...colors].slice(0, 6),
    motionIds: motionIds.slice(0, 4),
  };
}

/** Industry → ordered style ids (UI: ★ first = “best primary” picks; rest A–Z). Prompt: soft guidance, user may diverge. */
const industryStyleFit = {
  art_design: [
    "conceptual-sketch",
    "mixed-media",
    "neo-brutalism",
    "brutalism",
    "art-nouveau",
    "pop-art",
    "pointillism",
    "modular-typography",
  ],
  photography: [
    "tenebrism",
    "ethereal",
    "luxury-typography",
    "light-academia",
    "glassmorphism",
    "conceptual-sketch",
    "neo-brutalism",
  ],
  portfolio_cv: [
    "neo-brutalism",
    "brutalism",
    "bauhaus",
    "modular-typography",
    "glassmorphism",
    "conceptual-sketch",
    "luxury-typography",
    "bento-box",
  ],
  fashion_beauty: [
    "ethereal",
    "coquette",
    "luxury-typography",
    "y2k",
    "art-deco",
    "tenebrism",
    "filigree",
    "vaporwave",
  ],
  fitness_wellness: [
    "japandi",
    "ethereal",
    "wabi-sabi",
    "neo-frutiger-aero",
    "neo-brutalism",
    "synthwave",
    "glassmorphism",
    "bauhaus",
  ],
  food_restaurants: [
    "bohemian",
    "farmhouse-cottagecore",
    "shabby-chic",
    "japandi",
    "memphis",
    "mid-century-modern",
    "scrapbook",
    "kawaii",
  ],
  real_estate_home: [
    "mid-century-modern",
    "japandi",
    "bauhaus",
    "farmhouse-cottagecore",
    "tenebrism",
    "art-deco",
    "glassmorphism",
    "neoclassical",
  ],
  travel_tourism: [
    "bohemian",
    "south-west-wild-west",
    "nautical",
    "mystical-western",
    "ethereal",
    "vaporwave",
    "synthwave",
    "memphis",
  ],
  weddings_events: [
    "filigree",
    "shabby-chic",
    "ethereal",
    "coquette",
    "art-nouveau",
    "neoclassical",
    "light-academia",
    "pointillism",
  ],
  education: [
    "anthropomorphic",
    "light-academia",
    "japandi",
    "neo-frutiger-aero",
    "kawaii",
    "rebus",
    "bauhaus",
    "scrapbook",
  ],
  professional_services: [
    "neoclassical",
    "bauhaus",
    "glassmorphism",
    "bento-box",
    "neo-brutalism",
    "utilitarian",
    "art-deco",
    "tenebrism",
  ],
  community_nonprofits: [
    "light-academia",
    "japandi",
    "ethereal",
    "anthropomorphic",
    "rebus",
    "wabi-sabi",
    "scrapbook",
    "bauhaus",
  ],
  entertainment_media: [
    "synthwave",
    "vaporwave",
    "y2k",
    "cybercore",
    "pop-art",
    "graffiti",
    "pixel-art",
    "surrealism",
  ],
  hobbies_lifestyle: [
    "scrapbook",
    "kawaii",
    "coquette",
    "vaporwave",
    "memphis",
    "kitsch",
    "mixed-media",
    "anthropomorphic",
  ],
  saas_it_services: [
    "bento-box",
    "glassmorphism",
    "neo-frutiger-aero",
    "aurora",
    "utilitarian",
    "cybercore",
    "neo-brutalism",
    "bauhaus",
  ],
  ecommerce: ["memphis", "pop-art", "y2k", "neo-brutalism", "glassmorphism", "bento-box", "synthwave", "brutalism"],
  industrial: ["utilitarian", "brutalism", "cybercore", "bauhaus", "neo-frutiger-aero", "steampunk", "tenebrism", "modular-typography"],
};

const HERO_TEXT_RB_LINE = [
  "Hero type ONE ReactBits TextAnimations choice (do not copy last site): GradientText|ShinyText|GlitchText|FuzzyText|AsciiText",
  "Hero type ONE: CurvedLoop|RotatingText|CountUp (metrics) OR VariableProximity — keep subhead static for hierarchy",
  "Hero type ONE: ScrollReveal|ScrollFloat|ScrollVelocity on headline; body Inter, no nested heavy text effects",
  "Hero type ONE: Shuffle|Splittext OR ScrambledText|DecryptedText for cinematic reveal; cap total ≤900ms enter",
  "Hero type ONE: TextPressure|TextCursor for editorial/spatial feel; pair with subtle y12 opacity entrance",
  "Hero type ONE: BlurText|TrueFocus for soft luxury; avoid duplicate TextType default unless brand demands typewriter",
];

const HERO_STAGGER_LINE = [
  "Section rhythm: anime.timeline stagger 42–68ms on grids OR Motion staggerChildren 0.04–0.07 (pick one stack)",
  "Cards/lists: IntersectionObserver once + translateY opacity (no scroll-linked scrub on both UI+BG)",
  "Below-fold: `@starting-style` + view transitions OR CSS keyframes height/opacity sparingly on 1 band",
  "Feature rows: alternate offset (odd:translate-x-2 even:-translate-x-2) fade 500ms ease-out stagger 55ms",
];

const HERO_VIDEO_LINE = [
  "Hero media: full-bleed video + CSS Ken Burns scale 1→1.06 over 12s (pause on prefers-reduced-motion)",
  "Hero media: layered loop + gradient scrim; headline: plain CSS fade-up OR M-scroll-text-reveal (one driver only)",
  "Hero media: parallax transform on background only (translateZ-1 rAF or spring); UI stays transform-none for clarity",
];

const HERO_POSTER_LINE = [
  "Poster hero: @keyframes hue-shift or border-dash offset on one frame element; typography scale hover 1.01 max",
  "Poster hero: oversized display + clip-path inset wipe once on load; CTAs micro-bounce not scroll-scrub",
  "Poster hero: halftone/dot SVG mask animation OR crisp scale-in on key word only (rest static)",
];

function inferMotionInteractionBlurb(style) {
  const tags = style.skillTags || [];
  const m = style.recommendations?.motionIds || [];
  const mk = m.filter(Boolean).slice(0, 4).join("|");
  const h0 = hashMod(`${style.id}|ix`, 997);
  const bits = [`MotionSites M-kits:${mk || "M-fade-rise"}`];

  if (tags.includes("char-motion")) {
    bits.push(HERO_TEXT_RB_LINE[h0 % HERO_TEXT_RB_LINE.length]);
  } else if (tags.includes("video-bg")) {
    bits.push(HERO_VIDEO_LINE[h0 % HERO_VIDEO_LINE.length]);
  } else if (tags.includes("poster-type")) {
    bits.push(HERO_POSTER_LINE[h0 % HERO_POSTER_LINE.length]);
  } else if (tags.includes("scroll-scrub-hero") || tags.includes("gsap-heavy") || style.layoutArchetype === "L4.8") {
    bits.push(
      "Hero choreography: GSAP ScrollTrigger scrub/pin per MotionSites § — headline optional scrub; guard reduced-motion with static keyframe"
    );
  } else if (tags.includes("split-hero")) {
    bits.push(
      "Split hero: stagger L/R columns 80ms offset (anime or motion); mock panel inner micro-zoom M-media-zoom only inside card"
    );
  } else {
    bits.push(
      [
        "Hero entrance: M-scroll-text-reveal OR M-char-cascade headline (one); supporting line M-delay-fade",
        "Hero entrance: M-horizontal-marquee partner strip below fold only; H1 uses M-fade-rise or M-scroll-text-reveal",
        "Hero entrance: M-media-zoom on hero still with M-fade-rise copy column (asymmetric split)",
        "Hero entrance: ReactBits Animations Magnet|GlareHover OR Backgrounds DotField|Beams-lite behind headline (≤1 heavy module §3.2)",
      ][h0 % 4]
    );
  }

  if (tags.includes("video-bg") && !bits.some((b) => /Backgrounds|Aurora/i.test(b))) {
    bits.push("ReactBits Backgrounds pick ONE ambient layer: Aurora|Galaxy|Silk|Beams|DotField|Metaballs+scrim+GPU video");
  }
  if (tags.includes("glass-nav")) bits.push("Nav: CSS backdrop-blur+opacity slide-down OR anime stagger links 40ms (not both heavy)");
  if (tags.includes("stagger-motion")) bits.push(HERO_STAGGER_LINE[h0 % HERO_STAGGER_LINE.length]);
  if (tags.includes("gsap-heavy") || style.layoutArchetype === "L4.8") bits.push("GSAP: ScrollTrigger scrub/pin — cite MotionSites timeline § for pin spacing");
  if (tags.includes("scroll-scrub-hero")) bits.push("scroll-scrub video.currentTime guards + seek coalescing");
  if (tags.includes("poster-type") && !tags.includes("char-motion") && !tags.includes("video-bg")) {
    bits.push("Micro type pulse: CSS @keyframes letter-spacing breath on eyebrow only (≤4s loop)");
  }
  bits.push("Micro-IX:active:scale-[0.98] buttons;focus-visible:ring-2;transition 180–280ms;respect prefers-reduced-motion");
  return bits.join(" · ");
}

const styles = [
  ["neoclassical", "Neoclassical", "L4.3", ["center-hero", "mono-labels", "stagger-motion"], "Formal timeless authority; symmetry; marble/architectural refs", "Cinzel + EB Garamond or Inter", "Alabaster, slate, olive gray, antique gold", "luxury heritage, museum, legal, academia, symmetry, timeless authority"],
  ["baroque", "Baroque", "L4.3", ["bottom-hero", "script-accent", "stagger-motion"], "Ornate theatrical drama; layered modules", "Playfair Display + Lora", "Crimson, navy, plum, black, metallic gold", "invitation, premium event, luxury hospitality, gilded, dramatic lighting"],
  ["aurora", "Aurora", "L4.1", ["video-bg", "glass-nav", "center-hero", "stagger-motion"], "Fluid iridescent gradients; floating cards", "Space Grotesk + Inter", "Cyan-magenta-violet on dark space base", "web3, spiritual tech, aurora gradient, holographic, translucent"],
  ["ethereal", "Ethereal", "L4.1", ["center-hero", "glass-nav", "char-motion"], "Weightless soft hierarchy; misty imagery", "Cormorant Garamond + Manrope", "Pearl, dusty rose, pale sage, dove gray", "mindfulness, beauty ritual, gauze, misty, angelic"],
  ["filigree", "Filigree", "L4.5", ["script-accent", "mono-labels"], "Ornamental linework; invitation-like frames", "Great Vibes + Libre Baskerville", "Rose gold, platinum, emerald, charcoal", "wedding, jewelry, wine label, engraved ornament"],
  ["acanthus", "Acanthus", "L4.3", ["mono-labels", "saas-grid"], "Botanical ornament columns; editorial side notes", "Libre Baskerville + Lora", "Forest, sandstone, bronze, parchment", "museum, botanical luxury, classical leaf, carved ornament"],
  ["anthropomorphic", "Anthropomorphic", "L4.4", ["saas-grid", "stagger-motion"], "Character-led; rounded playful UI", "Nunito + Inter", "Bright playful or pastel-friendly", "kids app, edtech, mascot brand, expressive object"],
  ["pixel-art", "Pixel Art", "L4.4", ["poster-type", "saas-grid"], "Hard grid HUD; sharp borders", "Press Start 2P + IBM Plex Mono", "8-bit limited palette or terminal green-black", "indie game, retro event, dev portfolio, 8-bit"],
  ["conceptual-sketch", "Conceptual Sketch", "L4.5", ["split-hero", "poster-type"], "Collage, annotations, blueprint overlays", "Architects Daughter + Inter", "Graphite + paper + one marker accent", "architecture studio, wireframe, draft aesthetic"],
  ["luxury-typography", "Luxury Typography", "L4.1", ["center-hero", "poster-type"], "Type-led prestige; extreme whitespace", "Bodoni Moda + Inter", "Black-white-champagne", "couture, luxury beauty, editorial minimal"],
  ["japandi", "Japandi", "L4.3", ["split-hero", "saas-grid", "stagger-motion"], "Calm function; soft corners; natural materials", "Inter + Lora accent", "Oat, warm gray, sage, wood beige", "wellness, home decor, sustainable, calm interface"],
  ["memphis", "Memphis", "L4.6", ["social-card-wall", "poster-type"], "Broken grid; thick borders; loud pattern", "Bungee + Inter", "Hot pink, cyan, yellow, black-white patterns", "festival, youth campaign, squiggle, clashing colors"],
  ["bohemian", "Bohemian", "L4.3", ["bottom-hero", "video-bg", "stagger-motion"], "Layered media; textured backgrounds", "Fraunces + Inter", "Terracotta, mustard, turquoise, dusty rose", "artisan market, travel lifestyle, handmade, earthy texture"],
  ["shabby-chic", "Shabby Chic", "L4.2", ["email-shell", "script-accent"], "Soft ornamental borders; pastel cards", "Cormorant + Courier Prime", "Blush, pale blue, mint, cream", "wedding planner, bakery, vintage boutique, lace"],
  ["farmhouse-cottagecore", "Farmhouse / Cottagecore", "L4.3", ["center-hero", "stagger-motion"], "Story-first column; linen textures", "Merriweather + Source Sans 3", "Cream, forest green, denim blue, brown", "recipe blog, slow living, rustic"],
  ["victorian", "Victorian", "L4.3", ["script-accent", "mono-labels"], "Framed modules; damask texture", "EB Garamond + Crimson Text", "Burgundy, forest, antique gold, charcoal", "tea brand, historical fiction, damask"],
  ["art-deco", "Art Deco", "L4.1", ["center-hero", "mono-labels", "glass-nav"], "Symmetric glamour; sunburst dividers", "Cinzel Decorative + Inter", "Black-gold-emerald, navy-gold-cream", "cocktail lounge, luxury hotel, gatsby"],
  ["art-nouveau", "Art Nouveau", "L4.5", ["script-accent"], "Curvilinear separators; botanical frames", "Poiret One + Lora", "Olive, mustard, burnt orange, soft teal", "artisan cosmetics, boutique winery, floral curve"],
  ["mystical-western", "Mystical Western", "L4.1", ["bottom-hero", "video-bg"], "Desert dusk; tarot iconography", "Rye + Source Serif 4", "Terracotta, midnight blue, dusty sage", "tarot app, indie music, desert occult"],
  ["kitsch", "Kitsch", "L4.6", ["social-card-wall"], "Scrapbook clutter; sticker modules", "Bungee + DM Sans", "Hot pink, lime, turquoise, cherry red", "parody campaign, camp, ironic retro"],
  ["y2k", "Y2K", "L4.1", ["video-bg", "glass-nav", "stagger-motion"], "Chrome gloss; fisheye; glossy controls", "Orbitron + Inter", "Chrome silver, icy blue, magenta, holo gradient", "streetwear drop, cyber millennium, glossy futurism"],
  ["bauhaus", "Bauhaus", "L4.4", ["saas-grid", "split-hero"], "Rigid grid; primary geometry", "Montserrat + Inter", "Red blue yellow black white", "architecture studio, form follows function"],
  ["brutalism", "Brutalism", "L4.4", ["poster-type", "saas-grid"], "Heavy borders; raw contrast", "Space Mono + Inter", "Black white one hard accent", "experimental portfolio, brutalist web, raw ui"],
  ["cybercore", "Cybercore", "L4.4", ["saas-grid", "gsap-heavy"], "HUD panels; scan lines; data stacks", "Share Tech Mono + Inter", "Neon green black cyan warning red", "cyber security, hacker ui, glitch neon"],
  ["synthwave", "Synthwave", "L4.1", ["video-bg", "bottom-hero"], "Neon horizon; VHS blur hints", "Audiowide + JetBrains Mono", "Magenta purple cyan orange navy", "arcade promo, outrun, neon grid"],
  ["vaporwave", "Vaporwave", "L4.5", ["split-hero", "poster-type"], "Desktop windows collage; grain", "VT323 + Instrument Serif", "Pastel pink lavender mint cyan", "indie zine, greek bust, glitch collage"],
  ["pop-art", "Pop Art", "L4.6", ["social-card-wall", "poster-type"], "Halftone; comic panels; hard shadow", "Anton + Inter", "Yellow cyan magenta black outlines", "retail campaign, halftone comic, speech bubble"],
  ["bento-box", "Bento Box", "L4.4", ["saas-grid", "split-hero"], "Rounded modular grid mixed spans", "Inter + Plus Jakarta Sans", "Neutral surfaces restrained accents", "dashboard, productivity app, modular cards"],
  ["graffiti", "Graffiti", "L4.3", ["poster-type", "stagger-motion"], "Angled comps; concrete texture", "Permanent Marker + Inter", "Neon on dark concrete", "streetwear, music festival, spray paint"],
  ["tenebrism", "Tenebrism", "L4.1", ["video-bg", "bottom-hero"], "Spotlight portraits; cinematic dark", "Instrument Serif + Inter", "Black base amber highlights crimson", "luxury watch, chiaroscuro, dramatic darkness"],
  ["gothic", "Gothic", "L4.3", ["mono-labels", "script-accent"], "Cathedral verticality; stained glass refs", "UnifrakturMaguntia + EB Garamond", "Black plum blood red silver", "fantasy brand, blackletter, medieval dark"],
  ["pointillism", "Pointillism", "L4.5", ["center-hero", "char-motion"], "Stipple/grain hero; gallery whitespace", "Cormorant + Inter", "Impressionist soft hues", "fine art platform, stipple texture"],
  ["mixed-media", "Mixed Media", "L4.5", ["split-hero", "saas-grid", "stagger-motion"], "Collage z-index storytelling", "Archivo Black + Caveat + Inter", "BW + bright marker accents", "culture magazine, torn paper, analog digital"],
  ["steampunk", "Steampunk", "L4.3", ["mono-labels"], "Brass gears; map-like nav", "IM Fell English + Courier Prime", "Copper brass mahogany parchment", "game worldbuilding, clockwork fantasy"],
  ["kawaii", "Kawaii", "L4.4", ["saas-grid", "stagger-motion"], "Rounded cards; mascot-friendly", "Baloo 2 + Nunito", "Pastel pink mint lilac butter yellow", "stationery shop, cute mascot, pastel playful"],
  ["coquette", "Coquette", "L4.2", ["email-shell", "script-accent"], "Ribbon separators; film glow", "Cormorant Infant + Great Vibes + Inter", "Baby pink cream pearl cherry accent", "beauty brand, lace ribbon, feminine vintage"],
  ["surrealism", "Surrealism", "L4.8", ["scroll-scrub-hero", "gsap-heavy"], "Dream logic; unusual composition (perf toggle)", "Syne + Inter", "Muted cinematic or hyper-real", "concept campaign, dream logic"],
  ["utilitarian", "Utilitarian", "L4.4", ["saas-grid", "calculator"], "Dense tables; safety accents", "Roboto Condensed + Roboto Mono", "Olive gray white safety orange", "technical docs, logistics dashboard"],
  ["mid-century-modern", "Mid-Century Modern", "L4.3", ["split-hero", "stagger-motion"], "Curved masks; warm optimistic blocks", "Josefin Sans + Lora", "Mustard teal burnt orange walnut cream", "furniture brand, boomerang motif"],
  ["scrapbook", "Scrapbook", "L4.5", ["split-hero", "poster-type"], "Polaroid tape layers; offset blocks", "Patrick Hand + IBM Plex Sans", "Paper white kraft soft sticker tones", "journaling app, washi tape, handwritten collage"],
  ["neo-frutiger-aero", "Neo Frutiger Aero", "L4.4", ["saas-grid", "glass-nav"], "Glossy bubbles; rounded eco-tech", "Plus Jakarta Sans + Inter", "Aqua lime white translucent cyan", "fintech, eco-tech, glossy y2k ui"],
  ["dark-magic-academia", "Dark Magic Academia", "L4.3", ["bottom-hero", "mono-labels"], "Candlelit library; manuscript cards", "Cinzel + Crimson Text", "Charcoal parchment emerald tarnished gold", "fantasy community, spellbook, candlelit library"],
  ["light-academia", "Light Academia", "L4.3", ["center-hero", "char-motion"], "Sunlit books; airy editorial columns", "Lora + Inter", "Cream beige camel soft gold", "study app, literature brand, poetic soft"],
  ["wabi-sabi", "Wabi Sabi", "L4.3", ["split-hero", "stagger-motion"], "Asymmetric anchors; slow transitions", "Sora + Inter", "Clay moss ash linen charcoal low sat", "ceramics brand, tea retreat, imperfection beauty"],
  ["south-west-wild-west", "South West / Wild West", "L4.1", ["video-bg", "poster-type"], "Desert landscapes; signboard modules", "Rye + Barlow", "Terracotta turquoise sand rust", "ranch brand, outdoor festival, western slab"],
  ["nautical", "Nautical", "L4.3", ["mono-labels", "saas-grid"], "Stripe dividers; brass accents", "Fjalla One + Inter", "Navy white brass signal red", "resort, seafood, maritime, navy stripe"],
  ["rebus", "Rebus", "L4.4", ["saas-grid", "stagger-motion"], "Pictogram puzzle flow; hover reveals", "Fredoka + Inter", "High contrast BW + one bright accent", "educational game, visual pun"],
  ["glassmorphism", "Glassmorphism", "L4.1", ["glass-nav", "video-bg", "stagger-motion"], "Frosted depth; liquid-glass recipe", "Inter + Poppins", "Vivid gradients under frosted overlays", "modern dashboard, frosted ui"],
  ["modular-typography", "Modular Typography", "L4.11", ["styleguide-page", "poster-type"], "Visible grid; type-driven sections", "Bebas Neue + Inter", "Monochrome + one neon accent", "design festival, type grid, geometric letterform"],
  ["neo-brutalism", "Neo-Brutalism", "L4.4", ["saas-grid", "poster-type", "stagger-motion"], "Thick borders hard shadows usable-bold", "Archivo Black + Inter", "Mint yellow black white cobalt", "creative agency, gen z product, hard shadow"],
];

/** Plain-language blurbs for the style picker (no catalog index). */
const styleUserBlurbs = {
  neoclassical:
    "Greco-Roman columns & symmetry—reads institutional, museum, timeless luxury.",
  baroque:
    "Ornate 17th-c. drama: deep velvets, gold, layered frames—gala, opera, high hospitality.",
  aurora:
    "Iridescent gradients on dark space + glass—spiritual tech, Web3, soft futurism.",
  ethereal:
    "Feather-light hierarchy & misty imagery—wellness, skincare, calm rituals.",
  filigree:
    "Jewelry-fine lines & invitation frames—weddings, wine labels, heirloom brands.",
  acanthus:
    "Classical carved-leaf ornament in layout—botanical luxury, heritage institutions.",
  anthropomorphic:
    "Mascot-led, rounded friendly UI—kids, edtech, playful consumer apps.",
  "pixel-art":
    "8-bit grids & HUD chrome—indie games, retro dev culture, arcade drops.",
  "conceptual-sketch":
    "Hand-drawn collage & blueprint overlays—studios, pitches, design-in-progress.",
  "luxury-typography":
    "Type is the hero with vast whitespace—couture, prestige beauty, editorial.",
  japandi:
    "Japanese calm × Scandinavian function—neutral wood, soft corners, home & wellness.",
  memphis:
    "1980s Memphis Group: loud geometry & squiggles—festivals, youth campaigns.",
  bohemian:
    "Layered textures & earthy palette—artisan, travel, handmade lifestyle.",
  "shabby-chic":
    "Distressed pastel romance—weddings, bakeries, vintage feminine retail.",
  "farmhouse-cottagecore":
    "Rustic cozy storytelling—recipes, slow living, pastoral brands.",
  victorian:
    "Damask, burgundy, framed density—historical fiction, tea, gothic romance lite.",
  "art-deco":
    "1920s sunbursts & symmetry—cocktail bars, boutique hotels, Gatsby glam.",
  "art-nouveau":
    "Whiplash curves & botanical frames—artisan cosmetics, boutique wineries.",
  "mystical-western":
    "Desert dusk + tarot motifs—indie music, occult Americana, moody outdoors.",
  kitsch:
    "Ironic camp & sticker clutter—parody ads, playful subversion, pop irony.",
  y2k:
    "Chrome, gloss, fisheye, bubble UI—streetwear, millennium nostalgia, hype drops.",
  bauhaus:
    "Primary colors on a strict grid—design schools, modernist credibility.",
  brutalism:
    "Raw concrete digital: stark type & borders—experimental portfolios, art sites.",
  cybercore:
    "HUD stacks, scanlines, terminal neon—cybersec, hacker aesthetic, sci-fi tools.",
  synthwave:
    "Sunset grids & neon highways—arcade promos, outrun, retro gaming energy.",
  vaporwave:
    "Pastel glitch collage & ironic classics—zines, music, internet-nostalgia art.",
  "pop-art":
    "Halftone & comic panels with hard shadows—bold retail, poster campaigns.",
  "bento-box":
    "Rounded modular tiles like a lunchbox—dashboards, Apple-like product UI.",
  graffiti:
    "Spray concrete angles & street energy—festivals, streetwear, urban music.",
  tenebrism:
    "Single spotlight on deep shadow—luxury watches, cinematic chiaroscuro.",
  gothic:
    "Cathedral verticals & blackletter mood—fantasy, dark luxury, metal culture.",
  pointillism:
    "Stippled texture & gallery whitespace—museums, fine-art platforms.",
  "mixed-media":
    "Cut-paste layers & z-axis storytelling—culture mags, hybrid campaigns.",
  steampunk:
    "Brass gears & Victorian sci-fi—games, alt-history, maker fiction worlds.",
  kawaii:
    "Pastel cute Japanese pop—stationery, mascots, soft Gen-Z consumer.",
  coquette:
    "Ribbon, lace, film glow—beauty, soft-femme social, romantic vintage.",
  surrealism:
    "Dream logic & odd compositions—art-led brands (often needs heavier motion).",
  utilitarian:
    "Dense tables & safety accents—logistics, ops dashboards, internal tools.",
  "mid-century-modern":
    "1950s curves & optimistic color—furniture, retro interiors, Mad Men era.",
  scrapbook:
    "Tape, polaroids, handwriting—journaling apps, DIY, personal storytelling.",
  "neo-frutiger-aero":
    "Glossy aqua “aero” bubbles reborn—eco-fintech, friendly green tech UI.",
  "dark-magic-academia":
    "Candlelit libraries & occult study—fantasy fandoms, RPG lore, bookish dark.",
  "light-academia":
    "Sunlit books & soft scholarly calm—reading apps, literature-forward brands.",
  "wabi-sabi":
    "Asymmetry & imperfect natural tones—ceramics, tea, mindful imperfection.",
  "south-west-wild-west":
    "Desert slabs & frontier signage—ranch, outdoor festivals, Southwest lifestyle.",
  nautical:
    "Navy stripes, rope, brass—marinas, seafood, coastal resorts.",
  rebus:
    "Picture riddles & icon puzzles—playful onboarding, kids’ learning flows.",
  glassmorphism:
    "Frosted panels over vivid gradients—SaaS dashboards, modern glass depth.",
  "modular-typography":
    "Letters lock into a visible grid—type conferences, brutal type posters.",
  "neo-brutalism":
    "Thick black borders & hard drop shadows—agencies, Gen-Z bold consumer apps.",
};

const styleObjects = styles.map((row, idx) => {
  const [id, name, l4, tags, artDirection, fonts, colors, kw] = row;
  const vi = idx % pexelsPool.heroVideos.length;
  const ii = idx % pexelsPool.heroImages.length;
  const base = {
    id,
    name,
    libraryNumber: idx + 1,
    layoutArchetype: l4,
    skillTags: tags,
    artDirection,
    fontPairingHint: fonts,
    colorSystemHint: colors,
    triggerKeywords: kw.split(", ").map((s) => s.trim()),
    pexels: {
      heroVideo: pexelsPool.heroVideos[vi],
      heroImage: pexelsPool.heroImages[ii],
      cardThumb: pexelsPool.cardThumbs[idx % pexelsPool.cardThumbs.length],
    },
  };
  const libraryMood = artDirection.split(";")[0].trim();
  let libraryLayout =
    "Clear hierarchy, varied rhythm, purposeful sections (style-library global rules).";
  if (tags.includes("email-shell")) {
    libraryLayout =
      "Newsletter/email-width inner shell, stacked rhythm, centered dividers, fixed-aspect hero media (style library).";
  } else if (tags.includes("social-card-wall")) {
    libraryLayout =
      "Fixed grid card wall on full-page background; small-type mixed font roles (style library).";
  } else if (tags.includes("saas-grid") && tags.includes("split-hero")) {
    libraryLayout =
      "Modular product grids + split hero with secondary panel (style library + L4.4).";
  } else if (tags.includes("center-hero") && tags.includes("glass-nav")) {
    libraryLayout =
      "Cinematic centered stack + translucent chrome; generous vertical air (style library).";
  }
  const recommendations = inferRecommendations(base);
  const withRec = { ...base, recommendations };
  return {
    ...base,
    libraryMood,
    libraryLayout,
    userBlurb: styleUserBlurbs[id] || libraryMood,
    recommendations,
    interactionMotionBlurb: inferMotionInteractionBlurb(withRec),
  };
});

const platforms = [
  {
    id: "web_marketing_landing",
    label: "Marketing landing (multi-section)",
    labelEn: "Marketing landing (multi-section)",
    defaultSections: 5,
    stackNote: "React + TypeScript + Vite + Tailwind + lucide-react; optional motion",
  },
  {
    id: "web_hero_single",
    label: "Single-viewport hero",
    labelEn: "Single-viewport hero",
    defaultSections: 1,
    stackNote: "React + TypeScript + Vite + Tailwind",
  },
  {
    id: "web_app_product",
    label: "Product web app shell",
    labelEn: "Product web app shell",
    defaultSections: 4,
    stackNote: "React + TypeScript + Vite + Tailwind; optional shadcn/ui",
  },
  {
    id: "web_app_dashboard",
    label: "Dashboard web app",
    labelEn: "Dashboard web app",
    defaultSections: 6,
    stackNote: "React + TypeScript + Vite + Tailwind + dense tables/charts placeholders",
  },
];

const industries = [
  { id: "art_design", label: "Art & Design" },
  { id: "photography", label: "Photography" },
  { id: "portfolio_cv", label: "Portfolio & CV" },
  { id: "fashion_beauty", label: "Fashion & Beauty" },
  { id: "fitness_wellness", label: "Fitness & Wellness" },
  { id: "food_restaurants", label: "Food & Restaurants" },
  { id: "real_estate_home", label: "Real Estate & Home Services" },
  { id: "travel_tourism", label: "Travel & Tourism" },
  { id: "weddings_events", label: "Weddings & Events" },
  { id: "education", label: "Education" },
  { id: "professional_services", label: "Professional Services" },
  { id: "community_nonprofits", label: "Community & Non-Profits" },
  { id: "entertainment_media", label: "Entertainment & Media" },
  { id: "hobbies_lifestyle", label: "Hobbies & Lifestyle" },
  { id: "saas_it_services", label: "SaaS & IT Services" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "industrial", label: "Industrial" },
];

/**
 * Vertical-aware motion priorities — merged after each style's `recommendations.motionIds` for Auto picks + dropdown sort.
 * All motion kits remain selectable; this only biases order (★) and defaults.
 */
const industryMotionFit = {
  art_design: {
    hint: "Portfolio-led: editorial text reveals + layered BGs; avoid stacking multiple scroll-scrub drivers.",
    elementIds: ["M-scroll-text-reveal", "M-char-cascade", "M-fade-rise", "RB-TextAnimations", "M-media-zoom", "M-delay-fade"],
    backgroundIds: ["RB-Backgrounds", "M-spotlight-mask", "M-video-raf-loop", "minimal"],
  },
  photography: {
    hint: "Hero media first: soft UI entrance; immersive BG loops or scrub only when the page is hero-led.",
    elementIds: ["M-media-zoom", "M-fade-rise", "M-delay-fade", "M-button-lift", "RB-Components"],
    backgroundIds: ["M-scroll-scrub-video", "M-video-raf-loop", "minimal", "RB-Backgrounds"],
  },
  portfolio_cv: {
    hint: "Personal brand: crisp section reveals; optional scroll-linked headline—keep BG calmer than UI.",
    elementIds: ["M-scroll-text-reveal", "M-fade-rise", "M-char-cascade", "M-delay-fade", "RB-TextAnimations"],
    backgroundIds: ["minimal", "M-video-raf-loop", "RB-Backgrounds", "M-spotlight-mask"],
  },
  fashion_beauty: {
    hint: "Campaign energy: headline choreography + partner strip; spotlight or premium BG washes.",
    elementIds: ["M-char-cascade", "M-horizontal-marquee", "M-fade-rise", "M-media-zoom", "RB-TextAnimations"],
    backgroundIds: ["M-spotlight-mask", "M-video-raf-loop", "RB-Backgrounds", "minimal"],
  },
  fitness_wellness: {
    hint: "Motivating but readable: strong CTAs + calm sections; video hero common—guard text contrast.",
    elementIds: ["M-button-lift", "M-fade-rise", "M-media-zoom", "M-delay-fade"],
    backgroundIds: ["M-video-raf-loop", "minimal", "RB-Backgrounds"],
  },
  food_restaurants: {
    hint: "Menu-forward: card media hover; warm BG video or soft ambient—no competing scrub on UI+BG.",
    elementIds: ["M-media-zoom", "M-fade-rise", "M-horizontal-marquee", "M-button-lift"],
    backgroundIds: ["M-video-raf-loop", "M-spotlight-mask", "minimal"],
  },
  real_estate_home: {
    hint: "Trust + space: restrained UI; full-bleed property media with subtle BG treatment.",
    elementIds: ["M-delay-fade", "M-fade-rise", "M-media-zoom", "RB-Components"],
    backgroundIds: ["M-video-raf-loop", "minimal", "RB-Backgrounds"],
  },
  travel_tourism: {
    hint: "Destination story: tickers for partners ok; cinematic BG without drowning primary CTAs.",
    elementIds: ["M-horizontal-marquee", "M-fade-rise", "M-scroll-text-reveal", "M-media-zoom"],
    backgroundIds: ["M-scroll-scrub-video", "M-video-raf-loop", "RB-Backgrounds", "M-spline-bg"],
  },
  weddings_events: {
    hint: "Romantic hierarchy: headline cascades; soft masks—keep motion purposeful for RSVP paths.",
    elementIds: ["M-char-cascade", "M-fade-rise", "M-delay-fade", "RB-TextAnimations"],
    backgroundIds: ["M-spotlight-mask", "M-video-raf-loop", "RB-Backgrounds", "minimal"],
  },
  education: {
    hint: "Clarity first: deck/slide patterns for curricula; reduced-motion friendly entrances.",
    elementIds: ["M-slide-deck", "M-delay-fade", "RB-Components", "M-fade-rise", "M-button-lift"],
    backgroundIds: ["minimal", "M-video-raf-loop", "RB-Backgrounds"],
  },
  professional_services: {
    hint: "Credibility: minimal choreography; dense pages favor delay-fade over flashy scrub.",
    elementIds: ["M-delay-fade", "M-fade-rise", "minimal", "M-button-lift", "RB-Components"],
    backgroundIds: ["minimal", "M-video-raf-loop", "RB-Backgrounds"],
  },
  community_nonprofits: {
    hint: "Inclusive + low-friction: simple reveals; story BG without heavy 3D.",
    elementIds: ["M-fade-rise", "M-button-lift", "M-delay-fade", "RB-Components"],
    backgroundIds: ["minimal", "M-video-raf-loop", "RB-Backgrounds"],
  },
  entertainment_media: {
    hint: "Showcase: bolder layers allowed—still one primary scroll driver between UI and BG.",
    elementIds: ["M-horizontal-marquee", "M-scroll-text-reveal", "M-char-cascade", "RB-Animations", "M-slide-deck"],
    backgroundIds: ["RB-Backgrounds", "M-scroll-scrub-video", "M-spline-bg", "M-spotlight-mask", "M-video-raf-loop"],
  },
  hobbies_lifestyle: {
    hint: "Community clubs: lively tickers optional; large touch targets on mobile.",
    elementIds: ["M-fade-rise", "M-horizontal-marquee", "M-media-zoom", "RB-Components"],
    backgroundIds: ["RB-Backgrounds", "M-video-raf-loop", "M-spotlight-mask", "minimal"],
  },
  saas_it_services: {
    hint: "Product truth: table-safe motion; micro-interactions on controls beat headline gimmicks.",
    elementIds: ["M-delay-fade", "M-button-lift", "RB-Components", "M-fade-rise", "minimal"],
    backgroundIds: ["minimal", "M-video-raf-loop", "RB-Backgrounds"],
  },
  ecommerce: {
    hint: "Merch/grid: hover zoom on cards; trust CTAs; BG stays subtle for product readability.",
    elementIds: ["M-media-zoom", "M-button-lift", "M-fade-rise", "M-horizontal-marquee"],
    backgroundIds: ["M-video-raf-loop", "minimal", "RB-Backgrounds"],
  },
  industrial: {
    hint: "B2B sturdiness: few effects; precision fades; optional operations BG loop.",
    elementIds: ["M-delay-fade", "M-fade-rise", "minimal", "M-button-lift"],
    backgroundIds: ["minimal", "M-video-raf-loop", "RB-Backgrounds"],
  },
};

/** MotionSites §5.1 pairing recipes — + 中文「气质」标签（风格库模糊意图） */
const fontVibes = [
  {
    id: "editorial_premium",
    pairingRecipeId: 1,
    labelZh: "冷淡编辑 · 衬线权威",
    pickerLabel: "Editorial premium — serif display + neutral sans",
    moodTags: ["美术馆", "时装", "克制"],
    label: "编辑级高级感（衬线标题 + 中性无衬线正文）",
    display: "Instrument Serif",
    body: "Inter",
    notes: "§5.2 H1 ladder text-4xl→xl:text-7xl; letterSpacing -0.04em or tracking-tight; leading-[0.95]–[1.1]; body -webkit-font-smoothing antialiased",
  },
  {
    id: "brutalist_poster",
    pairingRecipeId: 2,
    labelZh: "粗野海报 · 压缩无衬线",
    pickerLabel: "Brutalist poster — tight sans + mono body",
    moodTags: ["实验", "地下", "噪声"],
    label: "粗野海报（超紧无衬线 + 等宽正文）",
    display: "Anton",
    body: "IBM Plex Mono",
    notes: "Uppercase mono labels; poster scale; avoid illegible micro type except L4.6 card-wall pattern",
  },
  {
    id: "warm_saas",
    pairingRecipeId: 3,
    labelZh: "温暖 SaaS · 亲和几何",
    pickerLabel: "Warm SaaS — rounded geometry + serif accents",
    moodTags: ["产品", "信任", "圆润"],
    label: "温暖 SaaS（圆角几何 + 衬线点缀）",
    display: "Plus Jakarta Sans",
    body: "Inter",
    notes: "Rounded radii; Instrument Serif accents only where style library calls for serif warmth",
  },
  {
    id: "technical_ai",
    pairingRecipeId: 4,
    labelZh: "技术 / AI · 冷静数据",
    pickerLabel: "Technical / AI — dense data + mono readouts",
    moodTags: ["开发者", "指标", "面板"],
    label: "技术 / AI 产品（Geist / Sora 感）",
    display: "Sora",
    body: "Inter",
    mono: "JetBrains Mono",
    notes: "Dense copy + mono for readouts; tabular nums where metrics",
  },
  {
    id: "deck_subtitles",
    pairingRecipeId: 5,
    labelZh: "路演字幕 · 斜体衬线",
    pickerLabel: "Deck / keynote — italic serif + Barlow",
    moodTags: ["Deck", "叙事", "字幕感"],
    label: "路演 / Deck（斜体衬线 + Barlow）",
    display: "Instrument Serif",
    body: "Barlow",
    notes: "Italic display for deck titles; Material Symbols optional for icon rows per §5.1",
  },
  {
    id: "automotive_bold",
    pairingRecipeId: 6,
    labelZh: "汽车张力 · 超粗展示",
    pickerLabel: "Automotive / sports — ultra-bold display",
    moodTags: ["速度", "全大写", "横幅"],
    label: "汽车 / 运动张力（超粗展示）",
    display: "Bebas Neue",
    body: "Inter",
    notes: "Uppercase nav + decorative giant type; keep body readable size",
  },
  {
    id: "spline_scifi",
    pairingRecipeId: 7,
    labelZh: "科幻启动 · 轨道感",
    pickerLabel: "Sci-fi launch — orbital display + Spline",
    moodTags: ["太空", "HUD", "Spline"],
    label: "科幻 / 3D 启动页",
    display: "Orbitron",
    body: "Space Grotesk",
    mono: "JetBrains Mono",
    notes: "§5.1 recipe 7; pair with optional Spline stackProfile + pointer-events layering",
  },
  {
    id: "megatype_syne_hero",
    labelZh: "超大展示字 · 两词封面",
    pickerLabel: "Megatype Syne — 1–2 word clamp hero + 1rem body",
    moodTags: ["statement", "gallery", "poster"],
    label: "Megatype Syne — giant 2-word hero + 1rem paragraphs",
    display: "Syne",
    body: "DM Sans",
    notes:
      "Google Fonts: Syne 700–800 + DM Sans 400–500. Hero ≤2 words: text-[clamp(3.5rem,14vw,11rem)] font-extrabold leading-[0.92] tracking-tighter; body text-base leading-relaxed (1rem). Reserve display weight for hero + one section title only.",
  },
  {
    id: "artsy_display_shrikhand",
    labelZh: "趣味艺术展示 · Shrikhand",
    pickerLabel: "Artsy Shrikhand — playful display + Nunito body",
    moodTags: ["playful", "boutique", "creative"],
    label: "Artsy Shrikhand — bold display + rounded body",
    display: "Shrikhand",
    body: "Nunito",
    notes:
      "Google Fonts: Shrikhand + Nunito. Display on short wordmarks and kicker labels; body Nunito 1rem/1.65; never set long paragraphs in Shrikhand.",
  },
  {
    id: "mega_bebas_literata",
    labelZh: "全屏词碑 · Bebas + 衬线正文",
    pickerLabel: "Mega Bebas — ALL CAPS stack + Literata reading",
    moodTags: ["cinema", "poster", "bold"],
    label: "Mega Bebas — XXL condensed lines + Literata 1rem",
    display: "Bebas Neue",
    body: "Literata",
    notes:
      "Google Fonts: Bebas Neue + Literata. Hero: text-[clamp(3rem,12vw,10rem)] uppercase tracking-tight, max 2–3 words per line; long copy Literata text-base.",
  },
  {
    id: "fatface_abril_editorial",
    labelZh: "浓墨展示 · Abril Fatface",
    pickerLabel: "Abril Fatface — fat display + Source Serif 4",
    moodTags: ["editorial", "luxury", "magazine"],
    label: "Abril Fatface — dramatic serif display + Source Serif body",
    display: "Abril Fatface",
    body: "Source Serif 4",
    notes:
      "Google Fonts: Abril Fatface for very short hero (few words) on solid or dark bands; Source Serif 4 at 1rem for articles; tight display tracking.",
  },
];

/** Motion kit groups: site-wide §8 M-kits + React Bits buckets (filters Motion code panel) */
const motionKitGroups = [
  { id: "site", label: "Site / page-level (MotionSites §8)" },
  {
    id: "reactbits",
    label: "React Bits categories (filters panel to React Bits; else show GSAP / Anime.js too)",
  },
];

/**
 * MotionSites §8 + React Bits — ids stay English for prompts.
 * plane: element = UI/choreography on components; background = hero/ambient layers; both = allowed in either picker.
 * energy: gentle default bias; playful = extra delight; bold = heavier / scroll / 3D.
 */
const motionKits = [
  {
    id: "M-fade-rise",
    group: "site",
    plane: "element",
    energy: "gentle",
    label: "Fade-rise — sections ease in upward",
    detail: "~0.8s ease-out; translateY(24px)→0; stagger via animation-delay",
  },
  {
    id: "M-char-cascade",
    group: "site",
    plane: "element",
    energy: "playful",
    label: "Character cascade — headline attention",
    detail: "~30ms/char; 200ms start delay; opacity + translateX on inline-block spans",
  },
  {
    id: "M-delay-fade",
    group: "site",
    plane: "element",
    energy: "gentle",
    label: "Delayed fade — calmer entrance",
    detail: "opacity 0→1 after delay; transition-opacity ~1000ms",
  },
  {
    id: "M-media-zoom",
    group: "site",
    plane: "element",
    energy: "gentle",
    label: "Image/video hover zoom",
    detail: "group overflow-hidden rounded-[14px]; child duration-700 group-hover:scale-[1.03]",
  },
  {
    id: "M-button-lift",
    group: "site",
    plane: "element",
    energy: "gentle",
    label: "Button hover lift",
    detail: "hover:-translate-y-0.5 transition-all duration-200 + subtle bg",
  },
  {
    id: "M-video-raf-loop",
    group: "site",
    plane: "background",
    energy: "gentle",
    label: "Video loop crossfade — seamless feel",
    detail: "rAF near loop ends; guard re-entrancy; on ended reset currentTime",
  },
  {
    id: "M-scroll-text-reveal",
    group: "site",
    plane: "element",
    energy: "playful",
    label: "Scroll-linked text reveal",
    detail: "motion useScroll + useTransform per word/char opacity",
  },
  {
    id: "M-horizontal-marquee",
    group: "site",
    plane: "element",
    energy: "playful",
    label: "Horizontal marquee — logos / ticker",
    detail: "duplicate row translateX(-50%) infinite linear; optional edge masks",
  },
  {
    id: "M-scroll-scrub-video",
    group: "site",
    plane: "background",
    energy: "bold",
    label: "Scroll-scrubbed video — progress follows scroll",
    detail: "GSAP ScrollTrigger scrub→video.currentTime; seek coalescing; buffer overlay",
  },
  {
    id: "M-clip-circle-menu",
    group: "site",
    plane: "element",
    energy: "bold",
    label: "Circular expanding fullscreen menu",
    detail: "clip-path circle expand; stagger links; body scroll lock",
  },
  {
    id: "M-slide-deck",
    group: "site",
    plane: "element",
    energy: "playful",
    label: "Slide deck / multi-screen",
    detail: "slides mounted; opacity+z+pointerEvents; keyboard + dots",
  },
  {
    id: "M-spline-bg",
    group: "site",
    plane: "background",
    energy: "bold",
    label: "Spline 3D scene as background",
    detail: "lazy @splinetool/react-spline; pointer-events vs CTAs",
  },
  {
    id: "M-spotlight-mask",
    group: "site",
    plane: "background",
    energy: "playful",
    label: "Cursor spotlight / masked reveal",
    detail: "SVG mask trails; perf gate + mobile fallback",
  },
  {
    id: "minimal",
    group: "site",
    plane: "both",
    energy: "gentle",
    label: "Minimal — hover-only micro motion",
    detail: "No entrance choreography; respect prefers-reduced-motion",
  },
  {
    id: "RB-Animations",
    group: "reactbits",
    plane: "element",
    energy: "playful",
    rbCategory: "Animations",
    label: "React Bits · Animations (cursor, particles, GSAP, …)",
    detail:
      "React Bits / Animations: pick TSX in Motion code panel; layer lightly with site M-kits; mind §3.2 perf + reduced-motion",
  },
  {
    id: "RB-Backgrounds",
    group: "reactbits",
    plane: "background",
    energy: "playful",
    rbCategory: "Backgrounds",
    label: "React Bits · Backgrounds (gradients, grids, aurora)",
    detail: "React Bits / Backgrounds: hero or section fills; watch z-index vs body text contrast",
  },
  {
    id: "RB-Components",
    group: "reactbits",
    plane: "element",
    energy: "playful",
    rbCategory: "Components",
    label: "React Bits · Components (carousels, accordions, cards)",
    detail: "React Bits / Components: reusable blocks; trim props to need",
  },
  {
    id: "RB-TextAnimations",
    group: "reactbits",
    plane: "element",
    energy: "playful",
    rbCategory: "TextAnimations",
    label: "React Bits · Text (gradients, splits, scroll type)",
    detail: "React Bits / TextAnimations: headline/tagline hierarchy; avoid whole-page overload",
  },
];

const GITHUB_REPO_STYLE_LIB_TREE =
  "https://github.com/Ictraeh/website_prompt_generator/tree/main/sources/design-style-layout-md";
const GITHUB_REPO_STYLE_LIB_RAW =
  "https://raw.githubusercontent.com/Ictraeh/website_prompt_generator/main/sources/design-style-layout-md";

function styleLibRawUrl(relPosix) {
  return `${GITHUB_REPO_STYLE_LIB_RAW}/${relPosix.split("/").map(encodeURIComponent).join("/")}`;
}

function readStyleLibExcerpt(absPath, maxChars) {
  try {
    if (!fs.existsSync(absPath)) return "";
    return fs.readFileSync(absPath, "utf8").replace(/\s+/g, " ").trim().slice(0, maxChars);
  } catch {
    return "";
  }
}

/** MotionSites L4 → Layout library markdown (in-repo designer docs). */
const L4_TO_LAYOUT_STYLE_GUIDE = {
  "L4.1": "Layout library/full-screen-image-layout-style-guide.md",
  "L4.2": "Layout library/single-column-layout-style-guide.md",
  "L4.3": "Layout library/magazine-layout-style-guide.md",
  "L4.4": "Layout library/bento-grid-layout-style-guide.md",
  "L4.5": "Layout library/magazine-layout-style-guide.md",
  "L4.6": "Layout library/card-layout-style-guide.md",
  "L4.7": "Layout library/mosaic-modular-layout-style-guide.md",
  "L4.8": "Layout library/full-screen-image-layout-style-guide.md",
  "L4.11": "Layout library/single-column-layout-style-guide.md",
  L4_DEFAULT: "Layout library/magazine-layout-style-guide.md",
};

function buildStyleLibraryCatalog() {
  const root = path.join(__dirname, "sources", "design-style-layout-md");
  if (!fs.existsSync(root)) {
    return {
      present: false,
      treeUrl: GITHUB_REPO_STYLE_LIB_TREE,
      rawBase: GITHUB_REPO_STYLE_LIB_RAW,
      note: "Clone/sync sources/design-style-layout-md then npm run build.",
    };
  }
  const aestheticPath = path.join(root, "Style Library", "style-library-aesthetic-vibe-coding.md");
  const fontPath = path.join(root, "Font pairings", "font-pairing-library.md");
  const layoutByL4 = {};
  for (const [l4, rel] of Object.entries(L4_TO_LAYOUT_STYLE_GUIDE)) {
    const abs = path.join(root, ...rel.split("/"));
    layoutByL4[l4] = {
      relPath: rel,
      rawUrl: styleLibRawUrl(rel),
      excerpt: readStyleLibExcerpt(abs, 400),
    };
  }
  return {
    present: true,
    treeUrl: GITHUB_REPO_STYLE_LIB_TREE,
    rawBase: GITHUB_REPO_STYLE_LIB_RAW,
    aestheticExcerpt: readStyleLibExcerpt(aestheticPath, 1400),
    fontPairingExcerpt: readStyleLibExcerpt(fontPath, 650),
    layoutByL4,
  };
}

const styleLibrary = buildStyleLibraryCatalog();

const snippetBlurbsPath = path.join(__dirname, "snippet-blurbs.json");
let snippetBlurbs = {};
if (fs.existsSync(snippetBlurbsPath)) {
  try {
    const sj = JSON.parse(fs.readFileSync(snippetBlurbsPath, "utf8"));
    snippetBlurbs = sj.blurbs && typeof sj.blurbs === "object" ? sj.blurbs : {};
  } catch {
    snippetBlurbs = {};
  }
}

const out = {
  version: "1.6.5",
  sourceDocs: [
    "MotionSites-Prompt-Guide-Skill-Base.md",
    `Designer Style Layout Markdown (in-repo): ${GITHUB_REPO_STYLE_LIB_TREE}`,
    "Huemint palette patterns — https://huemint.com/brand-intersection/ · https://huemint.com/website-magazine/ · https://huemint.com/website-monochrome/",
    `VoltAgent awesome-design-md — ${DESIGN_MD_INDEX} (DESIGN.md references for agency-grade UI discipline)`,
  ],
  designMdMeta: {
    indexUrl: DESIGN_MD_INDEX,
    stitchFormatUrl: DESIGN_MD_STITCH_FORMAT,
    getdesignPattern: "https://getdesign.md/<slug>/design-md",
  },
  designMdReferences,
  industryStyleFit,
  industryMotionFit,
  styleLibrary,
  pexelsAttribution: "Placeholder media from https://www.pexels.com/ — replace with licensed assets for production.",
  pexelsPool,
  platforms,
  industries,
  fontVibes,
  colorVibes,
  colorVibeGroups,
  animationRefHubUrl,
  animationRefPresets,
  industryAnimationRefFit,
  motionVibes: motionVibeOptions,
  snippetBlurbs,
  motionKits,
  motionKitGroups,
  l4Blueprint,
  styleBlends,
  stackProfiles,
  styles: styleObjects,
};

const dir = __dirname;
const publicDir = path.join(dir, "public");
fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(dir, "catalog.json"), JSON.stringify(out, null, 2), "utf8");
const catalogBundle = `window.__VIBE_CATALOG__=${JSON.stringify(out)};`;
fs.writeFileSync(path.join(dir, "catalog.bundle.js"), catalogBundle);
fs.writeFileSync(path.join(publicDir, "catalog.bundle.js"), catalogBundle);

const indexPath = path.join(dir, "index.html");
const appPath = path.join(dir, "app.js");
const siteFromUrlPath = path.join(dir, "site-from-url.js");
const indexHtml = fs.readFileSync(indexPath, "utf8");
const appJs = fs.readFileSync(appPath, "utf8");
const siteFromUrlJs = fs.readFileSync(siteFromUrlPath, "utf8");
const jsonText = JSON.stringify(out);
const rbJsonPath = path.join(dir, "reactbits-snippets.json");
const rbPayload = fs.existsSync(rbJsonPath)
  ? JSON.parse(fs.readFileSync(rbJsonPath, "utf8"))
  : {
      version: 0,
      snippets: [],
      attribution: "Run: node fetch-reactbits.mjs to download React Bits sources.",
      maxCharsPerSnippet: 20000,
    };

const motionDocPath = path.join(dir, "motion-docs-snippets.json");
const docPayload = fs.existsSync(motionDocPath)
  ? JSON.parse(fs.readFileSync(motionDocPath, "utf8"))
  : {
      version: 0,
      snippets: [],
      attribution: "Run: node fetch-motion-docs.mjs to add GSAP ScrollTrigger + Anime.js doc snippets.",
      maxCharsPerSnippet: 20000,
    };

const rbSnips = (rbPayload.snippets || []).map((s) => ({ ...s, library: "reactbits" }));
const docSnips = (docPayload.snippets || []).map((s) => ({ ...s }));
const motionMerged = {
  version: 1,
  maxCharsPerSnippet: 20000,
  snippets: [...rbSnips, ...docSnips].sort((a, b) => (a.label || "").localeCompare(b.label || "")),
  attributions: [rbPayload.attribution, docPayload.attribution].filter(Boolean),
};

const motionBundle = `window.__MOTION_SNIPPETS__=${JSON.stringify(motionMerged)};`;
fs.writeFileSync(path.join(dir, "motion-snippets.bundle.js"), motionBundle);
fs.writeFileSync(path.join(publicDir, "motion-snippets.bundle.js"), motionBundle);

const standalone = indexHtml.replace(
  `<script src="catalog.bundle.js"></script>\n    <script src="motion-snippets.bundle.js"></script>\n    <script src="app.js"></script>\n    <script src="site-from-url.js"></script>`,
  `<textarea id="__vibe_cat_data" hidden>${jsonText}</textarea>\n    <script>\nwindow.__VIBE_CATALOG__ = JSON.parse(document.getElementById("__vibe_cat_data").value);\n<\/script>\n    <script src="motion-snippets.bundle.js"><\/script>\n    <script>\n${appJs}\n${siteFromUrlJs}\n<\/script>`
);
fs.writeFileSync(path.join(dir, "standalone.html"), standalone, "utf8");
fs.writeFileSync(path.join(publicDir, "standalone.html"), standalone, "utf8");

const launch = [
  "#!/bin/bash",
  "# Double-click in Finder. Keeps this window open while the server runs.",
  "set -euo pipefail",
  'DIR="$(cd "$(dirname "$0")" && pwd)"',
  'cd "$DIR" || exit 1',
  "",
  "PORT=8765",
  "if ! command -v python3 >/dev/null 2>&1; then",
  '  osascript -e \'display dialog "python3 was not found. Install Python 3, or double-click open-standalone.command in this folder to open the page without a server." buttons {"OK"} default button "OK"\' 2>/dev/null || \\',
  '    echo "python3 not found. Install Python 3 or use open-standalone.command"',
  "  exit 1",
  "fi",
  "",
  'while lsof -iTCP:"$PORT" -sTCP:LISTEN -n -P >/dev/null 2>&1; do',
  '  echo "Port $PORT is in use, trying $((PORT + 1))..."',
  "  PORT=$((PORT + 1))",
  '  if [[ "$PORT" -gt 8805 ]]; then',
  '    echo "No free port between 8765-8805."',
  "    exit 1",
  "  fi",
  "done",
  "",
  'URL="http://127.0.0.1:$PORT/"',
  'echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"',
  'echo "  Folder: $DIR"',
  'echo "  App:    $URL  → index.html (serve-local.py)"',
  'echo "  Also:   http://127.0.0.1:$PORT/standalone.html"',
  'echo "  Leave this window open while serving (Ctrl+C to stop)."',
  'echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"',
  "",
  '( sleep 1 && open "$URL" ) &',
  "",
  'exec python3 "$DIR/serve-local.py" "$PORT"',
  "",
].join("\n");
fs.writeFileSync(path.join(dir, "launch.command"), launch, "utf8");
fs.chmodSync(path.join(dir, "launch.command"), 0o755);

const openStandalone = [
  "#!/bin/bash",
  "# No Python / no port: opens standalone.html in your default browser (file://).",
  'DIR="$(cd "$(dirname "$0")" && pwd)"',
  'open "$DIR/standalone.html"',
  'echo "Opened: $DIR/standalone.html"',
  "sleep 2",
  "",
].join("\n");
fs.writeFileSync(path.join(dir, "open-standalone.command"), openStandalone, "utf8");
fs.chmodSync(path.join(dir, "open-standalone.command"), 0o755);

/** Vercel static output: https://vercel.com/docs/errors/error-list#missing-public-directory */
fs.copyFileSync(indexPath, path.join(publicDir, "index.html"));
fs.copyFileSync(appPath, path.join(publicDir, "app.js"));
fs.copyFileSync(siteFromUrlPath, path.join(publicDir, "site-from-url.js"));
const moodDemoPath = path.join(dir, "mood-motion-demo.html");
if (fs.existsSync(moodDemoPath)) {
  fs.copyFileSync(moodDemoPath, path.join(publicDir, "mood-motion-demo.html"));
}
for (const name of [
  "index.html",
  "app.js",
  "site-from-url.js",
  "catalog.bundle.js",
  "motion-snippets.bundle.js",
  "standalone.html",
  "mood-motion-demo.html",
]) {
  const p = path.join(publicDir, name);
  if (!fs.existsSync(p)) throw new Error(`[build-catalog] Missing Vercel output file: ${p}`);
  if (fs.statSync(p).size < 32) throw new Error(`[build-catalog] Vercel output file too small: ${p}`);
}

console.log(
  "Wrote catalog.json + catalog.bundle.js + motion-snippets.bundle.js + standalone.html + launch.command + open-standalone.command + public/* with",
  styleObjects.length,
  "styles;",
  "motion snippets (reactbits+docs):",
  motionMerged.snippets?.length ?? 0
);
