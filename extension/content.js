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
  // Success page
  return "success"
}

// ─── PAGE 1: ENTRY ─────────────────────────────────────────────────
function fillEntry(data) {
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

  // 2. Fill mobile number (field ID is txtmobilenumber — all lowercase)
  const mobileSelectors = [
    "#ctl00_HomePageContent_txtmobilenumber",
    "#ctl00_HomePageContent_ctrlTextPresentMobileNo",
    "#ctl00_HomePageContent_txtMobileNo",
    "#ctl00_HomePageContent_ctrlTextMobile",
    "#ctl00_HomePageContent_txtMobile",
    "input[name*='mobilenumber' i]",
    "input[id*='mobilenumber' i]",
    "input[name*='Mobile' i][maxlength='10']",
    "input[id*='Mobile' i]:not([disabled])",
  ]
  const mobileEl = findField(mobileSelectors)
  if (mobileEl && !mobileEl.value && data.MobileNo) {
    setFieldValue(mobileSelectors, data.MobileNo)
    filled.push("Mobile")
  }

  // 3. Click Validate button (if present — validates the mobile number)
  const validateBtn = findField([
    "#ctl00_HomePageContent_btnValidate",
    "input[value='Validate']",
    "input[onclick*='Validate' i]",
    "input[type='submit'][value='Validate']",
    "input[type='button'][value='Validate']",
  ])
  if (validateBtn && filled.includes("Mobile")) {
    return { type: "info", message: "✓ Filled mobile number. Click 'Validate' to verify it, then click Continue." }
  }

  // 4. Click Continue
  const continueBtn = findField([
    "#ctl00_HomePageContent_btnContinue",
    "input[value='Continue']",
    "input[onclick*='Continue' i]",
  ])
  if (continueBtn) {
    return { type: "info", message: "✓ Entry page ready. Click 'Continue' to proceed to Aadhaar page." }
  }
  return { type: "info", message: "Entry page: No selected + mobile filled. Click Validate (if shown), then Continue." }
}

// ─── PAGE 2: AADHAAR ───────────────────────────────────────────────
function fillAadhaar(data) {
  const filled = []

  // 1. Fill Aadhaar number
  const aadhaarSelectors = [
    "#ctl00_HomePageContent_txtAadhaar",
    "#ctl00_HomePageContent_ctrlTextAadhaar",
    "#ctl00_HomePageContent_txtAadhaarNo",
    "input[name*='Aadhaar']",
    "input[id*='Aadhaar']",
  ]
  const aadhaarEl = findField(aadhaarSelectors)
  if (aadhaarEl && !aadhaarEl.value && data.AadhaarNumber) {
    setFieldValue(aadhaarSelectors, data.AadhaarNumber)
    filled.push("Aadhaar")
  }

  // 2. Select "Later" — could be a radio, dropdown, or link
  //    Try radio buttons with value "Later" or text containing "Later"
  const laterSelectors = [
    "input[value='Later']",
    "input[value='later']",
    "input[onclick*='Later']",
    "label:has-text('Later') input",
    "#ctl00_HomePageContent_rbtnLater",
    "input[id*='Later']",
  ]
  const laterEl = findField(laterSelectors)
  if (laterEl) {
    checkRadio(laterSelectors)
    filled.push("Later")
  } else {
    // Try dropdown option
    const laterSelect = setSelectByLabel([
      "select[name*='Aadhaar']",
      "select[id*='Aadhaar']",
      "select[id*='ddlOption']",
    ], "Later")
    if (laterSelect) filled.push("Later (dropdown)")
  }

  // 3. Click Continue/Submit
  const continueBtn = findField([
    "#ctl00_HomePageContent_btnContinue",
    "#ctl00_HomePageContent_btnSubmit",
    "input[value='Continue']",
    "input[value='Submit']",
    "input[onclick*='Continue']",
  ])

  if (filled.length > 0) {
    return {
      type: "success",
      message: `✓ Filled: ${filled.join(", ")}. Click Continue to proceed to main form.`,
    }
  }
  return {
    type: "info",
    message: "Aadhaar page detected. Fill Aadhaar number + select 'Later' + click Continue. Use Diagnose if fields not found.",
  }
}

