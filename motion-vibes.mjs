/**
 * Motion Vibe dropdown: human labels + keyword clusters for tone-to-motion mapping.
 * uiRefIds / bgRefIds = ids from animation-ref-presets.mjs (injected into prompts only).
 */
export const motionVibeOptions = [
  {
    id: "__motion_auto__",
    label: "Auto — industry & deliverable bias",
    auto: true,
    keywords: "",
    uiRefIds: [],
    bgRefIds: [],
  },
  {
    id: "natural_calm",
    label: "Natural & calm — organic, soft, breathing",
    auto: false,
    keywords: "natural, calm, soft, organic, slow, ease-out, understated",
    uiRefIds: ["readme", "tone-to-motion", "motion-react", "css-tailwind", "recipes"],
    bgRefIds: ["readme", "tone-to-motion", "galleries", "patterns-json"],
  },
  {
    id: "elegant_refined",
    label: "Elegant & refined — minimal, luxe timing",
    auto: false,
    keywords: "elegant, refined, polished, restrained, precise, editorial",
    uiRefIds: ["readme", "tone-to-motion", "motion-react", "recipes", "css-tailwind"],
    bgRefIds: ["readme", "tone-to-motion", "galleries", "patterns-json"],
  },
  {
    id: "snappy_energetic",
    label: "Snappy & energetic — fast, confident",
    auto: false,
    keywords: "snappy, crisp, energetic, decisive, short durations, confident",
    uiRefIds: ["tone-to-motion", "motion-react", "css-tailwind", "tone-vibes", "recipes"],
    bgRefIds: ["readme", "css-tailwind", "patterns-json", "galleries"],
  },
  {
    id: "playful_bouncy",
    label: "Playful & bouncy — joyful micro-motion",
    auto: false,
    keywords: "playful, bouncy, springy, friendly, elastic, whimsical",
    uiRefIds: ["tone-to-motion", "motion-react", "animejs", "recipes", "tone-vibes"],
    bgRefIds: ["readme", "galleries", "tone-vibes", "tone-to-motion"],
  },
  {
    id: "cinematic_bold",
    label: "Cinematic & bold — hero drama, scroll stories",
    auto: false,
    keywords: "cinematic, bold, dramatic, scroll-driven, immersive, high impact",
    uiRefIds: ["gsap", "motion-react", "tone-to-motion", "recipes"],
    bgRefIds: ["galleries", "gsap", "patterns-json", "tone-to-motion"],
  },
  {
    id: "technical_precise",
    label: "Technical & precise — dashboards, dense UI",
    auto: false,
    keywords: "technical, precise, system, subtle, functional, low-noise",
    uiRefIds: ["readme", "prompt-workflow", "motion-react", "css-tailwind", "patterns-json"],
    bgRefIds: ["readme", "patterns-json", "tone-to-motion", "css-tailwind"],
  },
  {
    id: "ambient_light",
    label: "Ambient-first — quiet hero, motion as atmosphere",
    auto: false,
    keywords: "ambient, atmospheric, slow, gentle parallax, background-led, soft",
    uiRefIds: ["readme", "css-tailwind", "motion-react", "tone-to-motion"],
    bgRefIds: ["galleries", "tone-to-motion", "patterns-json", "tone-vibes", "motion-react"],
  },
  {
    id: "story_scroll",
    label: "Story & scroll — narrative sections, reveals",
    auto: false,
    keywords: "storytelling, scroll, reveal, section transitions, narrative pacing",
    uiRefIds: ["gsap", "motion-react", "tone-to-motion", "recipes"],
    bgRefIds: ["galleries", "patterns-json", "tone-to-motion", "prompt-workflow"],
  },
];
