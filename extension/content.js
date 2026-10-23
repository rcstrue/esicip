// ═══════════════════════════════════════════════════════════════════
//  ESIC IP Auto-Fill — Content Script v1.0.2
//  Runs on ESIC portal pages. Detects page type + auto-fills fields.
//  Pages: entry → aadhaar → main → bank → nominee → success
// ═══════════════════════════════════════════════════════════════════

// ─── Helper: set a text input value (handles readonly fields too) ──
function setValue(selector, value) {
  const el = document.querySelector(selector)
  if (!el) return false
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
    || Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set
  if (setter) setter.call(el, value)
  else el.value = value
  el.dispatchEvent(new Event("input", { bubbles: true }))
  el.dispatchEvent(new Event("change", { bubbles: true }))
  el.dispatchEvent(new Event("keyup", { bubbles: true }))
  el.dispatchEvent(new Event("blur", { bubbles: true }))
  return true
}

// Try multiple selectors to find a field
function findField(selectors) {
  for (const sel of selectors) {
    const el = document.querySelector(sel)
    if (el) return el
  }
  return null
}

function setFieldValue(selectors, value) {
  const el = findField(selectors)
  if (!el) return false
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
    || Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set
  if (setter) setter.call(el, value)
  else el.value = value
  el.dispatchEvent(new Event("input", { bubbles: true }))
  el.dispatchEvent(new Event("change", { bubbles: true }))
  el.dispatchEvent(new Event("keyup", { bubbles: true }))
  el.dispatchEvent(new Event("blur", { bubbles: true }))
  return true
}

// ─── Helper: wait for a dropdown to have options (AJAX-loaded) ─────
async function waitForOptions(selectors, timeout = 15000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const el = findField(selectors)
    if (el && el.options && el.options.length > 1) {
      return el // Dropdown is populated
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  return null // Timed out
}

// ─── Helper: wait for ANY field to appear (AJAX-loaded text/tel) ──
async function waitForField(selectors, timeout = 10000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const el = findField(selectors)
    if (el) return el
    await new Promise((r) => setTimeout(r, 400))
  }
  return null // Timed out
}

// ─── Helper: set a value directly on a found element ───────────────
function setValueOnEl(el, value) {
  if (!el) return false
  const setter =
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set ||
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set
  if (setter) setter.call(el, value)
  else el.value = value
  el.dispatchEvent(new Event("input", { bubbles: true }))
  el.dispatchEvent(new Event("change", { bubbles: true }))
  el.dispatchEvent(new Event("keyup", { bubbles: true }))
  el.dispatchEvent(new Event("blur", { bubbles: true }))
  return true
}

// ─── Helper: set a <select> by value ───────────────────────────────
function setSelect(selectors, value) {
  const el = findField(selectors)
  if (!el) return false
  el.value = value
  el.dispatchEvent(new Event("change", { bubbles: true }))
  return true
}

// ─── Helper: set a <select> by visible label (fuzzy) ───────────────
function setSelectByLabel(selectors, label) {
  const el = findField(selectors)
  if (!el) return false
  // Exact match
  for (const opt of el.options) {
    if (opt.text.trim().toLowerCase() === label.trim().toLowerCase()) {
      el.value = opt.value
      el.dispatchEvent(new Event("change", { bubbles: true }))
      return true
    }
  }
  // Contains match
  for (const opt of el.options) {
    if (opt.text.trim().toLowerCase().includes(label.trim().toLowerCase())) {
      el.value = opt.value
      el.dispatchEvent(new Event("change", { bubbles: true }))
      return true
    }
  }
  return false
}

// ─── Helper: check a radio button ──────────────────────────────────
function checkRadio(selectors) {
  const el = findField(selectors)
  if (!el) return false
  if (el.disabled) return false
  el.checked = true
  el.dispatchEvent(new Event("change", { bubbles: true }))
  el.dispatchEvent(new Event("click", { bubbles: true }))
  return true
}

// ─── Helper: check a checkbox ──────────────────────────────────────
function checkCheckbox(selectors, checked = true) {
  const el = findField(selectors)
  if (!el) return false
  if (el.checked !== checked) {
    el.checked = checked
    el.dispatchEvent(new Event("change", { bubbles: true }))
    el.dispatchEvent(new Event("click", { bubbles: true }))
  }
  return true
}

// ─── Helper: click a button/element ────────────────────────────────
function clickElement(selectors) {
  const el = findField(selectors)
  if (!el) return false
  el.click()
  return true
}

// ─── Helper: is an element visible & enabled? ──────────────────────
function isVisible(el) {
  if (!el) return false
  if (el.disabled) return false
  if (el.offsetParent === null && el.getClientRects().length === 0) return false
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return false
  const style = window.getComputedStyle(el)
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false
  return true
}

// ─── Helper: sleep ─────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Helper: click the first visible+enabled element matching any selector ─
function clickFirstVisible(selectors, label) {
  for (const sel of selectors) {
    const el = document.querySelector(sel)
    if (el && isVisible(el)) {
      console.log(`[ESIC Auto-Fill] Auto-clicking ${label}: ${sel}`)
      el.click()
      return { clicked: true, reason: `auto-clicked ${label}`, selector: sel }
    }
  }
  return { clicked: false, reason: `${label} button not visible` }
}

// ─── Helper: get select value/label ────────────────────────────────
function getSelectValue(selectors) {
  const el = findField(selectors)
  return el ? el.value : ""
}
function getSelectLabel(selectors) {
  const el = findField(selectors)
  return el && el.selectedIndex >= 0 ? el.options[el.selectedIndex].text : ""
}
function isRadioChecked(selectors) {
  const el = findField(selectors)
  return el ? el.checked : false
}
function getFieldValue(selectors) {
  const el = findField(selectors)
  return el ? el.value : ""
}

