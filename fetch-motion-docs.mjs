/**
 * Builds motion-docs-snippets.json from:
 *   - sources/scrolltrigger-doc.md (GSAP ScrollTrigger doc excerpt; update file to refresh)
 *   - Live fetch https://animejs.com/documentation/animation/ (code in <pre><code>)
 * Run: node fetch-motion-docs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "motion-docs-snippets.json");
const ST_MD = path.join(__dirname, "sources", "scrolltrigger-doc.md");
const MAX_CHARS = 20000;
const UA = { "User-Agent": "vibe-prompt-tool-motion-docs/1" };

function clampCode(header, code) {
  let full = `${header}\n\n${code.trim()}`;
  if (full.length > MAX_CHARS) {
    const keep = MAX_CHARS - 100;
    full = full.slice(0, keep) + `\n\n// [...truncated at ${MAX_CHARS} bytes]\n`;
  }
  return full;
}

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[\u200b\u00a0]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72) || "snippet";
}

/** Parse GSAP doc markdown: fenced ``` blocks under nearest ## / ### heading. */
function parseScrollTriggerMarkdown(md) {
  const snippets = [];
  let heading = "ScrollTrigger overview";
  let inFence = false;
  let buf = [];
  const lines = md.split(/\r?\n/);

  const flush = () => {
    const code = buf.join("\n").trim();
    buf = [];
    if (code.length < 18) return;
    const id = `gsap-st-${slug(heading)}-${snippets.length}`;
    const header = `// GSAP ScrollTrigger — ${heading.replace(/[\u200b]/g, "").trim()}\n// Docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/\n// GreenSock license applies to GSAP library use: https://gsap.com/community/standard-license/`;
    const full = clampCode(header, code);
    snippets.push({
      id,
      library: "gsap",
      category: "ScrollTrigger",
      name: heading.replace(/[\u200b#]/g, "").trim().slice(0, 80),
      label: `GSAP · ${heading.replace(/[\u200b#]/g, "").trim().slice(0, 72)}`,
      sourceUrl: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
      siteUrl: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
      charCount: full.length,
      code: full,
    });
  };

  for (const line of lines) {
    const hm = line.match(/^(#{2,4})\s+(.+)/);
    if (hm && !inFence) {
      heading = hm[2].replace(/​/g, "").trim();
    }
    const t = line.trim();
    if (t.startsWith("```")) {
      if (!inFence) {
        inFence = true;
        buf = [];
      } else {
        inFence = false;
        flush();
      }
      continue;
    }
    if (inFence) buf.push(line);
  }
  return dedupeSnippets(snippets);
}

function dedupeSnippets(arr) {
  const seen = new Set();
  const out = [];
  for (const s of arr) {
    const h = s.code.replace(/\s+/g, " ").slice(0, 200);
    if (seen.has(h)) continue;
    seen.add(h);
    out.push(s);
  }
  return out;
}

/** Pull <pre><code> blocks from anime.js documentation HTML. */
function parseAnimeHtml(html) {
  const snippets = [];
  const re = /<pre[^>]*>\s*<code(?:\s[^>]*)?>([\s\S]*?)<\/code>\s*<\/pre>/gi;
  let m;
  let i = 0;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .trim();
    if (raw.length < 25) continue;
    i += 1;
    const id = `anime-doc-block-${i}`;
    const header = `// Anime.js — documentation excerpt\n// https://animejs.com/documentation/animation/\n// MIT — https://github.com/juliangarnier/anime/`;
    const full = clampCode(header, raw);
    snippets.push({
      id,
      library: "animejs",
      category: "Animation",
      name: `Doc example ${i}`,
      label: `Anime.js · Example ${i}`,
      sourceUrl: "https://animejs.com/documentation/animation/",
      siteUrl: "https://animejs.com/documentation/animation/",
      charCount: full.length,
      code: full,
    });
    if (snippets.length >= 24) break;
  }
  return dedupeSnippets(snippets);
}

async function fetchAnimePage() {
  const url = "https://animejs.com/documentation/animation/";
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

async function main() {
  const errors = [];
  const all = [];

  if (fs.existsSync(ST_MD)) {
    const md = fs.readFileSync(ST_MD, "utf8");
    all.push(...parseScrollTriggerMarkdown(md));
  } else {
    errors.push(`missing ${ST_MD}`);
  }

  try {
    const html = await fetchAnimePage();
    const animeSnips = parseAnimeHtml(html);
    if (animeSnips.length === 0) errors.push("animejs: no <pre><code> blocks parsed");
    all.push(...animeSnips);
  } catch (e) {
    errors.push(`animejs fetch: ${e.message}`);
  }

  const payload = {
    version: 1,
    fetchedAt: new Date().toISOString(),
    attribution:
      "GSAP ScrollTrigger excerpts from gsap.com/docs (GreenSock Standard License applies to library). Anime.js excerpts from animejs.com (MIT).",
    maxCharsPerSnippet: MAX_CHARS,
    snippets: all,
    fetchErrors: errors,
  };

  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2), "utf8");
  console.log("Wrote", OUT, "snippets:", all.length, "errors:", errors.length, errors);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
