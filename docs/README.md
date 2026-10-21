# ESIC IP Bulk Registration Helper — static web tool

This folder is a **fully client-side** static site (no server) deployed to
GitHub Pages at **https://rcstrue.github.io/esicip/**.

Everything runs in your browser:
- CSV validation (the same `src/lib/esic/*` engine, bundled into `lib.bundle.js`)
- `queue.json` + corrected-CSV export
- Chrome-extension zip — built **on the fly** by fetching the latest files
  from `extension/` on the `main` branch, so the site always serves the
  newest extension version (no rebuild needed when the extension updates).

## Local dev
```bash
bun build src/lib/esic/browser.ts --outfile docs/lib.bundle.js --target browser
cd docs && python3 -m http.server 8000   # http://localhost:8000
```

## Deploy
The `.github/workflows/deploy-pages.yml` Action rebuilds `lib.bundle.js`
and publishes `docs/` to GitHub Pages on every push that touches
`docs/`, `src/lib/esic/`, `extension/`, or the workflow.

In GitHub → Settings → Pages → Source, choose **"GitHub Actions"**.