// ─── Re-enable right-click (ESIC blocks it via oncontextmenu) ────────
// So the "Remember this field" context menu can fire. Override the page's
// blocker + stop its capture-phase handlers from cancelling the menu.
try {
  document.oncontextmenu = null
  document.body && (document.body.oncontextmenu = null)
} catch {}
window.addEventListener("contextmenu", (e) => { e.stopPropagation() }, true)
// also clear any inline oncontextmenu attributes after DOM is ready
const clearCtx = () => {
  document.querySelectorAll("[oncontextmenu]").forEach((el) => { try { el.oncontextmenu = null } catch {} })
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", clearCtx)
else clearCtx()

// ─── Page detection ────────────────────────────────────────────────
function detectPage() {
  // Entry page: "Was the Employee ever allotted a ESI Number?" with Yes/No
  if (findField([
    "#ctl00_HomePageContent_rbtnlistIsregistered_1",
    "input[name*='rbtnlistIsregistered']",
    "input[value='1'][name*='Isregistered']",
  ])) {
    return "entry"
  }
  // Aadhaar page: look for Aadhaar-related fields
  if (findField([
    "#ctl00_HomePageContent_txtAadhaar",
    "#ctl00_HomePageContent_ctrlTextAadhaar",
    "#ctl00_HomePageContent_txtAadhaarNo",
    "input[name*='Aadhaar']",
    "input[id*='Aadhaar']",
  ]) || document.body.innerText.includes("Aadhaar")) {
    // Make sure we're not on the main page (which might also mention Aadhaar in text)
    if (!findField(["#ctl00_HomePageContent_ctrlTextEmpName"])) {
      return "aadhaar"
    }
  }
  // Main form: has Employee Name field
  if (findField(["#ctl00_HomePageContent_ctrlTextEmpName"])) {
    return "main"
  }
  // Bank page: has IFSC search
  if (findField([
    "#ctl00_HomePageContent_txtIFSCcode",
    "input[name*='txtIFSCcode']",
    "input[id*='IFSCcode']",
  ])) {
    return "bank"
  }
  // Nominee page: has nominee name field
  if (findField([
    "#ctl00_HomePageContent_ctrlTextUserName",
    "input[name*='ctrlTextUserName']",
  ])) {
    return "nominee"
  }
  // Dashboard: has logout button + multiple modal buttons
  if (
    findField(["#imgbtnLogout", "input[id*='Logout' i]"]) ||
    (location.href.includes("PortalHome") && findField(["#btnYes", "#btnNo"]))
  ) {
    return "dashboard"
  }
  // Success page: look for actual success indicators
  const bodyText = document.body.innerText || ""
  if (
    bodyText.match(/Insurance\s*(?:No|Number)[^\d]*\d{10}/i) ||
    bodyText.match(/successfully registered/i) ||
    bodyText.match(/IP\s*(?:No|Number)[^\d]*\d{10}/i)
  ) {
    return "success"
  }
  return "unknown"
}

// ─── DASHBOARD: auto-dismiss modals ONE-BY-ONE + navigate ───────────
// PortalHome shows a stack of modal panels that appear SEQUENTIALLY — each
// OK / I Agree / Close click triggers a PostBack that reveals the next.
// We loop, re-scanning after each click, until no more popups are visible,
// then navigate to Add Employee.
async function handleDashboard() {
  const dismissed = []

  const popupSequence = [
    { sel: "#div1_close", name: "session warning (X)" },
    { sel: "#btnNo", name: "free-offer popup (No)" },
    { sel: "#btnpnlcolse", name: "I Agree (policy)" },
    { sel: "#btnpnlPwdcolse", name: "I Agree (password)" },
    { sel: "#btnpnlSanjeevanicolse", name: "Sanjeevani Close" },
    { sel: "#btnncsclose", name: "Registration Status OK" },
    { sel: "#BtnOK1", name: "OK" },
  ]

  let guard = 0
  while (guard++ < 10) {
    let clicked = false
    for (const btn of popupSequence) {
      const el = findField([btn.sel])
      if (el && isVisible(el)) {
        console.log(`[ESIC Auto-Fill] Dashboard: auto-clicking ${btn.name}`)
        el.click()
        dismissed.push(btn.name)
        clicked = true
        await sleep(200) // let the PostBack + next popup render
        break
      }
    }
    if (!clicked) break // dashboard is clear → go navigate
  }

  // ─── Navigate to "Register/Enroll New Employee" ─────────────────────
  // Fast path: click the link by its stable id (lnkRegisterNewIP) first —
  // the visible text "Register/Enroll New Employee" didn't match the old
  // keyword list, so the dashboard never auto-opened the entry page.
  const idNavSelectors = [
    "#lnkRegisterNewIP",
    "a[id*='RegisterNewIP' i]",
    "a[id*='RegisterNew' i]",
    "a[id*='NewIP' i]",
    "a[id*='Enroll' i]",
    "a[id*='Register' i]:not([id*='Update' i]):not([id*='Modify' i])",
  ]
  for (const sel of idNavSelectors) {
    const el = document.querySelector(sel)
    if (el && (el.offsetParent !== null || el.getClientRects().length > 0)) {
      console.log(`[ESIC Auto-Fill] Dashboard nav by id: ${sel}`)
      try {
        el.click()
        return {
          type: "info",
          message: `✓ Dismissed ${dismissed.length} popup(s) + clicked "Register/Enroll New Employee". Opening entry page…`,
        }
      } catch (e) {
        console.log(`[ESIC Auto-Fill] id nav click failed:`, e)
      }
    }
  }

  const navKeywords = [
    "Register/Enroll New Employee",
    "Register New Employee",
    "Enroll New Employee",
    "Register New IP",
    "Register IP",
    "New Registration",
    "Add Employee",
    "Add New Employee",
    "New IP",
    "Employee Registration",
  ]

  let navigated = false
  const clickables = document.querySelectorAll(
    'a, img[onclick], div[onclick], span[onclick], td[onclick], li[onclick], [role="button"], [role="menuitem"], [role="link"]',
  )
  for (const el of clickables) {
    const text = (el.textContent || el.alt || el.title || "").trim()
    if (!text) continue
    for (const keyword of navKeywords) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        if (el.offsetParent !== null || el.getClientRects().length > 0) {
          console.log(`[ESIC Auto-Fill] Found nav link: "${text}" — clicking`)
          try {
            el.click()
            navigated = true
          } catch (e) {
            console.log(`[ESIC Auto-Fill] Click failed:`, e)
          }
          return {
            type: "info",
            message: `✓ Dismissed ${dismissed.length} popup(s) + clicked "${text}". Navigating to registration…`,
          }
        }
      }
    }
    if (navigated) break
  }

  // ─── Image-based navigation (ESIC uses image maps too) ─────────────
  if (!navigated) {
    const navImages = document.querySelectorAll(
      'img[src*="Employee" i], img[src*="Add" i], img[src*="Register" i], img[src*="ip" i], area[alt*="Employee" i], area[alt*="Add" i], area[alt*="Register" i]',
    )
    for (const img of navImages) {
      if (img.offsetParent !== null || img.getClientRects().length > 0) {
        console.log(`[ESIC Auto-Fill] Found nav image: ${img.src || img.alt} — clicking`)
        try {
          img.click()
          navigated = true
        } catch (e) {
          console.log(`[ESIC Auto-Fill] Image click failed:`, e)
        }
        return {
          type: "info",
          message: `✓ Dismissed ${dismissed.length} popup(s) + clicked nav image. Navigating…`,
        }
      }
    }
  }

  if (dismissed.length > 0) {
    return {
      type: "info",
      message: `✓ Dismissed ${dismissed.length} dashboard popup(s). Could not auto-find "Add Employee" — click it in the left menu.`,
    }
  }
  return {
    type: "info",
    message: "📋 Dashboard. Click 'Employee' menu → 'Add Employee' to start filling.",
  }
}

// ─── PAGE 1: ENTRY ─────────────────────────────────────────────────
async function fillEntry(data) {
  const filled = []

  // 1. Click "No" for "Was the Employee ever allotted a ESI Number?"
  const noRadio = findField([
    "#ctl00_HomePageContent_rbtnlistIsregistered_1",
    "input[value='1'][name*='Isregistered']",
    "input[id*='rbtnlistIsregistered_1']",
  ])
  if (noRadio && !noRadio.checked) {
    checkRadio([
      "#ctl00_HomePageContent_rbtnlistIsregistered_1",
      "input[value='1'][name*='Isregistered']",
    ])
    return { type: "info", message: "✓ Clicked 'No' (new IP). Page may reload. Will continue after reload." }
  }

  // 2. Fill mobile number. The entry page renders this field via AJAX
  //    AFTER the "No" PostBack, and the exact id/name varies across ESIC
  //    builds — so we wait for it (up to 10s), try many selectors, and
  //    fall back to "any visible empty 10-digit text/tel input".
  const mobileSelectors = [
    "#ctl00_HomePageContent_txtmobilenumber",
    "#ctl00_HomePageContent_ctrlTextPresentMobileNo",
    "#ctl00_HomePageContent_txtMobileNo",
    "#ctl00_HomePageContent_ctrlTextMobile",
    "#ctl00_HomePageContent_txtMobile",
    "input[name*='mobilenumber' i]",
    "input[id*='mobilenumber' i]",
    "input[name*='mobileno' i]",
    "input[id*='mobileno' i]",
    "input[name*='Mobile' i][maxlength='10']",
    "input[id*='Mobile' i]:not([disabled])",
    "input[type='tel'][maxlength='10']",
    "input[type='tel']:not([disabled]):not([readonly])",
    "input[placeholder*='mobile' i]",
  ]
  let mobileEl = await waitForField(mobileSelectors, 10000)
  // Generic fallback: any visible, empty, 10-digit text/tel/number input.
  if (!mobileEl) {
    const candidates = document.querySelectorAll(
      "input[type='text'], input[type='tel'], input[type='number']",
    )
    for (const c of candidates) {
      if (c.disabled || c.readOnly) continue
      if (c.maxLength === 10 && isVisible(c) && !c.value) {
        mobileEl = c
        break
      }
    }
  }
  if (mobileEl && !mobileEl.value && data.MobileNo) {
    setValueOnEl(mobileEl, data.MobileNo)
    filled.push("Mobile")
  } else if (!mobileEl && data.MobileNo) {
    // Return a WARNING so the live-form auto-click does NOT fire Continue
    // before the mobile number is entered. Ask the user for a diagnostic.
    return {
      type: "warning",
      message:
        "⚠ Mobile-number field not found on the entry page. With the mobile field visible, click 🔍 Diagnose page in the popup and paste the diagnostic so I can pin the exact field id/name.",
    }
  }

  // 3. Click Validate button (if present — validates the mobile number)
  const validateBtn = findField([
    "#ctl00_HomePageContent_lnkmobilecheck",
    "a[id*='mobilecheck' i]",
    "a[onclick*='mobilecheck' i]",
    "#ctl00_HomePageContent_btnValidate",
    "input[value='Validate']",
    "input[onclick*='Validate' i]",
    "input[type='submit'][value='Validate']",
    "input[type='button'][value='Validate']",
  ])
  if (validateBtn && filled.includes("Mobile")) {
    return { type: "info", message: "✓ Filled mobile number. Click 'Validate' to verify it, then click Continue." }
  }

  // 4. Click Continue (broad selectors — live id may differ)
  const continueBtn = findField([
    "#ctl00_HomePageContent_btnmobile",
    "#ctl00_HomePageContent_btnContinue",
    "#ctl00_HomePageContent_btnSubmit",
    "#ctl00_HomePageContent_btnProceed",
    "input[type='submit'][value='Continue']",
    "input[type='submit'][value='Submit']",
    "input[type='submit'][value='Proceed']",
    "input[type='submit'][value='Save & Continue']",
    "input[type='button'][value='Continue']",
    "input[type='button'][value='Proceed']",
    "input[onclick*='Continue' i]",
    "a[onclick*='Continue' i]",
  ])
  if (continueBtn) {
    return { type: "success", message: `✓ Entry page ready${filled.length ? ": " + filled.join(", ") : ""}. Auto-clicking Continue → Aadhaar page.` }
  }
  return { type: "info", message: "Entry page: No selected + mobile filled. Click Validate (if shown), then Continue." }
}

