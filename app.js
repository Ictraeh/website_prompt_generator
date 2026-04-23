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
    const groups = cat.motionKitGroups || [{ id: "site", label: "动效" }];
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
    def.textContent = "默认（随机色彩气质）";
    s.appendChild(def);
    const groups = cat.colorVibeGroups || [{ id: "default", label: "色彩气质" }];
    for (const g of groups) {
      const items = cat.colorVibes.filter((c) => (c.group || "classic_vibes") === g.id);
      if (!items.length) continue;
      const og = document.createElement("optgroup");
      og.label = g.label;
      for (const c of items) {
        const o = document.createElement("option");
        o.value = c.id;
        o.textContent = c.labelZh || c.label;
        const ex = (c.explainerZh || "").trim();
        if (ex) o.title = ex;
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
      p.textContent = "选择「默认」后，每次点击「生成 Prompt」会随机抽一项色彩气质。";
      return;
    }
    const c = cat.colorVibes.find((x) => x.id === sel.value);
    p.textContent = c?.explainerZh || "";
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
      ? `React Bits「${motion.rbCategory || "snippet"}」: 在表单下方「动效代码」区选同分类 TSX；MIT；与整站 M-kit 轻量叠加；尊重 prefers-reduced-motion 与 §3.2 性能。`
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
        ? "【说明】以下为英文实现规格（spec-first §3.2）；界面文案可写中文占位。\n"
        : "";

    const uiLang =
      outputLang === "zh"
        ? "UI strings: Simplified Chinese where listing literals."
        : "UI strings: English.";

    const pairingRef =
      fontVibe.pairingRecipeId != null
        ? `§5.1_recipe_${fontVibe.pairingRecipeId}`
        : "§5.1_custom";

    const colorAlign = colorVibe.styleLibraryAlign ? `align:${colorVibe.styleLibraryAlign}` : "";
    const colorIntent = (colorVibe.explainerZh || "")
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
[FONTS] tool:${fontVibe.labelZh}|${pairingRef}|roles display=${fontVibe.display} body=${fontVibe.body}${fontVibe.mono ? " mono=" + fontVibe.mono : ""}|moodTags:${moodFont}|${fontVibe.notes}|libraryPair:${style.fontPairingHint}
[COLOR] tool:${colorVibe.labelZh}|huemint:${hueRef}|${colorAlign}|cohesion:${colorIntent}|css:${colorVibe.cssHint}|libraryPalette:${style.colorSystemHint}
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
      (p) => `${p.label} — ${p.labelEn}`
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
    prependDefaultOption("style", "默认（随机主风格）");
    if (cat.styles[0]) el("style").value = cat.styles[0].id;

    fillSelect("secondaryBlend", cat.styleBlends || [{ id: "none", label: "无" }], (b) => b.id, (b) => b.label);
    prependDefaultOption("secondaryBlend", "默认（随机次要混合）");
    el("secondaryBlend").value = "none";
    fillSelect(
      "stackProfile",
      cat.stackProfiles || [{ id: "vite_default", label: "默认 Vite" }],
      (p) => p.id,
      (p) => p.label
    );
    fillSelect(
      "fontVibe",
      cat.fontVibes,
      (f) => f.id,
      (f) => `${f.labelZh || ""} — ${f.label}`.replace(/^ — /, "")
    );
    prependDefaultOption("fontVibe", "默认（随机字体气质）");
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
      ["en", "英文主体（推荐）"],
      ["zh", "中英混合"],
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
      if (styleRoll) blindBits.push(`主风格→${style?.name || "?"}`);
      if (fontRoll) blindBits.push(`字体→${fontVibe?.labelZh || fontVibe?.label || "?"}`);
      if (colorRoll) blindBits.push(`色彩→${colorVibe?.labelZh || colorVibe?.label || "?"}`);
      if (blendRoll) blindBits.push(`次要混合→${blend?.label || blend?.id || "?"}`);
      const blindRollLine = blindBits.length ? `[BLIND_ROLL] ${blindBits.join("；")}` : "";

      const blindNote = el("blindBoxNote");
      if (blindNote) {
        blindNote.textContent = blindBits.length ? `本次盲盒：${blindBits.join("；")}` : "";
      }

      if (!platform || !industry || !style || !fontVibe || !colorVibe || !motion) {
        el("copyStatus").textContent = "选项不完整：请检查交付形态、行业、动效，或重新加载页面。";
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
      el("pexelsNote").textContent = `本次 ${text.length} / ${MAX_PROMPT_CHARS} 字符`;
    });

    el("copy").addEventListener("click", async () => {
      const t = el("output").value;
      try {
        await navigator.clipboard.writeText(t);
        el("copyStatus").textContent = "已复制到剪贴板";
        setTimeout(() => {
          el("copyStatus").textContent = "";
        }, 2000);
      } catch {
        el("copyStatus").textContent = "复制失败，请手动选择文本";
      }
    });

    initReactBits();
  }

  const MOTION_SNIPPET_MAX = 20000;

  const RB_CAT_ZH = {
    Animations: "动画",
    Backgrounds: "背景",
    Components: "组件",
    TextAnimations: "文字",
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
        "（未加载：同目录需 motion-snippets.bundle.js；终端执行 node fetch-reactbits.mjs、node fetch-motion-docs.mjs 与 node build-catalog.mjs）";
      sel.appendChild(o);
      sel.disabled = true;
      codeEl.value = "";
      {
        const raw =
          (Array.isArray(motionBundle?.attributions) && motionBundle.attributions.length
            ? motionBundle.attributions.join(" · ")
            : motionBundle?.attribution) || "动效代码 bundle 未就绪";
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
      const filterNote = catRb ? `仅 React Bits · ${catRb}` : "全部来源";
      const title = s.label || s.name;
      meta.textContent = `${title} · ${code.length} / ${MOTION_SNIPPET_MAX} 字 · ${filterNote}`;
    }

    function rebuildReactbitsOptions() {
      const list = filteredSnippets();
      const prev = sel.value;
      const narrow = Boolean(motionKitRbCategory());
      sel.innerHTML = "";
      list.forEach((s) => {
        const o = document.createElement("option");
        o.value = s.id;
        const zh = RB_CAT_ZH[s.category] || s.category;
        if (s.library === "reactbits") {
          o.textContent = narrow ? s.name : `${zh} · ${s.name}`;
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
        el("reactbitsCopyStatus").textContent = "已复制动效代码";
        setTimeout(() => {
          el("reactbitsCopyStatus").textContent = "";
        }, 2000);
      } catch {
        el("reactbitsCopyStatus").textContent = "复制失败，请手动全选复制";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
