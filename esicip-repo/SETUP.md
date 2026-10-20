# GitHub Pages Setup

This guide shows how to host the ESIC Helper web tool on GitHub Pages.

## Option A: Just host the extension (simplest)

If you only want the extension files on GitHub (for the update checker to work):

1. Push this repo to GitHub (see README.md)
2. Done — the extension's "Check for updates" button will fetch from:
   `https://raw.githubusercontent.com/rcstrue/esicip/main/extension/manifest.json`

## Option B: Host the web tool too (advanced)

The web tool (CSV validator + queue.json builder) is a Next.js app. To host it on GitHub Pages:

### Step 1: Export the web tool as static files

The web tool lives in the source project. To get a static export:

```bash
# In the source project root:
bun run build
# Static files will be in .next/standalone/
```

### Step 2: Copy to the repo

Copy the built static files to a `docs/` folder in this repo:

```
esicip/
├── extension/      ← Chrome extension
├── docs/           ← Web tool (for GitHub Pages)
│   ├── index.html
│   └── ...
└── README.md
```

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/rcstrue/esicip/settings/pages
2. **Source**: Deploy from a branch
3. **Branch**: `main`, Folder: `/docs`
4. Click **Save**
5. Wait 2-3 minutes
6. Your site is live at: `https://rcstrue.github.io/esicip/`

### Step 4: Update the extension's update URL

If you move the extension folder, update the URLs in `extension/popup.js`:

```js
const GITHUB_MANIFEST_URL = "https://raw.githubusercontent.com/rcstrue/esicip/main/extension/manifest.json"
const GITHUB_ZIP_URL = "https://github.com/rcstrue/esicip/raw/main/extension/esic-extension.zip"
```

## Option C: Use the sandbox tool directly

If you don't want to host the web tool at all, just use the version running in the
preview panel. The extension + queue.json is all you need on your machine.

---

## Troubleshooting GitHub Pages

**Site not loading?**
- Wait 5 minutes — GitHub Pages can be slow on first deploy
- Check: https://github.com/rcstrue/esicip/actions for build errors
- Make sure the `docs/` folder (or `extension/` folder) is committed and pushed

**Update checker says "Could not check for updates"?**
- Make sure the repo is **public** (Settings → General → Danger Zone → Change visibility)
- Make sure `extension/manifest.json` exists on the `main` branch
- Check the URL in `extension/popup.js` matches your repo

**Extension won't load?**
- Make sure you're selecting the `extension/` folder, not the repo root
- Check `chrome://extensions/` for error messages
- Try removing + re-loading the extension
