import { parseWorkbook, parseCSV, validateRows, summarize, buildQueue } from "./lib.bundle.js"

// ═══════════════════════════════════════════════════════════════════
//  ESIC IP Auto-Fill — Popup script
//  Manages the extension popup UI and communicates with content.js
// ═══════════════════════════════════════════════════════════════════

const $ = (id) => document.getElementById(id)

// ─── State ─────────────────────────────────────────────────────────
let state = {
  queue: [],
  currentIndex: 0,
  results: [],
  currentPage: "unknown",
  lastFillResult: null,
  autoClickMode: true, // 🤖 live-form mode: auto-click Submit/Continue/Save + dashboard popups
  useMacro: false, // ▶ replay recorded selectors instead of built-in map
  recording: false, // 🎥 currently recording a macro
  macroStepCount: 0,
}

// ─── Load state from chrome.storage on popup open ──────────────────
async function loadState() {
  const data = await chrome.storage.local.get([
    "queue",
    "currentIndex",
    "results",
    "currentPage",
    "lastFillResult",
    "autoClickMode",
    "useMacro",
    "recording",
    "macro",
  ])
  state.queue = data.queue || []
  state.currentIndex = data.currentIndex || 0
  state.results = data.results || []
  state.currentPage = data.currentPage || "unknown"
  state.lastFillResult = data.lastFillResult || null
  state.autoClickMode = data.autoClickMode !== false // default ON
  state.useMacro = !!data.useMacro
  state.recording = !!data.recording
  state.macroStepCount = (data.macro && Array.isArray(data.macro.steps)) ? data.macro.steps.length : 0
  render()
}

async function saveState() {
  await chrome.storage.local.set({
    queue: state.queue,
    currentIndex: state.currentIndex,
    results: state.results,
    currentPage: state.currentPage,
    lastFillResult: state.lastFillResult,
    autoClickMode: state.autoClickMode,
    useMacro: state.useMacro,
  })
}

// ─── Render ────────────────────────────────────────────────────────
function render() {
  if (state.queue.length === 0) {
    $("no-queue").style.display = "block"
    $("main-view").style.display = "none"
    return
  }

  $("no-queue").style.display = "none"
  $("main-view").style.display = "block"

  const item = state.queue[state.currentIndex]
  if (item) {
    const d = item.normalized
    $("ip-name").textContent = d.EmpName
    $("ip-meta").textContent = `${d.Gender} · ${d.IFSCCode} · Row ${item.rowIndex}`
    $("progress").textContent = `IP ${state.currentIndex + 1} of ${state.queue.length}`
  } else {
    $("ip-name").textContent = "All done!"
    $("ip-meta").textContent = ""
    $("progress").textContent = `${state.queue.length} IPs processed`
  }

  // Page indicator dots
  const pages = ["entry", "main", "bank", "nominee", "success"]
  pages.forEach((p) => {
    const dot = $(`dot-${p}`)
    dot.classList.remove("active", "done")
    const idx = pages.indexOf(state.currentPage)
    const myIdx = pages.indexOf(p)
    if (myIdx < idx) dot.classList.add("done")
    else if (myIdx === idx) dot.classList.add("active")
  })

  // 🤖 Auto-click toggle
  const toggle = $("autoclick-toggle")
  const row = $("autoclick-row")
  if (toggle) {
    toggle.checked = !!state.autoClickMode
    if (row) row.classList.toggle("off", !state.autoClickMode)
  }

  // ▶ Macro recorder
  const useT = $("usemacro-toggle")
  const useRow = $("usemacro-row")
  if (useT) {
    useT.checked = !!state.useMacro
    if (useRow) useRow.classList.toggle("off", !state.useMacro)
  }
  const mStat = $("macro-status")
  if (mStat) {
    if (state.recording) {
      mStat.style.display = "block"
      mStat.className = "status-msg status-warning"
      mStat.textContent = `🔴 Recording… ${state.macroStepCount} step(s) captured. Fill the current employee manually, then click Stop.`
    } else if (state.macroStepCount > 0) {
      mStat.style.display = "block"
      mStat.className = "status-msg status-success"
      mStat.textContent = `✓ ${state.macroStepCount} step(s) recorded${state.useMacro ? " · replaying" : ""}.`
    } else {
      mStat.style.display = "none"
    }
  }

  // Page status
  const pageNames = {
    entry: "Page 1/5 — Entry (ESI allotted?)",
    main: "Page 2/5 — Main form (personal details)",
    bank: "Page 3/5 — Bank details",
    nominee: "Page 4/5 — Nominee details",
    success: "Page 5/5 — Success (IP Number generated)",
    unknown: "Not on an ESIC registration page",
  }
  $("page-status").textContent = pageNames[state.currentPage] || state.currentPage

  // Status message
  const msg = $("status-msg")
  if (state.lastFillResult) {
    msg.style.display = "block"
    msg.className = `status-msg status-${state.lastFillResult.type}`
    msg.textContent = state.lastFillResult.message
  } else {
    msg.style.display = "none"
  }

  // Results
  $("results-count").textContent = state.results.length
  const list = $("results-list")
  list.innerHTML = ""
  for (const r of state.results.slice().reverse()) {
    const div = document.createElement("div")
    div.className = "result-item"
    if (r.status === "success") {
      div.innerHTML = `<span>${r.empName}</span><span class="ip">${r.ipNumber}</span>`
    } else {
      div.innerHTML = `<span>${r.empName}</span><span class="err">${r.status}</span>`
    }
    list.appendChild(div)
  }
}

