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
    pc("dark_cinematic");
    pc("high_saturation_pop");
    pc("hm_mag_masthead_band");
    pc("hb_split_energy");
  }
  if (tags.has("glass-nav")) {
    pm("M-fade-rise");
    pc("dark_cinematic");
    pc("hm_dark_aurora_glow");
    pc("hm_soft_hue_ribbon_bg");
  }
  if (tags.has("char-motion")) pm("M-char-cascade");
  if (tags.has("scroll-scrub-hero") || tags.has("gsap-heavy")) pm("M-scroll-scrub-video");
  if (tags.has("saas-grid") || tags.has("calculator")) {
    pf("warm_saas");
    pf("technical_ai");
    pc("cool_corporate");
    pc("hb_tri_guardrails");
    pc("hm_mono_cool_slate_data");
  }
  if (tags.has("script-accent")) pf("editorial_premium");
  if (tags.has("split-hero")) pf("warm_saas");
  if (tags.has("email-shell")) {
    pc("dark_cinematic");
    pc("hm_mag_four_roles");
    pf("editorial_premium");
  }
  if (tags.has("social-card-wall")) {
    pf("brutalist_poster");
    pm("M-media-zoom");
  }

  const neonish =
    /neon|cyber|synth|y2k|vapor|pixel|graffiti|arcade|hud|chrome|glitch/.test(id) || /neon|cyber|glitch|arcade/.test(kw);
  if (neonish) {
    pc("neon_cyber");
    pc("hm_dark_aurora_glow");
    pf("spline_scifi");
    pm("M-scroll-text-reveal");
  }

  const soft = /ethereal|kawaii|coquette|shabby|japandi|wabi|light-academia|scrapbook|lace|pastel/.test(id);
  if (soft) {
    pc("pastel_soft");
    pc("hm_pastel_chrome_safe");
    pc("hm_soft_hue_ribbon_bg");
    pf("warm_saas");
    pm("M-delay-fade");
  }

  const earth = /bohemian|farmhouse|south-west|western|steampunk|nautical|rustic|desert/.test(id) || /earth|terracotta|rust/.test(kw);
  if (earth) {
    pc("warm_earth");
    pc("hb_earth_jewel_spark");
    pc("hb_analogous_ribbon");
  }

  const lux =
    /luxury|baroque|filigree|victorian|tenebrism|deco|gothic|academia|neoclassical|acanthus|art-deco|filigree|coquette/.test(id) ||
    /luxury|gilded|heritage|museum|ceremonial/.test(kw);
  if (lux) {
    pc("monochrome_luxury");
    pc("dark_cinematic");
    pc("hm_mono_metallic_outline");
    pf("editorial_premium");
  }

  const util = /utilitarian|bauhaus|bento|rebus|glassmorphism|neo-frutiger/.test(id);
  if (util) {
    pf("technical_ai");
    pc("cool_corporate");
    pc("hm_mono_blue_gray_ramp");
    pc("hb_warm_cold_pair");
  }

  if (tags.has("video-bg") && colors.size === 0) pc("dark_cinematic");
  pm("M-button-lift");
  if (![...motions].some((m) => m.startsWith("M-scroll"))) pm("M-fade-rise");

  if (fonts.size === 0) {
    pf("editorial_premium");
    pf("warm_saas");
  }
  if (colors.size === 0) {
    pc("light_editorial");
    pc("cool_corporate");
  }

  return {
    fontVibeIds: [...fonts].slice(0, 5),
    colorVibeIds: [...colors].slice(0, 6),
    motionIds: [...motions].slice(0, 4),
  };
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
  return {
    ...base,
    libraryMood,
    libraryLayout,
    userBlurb: styleUserBlurbs[id] || libraryMood,
    recommendations: inferRecommendations(base),
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
];

/** 色彩下拉分组：Huemint 式结构 + 经典气质（https://huemint.com/ ） */
const colorVibeGroups = [
  {
    id: "brand_intersection",
    label: "Brand intersection palettes (Huemint-style multi-hue lock)",
  },
  {
    id: "website_magazine",
    label: "Magazine-style web palettes (~4 roles, editorial rhythm)",
  },
  {
    id: "website_monochrome",
    label: "Monochrome web palettes (whitespace + mid-gray structure)",
  },
  {
    id: "gradient_bridge",
    label: "Tight hue bridges / dark-base glows (token-safe gradients)",
  },
  { id: "classic_vibes", label: "Classic vibes — cinematic, neon, earth, pop" },
];

