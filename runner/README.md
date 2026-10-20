# ESIC IP Bulk Registration Runner

Automates the ESIC employer-portal IP registration flow. Pairs with the
[ESIC Helper web tool](../) — that tool validates your CSV and exports
`queue.json`; this runner consumes `queue.json` and drives the portal.

## What it does

1. Launches a persistent Chromium browser.
2. You log in to ESIC + solve the **login captcha once**.
3. For each IP in `queue.json`, the runner:
   - **Page 1 — Entry:** clicks "No" (ESI not allotted before) → Continue
   - **Page 2 — Main form:** fills name, father/husband, DOB, marital, gender,
     present address, dispensary cascade (state → district → name, each PostBack),
     appointment date, SMS language → ticks declaration → **auto-clicks Submit**
   - **Page 3 — Bank:** types IFSC → clicks Search (PostBack) → fills account no,
     MICR, account type → uploads cheque/passbook PDF → **auto-clicks Submit**
   - **Page 4 — Nominee:** fills nominee name + relation + share + family member
     (via hidden XML fields) → **auto-clicks Save**
   - Captures the generated 10-digit IP Number from the success page
   - Writes it to `results.json` + `results.csv`
4. Auto-advances to the next IP after a 5-second delay (configurable).
5. On error: pauses, takes a full-page screenshot to `error-screenshots/`,
   and waits for you to press Enter (retry) or type `skip` (next IP).
6. **Ctrl+C anytime** — state is saved to `state.json`. Restart resumes from
   the last completed IP.

## You touch nothing except

- **Login + captcha** (once, at the start)
- **Enter key** on error (to retry or skip)

No text is typed manually. No buttons are clicked manually. The runner does
everything else.

## Setup (5 minutes)

### 1. Install Node.js 18+

Download from <https://nodejs.org> and install.

### 2. Create the runner folder

```bash
mkdir esic-runner
cd esic-runner
```

### 3. Save these 3 files into the folder

| File | Source |
|------|--------|
| `runner.mjs` | Download from the ESIC Helper web tool's Export step ("Download runner script" button) |
| `package.json` | Copy from below |
| `config.json` | Optional — copy from `config.example.json` and adjust |

**`package.json`** (copy exactly):
```json
{
  "name": "esic-runner",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "start": "node runner.mjs" },
  "dependencies": { "playwright": "^1.48.0" }
}
```

### 4. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 5. Prepare your data files

- **`queue.json`** — Export from the ESIC Helper web tool (Export step →
  "Download queue.json"). Drop it in the runner folder.
- **`docs/` subfolder** — Put each employee's bank document (cheque/passbook
  PDF or JPG, ≤200KB each) here. The `BankDocPath` column in your CSV must
  match these paths (e.g. `./docs/kishan_cheque.pdf`).

```
esic-runner/
├── runner.mjs
├── package.json
├── config.json              (optional)
├── queue.json               ← from web tool
├── docs/
│   ├── kishan_cheque.pdf
│   ├── sunita_cheque.pdf
│   └── ...
└── (these are created on first run)
    ├── browser-session/     ← persists login cookies
    ├── state.json           ← resume state
    ├── results.json         ← final results
    ├── results.csv          ← final results (spreadsheet-friendly)
    └── error-screenshots/   ← full-page PNGs on failure
```

## Run

```bash
node runner.mjs
```

1. Browser opens to the ESIC login page.
2. Log in with your employer code, user ID, password, and **solve the captcha**.
3. Once you see the employer dashboard, come back to this terminal and
   **press Enter**.
4. Walk away. The runner processes each IP, ~30-45 seconds per IP.

## Output

After each IP, the runner writes:

**`results.json`** — full detail:
```json
[
  {
    "rowIndex": 1,
    "empName": "KISHAN MOTIBHAI JADAV",
    "ipNumber": "39000547790001019",
    "status": "success",
    "message": "",
    "timestamp": "2026-10-20T13:45:12.000Z"
  }
]
```

**`results.csv`** — open in Excel:
```csv
rowIndex,empName,ipNumber,status,message,timestamp
1,KISHAN MOTIBHAI JADAV,39000547790001019,success,,2026-10-20T13:45:12.000Z
```

## Resume after crash / Ctrl+C

Just run `node runner.mjs` again. It reads `state.json` and picks up where
it left off. The persistent browser session means you usually don't even
need to log in again.

## Config options (`config.json`)

```json
{
  "delayBetweenIPs": 5000,
  "interactiveMode": false,
  "headless": false,
  "postbackTimeout": 30000,
  "pageTimeout": 60000
}
```

| Key | Default | What it does |
|-----|---------|--------------|
| `delayBetweenIPs` | `5000` | Milliseconds to wait between IPs. Increase if ESIC throttles. |
| `interactiveMode` | `false` | If `true`, runner pauses before each Submit and waits for Enter. Useful for first-time runs to verify the flow. |
| `headless` | `false` | If `true`, browser runs invisibly. Keep `false` so you can see what's happening. |
| `postbackTimeout` | `30000` | Max wait for ASP.NET PostBack (ms). |
| `pageTimeout` | `60000` | Max wait for page load (ms). |

## Honest limitations

1. **Nominee XML format is a best guess.** The nominee + family member data
   goes into hidden XML fields (`NomineeXmldata`, `Xmldatahidden`) that are
   normally built by a grid UI whose JavaScript source we don't have. If the
   nominee Save fails, open `runner.mjs`, find `setNomineeXml()`, and adjust
   the XML format after inspecting the actual page in DevTools.

2. **IP Number extraction uses 3 fallback strategies.** The success page HTML
   isn't in the files we analyzed. If all 3 strategies fail, check
   `error-screenshots/` for the actual success page, then adjust
   `extractIpNumber()` in `runner.mjs`.

3. **Bank document must exist at `BankDocPath`.** The runner does NOT pause
   for manual file selection — it errors out instead. Make sure all your
   `docs/` files are in place before starting.

4. **ESIC may change without notice.** Field IDs, page flow, anti-bot
   measures can all change. The runner is built from the ASPX source files
   as of October 2026. If something breaks, check `error-screenshots/` and
   adjust the relevant selector in `runner.mjs`.

5. **Use responsibly.** This is a personal assistive tool for your own
   establishment's IPs. Don't resell it as a service. Aadhaar/bank data is
   sensitive — purge `browser-session/` after your batch completes:
   ```bash
   rm -rf browser-session/
   ```

## Troubleshooting

**"Entry page did not load — check you are still logged in"**
Your session expired. Log in again in the browser, then press Enter in the
terminal.

**"IFSC search failed for XXXX0XXXXXX"**
The IFSC code is wrong, or ESIC's IFSC database doesn't have it. Fix the
CSV row, re-export `queue.json`, and restart.

**"Bank document not found: ./docs/foo.pdf"**
Create the file at that exact path. The path is relative to the runner
folder.

**"Nominee save rejected: ..."**
Likely the XML format issue. Open the page in DevTools, inspect the
`NomineeXmldata` hidden field after manually adding a nominee, and match
that format in `setNomineeXml()`.

**Runner hangs after Submit**
PostBack may not have triggered. Check the browser window — if there's a
visible error, fix it and press Enter in the terminal. If the page is
blank, the PostBack may have timed out — increase `postbackTimeout` in
`config.json`.

**Want to start over**
```bash
rm state.json results.json results.csv
# Don't delete browser-session/ unless you want to log in again
node runner.mjs
```
