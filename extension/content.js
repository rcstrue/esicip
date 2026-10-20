// ═══════════════════════════════════════════════════════════════════
//  ESIC IP Auto-Fill — Content Script
//  Runs on ESIC portal pages. Detects page type + auto-fills fields.
//  The user clicks Submit/Continue/Save themselves.
// ═══════════════════════════════════════════════════════════════════

// ─── Page detection ────────────────────────────────────────────────
function detectPage() {
  // Entry page: "Was the Employee ever allotted a ESI Number?" with Yes/No
  if (document.querySelector("#ctl00_HomePageContent_rbtnlistIsregistered_1")) {
    return "entry"
  }
  // Main form: has Employee Name field
  if (document.querySelector("#ctl00_HomePageContent_ctrlTextEmpName")) {
    return "main"
  }
  // Bank page: has IFSC search
  if (document.querySelector("#ctl00_HomePageContent_txtIFSCcode")) {
    return "bank"
  }
  // Nominee page: has nominee name field
  if (document.querySelector("#ctl00_HomePageContent_ctrlTextUserName")) {
    return "nominee"
  }
  // Success page: look for 10-digit IP number in the body
  return "success"
}

// ─── Helper: set a text input value (handles readonly fields too) ──
function setValue(selector, value) {
  const el = document.querySelector(selector)
  if (!el) return false
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set || Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set
  if (setter) {
    setter.call(el, value)
  } else {
    el.value = value
  }
  el.dispatchEvent(new Event("input", { bubbles: true }))
  el.dispatchEvent(new Event("change", { bubbles: true }))
  el.dispatchEvent(new Event("blur", { bubbles: true }))
  return true
}

// ─── Helper: set a <select> by value ───────────────────────────────
function setSelect(selector, value) {
  const el = document.querySelector(selector)
  if (!el) return false
  el.value = value
  el.dispatchEvent(new Event("change", { bubbles: true }))
  return true
}