const colorVibes = [
  {
    id: "hb_warm_cold_pair",
    group: "brand_intersection",
    huemintRef: "brand-intersection",
    labelZh: "冷暖双色锁盘",
    explainerZh:
      "像 Huemint「品牌多色交集」：先锁定一枚暖主色与一枚冷主色，导航、链接、标签只用从中混合出的中性阶；两枚主色不要同时大面积铺满，整体仍像一个品牌手册。",
    label: "Warm/cold brand pair + neutrals",
    styleLibraryAlign: "Brand systems with two primaries + derived neutrals",
    cssHint:
      "Define --warm-600 --cool-600 --neutral-50…900; CTA uses one primary, links use the other at 70% saturation; no third hue except ±8° family tints",
  },
  {
    id: "hb_tri_guardrails",
    group: "brand_intersection",
    huemintRef: "brand-intersection",
    labelZh: "三色护栏盘",
    explainerZh:
      "背景 / 正文 / 强调 三色之外，只允许同一色相上 ±6% 亮度的「亲属色」做 hover、divider；饱和度由低到高只出现一次，避免彩虹散焦。",
    label: "Tri-color guardrails",
    styleLibraryAlign: "Strict 3-role palette + tint ladder only",
    cssHint: "bg + fg + accent only; hover = accent @ 85% L or sibling step; forbid new hues on cards",
  },
  {
    id: "hb_soft_complement",
    group: "brand_intersection",
    huemintRef: "brand-intersection",
    labelZh: "软互补对",
    explainerZh:
      "一对低饱和互补色（不必 180° 拉满）+ 大面米白或冷灰底；互补只用于小图标、状态点、细线，阅读面保持冷静。",
    label: "Soft complementary pair",
    styleLibraryAlign: "Calm UI with restrained complement accents",
    cssHint: "Complement accents max chroma 35–45; body text on neutral 96–98% L",
  },
  {
    id: "hb_analogous_ribbon",
    group: "brand_intersection",
    huemintRef: "brand-intersection",
    labelZh: "邻近色带",
    explainerZh:
      "在色环约 60° 内取 2–3 色，拆成 surface-1 / surface-2 / border，看起来像渐变被切成扁平层，仍算「一种色相家族」。",
    label: "Analogous ribbon surfaces",
    styleLibraryAlign: "Single-family hue spread across layers",
    cssHint: "ΔH between surfaces ≤25°; vary L 8–15 steps; one darkest for text",
  },
  {
    id: "hb_earth_jewel_spark",
    group: "brand_intersection",
    huemintRef: "brand-intersection",
    labelZh: "大地 + 一颗宝石点",
    explainerZh:
      "陶土、沙、橄榄等大面大地色打底，只留一颗可「锁」的饱和宝石色（青绿或石榴红）做 CTA；其余交互回到大地阶，整体像珠宝衬布。",
    label: "Earth base + single jewel accent",
    styleLibraryAlign: "Bohemian / premium craft + one spark hue",
    cssHint: "Jewel chroma 60+ only on buttons/badges; surfaces chroma ≤15",
  },
  {
    id: "hb_split_energy",
    group: "brand_intersection",
    huemintRef: "brand-intersection",
    labelZh: "分离互补能量",
    explainerZh:
      "主色一道 + 两侧邻近的「双强调」只做能量条、进度、小标签；两强调不要相邻大块并置，中间用中性带隔开。",
    label: "Split-complement energy accents",
    styleLibraryAlign: "Youth / sports / tech marketing with controlled triad",
    cssHint: "Primary 220°; accents at +30° / +150° at ≤12% screen area each",
  },
  {
    id: "hm_mag_four_roles",
    group: "website_magazine",
    huemintRef: "website-magazine",
    labelZh: "杂志四角色",
    explainerZh:
      "对应 Huemint「Website · Magazine」式四色：纸感背景、标题墨、正文灰、唯一彩色专给章节标签或引用条；彩色不抢标题，只负责「这是新一块内容」。",
    label: "Magazine 4-role palette",
    styleLibraryAlign: "Editorial / magazine landing rhythm",
    cssHint: "bg paper 96–98% L; headline #1a1a1a; body #444; accent single hsl for section kicker",
  },
  {
    id: "hm_mag_masthead_band",
    group: "website_magazine",
    huemintRef: "website-magazine",
    labelZh: "报头横色带",
    explainerZh:
      "大面积留白 + 一条高对比横色（报头 / hero band），内文区退回浅灰与墨字；横色里再嵌白字按钮，层次像印刷封面。",
    label: "Masthead color band + calm body",
    styleLibraryAlign: "News / culture / fashion hero layouts",
    cssHint: "Hero band solid hue; below-fold neutral-100 surfaces; max 1 extra accent",
  },
  {
    id: "hm_mag_warm_cool_zones",
    group: "website_magazine",
    huemintRef: "website-magazine",
    labelZh: "暖区 / 冷区对页",
    explainerZh:
      "一栏偏暖沙、一栏偏冷灰，链接与图标共用同一中灰蓝，让读者感觉「同一本站」；左右区不要各引入新饱和色。",
    label: "Warm vs cool column zones",
    styleLibraryAlign: "Split layouts / bento with zoned temperature",
    cssHint: "Shared link color H220 S25%; warm zone bg H35 S8%; cool zone H220 S6%",
  },
  {
    id: "hm_mag_night_reader",
    group: "website_magazine",
    huemintRef: "website-magazine",
    labelZh: "夜读杂志",
    explainerZh:
      "深蓝灰底、月白字、琥珀或铜色链接；图片框用再暗一阶，像夜间模式杂志，仍保持四色以内角色清晰。",
    label: "Night magazine reader",
    styleLibraryAlign: "Dark editorial / long-read comfort",
    cssHint: "bg H230 S25% L12%; text L92%; links H35 S70% L55%; img frame L8%",
  },
  {
    id: "hm_mag_muted_pop_quote",
    group: "website_magazine",
    huemintRef: "website-magazine",
    labelZh: "低饱和 + 一句高亮",
    explainerZh:
      "全站低饱和灰彩底，只给 pull-quote 或数据高光一行饱和色；像杂志里只有引言用荧光笔划过。",
    label: "Muted site + one pop quote color",
    styleLibraryAlign: "SaaS report / annual review storytelling",
    cssHint: "Surfaces chroma ≤12; pop hue single use on blockquote + KPI",
  },
  {
    id: "hm_mag_dual_accent_rail",
    group: "website_magazine",
    huemintRef: "website-magazine",
    labelZh: "双强调轨",
    explainerZh:
      "主文仍是黑白灰，两枚小面积强调色只出现在左侧导航轨与页内标签，互不接触则不乱；适合工具站分区。",
    label: "Dual accent on rails only",
    styleLibraryAlign: "Product shell + content chrome separation",
    cssHint: "Nav accent A; tab accent B; never A+B on same component",
  },
  {
    id: "hm_mono_paper_ink_stack",
    group: "website_monochrome",
    huemintRef: "website-monochrome",
    labelZh: "纸墨四阶",
    explainerZh:
      "Huemint Monochrome 思路：白、浅灰卡片、中灰分割、墨字四阶即可成站；不要用彩色阴影冒充层次。",
    label: "Paper–ink monochrome stack",
    styleLibraryAlign: "Huemint-style monochrome + whitespace + thin type",
    cssHint: "4 stops: 100% 96% 88% 12% L; borders use 88% vs 96% only",
  },
  {
    id: "hm_mono_blue_gray_ramp",
    group: "website_monochrome",
    huemintRef: "website-monochrome",
    labelZh: "蓝灰单色阶",
    explainerZh:
      "同一色相蓝灰，nav 与正文背景只差 5–8% 亮度即可区分；适合开发者文档、控制台外壳类站点。",
    label: "Blue-gray single-hue ramp",
    styleLibraryAlign: "Dev portals / API docs / dense UI",
    cssHint: "Single H 215–225; S 6–14%; L steps 8–12 between chrome layers",
  },
  {
    id: "hm_mono_middle_bridge",
    group: "website_monochrome",
    huemintRef: "website-monochrome",
    labelZh: "中间灰桥梁",
    explainerZh:
      "对应 Huemint 说明里「前景与背景之间的中间shade」：卡片、表头、分割专用一层 bridge gray，让高对比黑白不刺眼。",
    label: "Middle-shade bridge cards",
    styleLibraryAlign: "Cards on white/black extremes",
    cssHint: "Define --surface-bridge between bg and fg L; tables use bridge for zebra",
  },
  {
    id: "hm_mono_warm_coffee",
    group: "website_monochrome",
    huemintRef: "website-monochrome",
    labelZh: "咖啡暖单阶",
    explainerZh:
      "奶油 → 卡布奇诺 → 浓缩色阶讲品牌故事，无第二色相；适合餐饮、手工、慢品牌。",
    label: "Warm coffee monochrome",
    styleLibraryAlign: "Cafe / bakery / slow lifestyle",
    cssHint: "Hue lock H25–35; vary L only; deepest for text not pure black",
  },
  {
    id: "hm_mono_cool_slate_data",
    group: "website_monochrome",
    huemintRef: "website-monochrome",
    labelZh: "冷灰数据阶",
    explainerZh:
      "冷灰单色阶上叠图表线色也用同一色相、只提高一度对比；避免彩虹图例破坏单色站感。",
    label: "Cool slate data monochrome",
    styleLibraryAlign: "Dashboards / analytics in mono discipline",
    cssHint: "Chart series use L/S steps of same H; max one dashed emphasis pattern",
  },
  {
    id: "hm_mono_metallic_outline",
    group: "website_monochrome",
    huemintRef: "website-monochrome",
    labelZh: "金属线框单阶",
    explainerZh:
      "面仍是灰阶，用香槟或银的 1px ring 代替第二色相做「贵气」；金属色只描边，不涂大面。",
    label: "Monochrome + metallic outline token",
    styleLibraryAlign: "Luxury minimal / watch / jewelry mono",
    cssHint: "ring-1 ring-[hsl(40_20%_70%)] style; fills stay neutral only",
  },
  {
    id: "hm_soft_hue_ribbon_bg",
    group: "gradient_bridge",
    huemintRef: "gradient-family",
    labelZh: "同族渐变底",
    explainerZh:
      "背景用约 15° 内的 Hue 渐变（很窄），前景 CTA 用该 family 里一个纯色点；整体像 Huemint 渐变工具里锁住色相漂移。",
    label: "Tight-hue ribbon background",
    styleLibraryAlign: "Soft marketing heroes / Aurora-lite without rainbow",
    cssHint: "bg-gradient from hsl(H S 96%) to hsl(H+12 S 92%); CTA hsl(H S 45% 45%)",
  },
  {
    id: "hm_dark_aurora_glow",
    group: "gradient_bridge",
    huemintRef: "gradient-family",
    labelZh: "暗底极光边",
    explainerZh:
      "深青绿底上，两枚冷霓虹只做 border-glow / 1px 描边，填充体仍保持 deep teal 家族；克制光晕才显贵。",
    label: "Dark base + aurora edge glows",
    styleLibraryAlign: "Sci-fi premium / web3-adjacent without purple slop",
    cssHint: "Glow tokens cyan/teal only; fill surfaces H175–195 S35–45% L10–18%",
  },
  {
    id: "hm_pastel_chrome_safe",
    group: "gradient_bridge",
    huemintRef: "website-magazine",
    labelZh: "粉彩 + 铬黄安全点",
    explainerZh:
      "粉彩大面仍配深灰字保证可读；一枚铬黄或柠黄只给主按钮与关键数字，像杂志里唯一荧光笔。",
    label: "Pastel surfaces + safe chrome accent",
    styleLibraryAlign: "Gen-Z soft UI with WCAG-safe accent",
    cssHint: "Pastel bg chroma ≤18 L≥92%; text L≤25%; accent single high-L yellow-green",
  },
  {
    id: "dark_cinematic",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "暗夜电影 · 深蓝黑底",
    explainerZh:
      "电影感深色底，视频或大图上叠渐变蒙版保证字可读；不要随意加未定义的紫/靛，除非写进 token。",
    styleLibraryAlign: "Tenebrism / cinematic hero / video-bg legibility",
    label: "Dark cinematic",
    cssHint: "Deep navy/black HSL --background; scrim % stops on video; forbid random purple/indigo unless tokenized",
  },
  {
    id: "light_editorial",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "日光编辑 · 纸感留白",
    explainerZh:
      "偏暖或偏冷的纸白底 + 炭黑字 + 极细分割线；留白本身就是「颜色」，适合长文与品牌故事页。",
    styleLibraryAlign: "Light Academia / Japandi / editorial longform",
    label: "Light editorial paper",
    cssHint: "Off-white base; charcoal type; hairline borders; generous margins",
  },
  {
    id: "neon_cyber",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "霓虹赛博 · 黑底荧光",
    explainerZh:
      "黑底上荧光绿/青/洋红只做小面积状态与线条；正文对比要过 WCAG，霓虹不是字体的借口。",
    styleLibraryAlign: "Cybercore / Synthwave / Y2K chrome accents",
    label: "Neon cyber",
    cssHint: "Black base; neon green/cyan/magenta as accent tokens only; WCAG on body",
  },
  {
    id: "warm_earth",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "大地陶土 · 暖灰绿",
    explainerZh:
      "陶土、沙、橄榄、奶油互相做邻居色，像自然材料摆在一起；高饱和只留给小标签或图标。",
    styleLibraryAlign: "Bohemian / Farmhouse / Mystical Western earth palette",
    label: "Warm earth",
    cssHint: "Terracotta sand olive cream; low-chrome neutrals; wood texture optional <TEXTURE_IMAGE>",
  },
  {
    id: "cool_corporate",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "冷色信任 · 蓝灰企业",
    explainerZh:
      "蓝灰白建立信任感，图表与表格只用同一冷族里的明度阶；一枚品牌蓝贯穿链接与焦点。",
    styleLibraryAlign: "Bento / utilitarian / SaaS trust density",
    label: "Cool corporate trust",
    cssHint: "Slate blue-gray white; single accent hue; tables/charts neutrals",
  },
  {
    id: "pastel_soft",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "粉彩雾面 · 柔和界面",
    explainerZh:
      "粉彩面 + 深灰字，避免粉配白字；可加极轻噪点层增加质感，但不改变色相数量。",
    styleLibraryAlign: "Ethereal / Kawaii / Coquette soft UI",
    label: "Soft pastel",
    cssHint: "Pastel surfaces + charcoal text; verify contrast; optional grain overlay z-50 pointer-events-none",
  },
  {
    id: "monochrome_luxury",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "黑白香槟 · 奢华克制",
    explainerZh:
      "黑、白、香槟金属三色阶；贵气来自留白和金属边，而不是彩虹渐变。",
    styleLibraryAlign: "Luxury Typography / Neoclassical / Art Deco metals",
    label: "Monochrome luxury",
    cssHint: "Black white champagne; metallic borders via pseudo rings not rainbow gradients",
  },
  {
    id: "high_saturation_pop",
    group: "classic_vibes",
    huemintRef: "general",
    labelZh: "高饱和波普 · CMY 冲击",
    explainerZh:
      "黄青品 + 黑描边，像波普海报；每个高饱和块要有 token 名，禁止随手吸色破坏成套感。",
    styleLibraryAlign: "Memphis / Pop Art / Kitsch campaigns",
    label: "High-saturation pop",
    cssHint: "CMY + black outlines; token-locked roles for fill/stroke/text; halftone optional",
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

/** MotionSites §8 — ids stay English for prompts; labels are short English for the UI */
const motionKits = [
  {
    id: "M-fade-rise",
    group: "site",
    label: "Fade-rise — sections ease in upward",
    detail: "~0.8s ease-out; translateY(24px)→0; stagger via animation-delay",
  },
  {
    id: "M-char-cascade",
    group: "site",
    label: "Character cascade — headline attention",
    detail: "~30ms/char; 200ms start delay; opacity + translateX on inline-block spans",
  },
  {
    id: "M-delay-fade",
    group: "site",
    label: "Delayed fade — calmer entrance",
    detail: "opacity 0→1 after delay; transition-opacity ~1000ms",
  },
  {
    id: "M-media-zoom",
    group: "site",
    label: "Image/video hover zoom",
    detail: "group overflow-hidden rounded-[14px]; child duration-700 group-hover:scale-[1.03]",
  },
  {
    id: "M-button-lift",
    group: "site",
    label: "Button hover lift",
    detail: "hover:-translate-y-0.5 transition-all duration-200 + subtle bg",
  },
  {
    id: "M-video-raf-loop",
    group: "site",
    label: "Video loop crossfade — seamless feel",
    detail: "rAF near loop ends; guard re-entrancy; on ended reset currentTime",
  },
  {
    id: "M-scroll-text-reveal",
    group: "site",
    label: "Scroll-linked text reveal",
    detail: "motion useScroll + useTransform per word/char opacity",
  },
  {
    id: "M-horizontal-marquee",
    group: "site",
    label: "Horizontal marquee — logos / ticker",
    detail: "duplicate row translateX(-50%) infinite linear; optional edge masks",
  },
  {
    id: "M-scroll-scrub-video",
    group: "site",
    label: "Scroll-scrubbed video — progress follows scroll",
    detail: "GSAP ScrollTrigger scrub→video.currentTime; seek coalescing; buffer overlay",
  },
  {
    id: "M-clip-circle-menu",
    group: "site",
    label: "Circular expanding fullscreen menu",
    detail: "clip-path circle expand; stagger links; body scroll lock",
  },
  {
    id: "M-slide-deck",
    group: "site",
    label: "Slide deck / multi-screen",
    detail: "slides mounted; opacity+z+pointerEvents; keyboard + dots",
  },
  {
    id: "M-spline-bg",
    group: "site",
    label: "Spline 3D scene as background",
    detail: "lazy @splinetool/react-spline; pointer-events vs CTAs",
  },
  {
    id: "M-spotlight-mask",
    group: "site",
    label: "Cursor spotlight / masked reveal",
    detail: "SVG mask trails; perf gate + mobile fallback",
  },
  {
    id: "minimal",
    group: "site",
    label: "Minimal — hover-only micro motion",
    detail: "No entrance choreography; respect prefers-reduced-motion",
  },
  {
    id: "RB-Animations",
    group: "reactbits",
    rbCategory: "Animations",
    label: "React Bits · Animations (cursor, particles, GSAP, …)",
    detail:
      "React Bits / Animations: pick TSX in Motion code panel; layer lightly with site M-kits; mind §3.2 perf + reduced-motion",
  },
  {
    id: "RB-Backgrounds",
    group: "reactbits",
    rbCategory: "Backgrounds",
    label: "React Bits · Backgrounds (gradients, grids, aurora)",
    detail: "React Bits / Backgrounds: hero or section fills; watch z-index vs body text contrast",
  },
  {
    id: "RB-Components",
    group: "reactbits",
    rbCategory: "Components",
    label: "React Bits · Components (carousels, accordions, cards)",
    detail: "React Bits / Components: reusable blocks; trim props to need",
  },
  {
    id: "RB-TextAnimations",
    group: "reactbits",
    rbCategory: "TextAnimations",
    label: "React Bits · Text (gradients, splits, scroll type)",
    detail: "React Bits / TextAnimations: headline/tagline hierarchy; avoid whole-page overload",
  },
];

const out = {
  version: "1.3.1",
  sourceDocs: [
    "MotionSites-Prompt-Guide-Skill-Base.md",
    "Design Style Layout Markdown Library/Style Library/style-library-aesthetic-vibe-coding.md",
    "Huemint palette patterns — https://huemint.com/brand-intersection/ · https://huemint.com/website-magazine/ · https://huemint.com/website-monochrome/",
    `VoltAgent awesome-design-md — ${DESIGN_MD_INDEX} (DESIGN.md references for agency-grade UI discipline)`,
  ],
  designMdMeta: {
    indexUrl: DESIGN_MD_INDEX,
    stitchFormatUrl: DESIGN_MD_STITCH_FORMAT,
    getdesignPattern: "https://getdesign.md/<slug>/design-md",
  },
  designMdReferences,
  pexelsAttribution: "Placeholder media from https://www.pexels.com/ — replace with licensed assets for production.",
  pexelsPool,
  platforms,
  industries,
  fontVibes,
  colorVibes,
  colorVibeGroups,
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
  'URL="http://127.0.0.1:$PORT/standalone.html"',
  'echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"',
  'echo "  Folder: $DIR"',
  'echo "  URL:    $URL"',
  'echo "  Leave this window open while serving (Ctrl+C to stop)."',
  'echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"',
  "",
  '( sleep 1 && open "$URL" ) &',
  "",
  'exec python3 -m http.server "$PORT"',
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
for (const name of [
  "index.html",
  "app.js",
  "site-from-url.js",
  "catalog.bundle.js",
  "motion-snippets.bundle.js",
  "standalone.html",
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
