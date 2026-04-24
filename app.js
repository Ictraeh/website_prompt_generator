/* global window, document */
(function () {
  const cat = window.__VIBE_CATALOG__;
  if (!cat) {
    console.error("Missing window.__VIBE_CATALOG__ — load catalog.bundle.js first");
    return;
  }

  /** Hard cap: output must stay under 5000 characters (inclusive limit 4999). */
  const MAX_PROMPT_CHARS = 4999;

  /** Sentinel value for "random blind pick" on supported selects. */
  const DEFAULT_VAL = "__default__";

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

  function fillMotionSelect() {
    const s = el("motion");
    if (!s || !cat.motionKits) return;
    s.innerHTML = "";
    const groups = cat.motionKitGroups || [{ id: "site", label: "Motion" }];
    for (const g of groups) {
      const items = cat.motionKits.filter((k) => (k.group || "site") === g.id);
      if (!items.length) continue;
      const og = document.createElement("optgroup");
      og.label = g.label;
      for (const k of items) {
        const o = document.createElement("option");
        o.value = k.id;
        o.textContent = k.label;
        og.appendChild(o);
      }
      s.appendChild(og);
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
        o.textContent = c.label || c.labelZh;
        const ex = [c.styleLibraryAlign, c.cssHint].filter(Boolean).join(" — ").trim();
        if (ex) o.title = ex.slice(0, 280);
        og.appendChild(o);
      }
      s.appendChild(og);
    }
  }

  function syncColorVibeExplainer() {
    const p = el("colorVibeExplainer");
    if (!p || !cat.colorVibes) return;
    const sel = el("colorVibe");
    if (!sel) return;
    if (sel.value === DEFAULT_VAL) {
      p.textContent = 'With “Default” selected, each “Generate prompt” picks a random color vibe.';
      return;
    }
    const c = cat.colorVibes.find((x) => x.id === sel.value);
    p.textContent = [c?.label, c?.styleLibraryAlign].filter(Boolean).join(" — ") || "";
  }

  /** https://github.com/Ictraeh/design.md + Stitch DESIGN.md — compact (4999 cap). */
  function buildDesignMdClause() {
    const stitch = (cat.designMdMeta && cat.designMdMeta.stitchFormatUrl) || "https://stitch.withgoogle.com/docs/design-md/format/";
    return (
      "[DESIGN_MD] Ship ./DESIGN.md per https://github.com/Ictraeh/design.md + Stitch " +
      stitch +
      " — YAML: colors #hex, typography roles, rounded, spacing, components.*. Body: Overview→Colors→Typography→Layout→Elevation→Shapes→Components→Do's. " +
      "Align with [FONTS]/[COLOR]/[DESIGN_MD_REFS]. Optional: npx @google/design.md lint|export.\n"
    );
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
    return `[AGENCY_BAR] Bold+clean+contemporary studio bar: decisive type ramp, strict grid + airy whitespace, one disciplined accent, photography with clear focal depth. Layout diversity is mandatory—${style.layoutArchetype} sets the spine; vary section compositions (split, bento, editorial band, asymmetric grid, logo rail, FAQ) vs generic "hero + 3 same cards" unless L4.6 card-wall. Copy must sound specific to ${industry.label}. [QUALITY_GUARDS] Ban: grey-mush contrast, hollow lorem-as-marketing, untokenized rainbow gradients, handshake/cityscape stock clichés, duplicate identical card chrome >2×, decorative blobs with no narrative job, type-scale chaos. Enforce: WCAG AA on media (scrim), tokens in DESIGN.md, motion only per MOTION blocks.`;
  }

  function hashMod(str, mod) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return mod ? Math.abs(h) % mod : Math.abs(h);
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

  function buildMotionSnippetsBlock(style, motion, motionLib) {
    const mood = (style.libraryMood || "").slice(0, 140);
    return `[MOTION_SNIPPETS] Map intensity to mood: "${mood}". React Bits (reactbits.dev): name 2+ modules to import (e.g. Aurora/Silk/Galaxy for hero atmosphere; TextType/DecryptedText/AnimatedList for kinetic copy or lists) and file them under src/components/reactbits/*. anime.js (animejs.com): import from 'animejs' — stagger letters in hero H1, timeline section reveals (opacity+translateY), optional scroll observers for editorial blocks. ${motionLib} Hero: headline stagger + subtle bg drift; sections: card/list stagger + 1 icon micro-motion; nav: short blur/height transition only; respect prefers-reduced-motion.`;
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
      motion,
      userNotes,
      outputLang,
      blend,
      stackProfile,
      blindRollLine = "",
      includeDesignMd = true,
    } = opts;

    const sections = sectionPlan(platform, industry.label);
    const l4Short = L4_HINTS[style.layoutArchetype] || style.layoutArchetype;
    const l4Doc = (cat.l4Blueprint && (cat.l4Blueprint[style.layoutArchetype] || cat.l4Blueprint.L4_DEFAULT)) || "";
    const sectionLine = sections.join(" → ");
    const notesShort = (userNotes.trim() || "—").slice(0, 320);

    const rec = style.recommendations;
    const recLine = rec
      ? `CATALOG_REC: fontCandidates=${rec.fontVibeIds.join("|")} colorCandidates=${rec.colorVibeIds.join("|")} motionCandidates=${rec.motionIds.join("|")}`
      : "";

    const namingBlock = buildNamingBlock(style, industry);
    const designMdRefBlock = buildDesignMdRefBlock(style, industry);
    const agencyGuardBlock = buildAgencyGuardBlock(style, industry);
    const fontVarBlock = buildFontVariationBlock(style, fontVibe, rec);
    const mediaSlots = buildRichMediaSlots(style);

    const forbidden = [];
    if (colorVibe.id === "dark_cinematic") forbidden.push("no random purple/indigo unless tokenized");
    if (style.skillTags.includes("video-bg")) {
      forbidden.push("text contrast via scrim/text-shadow unless spec forbids overlay on video");
    }

    const motionLib = motion.id.startsWith("RB-")
      ? `React Bits (${motion.rbCategory || "snippet"}): pick matching TSX in the Motion code panel; MIT; layer lightly with site M-kits; honor prefers-reduced-motion and §3.2 perf.`
      : ["M-scroll-text-reveal", "M-scroll-scrub-video", "M-spline-bg", "M-slide-deck"].includes(motion.id)
        ? "Prefer motion/react or GSAP per complexity; never hand-roll where spec demands library."
        : motion.id === "minimal"
          ? "Hover-only micro; respect prefers-reduced-motion."
          : "CSS keyframes acceptable; upgrade to motion/react if orchestration grows.";

    const stackExtra = (stackProfile && stackProfile.optionalLines && stackProfile.optionalLines.join(" ")) || "";
    const blendLine =
      blend && blend.id !== "none" && blend.hint ? `SECONDARY_BLEND(${blend.id}): ${blend.hint}` : "";

    const glassLine = style.skillTags.includes("glass-nav")
      ? "GLASS: reusable .liquid-glass per §7.1 (luminosity blend, blur(4px), inset highlight, ::before 1.4px gradient mask ring); apply <GLASS_TINT> rgba to nav/CTAs/cards."
      : "";

    const motionSnippetsBlock = buildMotionSnippetsBlock(style, motion, motionLib);

    const langPreamble =
      outputLang === "zh"
        ? "[NOTE] Spec-first English implementation (§3.2); UI literals may use Simplified Chinese where listing copy.\n"
        : "";

    const uiLang =
      outputLang === "zh"
        ? "UI strings: Simplified Chinese where listing literals is required."
        : "UI strings: English.";

    const pairingRef =
      fontVibe.pairingRecipeId != null
        ? `§5.1_recipe_${fontVibe.pairingRecipeId}`
        : "§5.1_custom";

    const colorAlign = colorVibe.styleLibraryAlign ? `align:${colorVibe.styleLibraryAlign}` : "";
    const colorIntent = [colorVibe.styleLibraryAlign, colorVibe.cssHint]
      .filter(Boolean)
      .join(" | ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 200);
    const hueRef = colorVibe.huemintRef || "palette";

    const moodFont = (fontVibe.moodTags || []).join("/");
    const designMdBlock = includeDesignMd ? buildDesignMdClause() : "";
    const body = `${langPreamble}[ROLE] Senior FE — compact spec ≤${MAX_PROMPT_CHARS}ch. Name files when critical: index.html, src/index.css, tailwind.config.ts. Exact Tailwind for nav/hero; placeholders <BRAND><HEADLINE><SUBHEAD><PRIMARY_HSL>.
[STACK] React18+TS+Vite+Tailwind3+lucide-react content ./index.html+./src/**/*.{ts,tsx}. ${stackExtra}
[BIND] ${platform.labelEn}|${industry.label}|style#${style.libraryNumber} ${style.name}|notes:${notesShort}
${namingBlock}
${designMdRefBlock}
${agencyGuardBlock}
${blindRollLine ? `${blindRollLine}\n` : ""}[LIB_MOOD] ${style.libraryMood} | [LIB_LAYOUT] ${style.libraryLayout}
${blendLine}
[L4] ${style.layoutArchetype}: ${l4Short} | DOC: ${(l4Doc || "").slice(0, 360)}
[TAGS] ${style.skillTags.join(",")}
[SPACING] §6 ladder px-4 sm:px-6 md:px-12 lg:px-16; sections py-16 md:py-28; nav gap-6–8; grids gap-6–8
${glassLine}
[FONTS] tool:${fontVibe.pickerLabel || fontVibe.labelZh || fontVibe.label}|${pairingRef}|roles display=${fontVibe.display} body=${fontVibe.body}${fontVibe.mono ? " mono=" + fontVibe.mono : ""}|moodTags:${moodFont}|${fontVibe.notes}|libraryPair:${style.fontPairingHint}
${fontVarBlock}
[COLOR] tool:${colorVibe.label || colorVibe.labelZh}|huemint:${hueRef}|${colorAlign}|cohesion:${colorIntent}|css:${colorVibe.cssHint}|libraryPalette:${style.colorSystemHint}
[MOTION_KIT] ${motion.id}: ${motion.detail} | ${motionLib}
${motionSnippetsBlock}
${designMdBlock}[HERO] infer ${style.skillTags.join(",")} → center|bottom|split; CTA:${style.id === "neo-brutalism" ? "neo-brutal shadow/border" : "solid+outline/glass+lift"}
[SECTIONS] ${sectionLine}
${mediaSlots}
[GUARD] ${forbidden.join(" | ") || "no AI-slop blobs unless style demands"}
[QA] responsive sm/md/lg; video policy; CLS reserve; focus-visible
${recLine}
${uiLang}`;

    return clampPrompt(body.trim(), MAX_PROMPT_CHARS);
  }

  function applyStyleRecommendations(style) {
    const cb = el("autoRecommend");
    if (!cb || !cb.checked || !style?.recommendations) return;
    const r = style.recommendations;
    const fv = el("fontVibe");
    const cv = el("colorVibe");
    const mv = el("motion");
    const pick = (sel, id) => {
      if (!id || !sel) return;
      if ([...sel.options].some((o) => o.value === id)) sel.value = id;
    };
    if (fv && fv.value !== DEFAULT_VAL) pick(fv, r.fontVibeIds && r.fontVibeIds[0]);
    if (cv && cv.value !== DEFAULT_VAL) pick(cv, r.colorVibeIds && r.colorVibeIds[0]);
    if (mv && mv.value !== DEFAULT_VAL) pick(mv, r.motionIds && r.motionIds[0]);
  }

  function init() {
    fillSelect(
      "platform",
      cat.platforms,
      (p) => p.id,
      (p) => p.labelEn || p.label
    );
    fillSelect(
      "industry",
      cat.industries,
      (i) => i.id,
      (i) => i.label
    );
    fillSelect(
      "style",
      cat.styles,
      (s) => s.id,
      (s) => `${s.name} — ${s.userBlurb || s.libraryMood}`
    );
    prependDefaultOption("style", "Default (random primary style)");
    if (cat.styles[0]) el("style").value = cat.styles[0].id;

    fillSelect("secondaryBlend", cat.styleBlends || [{ id: "none", label: "None" }], (b) => b.id, (b) => b.label);
    prependDefaultOption("secondaryBlend", "Default (random secondary blend)");
    el("secondaryBlend").value = "none";
    fillSelect(
      "stackProfile",
      cat.stackProfiles || [{ id: "vite_default", label: "Default: Vite + React 18 + TS + Tailwind" }],
      (p) => p.id,
      (p) => p.label
    );
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

    fillMotionSelect();

    el("style").addEventListener("change", () => {
      const sid = el("style").value;
      syncColorVibeExplainer();
      if (sid === DEFAULT_VAL) return;
      const st = cat.styles.find((s) => s.id === sid);
      if (st) applyStyleRecommendations(st);
    });
    const cvEl = el("colorVibe");
    if (cvEl) cvEl.addEventListener("change", syncColorVibeExplainer);
    const firstStyle = cat.styles[0];
    if (firstStyle) applyStyleRecommendations(firstStyle);
    syncColorVibeExplainer();

    const outLang = el("outputLang");
    outLang.innerHTML = "";
    [
      ["en", "English prompt body (recommended)"],
      ["zh", "English spec + CN UI literals where needed"],
    ].forEach(([v, t]) => {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = t;
      outLang.appendChild(o);
    });

    el("generate").addEventListener("click", () => {
      const platform = cat.platforms.find((p) => p.id === el("platform").value);
      const industry = cat.industries.find((i) => i.id === el("industry").value);
      const styleSel = el("style");
      const fontSel = el("fontVibe");
      const colorSel = el("colorVibe");
      const blendEl = el("secondaryBlend");
      const stackEl = el("stackProfile");

      const styleRoll = styleSel && styleSel.value === DEFAULT_VAL;
      const fontRoll = fontSel && fontSel.value === DEFAULT_VAL;
      const colorRoll = colorSel && colorSel.value === DEFAULT_VAL;
      const blendRoll = blendEl && blendEl.value === DEFAULT_VAL;

      const style = styleRoll ? pickRandom(cat.styles) : cat.styles.find((s) => s.id === styleSel?.value);
      const fontVibe = fontRoll ? pickRandom(cat.fontVibes) : cat.fontVibes.find((f) => f.id === fontSel?.value);
      const colorVibe = colorRoll ? pickRandom(cat.colorVibes) : cat.colorVibes.find((c) => c.id === colorSel?.value);
      const motion = cat.motionKits.find((m) => m.id === el("motion").value);

      let blend = { id: "none", hint: "" };
      if (blendEl && cat.styleBlends) {
        if (blendRoll) blend = pickRandom(cat.styleBlends) || blend;
        else blend = cat.styleBlends.find((b) => b.id === blendEl.value) || blend;
      }

      const stackProfile =
        stackEl && cat.stackProfiles
          ? cat.stackProfiles.find((p) => p.id === stackEl.value) || { optionalLines: [] }
          : { optionalLines: [] };
      const userNotes = el("userNotes").value;
      const outputLang = el("outputLang").value;

      const blindBits = [];
      if (styleRoll) blindBits.push(`style→${style?.name || "?"}`);
      if (fontRoll) blindBits.push(`font→${fontVibe?.pickerLabel || fontVibe?.labelZh || fontVibe?.label || "?"}`);
      if (colorRoll) blindBits.push(`color→${colorVibe?.label || colorVibe?.labelZh || "?"}`);
      if (blendRoll) blindBits.push(`blend→${blend?.label || blend?.id || "?"}`);
      const blindRollLine = blindBits.length ? `[BLIND_ROLL] ${blindBits.join("; ")}` : "";

      const blindNote = el("blindBoxNote");
      if (blindNote) {
        blindNote.textContent = blindBits.length ? `Random picks this run: ${blindBits.join("; ")}` : "";
      }

      if (!platform || !industry || !style || !fontVibe || !colorVibe || !motion) {
        el("copyStatus").textContent = "Incomplete options: check deliverable, industry, motion, or reload the page.";
        return;
      }
      el("copyStatus").textContent = "";

      const text = buildPrompt({
        platform,
        industry,
        style,
        fontVibe,
        colorVibe,
        motion,
        userNotes,
        outputLang,
        blend,
        stackProfile,
        blindRollLine,
        includeDesignMd: Boolean(el("includeDesignMd")?.checked),
      });
      el("output").value = text;
      el("pexelsNote").textContent = `This run: ${text.length} / ${MAX_PROMPT_CHARS} characters`;
    });

    el("copy").addEventListener("click", async () => {
      const t = el("output").value;
      try {
        await navigator.clipboard.writeText(t);
        el("copyStatus").textContent = "Copied to clipboard";
        setTimeout(() => {
          el("copyStatus").textContent = "";
        }, 2000);
      } catch {
        el("copyStatus").textContent = "Copy failed — select the text manually";
      }
    });

    initReactBits();
  }

  const MOTION_SNIPPET_MAX = 20000;

  const RB_CAT_EN = {
    Animations: "Animations",
    Backgrounds: "Backgrounds",
    Components: "Components",
    TextAnimations: "Text",
  };

  function motionKitRbCategory() {
    const mid = el("motion")?.value;
    const kit = cat.motionKits?.find((m) => m.id === mid);
    return kit?.rbCategory || null;
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
      const rbOnly = fullList.filter((s) => s.library === "reactbits" && s.category === c);
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
      const filterNote = catRb ? `React Bits only · ${catRb}` : "All sources";
      const title = s.label || s.name;
      meta.textContent = `${title} · ${code.length} / ${MOTION_SNIPPET_MAX} chars · ${filterNote}`;
    }

    function rebuildReactbitsOptions() {
      const list = filteredSnippets();
      const prev = sel.value;
      const narrow = Boolean(motionKitRbCategory());
      sel.innerHTML = "";
      list.forEach((s) => {
        const o = document.createElement("option");
        o.value = s.id;
        const catEn = RB_CAT_EN[s.category] || s.category;
        if (s.library === "reactbits") {
          o.textContent = narrow ? s.name : `${catEn} · ${s.name}`;
        } else {
          o.textContent = s.label || s.name;
        }
        sel.appendChild(o);
      });
      if ([...sel.options].some((o) => o.value === prev)) sel.value = prev;
      else if (sel.options[0]) sel.value = sel.options[0].value;
      showSnippet(sel.value);
    }

    sel.disabled = false;
    sel.addEventListener("change", () => showSnippet(sel.value));
    const motionEl = el("motion");
    if (motionEl) motionEl.addEventListener("change", rebuildReactbitsOptions);
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