// ─── Load queue.json ───────────────────────────────────────────────
$("load-btn").addEventListener("click", () => $("file-input").click())

$("file-input").addEventListener("change", async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const summary = $("load-summary")
  if (summary) {
    summary.style.display = "block"
    summary.className = "status-msg status-info"
    summary.textContent = "Loading " + file.name + "…"
  }
  try {
    const name = (file.name || "").toLowerCase()
    let items = null
    let validationSummary = null
    if (name.endsWith(".json")) {
      const queue = JSON.parse(await file.text())
      if (!queue.items || !Array.isArray(queue.items)) {
        throw new Error("Invalid queue.json — missing 'items' array")
      }
      items = queue.items
    } else if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
      const buf = await file.arrayBuffer()
      const { rows } = parseWorkbook(buf)
      if (rows.length === 0) throw new Error("Spreadsheet has no data rows")
      const validated = validateRows(rows)
      validationSummary = summarize(validated)
      items = buildQueue(validated).items
    } else if (name.endsWith(".csv")) {
      const { rows } = parseCSV(await file.text())
      if (rows.length === 0) throw new Error("CSV has no data rows")
      const validated = validateRows(rows)
      validationSummary = summarize(validated)
      items = buildQueue(validated).items
    } else {
      throw new Error("Unsupported file. Use .xlsx, .csv, or queue.json.")
    }
    if (!items || items.length === 0) {
      const s = validationSummary
      throw new Error(
        s
          ? "No ready/warning rows (0 ready, " + s.error + " error). Fix the issues in the file and reload."
          : "No items to process."
      )
    }
    state.queue = items
    state.currentIndex = 0
    state.results = []
    state.currentPage = "unknown"
    state.lastFillResult = null
    await saveState()
    render()
    if (summary && validationSummary) {
      const s = validationSummary
      summary.className = "status-msg status-success"
      summary.textContent =
        "✓ " + s.total + " row(s): " + s.ready + " ready, " + s.warning + " warning, " + s.error + " error → " + items.length + " queued"
    } else if (summary) {
      summary.className = "status-msg status-success"
      summary.textContent = "✓ Loaded " + items.length + " item(s) from queue.json"
    }
    // Trigger fill on the current tab
    await sendMessageToTab({ action: "fillPage" })
  } catch (err) {
    if (summary) {
      summary.className = "status-msg status-error"
      summary.textContent = "Failed: " + err.message
    } else {
      alert("Failed: " + err.message)
    }
  }
})