// ─── PAGE 2: AADHAAR (live page: Empe_ip_Abha.aspx) ────────────────
async function fillAadhaar(data) {
  const filled = []

  // 1. Fill Aadhaar number. The live field is type=password, id
  //    txtAadhaarNo, maxlength 12. Wait for it (present at load).
  const aadhaarSelectors = [
    "#ctl00_HomePageContent_txtAadhaarNo",
    "#ctl00_HomePageContent_txtAadhaar",
    "#ctl00_HomePageContent_ctrlTextAadhaar",
    "input[name*='AadhaarNo' i]",
    "input[id*='AadhaarNo' i]",
    "input[type='password'][maxlength='12']",
    "input[placeholder*='Aadhaar' i]",
    "input[placeholder*='VID' i]",
  ]
  const aadhaarEl = await waitForField(aadhaarSelectors, 8000)
  if (aadhaarEl && !aadhaarEl.value && data.AadhaarNumber) {
    setFieldValue(aadhaarSelectors, data.AadhaarNumber)
    filled.push("Aadhaar")
  } else if (aadhaarEl && aadhaarEl.value) {
    filled.push("Aadhaar (pre-filled)")
  } else if (!aadhaarEl && data.AadhaarNumber) {
    return {
      type: "warning",
      message: "⚠ Aadhaar field not found. Run 🔍 Diagnose on the Aadhaar page and paste the diagnostic so I can pin the exact id.",
    }
  }

  // 1b. Tick the Aadhaar consent checkbox if present (chkAadaaar).
  const consentChk = document.querySelector("#ctl00_HomePageContent_chkAadaaar")
  if (consentChk && !consentChk.checked) {
    checkCheckbox(["#ctl00_HomePageContent_chkAadaaar"])
    filled.push("Consent")
  }

  // 2. Select "Later" (do biometric later). The live radio is
  //    rbtnListAadhaarNow_1 and its VALUE is "1" (not "Later"), so the
  //    old input[value='Later'] selector never matched — that's why
  //    Later was never selected and no Continue appeared. Selecting it
  //    triggers a PostBack that reveals the Continue button.
  const laterSelectors = [
    "#ctl00_HomePageContent_rbtnListAadhaarNow_1",
    "input[name='ctl00$HomePageContent$rbtnListAadhaarNow'][value='1']",
    "input[id*='rbtnListAadhaarNow_1']",
    "input[name*='rbtnListAadhaarNow'][value='1']",
  ]
  const laterEl = findField(laterSelectors)
  if (laterEl && !laterEl.checked) {
    checkRadio(laterSelectors)
    return {
      type: "info",
      message: "✓ Selected 'Later' for Aadhaar biometric. Page reloading (PostBack) — will continue after reload.",
    }
  }
  if (laterEl && laterEl.checked) {
    filled.push("Later")
  }

  // 3. After Later is selected, a Continue/Submit button is revealed.
  //    The live-form auto-clicker fires it (getPageSubmitSelector for
  //    aadhaar). Return success so it proceeds.
  if (filled.length > 0) {
    return {
      type: "success",
      message: `✓ Filled: ${filled.join(", ")}. Looking for Continue to proceed to the main form.`,
    }
  }
  return {
    type: "info",
    message: "Aadhaar page detected. Fill Aadhaar number + select 'Later' + click Continue. Use Diagnose if fields not found.",
  }
}

