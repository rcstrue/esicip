#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ESIC IP BULK REGISTRATION RUNNER  ·  v1.0
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  WHAT THIS DOES
 *  ──────────────
 *  Reads `queue.json` (exported by the ESIC Helper web tool) and drives the
 *  ESIC employer portal to register each Insured Person automatically:
 *
 *    1.  Launches a persistent Chromium browser.
 *    2.  You log in + solve the login captcha ONCE.
 *    3.  For each IP in the queue, the runner:
 *          - Page 1 (Entry):  clicks "No" for "ESI allotted before?" → Continue
 *          - Page 2 (Main):   fills name, father/husband, DOB, marital, gender,
 *                              address, dispensary cascade, appointment date,
 *                              SMS language → ticks declaration → clicks Submit
 *          - Page 3 (Bank):   types IFSC → Search → fills account no, MICR,
 *                              account type → uploads cheque/passbook PDF → Submit
 *          - Page 4 (Nominee): fills nominee name, relation, share, family
 *                               member → Save
 *          - Captures the generated 10-digit IP Number from the success page
 *          - Writes IP Number + status to results.json + results.csv
 *    4.  Auto-advances to the next IP. 5-second delay between IPs (configurable).
 *    5.  On error: pauses, takes a screenshot, waits for you to fix + Enter.
 *    6.  Ctrl+C anytime — state is saved; restart resumes from last completed IP.
 *
 *  YOU TOUCH NOTHING EXCEPT:
 *    - Login + captcha (once, at the start)
 *    - Press Enter on error (to retry or skip)
 *
 *  ─────────────────────────────────────────────────────────────────────────
 *  SETUP (run once on your machine)
 *  ─────────────────────────────────────────────────────────────────────────
 *    1.  Install Node.js 18+ from https://nodejs.org
 *    2.  Create a folder, e.g. `esic-runner`:
 *          mkdir esic-runner && cd esic-runner
 *    3.  Save this file as `runner.mjs` in that folder.
 *    4.  Create `package.json` with this content:
 *          {
 *            "name": "esic-runner",
 *            "version": "1.0.0",
 *            "private": true,
 *            "type": "module",
 *            "scripts": { "start": "node runner.mjs" },
 *            "dependencies": { "playwright": "^1.48.0" }
 *          }
 *    5.  Run:  npm install  &&  npx playwright install chromium
 *    6.  Copy your `queue.json` (from the web tool's Export step) into the folder.
 *    7.  Put your bank document files (cheque/passbook PDFs, ≤200KB each) in a
 *        `docs/` subfolder. The `BankDocPath` column in your CSV must point to
 *        these files (e.g. `./docs/kishan_cheque.pdf`).
 *
 *  ─────────────────────────────────────────────────────────────────────────
 *  RUN
 *  ─────────────────────────────────────────────────────────────────────────
 *    node runner.mjs
 *      → Browser opens to ESIC login page.
 *      → You log in + solve captcha.
 *      → Press Enter in this terminal to start the queue.
 *      → Walk away. Come back when it says COMPLETED.
 *
 *  OPTIONAL: create `config.json` to override defaults:
 *    {
 *      "delayBetweenIPs": 5000,
 *      "interactiveMode": false,
 *      "headless": false
 *    }
 *
 *  ─────────────────────────────────────────────────────────────────────────
 *  HONEST LIMITATIONS (read before running)
 *  ─────────────────────────────────────────────────────────────────────────
 *  - The runner is built from the ASPX source files you provided. ESIC may
 *    change field IDs, page flow, or add anti-bot measures without notice.
 *  - The nominee + family member XML hidden fields are populated by a grid UI
 *    whose JS source we don't have. The runner sets the XML directly with a
 *    best-guess format. If the nominee Save fails, adjust the XML format in
 *    `setNomineeXml()` below after inspecting the actual page.
 *  - The success page HTML is not in the files you sent. IP Number extraction
 *    uses 3 fallback strategies. If all fail, check error-screenshots/ and
 *    adjust `extractIpNumber()` below.
 *  - Bank document upload requires the file to exist at `BankDocPath`. The
 *    runner will NOT pause for manual file selection — it errors out instead.
 *  - Keep this as a personal assistive tool for your own establishment's IPs.
 *    Don't resell it as a service. Aadhaar/bank data is sensitive — purge the
 *    browser-session/ folder after your batch completes.
 *  ═══════════════════════════════════════════════════════════════════════════
 */

import { chromium } from "playwright"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { createInterface } from "node:readline"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Configuration ─────────────────────────────────────────────────────────
const CONFIG = {
  queueFile: join(__dirname, "queue.json"),
  stateFile: join(__dirname, "state.json"),
  resultsFile: join(__dirname, "results.json"),
  resultsCsv: join(__dirname, "results.csv"),
  sessionDir: join(__dirname, "browser-session"),
  screenshotsDir: join(__dirname, "error-screenshots"),

  delayBetweenIPs: 5000,
  postbackTimeout: 30000,
  pageTimeout: 60000,

  interactiveMode: false, // true = pause before each Submit
  headless: false,

  loginUrl: "https://www.esic.in/InsuranceGlobalWebV4/InsuranceHome.aspx",
  addEmployeeUrl:
    "https://www.esic.in/InsuranceGlobalWebV4/EmployeePortal/1RegisteredEmployees.aspx",
}

const userConfigFile = join(__dirname, "config.json")
if (existsSync(userConfigFile)) {
  Object.assign(CONFIG, JSON.parse(readFileSync(userConfigFile, "utf8")))
}

// ─── Helpers ───────────────────────────────────────────────────────────────
const log = (msg) =>
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function waitForEnter(prompt = "Press Enter to continue...") {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) =>
    rl.question(prompt, (answer) => {
      rl.close()
      resolve(answer)
    }),
  )
}

