# ESIC IP Auto-Fill — Chrome Extension

A browser extension that auto-fills ESIC IP registration forms **and auto-clicks Submit / Continue / Save** for you (live-form mode) — the whole IP registration runs as one unattended flow. You only pick the bank-document file.

## Why this is better than the Playwright runner

| Playwright runner | Chrome extension |
|---|---|
| Separate browser window | Runs in your normal browser |
| Crashes on dialogs/tabs | No crashes — native browser |
| Login captcha each session | Uses your existing login |
| 700-line script to debug | Simple content script |
| Needs Node.js + npm install | Just load the extension |

## What it does

1. You load `queue.json` into the extension popup
2. You navigate to ESIC → Add Employee (log in normally)
3. **The extension auto-fills every field** on each page:
   - Entry page: clicks "No" (new IP)
   - Main form: fills name, father/husband, DOB, marital, gender, address, dispensary cascade, appointment date, declaration
   - Bank page: fills IFSC, account no, MICR, account type
   - Nominee page: fills nominee name, relation, share, family member
4. **The extension auto-clicks Submit / Continue / Save** (~2 s after each fill) — pages chain automatically
5. On the success page, the extension captures the IP Number
6. Click "Next IP →" in the popup — repeat

## Setup (2 minutes)

### 1. Download + unzip

Download the `esic-extension.zip` from the web tool and unzip it to a folder, e.g.:
```
C:\Users\SHAILESH PATEL\esic-extension\
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── dialog-patch.js
├── background.js
├── icon.png
└── README.md
```

### 2. Load the extension in Chrome/Edge

1. Open Chrome (or Edge)
2. Go to `chrome://extensions/` (type it in the address bar)
3. Turn on **"Developer mode"** (top-right toggle)
4. Click **"Load unpacked"**
5. Select the `esic-extension` folder
6. The extension icon appears in your toolbar

### 3. Load your queue

1. Click the extension icon in the toolbar
2. Click **"Choose queue.json"**
3. Select the `queue.json` file you exported from the web tool
4. The popup shows your first IP's details

### 4. Start auto-filling

1. Log in to ESIC normally (https://portal.esic.gov.in)
2. Navigate to Employee → Add Employee
3. The extension **auto-fills the page** within 2 seconds
4. The extension auto-fills the page, then auto-clicks **Continue / Submit / Save** for you (~2 s later)
5. The next page loads → extension auto-fills again → auto-clicks → …
6. On the bank page: pick the cheque/passbook file yourself; the extension auto-clicks **Submit** the moment you choose the file
7. On the success page, the IP Number is captured automatically
8. Click **"Next IP →"** in the popup to move to the next employee

## Features

- ✅ **Auto-fills on page load** — no buttons to click for filling
- ✅ **Handles PostBack cascades** — state → district → dispensary filled in sequence across page reloads
- ✅ **Live-form mode** — auto-clicks Submit / Continue / Save + the dashboard OK / I Agree / Close popups one after another (toggle in the popup; ON by default)
- ✅ **Confirm dialogs auto-accepted** — the "Are you sure?" prompts ESIC shows on Submit are auto-OK'd so the chain isn't blocked
- ✅ **IP Number captured** from success page (3 fallback strategies)
- ✅ **Results tracked** — see all completed IPs in the popup
- ✅ **Export results.csv** — one click, opens in Excel
- ✅ **Prev/Next IP** — navigate between employees
- ✅ **Reset** — clear everything and start over

## 🎥 Macro Recorder (self-heals when ESIC changes field IDs)

If the built-in selectors ever fail (ESIC renames a field, adds a new
page, etc.), record a macro once and the extension will replay your exact
live selectors for every other employee:

1. Load your `queue.json` (the recorder matches the values you type to
   your queue's CSV columns — so load the queue FIRST).
2. In the popup → **Macro Recorder** → click **🔴 Record**.
3. Manually fill the current employee across all pages (entry → main →
   bank → nominee → success), clicking Submit/Continue/Save yourself.
   The content script captures every field's real `id`/`name` and every
   button you click.
4. Click **⏹ Stop**. The popup shows "✓ N steps recorded".
5. Turn on **▶ Use recorded macro**.
6. Click **Next IP →** — for each subsequent employee the extension
   replays your recorded selectors with that employee's values, then the
   live-form auto-clicker fires Submit/Continue/Save. File-pick steps
   (Self Photo, bank doc) still pause for you to choose the file.

Re-record any time ESIC changes its fields — no code update needed.

## Limitations

1. **Bank document upload** — the extension CANNOT auto-upload the cheque/passbook PDF (browser security restriction). You must select the file + click Upload manually on the bank page. The extension fills all other fields.

2. **Nominee XML format** — the nominee share + family member data goes into hidden XML fields. The extension uses a best-guess format. If nominee Save fails, check DevTools Console (F12) for the actual expected format.

3. **IP Number extraction** — uses 3 fallback strategies (labeled text, element classes, headings). If it fails, the popup shows a warning — note the IP number manually and click "Next IP".

4. **ESIC may change** — if field IDs change, the extension won't find them. Check the popup for error messages.

## Troubleshooting

**"Not on an ESIC registration page"**
Make sure you're on a URL starting with `https://portal.esic.gov.in/`. The extension only runs on ESIC pages.

**Fields not filling**
- Open DevTools (F12) → Console tab
- Look for `[ESIC Auto-Fill]` messages
- Reload the page — the extension auto-fills 2 seconds after load

**PostBack fields (state/district) not progressing**
The extension fills one PostBack-triggering field at a time, then waits for the page reload. If it gets stuck, manually select the dropdown and the extension will continue on the next field.

**Need to re-fill a page**
Click the extension icon → "Fill this page now" button. The extension re-runs the fill logic.

## Privacy

- All data stays in your browser's local storage (`chrome.storage.local`)
- No data is sent to any server
- Clearing the extension's storage (Reset button) removes all data
- The queue.json you load contains employee personal data — handle it carefully
