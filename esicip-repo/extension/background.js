// ═══════════════════════════════════════════════════════════════════
//  ESIC IP Auto-Fill — Background Service Worker
//  Handles cross-tab communication and state persistence.
// ═══════════════════════════════════════════════════════════════════

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Forward ipCaptured messages to all extension pages (popup)
  if (msg.type === "ipCaptured" || msg.type === "pageChanged") {
    // The popup listens for these directly — just acknowledge
    sendResponse({ ok: true })
  }
  return true
})

// On extension install/startup, log a helpful message
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("[ESIC Auto-Fill] Extension installed. Click the extension icon to load queue.json.")
  }
})