// ─── PAGE 3: MAIN FORM ─────────────────────────────────────────────
function fillMain(data) {
  const filled = []
  const errors = []

  // 1. Name
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextEmpName"])) {
    setValue("#ctl00_HomePageContent_ctrlTextEmpName", data.EmpName)
    filled.push("Name")
  }

  // 2. Father/Husband radio (Husband triggers PostBack)
  const wantHusband = data.RelationType === "Husband"
  const fatherChecked = isRadioChecked(["#ctl00_HomePageContent_ctrlFatherOrHus_0"])
  const husbandChecked = isRadioChecked(["#ctl00_HomePageContent_ctrlFatherOrHus_1"])
  if (wantHusband && !husbandChecked) {
    checkRadio(["#ctl00_HomePageContent_ctrlFatherOrHus_1"])
    return { type: "info", message: "✓ Selected 'Husband'. Page reloading (PostBack)..." }
  }
  if (!wantHusband && !fatherChecked) {
    checkRadio(["#ctl00_HomePageContent_ctrlFatherOrHus_0"])
    filled.push("Father")
  }

  // 3. Father/Husband name
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextFatherHusName"])) {
    setValue("#ctl00_HomePageContent_ctrlTextFatherHusName", data.FatherOrHusbandName)
    filled.push("Father/Husband name")
  }

  // 4. DOB (readonly date picker)
  const dobEl = document.querySelector("#ctl00_HomePageContent_ctrlTxtIpDate")
  if (dobEl && !dobEl.value) {
    setValue("#ctl00_HomePageContent_ctrlTxtIpDate", data.DOB)
    filled.push("DOB")
  }

  // 5. Marital status
  const maritalEl = document.querySelector("#ctl00_HomePageContent_ctrlRDMarried")
  if (maritalEl && maritalEl.value !== data.MaritalStatus) {
    setSelect(["#ctl00_HomePageContent_ctrlRDMarried"], data.MaritalStatus)
    filled.push("Marital status")
  }

  // 6. Gender radio (PostBack)
  const genderMap = { M: "_0", F: "_1", TG: "_2" }
  const gSuffix = genderMap[data.Gender] || "_0"
  const gSel = `#ctl00_HomePageContent_ctrlRDMale${gSuffix}`
  const gEl = document.querySelector(gSel)
  if (gEl && !gEl.checked && !gEl.disabled) {
    checkRadio([gSel])
    return { type: "info", message: `✓ Selected Gender ${data.Gender}. Page reloading (PostBack)...` }
  }

  // ─── 10. Present Address ─────────────────────────────────────────
  // Address line 1
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentAddress1"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress1", data.PresentAddress)
    filled.push("Present Address")
  }
  if (data.PresentAddress2 && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentAddress2"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress2", data.PresentAddress2)
  }
  if (data.PresentAddress3 && !getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentAddress3"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress3", data.PresentAddress3)
  }

  // Pin code
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTxtPresentPinCode"])) {
    setValue("#ctl00_HomePageContent_ctrlTxtPresentPinCode", data.PinCode)
    filled.push("PIN")
  }

  // Mobile
  if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextPresentMobileNo"])) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentMobileNo", data.MobileNo)
    filled.push("Mobile")
  }

  // Email (optional)
  if (data.Email) {
    const emailEl = document.querySelector("#ctl00_HomePageContent_ctrlTextPresentEmail")
    if (emailEl && !emailEl.value) {
      setValue("#ctl00_HomePageContent_ctrlTextPresentEmail", data.Email)
    }
  }

  // Present State (PostBack → loads districts) — ONLY fill if not already set
  const stateEl = document.querySelector("#ctl00_HomePageContent_ctrlTxtPresentState")
  if (stateEl && stateEl.value !== data.PresentState && data.PresentState) {
    setSelect(["#ctl00_HomePageContent_ctrlTxtPresentState"], data.PresentState)
    return { type: "info", message: "✓ Selected Present State. Loading districts (PostBack)..." }
  }

  // Present District (after state PostBack — check if dropdown has options)
  const distEl = document.querySelector("#ctl00_HomePageContent_ctrlTextPresentDistrict")
  if (distEl && distEl.options.length > 1 && getSelectLabel(["#ctl00_HomePageContent_ctrlTextPresentDistrict"]) !== data.PresentDistrict) {
    const ok = setSelectByLabel(["#ctl00_HomePageContent_ctrlTextPresentDistrict"], data.PresentDistrict)
    if (!ok) {
      errors.push(`Present District '${data.PresentDistrict}' not found in dropdown`)
    } else {
      filled.push("District")
    }
  }

  // 11. Permanent Address — copy from present if CopyPresentToPermanent = Yes
  if (data.CopyPresentToPermanent === "Yes") {
    const chk = document.querySelector("#ctl00_HomePageContent_chkboxCopyPresentAddress")
    if (chk && !chk.checked) {
      checkCheckbox(["#ctl00_HomePageContent_chkboxCopyPresentAddress"])
      filled.push("Copy→Permanent")
    }
  } else if (data.PermanentAddress) {
    // Fill permanent address manually
    if (!getFieldValue(["#ctl00_HomePageContent_ctrlTextPermanentAddress1"])) {
      setValue("#ctl00_HomePageContent_ctrlTextPermanentAddress1", data.PermanentAddress)
    }
  }

  // ─── 12a. Dispensary/IMP/mEUD For IP ─────────────────────────────
  // Dispensary type radio
  const dispTypeMap = { Dispensary: "_0", IMP: "_1", EMud: "_2" }
  const dSuffix = dispTypeMap[data.DispensaryType] || "_0"
  const dSel = `#ctl00_HomePageContent_ctrlRBDispensaryIMP${dSuffix}`
  const dEl = document.querySelector(dSel)
  if (dEl && !dEl.checked) {
    checkRadio([dSel])
    if (data.DispensaryType !== "Dispensary") {
      return { type: "info", message: `✓ Selected ${data.DispensaryType}. Page reloading (PostBack)...` }
    }
  }

  // Dispensary State (PostBack)
  const dispStateEl = document.querySelector("#ctl00_HomePageContent_ddlDispensaryState")
  if (dispStateEl && dispStateEl.value !== data.DispensaryState && data.DispensaryState) {
    setSelect(["#ctl00_HomePageContent_ddlDispensaryState"], data.DispensaryState)
    return { type: "info", message: "✓ Selected Dispensary State (12a). Loading districts..." }
  }

  // Dispensary District (PostBack)
  const dispDistEl = document.querySelector("#ctl00_HomePageContent_ddlDispensaryDistrict")
  if (dispDistEl && dispDistEl.options.length > 1 && getSelectLabel(["#ctl00_HomePageContent_ddlDispensaryDistrict"]) !== data.DispensaryDistrict) {
    const ok = setSelectByLabel(["#ctl00_HomePageContent_ddlDispensaryDistrict"], data.DispensaryDistrict)
    if (!ok) {
      errors.push(`Dispensary District '${data.DispensaryDistrict}' not found`)
    }
    return { type: "info", message: "✓ Selected Dispensary District (12a). Loading dispensaries..." }
  }

  // Dispensary Name
  const dispNameEl = document.querySelector("#ctl00_HomePageContent_ctrlTextDispensary")
  if (dispNameEl && dispNameEl.options.length > 1 && getSelectLabel(["#ctl00_HomePageContent_ctrlTextDispensary"]) !== data.DispensaryName) {
    const ok = setSelectByLabel(["#ctl00_HomePageContent_ctrlTextDispensary"], data.DispensaryName)
    if (!ok) {
      errors.push(`Dispensary Name '${data.DispensaryName}' not found`)
    }
  }

  // ─── 12b. Dispensary/IMP/mEUD for Family Members ────────────────
  // Same data as 12a — fill if these fields exist
  const depDispStateEl = document.querySelector("#ctl00_HomePageContent_ddldependantDispensaryState")
  if (depDispStateEl) {
    // Dispensary type
    const depTypeMap = { Dispensary: "_0", IMP: "_1", EMud: "_2" }
    const depSuffix = depTypeMap[data.DispensaryType] || "_0"
    checkRadio([`#ctl00_HomePageContent_ctrlRBDependantDispensaryIMP${depSuffix}`])

    // State
    if (depDispStateEl.value !== data.DispensaryState && data.DispensaryState) {
      setSelect(["#ctl00_HomePageContent_ddldependantDispensaryState"], data.DispensaryState)
      return { type: "info", message: "✓ Selected Family Dispensary State (12b). Loading districts..." }
    }

    // District
    const depDispDistEl = document.querySelector("#ctl00_HomePageContent_ddldependantDispensaryDistrict")
    if (depDispDistEl && depDispDistEl.options.length > 1 && getSelectLabel(["#ctl00_HomePageContent_ddldependantDispensaryDistrict"]) !== data.DispensaryDistrict) {
      setSelectByLabel(["#ctl00_HomePageContent_ddldependantDispensaryDistrict"], data.DispensaryDistrict)
      return { type: "info", message: "✓ Selected Family Dispensary District (12b). Loading dispensaries..." }
    }

    // Dispensary name
    const depDispNameEl = document.querySelector("#ctl00_HomePageContent_ddldependantdispensary")
    if (depDispNameEl && depDispNameEl.options.length > 1 && getSelectLabel(["#ctl00_HomePageContent_ddldependantdispensary"]) !== data.DispensaryName) {
      setSelectByLabel(["#ctl00_HomePageContent_ddldependantdispensary"], data.DispensaryName)
    }
    filled.push("Family Dispensary (12b)")
  }

  // 18. Appointment date (readonly)
  const doaEl = document.querySelector("#ctl00_HomePageContent_ctrlDIDateOfAppointmentDy")
  if (doaEl && !doaEl.value) {
    setValue("#ctl00_HomePageContent_ctrlDIDateOfAppointmentDy", data.AppointmentDate)
    filled.push("Appointment date")
  }

  // 19. SMS Language
  if (data.SMSLanguage) {
    const langEl = document.querySelector("#ctl00_HomePageContent_ddllanguage")
    if (langEl && langEl.selectedIndex === 0) {
      const ok = setSelectByLabel(["#ctl00_HomePageContent_ddllanguage"], data.SMSLanguage)
      if (ok) filled.push("SMS Language")
    }
  }

  // 20. Declaration checkbox (required for Submit)
  const decChk = document.querySelector("#ctl00_HomePageContent_dec_chkbox")
  if (decChk && !decChk.checked) {
    checkCheckbox(["#ctl00_HomePageContent_dec_chkbox"])
    filled.push("Declaration")
  }

  // Report
  if (errors.length > 0) {
    return { type: "error", message: `Filled: ${filled.join(", ")}. Errors: ${errors.join("; ")}` }
  }
  if (filled.length > 0) {
    return { type: "success", message: `✓ Filled: ${filled.join(", ")}. Review and click Submit.` }
  }
  return { type: "info", message: "All fields already filled. Review and click Submit." }
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
      fillResult = fillEntry(ipData)
      break
    case "aadhaar":
      fillResult = fillAadhaar(ipData)
      break
    case "main":
      fillResult = fillMain(ipData)
      break
    case "bank":
      fillResult = fillBank(ipData)
      break
    case "nominee":
      fillResult = fillNominee(ipData)
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
      fillResult = { type: "error", message: "Not on a recognized ESIC registration page." }
  }

  await chrome.storage.local.set({ currentPage: page, lastFillResult: fillResult })
  chrome.runtime.sendMessage({ type: "pageChanged", page, fillResult })

  return { currentPage: page, fillResult, ipNumber: page === "success" ? extractIpNumber() : "" }
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
})

// ─── Auto-fill on page load ────────────────────────────────────────
setTimeout(async () => {
  const data = await chrome.storage.local.get(["queue", "currentIndex"])
  if (data.queue && data.queue.length > 0) {
    const page = detectPage()
    if (page !== "unknown") {
      console.log("[ESIC Auto-Fill] Auto-filling page:", page)
      fillPage()
    }
  }
}, 2000)
