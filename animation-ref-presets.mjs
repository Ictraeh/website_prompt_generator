/** Hub: https://github.com/Ictraeh/designers-pandora-box/tree/main/docs/animation-reference */
const B =
  "https://github.com/Ictraeh/designers-pandora-box/blob/main/docs/animation-reference";

export const animationRefHubUrl =
  "https://github.com/Ictraeh/designers-pandora-box/tree/main/docs/animation-reference";

/** planes: ui = element / controls; bg = hero / ambient; both = show under both lists */
export const animationRefPresets = [
  {
    id: "readme",
    label: "Animation reference — overview",
    url: `${B}/README.md`,
    planes: ["both"],
  },
  {
    id: "prompt-workflow",
    label: "Prompt workflow (use refs in Cursor)",
    url: `${B}/prompt-workflow.md`,
    planes: ["both"],
  },
  {
    id: "tone-to-motion",
    label: "Tone to motion (words → timing)",
    url: `${B}/tone-to-motion.md`,
    planes: ["both"],
  },
  {
    id: "patterns-json",
    label: "Patterns index (JSON)",
    url: `${B}/patterns.json`,
    planes: ["both"],
  },
  {
    id: "tone-vibes",
    label: "Tone vibes (JSON)",
    url: `${B}/tone-vibes.json`,
    planes: ["both"],
  },
  {
    id: "motion-react",
    label: "Motion for React",
    url: `${B}/motion.md`,
    planes: ["ui"],
  },
  {
    id: "gsap",
    label: "GSAP",
    url: `${B}/gsap.md`,
    planes: ["ui"],
  },
  {
    id: "animejs",
    label: "Anime.js",
    url: `${B}/animejs.md`,
    planes: ["ui"],
  },
  {
    id: "css-tailwind",
    label: "CSS / Tailwind motion",
    url: `${B}/css-tailwind.md`,
    planes: ["ui"],
  },
  {
    id: "recipes",
    label: "Recipes (copy-paste patterns)",
    url: `${B}/recipes.md`,
    planes: ["ui"],
  },
  {
    id: "galleries",
    label: "Galleries (ideas only, not source)",
    url: `${B}/galleries.md`,
    planes: ["bg"],
  },
];

/**
 * Industry → ordered ref ids (first items get ★ in UI; then A–Z rest).
 * Keep short lists so defaults stay scannable.
 */
export const industryAnimationRefFit = {
  art_design: ["readme", "tone-to-motion", "motion-react", "galleries", "patterns-json"],
  photography: ["readme", "galleries", "motion-react", "css-tailwind", "tone-vibes"],
  portfolio_cv: ["readme", "prompt-workflow", "tone-to-motion", "motion-react", "galleries"],
  fashion_beauty: ["readme", "tone-vibes", "galleries", "motion-react", "animejs"],
  fitness_wellness: ["readme", "tone-to-motion", "css-tailwind", "motion-react", "patterns-json"],
  food_restaurants: ["readme", "galleries", "motion-react", "css-tailwind", "tone-vibes"],
  real_estate_home: ["readme", "galleries", "motion-react", "gsap", "patterns-json"],
  travel_tourism: ["readme", "galleries", "gsap", "motion-react", "tone-to-motion"],
  weddings_events: ["readme", "tone-to-motion", "animejs", "motion-react", "galleries"],
  education: ["readme", "prompt-workflow", "motion-react", "css-tailwind", "patterns-json"],
  professional_services: ["readme", "prompt-workflow", "tone-to-motion", "css-tailwind", "motion-react"],
  community_nonprofits: ["readme", "prompt-workflow", "css-tailwind", "motion-react", "patterns-json"],
  entertainment_media: ["readme", "tone-vibes", "gsap", "animejs", "galleries"],
  hobbies_lifestyle: ["readme", "galleries", "motion-react", "tone-vibes", "patterns-json"],
  saas_it_services: ["readme", "prompt-workflow", "motion-react", "css-tailwind", "patterns-json"],
  ecommerce: ["readme", "galleries", "motion-react", "css-tailwind", "tone-to-motion"],
  industrial: ["readme", "prompt-workflow", "gsap", "motion-react", "patterns-json"],
};
