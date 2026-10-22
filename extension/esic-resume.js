// ═══════════════════════════════════════════════════════════════════
//  ESIC step-cursor resume runner (live, chrome.storage.local-backed).
//  Drives a plan of {name, run, postback?} steps across PostBack reloads.
//  Persists {planId, stepIndex, attempts, ipIndex} BEFORE each postback;
//  on document_idle + pageshow(persisted), reads the cursor + continues.
//  Verified on the reloading mock (tests/reload-mock/server.js).
// ═══════════════════════════════════════════════════════════════════
(function () {
  if (window.__esicResume) return
  window.__esicResume = true

  const CURSOR_KEY = "esicResumeCursor"
  const LOG_KEY = "esicResumeLog"
  const PAGE_LOG = [] // current-page log (cleared on reload)

  function log(m) {
    PAGE_LOG.push(m)
    console.log("[esic-resume] " + m)
    // persist a rolling log (last 200) so the popup can read the history
    chrome.storage.local.get([LOG_KEY], (d) => {
      const arr = d[LOG_KEY] || []
      arr.push(new Date().toISOString().slice(11, 19) + " " + m)
      while (arr.length > 200) arr.shift()
      chrome.storage.local.set({ [LOG_KEY]: arr })
    })
  }
  window.ESICResumeLog = () => PAGE_LOG.slice()

  async function getCursor() {
    const d = await chrome.storage.local.get([CURSOR_KEY])
    return d[CURSOR_KEY] || null
  }
  async function setCursor(c) {
    await chrome.storage.local.set({ [CURSOR_KEY]: c })
  }
  async function clearCursor() {
    await chrome.storage.local.set({ [CURSOR_KEY]: null })
  }

  const PLANS = {}
  window.registerResumePlan = (id, plan) => { PLANS[id] = plan }

  // Walk the plan from cursor.stepIndex. Before a postback step, persist the
  // cursor (stepIndex = i+1) so the reload resumes at the next step. After a
  // postback step triggers a reload, return — the next load's resume() continues.
  async function runPlan(planId) {
    let cursor = await getCursor()
    if (!cursor || cursor.planId !== planId) {
      cursor = { planId, stepIndex: 0, attempts: 0, ipIndex: -1 }
    }
    const plan = PLANS[planId]
    if (!plan) { log("no plan " + planId); return }
    for (let i = cursor.stepIndex; i < plan.length; i++) {
      const step = plan[i]
      if (step.postback) {
        cursor.stepIndex = i + 1
        await setCursor(cursor)
        log(`step ${i}: ${step.name} — POSTBACK (cursor=${cursor.stepIndex}, then wait for reload)`)
      } else {
        log(`step ${i}: ${step.name}`)
      }
      let triggered = false
      try {
        triggered = await step.run(cursor)
      } catch (e) {
        log(`step ${i} threw: ${e.message}`)
        triggered = false
      }
      if (step.postback && triggered) {
        log(`postback triggered → returning (reload will resume at ${cursor.stepIndex})`)
        return
      }
      cursor.stepIndex = i + 1
      await setCursor(cursor)
    }
    log("✓ PLAN COMPLETE — " + planId)
    await clearCursor()
    chrome.runtime.sendMessage({ type: "resumeDone", planId })
  }

  async function resume() {
    const cursor = await getCursor()
    if (!cursor) return // nothing to resume
    // only resume if autoClick/live-form is on AND there's an active queue
    const st = await chrome.storage.local.get(["queue", "currentIndex", "useResumeFill"])
    if (st.useResumeFill === false) return // opt-out
    if (!st.queue || !st.queue.length) return
    log(`load: resume planId=${cursor.planId} stepIndex=${cursor.stepIndex} ipIndex=${cursor.ipIndex}`)
    await runPlan(cursor.planId)
  }
  window.ESICResume = resume
  window.ESICRunPlan = runPlan
  window.ESICClearResume = clearCursor

  // On load (document_idle ≈ DOMContentLoaded + a tick) + pageshow(persisted).
  function scheduleResume() { setTimeout(resume, 200) }
  if (document.readyState === "complete" || document.readyState === "interactive") scheduleResume()
  else document.addEventListener("DOMContentLoaded", scheduleResume)
  window.addEventListener("pageshow", (e) => { if (e.persisted) scheduleResume() })
  log("loaded; readyState=" + document.readyState)
})()