// ─── Fill current page ─────────────────────────────────────────────
$("fill-btn").addEventListener("click", async () => {
  await sendMessageToTab({ action: "fillPage" })
})

// ─── 🤖 Auto-click all buttons (live form) toggle ──────────────────
$("autoclick-toggle").addEventListener("change", async (e) => {
  state.autoClickMode = e.target.checked
  await saveState()
  render()
  // Re-trigger the current page fill so the auto-click kicks in immediately
  if (state.autoClickMode) await sendMessageToTab({ action: "fillPage" })
})

// ─── ▶ Macro Recorder controls ─────────────────────────────────────
$("record-btn").addEventListener("click", async () => {
  await chrome.storage.local.set({ recording: true, macro: { steps: [], version: 1, learnedAt: Date.now() }, replayCursor: 0 })
  state.recording = true
  state.macroStepCount = 0
  render()
  await sendMessageToTab({ action: "startRecording" })
})

$("stop-btn").addEventListener("click", async () => {
  await sendMessageToTab({ action: "stopRecording" })
  await new Promise((r) => setTimeout(r, 300))
  const data = await chrome.storage.local.get(["macro"])
  state.recording = false
  state.macroStepCount = (data.macro && data.macro.steps) ? data.macro.steps.length : 0
  await chrome.storage.local.set({ recording: false })
  render()
})

$("usemacro-toggle").addEventListener("change", async (e) => {
  state.useMacro = e.target.checked
  await saveState()
  await chrome.storage.local.set({ replayCursor: 0, lastReplayIndex: -1 })
  render()
  if (state.useMacro) await sendMessageToTab({ action: "fillPage" })
})

$("clearmacro-btn").addEventListener("click", async () => {
  if (!confirm("Clear the recorded macro?")) return
  await sendMessageToTab({ action: "clearMacro" })
  state.recording = false
  state.macroStepCount = 0
  state.useMacro = false
  await saveState()
  await chrome.storage.local.set({ macro: null, recording: false, replayCursor: 0, lastReplayIndex: -1 })
  render()
})

