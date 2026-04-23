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
    } = opts;

    const sections = sectionPlan(platform, industry.label);
    const l4Short = L4_HINTS[style.layoutArchetype] || style.layoutArchetype;
    const l4Doc = (cat.l4Blueprint && (cat.l4Blueprint[style.layoutArchetype] || cat.l4Blueprint.L4_DEFAULT)) || "";
    const sectionLine = sections.join(" → ");
    const kw = style.triggerKeywords.join(", ");
    const notesShort = (userNotes.trim() || "—").slice(0, 320);

    const mediaSlots = `MEDIA_SLOTS <HERO_VIDEO> <SECTION_2_VIDEO> <CARD_THUMB_*> — rules: muted loop playsInline object-cover; scrim stops in %; example fill: ${style.pexels.heroVideo}`;

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

    const rec = style.recommendations;
    const recLine = rec
      ? `CATALOG_REC: fontCandidates=${rec.fontVibeIds.join("|")} colorCandidates=${rec.colorVibeIds.join("|")} motionCandidates=${rec.motionIds.join("|")}`
      : "";

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
    const body = `${langPreamble}[ROLE] Senior FE — compact spec ≤${MAX_PROMPT_CHARS}ch. Name files when critical: index.html, src/index.css, tailwind.config.ts. Exact Tailwind for nav/hero; placeholders <BRAND><HEADLINE><SUBHEAD><PRIMARY_HSL>.
[STACK] React18+TS+Vite+Tailwind3+lucide-react content ./index.html+./src/**/*.{ts,tsx}. ${stackExtra}
[BIND] ${platform.labelEn}|${industry.label}|style#${style.libraryNumber} ${style.name}|notes:${notesShort}
${blindRollLine ? `${blindRollLine}\n` : ""}[LIB_MOOD] ${style.libraryMood} | [LIB_LAYOUT] ${style.libraryLayout}
${blendLine}
[L4] ${style.layoutArchetype}: ${l4Short} | DOC: ${(l4Doc || "").slice(0, 360)}
[TAGS] ${style.skillTags.join(",")}
[SPACING] §6 ladder px-4 sm:px-6 md:px-12 lg:px-16; sections py-16 md:py-28; nav gap-6–8; grids gap-6–8
${glassLine}
[FONTS] tool:${fontVibe.pickerLabel || fontVibe.labelZh || fontVibe.label}|${pairingRef}|roles display=${fontVibe.display} body=${fontVibe.body}${fontVibe.mono ? " mono=" + fontVibe.mono : ""}|moodTags:${moodFont}|${fontVibe.notes}|libraryPair:${style.fontPairingHint}
[COLOR] tool:${colorVibe.label || colorVibe.labelZh}|huemint:${hueRef}|${colorAlign}|cohesion:${colorIntent}|css:${colorVibe.cssHint}|libraryPalette:${style.colorSystemHint}
[MOTION_KIT] ${motion.id}: ${motion.detail} | ${motionLib}
[HERO] infer ${style.skillTags.join(",")} → center|bottom|split; CTA:${style.id === "neo-brutalism" ? "neo-brutal shadow/border" : "solid+outline/glass+lift"}
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