// ─── PAGE 3: MAIN FORM (async — waits for AJAX dropdowns) ─────────
async function fillMain(data) {
  await loadLearnedFields() // right-click "Remember this field" overrides
  const filled = []
  const errors = []

  // 0. Disability — click "No" (at top of form)
  if (!isRadioChecked(["#ctl00_HomePageContent_ctrlRDIpDisable_1"])) {
    checkRadio(["#ctl00_HomePageContent_ctrlRDIpDisable_1"])
    filled.push("Disability=No")
  }

  // 1. Name (skip if already pre-filled from Aadhaar session)
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextEmpName"]) && data.EmpName) {
    setValue(lfSel("EmpName", "#ctl00_HomePageContent_ctrlTextEmpName"), data.EmpName)
    filled.push("Name")
  }

  // 2. Father/Husband radio (Husband triggers PostBack)
  const wantHusband = data.RelationType === "Husband"
  const fatherChecked = isRadioChecked(["#ctl00_HomePageContent_ctrlFatherOrHus_0"])
  const husbandChecked = isRadioChecked(["#ctl00_HomePageContent_ctrlFatherOrHus_1"])
  if (wantHusband && !husbandChecked) {
    checkRadio(["#ctl00_HomePageContent_ctrlFatherOrHus_1"])
    filled.push("Husband")
    // don't return — continue filling text/geo/language in this pass; if the
    // PostBack is a full reload it interrupts + resumes on the next load, if
    // async (no reload) the fill continues.
  }
  if (!wantHusband && !fatherChecked) {
    checkRadio(["#ctl00_HomePageContent_ctrlFatherOrHus_0"])
    filled.push("Father")
  }

  // 3. Father/Husband name (skip if pre-filled)
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextFatherHusName"]) && data.FatherOrHusbandName) {
    setValue(lfSel("FatherOrHusbandName", "#ctl00_HomePageContent_ctrlTextFatherHusName"), data.FatherOrHusbandName)
    filled.push("Father/Husband name")
  }

  // 4. DOB (skip if pre-filled)
  const dobEl = document.querySelector("#ctl00_HomePageContent_ctrlTxtIpDate")
  if (dobEl && !dobEl.value && data.DOB) {
    setValue(lfSel("DOB", "#ctl00_HomePageContent_ctrlTxtIpDate"), data.DOB)
    filled.push("DOB")
  }

  // 5. Marital status (skip if pre-filled)
  const maritalEl = document.querySelector("#ctl00_HomePageContent_ctrlRDMarried")
  if (maritalEl && maritalEl.value !== data.MaritalStatus && data.MaritalStatus) {
    setSelect(["#ctl00_HomePageContent_ctrlRDMarried"], data.MaritalStatus)
    filled.push("Marital status")
  }

  // 6. Gender radio (PostBack — skip if pre-filled)
  const genderMap = { M: "_0", F: "_1", TG: "_2" }
  const gSuffix = genderMap[data.Gender] || "_0"
  const gSel = `#ctl00_HomePageContent_ctrlRDMale${gSuffix}`
  const gEl = document.querySelector(gSel)
  if (gEl && !gEl.checked && !gEl.disabled) {
    checkRadio([gSel])
    filled.push("Gender=" + data.Gender)
    // don't return — continue filling (see note above)
  }

  // ─── 10. Present Address (skip if pre-filled) ───────────────────
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentAddress1"]) && data.PresentAddress) {
    setValue(lfSel("PresentAddress", "#ctl00_HomePageContent_ctrlTextPresentAddress1"), data.PresentAddress)
    filled.push("Present Address")
  }
  if (data.PresentAddress2 && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentAddress2"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress2", data.PresentAddress2)
  }
  if (data.PresentAddress3 && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentAddress3"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress3", data.PresentAddress3)
  }

  // Pin code (skip if pre-filled)
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTxtPresentPinCode"]) && data.PinCode) {
    setValue(lfSel("PinCode", "#ctl00_HomePageContent_ctrlTxtPresentPinCode"), data.PinCode)
    filled.push("PIN")
  }

  // Mobile (skip if pre-filled)
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentMobileNo"]) && data.MobileNo) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentMobileNo", data.MobileNo)
    filled.push("Mobile")
  }

  // Email (optional)
  if (data.Email && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentEmail"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentEmail", data.Email)
  }

  // ─── Present State (AJAX-loaded — WAIT for options) ─────────────
  const stateSelectors = ["#ctl00_HomePageContent_ctrlTxtPresentState"]
  const stateEl = findField(stateSelectors)
  if (stateEl && stateEl.value !== data.PresentState && data.PresentState) {
    // Wait for the dropdown to be populated by AJAX
    const populated = await waitForOptions(stateSelectors, 15000)
    if (populated) {
      // Live Present-State <select> uses the state NAME as the value, so
      // match by label (works whether the option value is the name or a code).
      const ok = setSelectByLabel(stateSelectors, data.PresentState)
      if (!ok) errors.push(`Present State '${data.PresentState}' not found in dropdown`)
      else filled.push("Present State")
      // selectPresentStates() runs client-side on change (no PostBack) — districts
      // populate synchronously; continue to district in this same pass.
    } else {
      errors.push("Present State dropdown didn't load options — click it manually to trigger load, then click 'Fill this page now'")
    }
  }

  // ─── Present District (after state PostBack — WAIT for options) ─
  const distSelectors = ["#ctl00_HomePageContent_ctrlTextPresentDistrict"]
  const distEl = findField(distSelectors)
  if (distEl && data.PresentDistrict) {
    const currentDistLabel = getSelectLabel(distSelectors)
    if (currentDistLabel !== data.PresentDistrict) {
      const populated = await waitForOptions(distSelectors, 15000)
      if (populated) {
        const ok = setSelectByLabel(distSelectors, data.PresentDistrict)
        if (!ok) {
          errors.push(`Present District '${data.PresentDistrict}' not found in dropdown`)
        } else {
          filled.push("District")
        }
      }
    }
  }

  // 11. Permanent Address — fill EXPLICITLY (do NOT tick the Copy checkbox; it
  // overwrites the permanent mobile with the disabled present mobile + re-runs on
  // every present-field change). The validator already copied present→permanent into
  // data.Permanent* when CopyPresentToPermanent=Yes, so just fill them directly.
  if (data.PermanentAddress && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPermanentAddress1"])) {
    setValue(lfSel("PermanentAddress", "#ctl00_HomePageContent_ctrlTextPermanentAddress1"), data.PermanentAddress)
    filled.push("Permanent Address")
  }
  if (data.PermanentAddress2 && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPermanentAddress2"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPermanentAddress2", data.PermanentAddress2)
  }
  if (data.PermanentAddress3 && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPermanentAddress3"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPermanentAddress3", data.PermanentAddress3)
  }
  if (data.PermanentPinCode && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPermanentPinCode"])) {
    setValue(lfSel("PermanentPinCode", "#ctl00_HomePageContent_ctrlTextPermanentPinCode"), data.PermanentPinCode)
    filled.push("Permanent PIN")
  }
  // Permanent State → district (client-side selectPermanentStates, same pass)
  const permStateSelectors = ["#ctl00_HomePageContent_ctrlTextPermanentState"]
  const permStateEl = findField(permStateSelectors)
  if (permStateEl && data.PermanentState && permStateEl.value !== data.PermanentState) {
    const populated = await waitForOptions(permStateSelectors, 15000)
    if (populated) {
      const ok = setSelectByLabel(permStateSelectors, data.PermanentState)
      if (!ok) errors.push(`Permanent State '${data.PermanentState}' not found`)
      else filled.push("Permanent State")
    }
  }
  const permDistSelectors = ["#ctl00_HomePageContent_ctrlTextPermanentDistrict"]
  const permDistEl = findField(permDistSelectors)
  if (permDistEl && data.PermanentDistrict) {
    const curLabel = getSelectLabel(permDistSelectors)
    if (curLabel !== data.PermanentDistrict) {
      const populated = await waitForOptions(permDistSelectors, 15000)
      if (populated) {
        const ok = setSelectByLabel(permDistSelectors, data.PermanentDistrict)
        if (ok) filled.push("Permanent District")
        else errors.push(`Permanent District '${data.PermanentDistrict}' not found`)
      }
    }
  }

  // ─── 12a. Dispensary/IMP/mEUD For IP ────────────────────────────
  // Dispensary type radio
  const dispTypeMap = { Dispensary: "_0", IMP: "_1", EMud: "_2" }
  const dSuffix = dispTypeMap[data.DispensaryType] || "_0"
  const dSel = `#ctl00_HomePageContent_ctrlRBDispensaryIMP${dSuffix}`
  const dEl = document.querySelector(dSel)
  if (dEl && !dEl.checked) {
    checkRadio([dSel])
    if (data.DispensaryType !== "Dispensary") filled.push("DispType=" + data.DispensaryType)
    // don't return — continue (next block waits for options)
  }

  // Dispensary State (WAIT for options)
  const dispStateSelectors = ["#ctl00_HomePageContent_ddlDispensaryState"]
  const dispStateEl = findField(dispStateSelectors)
  if (dispStateEl && dispStateEl.value !== data.DispensaryState && data.DispensaryState) {
    const populated = await waitForOptions(dispStateSelectors, 15000)
    if (populated) {
      setSelect(dispStateSelectors, data.DispensaryState)
      filled.push("Disp State")
      // don't return — the district block below waits for options
    } else {
      errors.push("Dispensary State dropdown didn't load options")
    }
  }

  // Dispensary District (WAIT for options)
  const dispDistSelectors = ["#ctl00_HomePageContent_ddlDispensaryDistrict"]
  const dispDistEl = findField(dispDistSelectors)
  if (dispDistEl && data.DispensaryDistrict) {
    const currentLabel = getSelectLabel(dispDistSelectors)
    if (currentLabel !== data.DispensaryDistrict) {
      const populated = await waitForOptions(dispDistSelectors, 15000)
      if (populated) {
        setSelectByLabel(dispDistSelectors, data.DispensaryDistrict)
        filled.push("Disp District")
        // don't return — the dispensary-name block below waits for options
      }
    }
  }

  // Dispensary Name (WAIT for options)
  const dispNameSelectors = ["#ctl00_HomePageContent_ctrlTextDispensary"]
  const dispNameEl = findField(dispNameSelectors)
  if (dispNameEl && data.DispensaryName) {
    const currentLabel = getSelectLabel(dispNameSelectors)
    if (currentLabel !== data.DispensaryName) {
      const populated = await waitForOptions(dispNameSelectors, 15000)
      if (populated) {
        const ok = setSelectByLabel(dispNameSelectors, data.DispensaryName)
        if (!ok) {
          errors.push(`Dispensary Name '${data.DispensaryName}' not found`)
        }
      }
    }
  }

  // ─── 12b. Dispensary for Family Members (same data as 12a) ──────
  const depDispStateEl = document.querySelector("#ctl00_HomePageContent_ddldependantDispensaryState")
  if (depDispStateEl) {
    // Type
    const depSuffix = dispTypeMap[data.DispensaryType] || "_0"
    checkRadio([`#ctl00_HomePageContent_ctrlRBDependantDispensaryIMP${depSuffix}`])

    // State (WAIT for options)
    if (depDispStateEl.value !== data.DispensaryState && data.DispensaryState) {
      const depStateSelectors = ["#ctl00_HomePageContent_ddldependantDispensaryState"]
      const populated = await waitForOptions(depStateSelectors, 15000)
      if (populated) {
        setSelect(depStateSelectors, data.DispensaryState)
        return { type: "info", message: "✓ Selected Family Dispensary State (12b). Waiting for districts..." }
      }
    }

    // District (WAIT for options)
    const depDistSelectors = ["#ctl00_HomePageContent_ddldependantDispensaryDistrict"]
    const depDistEl = findField(depDistSelectors)
    if (depDistEl && data.DispensaryDistrict) {
      const currentLabel = getSelectLabel(depDistSelectors)
      if (currentLabel !== data.DispensaryDistrict) {
        const populated = await waitForOptions(depDistSelectors, 15000)
        if (populated) {
          setSelectByLabel(depDistSelectors, data.DispensaryDistrict)
          return { type: "info", message: "✓ Selected Family Dispensary District (12b). Waiting for dispensaries..." }
        }
      }
    }

    // Dispensary Name (WAIT for options)
    const depNameSelectors = ["#ctl00_HomePageContent_ddldependantdispensary"]
    const depNameEl = findField(depNameSelectors)
    if (depNameEl && data.DispensaryName) {
      const currentLabel = getSelectLabel(depNameSelectors)
      if (currentLabel !== data.DispensaryName) {
        const populated = await waitForOptions(depNameSelectors, 15000)
        if (populated) {
          setSelectByLabel(depNameSelectors, data.DispensaryName)
        }
      }
    }
    filled.push("Family Dispensary (12b)")
  }

  // 18. Appointment date (readonly — set via JS)
  const doaEl = document.querySelector("#ctl00_HomePageContent_ctrlDIDateOfAppointmentDy")
  if (doaEl && !doaEl.value && data.AppointmentDate) {
    setValue(lfSel("AppointmentDate", "#ctl00_HomePageContent_ctrlDIDateOfAppointmentDy"), data.AppointmentDate)
    filled.push("Appointment date")
  }

  // 19. SMS Language (WAIT for options)
  const langSelectors = ["#ctl00_HomePageContent_ddllanguage"]
  const langEl = findField(langSelectors)
  if (langEl && langEl.selectedIndex === 0 && data.SMSLanguage) {
    const populated = await waitForOptions(langSelectors, 15000)
    if (populated) {
      const ok = setSelectByLabel(langSelectors, data.SMSLanguage)
      if (ok) filled.push("SMS Language")
    } else {
      errors.push("SMS Language dropdown didn't load options")
    }
  }

  // 19b. Self Photo upload (REQUIRED). Browser security blocks auto-
  //    picking the file, so warn + watch; once picked we auto-click
  //    "Upload Photo" then the main Submit. Without this, Submit fails.
  const photoFileEl = document.querySelector("#ctl00_HomePageContent_FileUpload_Photo")
  if (photoFileEl && !photoFileEl.value) {
    watchPhotoUploadThen()
    errors.push("Upload Self Photo (required): pick the photo file — extension auto-clicks 'Upload Photo' then Submit")
  }

  // 20. Declaration checkbox (required for Submit)
  const decChk = document.querySelector("#ctl00_HomePageContent_dec_chkbox")
  if (decChk && !decChk.checked) {
    checkCheckbox(["#ctl00_HomePageContent_dec_chkbox"])
    filled.push("Declaration")
  }

  // Report
  if (errors.length > 0) {
    return { type: "warning", message: `Filled: ${filled.join(", ")}. ⚠ ${errors.join("; ")}` }
  }
  if (filled.length > 0) {
    return { type: "success", message: `✓ Filled: ${filled.join(", ")}. Review and click Submit.` }
  }
  return { type: "info", message: "All fields filled. Review and click Submit." }
}