// ─── Diagnose page (for debugging — dumps all fields) ──────────────
$("diag-btn").addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab) {
      alert("No active tab found.")
      return
    }
    // Inject a diagnostic script into the page
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const fields = []
        // Collect all inputs
        document.querySelectorAll("input, select, textarea, button").forEach((el) => {
          if (el.type === "hidden") return
          const label = (() => {
            if (el.id) {
              const lbl = document.querySelector(`label[for="${el.id}"]`)
              if (lbl) return lbl.textContent.trim()
            }
            let parent = el.closest("td, div, li")
            if (parent) {
              const prev = parent.previousElementSibling
              if (prev && prev.textContent.trim()) return prev.textContent.trim().slice(0, 50)
            }
            return el.placeholder || el.name || ""
          })()
          fields.push({
            tag: el.tagName,
            type: el.type || "",
            id: el.id || "",
            name: el.name || "",
            label: label,
            value: el.value || "",
            disabled: el.disabled,
            maxlength: el.maxLength > 0 ? el.maxLength : "",
            options: el.tagName === "SELECT" ? Array.from(el.options).slice(0, 5).map(o => `${o.value}=${o.text}`) : [],
          })
        })
        // ALSO collect clickable elements: <a>, <img>, divs with onclick
        const clickables = []
        document.querySelectorAll('a, img[onclick], div[onclick], span[onclick], td[onclick], li[onclick], [role="button"], [role="menuitem"], [role="link"], area').forEach((el) => {
          const text = (el.textContent || el.alt || el.title || "").trim()
          if (!text) return // skip empty
          clickables.push({
            tag: el.tagName,
            id: el.id || "",
            text: text.slice(0, 80),
            href: el.href || el.src || "",
            onclick: el.onclick ? "yes" : "",
          })
        })
        return {
          url: location.href,
          title: document.title,
          fieldCount: fields.length,
          fields: fields,
          clickableCount: clickables.length,
          clickables: clickables,
        }
      },
    })
    if (results && results[0]) {
      const diag = results[0].result
      // Format as readable text
      let text = `=== ESIC PAGE DIAGNOSTIC ===\n`
      text += `URL: ${diag.url}\n`
      text += `Title: ${diag.title}\n`
      text += `Field count: ${diag.fieldCount}\n`
      text += `Time: ${new Date().toISOString()}\n\n`
      text += `=== FIELDS ===\n`
      for (const f of diag.fields) {
        text += `\n[${f.tag}${f.type ? " type=" + f.type : ""}]\n`
        text += `  id: ${f.id || "(none)"}\n`
        text += `  name: ${f.name || "(none)"}\n`
        text += `  label: ${f.label || "(none)"}\n`
        text += `  value: "${f.value}"\n`
        text += `  disabled: ${f.disabled}\n`
        if (f.maxlength) text += `  maxlength: ${f.maxlength}\n`
        if (f.options && f.options.length > 0) {
          text += `  options: ${f.options.join(" | ")}\n`
        }
      }
      text += `\n=== END DIAGNOSTIC ===\n`

      // Add clickable elements section
      if (diag.clickables && diag.clickables.length > 0) {
        text += `\n=== CLICKABLE ELEMENTS (${diag.clickableCount}) ===\n`
        for (const c of diag.clickables.slice(0, 50)) {
          text += `\n[${c.tag}]\n`
          text += `  id: ${c.id || "(none)"}\n`
          text += `  text: ${c.text}\n`
          if (c.href) text += `  href/src: ${c.href}\n`
          if (c.onclick) text += `  has onclick: yes\n`
        }
        text += `\n=== END CLICKABLE ===\n`
      }

      // Copy to clipboard
      await navigator.clipboard.writeText(text)
      alert(`✓ Page diagnostic copied to clipboard!\n\n${diag.fieldCount} fields + ${diag.clickableCount || 0} clickable elements found.\n\nPlease paste it (Ctrl+V) into our chat so I can fix the fill logic.`)
      console.log("[ESIC Auto-Fill] Diagnostic:", text)
    }
  } catch (err) {
    alert("Diagnose failed: " + err.message + "\n\nMake sure you're on an ESIC page (portal.esic.gov.in).")
  }
})

// ─── Previous / Next IP ────────────────────────────────────────────
$("prev-btn").addEventListener("click", async () => {
  if (state.currentIndex > 0) {
    state.currentIndex--
    state.currentPage = "unknown"
    state.lastFillResult = null
    await saveState()
    render()
    await sendMessageToTab({ action: "fillPage" })
  }
})

$("next-btn").addEventListener("click", async () => {
  // Mark current as skipped if not already in results
  const existing = state.results.find(
    (r) => r.rowIndex === state.queue[state.currentIndex]?.rowIndex,
  )
  if (!existing && state.queue[state.currentIndex]) {
    state.results.push({
      rowIndex: state.queue[state.currentIndex].rowIndex,
      empName: state.queue[state.currentIndex].normalized.EmpName,
      ipNumber: "",
      status: "skipped",
      timestamp: new Date().toISOString(),
    })
  }
  if (state.currentIndex < state.queue.length - 1) {
    state.currentIndex++
    state.currentPage = "unknown"
    state.lastFillResult = null
    await saveState()
    render()
    await sendMessageToTab({ action: "fillPage" })
  } else {
    await saveState()
    render()
    alert("All IPs processed! Export your results below.")
  }
})

// ─── Reset ─────────────────────────────────────────────────────────
$("reset-btn").addEventListener("click", async () => {
  if (!confirm("Reset everything? This clears the queue and all results.")) return
  state.queue = []
  state.currentIndex = 0
  state.results = []
  state.currentPage = "unknown"
  state.lastFillResult = null
  await chrome.storage.local.clear()
  render()
})

