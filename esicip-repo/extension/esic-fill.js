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

  // ─── Live main-form plan (step-cursor resume driver) ──────────────────
  // Each step: { name, postback, run(cursor) -> bool(triggered reload) }.
  // The resume runner persists cursor BEFORE postback steps + resumes on reload.
  function buildMainFormPlan(item) {
    const n = item.normalized || item
    const $id = (id) => document.getElementById(id)
    const gMap = { M: "_0", F: "_1", TG: "_2" }
    const dMap = { Dispensary: "_0", IMP: "_1", EMud: "_2" }
    const isHusband = n.RelationType === "Husband"
    const dispTypeNotDefault = n.DispensaryType && n.DispensaryType !== "Dispensary"
    const depTypeNotDefault = n.DependendantDispensaryType && n.DependendantDispensaryType !== "Dispensary"

    const radioClick = (id) => { const r = $id(id); if (!r) return false; if (r.checked) { log("  " + id + " already checked"); return false; } r.click(); return true; }

    return [
      // 1. marital select (no postback) → assignGender verifies
      { name: "marital", postback: false, run: async () => { setSelectByLabel("ctl00_HomePageContent_ctrlRDMarried", n.MaritalStatus); await sleep(30); return false; } },

      // 2. gender radio (PostBack)
      { name: "gender radio", postback: true, run: async () => radioClick("ctl00_HomePageContent_ctrlRDMale" + (gMap[n.Gender] || "_0")) },

      // 3. Father/Husband radio (Husband → PostBack; Father → no postback)
      { name: "father/husband radio", postback: isHusband, run: async () => {
        const t = radioClick("ctl00_HomePageContent_ctrlFatherOrHus_" + (isHusband ? "1" : "0"))
        return isHusband ? t : false // Father: no reload even if clicked
      } },

      // 4-7. Employee dispensary chain (state→district→type→dispensary; each PostBack)
      { name: "disp state (PostBack)", postback: true, run: async () => {
        const el = $id("ctl00_HomePageContent_ddlDispensaryState")
        if (!el) return false
        if (el.value === String(n.DispensaryState)) { log("  disp state already"); return false; }
        return setSelectByValue("ctl00_HomePageContent_ddlDispensaryState", String(n.DispensaryState))
      } },
      { name: "disp district (PostBack)", postback: true, run: async () => {
        const ok = await waitFor(() => $id("ctl00_HomePageContent_ddlDispensaryDistrict") && $id("ctl00_HomePageContent_ddlDispensaryDistrict").options.length > 1, 5000)
        if (!ok) { log("FAIL disp district options"); return false; }
        return setSelectByLabel("ctl00_HomePageContent_ddlDispensaryDistrict", n.DispensaryDistrict)
      } },
      { name: "disp type radio", postback: dispTypeNotDefault, run: async () => {
        if (!dispTypeNotDefault) return false // Dispensary _0 default, no postback
        return radioClick("ctl00_HomePageContent_ctrlRBDispensaryIMP" + (dMap[n.DispensaryType] || "_0"))
      } },
      { name: "disp select by ID (PostBack)", postback: true, run: async () => {
        const ok = await waitFor(() => $id("ctl00_HomePageContent_ctrlTextDispensary") && $id("ctl00_HomePageContent_ctrlTextDispensary").options.length > 1, 5000)
        if (!ok) { log("FAIL disp select options"); return false; }
        const sel = $id("ctl00_HomePageContent_ctrlTextDispensary")
        // Match by ID; if a name matches >1 option, STOP (never guess). TODO: ambiguity UI.
        let matched = null
        for (const o of sel.options) if (String(o.value) === String(n.DispensaryId)) { matched = o; break; }
        if (!matched) { log("FAIL disp id " + n.DispensaryId + " not in [" + Array.from(sel.options).slice(0, 5).map((o) => o.value).join(",") + "]"); return false; }
        sel.value = matched.value
        sel.dispatchEvent(new Event("change", { bubbles: true })) // PostBack
        return true
      } },

      // 8-11. Dependendant dispensary chain (mirror of 4-7)
      { name: "dep disp state (PostBack)", postback: true, run: async () => {
        const el = $id("ctl00_HomePageContent_ddldependantDispensaryState")
        if (!el) return false
        if (el.value === String(n.DependendantDispensaryState)) { log("  dep disp state already"); return false; }
        return setSelectByValue("ctl00_HomePageContent_ddldependantDispensaryState", String(n.DependendantDispensaryState))
      } },
      { name: "dep disp district (PostBack)", postback: true, run: async () => {
        const ok = await waitFor(() => $id("ctl00_HomePageContent_ddldependantDispensaryDistrict") && $id("ctl00_HomePageContent_ddldependantDispensaryDistrict").options.length > 1, 5000)
        if (!ok) { log("FAIL dep disp district options"); return false; }
        return setSelectByLabel("ctl00_HomePageContent_ddldependantDispensaryDistrict", n.DependendantDispensaryDistrict)
      } },
      { name: "dep disp type radio", postback: depTypeNotDefault, run: async () => {
        if (!depTypeNotDefault) return false
        return radioClick("ctl00_HomePageContent_ctrlRBDependantDispensaryIMP" + (dMap[n.DependendantDispensaryType] || "_0"))
      } },
      { name: "dep disp select by ID (PostBack)", postback: true, run: async () => {
        const ok = await waitFor(() => $id("ctl00_HomePageContent_ddldependantdispensary") && $id("ctl00_HomePageContent_ddldependantdispensary").options.length > 1, 5000)
        if (!ok) { log("FAIL dep disp select options"); return false; }
        const sel = $id("ctl00_HomePageContent_ddldependantdispensary")
        let matched = null
        for (const o of sel.options) if (String(o.value) === String(n.DependendantDispensaryId)) { matched = o; break; }
        if (!matched) { log("FAIL dep disp id " + n.DependendantDispensaryId); return false; }
        sel.value = matched.value
        sel.dispatchEvent(new Event("change", { bubbles: true }))
        return true
      } },

      // 12-13. disability No, prev-employer No (no postback)
      { name: "disability=No", postback: false, run: async () => { radioClick("ctl00_HomePageContent_ctrlRDIpDisable_1"); return false; } },
      { name: "prev-employer=No", postback: false, run: async () => { radioClick("ctl00_HomePageContent_ctrlRDPrevEmployer_1"); return false; } },

      // 14. PAUSE for photo upload (manual file pick) → resume when hdnupload_Photo non-empty
      { name: "wait photo upload", postback: false, run: async () => {
        const h = $id("ctl00_HomePageContent_hdnupload_Photo")
        if (h && h.value) { log("  photo already uploaded"); return false; }
        log("⏸ PAUSE: pick Self Photo + click Upload Photo — waiting for hdnupload_Photo (up to 5 min)")
        await waitFor(() => $id("ctl00_HomePageContent_hdnupload_Photo") && $id("ctl00_HomePageContent_hdnupload_Photo").value, 300000)
        return false
      } },

      // 15. SAME-PASS non-postback fill: name, father, present addr/pin + geo, permanent + geo, DOA, DOB, ddllanguage
      { name: "text+geo+dates+language (same pass)", postback: false, run: async () => {
        setTextInput("ctl00_HomePageContent_ctrlTextEmpName", n.EmpName)
        setTextInput("ctl00_HomePageContent_ctrlTextFatherHusName", n.FatherOrHusbandName)
        setTextInput("ctl00_HomePageContent_ctrlTextPresentAddress1", n.PresentAddress)
        setTextInput("ctl00_HomePageContent_ctrlTxtPresentPinCode", n.PinCode)
        await fillGeo("ctl00_HomePageContent_ctrlTxtPresentState", "ctl00_HomePageContent_ctrlTextPresentDistrict", "hidpresentdenState", "hiddenpresentdistrict", n.PresentState, n.PresentDistrict)
        setTextInput("ctl00_HomePageContent_ctrlTextPermanentAddress1", n.PermanentAddress)
        setTextInput("ctl00_HomePageContent_ctrlTextPermanentPinCode", n.PermanentPinCode)
        await fillGeo("ctl00_HomePageContent_ctrlTextPermanentState", "ctl00_HomePageContent_ctrlTextPermanentDistrict", "hidpermenantState", "hiddenpermenantdistrict", n.PermanentState, n.PermanentDistrict)
        setTextInput("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy", n.AppointmentDate)
        setTextInput("ctl00_HomePageContent_ctrlTxtIpDate", n.DOB)
        setSelectByLabel("ctl00_HomePageContent_ddllanguage", n.SMSLanguage)
        return false
      } },

      // 16. declaration click (only if unchecked) + verify DOA not cleared
      { name: "declaration", postback: false, run: async () => {
        const chk = $id("ctl00_HomePageContent_dec_chkbox")
        if (chk && !chk.checked) chk.click()
        await sleep(30)
        const doa = $id("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy")
        log("declaration checked=" + (chk ? chk.checked : "no-el") + " doa=" + (doa ? doa.value : ""))
        return false
      } },

      // 17. pre-submit check → STOP (user clicks Submit)
      { name: "pre-submit check", postback: false, run: async () => {
        const pre = {
          name: $id("ctl00_HomePageContent_ctrlTextEmpName") && $id("ctl00_HomePageContent_ctrlTextEmpName").value,
          father: $id("ctl00_HomePageContent_ctrlTextFatherHusName") && $id("ctl00_HomePageContent_ctrlTextFatherHusName").value,
          dob: $id("ctl00_HomePageContent_ctrlTxtIpDate") && $id("ctl00_HomePageContent_ctrlTxtIpDate").value,
          doa: $id("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy") && $id("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy").value,
          language: $id("ctl00_HomePageContent_ddllanguage") && $id("ctl00_HomePageContent_ddllanguage").selectedIndex,
          presentStateCode: getHidden("hidpresentdenState"),
          presentDistrictCode: getHidden("hiddenpresentdistrict"),
          permanentStateCode: getHidden("hidpermenantState"),
          permanentDistrictCode: getHidden("hiddenpermenantdistrict"),
          dispensarySelected: $id("ctl00_HomePageContent_ctrlTextDispensary") && $id("ctl00_HomePageContent_ctrlTextDispensary").selectedIndex,
          declaration: $id("ctl00_HomePageContent_dec_chkbox") && $id("ctl00_HomePageContent_dec_chkbox").checked,
          photo: $id("ctl00_HomePageContent_hdnupload_Photo") && $id("ctl00_HomePageContent_hdnupload_Photo").value,
        }
        log("PRE-SUBMIT " + JSON.stringify(pre))
        chrome.runtime.sendMessage({ type: "preSubmitReport", report: pre })
        return false
      } },
    ]
  }
  window.ESICBuildMainFormPlan = buildMainFormPlan

  window.ESICfillMainForm = fillMainForm
  window.ESICfillLog = () => LOG.slice()
  log("esic-fill.js loaded")
})()
