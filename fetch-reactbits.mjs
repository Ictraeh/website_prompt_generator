/**
 * Pulls reusable TSX from the open-source React Bits repo (same project as reactbits.dev).
 * Run: node fetch-reactbits.mjs
 * Output: reactbits-snippets.json (each code capped at MAX_CHARS)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { setTimeout as sleep } from "timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "reactbits-snippets.json");

const CATEGORIES = ["Animations", "Backgrounds", "Components", "TextAnimations"];
const RAW_BASE = "https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-tailwind";
const API_LIST = (cat) =>
  `https://api.github.com/repos/DavidHDev/react-bits/contents/src/ts-tailwind/${encodeURIComponent(cat)}?ref=main`;
const API_DIR = (cat, name) =>
  `https://api.github.com/repos/DavidHDev/react-bits/contents/src/ts-tailwind/${encodeURIComponent(cat)}/${encodeURIComponent(name)}?ref=main`;

const MAX_CHARS = 20000;
const RAW_DELAY_MS = 25;

async function fetchOkText(url) {
  const r = await fetch(url, { headers: { "User-Agent": "vibe-prompt-tool-fetch/1" } });
  if (!r.ok) return null;
  return r.text();
}

async function fetchJson(url) {
  const r = await fetch(url, { headers: { "User-Agent": "vibe-prompt-tool-fetch/1" } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function resolveSource(cat, name) {
  const tryUrls = [
    `${RAW_BASE}/${cat}/${name}/${name}.tsx`,
    `${RAW_BASE}/${cat}/${name}/${name}.ts`,
  ];
  for (const rawUrl of tryUrls) {
    await sleep(RAW_DELAY_MS);
    const code = await fetchOkText(rawUrl);
    if (code) {
      const file = rawUrl.endsWith(".ts") && !rawUrl.endsWith(".tsx") ? `${name}.ts` : `${name}.tsx`;
      return { code, file, rawUrl };
    }
  }

  let files;
  try {
    files = await fetchJson(API_DIR(cat, name));
  } catch {
    return null;
  }
  if (!Array.isArray(files)) return null;
  const tsxFile = files.find((f) => f.type === "file" && f.name.endsWith(".tsx"));
  const tsFile = files.find((f) => f.type === "file" && f.name.endsWith(".ts") && !f.name.endsWith(".d.ts"));
  const pick = tsxFile || tsFile;
  if (!pick?.download_url) return null;
  await sleep(RAW_DELAY_MS);
  const code = await fetchOkText(pick.download_url);
  if (!code) return null;
  return { code, file: pick.name, rawUrl: pick.download_url };
}

async function main() {
  const snippets = [];
  const errors = [];

  for (const cat of CATEGORIES) {
    const entries = await fetchJson(API_LIST(cat));
    const dirs = entries.filter((e) => e.type === "dir").map((e) => e.name);
    for (const name of dirs) {
      let resolved;
      try {
        resolved = await resolveSource(cat, name);
      } catch (e) {
        errors.push(`${cat}/${name}: ${e.message}`);
        continue;
      }
      if (!resolved) {
        errors.push(`${cat}/${name}: no source file`);
        continue;
      }
      const { code, file, rawUrl } = resolved;
      const ghBlob = `https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/${cat}/${name}/${file}`;
      const header = `// React Bits — ${cat}/${name} (${file})\n// MIT — https://github.com/DavidHDev/react-bits\n// Docs hub: https://reactbits.dev/get-started/introduction\n// Raw: ${rawUrl}\n// Blob: ${ghBlob}\n\n`;
      let full = header + code;
      if (full.length > MAX_CHARS) {
        const keep = MAX_CHARS - 120;
        full = full.slice(0, keep) + `\n\n// [...truncated at ${MAX_CHARS} characters]\n`;
      }
      snippets.push({
        id: `${cat}-${name}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
        category: cat,
        name,
        file,
        label: `${cat} · ${name}`,
        sourceUrl: ghBlob,
        siteUrl: "https://reactbits.dev/get-started/introduction",
        charCount: full.length,
        code: full,
      });
    }
  }

  const payload = {
    version: 1,
    fetchedAt: new Date().toISOString(),
    attribution:
      "Source: DavidHDev/react-bits (MIT). UI catalog: https://reactbits.dev — follow repo LICENSE for your use case.",
    maxCharsPerSnippet: MAX_CHARS,
    snippets: snippets.sort((a, b) => a.label.localeCompare(b.label)),
    fetchErrors: errors,
  };

  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2), "utf8");
  console.log("Wrote", OUT, "snippets:", snippets.length, "errors:", errors.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
