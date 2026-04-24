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
      "[L4_INFER] Pick closest MotionSites L4 archetype (§4): L4.1 full-bleed hero, L4.3 multi-section landing, L4.4 SaaS split/bento, L4.6 card wall, etc. State hero placement (center | bottom | split) and max-w token.",
      "[MOTION_INFER] From class tokens + scripts: default M-fade-rise + M-button-lift; add M-scroll-text-reveal or GSAP ScrollTrigger only if evidence of scrub/parallax; respect prefers-reduced-motion.",
      "[MOTION_LIBS] anime.js (animejs.com): stagger hero headline tokens, timeline section entrances where editorial density fits. reactbits.dev: cite 1–2 React Bits modules (e.g. Aurora/Silk for hero bg, AnimatedList for features) under src/components/reactbits/ when decorative layer matches reference energy.",
      "[HERO_CONTRACT] min-h-screen overflow-hidden pattern; media absolute inset-0 object-cover with explicit z-index vs content; nav glass or transparent max-w-7xl.",
      "[SECTIONS] Propose 3–6 section story matching heading ladder and media density observed.",
      "[MEDIA_ASSETS] Mix sources: Pexels (≥1 hero video + ≥2 stills + card thumbs from distinct searches), lummi.ai (1–2 generative stills for contrast), lucide-react (≥12 named icons). Placeholders <HERO_VIDEO> <SECTION_STILL_*> <LUMMI_*>; muted loop playsInline object-cover; scrim % stops for WCAG on video; no duplicate same remote asset id across hero and cards.",
      "[DESIGN_MD] After implementation, add ./DESIGN.md per https://github.com/Ictraeh/design.md — YAML tokens for colors/typography/rounded/spacing + ## sections (Overview…Components).",
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