// ─── PAGE 4: BANK DETAILS ──────────────────────────────────────────
function fillBank(data) {
  const filled = []
  const errors = []

  // 1. IFSC code
  const ifscEl = document.querySelector("#ctl00_HomePageContent_txtIFSCcode")
  if (ifscEl && !ifscEl.value) {
    setValue("#ctl00_HomePageContent_txtIFSCcode", data.IFSCCode)
    filled.push("IFSC")
    return { type: "info", message: "✓ Entered IFSC. Click 'Search' button to load bank details." }
  }

  // Check if bank name is loaded
  const bankNameEl = document.querySelector("#ctl00_HomePageContent_txt_Bank_Name_in_Records")
  const bankLoaded = bankNameEl && bankNameEl.value && bankNameEl.value.trim()

  if (ifscEl.value && !bankLoaded) {
    return { type: "warning", message: "Click 'Search' button next to IFSC to load bank details first." }
  }

  // 2. Account number
  const accEl = document.querySelector("#ctl00_HomePageContent_txtacc_number")
  if (accEl && !accEl.value) {
    setValue("#ctl00_HomePageContent_txtacc_number", data.BankAccNo)
    filled.push("Account number")
  }

  // 3. MICR (optional)
  if (data.MICRCode) {
    const micrEl = document.querySelector("#ctl00_HomePageContent_txtmicr")
    if (micrEl && !micrEl.value) {
      setValue("#ctl00_HomePageContent_txtmicr", data.MICRCode)
      filled.push("MICR")
    }
  }

  // 4. Account type
  const accTypeEl = document.querySelector("#ctl00_HomePageContent_ddlAccountType")
  if (accTypeEl && accTypeEl.value === "0") {
    setSelect(["#ctl00_HomePageContent_ddlAccountType"], data.AccountType)
    filled.push("Account type")
  }

  // 5. Bank document upload — can't auto-upload
  const fileEl = document.querySelector("#ctl00_HomePageContent_ctrlFISelectFile")
  if (fileEl && !fileEl.value) {
    errors.push("Select bank document (cheque/passbook PDF/JPG, ≤200KB) manually, then click Upload")
  }

  if (errors.length > 0) {
    return { type: "warning", message: `Filled: ${filled.join(", ")}. ⚠ ${errors.join("; ")}` }
  }
  if (filled.length > 0) {
    return { type: "success", message: `✓ Filled: ${filled.join(", ")}. Upload bank doc, then click Submit.` }
  }
  return { type: "info", message: "All fields filled. Upload bank doc + click Submit." }
}

// ─── PAGE 5: NOMINEE ───────────────────────────────────────────────
function fillNominee(data) {
  const filled = []
  const errors = []

  // 1. Nominee name
  const nameEl = document.querySelector("#ctl00_HomePageContent_ctrlTextUserName")
  if (nameEl && !nameEl.value) {
    setValue("#ctl00_HomePageContent_ctrlTextUserName", data.NomineeName)
    filled.push("Nominee name")
  }

  // 2. Nominee relation
  const relEl = document.querySelector("#ctl00_HomePageContent_RelationShipWithIp")
  if (relEl && relEl.value !== data.NomineeRelation) {
    const ok = setSelect(["#ctl00_HomePageContent_RelationShipWithIp"], data.NomineeRelation)
    if (ok) filled.push("Relation")
  }

  // 3. Nominee address (line 1, 2, 3)
  const addr1El = document.querySelector("#ctl00_HomePageContent_ctrlTextAddress1")
  if (addr1El && !addr1El.value) {
    // Use the employee's present address as the nominee address
    setValue("#ctl00_HomePageContent_ctrlTextAddress1", data.PresentAddress)
    filled.push("Nominee Address")
  }
  const addr2El = document.querySelector("#ctl00_HomePageContent_ctrlTextAddress2")
  if (addr2El && !addr2El.value && data.PresentAddress2) {
    setValue("#ctl00_HomePageContent_ctrlTextAddress2", data.PresentAddress2)
  }
  const addr3El = document.querySelector("#ctl00_HomePageContent_ctrlTextAddress3")
  if (addr3El && !addr3El.value && data.PresentAddress3) {
    setValue("#ctl00_HomePageContent_ctrlTextAddress3", data.PresentAddress3)
  }

  // 4. Nominee State + District (use employee's present state/district)
  const nomStateEl = document.querySelector("#ctl00_HomePageContent_States")
  if (nomStateEl && nomStateEl.value !== data.PresentState && data.PresentState) {
    setSelect(["#ctl00_HomePageContent_States"], data.PresentState)
    return { type: "info", message: "✓ Selected Nominee State. Loading districts (PostBack)..." }
  }
  const nomDistEl = document.querySelector("#ctl00_HomePageContent_Districts")
  if (nomDistEl && nomDistEl.options.length > 1 && getSelectLabel(["#ctl00_HomePageContent_Districts"]) !== data.PresentDistrict) {
    setSelectByLabel(["#ctl00_HomePageContent_Districts"], data.PresentDistrict)
    filled.push("Nominee District")
  }

  // 5. Pin code
  const nomPinEl = document.querySelector("#ctl00_HomePageContent_ctrlTextPin")
  if (nomPinEl && !nomPinEl.value && data.PinCode) {
    setValue("#ctl00_HomePageContent_ctrlTextPin", data.PinCode)
    filled.push("Nominee PIN")
  }

  // 6. Mobile number
  const nomMobEl = document.querySelector("#ctl00_HomePageContent_ctrlTextMobileNumber")
  if (nomMobEl && !nomMobEl.value && data.MobileNo) {
    setValue("#ctl00_HomePageContent_ctrlTextMobileNumber", data.MobileNo)
    filled.push("Nominee Mobile")
  }

  // 7. Nominee share + family member (hidden XML fields)
  const nomineeXmlField = document.querySelector("#ctl00_HomePageContent_NomineeXmldata")
  if (nomineeXmlField && !nomineeXmlField.value) {
    const nomineeXml = `<Nominees><Nominee><Share>${data.NomineeShare}</Share></Nominee></Nominees>`
    setValue("#ctl00_HomePageContent_NomineeXmldata", nomineeXml)
    filled.push("Share")
  }

  // Family member (optional)
  if (data.FamilyMemberName) {
    const familyField = document.querySelector("#ctl00_HomePageContent_Xmldatahidden")
    if (familyField && !familyField.value) {
      const familyXml = `<FamilyMembers><FamilyMember><Name>${data.FamilyMemberName}</Name><DOB>${data.FamilyMemberDOB}</DOB><Relation>${data.FamilyMemberRelation}</Relation></FamilyMember></FamilyMembers>`
      setValue("#ctl00_HomePageContent_Xmldatahidden", familyXml)
      filled.push("Family member")
    }
  }

  // 8. "Nominee is also family member?" — default No
  const akaNo = document.querySelector("#ctl00_HomePageContent_rbtnlistNomneeAkaFamily_1")
  if (akaNo && !akaNo.checked) {
    checkRadio(["#ctl00_HomePageContent_rbtnlistNomneeAkaFamily_1"])
  }

  if (errors.length > 0) {
    return { type: "error", message: `Filled: ${filled.join(", ")}. Errors: ${errors.join("; ")}` }
  }
  if (filled.length > 0) {
    return { type: "success", message: `✓ Filled: ${filled.join(", ")}. Review and click Save.` }
  }
  return { type: "info", message: "All fields filled. Review and click Save." }
}

// ─── PAGE 6: SUCCESS — extract IP Number ───────────────────────────
function extractIpNumber() {
  const bodyText = document.body.innerText

  const labeled =
    bodyText.match(/Insurance\s*(?:No|Number)[^\d]*(\d{10})/i) ||
    bodyText.match(/IP\s*(?:No|Number)[^\d]*(\d{10})/i) ||
    bodyText.match(/Pehchan\s*(?:No|Number)[^\d]*(\d{10})/i)
  if (labeled) return labeled[1]

  const els = document.querySelectorAll(
    '[class*="success"], [class*="ip"], [id*="IPNo"], [id*="InsuranceNo"], [id*="lblIP"]',
  )
  for (const el of els) {
    const m = el.textContent.match(/\b\d{10}\b/)
    if (m) return m[0]
  }

  const headings = document.querySelectorAll("h1, h2, h3, .pageHeaderText, .pageHeader, .success")
  for (const h of headings) {
    const m = h.textContent.match(/\b\d{10}\b/)
    if (m) return m[0]
  }

  return ""
}

