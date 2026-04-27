/**
 * Builds snippet-blurbs.json (4–6 word hints per motion snippet id).
 * Run after fetch-reactbits / fetch-motion-docs when snippet sets change:
 *   node scripts/gen-snippet-blurbs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REACTBITS_BLURB_BY_NAME } from "../reactbits-name-blurbs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rb = JSON.parse(fs.readFileSync(path.join(root, "reactbits-snippets.json"), "utf8"));
const md = JSON.parse(fs.readFileSync(path.join(root, "motion-docs-snippets.json"), "utf8"));
const rbSnips = (rb.snippets || []).map((s) => ({ ...s, library: "reactbits" }));
const all = [...rbSnips, ...(md.snippets || [])];

function camelWords(str) {
  return String(str)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
function wordsCount(s) {
  return s.split(/\s+/).filter(Boolean).length;
}
function trimToWords(s, maxW) {
  const parts = String(s).split(/\s+/).filter(Boolean);
  if (!parts.length) return "motion snippet pattern";
  return parts.slice(0, maxW).join(" ");
}

function blurbFor(s) {
  const name = s.name || (s.label || "snippet").split("·").pop().trim();
  const human = camelWords(name) || "motion snippet";
  const core = trimToWords(human, 4);
  if (s.library === "reactbits") {
    const curated = REACTBITS_BLURB_BY_NAME[name];
    if (curated) return curated;
    if (s.category === "Backgrounds") return `${core} ambient layered motion backdrop`;
    if (s.category === "Components") return `${core} interactive UI block pattern`;
    if (s.category === "TextAnimations") return `${core} kinetic typography treatment`;
    return `${core} UI element motion pattern`;
  }
  if (s.library === "gsap") {
    const nm = (s.name || "").trim();
    const low = nm.toLowerCase();
    if (low === "description" || /^description\b/.test(low)) {
      const h = (s.label || "").replace(/^GSAP\s*·\s*/i, "");
      const t = trimToWords(camelWords(h) || "scroll trigger", 4);
      return `${t} docs excerpt with sample`;
    }
    if (/^cdn\b|^minimal\b|^simple\b|^advanced\b|^standalone/i.test(low)) {
      const t = trimToWords(camelWords(nm.replace(/\s*\/\s*/g, " ")), 5);
      return `${t} ScrollTrigger starter sample`;
    }
    const t = trimToWords(camelWords(nm) || human, 4);
    return `${t} scroll linked tween example`;
  }
  if (s.library === "animejs") {
    const t = trimToWords(camelWords(s.name || "") || human, 4);
    return `${t} anime timeline property tween`;
  }
  return `${trimToWords(human, 4)} motion documentation excerpt`;
}

const out = {};
for (const s of all) {
  if (!s.id) continue;
  let b = blurbFor(s).replace(/\s+/g, " ").trim();
  let wc = wordsCount(b);
  if (wc > 6) b = trimToWords(b, 6);
  if (wc < 4) b = `${b} for layouts`.trim();
  wc = wordsCount(b);
  if (wc > 6) b = trimToWords(b, 6);
  out[s.id] = b;
}

const dest = path.join(root, "snippet-blurbs.json");
fs.writeFileSync(dest, JSON.stringify({ version: 1, blurbs: out }, null, 2), "utf8");
console.log("Wrote", dest, Object.keys(out).length, "blurbs");
