/**
 * VoltAgent awesome-design-md — folder slugs match https://github.com/VoltAgent/awesome-design-md/tree/main/design-md
 * Live DESIGN.md hubs: https://getdesign.md/<slug>/design-md
 */
export const DESIGN_MD_INDEX = "https://github.com/VoltAgent/awesome-design-md";
export const DESIGN_MD_STITCH_FORMAT = "https://stitch.withgoogle.com/docs/design-md/format/";

/** Slugs under design-md/ (kept in sync with awesome-design-md collection). */
export const DESIGN_MD_SLUGS = [
  "airbnb",
  "airtable",
  "apple",
  "bmw",
  "cal",
  "clay",
  "claude",
  "clickhouse",
  "cohere",
  "coinbase",
  "composio",
  "cursor",
  "elevenlabs",
  "expo",
  "ferrari",
  "figma",
  "framer",
  "hashicorp",
  "ibm",
  "intercom",
  "kraken",
  "lamborghini",
  "linear.app",
  "lovable",
  "minimax",
  "mistral.ai",
  "mintlify",
  "miro",
  "mongodb",
  "notion",
  "nvidia",
  "ollama",
  "opencode.ai",
  "pinterest",
  "posthog",
  "renault",
  "replicate",
  "resend",
  "revolut",
  "runwayml",
  "sanity",
  "semrush",
  "sentry",
  "spacex",
  "spotify",
  "stripe",
  "superhuman",
  "supabase",
  "tesla",
  "together.ai",
  "uber",
  "vercel",
  "voltagent",
  "warp",
  "webflow",
  "wise",
  "x.ai",
  "zapier",
];

/** Extra match tokens beyond slug tokens (industry / style keyword overlap). */
const TAG_EXTRA = {
  "linear.app": ["saas", "product", "roadmap", "issue", "devtools", "minimal", "purple"],
  vercel: ["deploy", "frontend", "edge", "next", "geist", "monochrome"],
  stripe: ["payment", "fintech", "checkout", "billing", "saas"],
  resend: ["email", "transactional", "api", "developer"],
  supabase: ["database", "auth", "realtime", "backend", "postgres"],
  framer: ["motion", "prototype", "agency", "marketing"],
  webflow: ["cms", "visual", "marketing", "agency"],
  clay: ["agency", "creative", "brand", "organic"],
  figma: ["design", "ui", "collaboration", "prototype"],
  notion: ["docs", "wiki", "workspace", "productivity"],
  mintlify: ["docs", "developer", "documentation", "reading"],
  intercom: ["support", "chat", "crm", "customer"],
  posthog: ["analytics", "product", "funnel", "experiment"],
  sentry: ["errors", "monitoring", "observability", "debug"],
  sanity: ["cms", "headless", "content", "editorial"],
  airbnb: ["travel", "hospitality", "booking", "photography"],
  uber: ["mobility", "maps", "urban", "logistics"],
  spotify: ["media", "audio", "streaming", "entertainment"],
  pinterest: ["visual", "discovery", "social", "images"],
  apple: ["premium", "hardware", "retail", "minimal"],
  ibm: ["enterprise", "b2b", "carbon", "industrial"],
  coinbase: ["crypto", "wallet", "exchange", "fintech"],
  runwayml: ["video", "ai", "creative", "media"],
  voltagent: ["agent", "ai", "framework", "automation"],
  cohere: ["llm", "enterprise", "nlp", "ai"],
  claude: ["llm", "assistant", "ai", "chat"],
  ollama: ["local", "llm", "terminal", "developer"],
  cursor: ["ide", "editor", "code", "ai"],
  warp: ["terminal", "cli", "developer"],
  expo: ["mobile", "react", "native", "app"],
  lovable: ["builder", "fullstack", "ai", "startup"],
  zapier: ["automation", "integration", "workflow"],
  cal: ["scheduling", "calendar", "booking"],
  tesla: ["automotive", "ev", "minimal", "cinematic"],
  spacex: ["space", "engineering", "technical", "dark"],
  ferrari: ["luxury", "automotive", "editorial"],
  lamborghini: ["luxury", "automotive", "dark"],
  bmw: ["automotive", "premium", "german"],
  renault: ["automotive", "gradient", "french"],
  wise: ["fintech", "transfer", "money"],
  revolut: ["fintech", "banking", "card"],
  kraken: ["crypto", "trading", "exchange"],
  replicate: ["ml", "api", "models", "inference"],
  elevenlabs: ["voice", "audio", "ai", "tts"],
  "mistral.ai": ["llm", "europe", "ai", "api"],
  "x.ai": ["llm", "ai", "minimal"],
  minimax: ["llm", "ai", "api"],
  "together.ai": ["llm", "opensource", "infrastructure"],
  runwayml: ["video", "generative", "creative"],
  semrush: ["seo", "marketing", "analytics"],
  composio: ["integration", "tools", "saas"],
  clickhouse: ["analytics", "sql", "database", "data"],
  hashicorp: ["infra", "terraform", "devops", "cloud"],
  mongodb: ["database", "document", "nosql"],
  miro: ["whiteboard", "collab", "workshop"],
  airtable: ["spreadsheet", "data", "nocode"],
  superhuman: ["email", "productivity", "keyboard"],
  "opencode.ai": ["coding", "ai", "developer"],
};

function humanLabel(slug) {
  return slug
    .replace(/\./g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugTokens(slug) {
  return slug
    .toLowerCase()
    .split(/[.\-_]+/)
    .filter((t) => t.length > 1);
}

/** @param {string[]} slugs */
export function enrichDesignMdRefs(slugs) {
  return slugs.map((slug) => {
    const extra = TAG_EXTRA[slug] || [];
    const tags = [...new Set([...slugTokens(slug), ...extra.map((t) => t.toLowerCase())])];
    return {
      slug,
      label: humanLabel(slug),
      hub: `https://getdesign.md/${slug}/design-md`,
      repo: `https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/${slug}/README.md`,
      tags,
    };
  });
}

/** Merge filesystem slugs (when awesome-design-md is cloned as sibling) with canonical list. */
export function resolveDesignMdSlugs(fs, path, __dirname) {
  const sibling = path.join(__dirname, "..", "awesome-design-md", "design-md");
  try {
    if (fs.existsSync(sibling)) {
      const dirs = fs.readdirSync(sibling, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
      const merged = [...new Set([...DESIGN_MD_SLUGS, ...dirs])].sort((a, b) => a.localeCompare(b));
      return merged.filter((s) => fs.existsSync(path.join(sibling, s, "README.md")));
    }
  } catch {
    /* ignore */
  }
  return [...DESIGN_MD_SLUGS];
}
