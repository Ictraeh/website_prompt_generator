# Vibe Prompt 生成器

静态页面：选条件 → 生成英文实现规格（≤4999 字符）→ 可选复制 [React Bits](https://reactbits.dev) 动效代码。

## 本地开发

```bash
npm run build
python3 -m http.server 8765
```

打开 `http://127.0.0.1:8765/`。更新 React Bits 源码列表：`node fetch-reactbits.mjs && npm run build`。

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
2. **Root Directory**：保持 `.`（本仓库根目录即本工具根目录即可）。
3. 本仓库已含 **`vercel.json`**：`framework: null`（Other）、`buildCommand` 会执行 `node build-catalog.mjs`（部署时刷新 `catalog.bundle.js` / `standalone.html`）；`npm install` 无依赖，很快结束。
4. 若你**不想**在云端跑 build：在 Vercel 项目 **Settings → General → Build & Development Settings** 里清空 **Build Command**（并可在仓库里删除或改掉 `vercel.json` 的 `buildCommand`），仅用已提交的静态文件。
5. 部署成功后访问项目域名根路径 **`/`**，对应 **`index.html`**。

分发时请保留 `reactbits-snippets.bundle.js` 与 `catalog.bundle.js`（或保留 `build` 流程以便 CI 再生）。
