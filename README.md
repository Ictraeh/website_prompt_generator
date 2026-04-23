# Vibe Prompt Generator

Static page: pick options → generate an English implementation spec (≤4999 characters) → optionally copy motion snippets from [React Bits](https://reactbits.dev), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and [Anime.js](https://animejs.com/documentation/animation/) (≤20000 bytes per snippet).

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