// ─── Export results.csv ────────────────────────────────────────────
$("export-btn").addEventListener("click", () => {
  const headers = ["rowIndex", "empName", "ipNumber", "status", "timestamp"]
  const lines = [headers.join(",")]
  for (const r of state.results) {
    const row = headers.map((h) => {
      const v = String(r[h] ?? "").replace(/"/g, '""')
      return v.includes(",") ? `"${v}"` : v
    })
    lines.push(row.join(","))
  }
  const csv = lines.join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "esic-results.csv"
  a.click()
  URL.revokeObjectURL(url)
})

// ─── Check for updates ─────────────────────────────────────────────
const GITHUB_MANIFEST_URL = "https://raw.githubusercontent.com/rcstrue/esicip/main/extension/manifest.json"
const GITHUB_ZIP_URL = "https://rcstrue.github.io/esicip/"  // live site — always serves the latest extension

$("check-update-btn").addEventListener("click", async () => {
  const status = $("update-status")
  status.style.display = "block"
  status.className = "status-msg status-info"
  status.textContent = "Checking for updates..."

  try {
    const res = await fetch(GITHUB_MANIFEST_URL, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const manifest = await res.json()

    const currentVersion = chrome.runtime.getManifest().version
    const latestVersion = manifest.version

    if (currentVersion === latestVersion) {
      status.className = "status-msg status-success"
      status.textContent = `✓ You're on the latest version (${currentVersion})`
    } else {
      status.className = "status-msg status-warning"
      status.innerHTML = `⬆ Update available! You have v${currentVersion}, latest is v${latestVersion}.<br/><br/>` +
        `<a href="${GITHUB_ZIP_URL}" target="_blank" style="color:#1e40af;font-weight:500;">Download esic-extension.zip</a><br/><br/>` +
        `Then: unzip to same folder → go to chrome://extensions/ → click 🔄 reload`
    }
  } catch (err) {
    status.className = "status-msg status-error"
    status.textContent = `Could not check for updates: ${err.message}. Make sure you're online and the GitHub repo is public.`
  }
})

// ─── Send message to active tab's content script ───────────────────
async function sendMessageToTab(message) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab) return
    const response = await chrome.tabs.sendMessage(tab.id, message)
    if (response) {
      if (response.currentPage) state.currentPage = response.currentPage
      if (response.fillResult) state.lastFillResult = response.fillResult
      // Check for IP number capture
      if (response.ipNumber) {
        const item = state.queue[state.currentIndex]
        if (item) {
          // Remove existing result for this row
          state.results = state.results.filter((r) => r.rowIndex !== item.rowIndex)
          state.results.push({
            rowIndex: item.rowIndex,
            empName: item.normalized.EmpName,
            ipNumber: response.ipNumber,
            status: "success",
            timestamp: new Date().toISOString(),
          })
          // Auto-advance to next IP
          if (state.currentIndex < state.queue.length - 1) {
            state.currentIndex++
            state.currentPage = "unknown"
          }
        }
      }
      await saveState()
      render()
    }
  } catch (err) {
    // Content script not loaded on this tab (e.g., not an ESIC page)
    state.lastFillResult = {
      type: "error",
      message: "Not on an ESIC page. Open the ESIC portal and navigate to Add Employee.",
    }
    state.currentPage = "unknown"
    await saveState()
    render()
  }
}

// ─── Listen for messages from content script (e.g., IP captured) ───
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "ipCaptured") {
    const item = state.queue[state.currentIndex]
    if (item) {
      state.results = state.results.filter((r) => r.rowIndex !== item.rowIndex)
      state.results.push({
        rowIndex: item.rowIndex,
        empName: item.normalized.EmpName,
        ipNumber: msg.ipNumber,
        status: "success",
        timestamp: new Date().toISOString(),
      })
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex++
        state.currentPage = "unknown"
      }
    }
    await saveState()
    render()
    sendResponse({ ok: true })
  } else if (msg.type === "pageChanged") {
    state.currentPage = msg.page
    if (msg.fillResult) state.lastFillResult = msg.fillResult
    await saveState()
    render()
    sendResponse({ ok: true })
  }
  return true
})

// ─── Init ──────────────────────────────────────────────────────────
loadState()