// ─── Per-page submit/continue/save button selectors ──────────────────
function getPageSubmitSelector(page) {
  switch (page) {
    case "entry":
      return [
        "#ctl00_HomePageContent_btnContinue",
        "input[type='submit'][value='Continue']",
        "input[type='button'][value='Continue']",
        "input[onclick*='Continue' i]",
        "a[onclick*='Continue' i]",
      ]
    case "aadhaar":
      return [
        "#ctl00_HomePageContent_btnContinue",
        "#ctl00_HomePageContent_btnSubmit",
        "#ctl00_HomePageContent_btnSave",
        "input[type='submit'][value='Continue']",
        "input[type='submit'][value='Submit']",
        "input[type='submit'][value='Save']",
        "input[type='submit'][value='Save & Continue']",
        "input[type='submit'][value='Proceed']",
        "input[type='submit'][value='Next']",
        "input[type='button'][value='Continue']",
        "input[type='button'][value='Submit']",
        "input[type='button'][value='Proceed']",
        "input[type='button'][value='Next']",
        "input[onclick*='Continue' i]",
        "input[onclick*='Submit' i]",
        "a[onclick*='Continue' i]",
      ]
    case "main":
      return [
        "#ctl00_HomePageContent_Submit",
        "#ctl00_HomePageContent_btnSubmit",
        "#ctl00_HomePageContent_btnSubmitEmp",
        "input[id*='btnSubmit' i]",
        "input[type='image'][id*='Submit' i]",
        "input[type='submit'][value='Submit']",
        "input[type='button'][value='Submit']",
        "input[onclick*='Submit' i]",
        "a[onclick*='Submit' i]",
      ]
    case "bank":
      return [
        "#ctl00_HomePageContent_btnSubmit",
        "input[id*='btnSubmit' i]",
        "input[type='submit'][value='Submit']",
        "input[type='button'][value='Submit']",
        "input[onclick*='Submit' i]",
        "a[onclick*='Submit' i]",
      ]
    case "nominee":
      return [
        "#ctl00_HomePageContent_btnSave",
        "#ctl00_HomePageContent_btnSaveNominee",
        "input[id*='btnSave' i]",
        "input[type='submit'][value='Save']",
        "input[type='button'][value='Save']",
        "input[onclick*='Save' i]",
        "a[onclick*='Save' i]",
      ]
    default:
      return null
  }
}

let bankDocWatcherSet = false
// Bank page: the cheque/passbook file can't be auto-selected (browser
// security). Once the user picks it, auto-click Submit.
function watchBankDocThenSubmit() {
  if (bankDocWatcherSet) return
  bankDocWatcherSet = true
  const fileEl = document.querySelector("#ctl00_HomePageContent_ctrlFISelectFile")
  if (!fileEl) {
    bankDocWatcherSet = false
    return
  }
  console.log("[ESIC Auto-Fill] Bank page: waiting for document upload → will auto-click Submit")
  const trySubmit = async () => {
    if (!fileEl.value) return
    await sleep(900)
    const res = clickFirstVisible(getPageSubmitSelector("bank") || [], "bank-submit")
    if (res.clicked) console.log("[ESIC Auto-Fill] Bank doc detected — auto-clicked Submit")
  }
  fileEl.addEventListener("change", trySubmit)
  fileEl.addEventListener("input", trySubmit)
}

// ─── Main form: Self Photo upload watcher ───────────────────────────
// The "Upload Self Photo" field is REQUIRED but a file input can't be
// auto-picked (browser security). Once the user picks the photo, auto-
// click "Upload Photo", then auto-click the main Submit.
let photoWatcherSet = false
function watchPhotoUploadThen() {
  if (photoWatcherSet) return
  photoWatcherSet = true
  const fileEl = document.querySelector("#ctl00_HomePageContent_FileUpload_Photo")
  if (!fileEl) {
    photoWatcherSet = false
    return
  }
  const uploadBtn = document.querySelector("#ctl00_HomePageContent_UploadButton")
  console.log("[ESIC Auto-Fill] Main form: waiting for Self Photo upload → will auto-click 'Upload Photo' + Submit")
  const onPick = async () => {
    if (!fileEl.value) return
    await sleep(800)
    if (uploadBtn && !uploadBtn.disabled && isVisible(uploadBtn)) {
      console.log("[ESIC Auto-Fill] Photo picked — auto-clicking 'Upload Photo'")
      uploadBtn.click()
    }
    // Give the upload/PostBack a moment, then auto-click main Submit.
    await sleep(2500)
    const res = clickFirstVisible(getPageSubmitSelector("main") || [], "main-submit")
    if (res.clicked) console.log("[ESIC Auto-Fill] Photo uploaded — auto-clicked main Submit")
  }
  fileEl.addEventListener("change", onPick)
  fileEl.addEventListener("input", onPick)
}

// ─── Bank page 2-step button flow: Search (PostBack) → Submit ────────
async function autoClickBankFlow() {
  const ifscEl = document.querySelector("#ctl00_HomePageContent_txtIFSCcode")
  const bankNameEl = document.querySelector("#ctl00_HomePageContent_txt_Bank_Name_in_Records")
  const bankLoaded = !!(bankNameEl && bankNameEl.value && bankNameEl.value.trim())
  const fileEl = document.querySelector("#ctl00_HomePageContent_ctrlFISelectFile")
  const accEl = document.querySelector("#ctl00_HomePageContent_txtacc_number")

  // Step 1: IFSC entered but bank details not loaded → click Search.
  if (ifscEl && ifscEl.value && !bankLoaded) {
    const searchSelectors = [
      "#ctl00_HomePageContent_btnSearch",
      "input[id*='btnSearch' i]",
      "input[type='submit'][value='Search']",
      "input[type='button'][value='Search']",
      "input[onclick*='Search' i]",
      "img[onclick*='Search' i]",
      "input[type='image'][alt*='Search' i]",
    ]
    await sleep(600)
    const res = clickFirstVisible(searchSelectors, "bank-search")
    if (res.clicked) return res
    return { clicked: false, reason: "bank Search button not found — click it manually" }
  }

  // Step 2: bank details loaded + account filled → need the doc.
  if (bankLoaded && accEl && accEl.value) {
    if (fileEl && !fileEl.value) {
      watchBankDocThenSubmit()
      return { clicked: false, reason: "upload bank doc — Submit will auto-click after" }
    }
    await sleep(600)
    return clickFirstVisible(getPageSubmitSelector("bank") || [], "bank-submit")
  }

  return { clicked: false, reason: "bank flow not ready" }
}

// ─── Live-form mode: auto-click this page's action buttons ────────────
let autoClickFiredThisLoad = false
async function maybeAutoClickSubmit(page, fillResult) {
  if (!fillResult) return
  if (autoClickFiredThisLoad) return

  const settings = await chrome.storage.local.get(["autoClickMode"])
  const autoClick = settings.autoClickMode !== false // default ON
  if (!autoClick) return

  // Flag the <html> tag so the MAIN-world dialog patch auto-accepts any
  // "Are you sure?" confirm() that ESIC pops on Submit.
  document.documentElement.dataset.esicAutoConfirm = "1"

  // Bank page has its own 2-step Search→Submit flow.
  if (page === "bank") {
    autoClickFiredThisLoad = true
    const res = await autoClickBankFlow()
    if (res.clicked) {
      chrome.runtime.sendMessage({
        type: "pageChanged",
        page,
        fillResult: { type: "info", message: "🤖 " + res.reason },
      })
    }
    return
  }

  // Skip when a reload/PostBack is imminent (the fill message says so).
  const skipHints = ["reload", "PostBack", "may reload", "Loading districts", "Waiting for", "loading…", "did not load", "didn't load"]
  const lower = (fillResult.message || "").toLowerCase()
  if (fillResult.type === "info" && skipHints.some((h) => lower.includes(h.toLowerCase()))) {
    return // let the reload happen, then re-run
  }
  if (fillResult.type !== "success" && fillResult.type !== "info") return

  const selectors = getPageSubmitSelector(page)
  if (!selectors) return

  // Entry page: if a Validate button is visible, click it first.
  if (page === "entry") {
    const validateSelectors = [
      "#ctl00_HomePageContent_lnkmobilecheck",
      "a[id*='mobilecheck' i]",
      "a[onclick*='mobilecheck' i]",
      "#ctl00_HomePageContent_btnValidate",
      "input[type='submit'][value='Validate']",
      "input[type='button'][value='Validate']",
      "input[onclick*='Validate' i]",
    ]
    const v = clickFirstVisible(validateSelectors, "entry-validate")
    if (v.clicked) await sleep(1000)
  }

  autoClickFiredThisLoad = true
  // Give the user a beat to see the filled form before we click.
  await sleep(1800)
  const res = clickFirstVisible(selectors, page + "-submit")
  if (res.clicked) {
    chrome.runtime.sendMessage({
      type: "pageChanged",
      page,
      fillResult: { type: "info", message: "🤖 " + res.reason },
    })
  }
}

