// ═══════════════════════════════════════════════════════════════════
//  ESIC IP Auto-Fill — Dialog auto-accept patch
//  Runs in the PAGE (MAIN) world so it can intercept window.confirm /
//  window.alert / window.prompt that ESIC pops on Submit/Save/Continue.
//
//  Only auto-accepts when the content script has set
//    <html data-esic-auto-confirm="1">  (i.e. Live-form mode is ON).
//  Otherwise the original browser dialogs are used unchanged.
// ═══════════════════════════════════════════════════════════════════
(function () {
  if (window.__esicDialogPatch) return
  window.__esicDialogPatch = true

  var isAuto = function () {
    try {
      return document.documentElement.dataset.esicAutoConfirm === "1"
    } catch (e) {
      return false
    }
  }

  var origConfirm = window.confirm
  var origAlert = window.alert
  var origPrompt = window.prompt

  window.confirm = function (msg) {
    if (isAuto()) {
      console.log("[ESIC Auto-Fill] auto-confirmed:", msg)
      return true
    }
    return origConfirm.call(this, msg)
  }

  window.alert = function (msg) {
    if (isAuto()) {
      console.log("[ESIC Auto-Fill] auto-alerted:", msg)
      return undefined
    }
    return origAlert.call(this, msg)
  }

  window.prompt = function (msg, def) {
    if (isAuto()) {
      console.log("[ESIC Auto-Fill] auto-prompted:", msg)
      return def || ""
    }
    return origPrompt.call(this, msg, def)
  }

  console.log("[ESIC Auto-Fill] dialog patch installed (MAIN world)")
})()