async function waitForPostBack(page, timeout = CONFIG.postbackTimeout) {
  await page.waitForLoadState("networkidle", { timeout })
  await sleep(500)
}

async function setReadonlyInput(page, selector, value) {
  await page.evaluate(
    ({ sel, val }) => {
      const el = document.querySelector(sel)
      if (!el) throw new Error(`Element not found: ${sel}`)
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      ).set
      setter.call(el, val)
      el.dispatchEvent(new Event("input", { bubbles: true }))
      el.dispatchEvent(new Event("change", { bubbles: true }))
      el.dispatchEvent(new Event("blur", { bubbles: true }))
    },
    { sel: selector, val: value },
  )
}

async function checkErrorSpans(page) {
  return await page.evaluate(() => {
    const errors = []
    const spans = document.querySelectorAll(
      'span[id*="RequiredFieldValidator"], span[id*="RegularExpressionValidator"], span[id*="CompareValidator"], span.errordisplay',
    )
    for (const s of spans) {
      const cs = window.getComputedStyle(s)
      const isVisible =
        cs.display !== "none" &&
        cs.visibility !== "hidden" &&
        s.offsetParent !== null
      if (isVisible && s.textContent.trim()) {
        errors.push(s.textContent.trim())
      }
    }
    return errors
  })
}

async function takeScreenshot(page, rowIndex, label) {
  if (!existsSync(CONFIG.screenshotsDir))
    mkdirSync(CONFIG.screenshotsDir, { recursive: true })
  const path = join(
    CONFIG.screenshotsDir,
    `row-${rowIndex}-${label}-${Date.now()}.png`,
  )
  await page.screenshot({ path, fullPage: true })
  log(`  📸 Screenshot: ${path}`)
  return path
}