// ─── Main fill function ────────────────────────────────────────────
async function fillPage() {
  const data = await chrome.storage.local.get(["queue", "currentIndex"])
  if (!data.queue || data.queue.length === 0) {
    return {
      currentPage: "unknown",
      fillResult: { type: "error", message: "No queue loaded. Open popup and load queue.json." },
    }
  }

  const item = data.queue[data.currentIndex]
  if (!item) {
    return {
      currentPage: "success",
      fillResult: { type: "success", message: "All IPs processed!" },
    }
  }

  const ipData = item.normalized
  const page = detectPage()

  let fillResult = null

  switch (page) {
    case "entry":
      fillResult = await fillEntry(ipData)
      break
    case "aadhaar":
      fillResult = await fillAadhaar(ipData)
      break
    case "main":
      // v1 fillMain (continues past postback radios — fills text/geo/language
      // in the same pass). v2 resume is disabled on live (halts at PostBack).
      fillResult = await fillMain(ipData)
      break
    case "bank":
      fillResult = fillBank(ipData)
      break
    case "nominee":
      fillResult = fillNominee(ipData)
      break
    case "dashboard":
      fillResult = await handleDashboard()
      break
    case "success":
      const ipNumber = extractIpNumber()
      if (ipNumber) {
        chrome.runtime.sendMessage({ type: "ipCaptured", ipNumber })
        fillResult = {
          type: "success",
          message: `🎉 IP Number captured: ${ipNumber}. Click "Next IP →" to continue.`,
        }
      } else {
        fillResult = {
          type: "warning",
          message: "Success page detected but IP Number not found. Note it manually, then click Next IP.",
        }
      }
      break
    default:
      fillResult = { type: "info", message: "Not on a recognized ESIC page. Navigate to Add Employee or another registration page." }
  }

  // ─── Live-form mode: fire-and-forget auto-click of this page's submit ──
  if (page !== "dashboard" && page !== "success" && page !== "unknown") {
    maybeAutoClickSubmit(page, fillResult)
  }

  await chrome.storage.local.set({ currentPage: page, lastFillResult: fillResult })
  chrome.runtime.sendMessage({ type: "pageChanged", page, fillResult })

  return { currentPage: page, fillResult, ipNumber: page === "success" ? extractIpNumber() : "" }
}

// ═══════════════════════════════════════════════════════════════════
//  MACRO RECORDER + REPLAYER (opt-in)
//  Records the user's manual fill of ONE employee — capturing the exact
//  live selectors and auto-matching each typed value to a CSV column of
//  the loaded queue — then replays those selectors+values for the rest.
//  Self-heals when ESIC changes field IDs: just re-record.
//  Active only when the popup turns "Use recorded macro" on.
// ═══════════════════════════════════════════════════════════════════

// Stable CSS selector for an element (#id > [name=] > nth-of-type path)
function stableSelector(el) {
  if (!el) return null
  if (el.id) return "#" + CSS.escape(el.id)
  if (el.name) return `[name="${CSS.escape(el.name)}"]`
  const parts = []
  let node = el
  while (node && node.nodeType === 1 && node !== document.body && node.parentElement) {
    const tag = node.tagName.toLowerCase()
    const sibs = Array.from(node.parentElement.children).filter((c) => c.tagName === node.tagName)
    const idx = sibs.indexOf(node) + 1
    parts.unshift(sibs.length > 1 ? `${tag}:nth-of-type(${idx})` : tag)
    node = node.parentElement
  }
  return parts.length ? "body > " + parts.join(" > ") : null
}

// Match a typed value to a CSV column of the current queue item.
function matchColumn(val, item) {
  if (!val || !item) return null
  const norm = item.normalized || {}
  const v = String(val).trim()
  for (const [k, fv] of Object.entries(norm)) {
    if (fv != null && String(fv).trim() === v) return k
  }
  return null
}

let macroRecording = false
let macroSteps = []
let recListenersAttached = false

function attachRecordListeners() {
  if (recListenersAttached) return
  recListenersAttached = true
  document.addEventListener("input", onRecInput, true)
  document.addEventListener("change", onRecInput, true)
  document.addEventListener("click", onRecClick, true)
  console.log("[ESIC Auto-Fill] 🎥 Record listeners attached")
}

function onRecInput(e) {
  if (!macroRecording) return
  const el = e.target
  if (!el || !el.tagName) return
  const tag = el.tagName
  if (tag !== "INPUT" && tag !== "SELECT" && tag !== "TEXTAREA") return
  if (["file", "hidden", "submit", "button", "image"].includes(el.type)) return
  const sel = stableSelector(el)
  if (!sel) return
  const val = el.value
  chrome.storage.local.get(["queue", "currentIndex"], (data) => {
    const item = data.queue && data.queue[data.currentIndex]
    const column = matchColumn(val, item)
    upsertStep({
      selector: sel,
      action: "set",
      column: column || undefined,
      value: column ? undefined : val,
      label: column || "static",
    })
  })
}

function onRecClick(e) {
  if (!macroRecording) return
  const el = e.target.closest
    ? e.target.closest("input[type='submit'], input[type='button'], input[type='image'], button, a, [role='button']")
    : null
  if (!el) return
  const sel = stableSelector(el)
  if (!sel) return
  const label = (el.value || el.textContent || "").trim().slice(0, 30)
  upsertStep({ selector: sel, action: "click", label })
}

function upsertStep(step) {
  const key = step.selector + ":" + step.action
  const idx = macroSteps.map((s) => s.selector + ":" + s.action).lastIndexOf(key)
  if (idx >= 0) macroSteps[idx] = step
  else macroSteps.push(step)
  chrome.storage.local.set({ macro: { steps: macroSteps, version: 1, learnedAt: Date.now() } })
}

function startRecording() {
  macroRecording = true
  macroSteps = []
  chrome.storage.local.set({ recording: true, macro: { steps: [], version: 1, learnedAt: Date.now() }, replayCursor: 0 })
  attachRecordListeners()
  console.log("[ESIC Auto-Fill] 🎥 Recording started — fill the current employee manually")
}

function stopRecording() {
  macroRecording = false
  chrome.storage.local.set({ recording: false, macro: { steps: macroSteps, version: 1, learnedAt: Date.now() } })
  console.log(`[ESIC Auto-Fill] ⏹ Recording stopped — ${macroSteps.length} steps saved`)
}

function clearMacro() {
  macroSteps = []
  macroRecording = false
  chrome.storage.local.set({ recording: false, macro: null, replayCursor: 0, lastReplayIndex: -1 })
  console.log("[ESIC Auto-Fill] 🗑 Macro cleared")
}

// Replay recorded value-steps for the current page. Navigation buttons
// (Submit/Continue/Save) are left to the live-form auto-clicker to avoid
// double-submit; we replay field-sets + non-nav clicks (Search, Upload
// Photo, etc.). Cursor persists across PostBack reloads and resets per IP.
async function replayMacro() {
  const data = await chrome.storage.local.get(["queue", "currentIndex", "macro", "replayCursor", "lastReplayIndex"])
  if (!data.macro || !Array.isArray(data.macro.steps) || !data.macro.steps.length) return { acted: 0, reason: "no macro" }
  if (!data.queue || !data.queue.length) return { acted: 0, reason: "no queue" }
  const item = data.queue[data.currentIndex]
  if (!item) return { acted: 0, reason: "no item" }

  // Reset the cursor when moving to a new employee so the macro replays
  // from the start for each IP.
  let cursor = data.replayCursor || 0
  if (data.lastReplayIndex !== data.currentIndex) {
    cursor = 0
  }

  const norm = item.normalized || {}
  const steps = data.macro.steps
  let acted = 0
  for (let i = cursor; i < steps.length; i++) {
    const step = steps[i]
    const el = document.querySelector(step.selector)
    if (!el) continue // not on this page — skip
    if (!isVisible(el) || el.disabled) continue
    if (step.action === "set") {
      const val = step.column ? norm[step.column] : step.value
      if (val != null && String(val) !== "" && el.value !== String(val)) {
        setValueOnEl(el, String(val))
        acted++
      }
    } else if (step.action === "click") {
      if (/submit|continue|save|next|proceed/i.test(step.label || "")) continue
      el.click()
      acted++
      await sleep(500) // let PostBack/AJAX settle
    }
    cursor = i + 1
  }
  await chrome.storage.local.set({ replayCursor: cursor, lastReplayIndex: data.currentIndex })
  return { acted, reason: `replayed ${acted} step(s)` }
}

