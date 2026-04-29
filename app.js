/* global window, document */
(function () {
  const cat = window.__VIBE_CATALOG__;
  if (!cat) {
    console.error("Missing window.__VIBE_CATALOG__ — load catalog.bundle.js first");
    return;
  }

  /** Set in initReactBits so industry/motion refills can refresh the snippet list. */
  let rebuildReactbitsSnippetList = function () {};

  /** Hard cap: output must stay under 5000 characters (inclusive limit 4999). */
  const MAX_PROMPT_CHARS = 4999;

  /** Sentinel value for "random blind pick" on supported selects. */
  const DEFAULT_VAL = "__default__";

  /** Motion vibe "Auto" — must differ from DEFAULT_VAL so it never collides with font/color random. */
  const MOTION_VIBE_AUTO_ID = "__motion_auto__";

  /** Part A / Part B split — must match `buildPrompt` when `splitPromptParts` is true. */
  const SPLIT_PROMPT_DELIM = "\n\n──────── PART B — MOTION (after layout) ────────\n\n";

  const L4_HINTS = {
    "L4.1": "Full-bleed hero media + overlay UI; video absolute inset-0 object-cover; nav glass/transparent; z-index explicit.",
    "L4.2": "640px email card in dark shell; ring-1 ring-white/5; dividers.",
    "L4.3": "3–6 sections; alternate media/solid; max-w-7xl or max-w-[1831px].",
    "L4.4": "SaaS: split hero, bento grids, optional calculator split.",
    "L4.5": "Editorial portfolio; tight tracking; em.not-italic contrast words.",
    "L4.6": "Card wall: page bg + fixed grid; small type; mixed font roles.",
    "L4.7": "Deck: mounted slides; opacity+z+pointer-events; keyboard nav.",
    "L4.8": "Scroll-scrub video: GSAP ScrollTrigger→video.currentTime; seek guards.",
    "L4.11": "Styleguide page: swatches, type ramp, button matrix.",
  };

  /** UI: filled in init — user picks how much "anti-template" creative pressure to inject (BIND/stack unchanged). */
  const CREATIVE_VOICE_OPTIONS = [
    { id: "spec_first", label: "Spec-first — dense MotionSites layers (default)" },
    { id: "dramatic", label: "Dramatic — anti-generic layout + composition dice" },
    { id: "wild_card", label: "Wild card — maximum visual divergence (still BIND/stack)" },
  ];

  const COMPOSITION_DICE = [
    "Asymmetric hero: 55/45 split with type bleeding into media safe-zone, not centered stack.",
    "Single-column editorial first fold: narrow measure + huge whitespace, hero image only enters at fold-2.",
    "Card mosaic or dense grid (≥10 small cells), not three fat feature cards.",
    "Bottom-weighted hero: primary story sits lower third; top is atmosphere only.",
    "Diagonal or stepped section seams (CSS clip/mask), not flat horizontal bands only.",
    "One oversized typographic lockup (H1 spans 2 lines, 12–18vw) with minimal chrome.",
    "Bento-first above fold: ≥5 unequal tiles; no single hero rectangle.",
    "Off-grid nav or vertical side-rail labels on desktop; break F-pattern predictability.",
    "Full-bleed color field with inset floating panel (inset shadow), not card-on-gray.",
    "Alternating L/R media rails per section; forbid three identical section templates.",
    "Sticky chapter numbers or progress spine; narrative feels like a document, not slides.",
    "Hero is a single interactive surface (scrub, drag, hover state) not static image+text.",
  ];

  const ANTI_GENERIC_CLI = [
    "Ban centered headline + subhead + two CTAs as the entire above-the-fold story unless deliverable is single-viewport card (L4.2).",
    "Ban Inter-only + soft gray bg + three purple-gradient icons as the default vibe.",
    "Ban generic handshake / laptop stock; use abstract, product, or industry-specific metaphors only.",
    "Ban identical card chrome repeated >2×; vary elevation, radius, or media ratio between cards.",
    "Ban decorative blobs without a layout job; every shape must align to grid or type.",
    "Ban 12-column marketing clone: if layout feels swappable with any SaaS template, redesign hero + first feature band.",
    "Ban rainbow mesh behind all text; confine iridescence to ≤40% viewport height.",
    "Ban more than one scroll-scrub driver; pick UI choreography XOR cinematic BG.",
  ];

  const VISUAL_TWISTS = [
    "Texture: subtle grain OR paper noise on backgrounds (opacity≤0.08), not flat fills only.",
    "One brutalist move allowed: hard shadow, rule lines, or stark black/white moment—if style allows.",
    "Accent color appears in ≤2 sharp places (rule, dot, underline), not washed across gradients.",
    "Photography treatment: duotone, high-contrast crop, or extreme crop—avoid stock framing.",
    "Typography tension: mix display scale jump OR mono data callouts against humanist body.",
    "Motion personality: one playful micro-interaction (spring ≤260ms) on primary CTA only; rest calm.",
    "Dark mode depth: use layered surfaces (zinc 950/900/850) not one flat #000.",
    "Light mode warmth: off-white base + ink text; avoid pure #fff + #111 only.",
  ];

  const ROLE_VARIANTS = {
    dramatic:
      "Senior FE + art direction — ship UI that survives a thumbnail scroll test: it must not read as 'Tailwind marketing default with new hex'. L-layers are binding rails; composition must still feel authored.",
    wild_card:
      "Senior FE as set designer — the page is a scene, not a framework demo. If the hero could be pasted into any startup template unchanged, revise. L-layers are rails; CREATIVE_DIVERGENCE wins on silhouette, tension, and negative space (WCAG non-negotiable).",
  };

  const WORK_ORDER_VARIANTS = {
    dramatic:
      "[L0_EXEC_ORDER] (1)Section tree comments (2)tailwind.config+semantic tokens (3)App+Section*.tsx (4)motion+prefers-reduced-motion (5)DESIGN.md — After (3), sanity-check hero vs generic three-block trope; ONE composition revision pass if it reads as template-default.",
    wild_card:
      "[L0_EXEC_ORDER] (1)Comment a one-line hero composition intent BEFORE markup (2)tokens (3)App+Section*.tsx (4)motion+reduced-motion (5)DESIGN.md — Mandatory second pass: if first fold matches cliché SaaS hero, redesign asymmetry, type scale, or media treatment before shipping.",
  };

  function creativeVoiceSeed(style, industry, platform, voiceId) {
    return `${style.id}|${industry.id}|${platform.id}|${voiceId}`;
  }

  function pickCreativeLines(arr, seed, count) {
    const out = [];
    const n = arr.length;
    if (!n) return out;
    for (let i = 0; i < count; i++) {
      out.push(arr[hashMod(`${seed}|${i}`, n)]);
    }
    return out;
  }

  function buildCreativeDivergenceBlock(voiceId, style, industry, platform, seed) {
    if (voiceId === "spec_first") return "";
    const isWild = voiceId === "wild_card";
    const comps = pickCreativeLines(COMPOSITION_DICE, seed, isWild ? 3 : 2);
    const bans = pickCreativeLines(ANTI_GENERIC_CLI, seed, isWild ? 4 : 2);
    const twist = VISUAL_TWISTS[hashMod(`${seed}|tw`, VISUAL_TWISTS.length)];
    const tone = isWild
      ? "VISUAL_PRIORITY: Memorable > safe. One bold, a11y-safe compositional risk is REQUIRED."
      : "VISUAL_PRIORITY: Distinct > generic. One strong compositional idea beats extra polish.";
    let s = `[CREATIVE_DIVERGENCE] ${tone} Vertical:${industry.label}. Style:"${style.name}". Deliverable:${platform.labelEn || platform.label}.\n`;
    s += `Composition dice (pick ONE primary + at most ONE secondary):\n— ${comps.join("\n— ")}\n`;
    s += `Anti-template bans:\n— ${bans.join("\n— ")}\n`;
    s += `Palette/texture twist: ${twist}\n`;
    if (isWild) {
      s +=
        "WILD_CARD: Steal energy from editorial print, club posters, museum wayfinding, or fashion lookbooks — NOT from generic Dribbble SaaS heroes. If two adjacent sections could swap with any tech product site, redesign one.\n";
    }
    const kw = (style.triggerKeywords || []).slice(0, 5).join(", ");
    if (kw) s += `Surface these keywords visually (not only in copy): ${kw}.\n`;
    const out = `${s.trim()}\n`;
    return out.length > 1300 ? `${out.slice(0, 1270).trimEnd()}…\n` : out;
  }

  function buildCreativeDivergenceCompact(voiceId, style, industry, platform, seed) {
    if (voiceId === "spec_first") return "";
    const comp = COMPOSITION_DICE[hashMod(`${seed}|cc`, COMPOSITION_DICE.length)];
    const ban = ANTI_GENERIC_CLI[hashMod(`${seed}|bb`, ANTI_GENERIC_CLI.length)];
    const twist = VISUAL_TWISTS[hashMod(`${seed}|tt`, VISUAL_TWISTS.length)];
    const wild =
      voiceId === "wild_card"
        ? " Wild: one bold memorable move (a11y-safe); avoid Dribbble SaaS hero clone."
        : "";
    const line = `CREATIVE: Avoid generic startup landing. ${comp} · Ban: ${ban} · Twist: ${twist}.${wild}`;
    return line.length > 340 ? `${line.slice(0, 330).trimEnd()}…` : line;
  }

  function clampPrompt(s, max) {
    if (s.length <= max) return s;
    const suffix = "\n…[truncated]";
    return s.slice(0, max - suffix.length).trimEnd() + suffix;
  }

  function el(id) {
    return document.getElementById(id);
  }

  function pickRandom(arr) {
    if (!arr || !arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function prependDefaultOption(selectId, labelText) {
    const s = el(selectId);
    if (!s) return;
    const o = document.createElement("option");
    o.value = DEFAULT_VAL;
    o.textContent = labelText;
    s.insertBefore(o, s.firstChild);
  }

  function fillSelect(selectId, items, getValue, getLabel) {
    const s = el(selectId);
    if (!s || !items) return;
    s.innerHTML = "";
    for (const it of items) {
      const o = document.createElement("option");
      o.value = getValue(it);
      o.textContent = getLabel(it);
      s.appendChild(o);
    }
  }

  /** ★ = industry fit (priority order); remainder A–Z by style name. */
  function sortStylesForPicker(industryId, allStyles) {
    const pri = (cat.industryStyleFit && cat.industryStyleFit[industryId]) || [];
    const picked = [];
    const seen = new Set();
    for (const id of pri) {
      const s = allStyles.find((x) => x.id === id);
      if (s && !seen.has(s.id)) {
        picked.push(s);
        seen.add(s.id);
      }
    }
    const rest = allStyles
      .filter((s) => !seen.has(s.id))
      .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
    return { ordered: [...picked, ...rest], recommendedCount: picked.length };
  }

  function refillStyleSelect() {
    const industryId = el("industry").value;
    const styleSel = el("style");
    if (!styleSel || !cat.styles) return;
    const prev = styleSel.value;
    const { ordered, recommendedCount } = sortStylesForPicker(industryId, cat.styles);
    styleSel.innerHTML = "";
    ordered.forEach((s, i) => {
      const o = document.createElement("option");
      o.value = s.id;
      const star = i < recommendedCount ? "★ " : "";
      const blurb = (s.userBlurb || s.libraryMood || "").slice(0, 82);
      o.textContent = `${star}${s.name} — ${blurb}`;
      styleSel.appendChild(o);
    });
    if (ordered.some((s) => s.id === prev)) styleSel.value = prev;
    else if (ordered[0]) styleSel.value = ordered[0].id;
    const st = cat.styles.find((s) => s.id === styleSel.value);
    if (st) applyStyleRecommendations(st);
    syncColorVibeSwatchPreview();
  }

  function motionKitMatchesPlane(kit, plane) {
    if (!kit) return false;
    if (plane === "element") return kit.plane === "element" || kit.plane === "both";
    if (plane === "background") return kit.plane === "background" || kit.plane === "both";
    return false;
  }

  function mergedMotionCandidates(style, industry) {
    const styleIds = style?.recommendations?.motionIds || [];
    const fit = (cat.industryMotionFit && industry && cat.industryMotionFit[industry.id]) || {};
    const el = fit.elementIds || [];
    const bg = fit.backgroundIds || [];
    const out = [];
    const seen = new Set();
    for (const id of [...styleIds, ...el, ...bg]) {
      if (!id || seen.has(id)) continue;
      seen.add(id);
      out.push(id);
    }
    return out;
  }

  function animationRefPresetPlaneMatch(preset, side) {
    const pl = preset.planes || [];
    if (side === "ui") return pl.includes("ui") || pl.includes("both");
    return pl.includes("bg") || pl.includes("both");
  }

  function industryDefaultAnimationRefIds(industryId) {
    const presets = cat.animationRefPresets || [];
    const rec = (cat.industryAnimationRefFit && cat.industryAnimationRefFit[industryId]) || [];
    const ui = [];
    const bg = [];
    let uiN = 0;
    let bgN = 0;
    for (const id of rec) {
      const pr = presets.find((x) => x.id === id);
      if (!pr) continue;
      if (animationRefPresetPlaneMatch(pr, "ui") && uiN < 4) {
        ui.push(id);
        uiN++;
      }
      if (animationRefPresetPlaneMatch(pr, "bg") && bgN < 3) {
        bg.push(id);
        bgN++;
      }
    }
    if (!ui.length) ui.push("readme", "tone-to-motion", "motion-react", "css-tailwind");
    if (!bg.length) bg.push("readme", "tone-to-motion", "galleries", "patterns-json");
    return { uiIds: ui, bgIds: bg };
  }

  function motionVibeIsAuto(id) {
    return !id || id === MOTION_VIBE_AUTO_ID || id === DEFAULT_VAL;
  }

  function resolveMotionVibeForPrompt(motionVibeId, industryId, styleId) {
    const list = cat.motionVibes || [];
    const styleRot = String(styleId || "default");
    const autoUiExtras = () => {
      const pool = ["gsap", "animejs", "recipes", "motion-react", "patterns-json", "css-tailwind"];
      return [pool[hashMod(`${styleRot}|aref`, pool.length)]];
    };
    if (!list.length) {
      const d = industryDefaultAnimationRefIds(industryId);
      return {
        vibeLabel: "Auto (industry defaults)",
        keywords:
          "Follow tone-to-motion.md in the hub; start gentle on UI and restrained on background unless the chosen style demands more energy.",
        uiIds: [...new Set([...(d.uiIds || []), ...autoUiExtras()])].slice(0, 6),
        bgIds: d.bgIds,
      };
    }
    const wantsAuto = motionVibeIsAuto(motionVibeId);
    const rawId = wantsAuto ? MOTION_VIBE_AUTO_ID : motionVibeId;
    const v = list.find((x) => x.id === rawId) || list.find((x) => x.auto) || list[0];
    const isAuto = Boolean(v?.auto) || wantsAuto;
    if (isAuto) {
      const d = industryDefaultAnimationRefIds(industryId);
      return {
        vibeLabel: v?.label || "Auto — industry & deliverable bias",
        keywords:
          "Follow tone-to-motion.md in the hub; start gentle on UI and restrained on background unless the chosen style demands more energy.",
        uiIds: [...new Set([...(d.uiIds || []), ...autoUiExtras()])].slice(0, 6),
        bgIds: d.bgIds,
      };
    }
    return {
      vibeLabel: v.label,
      keywords: (v.keywords || "").trim(),
      uiIds: [...new Set((v.uiRefIds || []).filter(Boolean))],
      bgIds: [...new Set((v.bgRefIds || []).filter(Boolean))],
    };
  }

  function fillMotionVibeSelect() {
    const s = el("motionVibe");
    if (!s || !cat.motionVibes || !cat.motionVibes.length) return;
    const prev = s.value;
    s.innerHTML = "";
    for (const v of cat.motionVibes) {
      const o = document.createElement("option");
      o.value = v.id;
      o.textContent = v.label;
      if (v.auto) o.title = "Uses animation-reference picks ordered for the current industry.";
      else if (v.keywords) o.title = `Feeling keywords: ${v.keywords}`;
      s.appendChild(o);
    }
    if (prev && [...s.options].some((o) => o.value === prev)) s.value = prev;
    else s.value = MOTION_VIBE_AUTO_ID;
  }

  function buildAnimationReferenceBlock(resolved) {
    const hub =
      cat.animationRefHubUrl ||
      "https://github.com/Ictraeh/designers-pandora-box/tree/main/docs/animation-reference";
    const presets = cat.animationRefPresets || [];
    const pick = (ids) =>
      [...new Set((ids || []).filter(Boolean))].map((id) => presets.find((p) => p.id === id)).filter(Boolean);
    let ui = pick(resolved.uiIds);
    let bg = pick(resolved.bgIds);
    if (!ui.length) ui = pick(["readme", "tone-to-motion", "motion-react"]);
    if (!bg.length) bg = pick(["readme", "galleries", "tone-to-motion"]);
    const kw = (resolved.keywords || "").trim().slice(0, 280);
    const label = (resolved.vibeLabel || "Motion vibe").replace(/"/g, "'");
    const lines = [];
    lines.push(
      `[ANIMATION_REFERENCE] Hub: ${hub} — official docs first; galleries for ideas only (no bulk copy). Prefer Motion for React unless a linked note says otherwise; honor prefers-reduced-motion. Implement motion that matches the vibe below; use tone-to-motion.md to translate words into duration, easing, and distance.`
    );
    lines.push(`Motion vibe: "${label}"${kw ? ` — keyword cluster: ${kw.replace(/"/g, "'")}` : ""}`);
    lines.push(`UI motion refs:\n${ui.map((p) => `- ${p.label}: ${p.url}`).join("\n")}`);
    lines.push(`Background / ambient motion refs:\n${bg.map((p) => `- ${p.label}: ${p.url}`).join("\n")}`);
    return lines.join("\n");
  }

  function firstRecKitForPlane(motionIds, plane) {
    for (const id of motionIds || []) {
      const k = cat.motionKits.find((m) => m.id === id);
      if (k && motionKitMatchesPlane(k, plane)) return k;
    }
    return null;
  }

  function pickDefaultMotions(style, platform, industry) {
    const merged = mergedMotionCandidates(style, industry);
    let elKit = firstRecKitForPlane(merged, "element");
    let bgKit = firstRecKitForPlane(merged, "background");
    const tags = style?.skillTags || [];
    const fit = (cat.industryMotionFit && industry && cat.industryMotionFit[industry.id]) || {};
    const gentleSiteEl = cat.motionKits.filter(
      (k) => motionKitMatchesPlane(k, "element") && k.energy === "gentle" && (k.group || "site") === "site"
    );
    const gentleSiteBg = cat.motionKits.filter(
      (k) => motionKitMatchesPlane(k, "background") && k.energy === "gentle" && (k.group || "site") === "site"
    );
    if (!elKit) elKit = firstRecKitForPlane(fit.elementIds || [], "element");
    if (!bgKit) bgKit = firstRecKitForPlane(fit.backgroundIds || [], "background");
    if (!elKit) {
      if (tags.includes("char-motion")) elKit = cat.motionKits.find((k) => k.id === "M-char-cascade");
      else if (platform?.id === "web_app_dashboard") elKit = cat.motionKits.find((k) => k.id === "M-delay-fade");
      else {
        const sid = (style && style.id) || "default";
        const heroElPool = [
          cat.motionKits.find((k) => k.id === "M-scroll-text-reveal"),
          cat.motionKits.find((k) => k.id === "M-char-cascade"),
          cat.motionKits.find((k) => k.id === "M-delay-fade"),
          cat.motionKits.find((k) => k.id === "M-horizontal-marquee"),
          cat.motionKits.find((k) => k.id === "M-fade-rise"),
        ].filter(Boolean);
        const ix = hashMod(`${sid}|${platform?.id || "p"}|el`, heroElPool.length || 1);
        elKit = heroElPool[ix] || cat.motionKits.find((k) => k.id === "M-fade-rise");
      }
      if (!elKit) elKit = gentleSiteEl[0];
    }
    if (!bgKit) {
      if (tags.includes("video-bg")) bgKit = cat.motionKits.find((k) => k.id === "M-video-raf-loop");
      else if (platform?.id === "web_app_dashboard") bgKit = cat.motionKits.find((k) => k.id === "minimal");
      else {
        const sid = (style && style.id) || "default";
        const heroBgPool = [
          cat.motionKits.find((k) => k.id === "M-video-raf-loop"),
          cat.motionKits.find((k) => k.id === "M-spotlight-mask"),
          cat.motionKits.find((k) => k.id === "minimal"),
          cat.motionKits.find((k) => k.id === "RB-Backgrounds"),
        ].filter(Boolean);
        const ib = hashMod(`${sid}|${platform?.id || "p"}|bg`, heroBgPool.length || 1);
        bgKit = heroBgPool[ib] || cat.motionKits.find((k) => k.id === "M-video-raf-loop");
      }
      if (!bgKit) bgKit = gentleSiteBg[0];
    }
    const minimal = cat.motionKits.find((k) => k.id === "minimal");
    if (!elKit) elKit = minimal;
    if (!bgKit) bgKit = minimal;
    return { motionEl: elKit, motionBg: bgKit };
  }

  function syncColorVibeSwatchPreview() {
    const strip = el("colorVibeSwatchPreview");
    const sel = el("colorVibe");
    if (!strip || !sel || !cat.colorVibes) return;
    strip.innerHTML = "";
    const val = String(sel.value || "").trim();
    let hexes = [];
    if (val === DEFAULT_VAL) {
      hexes = ["#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b"];
    } else {
      const opt = sel.selectedOptions && sel.selectedOptions[0];
      const fromOpt = (opt?.dataset?.swatch || "")
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean)
        .slice(0, 4);
      if (fromOpt.length) hexes = fromOpt;
      else hexes = (cat.colorVibes.find((x) => x.id === val)?.swatchHexes || []).filter(Boolean).slice(0, 4);
    }
    const list = hexes.length ? hexes : ["#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b"];
    for (const h of list) {
      const d = document.createElement("div");
      d.className = "color-vibe-swatch";
      d.style.background = h;
      d.title = "Guidance swatch (approximate)";
      strip.appendChild(d);
    }
  }

  function fillColorSelect() {
    const s = el("colorVibe");
    if (!s || !cat.colorVibes) return;
    s.innerHTML = "";
    const def = document.createElement("option");
    def.value = DEFAULT_VAL;
    def.textContent = "Default (random color vibe)";
    s.appendChild(def);
    const groups = cat.colorVibeGroups || [{ id: "default", label: "Color vibes" }];
    for (const g of groups) {
      const items = cat.colorVibes.filter((c) => (c.group || "classic_vibes") === g.id);
      if (!items.length) continue;
      const og = document.createElement("optgroup");
      og.label = g.label;
      for (const c of items) {
        const o = document.createElement("option");
        o.value = c.id;
        o.textContent = c.label || c.labelZh || c.id;
        const sw = (c.swatchHexes || []).filter(Boolean).slice(0, 4);
        if (sw.length) o.dataset.swatch = sw.join(",");
        const ex = [c.tagline, c.styleLibraryAlign].filter(Boolean).join(" — ").trim();
        if (ex) o.title = ex.slice(0, 280);
        og.appendChild(o);
      }
      s.appendChild(og);
    }
    syncColorVibeSwatchPreview();
  }

  function syncPromptOutputVisibility() {
    const splitOn = Boolean(el("splitPromptParts")?.checked);
    const singleWrap = el("singlePromptOutput");
    const splitPanel = el("splitPromptPanel");
    const copyBtn = el("copy");
    const help = el("splitPromptHelp");
    if (singleWrap) singleWrap.hidden = splitOn;
    if (splitPanel) splitPanel.hidden = !splitOn;
    if (help) help.hidden = !splitOn;
    if (copyBtn) copyBtn.textContent = splitOn ? "Copy full prompt (A + B)" : "Copy prompt";
  }

  /** Google design.md shape (Ictraeh/design.md + Stitch) — compact (4999 cap). */
  function buildDesignMdClause() {
    const stitch = (cat.designMdMeta && cat.designMdMeta.stitchFormatUrl) || "https://stitch.withgoogle.com/docs/design-md/format/";
    return (
      "[DESIGN_MD] Follow the Google design.md standard: ship ./DESIGN.md using YAML + markdown sections per https://github.com/Ictraeh/design.md and Stitch " +
      stitch +
      " — YAML: colors #hex, typography roles, rounded, spacing, components.*. Body: Overview→Colors→Typography→Layout→Elevation→Shapes→Components→Do's. " +
      "Align with [FONTS]/[COLOR]/[DESIGN_MD_REFS]. Optional: npx @google/design.md lint|export.\n"
    );
  }

  function buildDesignMdClauseCompact() {
    const stitch = (cat.designMdMeta && cat.designMdMeta.stitchFormatUrl) || "https://stitch.withgoogle.com/docs/design-md/format/";
    return `DESIGN.md: follow Google design.md standard — ./DESIGN.md with YAML + sections per github.com/Ictraeh/design.md; Stitch ${stitch} — mirror fonts/colors in this prompt.`;
  }

  function tokenizeStr(s) {
    return (s || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2);
  }

  /** Slugs from awesome-design-md / getdesign.md — boost picks by vertical. */
  const INDUSTRY_DESIGN_SLUG_BOOST = {
    art_design: ["framer", "figma", "clay", "webflow"],
    photography: ["airbnb", "apple", "notion"],
    portfolio_cv: ["linear.app", "vercel", "stripe", "framer"],
    fashion_beauty: ["clay", "framer", "apple"],
    fitness_wellness: ["spotify", "apple", "uber"],
    food_restaurants: ["airbnb", "uber", "notion"],
    real_estate_home: ["airbnb", "ibm", "clay"],
    travel_tourism: ["airbnb", "uber", "wise"],
    weddings_events: ["notion", "clay", "intercom"],
    education: ["mintlify", "notion", "sanity", "cursor"],
    professional_services: ["linear.app", "intercom", "stripe", "cal"],
    community_nonprofits: ["notion", "zapier", "airtable"],
    entertainment_media: ["spotify", "pinterest", "runwayml"],
    hobbies_lifestyle: ["pinterest", "miro", "airtable"],
    saas_it_services: ["vercel", "linear.app", "stripe", "resend", "supabase", "cursor"],
    ecommerce: ["stripe", "airbnb", "coinbase", "apple"],
    industrial: ["ibm", "spacex", "tesla", "mongodb"],
  };

  function buildDesignMdRefBlock(style, industry) {
    const pool = cat.designMdReferences || [];
    const meta = cat.designMdMeta || {};
    const idx = meta.indexUrl || "https://github.com/VoltAgent/awesome-design-md";
    if (!pool.length) {
      return `[DESIGN_MD_REFS] Open two getdesign.md/<slug>/design-md pages from ${idx} matching ${industry.label}; copy spacing/type/CTA discipline only for <BRAND>.`;
    }
    const boost = INDUSTRY_DESIGN_SLUG_BOOST[industry.id] || [];
    const boostSet = new Set(boost);
    const indTok = new Set([...tokenizeStr(industry.label), ...tokenizeStr(industry.id)]);
    const kwTok = new Set();
    for (const k of style.triggerKeywords || []) tokenizeStr(k).forEach((t) => kwTok.add(t));
    const scored = pool.map((r, i) => {
      let s = 0;
      if (boostSet.has(r.slug)) s += 8;
      for (const t of r.tags || []) {
        if (kwTok.has(t)) s += 3;
        if (indTok.has(t)) s += 2;
      }
      for (const t of tokenizeStr(r.label)) {
        if (kwTok.has(t)) s += 1;
      }
      return { r, s, i };
    });
    scored.sort((a, b) => b.s - a.s || a.i - b.i);
    const picks = [];
    const used = new Set();
    for (const x of scored) {
      if (picks.length >= 2) break;
      if (x.s > 0 && !used.has(x.r.slug)) {
        picks.push(x.r);
        used.add(x.r.slug);
      }
    }
    const h = hashMod(`${style.id}|${industry.id}|dm`, pool.length || 1);
    let hop = 0;
    while (picks.length < 2 && pool.length) {
      const r = pool[(h + hop * 13) % pool.length];
      hop++;
      if (!used.has(r.slug)) {
        picks.push(r);
        used.add(r.slug);
      }
      if (hop > pool.length + 5) break;
    }
    const a = picks[0];
    const b = picks[1] || picks[0];
    const fmt = (r) => (r ? `${r.label}→${r.hub}` : "");
    const stitch = meta.stitchFormatUrl || "https://stitch.withgoogle.com/docs/design-md/format/";
    return `[DESIGN_MD_REFS] Patterns-only (no trademark clone): ${fmt(a)} · ${fmt(b)} · format ${stitch} · index ${idx}`;
  }

  function buildAgencyGuardBlock(style, industry) {
    return `[L8_GOVERNANCE] Agency bar: bold/clean/contemporary; ${style.layoutArchetype} is the layout spine—vary split|bento|editorial|asymmetric|logo-rail|FAQ vs generic hero+3 cards unless L4.6. Copy specific to ${industry.label}. BAN grey-mush contrast, lorem marketing, untokenized gradients, handshake stock, duplicate card chrome>2, purposeless blobs, type chaos. ENFORCE WCAG AA on media, DESIGN.md tokens, motion only where L7 specifies.`;
  }

  function hashMod(str, mod) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return mod ? Math.abs(h) % mod : Math.abs(h);
  }

  /** Map vague library mood / hints → concrete Tailwind/CSS execution (LLM must apply, not paraphrase). */
  const MOOD_LEXICON = [
    { re: /formal|timeless|authority|museum|heritage|ceremonial/i, out: "TYPE:tight tracking on H1(-0.03em–-0.05em);weight500–600;neutral ramp 950/700/400/100;one accent≤10% area." },
    { re: /ornate|theatrical|drama|baroque|linework/i, out: "SURFACE:#0a0a0a base;hairline borders white/10;accent gold/amber sparse;shadow inner subtle not neon glow." },
    { re: /iridescent|fluid|gradient|mesh|holographic/i, out: "BG:3-stop mesh OR conic behind hero only opacity≤0.55;mid-page return solid surfaces;no full-viewport rainbow without tokens." },
    { re: /soft|weightless|airy|ethereal|hierarchy/i, out: "SPACE:py-24 md:py-36;cards p-8;rounded-2xl/3xl;dividers border-white/5 not /20;body leading-relaxed." },
    { re: /minimal|precise|clinical|technical|engineer/i, out: "GRID:12-col rhythm;4px baseline snap;eyebrow text-[11px] uppercase tracking-[0.18em] text-muted-foreground." },
    { re: /bold|poster|brutal|neo|chromatic/i, out: "TYPE:H1 may uppercase;border-2 border-foreground;shadow-[4px_4px_0_0];avoid blur/glass unless tag demands." },
    { re: /playful|bouncy|friendly|kinetic/i, out: "MOTION:springy cubic-bezier(.34,1.56,.64,1) on CTAs≤260ms;sections fade400ms linear;no overshoot on scroll." },
    { re: /luxury|premium|editorial|magazine/i, out: "IMG:full-bleed photo+thin serif quotes;body max-w-prose;text-sm/md:text-base tracking-normal." },
    { re: /dark|cinematic|noir|night/i, out: "COLOR:bg #030303–#0c0c0f;text zinc-100/zinc-400;accent single hue;scrim under all video text." },
    { re: /light|airy|scandi|paper/i, out: "COLOR:bg #fafafa–#f4f4f5;text zinc-900;border zinc-200;accent one saturated spot only." },
  ];

  function buildMoodExecutionSheet(style) {
    const hay = [
      style.libraryMood,
      style.libraryLayout,
      style.name,
      style.fontPairingHint,
      style.colorSystemHint,
      ...(style.triggerKeywords || []),
    ]
      .filter(Boolean)
      .join(" ");
    const hits = [];
    for (const row of MOOD_LEXICON) {
      if (row.re.test(hay)) hits.push(row.out);
    }
    const uniq = [...new Set(hits)];
    const lines = uniq.slice(0, 4);
    if (!lines.length) {
      lines.push(
        "DEFAULT:Pick ONE dominant composition(asymmetric-split|dense-bento|editorial-long|card-mosaic)+ONE surface motif(glass rail|hard grid|soft elevated cards)."
      );
    }
    return `[L4_MOOD→EXEC] Mood:"${(style.libraryMood || "").slice(0, 120)}" Layout hint:"${(style.libraryLayout || "").slice(0, 100)}" → ${lines.join(" | ")}`;
  }

  function buildStyleIndustryFitBlock(industry, style) {
    const fit = (cat.industryStyleFit && cat.industryStyleFit[industry.id]) || [];
    const head = fit.slice(0, 8).join("|") || "(any)";
    return `[STYLE×INDUSTRY] Vertical:${industry.label}.Suggested primaries(in order):${head}.Chosen:"${style.name}"—suggestions are soft rails; remix freely if a stronger concept serves ${industry.label}.`;
  }

  function buildStyleTypeColorAuthority(style, fontVibe, colorVibe) {
    const ad = (style.artDirection || "").replace(/\s+/g, " ").trim().slice(0, 130);
    return `[STYLE→TYPE_COLOR] "${style.name}" drives typography+color mood:fonts→${(style.fontPairingHint || "").slice(0, 120)}|colors→${(style.colorSystemHint || "").slice(0, 120)}|artDir:${ad}.Map tool picks font[${fontVibe.id}] color[${colorVibe.id}]—on conflict,style hints win for emotional palette+display personality;tool/recipe wins for measurable scale+contrast.`;
  }

  function buildStyleMotionUxBlock(style, motionEl, motionBg) {
    const b = (style.interactionMotionBlurb || "").slice(0, 520);
    return `[STYLE_MOTION_UX] ${b} | UI(elements):${motionEl.id} · BG(ambient):${motionBg.id}. Stack: ReactBits+anime.js+CSS+MotionSites §8; hero recipe is unique to this style—do not clone motion from unrelated exports; hover/focus/stagger with purpose.`;
  }

  function buildMotionLibLine(kit) {
    if (!kit) return "";
    if (kit.id.startsWith("RB-"))
      return `ReactBits(${kit.rbCategory || "snippet"})→Motion code panel`;
    if (["M-scroll-text-reveal", "M-scroll-scrub-video", "M-spline-bg", "M-slide-deck"].includes(kit.id))
      return "motion/react or GSAP when spec demands";
    if (kit.id === "minimal") return "hover-only micro";
    return "CSS+anime ok";
  }

  function buildDualMotionLayer(motionEl, motionBg, style) {
    const le = buildMotionLibLine(motionEl);
    const lb = buildMotionLibLine(motionBg);
    const tags = style.skillTags || [];
    const ch = tags.includes("char-motion") ? "H1 stagger if UI kit allows; total≤900ms." : "";
    const de = (motionEl.detail || "").replace(/\s+/g, " ").trim().slice(0, 100);
    const db = (motionBg.detail || "").replace(/\s+/g, " ").trim().slice(0, 100);
    const rbHints = [
      "ReactBits≤2: one signature module for hero (TextAnimations|Animations|Backgrounds)—rotate family vs other builds.",
      "ReactBits≤2: pair one TextAnimations headline treatment with one Components OR Animations accent—not the same pair every site.",
    ];
    const rbPick = rbHints[hashMod(`${style.id}|l7rb`, rbHints.length)];
    return `[L7_MOTION_SPEC] ${rbPick} Split layers—UI(elements):${motionEl.id}|${de}|${le} · BG(ambient):${motionBg.id}|${db}|${lb}. anime.js: timeline stagger y12–24px+opacity unless GSAP path. GSAP only if scroll-scrub/clip-menu spec. Durations: nav150–200ms|section450–650ms|stagger45–70ms|hover180ms. ${ch}prefers-reduced-motion: opacity≤200ms fallback.`;
  }

  /** In-repo designer markdown (sources/design-style-layout-md) — excerpts + L4 layout doc URL. */
  function buildStyleLibraryBlock(style) {
    const sl = cat.styleLibrary;
    const l4 = style.layoutArchetype;
    const tree = (sl && sl.treeUrl) || "https://github.com/Ictraeh/website_prompt_generator/tree/main/sources/design-style-layout-md";
    if (!sl || !sl.present) {
      return `[STYLE_LIB] Read designer MD from ${tree}; map ${l4} + "${style.name}" to layout+type+palette rules (sync sources/design-style-layout-md in repo, then rebuild catalog).`;
    }
    const layout = sl.layoutByL4[l4] || sl.layoutByL4.L4_DEFAULT || sl.layoutByL4["L4.3"];
    const ae = (sl.aestheticExcerpt || "").slice(0, 680);
    const fe = (sl.fontPairingExcerpt || "").slice(0, 380);
    const le = (layout && layout.excerpt) || "";
    const lex = le.slice(0, 280);
    const raw = layout && layout.rawUrl ? layout.rawUrl : "";
    return `[STYLE_LIB] tree:${tree} | AESTHETIC_DIGEST:${ae} | FONT_RULES:${fe} | L4(${l4})_LAYOUT_EXCERPT:${lex} | L4_LAYOUT_FULL:${raw}`;
  }

  function heroPlacementHint(l4) {
    if (l4 === "L4.4") return "split-hero+bento mid mandatory";
    if (l4 === "L4.6") return "card-wall grid first;small type";
    if (l4 === "L4.1" || l4 === "L4.8") return "full-bleed media hero";
    if (l4 === "L4.2") return "email-card shell 640px";
    if (l4 === "L4.7") return "deck slides opacity+z-index";
    return "pick ONE hero anchor:center|bottom|split and keep consistent";
  }

  function buildWorkOrderLayer() {
    return `[L0_EXEC_ORDER] (1)Comment section tree (2)tailwind.config+index.css semantic colors (3)components:App+Section*.tsx (4)motion+prefers-reduced-motion (5)DESIGN.md mirrors tokens. Implement;do not meta-narrate plan in code output.`;
  }

  function buildContentLayer(industry, sectionLine, notesShort) {
    return `[L1_CONTENT] <BRAND>.Vertical:${industry.label}.Headlines:4–8w concrete nouns;ban "innovative/world-class/leverage".Body≤28w/para.CTAs:Start|Book|Compare|Pricing.User:${notesShort}.Flow→${sectionLine}`;
  }

  function buildLayoutLayer(style, platform, l4Short, l4Doc) {
    const doc = (l4Doc || "").replace(/\s+/g, " ").trim().slice(0, 260);
    const plat = platform.labelEn || platform.label;
    return `[L2_LAYOUT+GRID] ${style.layoutArchetype}|${plat}|${l4Short}.DOC:${doc} Rule:${heroPlacementHint(style.layoutArchetype)}.Marketing max-w-7xl mx-auto unless spec wider.12-col mental alignment for desktop.`;
  }

  function buildHeroShellLayer(style) {
    return `[L2B_HERO_SHELL] min-h-[100svh] overflow-hidden;media:absolute inset-0 -z-10 object-cover;content:z-20;CTA:${style.id === "neo-brutalism" ? "hard shadow/border" : "solid+ring/outline OR glass+lift"}.`;
  }

  function buildSpaceLayer() {
    return `[L3_SPACE] x:px-4 sm:px-6 md:px-12 lg:px-16 | y:py-16 md:py-24 lg:py-28 | stacks:gap-6 md:gap-8 | cards:p-6 md:p-8 | nav:h-14–16 | min touch 44px.`;
  }

  function buildSurfaceLayer(style) {
    const tags = (style.skillTags || []).join(",");
    let s = `[L4_SURFACE+RADIUS] tags:${tags}. `;
    if (tags.includes("glass-nav")) s += "Nav:backdrop-blur-md bg-white/5 border-white/10. ";
    if (tags.includes("video-bg")) s += "Video:scrim bg-gradient-to-b from-black/70 via-black/35 to-transparent under text. ";
    s += "Radius:pick ONE family sitewide(xl cards OR none brutal).Shadows:max2 tiers(card+popover).";
    return s;
  }

  function buildTypoLayer(fontVibe, style, pairingRef) {
    const mono = fontVibe.mono ? `code/KPI:${fontVibe.mono}.` : "";
    return `[L5_TYPOGRAPHY] Import:'${fontVibe.display}'+'${fontVibe.body}'.Ramp:eyebrow text-[11px] tracking-[0.2em] uppercase muted|H1 text-4xl sm:text-5xl lg:text-6xl/7xl|lead text-xl sm:text-2xl max-w-2xl|body text-base sm:text-lg leading-relaxed|fine print text-sm opacity-80.${mono}${pairingRef}|lib:${(style.fontPairingHint || "").slice(0, 120)}`;
  }

  function buildColorLayer(colorVibe, style) {
    const hint = [colorVibe.cssHint, colorVibe.styleLibraryAlign].filter(Boolean).join("|").replace(/\s+/g, " ").trim().slice(0, 320);
    const tag = colorVibe.tagline ? `Mood:${colorVibe.tagline}.` : "";
    return `[L6_COLOR_ROLES] ${tag}Feeling-vibe:${colorVibe.id}.Roles:bg|surface|border|text|muted|accent|cta+ctaGhost.Ref:${colorVibe.huemintRef || "derive"}.TOOL:${hint}.Lib:${(style.colorSystemHint || "").slice(0, 120)}.Rule:body≥4.5:1 vs bg;accent≤12% pixels above fold;hex anchors are approximate—preserve emotion and roles, not literal values.`;
  }

  const NAMING_STRATEGIES = [
    "Portmanteau from two concrete nouns in the industry (e.g. VoltCanvas, HarborLedger).",
    "Plain confident product English (two words max, no French article).",
    "Compound noun stack (Material + Tool + noun) readable in nav lockup.",
    "Invented Latinate suffix on a short stem (-ora, -ium, -lytics) but avoid faux-French house words.",
    "Scandi-style compound with consonant cluster (Fjordstack, Klarbyte).",
    "Japanese romanization vibe for tech/creative (e.g. KumoLayer) when genre fits.",
    "Single evocative English word + numeric suffix only if SaaS/devtools tone.",
    "Oblique metaphor + category suffix (CopperHarbor Studio, SlatePilot Labs).",
  ];

  function buildNamingBlock(style, industry) {
    const seed = `${style.id}|${industry.id}`;
    const strat = NAMING_STRATEGIES[hashMod(seed, NAMING_STRATEGIES.length)];
    return `[NAMING] ${strat} <BRAND> must feel specific to ${industry.label} + ${style.name}. Forbidden lazy defaults: do NOT name the product "Maison …", "Maison & …", "L'Atelier …", "Atelier …", "House of …", or similar French-house clichés unless user notes explicitly require that heritage.`;
  }

  const FONT_VARIATION_AXES = [
    "mono-led: data readouts in mono + calm humanist sans for marketing copy",
    "slab headline + geometric sans body (avoid Inter-only body if recipe allows)",
    "single variable family with weight/width axis for display+UI",
    "ultra-condensed grotesk display + generous rounded sans body",
    "soft serif editorial + narrow tech sans for labels/captions",
    "display black weight + light book serif for pull quotes only",
  ];

  function buildFontVariationBlock(style, fontVibe, rec) {
    const axis = FONT_VARIATION_AXES[hashMod(`${style.id}|fv`, FONT_VARIATION_AXES.length)];
    const alts = rec?.fontVibeIds?.filter((id) => id !== fontVibe.id).slice(0, 4).join("|") || "browse_catalog_fontVibes";
    return `[FONT_VARIATION] ${axis}. If display+body would repeat generic "one serif + Inter" across builds, pivot using CATALOG_REC alternates: ${alts}. Keep §5.1_recipe when pairingRecipeId is set, but still vary secondary/mono/caption role fonts.`;
  }

  function buildRichMediaSlots(style) {
    const pool = cat.pexelsPool || {};
    const vids = pool.heroVideos && pool.heroVideos.length ? pool.heroVideos : [style.pexels.heroVideo];
    const imgs = pool.heroImages && pool.heroImages.length ? pool.heroImages : [style.pexels.heroImage];
    const thumbs = pool.cardThumbs && pool.cardThumbs.length ? pool.cardThumbs : [style.pexels.cardThumb];
    const n = style.libraryNumber || hashMod(style.id, 99);
    const v0 = style.pexels.heroVideo;
    const v1 = vids[(n + 3) % vids.length];
    const i0 = style.pexels.heroImage;
    const i1 = imgs[(n + 1) % imgs.length];
    const i2 = imgs[(n + 5) % imgs.length];
    const t0 = style.pexels.cardThumb;
    const t1 = thumbs[(n + 2) % thumbs.length];
    const kw = (style.triggerKeywords || []).slice(0, 5).join(", ");
    return `[MEDIA_ASSETS] (A) Pexels video: hero=${v0}; mid-page strip or second hero=${v1}. (B) Pexels stills: hero_img=${i0}; section_bg_1=${i1}; section_bg_2=${i2}; card_thumbs=${t0},${t1} — search pexels.com with keywords: ${kw} for extra fills. (C) lummi.ai: place 1–3 generative stills (abstract, portrait, or product mood) as <LUMMI_1>… URLs from https://lummi.ai — distinct from Pexels subjects. (D) lucide-react: ≥14 distinct named imports across shell. (E) Optional short muted Pexels clip in a feature column (poster frame + controls). (F) No duplicate same remote media id for hero+card; HTML comment attribution per asset.`;
  }

  function sectionPlan(platform, industryLabel) {
    if (platform.id === "web_hero_single") {
      return ["Hero (single viewport): nav + headline + supporting copy + primary/secondary CTAs + optional social proof row"];
    }
    if (platform.id === "web_app_dashboard") {
      return [
        "Shell: sticky sidebar + top bar; content max-w-[1600px]",
        "Overview: KPI cards grid + sparkline placeholders",
        `${industryLabel}-specific table or list view with dense typography`,
        "Detail drawer or modal pattern (shadcn optional)",
        "Settings / profile strip (compact)",
      ];
    }
    if (platform.id === "web_app_product") {
      return [
        "Marketing hero → product value props (3 cards)",
        "Interactive feature tour OR screenshot mosaic",
        `${industryLabel} use-case narrative + testimonial band`,
        "Pricing / plans OR integration logos row",
        "FAQ accordion + primary CTA footer",
      ];
    }
    return [
      "Hero: full-bleed media + glass or minimal nav + headline ladder + CTAs",
      `Social proof: logos or metrics row tailored to ${industryLabel}`,
      "Features: bento or 3-column grid with media + copy",
      "Deep dive: split layout or long-form editorial block",
      "Closing CTA band: high contrast + secondary link",
    ];
  }

  function buildPrompt(opts) {
    const {
      platform,
      industry,
      style,
      fontVibe,
      colorVibe,
      motionEl,
      motionBg,
      userNotes,
      blend,
      stackProfile,
      blindRollLine = "",
      includeDesignMd = true,
      splitPromptParts = false,
      compactPrompt = false,
      creativeVoice = "spec_first",
      motionVibeId = MOTION_VIBE_AUTO_ID,
    } = opts;

    const motionVibeResolved = resolveMotionVibeForPrompt(motionVibeId, industry.id, style.id);
    const animationRefBlock = buildAnimationReferenceBlock(motionVibeResolved);
    const animationRefBlockCompact = animationRefBlock
      ? animationRefBlock.replace(/\s+/g, " ").trim().slice(0, 420)
      : "";

    const sections = sectionPlan(platform, industry.label);
    const l4Short = L4_HINTS[style.layoutArchetype] || style.layoutArchetype;
    const l4Doc = (cat.l4Blueprint && (cat.l4Blueprint[style.layoutArchetype] || cat.l4Blueprint.L4_DEFAULT)) || "";
    const sectionLine = sections.join(" → ");
    const notesShort = (userNotes.trim() || "—").slice(0, 320);

    const rec = style.recommendations;
    const recLine =
      rec &&
      Array.isArray(rec.fontVibeIds) &&
      Array.isArray(rec.colorVibeIds) &&
      Array.isArray(rec.motionIds)
        ? `CATALOG_REC: fontCandidates=${rec.fontVibeIds.join("|")} colorCandidates=${rec.colorVibeIds.join("|")} motionCandidates=${rec.motionIds.join("|")}`
        : "";

    const namingBlock = buildNamingBlock(style, industry);
    const designMdRefBlock = buildDesignMdRefBlock(style, industry);
    const agencyGuardBlock = buildAgencyGuardBlock(style, industry);
    const fontVarBlock = buildFontVariationBlock(style, fontVibe, rec);
    const mediaSlots = buildRichMediaSlots(style);

    const forbidden = [];
    if (["midnight", "aurora", "lavender"].includes(colorVibe.id)) {
      forbidden.push("no random purple/indigo unless tokenized");
    }
    if ((style.skillTags || []).includes("video-bg")) {
      forbidden.push("text contrast via scrim/text-shadow unless spec forbids overlay on video");
    }

    const stackExtra = (stackProfile && stackProfile.optionalLines && stackProfile.optionalLines.join(" ")) || "";
    const blendLine =
      blend && blend.id !== "none" && blend.hint ? `SECONDARY_BLEND(${blend.id}): ${blend.hint}` : "";

    const glassLine = (style.skillTags || []).includes("glass-nav")
      ? "GLASS: reusable .liquid-glass per §7.1 (luminosity blend, blur(4px), inset highlight, ::before 1.4px gradient mask ring); apply <GLASS_TINT> rgba to nav/CTAs/cards."
      : "";

    const pairingRef =
      fontVibe.pairingRecipeId != null
        ? `§5.1_recipe_${fontVibe.pairingRecipeId}`
        : "§5.1_custom";
    const moodFont = (fontVibe.moodTags || []).join("/");

    const crSeed = creativeVoiceSeed(style, industry, platform, creativeVoice);
    const creativeBlockFull = buildCreativeDivergenceBlock(creativeVoice, style, industry, platform, crSeed);
    const creativeBlockCompact = buildCreativeDivergenceCompact(
      creativeVoice,
      style,
      industry,
      platform,
      crSeed
    );
    const workOrder =
      creativeVoice === "dramatic"
        ? WORK_ORDER_VARIANTS.dramatic
        : creativeVoice === "wild_card"
          ? WORK_ORDER_VARIANTS.wild_card
          : buildWorkOrderLayer();
    const roleLineFull =
      creativeVoice === "dramatic"
        ? `[ROLE] ${ROLE_VARIANTS.dramatic} spec≤${MAX_PROMPT_CHARS}ch.Placeholders:<BRAND><HEADLINE><SUBHEAD><PRIMARY_HSL>.`
        : creativeVoice === "wild_card"
          ? `[ROLE] ${ROLE_VARIANTS.wild_card} spec≤${MAX_PROMPT_CHARS}ch.Placeholders:<BRAND><HEADLINE><SUBHEAD><PRIMARY_HSL>.`
          : `[ROLE] Senior FE — implement UI per layers L0–L8; spec≤${MAX_PROMPT_CHARS}ch.Placeholders:<BRAND><HEADLINE><SUBHEAD><PRIMARY_HSL>.`;

    const contentLayer = buildContentLayer(industry, sectionLine, notesShort);
    const layoutLayer = buildLayoutLayer(style, platform, l4Short, l4Doc);
    const heroShell = buildHeroShellLayer(style);
    const spaceLayer = buildSpaceLayer();
    const surfaceLayer = buildSurfaceLayer(style);
    const moodExec = buildMoodExecutionSheet(style);
    const typoLayer = buildTypoLayer(fontVibe, style, pairingRef);
    const colorLayer = buildColorLayer(colorVibe, style);

    const langPreamble = "";
    const langPreambleCompact = "";
    const uiLang = "UI strings: English.";
    const designMdBlock = includeDesignMd ? buildDesignMdClause() : "";
    const designMdBlockCompact = includeDesignMd ? `${buildDesignMdClauseCompact()}\n` : "";
    const bindLine = `${platform.labelEn || platform.label}|${industry.label}|#${style.libraryNumber} ${style.name}`;

    const indFit = cat.industryMotionFit?.[industry.id];
    const industryMotionLine = indFit?.hint
      ? `[INDUSTRY_MOTION] ${industry.label}: ${indFit.hint.replace(/\s+/g, " ").trim().slice(0, 220)}`
      : "";

    let baseThroughColor;
    let motionPack;
    let restAfterMotion;

    if (compactPrompt) {
      const fvLabel = fontVibe.pickerLabel || fontVibe.labelZh || fontVibe.label || fontVibe.id;
      const cvLabel = colorVibe.label || colorVibe.labelZh || colorVibe.id;
      const titleLine = `TITLE: <HEADLINE> — ${style.name} · ${industry.label}`;
      const subLine = `SUB: ${platform.labelEn || platform.label} · style #${style.libraryNumber} · ${fvLabel} · ${cvLabel}`;
      const blurb = (style.userBlurb || style.libraryMood || "").replace(/\s+/g, " ").trim().slice(0, 200);
      const noteLine =
        notesShort && notesShort !== "—" ? `NOTES: ${notesShort.slice(0, 140)}` : "";
      const workShort =
        creativeVoice === "wild_card"
          ? "Ship: hero intent comment → tokens → sections → motion → DESIGN.md — then second pass if hero is cliché."
          : creativeVoice === "dramatic"
            ? "Ship: tree → tokens → App+Section → motion → DESIGN.md — revise once if hero reads template-default."
            : "Ship: section tree comments → tailwind semantic tokens → App+Section*.tsx → motion (prefers-reduced-motion) → optional DESIGN.md.";
      const roleShort =
        creativeVoice === "wild_card"
          ? "ROLE: Set-designer FE — scene not template demo; CREATIVE line wins on silhouette (WCAG fixed). <BRAND><HEADLINE><SUBHEAD>."
          : creativeVoice === "dramatic"
            ? "ROLE: FE+art direction — thumbnail-unique; kill generic marketing chrome. <BRAND><HEADLINE><SUBHEAD>."
            : "ROLE: Senior FE — one shipped UI; placeholders <BRAND> <HEADLINE> <SUBHEAD> <PRIMARY_HSL>; implement, don't pad with meta-plan prose.";
      const stackShort = `STACK: React 18 + TS + Vite + Tailwind 3 + lucide-react ./src/**/*.{ts,tsx}. ${stackExtra}`.trim();
      const namingOne = buildNamingBlock(style, industry).replace(/^\[NAMING\]\s*/, "Naming: ");
      const fit = (cat.industryStyleFit && cat.industryStyleFit[industry.id]) || [];
      const fitHead = fit.slice(0, 6).join(" · ") || "—";
      const industryShort = `Vertical: ${industry.label}. Catalog primaries: ${fitHead}. Chosen: ${style.name}.`;
      const contentShort = `Content: concrete headlines; no innovation clichés; CTAs Start|Book|Pricing. Flow: ${sectionLine.slice(0, 360)}`;
      const docShort = (l4Doc || "").replace(/\s+/g, " ").trim().slice(0, 120);
      const layoutShort = `Layout: ${style.layoutArchetype} · ${(l4Short || "").slice(0, 100)} · ${heroPlacementHint(style.layoutArchetype)} · ${docShort} · max-w-7xl unless spec.`;
      const shellShort = `Hero: min-h-[100svh]; media absolute inset-0 object-cover behind; content z-20; CTA ${style.id === "neo-brutalism" ? "hard border/shadow" : "solid+ring or glass+lift"}.`;
      const spaceShort = "Spacing: px-4 md:px-12 · section py-16→28 · gap-6–8 · cards p-6–8 · touch ≥44px.";
      const tags = (style.skillTags || []).filter(Boolean).join(", ");
      let surfShort = tags ? `Surface: ${tags}.` : "Surface: one radius family.";
      if (style.skillTags?.includes("glass-nav")) surfShort += " Nav: blur+thin border.";
      if (style.skillTags?.includes("video-bg")) surfShort += " Video: scrim under type.";
      const moodPlain = moodExec.replace(/^\[L4_MOOD→EXEC\]\s*/, "Mood→CSS: ");
      const sl = cat.styleLibrary;
      let refsShort = "";
      if (sl?.present) {
        const l4 = style.layoutArchetype;
        const lay = sl.layoutByL4[l4] || sl.layoutByL4.L4_DEFAULT || sl.layoutByL4["L4.3"];
        const raw = lay?.rawUrl || "";
        refsShort = `Designer refs: ${(sl.treeUrl || "").slice(0, 80)}… · ${(sl.aestheticExcerpt || "").replace(/\s+/g, " ").trim().slice(0, 160)}`;
        if (raw) refsShort += ` · layout MD: ${raw}`;
      } else {
        refsShort = `Designer refs: sync in-repo layout MD for ${style.layoutArchetype}.`;
      }
      const colorHint = [colorVibe.cssHint, colorVibe.styleLibraryAlign].filter(Boolean).join(" — ").slice(0, 100);
      const typoColorShort = `Type+color: import ${fontVibe.display} + ${fontVibe.body}; scale eyebrow→H1→body; vibe ${moodFont}. Lib type: ${(style.fontPairingHint || "").slice(0, 70)}. Color tool ${cvLabel}: ${colorHint}. Lib color: ${(style.colorSystemHint || "").slice(0, 70)}. AA contrast; accent rare.`;

      baseThroughColor = `${langPreambleCompact}${titleLine}
${subLine}
${blurb ? `${blurb}\n` : ""}${noteLine ? `${noteLine}\n` : ""}${creativeBlockCompact ? `${creativeBlockCompact}\n` : ""}
${workShort}
${roleShort}
${stackShort}
BIND: ${bindLine}
${namingOne}
${industryShort}
${contentShort}
${layoutShort}
${shellShort}
${spaceShort}
${surfShort}
${moodPlain}
${refsShort}
${typoColorShort}`;

      const indMotPlain = indFit?.hint
        ? `Industry motion (${industry.label}): ${indFit.hint.replace(/\s+/g, " ").trim().slice(0, 140)}`
        : "";
      motionPack = [
        indMotPlain,
        buildStyleMotionUxBlock(style, motionEl, motionBg)
          .replace(/^\[STYLE_MOTION_UX\]\s*/, "Interaction: ")
          .slice(0, 320),
        buildDualMotionLayer(motionEl, motionBg, style)
          .replace(/^\[L7_MOTION_SPEC\]\s*/, "Motion layers: ")
          .slice(0, 420),
        animationRefBlockCompact,
      ]
        .filter(Boolean)
        .join("\n");

      const dmRefPlain = buildDesignMdRefBlock(style, industry).replace(/^\[DESIGN_MD_REFS\]\s*/, "").slice(0, 220);
      const govPlain = buildAgencyGuardBlock(style, industry).replace(/^\[L8_GOVERNANCE\]\s*/, "").slice(0, 180);
      const mediaPlain = mediaSlots.replace(/^\[MEDIA_ASSETS\]\s*/, "").slice(0, 200);
      const recShort =
        rec &&
        Array.isArray(rec.fontVibeIds) &&
        Array.isArray(rec.colorVibeIds) &&
        Array.isArray(rec.motionIds)
          ? `Catalog bias: fonts ${rec.fontVibeIds.slice(0, 4).join("/")} · colors ${rec.colorVibeIds.slice(0, 4).join("/")} · motion ${rec.motionIds.slice(0, 5).join("/")}`
          : "";
      const glassShort =
        style.skillTags && style.skillTags.includes("glass-nav")
          ? "Glass: liquid-glass on nav/CTAs — blur + inset ring + rgba tint (see style lib §7.1)."
          : "";
      restAfterMotion = [
        glassShort || glassLine,
        blendLine,
        blindRollLine,
        `Design.md refs: ${dmRefPlain}`,
        `Quality bar: ${govPlain}`,
        designMdBlockCompact.trimEnd(),
        `Media: ${mediaPlain}`,
        `Guard: ${forbidden.join("; ") || "no tokenless sludge"}`,
        "QA: responsive · CLS · focus-visible · sane bundles",
        recShort,
        uiLang,
      ]
        .filter(Boolean)
        .join("\n");
    } else {
      const motionPackFull = [
        industryMotionLine,
        buildStyleMotionUxBlock(style, motionEl, motionBg),
        buildDualMotionLayer(motionEl, motionBg, style),
        animationRefBlock,
      ]
        .filter(Boolean)
        .join("\n");
      motionPack = motionPackFull;
      const projectBanner = `PROJECT: <HEADLINE> — ${style.name} · ${industry.label} · ${platform.labelEn || platform.label}\n`;
      baseThroughColor = `${langPreamble}${projectBanner}${creativeBlockFull}${workOrder}
${roleLineFull}
[STACK] React18+TS+Vite+Tailwind3+lucide-react ./index.html+./src/**/*.{ts,tsx}. ${stackExtra}
[BIND] ${bindLine}
${namingBlock}
${buildStyleIndustryFitBlock(industry, style)}
${contentLayer}
${layoutLayer}
${heroShell}
${spaceLayer}
${surfaceLayer}
${moodExec}
${buildStyleLibraryBlock(style)}
${buildStyleTypeColorAuthority(style, fontVibe, colorVibe)}
${typoLayer}|vibe:${moodFont}|${(fontVibe.notes || "").slice(0, 140)}
${fontVarBlock}
${colorLayer}|tool:${colorVibe.label || colorVibe.labelZh}`;

      restAfterMotion = `${glassLine ? `${glassLine}\n` : ""}${blendLine ? `${blendLine}\n` : ""}${
        blindRollLine ? `${blindRollLine}\n` : ""
      }${designMdRefBlock}
${agencyGuardBlock}
${designMdBlock}
[L9_ASSETS] ${mediaSlots.replace(/^\[MEDIA_ASSETS\]\s*/, "")}
[GUARD] ${forbidden.join(" | ") || "no AI-slop blobs unless style demands"}
[QA] responsive sm/md/lg;video;CLS;focus-visible
${recLine}
${uiLang}`;
    }

    let body;
    if (splitPromptParts) {
      const defer = compactPrompt
        ? "Motion is in Part B — finish layout and tokens first.\n"
        : `[DEFER_MOTION] Part B (below) adds UI+BG motion—implement after layout, type, and color roles are stable.\n`;
      const partA = `${baseThroughColor}
${defer}${restAfterMotion}`;
      const motionRec = rec?.motionIds?.length ? `motionCandidates=${rec.motionIds.join("|")}` : "";
      const partBHead = compactPrompt
        ? `Part B — Motion\nBIND ${bindLine}`
        : `[PART_B_MOTION] Same [BIND] ${bindLine}. Add motion on top of existing layers (do not redesign layout here).`;
      const partBTail = compactPrompt
        ? `Motion guard: one primary scroll driver (UI xor BG); prefers-reduced-motion; match style energy.\n${motionRec ? `Catalog motion ids: ${motionRec}` : ""}`
        : `[GUARD_MOTION] Prefer gentle energy; playful/bold only where style energy fits. One primary scroll driver (UI xor BG). prefers-reduced-motion.
[QA_MOTION] No duplicate scrub drivers; CLS; focus-visible during transitions.
${motionRec ? `CATALOG_REC: ${motionRec}` : ""}`;
      const partB = `${partBHead}
${motionPack}
${partBTail}`;
      body = `${partA.trim()}${SPLIT_PROMPT_DELIM}${partB.trim()}`;
    } else {
      body = `${baseThroughColor}
${motionPack}
${restAfterMotion}`;
    }

    return clampPrompt(body.trim(), MAX_PROMPT_CHARS);
  }

  function applyStyleRecommendations(style) {
    if (!style) return;
    const r = style.recommendations;
    const fv = el("fontVibe");
    const cv = el("colorVibe");
    const pick = (sel, id) => {
      if (!id || !sel) return;
      if ([...sel.options].some((o) => o.value === id)) sel.value = id;
    };
    if (r) {
      if (fv && fv.value !== DEFAULT_VAL) pick(fv, r.fontVibeIds && r.fontVibeIds[0]);
      if (cv && cv.value !== DEFAULT_VAL) pick(cv, r.colorVibeIds && r.colorVibeIds[0]);
    }
    syncColorVibeSwatchPreview();
  }

  function init() {
    fillSelect(
      "platform",
      cat.platforms,
      (p) => p.id,
      (p) => p.labelEn || p.label
    );
    el("platform")?.addEventListener("change", () => {
      rebuildReactbitsSnippetList();
    });
    fillSelect(
      "industry",
      cat.industries,
      (i) => i.id,
      (i) => i.label
    );
    refillStyleSelect();
    el("industry").addEventListener("change", () => {
      refillStyleSelect();
      const sid = el("style").value;
      const st = cat.styles.find((s) => s.id === sid);
      if (st) applyStyleRecommendations(st);
      rebuildReactbitsSnippetList();
    });

    fillSelect("secondaryBlend", cat.styleBlends || [{ id: "none", label: "None" }], (b) => b.id, (b) => b.label);
    prependDefaultOption("secondaryBlend", "Default (random secondary blend)");
    el("secondaryBlend").value = "none";
    fillSelect("creativeVoice", CREATIVE_VOICE_OPTIONS, (o) => o.id, (o) => o.label);
    if (el("creativeVoice")) el("creativeVoice").value = "spec_first";
    fillSelect(
      "fontVibe",
      cat.fontVibes,
      (f) => f.id,
      (f) => f.pickerLabel || f.labelZh || f.label
    );
    prependDefaultOption("fontVibe", "Default (random font vibe)");
    if (cat.fontVibes[0]) el("fontVibe").value = cat.fontVibes[0].id;

    fillColorSelect();
    if (cat.colorVibes[0]) el("colorVibe").value = cat.colorVibes[0].id;
    syncColorVibeSwatchPreview();

    fillMotionVibeSelect();
    {
      const st0 = cat.styles.find((s) => s.id === el("style")?.value);
      if (st0) applyStyleRecommendations(st0);
    }

    el("style").addEventListener("change", () => {
      const st = cat.styles.find((s) => s.id === el("style").value);
      if (st) applyStyleRecommendations(st);
      rebuildReactbitsSnippetList();
    });
    const cvEl = el("colorVibe");
    if (cvEl) {
      cvEl.addEventListener("change", () => {
        syncColorVibeSwatchPreview();
      });
    }

    el("splitPromptParts")?.addEventListener("change", syncPromptOutputVisibility);
    syncPromptOutputVisibility();

    el("generate").addEventListener("click", () => {
      const platform = cat.platforms.find((p) => p.id === el("platform").value);
      const industry = cat.industries.find((i) => i.id === el("industry").value);
      const styleSel = el("style");
      const fontSel = el("fontVibe");
      const colorSel = el("colorVibe");
      const blendEl = el("secondaryBlend");

      const fontRoll = fontSel && fontSel.value === DEFAULT_VAL;
      const colorRoll = colorSel && colorSel.value === DEFAULT_VAL;
      const blendRoll = blendEl && blendEl.value === DEFAULT_VAL;

      const style = cat.styles.find((s) => s.id === styleSel?.value);
      const fontVibe = fontRoll ? pickRandom(cat.fontVibes) : cat.fontVibes.find((f) => f.id === fontSel?.value);
      const colorVibe = colorRoll ? pickRandom(cat.colorVibes) : cat.colorVibes.find((c) => c.id === colorSel?.value);
      const { motionEl, motionBg } = pickDefaultMotions(style, platform, industry);
      const motionVibeId = (el("motionVibe") && el("motionVibe").value) || MOTION_VIBE_AUTO_ID;

      let blend = { id: "none", hint: "" };
      if (blendEl && cat.styleBlends) {
        if (blendRoll) blend = pickRandom(cat.styleBlends) || blend;
        else blend = cat.styleBlends.find((b) => b.id === blendEl.value) || blend;
      }

      const stackProfile =
        (cat.stackProfiles && cat.stackProfiles.find((p) => p.id === "vite_default")) || { optionalLines: [] };
      const userNotes = el("userNotes").value;

      const blindBits = [];
      if (fontRoll) blindBits.push(`font→${fontVibe?.pickerLabel || fontVibe?.labelZh || fontVibe?.label || "?"}`);
      if (colorRoll) blindBits.push(`color→${colorVibe?.label || colorVibe?.labelZh || "?"}`);
      if (blendRoll) blindBits.push(`blend→${blend?.label || blend?.id || "?"}`);
      const blindRollLine = blindBits.length ? `[BLIND_ROLL] ${blindBits.join("; ")}` : "";

      const blindNote = el("blindBoxNote");
      if (blindNote) {
        blindNote.textContent = blindBits.length ? `Random picks this run: ${blindBits.join("; ")}` : "";
      }

      if (!platform || !industry || !style || !fontVibe || !colorVibe || !motionEl || !motionBg) {
        el("copyStatus").textContent = "Incomplete options: check deliverable, industry, motion, or reload the page.";
        return;
      }
      el("copyStatus").textContent = "";

      const splitOn = Boolean(el("splitPromptParts")?.checked);
      let text;
      try {
        text = buildPrompt({
          platform,
          industry,
          style,
          fontVibe,
          colorVibe,
          motionEl,
          motionBg,
          userNotes,
          blend,
          stackProfile,
          blindRollLine,
          includeDesignMd: Boolean(el("includeDesignMd")?.checked),
          splitPromptParts: splitOn,
          compactPrompt: Boolean(el("compactPrompt")?.checked),
          creativeVoice: (el("creativeVoice") && el("creativeVoice").value) || "spec_first",
          motionVibeId,
        });
      } catch (err) {
        console.error(err);
        el("copyStatus").textContent =
          "Could not build prompt (see browser console). Try reloading; if it persists, report this error.";
        return;
      }
      const outA = el("outputPartA");
      const outB = el("outputPartB");
      if (splitOn && outA && outB) {
        const i = text.indexOf(SPLIT_PROMPT_DELIM);
        if (i !== -1) {
          outA.value = text.slice(0, i).trim();
          outB.value = text.slice(i + SPLIT_PROMPT_DELIM.length).trim();
        } else {
          outA.value = text.trim();
          outB.value = "";
        }
        el("output").value = "";
      } else {
        el("output").value = text;
        if (outA) outA.value = "";
        if (outB) outB.value = "";
      }
      el("pexelsNote").textContent = `This run: ${text.length} / ${MAX_PROMPT_CHARS} characters`;
    });

    el("copy").addEventListener("click", async () => {
      const useSplit = Boolean(el("splitPromptParts")?.checked);
      const t = useSplit
        ? `${el("outputPartA")?.value || ""}${SPLIT_PROMPT_DELIM}${el("outputPartB")?.value || ""}`.trim()
        : el("output").value;
      try {
        await navigator.clipboard.writeText(t);
        el("copyStatus").textContent = useSplit ? "Copied full prompt (A + B)" : "Copied to clipboard";
        setTimeout(() => {
          el("copyStatus").textContent = "";
        }, 2000);
      } catch {
        el("copyStatus").textContent = "Copy failed — select the text manually";
      }
    });

    async function copyField(val, msg) {
      try {
        await navigator.clipboard.writeText(val);
        el("copyStatus").textContent = msg;
        setTimeout(() => {
          el("copyStatus").textContent = "";
        }, 2000);
      } catch {
        el("copyStatus").textContent = "Copy failed — select the text manually";
      }
    }
    el("copyPartA")?.addEventListener("click", () => copyField(el("outputPartA")?.value || "", "Copied Part A"));
    el("copyPartB")?.addEventListener("click", () => copyField(el("outputPartB")?.value || "", "Copied Part B"));

    initReactBits();
  }

  const MOTION_SNIPPET_MAX = 20000;

  const RB_CAT_EN = {
    Animations: "Animations",
    Animation: "Animation",
    Backgrounds: "Backgrounds",
    Components: "Components",
    TextAnimations: "Text",
  };

  const SNIPPET_BUCKET_ORDER = [
    { key: "elements", label: "Element animation (sections, UI motion)" },
    { key: "text_anim", label: "Text animation (kinetic type, headings)" },
    { key: "components", label: "Components (menus, cards, controls)" },
    { key: "backgrounds", label: "Background & special effects" },
    { key: "gsap_docs", label: "GSAP / ScrollTrigger (doc excerpts)" },
    { key: "anime_docs", label: "Anime.js (doc excerpts)" },
  ];

  function inferSnippetLibrary(s) {
    if (s.library) return s.library;
    const id = String(s.id || "").toLowerCase();
    if (id.startsWith("gsap-")) return "gsap";
    if (id.includes("anime")) return "animejs";
    return "reactbits";
  }

  /** React Bits folder from id when `category` missing (older bundles). */
  function inferReactbitsCategoryFromId(id) {
    const low = String(id || "").toLowerCase();
    if (low.startsWith("components-")) return "Components";
    if (low.startsWith("backgrounds-")) return "Backgrounds";
    if (low.startsWith("textanimations-")) return "TextAnimations";
    if (low.startsWith("animations-")) return "Animations";
    return null;
  }

  function snippetMotionBucket(s) {
    const lib = inferSnippetLibrary(s);
    if (lib === "reactbits") {
      const cat = s.category || inferReactbitsCategoryFromId(s.id);
      if (cat === "Components") return "components";
      if (cat === "Backgrounds") return "backgrounds";
      if (cat === "TextAnimations") return "text_anim";
      if (cat === "Animations") return "elements";
      return "elements";
    }
    if (lib === "gsap") return "gsap_docs";
    if (lib === "animejs") return "anime_docs";
    return "elements";
  }

  function motionKitRbCategory() {
    const styleSel = el("style");
    const plat = cat.platforms.find((p) => p.id === el("platform")?.value);
    const ind = cat.industries.find((i) => i.id === el("industry")?.value);
    const style = styleSel?.value ? cat.styles.find((s) => s.id === styleSel.value) : null;
    if (!style) return null;
    const { motionEl: kEl, motionBg: kBg } = pickDefaultMotions(style, plat, ind);
    const rb = (k) => (k?.id?.startsWith("RB-") ? k.rbCategory : null);
    return rb(kEl) || rb(kBg) || null;
  }

  function initReactBits() {
    const panel = el("reactbitsPanel");
    const sel = el("reactbitsSelect");
    const codeEl = el("reactbitsCode");
    const meta = el("reactbitsMeta");
    const motionBundle = window.__MOTION_SNIPPETS__;
    const fullList = motionBundle?.snippets;
    if (!panel || !sel || !codeEl || !meta) return;

    if (!Array.isArray(fullList) || fullList.length === 0) {
      sel.innerHTML = "";
      const o = document.createElement("option");
      o.value = "";
      o.textContent =
        "(Not loaded: place motion-snippets.bundle.js next to this page. Run: node fetch-reactbits.mjs && node fetch-motion-docs.mjs && npm run build.)";
      sel.appendChild(o);
      sel.disabled = true;
      codeEl.value = "";
      {
        const raw =
          (Array.isArray(motionBundle?.attributions) && motionBundle.attributions.length
            ? motionBundle.attributions.join(" · ")
            : motionBundle?.attribution) || "Motion snippet bundle not ready";
        meta.textContent = raw.length > 120 ? `${raw.slice(0, 118).trim()}…` : raw;
      }
      return;
    }

    function filteredSnippets() {
      const c = motionKitRbCategory();
      if (!c) return fullList;
      const rbOnly = fullList.filter((s) => {
        if (inferSnippetLibrary(s) !== "reactbits") return false;
        const cat = s.category || inferReactbitsCategoryFromId(s.id);
        return cat === c;
      });
      return rbOnly.length ? rbOnly : fullList;
    }

    function showSnippet(id) {
      const list = filteredSnippets();
      const s = list.find((x) => x.id === id) || list[0];
      if (!s) return;
      let code = s.code || "";
      if (code.length > MOTION_SNIPPET_MAX) {
        code = code.slice(0, MOTION_SNIPPET_MAX - 80) + "\n\n// [...truncated]\n";
      }
      codeEl.value = code;
      const catRb = motionKitRbCategory();
      const filterNote = catRb ? `React Bits only · ${RB_CAT_EN[catRb] || catRb}` : "All sources";
      const title = s.label || s.name;
      const bl = (cat.snippetBlurbs && cat.snippetBlurbs[s.id]) || "";
      meta.textContent = `${title}${bl ? ` — ${bl}` : ""} · ${code.length} / ${MOTION_SNIPPET_MAX} chars · ${filterNote}`;
    }

    function rebuildReactbitsOptions() {
      const list = filteredSnippets();
      const prev = sel.value;
      const narrowCat = motionKitRbCategory();
      const narrow = Boolean(narrowCat);
      sel.innerHTML = "";
      const blurbs = cat.snippetBlurbs || {};
      const labelFor = (s) => {
        const blurb = blurbs[s.id] || "";
        const baseName = (s.name || (s.label || "").split("·").pop() || "").trim();
        const suffix = blurb ? ` — ${blurb}` : "";
        const rbCat = s.category || inferReactbitsCategoryFromId(s.id) || "Animations";
        const catEn = RB_CAT_EN[rbCat] || rbCat;
        if (inferSnippetLibrary(s) === "reactbits") {
          return narrow ? `${baseName}${suffix}` : `${catEn} · ${baseName}${suffix}`;
        }
        return `${(s.label || baseName).trim()}${suffix}`;
      };
      const sortFn = (a, b) =>
        (a.label || a.name || "").localeCompare(b.label || b.name || "", "en", { sensitivity: "base" });

      if (narrow) {
        const og = document.createElement("optgroup");
        og.label = `React Bits — ${RB_CAT_EN[narrowCat] || narrowCat} (matches your motion pick)`;
        const items = list.slice().sort(sortFn);
        for (const s of items) {
          const o = document.createElement("option");
          o.value = s.id;
          o.textContent = labelFor(s);
          const bn = (s.name || (s.label || "").split("·").pop() || "").trim();
          const bl = blurbs[s.id];
          o.title = bl ? `${bn}: ${bl}` : s.label || bn;
          og.appendChild(o);
        }
        sel.appendChild(og);
      } else {
        const buckets = { elements: [], text_anim: [], components: [], backgrounds: [], gsap_docs: [], anime_docs: [] };
        for (const s of list) {
          const k = snippetMotionBucket(s);
          if (!buckets[k]) buckets.elements.push(s);
          else buckets[k].push(s);
        }
        for (const { key, label } of SNIPPET_BUCKET_ORDER) {
          const items = (buckets[key] || []).slice().sort(sortFn);
          if (!items.length) continue;
          const og = document.createElement("optgroup");
          og.label = label;
          for (const s of items) {
            const o = document.createElement("option");
            o.value = s.id;
            o.textContent = labelFor(s);
            const bn = (s.name || (s.label || "").split("·").pop() || "").trim();
            const bl = blurbs[s.id];
            o.title = bl ? `${bn}: ${bl}` : s.label || bn;
            og.appendChild(o);
          }
          sel.appendChild(og);
        }
      }
      if ([...sel.options].some((o) => o.value === prev)) sel.value = prev;
      else if (sel.options[0]) sel.value = sel.options[0].value;
      showSnippet(sel.value);
    }

    sel.disabled = false;
    sel.addEventListener("change", () => showSnippet(sel.value));
    const platEl = el("platform");
    if (platEl) platEl.addEventListener("change", rebuildReactbitsOptions);
    el("style")?.addEventListener("change", rebuildReactbitsOptions);
    rebuildReactbitsSnippetList = rebuildReactbitsOptions;
    rebuildReactbitsOptions();

    el("copyReactbits").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeEl.value);
        el("reactbitsCopyStatus").textContent = "Code copied";
        setTimeout(() => {
          el("reactbitsCopyStatus").textContent = "";
        }, 2000);
      } catch {
        el("reactbitsCopyStatus").textContent = "Copy failed — select all and copy manually";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
