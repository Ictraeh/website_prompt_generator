/**
 * Vercel serverless: fetch remote HTML for the "From website" tab (avoids browser CORS).
 * GET /api/fetch-page?url=https%3A%2F%2Fexample.com
 */
function blockedHost(hostname) {
  const h = String(hostname || "").toLowerCase();
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local")) return true;
  if (h === "0.0.0.0" || h === "[::1]" || h === "::1") return true;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) {
    const [a, b] = h.split(".").map((x) => Number(x));
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
  }
  return false;
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const raw = typeof req.query?.url === "string" ? req.query.url.trim() : "";
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }
  if (!/^https?:$/i.test(parsed.protocol)) return res.status(400).json({ error: "Only http and https URLs are allowed" });
  if (blockedHost(parsed.hostname)) return res.status(403).json({ error: "Host not allowed" });

  const ctl = await fetch(parsed.href, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "VibePromptGenerator/1.1 (+https://github.com/Ictraeh/website_prompt_generator)",
      Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!ctl.ok) {
    return res.status(502).json({ error: `Upstream returned ${ctl.status}`, status: ctl.status });
  }

  const buf = await ctl.arrayBuffer();
  if (buf.byteLength > 2_000_000) return res.status(413).json({ error: "Response larger than 2MB" });

  const html = new TextDecoder("utf-8", { fatal: false }).decode(buf);
  return res.status(200).json({
    html,
    finalUrl: ctl.url,
    contentType: ctl.headers.get("content-type") || "",
  });
};
