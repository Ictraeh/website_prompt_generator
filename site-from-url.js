/* global window, document */
(function () {
  const MAX_PROMPT = 4999;

  function el(id) {
    return document.getElementById(id);
  }

  function clamp(s, max) {
    if (s.length <= max) return s;
    const tail = "\n…[truncated]";
    return s.slice(0, max - tail.length).trimEnd() + tail;
  }

  function resolveUrl(href, base) {
    if (!href || !base) return href || "";
    try {
      return new URL(href, base).href;
    } catch {
      return href;
    }
  }

  function unique(arr) {
    return [...new Set(arr.filter(Boolean))];
  }

  function extractHexColors(html) {
    const m = html.match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g) || [];
    return unique(m).slice(0, 18);
  }

  function topClassTokens(doc, limit) {
    const counts = new Map();
    doc.querySelectorAll("[class]").forEach((node) => {
      const c = node.getAttribute("class");
      if (!c) return;
      c.split(/\s+/).forEach((t) => {
        if (t.length < 2 || t.length > 48) return;
        counts.set(t, (counts.get(t) || 0) + 1);
      });
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([t, n]) => `${t}×${n}`);
  }

  function analyzeHtml(htmlString, baseUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const title = doc.title?.trim() || "(no title)";
    const metaDesc =
      doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim().slice(0, 400) || "";
    const themeColor = doc.querySelector('meta[name="theme-color"]')?.getAttribute("content")?.trim() || "";

    const stylesheets = unique(
      [...doc.querySelectorAll('link[rel="stylesheet"][href]')].map((l) => resolveUrl(l.getAttribute("href"), baseUrl))
    ).slice(0, 24);

    const preloads = unique(
      [...doc.querySelectorAll("link[rel=preload][href]")].map((l) => ({
        as: l.getAttribute("as") || "",
        href: resolveUrl(l.getAttribute("href"), baseUrl),
      }))
    ).slice(0, 16);

    const scripts = unique(
      [...doc.querySelectorAll("script[src]")].map((s) => resolveUrl(s.getAttribute("src"), baseUrl))
    ).slice(0, 20);

    const inlineStyles = [...doc.querySelectorAll("style")]
      .map((s) => s.textContent || "")
      .join("\n")
      .slice(0, 2400);

    const body = doc.body;
    const bodyClass = body?.getAttribute("class")?.trim().slice(0, 400) || "";
    const bodyId = body?.getAttribute("id")?.trim() || "";

    const headings = [];
    doc.querySelectorAll("h1,h2").forEach((h) => {
      const t = (h.textContent || "").replace(/\s+/g, " ").trim();
      if (t && headings.length < 12) headings.push(`${h.tagName.toLowerCase()}: ${t.slice(0, 140)}`);
    });

    const imgs = [...doc.querySelectorAll("img[src]")].slice(0, 40);
    const imgCount = doc.querySelectorAll("img").length;
    const imgSamples = imgs.slice(0, 6).map((img) => ({
      alt: (img.getAttribute("alt") || "").slice(0, 80),
      src: resolveUrl(img.getAttribute("src"), baseUrl).slice(0, 200),
    }));

    const videos = unique(
      [...doc.querySelectorAll("video source[src], video[src]")].map((v) =>
        resolveUrl(v.getAttribute("src"), baseUrl)
      )
    ).slice(0, 8);

    const hasNav = !!doc.querySelector("nav, [role=navigation], header nav");
    const hasFooter = !!doc.querySelector("footer, [role=contentinfo]");
    const mainLandmarks = !!doc.querySelector("main, [role=main]");

    const fontLinks = stylesheets.filter((u) => /fonts\.googleapis|gstatic\.com\/fonts/i.test(u));
    const colors = extractHexColors(htmlString);

    const classHints = topClassTokens(doc, 22);

    return {
      title,
      metaDesc,
      themeColor,
      stylesheets,
      preloads,
      scripts,
      inlineStyles,
      bodyClass,
      bodyId,
      headings,
      imgCount,
      imgSamples,
      videos,
      hasNav,
      hasFooter,
      mainLandmarks,
      fontLinks,
      colors,
      classHints,
    };
  }

  function buildClonePrompt(analysis, sourceUrl, finalUrl) {
    const canonical = finalUrl || sourceUrl;
    const lines = [
      "[L0_EXEC_ORDER] (1)Section tree comments (2)tailwind.config+semantic CSS vars (3)App+Section*.tsx (4)motion+prefers-reduced-motion (5)DESIGN.md tokens. Implement;avoid meta-only narration.",
      "[ROLE] Senior FE — reverse-engineer a **new** site **inspired by** the reference layout/typography/motion grammar. Do not copy proprietary assets, logos, or licensed copy; recreate structure with original content and royalty-free media placeholders.",
      "[NAMING] Invent a fresh fictitious <BRAND> tied to the vertical implied by headings/copy — avoid lazy luxury defaults: do NOT use \"Maison …\", \"L'Atelier …\", \"House of …\" unless the reference is explicitly that niche.",
      `[SOURCE_URL] ${canonical}`,
      "[STACK] React 18 + TypeScript + Vite + Tailwind CSS 3 + lucide-react. Content globs: ./index.html + ./src/**/*.{ts,tsx}. Optional: shadcn/ui, motion/react, GSAP+ScrollTrigger if scroll choreography is implied.",
      `[PAGE_TITLE] ${analysis.title}`,
      analysis.metaDesc ? `[META_DESCRIPTION] ${analysis.metaDesc}` : "",
      analysis.themeColor ? `[THEME_COLOR_META] ${analysis.themeColor}` : "",
      `[BODY_SHELL] id=${JSON.stringify(analysis.bodyId || "—")} class=${JSON.stringify(analysis.bodyClass || "—")}`,
      `[LANDMARKS] nav=${analysis.hasNav} footer=${analysis.hasFooter} main=${analysis.mainLandmarks}`,
      `[HEADINGS_SAMPLE]\n${analysis.headings.join("\n") || "(none parsed)"}`,
      `[MEDIA] images≈${analysis.imgCount}; sample <IMG> roles: ${JSON.stringify(analysis.imgSamples)}`,
      analysis.videos.length ? `[VIDEO_SOURCES]\n${analysis.videos.join("\n")}` : "",
      analysis.fontLinks.length
        ? `[FONT_CDNS]\n${analysis.fontLinks.join("\n")}`
        : "[FONT_CDNS] infer display/body from reference scale/weight; avoid automatic \"serif display + Inter\" if evidence points elsewhere — consider mono data UI, slab headline, condensed grotesk, or variable-font single family.",
      analysis.stylesheets.length
        ? `[STYLESHEET_HREFS]\n${analysis.stylesheets.join("\n")}`
        : "",
      analysis.preloads.length ? `[LINK_PRELOADS]\n${JSON.stringify(analysis.preloads)}` : "",
      analysis.scripts.length ? `[EXTERNAL_SCRIPTS]\n${analysis.scripts.join("\n")}` : "",
      analysis.colors.length ? `[HEX_SAMPLES_FROM_MARKUP]\n${analysis.colors.join(" ")}` : "",
      analysis.classHints.length
        ? `[CLASS_TOKEN_FREQUENCY]\n${analysis.classHints.join(", ")}`
        : "",
      analysis.inlineStyles
        ? `[INLINE_STYLE_SNIPPET]\n${analysis.inlineStyles.slice(0, 1600)}`
        : "",
      "[L1_CONTENT] Headlines:4–8w concrete;body≤28w/para;CTAs:Start|Book|Pricing;ban hollow lorem marketing voice.",
      "[L2_LAYOUT] Infer MotionSites L4 (L4.1 hero L4.3 sections L4.4 split+bento L4.6 card-wall…). State ONE hero anchor:center|bottom|split + max-w token (e.g. max-w-7xl). 12-col alignment desktop.",
      "[L3_SPACE] px-4 sm:px-6 md:px-12 lg:px-16 | section py-16 md:py-24 | gap-6 md:gap-8 | min touch 44px.",
      "[L4_SURFACE] Match reference radius/shadow family consistently (one radius system sitewide). Video hero→scrim gradient under text for WCAG.",
      "[STYLE_LIB] Read in-repo designer markdown https://github.com/Ictraeh/website_prompt_generator/tree/main/sources/design-style-layout-md — pick Layout library/*-style-guide.md closest to inferred L4; apply structure rules + Style Library global vocabulary to <BRAND> (patterns only).",
      "[L5_TYPOGRAPHY] From FONT_CDNS+headings: define eyebrow|H1|lead|body|caption sizes in Tailwind rem; import weights used;tabular nums if metrics.",
      "[L6_COLOR_ROLES] Map HEX_SAMPLES to semantic roles bg|surface|border|text|muted|accent;accent rare;body contrast≥4.5:1.",
      "[L7_MOTION_SPEC] From scripts/classes: default M-fade-rise+M-button-lift;add scroll-scrub/GSAP only if evidence.Durations:nav150–200ms|section450–600ms|stagger50ms.anime.js stagger+timeline;reactbits.dev 1–2 modules→src/components/reactbits/*.prefers-reduced-motion→opacity200ms only.",
      "[HERO_CONTRACT] min-h-[100svh] overflow-hidden; media absolute inset-0 object-cover -z-10; content z-20; nav glass or transparent max-w-7xl.",
      "[SECTIONS] Propose 3–6 section story matching heading ladder and media density observed.",
      "[MEDIA_ASSETS] Mix sources: Pexels (≥1 hero video + ≥2 stills + card thumbs from distinct searches), lummi.ai (1–2 generative stills for contrast), lucide-react (≥12 named icons). Placeholders <HERO_VIDEO> <SECTION_STILL_*> <LUMMI_*>; muted loop playsInline object-cover; scrim % stops for WCAG on video; no duplicate same remote asset id across hero and cards.",
      "[DESIGN_MD] After implementation, add ./DESIGN.md per https://github.com/Ictraeh/design.md + Stitch format https://stitch.withgoogle.com/docs/design-md/format/ — YAML tokens + ## sections (Overview…Don'ts). Align with [DESIGN_MD_REFS] below.",
      "[DESIGN_MD_REFS] From https://github.com/VoltAgent/awesome-design-md pick 2 getdesign.md/<slug>/design-md hubs closest to the reference site's vertical (e.g. Linear+Vercel+Stripe for devtools; Framer+Webflow+Clay for creative). Patterns/tokens only—no trademark assets or copy.",
      "[L8_GOVERNANCE] Bold/clean/contemporary;vary split|bento|editorial vs hero+3 cards unless reference demands.[QUALITY_GUARDS] Ban grey-mush,lorem voice,untokenized gradients,handshake stock,blobs w/o job;WCAG AA on media.",
      "[GUARD] No trademark theft; replace brand names with <BRAND>; no hotlinking competitor assets in production.",
      "[QA] responsive sm/md/lg; CLS reserve; focus-visible; Lighthouse-sane bundle.",
    ];
    return clamp(lines.filter(Boolean).join("\n"), MAX_PROMPT);
  }

  async function fetchHtmlFromProxy(url) {
    const api = `/api/fetch-page?url=${encodeURIComponent(url)}`;
    const r = await fetch(api, { method: "GET" });
    const ct = r.headers.get("content-type") || "";
    let json;
    if (ct.includes("application/json")) {
      json = await r.json();
    } else {
      const t = (await r.text()).slice(0, 200);
      throw new Error(t || `Non-JSON response ${r.status}`);
    }
    if (!r.ok) throw new Error(json.error || `HTTP ${r.status}`);
    if (!json.html || typeof json.html !== "string") throw new Error("No HTML in response");
    return { html: json.html, finalUrl: json.finalUrl || url };
  }

  function initTabs() {
    const buttons = document.querySelectorAll("[data-tab-btn]");
    if (!buttons.length) return;
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab-btn");
        buttons.forEach((b) => {
          b.classList.toggle("tab-btn-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
          panel.classList.toggle("is-hidden", panel.getAttribute("data-tab-panel") !== tab);
        });
      });
    });
  }

  function initSiteClone() {
    initTabs();
    const urlEl = el("cloneUrl");
    const pasteEl = el("cloneHtmlPaste");
    const outEl = el("cloneOutput");
    const statusEl = el("cloneStatus");
    const genBtn = el("cloneGenerate");
    const fetchBtn = el("cloneFetch");
    const copyBtn = el("cloneCopy");
    const copyStat = el("cloneCopyStatus");

    if (!genBtn || !outEl) return;

    fetchBtn?.addEventListener("click", async () => {
      const url = (urlEl?.value || "").trim();
      if (!url) {
        statusEl.textContent = "Enter a URL first.";
        return;
      }
      statusEl.textContent = "Fetching…";
      try {
        const { html, finalUrl } = await fetchHtmlFromProxy(url);
        if (pasteEl) pasteEl.value = html.slice(0, 500_000);
        statusEl.textContent = `Fetched ${html.length} characters (${finalUrl}). Review/edit HTML if needed, then Generate.`;
      } catch (e) {
        statusEl.textContent =
          "Fetch failed (no /api proxy or blocked). Paste HTML: open the site → View Page Source → copy into the HTML box, then Generate.";
      }
    });

    genBtn.addEventListener("click", () => {
      const url = (urlEl?.value || "").trim();
      const pasted = (pasteEl?.value || "").trim();
      const html = pasted;
      if (!html) {
        statusEl.textContent = "Paste HTML (or use Fetch on Vercel) before generating.";
        return;
      }
      const base = (() => {
        if (!url) return "https://paste.local/";
        try {
          const u = new URL(url);
          const path = u.pathname.endsWith("/") ? u.pathname : u.pathname.replace(/[^/]*$/, "/");
          return u.origin + path;
        } catch {
          return "https://paste.local/";
        }
      })();
      const finalUrl = url || "";
      try {
        const analysis = analyzeHtml(html, base);
        outEl.value = buildClonePrompt(analysis, url || base, finalUrl);
        statusEl.textContent = `Prompt ready: ${outEl.value.length} / ${MAX_PROMPT} characters.`;
      } catch (err) {
        statusEl.textContent = "Could not parse HTML.";
        outEl.value = "";
      }
    });

    copyBtn?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(outEl.value);
        if (copyStat) copyStat.textContent = "Copied";
        setTimeout(() => {
          if (copyStat) copyStat.textContent = "";
        }, 2000);
      } catch {
        if (copyStat) copyStat.textContent = "Copy failed — select manually";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteClone);
  } else {
    initSiteClone();
  }
})();
