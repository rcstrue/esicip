# ESIC IP Bulk Registration Helper

Validate ESIC employee CSVs, translate labels to portal codes, and export a
`queue.json` + Chrome extension that auto-fills every field and auto-clicks
Submit/Continue/Save — **no captcha after login**, so bulk IP runs are
feasible (~30–45 s per IP).

## Web tool (no install)

→ **https://rcstrue.github.io/esicip/** (GitHub Pages, fully client-side)

Drop your CSV → review issues → export `queue.json` + the Chrome extension.
The site always serves the **latest** extension (fetched from `main` on the
fly), so you never need to rebuild it after an update.

## Chrome extension

1. Download `esic-extension-vX.zip` from the web tool.
2. Unzip → `chrome://extensions/` → Developer mode → Load unpacked.
3. Load `queue.json` in the popup → go to ESIC → Add Employee.
4. The extension fills every page + auto-clicks Submit/Continue/Save.
   Live-form mode + macro recorder are toggleable in the popup. Only the
   Self-Photo and bank-document file picks stay manual (browser security).

## Repo layout

| Path | What |
|---|---|
| `docs/` | Static GitHub Pages web tool (client-side validate + export + extension zip) |
| `extension/` | Chrome extension (MV3): content.js, dialog-patch.js, popup, manifest |
| `src/lib/esic/` | Pure-TS engine: CSV parser, validator, masters, field map, queue builder |
| `src/app/` | Next.js app (sandbox/local — same UI as the Pages site, with API routes) |
| `runner/` | Optional Playwright runner (Advanced — the extension is preferred) |
| `.github/workflows/deploy-pages.yml` | Builds the lib bundle + deploys `docs/` to Pages |

## Develop locally

```bash
bun install
bun run dev                 # Next.js app on :3000 (API routes available)
bun build src/lib/esic/browser.ts --outfile docs/lib.bundle.js --target browser
cd docs && python3 -m http.server 8000   # static Pages site locally
```
