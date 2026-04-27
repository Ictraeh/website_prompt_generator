#!/usr/bin/env node
/**
 * Send a vibe prompt (plain text file) to Kimi K2.6 and save the assistant reply.
 *
 * Usage:
 *   export MOONSHOT_API_KEY="sk-..."   # or KIMI_API_KEY
 *   npm run kimi:gen -- path/to/prompt.txt path/to/output.md
 *
 * Docs: https://platform.kimi.ai/docs/api/quickstart
 * Endpoint: POST https://api.moonshot.ai/v1/chat/completions  model: kimi-k2.6
 */
import fs from "fs";
import path from "path";

const apiKey = process.env.MOONSHOT_API_KEY || process.env.KIMI_API_KEY;
if (!apiKey || !String(apiKey).trim()) {
  console.error("Missing MOONSHOT_API_KEY or KIMI_API_KEY in the environment.");
  process.exit(1);
}

const promptFile = path.resolve(process.argv[2] || "prompt.txt");
const outFile = path.resolve(process.argv[3] || "kimi-output.md");
const maxTokens = Math.min(
  Number(process.env.KIMI_MAX_TOKENS || 16384) || 16384,
  131072
);

if (!fs.existsSync(promptFile)) {
  console.error(`Prompt file not found: ${promptFile}`);
  console.error("Copy a generated prompt from the Vibe Prompt Generator into this file, or pass a path.");
  process.exit(1);
}

const userPrompt = fs.readFileSync(promptFile, "utf8");
if (!userPrompt.trim()) {
  console.error("Prompt file is empty.");
  process.exit(1);
}

const system = `You are a senior front-end engineer. The user message is a full implementation spec (layers L0–L9, stack, tokens, motion).
Follow it faithfully. Output runnable code the user can open or paste into a repo.

Prefer ONE of these output shapes (pick the one that best matches the spec):
1) A single complete index.html (inline CSS/JS allowed) they can open in a browser, OR
2) A small React+Vite+Tailwind file tree: for each file use a markdown heading like ### src/App.tsx then a fenced tsx/ts/css block.

Do not refuse for length: be concise in prose but complete in code. If the spec is huge, implement the hero + nav + first two sections fully, then stub remaining sections with clear TODO comments.`;

const body = {
  model: "kimi-k2.6",
  temperature: Number(process.env.KIMI_TEMPERATURE || 0.35),
  max_tokens: maxTokens,
  messages: [
    { role: "system", content: system },
    { role: "user", content: userPrompt },
  ],
};

const res = await fetch("https://api.moonshot.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const json = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error("Kimi API error:", res.status, JSON.stringify(json, null, 2));
  process.exit(1);
}

const text = json.choices?.[0]?.message?.content;
if (!text) {
  console.error("No assistant content in response:", JSON.stringify(json, null, 2));
  process.exit(1);
}

fs.writeFileSync(outFile, text, "utf8");
console.log(`Wrote ${outFile} (${text.length} chars). max_tokens was ${maxTokens}.`);