// ─── State ─────────────────────────────────────────────────────────────────
function loadState() {
  if (existsSync(CONFIG.stateFile))
    return JSON.parse(readFileSync(CONFIG.stateFile, "utf8"))
  return { lastCompletedIndex: -1, results: [] }
}
function saveState(state) {
  writeFileSync(CONFIG.stateFile, JSON.stringify(state, null, 2))
}
function resultsToCSV(results) {
  const headers = ["rowIndex", "empName", "ipNumber", "status", "message", "timestamp"]
  const lines = [headers.join(",")]
  for (const r of results) {
    const row = headers.map((h) => {
      const v = String(r[h] ?? "").replace(/"/g, '""')
      return v.includes(",") || v.includes('"') || v.includes("\n")
        ? `"${v}"`
        : v
    })
    lines.push(row.join(","))
  }
  return lines.join("\n")
}

// ─── IP Number extraction from success page ────────────────────────────────
// ⚠ Success page HTML not provided — uses 3 fallback strategies.
//    Adjust this function if extraction fails (check error-screenshots/).
async function extractIpNumber(page) {
  return await page.evaluate(() => {
    const bodyText = document.body.innerText

    // Strategy 1: labeled "Insurance No" / "IP No" / "Pehchan No"
    const labeled =
      bodyText.match(/Insurance\s*(?:No|Number)[^\d]*(\d{10})/i) ||
      bodyText.match(/IP\s*(?:No|Number)[^\d]*(\d{10})/i) ||
      bodyText.match(/Pehchan\s*(?:No|Number)[^\d]*(\d{10})/i)
    if (labeled) return labeled[1]

    // Strategy 2: elements with success/ip class or id
    const els = document.querySelectorAll(
      '[class*="success"], [class*="ip"], [id*="IPNo"], [id*="InsuranceNo"], [id*="lblIP"]',
    )
    for (const el of els) {
      const m = el.textContent.match(/\b\d{10}\b/)
      if (m) return m[0]
    }

    // Strategy 3: any standalone 10-digit number in headings
    const headings = document.querySelectorAll(
      "h1, h2, h3, .pageHeaderText, .pageHeader, .success",
    )
    for (const h of headings) {
      const m = h.textContent.match(/\b\d{10}\b/)
      if (m) return m[0]
    }

    return ""
  })
}

// ─── Nominee XML (best-effort — adjust if Save fails) ─────────────────────
async function setNomineeXml(page, data) {
  await page.evaluate(
    ({ share, fmName, fmDob, fmRel }) => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      ).set

      // Nominee share XML
      const nomineeField = document.querySelector(
        "#ctl00_HomePageContent_NomineeXmldata",
      )
      if (nomineeField) {
        const nomineeXml = `<Nominees><Nominee><Share>${share}</Share></Nominee></Nominees>`
        setter.call(nomineeField, nomineeXml)
        nomineeField.dispatchEvent(new Event("change", { bubbles: true }))
      }

      // Family member XML (optional)
      if (fmName) {
        const familyField = document.querySelector(
          "#ctl00_HomePageContent_Xmldatahidden",
        )
        if (familyField) {
          const familyXml = `<FamilyMembers><FamilyMember><Name>${fmName}</Name><DOB>${fmDob}</DOB><Relation>${fmRel}</Relation></FamilyMember></FamilyMembers>`
          setter.call(familyField, familyXml)
          familyField.dispatchEvent(new Event("change", { bubbles: true }))
        }
      }
    },
    {
      share: data.NomineeShare,
      fmName: data.FamilyMemberName || "",
      fmDob: data.FamilyMemberDOB || "",
      fmRel: data.FamilyMemberRelation || "",
    },
  )
}