// ─── Helper: set a <select> by visible label ───────────────────────
function setSelectByLabel(selector, label) {
  const el = document.querySelector(selector)
  if (!el) return false
  for (const opt of el.options) {
    if (opt.text.trim().toLowerCase() === label.trim().toLowerCase()) {
      el.value = opt.value
      el.dispatchEvent(new Event("change", { bubbles: true }))
      return true
    }
  }
  // Fuzzy match: label contains
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
function checkRadio(selector) {
  const el = document.querySelector(selector)
  if (!el) return false
  if (el.disabled) return false
  el.checked = true
  el.dispatchEvent(new Event("change", { bubbles: true }))
  el.dispatchEvent(new Event("click", { bubbles: true }))
  return true
}

// ─── Helper: check a checkbox ──────────────────────────────────────
function checkCheckbox(selector, checked = true) {
  const el = document.querySelector(selector)
  if (!el) return false
  el.checked = checked
  el.dispatchEvent(new Event("change", { bubbles: true }))
  el.dispatchEvent(new Event("click", { bubbles: true }))
  return true
}

// ─── Helper: trigger ASP.NET PostBack ──────────────────────────────
function triggerPostBack(eventTarget) {
  if (typeof __doPostBack === "function") {
    __doPostBack(eventTarget, "")
  }
}

// ─── Get current select value ──────────────────────────────────────
function getSelectValue(selector) {
  const el = document.querySelector(selector)
  return el ? el.value : ""
}

function getSelectLabel(selector) {
  const el = document.querySelector(selector)
  return el && el.selectedIndex >= 0 ? el.options[el.selectedIndex].text : ""
}

function isRadioChecked(selector) {
  const el = document.querySelector(selector)
  return el ? el.checked : false
}

// ─── PAGE 1: ENTRY ─────────────────────────────────────────────────
function fillEntry(data) {
  // Click "No" for "Was the Employee ever allotted a ESI Number?"
  const noRadio = document.querySelector("#ctl00_HomePageContent_rbtnlistIsregistered_1")
  if (noRadio && !noRadio.checked) {
    checkRadio("#ctl00_HomePageContent_rbtnlistIsregistered_1")
    // This triggers a PostBack via onclick
    return { type: "info", message: "✓ Clicked 'No' (new IP). Page will reload. Then click Continue." }
  }
  return { type: "info", message: "Entry page ready. Click 'Continue' button." }
}

// ─── PAGE 2: MAIN FORM ─────────────────────────────────────────────
function fillMain(data) {
  const filled = []
  const errors = []

  // 1. Name (no PostBack)
  if (!document.querySelector("#ctl00_HomePageContent_ctrlTextEmpName").value) {
    setValue("#ctl00_HomePageContent_ctrlTextEmpName", data.EmpName)
    filled.push("Name")
  }

  // 2. Father/Husband radio (Husband triggers PostBack)
  const wantHusband = data.RelationType === "Husband"
  const fatherChecked = isRadioChecked("#ctl00_HomePageContent_ctrlFatherOrHus_0")
  const husbandChecked = isRadioChecked("#ctl00_HomePageContent_ctrlFatherOrHus_1")
  if (wantHusband && !husbandChecked) {
    checkRadio("#ctl00_HomePageContent_ctrlFatherOrHus_1")
    return { type: "info", message: "✓ Selected 'Husband'. Page reloading (PostBack)..." }
  }
  if (!wantHusband && !fatherChecked) {
    checkRadio("#ctl00_HomePageContent_ctrlFatherOrHus_0")
    filled.push("Father")
  }

  // 3. Father/Husband name
  if (!document.querySelector("#ctl00_HomePageContent_ctrlTextFatherHusName").value) {
    setValue("#ctl00_HomePageContent_ctrlTextFatherHusName", data.FatherOrHusbandName)
    filled.push("Father/Husband name")
  }

  // 4. DOB (readonly date picker)
  const dobField = document.querySelector("#ctl00_HomePageContent_ctrlTxtIpDate")
  if (dobField && !dobField.value) {
    setValue("#ctl00_HomePageContent_ctrlTxtIpDate", data.DOB)
    filled.push("DOB")
  }

  // 5. Marital status
  const maritalEl = document.querySelector("#ctl00_HomePageContent_ctrlRDMarried")
  if (maritalEl && maritalEl.value !== data.MaritalStatus) {
    setSelect("#ctl00_HomePageContent_ctrlRDMarried", data.MaritalStatus)
    filled.push("Marital status")
  }

  // 6. Gender radio (PostBack)
  const genderMap = { M: "_0", F: "_1", TG: "_2" }
  const gSuffix = genderMap[data.Gender] || "_0"
  const gSel = `#ctl00_HomePageContent_ctrlRDMale${gSuffix}`
  const gEl = document.querySelector(gSel)
  if (gEl && !gEl.checked && !gEl.disabled) {
    checkRadio(gSel)
    return { type: "info", message: `✓ Selected Gender ${data.Gender}. Page reloading (PostBack)...` }
  }

  // 7. Present address
  if (!document.querySelector("#ctl00_HomePageContent_ctrlTextPresentAddress1").value) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress1", data.PresentAddress)
    filled.push("Address")
  }
  if (data.PresentAddress2 && !document.querySelector("#ctl00_HomePageContent_ctrlTextPresentAddress2").value) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress2", data.PresentAddress2)
  }
  if (data.PresentAddress3 && !document.querySelector("#ctl00_HomePageContent_ctrlTextPresentAddress3").value) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentAddress3", data.PresentAddress3)
  }

  // 8. Pin code
  if (!document.querySelector("#ctl00_HomePageContent_ctrlTxtPresentPinCode").value) {
    setValue("#ctl00_HomePageContent_ctrlTxtPresentPinCode", data.PinCode)
    filled.push("PIN")
  }

  // 9. Mobile
  if (!document.querySelector("#ctl00_HomePageContent_ctrlTextPresentMobileNo").value) {
    setValue("#ctl00_HomePageContent_ctrlTextPresentMobileNo", data.MobileNo)
    filled.push("Mobile")
  }

  // 10. Email (optional)
  if (data.Email) {
    const emailEl = document.querySelector("#ctl00_HomePageContent_ctrlTextPresentEmail")
    if (emailEl && !emailEl.value) {
      setValue("#ctl00_HomePageContent_ctrlTextPresentEmail", data.Email)
    }
  }

  // 11. Present State (PostBack → loads districts)
  const stateEl = document.querySelector("#ctl00_HomePageContent_ctrlTxtPresentState")
  if (stateEl && stateEl.value !== data.PresentState && data.PresentState) {
    setSelect("#ctl00_HomePageContent_ctrlTxtPresentState", data.PresentState)
    return { type: "info", message: "✓ Selected Present State. Loading districts (PostBack)..." }
  }

  // 12. Present District (after state PostBack)
  if (data.PresentDistrict && getSelectLabel("#ctl00_HomePageContent_ctrlTextPresentDistrict") !== data.PresentDistrict) {
    const ok = setSelectByLabel("#ctl00_HomePageContent_ctrlTextPresentDistrict", data.PresentDistrict)
    if (!ok) {
      errors.push(`Present District '${data.PresentDistrict}' not found in dropdown`)
    } else {
      filled.push("District")
    }
  }

  // 13. Copy present → permanent
  if (data.CopyPresentToPermanent === "Yes") {
    const chk = document.querySelector("#ctl00_HomePageContent_chkboxCopyPresentAddress")
    if (chk && !chk.checked) {
      checkCheckbox("#ctl00_HomePageContent_chkboxCopyPresentAddress")
      filled.push("Copy→Permanent")
    }
  }

  // 14. Dispensary type
  const dispTypeMap = { Dispensary: "_0", IMP: "_1", EMud: "_2" }
  const dSuffix = dispTypeMap[data.DispensaryType] || "_0"
  const dSel = `#ctl00_HomePageContent_ctrlRBDispensaryIMP${dSuffix}`
  const dEl = document.querySelector(dSel)
  if (dEl && !dEl.checked) {
    checkRadio(dSel)
    if (data.DispensaryType !== "Dispensary") {
      return { type: "info", message: `✓ Selected ${data.DispensaryType}. Page reloading (PostBack)...` }
    }
  }

  // 15. Dispensary State (PostBack)
  const dispStateEl = document.querySelector("#ctl00_HomePageContent_ddlDispensaryState")
  if (dispStateEl && dispStateEl.value !== data.DispensaryState && data.DispensaryState) {
    setSelect("#ctl00_HomePageContent_ddlDispensaryState", data.DispensaryState)
    return { type: "info", message: "✓ Selected Dispensary State. Loading districts (PostBack)..." }
  }

  // 16. Dispensary District (PostBack)
  if (data.DispensaryDistrict && getSelectLabel("#ctl00_HomePageContent_ddlDispensaryDistrict") !== data.DispensaryDistrict) {
    const ok = setSelectByLabel("#ctl00_HomePageContent_ddlDispensaryDistrict", data.DispensaryDistrict)
    if (!ok) {
      errors.push(`Dispensary District '${data.DispensaryDistrict}' not found`)
    }
    return { type: "info", message: "✓ Selected Dispensary District. Loading dispensaries (PostBack)..." }
  }

  // 17. Dispensary Name (PostBack)
  if (data.DispensaryName && getSelectLabel("#ctl00_HomePageContent_ctrlTextDispensary") !== data.DispensaryName) {
    const ok = setSelectByLabel("#ctl00_HomePageContent_ctrlTextDispensary", data.DispensaryName)
    if (!ok) {
      errors.push(`Dispensary Name '${data.DispensaryName}' not found`)
    }
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
      const ok = setSelectByLabel("#ctl00_HomePageContent_ddllanguage", data.SMSLanguage)
      if (ok) filled.push("SMS Language")
    }
  }

  // 20. Declaration checkbox (required for Submit)
  const decChk = document.querySelector("#ctl00_HomePageContent_dec_chkbox")
  if (decChk && !decChk.checked) {
    checkCheckbox("#ctl00_HomePageContent_dec_chkbox")
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

// ─── PAGE 3: BANK DETAILS ──────────────────────────────────────────
function fillBank(data) {
  const filled = []
  const errors = []

  // 1. IFSC code
  const ifscEl = document.querySelector("#ctl00_HomePageContent_txtIFSCcode")
  if (ifscEl && !ifscEl.value) {
    setValue("#ctl00_HomePageContent_txtIFSCcode", data.IFSCCode)
    filled.push("IFSC")
    // Need to click Search to trigger PostBack
    return { type: "info", message: "✓ Entered IFSC. Click 'Search' button to load bank details." }
  }

  // Check if bank name is loaded (means Search was clicked)
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
    setSelect("#ctl00_HomePageContent_ddlAccountType", data.AccountType)
    filled.push("Account type")
  }

  // 5. Bank document upload — can't auto-upload from extension (security restriction)
  //    User must select the file manually
  const fileEl = document.querySelector("#ctl00_HomePageContent_ctrlFISelectFile")
  if (fileEl && !fileEl.value) {
    errors.push("Select the bank document (cheque/passbook PDF/JPG, ≤200KB) manually, then click Upload")
  }

  if (errors.length > 0) {
    return { type: "warning", message: `Filled: ${filled.join(", ")}. ⚠ ${errors.join("; ")}` }
  }
  if (filled.length > 0) {
    return { type: "success", message: `✓ Filled: ${filled.join(", ")}. Upload bank doc, then click Submit.` }
  }
  return { type: "info", message: "All fields filled. Upload bank doc + click Submit." }
}

