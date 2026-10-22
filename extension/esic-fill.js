// ═══════════════════════════════════════════════════════════════════
//  ESIC main-form fill driver — PURE, chrome.*-free.
//  Shares the content-script context (loaded via manifest before content.js)
//  AND is injectable into tests/mock-main-form.html for local verification.
//  Implements: same-pass non-postback fill (language/text), geo interop
//  (state→change→districts→district→change→verify hidden code), dispensary
//  ID matching. The live content.js wraps this with the step-cursor resume.
// ═══════════════════════════════════════════════════════════════════
(function () {
  if (window.__esicFill) return // guard against double-load
  window.__esicFill = true

  const LOG = []
  const log = (m) => { LOG.push(m); if (window.__esicLogHook) window.__esicLogHook(m) }
  window.ESICFillLog = () => LOG.slice()

  const $ = (id) => document.getElementById(id)
  function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }
  function norm(s) { return (s || "").toLowerCase().replace(/\s+/g, " ").replace(/[.,&]/g, "").trim() }

  function setTextInput(id, value) {
    const el = $(id)
    if (!el) { log(`MISSING ${id}`); return false }
    if (el.disabled) { log(`skip ${id} (disabled)`); return false }
    if (el.value === String(value)) { log(`skip ${id} (already)`); return true }
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
      || Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set
    if (setter) setter.call(el, String(value)); else el.value = String(value)
    el.dispatchEvent(new Event("input", { bubbles: true }))
    el.dispatchEvent(new Event("change", { bubbles: true })) // RestrictSpace trims on change
    el.dispatchEvent(new Event("blur", { bubbles: true }))
    log(`filled ${id}="${value}"`)
    return true
  }

  function setSelectByLabel(id, label) {
    const el = $(id)
    if (!el) { log(`MISSING ${id}`); return false }
    for (const opt of el.options) {
      if (norm(opt.text) === norm(label) || norm(opt.value) === norm(label)) {
        el.value = opt.value
        el.dispatchEvent(new Event("change", { bubbles: true }))
        log(`select ${id}="${label}" (value=${opt.value}, idx=${el.selectedIndex})`)
        return true
      }
    }
    log(`SELECTION NOT APPLIED ${id}: "${label}" not in [${Array.from(el.options).slice(0, 5).map((o) => o.text).join(" | ")}]`)
    return false
  }

  function setSelectByValue(id, value) {
    const el = $(id)
    if (!el) { log(`MISSING ${id}`); return false }
    for (const opt of el.options) {
      if (String(opt.value) === String(value)) {
        el.value = opt.value
        el.dispatchEvent(new Event("change", { bubbles: true }))
        log(`select ${id} by value="${value}" (idx=${el.selectedIndex})`)
        return true
      }
    }
    log(`SELECTION NOT APPLIED ${id}: value "${value}" not in [${Array.from(el.options).slice(0, 5).map((o) => o.value).join(" | ")}]`)
    return false
  }

  function setRadioById(id) {
    const el = $(id)
    if (!el) { log(`MISSING radio ${id}`); return false }
    if (el.checked) { log(`skip ${id} (already checked)`); return true }
    el.checked = true
    el.dispatchEvent(new Event("change", { bubbles: true }))
    el.dispatchEvent(new Event("click", { bubbles: true }))
    log(`radio ${id} clicked`)
    return true
  }

  function getHidden(id) {
    const el = $(id)
    return el ? (el.value || el.textContent || "").trim() : ""
  }

  // ─── Geo interop: state(name) → change → districts load → district → change → verify hidden code ──
  async function fillGeo(stateId, districtId, hiddenStateId, hiddenDistrictId, stateName, districtName) {
    const stateEl = $(stateId)
    if (!stateEl) { log(`MISSING state ${stateId}`); return false }
    // Set state by NAME (present/permanent state select option value == name).
    if (!setSelectByLabel(stateId, stateName)) return false
    // selectPresentStates()/selectPermanentStates() runs on change synchronously in the mock;
    // on live it PostBacks — the content.js wrapper resumes. Here, poll for district options.
    const distEl = $(districtId)
    const loaded = await waitFor(() => distEl && distEl.options.length > 1, 5000)
    if (!loaded) { log(`FAIL ${districtId} options didn't load after state change`); return false }
    if (!setSelectByLabel(districtId, districtName)) return false
    // selectpresentDistrict() writes the numeric code on change:
    distEl.dispatchEvent(new Event("change", { bubbles: true }))
    await sleep(40)
    let code = getHidden(hiddenDistrictId)
    if (!code || code === "(empty)") {
      log(`WARN ${hiddenDistrictId} empty — retry change`)
      distEl.dispatchEvent(new Event("change", { bubbles: true }))
      await sleep(40)
      code = getHidden(hiddenDistrictId)
    }
    log(`geo ${stateId}: state=${stateName} district=${districtName} hiddenCode=${code || "(empty)"}`)
    return !!(code && code !== "(empty)")
  }

  // ─── Dispensary chain: state(code) → district(name) → [type radio] → dispensary(by ID) ──
  async function fillDispensary(stateId, districtId, dispensarySelId, typeRadioPrefix, stateCode, districtName, dispensaryId) {
    if (!setSelectByValue(stateId, String(stateCode))) return false // numeric code
    await sleep(40) // loadDispDistricts
    if (!setSelectByLabel(districtId, districtName)) return false
    await sleep(40) // loadDispensaries
    const dispEl = $(dispensarySelId)
    const loaded = await waitFor(() => dispEl && dispEl.options.length > 1, 5000)
    if (!loaded) { log(`FAIL ${dispensarySelId} options didn't load`); return false }
    // Match by ID; if a name matches >1 option, STOP (never guess).
    let matched = null
    let ambig = []
    for (const opt of dispEl.options) {
      if (String(opt.value) === String(dispensaryId)) matched = opt
      // (name-based ambiguity detection would go here)
    }
    if (!matched) {
      log(`FAIL dispensary id ${dispensaryId} not found; options: ${Array.from(dispEl.options).slice(0, 5).map((o) => o.value + ":" + o.text).join(" | ")}`)
      return false
    }
    dispEl.value = matched.value
    dispEl.dispatchEvent(new Event("change", { bubbles: true }))
    log(`dispensary ${dispensarySelId}: id=${dispensaryId}`)
    return true
  }

  async function waitFor(pred, timeoutMs, intervalMs = 150) {
    const start = Date.now()
    while (Date.now() - start < timeoutMs) { if (await pred()) return true; await sleep(intervalMs) }
    return false
  }

  // ─── Main driver ───────────────────────────────────────────────────
  async function fillMainForm(item) {
    LOG.length = 0
    const n = item.normalized || item
    log("=== fillMainForm start ===")

    // 1. marital select (+change; no postback) → assignGender verifies
    setSelectByLabel("ctl00_HomePageContent_ctrlRDMarried", n.MaritalStatus)
    await sleep(20)
    // 2. gender + Father/Husband radios (mock: no postback)
    const gMap = { M: "_0", F: "_1", TG: "_2" }
    setRadioById("ctl00_HomePageContent_ctrlRDMale" + (gMap[n.Gender] || "_0"))
    setRadioById("ctl00_HomePageContent_ctrlFatherOrHus_" + (n.RelationType === "Husband" ? "1" : "0"))

    // 7. SAME-PASS non-postback fill: name, father, present addr/pin, DOA, DOB, language
    setTextInput("ctl00_HomePageContent_ctrlTextEmpName", n.EmpName)
    setTextInput("ctl00_HomePageContent_ctrlTextFatherHusName", n.FatherOrHusbandName)
    setTextInput("ctl00_HomePageContent_ctrlTextPresentAddress1", n.PresentAddress)
    setTextInput("ctl00_HomePageContent_ctrlTxtPresentPinCode", n.PinCode)
    setTextInput("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy", n.AppointmentDate)
    setTextInput("ctl00_HomePageContent_ctrlTxtIpDate", n.DOB) // readonly — native setter + change
    setSelectByLabel("ctl00_HomePageContent_ddllanguage", n.SMSLanguage) // PLAIN select — the canary

    // Present geo (state name → district → hidden code)
    await fillGeo("ctl00_HomePageContent_ctrlTxtPresentState", "ctl00_HomePageContent_ctrlTextPresentDistrict",
      "hidpresentdenState", "hiddenpresentdistrict", n.PresentState, n.PresentDistrict)

    // Permanent (explicit — NO Copy checkbox)
    setTextInput("ctl00_HomePageContent_ctrlTextPermanentAddress1", n.PermanentAddress)
    setTextInput("ctl00_HomePageContent_ctrlTextPermanentPinCode", n.PermanentPinCode)
    await fillGeo("ctl00_HomePageContent_ctrlTextPermanentState", "ctl00_HomePageContent_ctrlTextPermanentDistrict",
      "hidpermenantState", "hiddenpermenantdistrict", n.PermanentState, n.PermanentDistrict)

    // 3. Employee dispensary chain (state CODE → district → dispensary by ID)
    const dTypeMap = { Dispensary: "_0", IMP: "_1", EMud: "_2" }
    if (n.DispensaryType && n.DispensaryType !== "Dispensary") {
      setRadioById("ctl00_HomePageContent_ctrlRBDispensaryIMP" + (dTypeMap[n.DispensaryType] || "_0"))
    }
    await fillDispensary("ctl00_HomePageContent_ddlDispensaryState", "ctl00_HomePageContent_ddlDispensaryDistrict",
      "ctl00_HomePageContent_ctrlTextDispensary", "ctl00_HomePageContent_ctrlRBDispensaryIMP",
      n.DispensaryState, n.DispensaryDistrict, n.DispensaryId)

    // 8. declaration click (only if unchecked) + verify
    const chk = $("ctl00_HomePageContent_dec_chkbox")
    if (chk && !chk.checked) { chk.click(); log("declaration clicked") }
    await sleep(20)
    log(`declaration checked=${chk ? chk.checked : "no-el"}`)

    // 9. pre-submit check
    const pre = {
      name: $("ctl00_HomePageContent_ctrlTextEmpName")?.value,
      father: $("ctl00_HomePageContent_ctrlTextFatherHusName")?.value,
      dob: $("ctl00_HomePageContent_ctrlTxtIpDate")?.value,
      doa: $("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy")?.value,
      language: $("ctl00_HomePageContent_ddllanguage")?.selectedIndex,
      presentStateCode: getHidden("hidpresentdenState"),
      presentDistrictCode: getHidden("hiddenpresentdistrict"),
      permanentStateCode: getHidden("hidpermenantState"),
      permanentDistrictCode: getHidden("hiddenpermenantdistrict"),
      dispensarySelected: $("ctl00_HomePageContent_ctrlTextDispensary")?.selectedIndex,
      declaration: $("ctl00_HomePageContent_dec_chkbox")?.checked,
      photo: $("ctl00_HomePageContent_hdnupload_Photo")?.value,
    }
    log("PRE-SUBMIT " + JSON.stringify(pre))
    window.__esicPreSubmit = pre
    return pre
  }

  window.ESICfillMainForm = fillMainForm
  window.ESICfillLog = () => LOG.slice()
  log("esic-fill.js loaded")
})()