// ─── The 4-page registration flow ──────────────────────────────────────────
async function registerOneIP(page, data, rowIndex) {
  log(`  → Registering: ${data.EmpName}`)

  // ═══ PAGE 1: ENTRY ════════════════════════════════════════════════════
  log("  → Page 1/4: Entry")
  await page.goto(CONFIG.addEmployeeUrl, { timeout: CONFIG.pageTimeout })
  await waitForPostBack(page)

  if (!(await page.isVisible("#ctl00_HomePageContent_rbtnlistIsregistered_1"))) {
    throw new Error("Entry page did not load — check you are still logged in")
  }

  // Click "No" for "Was the employee ever allotted a ESI Number?"
  await page.check("#ctl00_HomePageContent_rbtnlistIsregistered_1")
  await waitForPostBack(page)

  if (CONFIG.interactiveMode)
    await waitForEnter("  ⏸ Entry ready. Enter to Continue...")

  await page.click("#ctl00_HomePageContent_btnContinue")
  await waitForPostBack(page)

  // ═══ PAGE 2: MAIN FORM ════════════════════════════════════════════════
  log("  → Page 2/4: Main form")
  await page.waitForSelector("#ctl00_HomePageContent_ctrlTextEmpName", {
    timeout: CONFIG.pageTimeout,
  })

  // 1. Name
  await page.fill("#ctl00_HomePageContent_ctrlTextEmpName", data.EmpName)

  // 2. Father/Husband radio (BEFORE marital/gender — respects interlock)
  if (data.RelationType === "Father") {
    await page.check("#ctl00_HomePageContent_ctrlFatherOrHus_0")
  } else {
    await page.check("#ctl00_HomePageContent_ctrlFatherOrHus_1")
    await waitForPostBack(page) // locks gender to F
  }

  // 3. Father/Husband name
  await page.fill("#ctl00_HomePageContent_ctrlTextFatherHusName", data.FatherOrHusbandName)

  // 4. DOB (readonly date picker)
  await setReadonlyInput(page, "#ctl00_HomePageContent_ctrlTxtIpDate", data.DOB)
  await sleep(300)

  // 5. Marital status
  await page.selectOption("#ctl00_HomePageContent_ctrlRDMarried", data.MaritalStatus)
  await sleep(300)

  // 6. Gender (PostBack)
  const genderMap = { M: "_0", F: "_1", TG: "_2" }
  const gSuffix = genderMap[data.Gender] || "_0"
  const gSel = `#ctl00_HomePageContent_ctrlRDMale${gSuffix}`
  if (await page.isVisible(gSel)) {
    if (!(await page.isDisabled(gSel))) {
      await page.check(gSel)
      await waitForPostBack(page)
    }
  }

  // 7. Present address
  await page.fill("#ctl00_HomePageContent_ctrlTextPresentAddress1", data.PresentAddress)
  if (data.PresentAddress2)
    await page.fill("#ctl00_HomePageContent_ctrlTextPresentAddress2", data.PresentAddress2)
  if (data.PresentAddress3)
    await page.fill("#ctl00_HomePageContent_ctrlTextPresentAddress3", data.PresentAddress3)

  // 8. Pin
  await page.fill("#ctl00_HomePageContent_ctrlTxtPresentPinCode", data.PinCode)

  // 9. Mobile
  await page.fill("#ctl00_HomePageContent_ctrlTextPresentMobileNo", data.MobileNo)

  // 10. Email (optional)
  if (data.Email)
    await page.fill("#ctl00_HomePageContent_ctrlTextPresentEmail", data.Email)

  // 11. Present State (PostBack → loads districts)
  await page.selectOption("#ctl00_HomePageContent_ctrlTxtPresentState", data.PresentState)
  await waitForPostBack(page)

  // 12. Present District (by label — codes are state-specific)
  try {
    await page.selectOption("#ctl00_HomePageContent_ctrlTextPresentDistrict", {
      label: data.PresentDistrict,
    })
  } catch {
    throw new Error(`Present District '${data.PresentDistrict}' not in dropdown`)
  }
  await sleep(500)

  // 13. Copy present → permanent
  if (data.CopyPresentToPermanent === "Yes") {
    await page.check("#ctl00_HomePageContent_chkboxCopyPresentAddress")
    await sleep(300)
  }

  // 14. Dispensary type
  const dispTypeMap = { Dispensary: "_0", IMP: "_1", EMud: "_2" }
  const dSuffix = dispTypeMap[data.DispensaryType] || "_0"
  await page.check(`#ctl00_HomePageContent_ctrlRBDispensaryIMP${dSuffix}`)
  if (data.DispensaryType !== "Dispensary") await waitForPostBack(page)

  // 15. Dispensary State (PostBack)
  await page.selectOption("#ctl00_HomePageContent_ddlDispensaryState", data.DispensaryState)
  await waitForPostBack(page)

  // 16. Dispensary District (PostBack)
  try {
    await page.selectOption("#ctl00_HomePageContent_ddlDispensaryDistrict", {
      label: data.DispensaryDistrict,
    })
  } catch {
    throw new Error(`Dispensary District '${data.DispensaryDistrict}' not in dropdown`)
  }
  await waitForPostBack(page)

  // 17. Dispensary Name (PostBack — by label)
  try {
    await page.selectOption("#ctl00_HomePageContent_ctrlTextDispensary", {
      label: data.DispensaryName,
    })
  } catch {
    throw new Error(`Dispensary Name '${data.DispensaryName}' not in dropdown`)
  }
  await waitForPostBack(page)

  // 18. Appointment date (readonly)
  await setReadonlyInput(
    page,
    "#ctl00_HomePageContent_ctrlDIDateOfAppointmentDy",
    data.AppointmentDate,
  )
  await sleep(300)

  // 19. SMS Language
  try {
    await page.selectOption("#ctl00_HomePageContent_ddllanguage", {
      label: data.SMSLanguage,
    })
  } catch {
    log(`  ⚠ SMS Language '${data.SMSLanguage}' not in dropdown — skipping`)
  }

  // 20. Declaration checkbox (required for Submit to enable)
  await page.check("#ctl00_HomePageContent_dec_chkbox")
  await sleep(300)

  // Pre-submit validation check
  const preErrors = await checkErrorSpans(page)
  if (preErrors.length > 0) {
    await takeScreenshot(page, rowIndex, "main-pre-submit-errors")
    throw new Error(`Pre-submit validation: ${preErrors.join("; ")}`)
  }

  if (CONFIG.interactiveMode)
    await waitForEnter("  ⏸ Main form filled. Enter to Submit...")

  // 21. Submit
  await page.click("#ctl00_HomePageContent_Submit")
  await waitForPostBack(page)

  const postErrors = await checkErrorSpans(page)
  if (postErrors.length > 0) {
    await takeScreenshot(page, rowIndex, "main-post-submit-errors")
    throw new Error(`Main form submit rejected: ${postErrors.join("; ")}`)
  }

  // ═══ PAGE 3: BANK DETAILS ═════════════════════════════════════════════
  log("  → Page 3/4: Bank details")
  await page.waitForSelector("#ctl00_HomePageContent_txtIFSCcode", {
    timeout: CONFIG.pageTimeout,
  })

  // 1. IFSC
  await page.fill("#ctl00_HomePageContent_txtIFSCcode", data.IFSCCode)

  // 2. Search (PostBack auto-fills bank name + branch)
  await page.click("#ctl00_HomePageContent_btnIFSCcode")
  await waitForPostBack(page)

  const bankName = await page.inputValue(
    "#ctl00_HomePageContent_txt_Bank_Name_in_Records",
  )
  if (!bankName || !bankName.trim()) {
    await takeScreenshot(page, rowIndex, "ifsc-search-failed")
    throw new Error(`IFSC search failed for ${data.IFSCCode}`)
  }
  log(`  ✓ Bank: ${bankName.trim()}`)

  // 3. Account number
  await page.fill("#ctl00_HomePageContent_txtacc_number", data.BankAccNo)

  // 4. MICR (optional)
  if (data.MICRCode)
    await page.fill("#ctl00_HomePageContent_txtmicr", data.MICRCode)

  // 5. Account type
  await page.selectOption("#ctl00_HomePageContent_ddlAccountType", data.AccountType)

  // 6. Upload bank document
  if (!data.BankDocPath || !existsSync(data.BankDocPath)) {
    throw new Error(`Bank document not found: ${data.BankDocPath}`)
  }
  await page.setInputFiles("#ctl00_HomePageContent_ctrlFISelectFile", data.BankDocPath)
  await page.click("#ctl00_HomePageContent_btnUpload")
  await waitForPostBack(page)

  const uploadStatus = await page.textContent("#ctl00_HomePageContent_StatusLabel")
  if (uploadStatus && uploadStatus.trim() && /fail|error|invalid/i.test(uploadStatus)) {
    throw new Error(`Bank doc upload failed: ${uploadStatus}`)
  }

  if (CONFIG.interactiveMode)
    await waitForEnter("  ⏸ Bank form filled. Enter to Submit...")

  // 7. Submit
  await page.click("#ctl00_HomePageContent_btnsubmit")
  await waitForPostBack(page)

  const bankErrors = await checkErrorSpans(page)
  if (bankErrors.length > 0) {
    await takeScreenshot(page, rowIndex, "bank-submit-errors")
    throw new Error(`Bank submit rejected: ${bankErrors.join("; ")}`)
  }

  // ═══ PAGE 4: NOMINEE ══════════════════════════════════════════════════
  log("  → Page 4/4: Nominee")
  await page.waitForSelector("#ctl00_HomePageContent_ctrlTextUserName", {
    timeout: CONFIG.pageTimeout,
  })

  // 1. Nominee name
  await page.fill("#ctl00_HomePageContent_ctrlTextUserName", data.NomineeName)

  // 2. Nominee relation
  await page.selectOption("#ctl00_HomePageContent_RelationShipWithIp", data.NomineeRelation)
  await sleep(500)

  // 3. Nominee share + family member (hidden XML fields)
  // ⚠ Best-effort XML format — adjust if Save fails
  await setNomineeXml(page, data)

  // 4. "Nominee is also family member?" — default No
  try {
    await page.check("#ctl00_HomePageContent_rbtnlistNomneeAkaFamily_1")
  } catch {
    /* field may not exist */
  }

  if (CONFIG.interactiveMode)
    await waitForEnter("  ⏸ Nominee form filled. Enter to Save...")

  // 5. Save
  await page.click("#ctl00_HomePageContent_Save")
  await waitForPostBack(page)

  const nomErrors = await checkErrorSpans(page)
  if (nomErrors.length > 0) {
    await takeScreenshot(page, rowIndex, "nominee-save-errors")
    throw new Error(`Nominee save rejected: ${nomErrors.join("; ")}`)
  }

  // ═══ SUCCESS PAGE — extract IP Number ═════════════════════════════════
  log("  → Extracting IP Number from success page")
  await sleep(2000)

  const ipNumber = await extractIpNumber(page)
  if (!ipNumber) {
    await takeScreenshot(page, rowIndex, "no-ip-number-found")
    throw new Error(
      "Success page loaded but IP Number not found — check error-screenshots/",
    )
  }

  return ipNumber
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  log("═══════════════════════════════════════════════════════════════")
  log("  ESIC IP BULK REGISTRATION RUNNER v1.0")
  log("═══════════════════════════════════════════════════════════════")

  // 1. Load queue
  if (!existsSync(CONFIG.queueFile)) {
    console.error(`✗ Queue file not found: ${CONFIG.queueFile}`)
    console.error("  Export queue.json from the ESIC Helper web tool first.")
    process.exit(1)
  }
  const queue = JSON.parse(readFileSync(CONFIG.queueFile, "utf8"))
  log(`Loaded queue: ${queue.count} items`)

  // 2. Load state (for resume)
  const state = loadState()
  const startIndex = state.lastCompletedIndex + 1
  if (startIndex > 0)
    log(`Resuming from item ${startIndex + 1} (${state.results.length} already processed)`)

  // 3. Launch persistent browser
  log("Launching persistent browser...")
  const context = await chromium.launchPersistentContext(CONFIG.sessionDir, {
    headless: CONFIG.headless,
    viewport: { width: 1280, height: 900 },
    acceptDownloads: true,
  })
  const page = context.pages()[0] || (await context.newPage())

  // 4. Navigate to ESIC login
  log("Navigating to ESIC login...")
  await page.goto(CONFIG.loginUrl, { timeout: CONFIG.pageTimeout })

  const isLoggedIn = await page.evaluate(() => {
    return (
      document.body.innerText.includes("Logout") ||
      !!document.querySelector("#ctl00_lbluserName")
    )
  })

  if (!isLoggedIn) {
    log("")
    log("╔════════════════════════════════════════════════════════════╗")
    log("║  PLEASE LOG IN TO ESIC IN THE BROWSER WINDOW            ║")
    log("║  Enter employer code, user ID, password, and captcha.   ║")
    log("║  Once you see the employer dashboard, come back here.   ║")
    log("╚════════════════════════════════════════════════════════════╝")
    log("")
    await waitForEnter("Press Enter here once you are logged in...")
  } else {
    log("✓ Already logged in (session restored)")
  }

  // 5. Process queue
  log("")
  log(`Starting queue: ${queue.count - startIndex} items remaining`)
  log("")

  let successCount = 0
  let errorCount = 0

  for (let i = startIndex; i < queue.items.length; i++) {
    const item = queue.items[i]
    const data = item.normalized
    log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    log(`Item ${i + 1}/${queue.items.length} — Row ${item.rowIndex}: ${data.EmpName}`)
    log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

    const result = {
      rowIndex: item.rowIndex,
      empName: data.EmpName,
      ipNumber: "",
      status: "",
      message: "",
      timestamp: new Date().toISOString(),
    }

    try {
      const ipNumber = await registerOneIP(page, data, item.rowIndex)
      result.ipNumber = ipNumber
      result.status = "success"
      log(`  ✅ SUCCESS — IP Number: ${ipNumber}`)
      successCount++
    } catch (e) {
      result.status = "error"
      result.message = e.message
      log(`  ❌ ERROR: ${e.message}`)
      errorCount++

      log("")
      log("  Runner paused. Options:")
      log("    Enter  = retry this IP")
      log("    skip   = skip to next IP")
      log("    Ctrl+C = abort (state saved, resume later)")
      const answer = await waitForEnter("  Choice [Enter=retry / skip]: ")

      if (answer.trim().toLowerCase() === "skip") {
        result.status = "skipped"
        log("  ⏭ Skipped")
      } else {
        try {
          const ipNumber = await registerOneIP(page, data, item.rowIndex)
          result.ipNumber = ipNumber
          result.status = "success"
          result.message = "succeeded on retry"
          log(`  ✅ SUCCESS ON RETRY — IP Number: ${ipNumber}`)
          successCount++
          errorCount--
        } catch (e2) {
          result.message = `retry failed: ${e2.message}`
          log(`  ❌ RETRY FAILED: ${e2.message}`)
          log("  Skipping. Check error-screenshots/")
          result.status = "error"
        }
      }
    }

    state.results.push(result)
    state.lastCompletedIndex = i
    saveState(state)
    writeFileSync(CONFIG.resultsFile, JSON.stringify(state.results, null, 2))
    writeFileSync(CONFIG.resultsCsv, resultsToCSV(state.results))

    if (i < queue.items.length - 1) {
      log(`  ⏳ Waiting ${CONFIG.delayBetweenIPs / 1000}s before next IP...`)
      await sleep(CONFIG.delayBetweenIPs)
    }
  }

  // 6. Done
  log("")
  log("═══════════════════════════════════════════════════════════════")
  log(`  COMPLETED: ${successCount} success, ${errorCount} errors, ${queue.items.length - successCount - errorCount} skipped`)
  log(`  Results JSON: ${CONFIG.resultsFile}`)
  log(`  Results CSV:  ${CONFIG.resultsCsv}`)
  log(`  Screenshots:  ${CONFIG.screenshotsDir}/`)
  log("═══════════════════════════════════════════════════════════════")

  await waitForEnter("Press Enter to close browser...")
  await context.close()
}

main().catch((e) => {
  console.error("Fatal error:", e)
  process.exit(1)
})