// ─── Listen for messages from popup ────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fillPage") {
    fillPage().then((result) => sendResponse(result))
    return true
  }
  if (msg.action === "detectPage") {
    sendResponse({ currentPage: detectPage() })
    return false
  }
  if (msg.action === "startRecording") {
    startRecording()
    sendResponse({ ok: true, steps: macroSteps.length })
    return false
  }
  if (msg.action === "stopRecording") {
    stopRecording()
    sendResponse({ ok: true, steps: macroSteps.length })
    return false
  }
  if (msg.action === "clearMacro") {
    clearMacro()
    sendResponse({ ok: true })
    return false
  }
  if (msg.action === "replayMacro") {
    replayMacro().then((r) => sendResponse(r))
    return true
  }
})

// ─── Auto-fill on page load (with retry for AJAX dropdowns) ─────────
let autoFillRetries = 0
const MAX_AUTO_RETRIES = 3

async function autoFill() {
  const data = await chrome.storage.local.get(["queue", "currentIndex", "macro", "useMacro"])

  const page = detectPage()
  if (page === "unknown") return

  // Dashboard nav (dismiss popups + open Register/Enroll) runs even without
  // a loaded queue -- so the user lands on the entry page after login.
  if (page === "dashboard") {
    console.log("[ESIC Auto-Fill] Dashboard -- handling (no queue needed)")
    await fillPage()
    return
  }

  if (!data.queue || data.queue.length === 0) return

  // If a recorded macro is enabled, replay it for this page (field-sets +
  // non-navigation clicks only; Submit/Continue/Save are still handled by
  // the live-form auto-clicker to avoid double-submit).
  if (data.useMacro && data.macro && Array.isArray(data.macro.steps) && data.macro.steps.length) {
    console.log("[ESIC Auto-Fill] Replaying recorded macro…")
    await replayMacro()
  }

  console.log(`[ESIC Auto-Fill] Auto-filling page: ${page} (attempt ${autoFillRetries + 1})`)
  const result = await fillPage()

  // If the fill reported that dropdowns didn't load, retry after a delay
  if (
    result.fillResult &&
    result.fillResult.type === "warning" &&
    autoFillRetries < MAX_AUTO_RETRIES &&
    (result.fillResult.message.includes("didn't load") ||
      result.fillResult.message.includes("not found"))
  ) {
    autoFillRetries++
    console.log(`[ESIC Auto-Fill] Retrying in 5 seconds... (${autoFillRetries}/${MAX_AUTO_RETRIES})`)
    setTimeout(autoFill, 1500)
  } else {
    autoFillRetries = 0
  }
}

// Initial fill (give AJAX a moment, but fast so the user doesn't click manually)
setTimeout(autoFill, 600);

// ─── Live-form mode: flag <html> so the dialog patch auto-accepts confirms ─
(async () => {
  const { autoClickMode, recording, macro } = await chrome.storage.local.get([
    "autoClickMode",
    "recording",
    "macro",
  ])
  if (autoClickMode !== false) {
    document.documentElement.dataset.esicAutoConfirm = "1"
  }
  // Resume recording across PostBack reloads.
  if (recording) {
    macroSteps = (macro && macro.steps) || []
    macroRecording = true
    attachRecordListeners()
    console.log(`[ESIC Auto-Fill] Resumed recording: ${macroSteps.length} steps`)
  } else if (macro && Array.isArray(macro.steps)) {
    macroSteps = macro.steps
  }
})()

// ─── In-page floating "Fill" button (for popup windows with no toolbar) ──
// ESIC opens the entry/main form in a window.open() popup with no bookmark bar
// or extension toolbar, so the user can't open the extension popup there. This
// floating button lets them (re)trigger the fill + see the result inline.
;(function () {
  if (document.getElementById("esic-float-btn")) return
  const btn = document.createElement("div")
  btn.id = "esic-float-btn"
  btn.style.cssText =
    "position:fixed;bottom:14px;right:14px;z-index:2147483647;background:#dc2626;color:#fff;padding:9px 16px;border-radius:999px;font:600 13px -apple-system,sans-serif;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.35);user-select:none;line-height:1.2;max-width:260px;text-align:center"
  btn.textContent = "🤖 ESIC Fill"
  btn.title = "Click to (re)fill this page. Works in popup windows without a toolbar."
  btn.addEventListener("click", async () => {
    btn.textContent = "🤖 Filling…"
    try {
      const r = await fillPage()
      const msg = r && r.fillResult ? r.fillResult.message : "done"
      btn.textContent = "🤖 " + (msg.length > 60 ? msg.slice(0, 57) + "…" : msg)
    } catch (e) {
      btn.textContent = "🤖 Error: " + e.message
    }
    setTimeout(() => (btn.textContent = "🤖 ESIC Fill"), 6000)
  })
  document.body.appendChild(btn)
  console.log("[ESIC Auto-Fill] floating button injected")
})()

// ─── Right-click "Remember this field" (teach-field) ──────────────────
// Track the last right-clicked element so the context-menu handler can read it.
let __esicLastRightClicked = null
document.addEventListener("contextmenu", (e) => { __esicLastRightClicked = e.target }, true)

function stableSel(el) {
  if (!el) return null
  if (el.id) return "#" + CSS.escape(el.id)
  if (el.name) return `[name="${CSS.escape(el.name)}"]`
  const path = []
  let n = el
  while (n && n.nodeType === 1 && n !== document.body && n.parentElement) {
    const tag = n.tagName.toLowerCase()
    const sibs = Array.from(n.parentElement.children).filter((c) => c.tagName === n.tagName)
    path.unshift(sibs.length > 1 ? `${tag}:nth-of-type(${sibs.indexOf(n) + 1})` : tag)
    n = n.parentElement
  }
  return path.length ? "body > " + path.join(" > ") : null
}

// Learned fields: { csvColumn: selector } — overrides the hardcoded selectors.
let ESIC_LF = {} // learnedFields cache, loaded at fill start
async function loadLearnedFields() {
  const d = await chrome.storage.local.get(["learnedFields"])
  ESIC_LF = d.learnedFields || {}
}
function lfSel(column, fallbackSelector) {
  return (ESIC_LF && ESIC_LF[column]) || fallbackSelector
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "teachField") {
    showTeachFieldPanel()
    sendResponse({ ok: true })
    return false
  }
})

function showTeachFieldPanel() {
  const el = __esicLastRightClicked
  const sel = stableSel(el)
  if (document.getElementById("esic-teach-panel")) document.getElementById("esic-teach-panel").remove()
  const p = document.createElement("div")
  p.id = "esic-teach-panel"
  p.style.cssText = "position:fixed;top:60px;right:14px;z-index:2147483647;background:#fff;border:2px solid #dc2626;border-radius:10px;padding:14px;width:300px;font:13px sans-serif;color:#1a1a1a;box-shadow:0 8px 24px rgba(0,0,0,.3)"
  p.innerHTML = `
    <div style="font-weight:700;color:#dc2626;margin-bottom:8px">🧪 ESIC — Remember this field</div>
    <label style="font-size:11px;color:#666">CSS selector (auto-detected):</label>
    <input id="esic-teach-sel" style="width:100%;font-family:monospace;font-size:11px;padding:4px;margin:4px 0 8px;border:1px solid #ccc;border-radius:4px" value="${(sel || "").replace(/"/g, "&quot;")}">
    <label style="font-size:11px;color:#666">CSV column name (e.g. EmpName, PresentAddress, DOB):</label>
    <input id="esic-teach-col" style="width:100%;padding:4px;margin:4px 0 8px;border:1px solid #ccc;border-radius:4px" placeholder="Column name">
    <div style="display:flex;gap:6px">
      <button id="esic-teach-save" style="flex:1;background:#dc2626;color:#fff;border:none;padding:7px;border-radius:5px;cursor:pointer;font-weight:600">Save</button>
      <button id="esic-teach-cancel" style="flex:1;background:#e5e7eb;border:none;padding:7px;border-radius:5px;cursor:pointer">Cancel</button>
    </div>
    <div id="esic-teach-status" style="font-size:11px;margin-top:6px;color:#065f46"></div>`
  document.body.appendChild(p)
  const close = () => p.remove()
  document.getElementById("esic-teach-cancel").onclick = close
  document.getElementById("esic-teach-save").onclick = async () => {
    const s = document.getElementById("esic-teach-sel").value.trim()
    const c = document.getElementById("esic-teach-col").value.trim()
    const st = document.getElementById("esic-teach-status")
    if (!s || !c) { st.style.color = "#991b1b"; st.textContent = "Enter both selector + column name"; return }
    const d = await chrome.storage.local.get(["learnedFields"])
    const lf = d.learnedFields || {}
    lf[c] = s
    await chrome.storage.local.set({ learnedFields: lf })
    ESIC_LF = lf
    st.style.color = "#065f46"
    st.textContent = "✓ Saved. The fill will use '" + s + "' for " + c + " next time."
    setTimeout(close, 1500)
  }
}
