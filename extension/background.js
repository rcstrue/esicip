// ═══════════════════════════════════════════════════════════════════
//  ESIC IP Auto-Fill — Background Service Worker
//  Cross-tab messaging + state persistence + AUTO-UPDATE checker.
//  Every hour (and on install/startup) it fetches the manifest from
//  GitHub main, compares the version, and if newer:
//    - auto-downloads the release zip to your Downloads folder, and
//    - fires a notification to unzip over the folder + reload at
//      chrome://extensions/.
// ═══════════════════════════════════════════════════════════════════

const REPO = "rcstrue/esicip"
const GITHUB_MANIFEST_URL = `https://raw.githubusercontent.com/${REPO}/main/extension/manifest.json`
const GITHUB_RELEASE_TAG_API = `https://api.github.com/repos/${REPO}/releases/tags/`
const PAGES_URL = "https://rcstrue.github.io/esicip/"
const CHECK_INTERVAL_MIN = 60

// Forward ipCaptured / pageChanged messages (popup listens directly).
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "ipCaptured" || msg.type === "pageChanged") {
    sendResponse({ ok: true })
  }
  return true
})

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("[ESIC Auto-Fill] Installed. Click the icon → load queue.json.")
  }
  checkForUpdate()
})

// ─── Auto-update ────────────────────────────────────────────────────
chrome.alarms.create("esicUpdateCheck", { periodInMinutes: CHECK_INTERVAL_MIN })
chrome.alarms.onAlarm.addListener((a) => {
  if (a.name === "esicUpdateCheck") checkForUpdate()
})

function cmpVersion(a, b) {
  const pa = String(a).split(".").map(Number)
  const pb = String(b).split(".").map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const da = pa[i] || 0
    const db = pb[i] || 0
    if (da !== db) return da - db
  }
  return 0
}

async function checkForUpdate() {
  try {
    const res = await fetch(GITHUB_MANIFEST_URL, { cache: "no-store" })
    if (!res.ok) return
    const m = await res.json()
    const latest = m.version
    if (!latest) return
    const current = chrome.runtime.getManifest().version
    if (cmpVersion(latest, current) <= 0) return // not newer

    const state = await chrome.storage.local.get(["lastNotifiedVersion"])
    if (state.lastNotifiedVersion === latest) return // already notified

    // Try to auto-download the release zip for this version.
    let zipUrl = null
    try {
      const rr = await fetch(GITHUB_RELEASE_TAG_API + encodeURIComponent("ext-v" + latest))
      if (rr.ok) {
        const rel = await rr.json()
        const asset = (rel.assets || []).find((a) => a.name && a.name.endsWith(".zip"))
        if (asset) zipUrl = asset.browser_download_url
      }
    } catch (e) {
      console.warn("[ESIC Auto-Fill] release lookup failed:", e)
    }

    if (zipUrl) {
      chrome.downloads.download(
        { url: zipUrl, filename: `esic-extension-v${latest}.zip`, saveAs: false },
        () => notify(latest, true),
      )
    } else {
      notify(latest, false)
    }
    await chrome.storage.local.set({ lastNotifiedVersion: latest, lastUpdateVersion: latest, lastUpdateDownloaded: !!zipUrl })
  } catch (e) {
    console.warn("[ESIC Auto-Fill] update check failed:", e)
  }
}

function notify(version, downloaded) {
  chrome.notifications.create("esic-update", {
    type: "basic",
    iconUrl: "icon.png",
    title: `ESIC extension v${version} ready`,
    message: downloaded
      ? "Downloaded to your Downloads folder. Unzip over the extension folder, then reload at chrome://extensions/."
      : "Click to open the download page, then reload at chrome://extensions/.",
    priority: 2,
    buttons: [{ title: "Open chrome://extensions" }],
  })
}

chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
  if (notifId === "esic-update" && btnIdx === 0) {
    chrome.tabs.create({ url: "chrome://extensions/" })
  }
})
chrome.notifications.onClicked.addListener((notifId) => {
  if (notifId === "esic-update") chrome.tabs.create({ url: PAGES_URL })
})

// Run once on startup.
checkForUpdate()

// ─── Auto-activate the ESIC registration tab when it opens ───────────
// The dashboard's "Register/Enroll New Employee" link opens the entry page
// in a NEW TAB. Switch to it (+ focus the window) so the user sees the
// auto-fill instead of staring at the dashboard tab.
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status !== "complete") return
  const u = (tab.url || "").toLowerCase()
  const isRegPage =
    u.includes("employeecounterfoilregistration") ||
    u.includes("1registeredemployees") ||
    u.includes("empe_ip_abha") ||
    u.includes("employeebankdetails") ||
    u.includes("nomineedetails")
  if (isRegPage) {
    chrome.tabs.update(tabId, { active: true })
    chrome.tabs.get(tabId, (t) => {
      if (t && t.windowId != null) chrome.windows.update(t.windowId, { focused: true })
    })
  }
})

// ─── Right-click "Remember this field" context menu ─────────────────
// Lets the user teach the extension a field's selector on any ESIC page
// (right-click a field → "🧪 ESIC: Remember this field" → name the CSV
// column → the fill uses that selector next time). Self-serve field mapping.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "esic-teach-field",
    title: "🧪 ESIC: Remember this field",
    contexts: ["editable", "page", "link", "image"],
  })
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "esic-teach-field" && tab && tab.id != null) {
    chrome.tabs.sendMessage(tab.id, { action: "teachField" }).catch(() => {})
  }
})
