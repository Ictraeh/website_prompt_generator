/**
 * Loads motion-interaction-catalog.json for catalog bundle + build.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CATALOG_PATH = path.join(
  __dirname,
  "motion-interaction-catalog-out",
  "motion-interaction-catalog.json"
);

/** Motion kit id → canonical pattern ids from interaction catalog */
export const motionKitPatternIds = {
  "M-fade-rise": ["fade-rise-up", "sequential-block-stagger"],
  "M-char-cascade": ["typography-stagger-units"],
  "M-delay-fade": ["opacity-fade"],
  "M-media-zoom": ["hover-micro-feedback"],
  "M-button-lift": ["hover-micro-feedback", "press-active-feedback"],
  "M-video-raf-loop": ["breathing-video-loop", "media-poster-handoff"],
  "M-scroll-text-reveal": ["scroll-text-highlight"],
  "M-horizontal-marquee": ["infinite-marquee-horizontal"],
  "M-scroll-scrub-video": ["scroll-scrub-media"],
  "M-clip-circle-menu": ["menu-overlay-open"],
  "M-slide-deck": ["deck-slide-transition", "opacity-fade"],
  "M-spline-bg": [],
  "M-spotlight-mask": ["cursor-reveal-effects"],
  minimal: ["hover-micro-feedback"],
  "RB-Animations": ["cursor-reveal-effects", "hover-micro-feedback"],
  "RB-Backgrounds": ["infinite-marquee-horizontal", "breathing-video-loop"],
  "RB-Components": ["auto-cycle-content", "hover-micro-feedback"],
  "RB-TextAnimations": ["typography-stagger-units", "typography-mask-slide", "ambient-text-surface"],
};

/** Style skill / layout hints → extra pattern ids */
export const styleMotionPatternHints = {
  "char-motion": ["typography-stagger-units"],
  "video-bg": ["breathing-video-loop", "media-poster-handoff", "blur-reveal"],
  "glass-nav": ["ambient-text-surface", "hover-micro-feedback"],
  "L4.1": ["sequential-block-stagger", "blur-reveal"],
  "L4.7": ["deck-slide-transition", "opacity-fade", "chart-draw-reveal"],
  "L4.8": ["scroll-scrub-media", "scroll-parallax-layered"],
  "L4.6": ["scroll-parallax-layered", "fade-rise-up"],
  "L4.4": ["panel-slide-in", "chart-draw-reveal"],
  web_hero_single: ["sequential-block-stagger", "fade-rise-up"],
  web_app_dashboard: ["fade-rise-up", "hover-micro-feedback", "opacity-fade"],
  web_app_product: ["sequential-block-stagger", "panel-slide-in"],
  story_scroll: ["scroll-text-highlight", "scroll-parallax-layered", "cinematic-section-transition"],
  cinematic_bold: ["blur-reveal", "cinematic-section-transition", "scroll-parallax-layered"],
  playful_bouncy: ["typography-stagger-units", "hover-micro-feedback"],
  natural_calm: ["fade-rise-up", "opacity-fade", "sequential-block-stagger"],
  snappy_energetic: ["fade-rise-up", "hover-micro-feedback", "press-active-feedback"],
};

export function loadMotionInteractionCatalog() {
  if (!fs.existsSync(CATALOG_PATH)) {
    return { meta: { title: "Motion Interaction Catalog", version: "0" }, patterns: [], lookupMatrix: { routes: [] } };
  }
  return JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
}

/** Slim patterns for browser bundle (drop long source arrays). */
export function slimMotionInteractionCatalog(full) {
  if (!full?.patterns) return full;
  return {
    meta: full.meta,
    timingCheatSheet: full.timingCheatSheet,
    taxonomy: full.taxonomy,
    lookupMatrix: full.lookupMatrix,
    patterns: full.patterns.map((p) => ({
      id: p.id,
      name: p.name,
      aliases: (p.aliases || []).slice(0, 4),
      interactionTriggers: p.interactionTriggers,
      targetObjects: p.targetObjects,
      feel: p.feel,
      sourceExcerpts: p.sourceExcerpts || [],
      speedVariations: p.speedVariations,
      notes: p.notes,
    })),
  };
}
