# ESIC IP Bulk Registration Helper

A Chrome extension + web tool that auto-fills ESIC IP (Insured Person) registration forms.
You load a `queue.json` with employee data, navigate to ESIC's Add Employee page, and the
extension fills every field automatically. You just click Submit/Continue/Save.

## What it does

- ✅ Auto-fills **all 4 ESIC registration pages**: Entry → Aadhaar → Main form → Bank → Nominee
- ✅ Handles ASP.NET PostBack cascades (State → District → Dispensary)
- ✅ Waits for AJAX-loaded dropdowns (up to 15s per dropdown)
- ✅ Auto-dismisses dashboard modal popups
- ✅ Captures the generated 10-digit IP Number from the success page
- ✅ Tracks results — export to CSV with one click
- ✅ One-click update check from the extension popup

## Quick start

### 1. Load the extension

1. Download this repo (or clone it)
2. Open `chrome://extensions/` in Chrome/Edge
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select the `extension/` folder
5. The ESIC icon appears in your toolbar

### 2. Prepare your data

Use the [ESIC Helper Web Tool](https://rcstrue.github.io/esicip/) to:
- Download the CSV template
- Fill in your employee data
- Validate (catches errors before submitting to ESIC)
- Export `queue.json`

### 3. Start filling

1. Click the extension icon → **Choose queue.json** → select your file
2. Log in to https://portal.esic.gov.in
3. Navigate to **Employee → Add Employee**
4. The extension auto-fills every field
5. You click **Continue / Submit / Save** on each page
6. On the success page, the IP Number is captured automatically
7. Click **Next IP →** in the popup to continue

## Files

```
esicip/
├── extension/          ← Chrome extension (load this folder in Chrome)
│   ├── manifest.json
│   ├── popup.html      ← Extension popup UI
│   ├── popup.js        ← Popup logic + update checker
│   ├── content.js      ← Auto-fill logic (runs on ESIC pages)
│   ├── background.js   ← Service worker
│   ├── icon.png
│   └── README.md       ← Detailed extension docs
├── README.md           ← This file
├── .gitignore
└── SETUP.md            ← GitHub Pages setup instructions
```

## Update flow

When a new version is released:
1. `git pull` this repo (or download the zip)
2. Go to `chrome://extensions/` → click 🔄 reload on the extension
3. Or use the **"🔍 Check for updates"** button in the extension popup

## Limitations

- **Bank document upload** — the extension cannot auto-upload the cheque/passbook PDF
  (browser security restriction). You select the file + click Upload manually.
- **Nominee XML** — uses a best-guess format. If nominee Save fails, inspect the actual
  `NomineeXmldata` hidden field via DevTools and adjust `fillNominee()` in content.js.
- **IP Number extraction** — uses 3 fallback strategies. If all fail, note the number manually.
- **ESIC may change** — field IDs / page flow can change without notice.

## Privacy

- All data stays in your browser's local storage (`chrome.storage.local`)
- No data is sent to any server
- The update checker only fetches `manifest.json` from GitHub (no user data)

## License

Personal use. Not affiliated with ESIC. Use responsibly per ESIC's terms of service.
