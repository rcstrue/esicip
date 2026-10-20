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
}

// ─── Load state from chrome.storage on popup open ──────────────────
async function loadState() {
  const data = await chrome.storage.local.get([
    "queue",
    "currentIndex",
    "results",
    "currentPage",
    "lastFillResult",
  ])
  state.queue = data.queue || []
  state.currentIndex = data.currentIndex || 0
  state.results = data.results || []
  state.currentPage = data.currentPage || "unknown"
  state.lastFillResult = data.lastFillResult || null
  render()
}

async function saveState() {
  await chrome.storage.local.set({
    queue: state.queue,
    currentIndex: state.currentIndex,
    results: state.results,
    currentPage: state.currentPage,
    lastFillResult: state.lastFillResult,
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
  try {
    const text = await file.text()
    const queue = JSON.parse(text)
    if (!queue.items || !Array.isArray(queue.items)) {
      throw new Error("Invalid queue.json — missing 'items' array")
    }
    state.queue = queue.items
    state.currentIndex = 0
    state.results = []
    state.currentPage = "unknown"
    state.lastFillResult = null
    await saveState()
    render()
    // Trigger fill on the current tab
    await sendMessageToTab({ action: "fillPage" })
  } catch (err) {
    alert("Failed to load queue.json: " + err.message)
  }
})

// ─── Fill current page ─────────────────────────────────────────────
$("fill-btn").addEventListener("click", async () => {
  await sendMessageToTab({ action: "fillPage" })
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
        document.querySelectorAll("input, select, textarea").forEach((el) => {
          if (el.type === "hidden" || el.type === "submit" || el.type === "button" || el.type === "image") return
          const label = (() => {
            // Try to find associated label
            if (el.id) {
              const lbl = document.querySelector(`label[for="${el.id}"]`)
              if (lbl) return lbl.textContent.trim()
            }
            // Walk up to find nearby text
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
        return {
          url: location.href,
          title: document.title,
          fieldCount: fields.length,
          fields: fields,
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

      // Copy to clipboard
      await navigator.clipboard.writeText(text)
      alert(`✓ Page diagnostic copied to clipboard!\n\n${diag.fieldCount} fields found.\n\nPlease paste it (Ctrl+V) into our chat so I can fix the fill logic.`)
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
