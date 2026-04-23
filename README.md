# Vibe Prompt 生成器

静态页面：选条件 → 生成英文实现规格（≤4999 字符）→ 可选复制动效代码（[React Bits](https://reactbits.dev)、[GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)、[Anime.js](https://animejs.com/documentation/animation/) 文档摘录，单段 ≤20000 字节）。

## 本地开发

```bash
npm run build
python3 -m http.server 8765
```

打开 `http://127.0.0.1:8765/`。更新动效摘录：先 `node fetch-reactbits.mjs`，再 `node fetch-motion-docs.mjs`（需网络），最后 `npm run build`（写入 `motion-snippets.bundle.js` 与 `standalone.html`）。

## 部署到 GitHub

1. 在 GitHub 新建空仓库（不要勾选 README）。
2. 在本目录执行：

```bash
git init
git add .
git commit -m "Initial import: vibe prompt tool"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

## 部署到 Vercel

1. 把仓库推到 GitHub 后，打开 [vercel.com](https://vercel.com) → **Add New…** → **Project** → **Import** 该仓库。
2. **Root Directory**：必须设为**含有**本目录下 `package.json` 与 `vercel.json` 的文件夹（若 Git 仓库里本工具在子目录，例如 `vibe-prompt-tool/`，则 Root Directory 填该子路径，**不要**填仓库根除非应用就在根目录）。
3. 本仓库已含 **`vercel.json`**：`buildCommand` 为 **`npm run build`**（即 `node build-catalog.mjs`），在 **`public/`** 下写入与根目录相同的 **`index.html` / `app.js` / `catalog.bundle.js` / `motion-snippets.bundle.js` / `standalone.html`**，并设置 **`outputDirectory": "public"`**（见 [Missing public directory](https://vercel.com/docs/errors/error-list#missing-public-directory)）。Node 版本在 **`package.json` → `engines`** 与 **`.nvmrc`** 中固定为 **20.x**，以避免 Vercel 对 `>=18` 的自动主版本升级提示（[说明](https://vercel.link/node-version)）。
4. 若你**不想**在云端跑 build：在 Vercel 项目 **Settings → General → Build & Development Settings** 里清空 **Build Command**（并可在仓库里删除或改掉 `vercel.json` 的 `buildCommand`），仅用已提交的静态文件。
5. 部署成功后访问项目域名根路径 **`/`**，对应 **`index.html`**。

分发时请保留 `motion-snippets.bundle.js` 与 `catalog.bundle.js`（或保留 `build` 流程以便 CI 再生）。
