# ESIC IP Auto-Fill — Chrome Extension

A browser extension that auto-fills ESIC IP registration forms. **You** click Submit — the extension does all the typing.

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
4. **You review + click Submit** on each page
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
4. Review the filled fields
5. Click **Continue** / **Submit** / **Save** yourself
6. The next page loads → extension auto-fills again
7. On the success page, the IP Number is captured automatically
8. Click **"Next IP →"** in the popup to move to the next employee

## Features

- ✅ **Auto-fills on page load** — no buttons to click for filling
- ✅ **Handles PostBack cascades** — state → district → dispensary filled in sequence across page reloads
- ✅ **You click Submit** — full control, no automation crashes
- ✅ **IP Number captured** from success page (3 fallback strategies)
- ✅ **Results tracked** — see all completed IPs in the popup
- ✅ **Export results.csv** — one click, opens in Excel
- ✅ **Prev/Next IP** — navigate between employees
- ✅ **Reset** — clear everything and start over

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