// ─── PAGE 4: NOMINEE ───────────────────────────────────────────────
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
    const ok = setSelect("#ctl00_HomePageContent_RelationShipWithIp", data.NomineeRelation)
    if (ok) filled.push("Relation")
  }

  // 3. Nominee share + family member (hidden XML fields — best effort)
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

  // 4. "Nominee is also family member?" — default No
  const akaNo = document.querySelector("#ctl00_HomePageContent_rbtnlistNomneeAkaFamily_1")
  if (akaNo && !akaNo.checked) {
    checkRadio("#ctl00_HomePageContent_rbtnlistNomneeAkaFamily_1")
  }

  if (errors.length > 0) {
    return { type: "error", message: `Filled: ${filled.join(", ")}. Errors: ${errors.join("; ")}` }
  }
  if (filled.length > 0) {
    return { type: "success", message: `✓ Filled: ${filled.join(", ")}. Review and click Save.` }
  }
  return { type: "info", message: "All fields filled. Review and click Save." }
}

// ─── PAGE 5: SUCCESS — extract IP Number ───────────────────────────
function extractIpNumber() {
  const bodyText = document.body.innerText

  // Strategy 1: labeled
  const labeled =
    bodyText.match(/Insurance\s*(?:No|Number)[^\d]*(\d{10})/i) ||
    bodyText.match(/IP\s*(?:No|Number)[^\d]*(\d{10})/i) ||
    bodyText.match(/Pehchan\s*(?:No|Number)[^\d]*(\d{10})/i)
  if (labeled) return labeled[1]

  // Strategy 2: elements with success/ip class
  const els = document.querySelectorAll(
    '[class*="success"], [class*="ip"], [id*="IPNo"], [id*="InsuranceNo"], [id*="lblIP"]',
  )
  for (const el of els) {
    const m = el.textContent.match(/\b\d{10}\b/)
    if (m) return m[0]
  }

  // Strategy 3: headings
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
      // Try to extract IP number
      const ipNumber = extractIpNumber()
      if (ipNumber) {
        // Send to popup to record
        chrome.runtime.sendMessage({ type: "ipCaptured", ipNumber })
        fillResult = {
          type: "success",
          message: `🎉 IP Number captured: ${ipNumber}. Click "Next IP →" to continue.`,
        }
      } else {
        fillResult = {
          type: "warning",
          message: "Success page detected but IP Number not found automatically. Note it down manually, then click Next IP.",
        }
      }
      break
    default:
      fillResult = { type: "error", message: "Not on a recognized ESIC registration page." }
  }

  // Store current page in storage
  await chrome.storage.local.set({ currentPage: page, lastFillResult: fillResult })

  // Notify popup
  chrome.runtime.sendMessage({ type: "pageChanged", page, fillResult })

  return { currentPage: page, fillResult, ipNumber: page === "success" ? extractIpNumber() : "" }
}

// ─── Listen for messages from popup ────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fillPage") {
    fillPage().then((result) => sendResponse(result))
    return true // keep channel open for async response
  }
  if (msg.action === "detectPage") {
    sendResponse({ currentPage: detectPage() })
    return false
  }
})

// ─── Auto-fill on page load ────────────────────────────────────────
// Wait a moment for the page to fully settle, then auto-fill
setTimeout(async () => {
  const data = await chrome.storage.local.get(["queue", "currentIndex"])
  if (data.queue && data.queue.length > 0) {
    // Only auto-fill if we're on a recognized page
    const page = detectPage()
    if (page !== "unknown") {
      console.log("[ESIC Auto-Fill] Auto-filling page:", page)
      fillPage()
    }
  }
}, 2000)
