# Vibe Prompt Generator

Static page: pick options → generate an English implementation spec (≤4999 characters) → optionally copy motion snippets from [React Bits](https://reactbits.dev), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and [Anime.js](https://animejs.com/documentation/animation/) (≤20000 bytes per snippet).

### Designer Style Layout Markdown (in this repo)

The folder **`sources/design-style-layout-md/`** holds the **Style Library**, **Layout library**, **Font pairings**, and **Color system** markdown used by the product. On `npm run build`, `build-catalog.mjs` reads those files and embeds **`styleLibrary`** into `catalog.json` / `catalog.bundle.js` (excerpts + GitHub raw URLs per MotionSites **L4** archetype). Generated prompts include a **`[STYLE_LIB]`** block so vibe-coding agents apply the same layout and art-direction vocabulary. To refresh after editing the markdown locally, run **`npm run build`** and commit the updated catalog bundles.

When **Include DESIGN.md** is checked (default), the prompt adds a `[DESIGN_MD]` block that tells the coding agent to maintain `./DESIGN.md` using the format from [**Ictraeh/design.md**](https://github.com/Ictraeh/design.md): YAML front matter for design tokens (colors, typography, rounded, spacing, components with `{token}` refs) plus Markdown `##` sections in the canonical order (Overview → … → Do's and Don'ts). Validate with [`@google/design.md`](https://www.npmjs.com/package/@google/design.md) (`npx @google/design.md lint DESIGN.md`) when useful.

### “From website” tab

Switch to **From website** to paste a URL and (on **Vercel**) click **Fetch HTML** — the app calls **`/api/fetch-page`**, a small serverless route that downloads the page HTML (browsers alone cannot fetch most third-party URLs because of CORS). Locally, paste **View Page Source** HTML instead. **Generate clone prompt** parses the DOM in the browser (headings, body classes, stylesheet/script URLs, hex colors, frequent class tokens, inline `<style>` sample) and builds a **MotionSites-style** spec-first prompt to recreate a *similar* implementation (not a verbatim rip). Respect site terms and intellectual property.

## Local development

```bash
npm run build
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/`. To refresh motion snippets: run `node fetch-reactbits.mjs`, then `node fetch-motion-docs.mjs` (needs network), then `npm run build` (writes `motion-snippets.bundle.js` and `standalone.html`).

## Deploy to GitHub

1. Create an empty repo on GitHub (no README).
2. In this folder:

```bash
git init
git add .
git commit -m "Initial import: vibe prompt tool"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Deploy to Vercel

1. Push the repo, then on [vercel.com](https://vercel.com) → **Add New…** → **Project** → **Import** the repository.
2. **Root Directory** must be the folder that contains `package.json` and `vercel.json` (if this app lives in a subfolder of the repo, set Root Directory to that path).
3. This repo includes **`vercel.json`**: **`buildCommand`** is **`npm run build`** (runs `node build-catalog.mjs`), which writes **`index.html`**, **`app.js`**, **`catalog.bundle.js`**, **`motion-snippets.bundle.js`**, and **`standalone.html`** into **`public/`**, with **`outputDirectory": "public"`** (see [Missing public directory](https://vercel.com/docs/errors/error-list#missing-public-directory)). Node is pinned to **20.x** in **`package.json` → `engines`** and **`.nvmrc`** ([why](https://vercel.link/node-version)).
4. To skip cloud builds: clear **Build Command** under **Settings → General → Build & Development Settings** (and remove or change `buildCommand` in `vercel.json`), and commit prebuilt assets if you prefer.
5. Production URL **`/`** serves **`index.html`**.

Keep `motion-snippets.bundle.js` and `catalog.bundle.js` in the tree or rely on the build step in CI to regenerate them.
