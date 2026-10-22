/**
 * ESIC IP Registration — Validation Engine
 *
 * Validates a single CSV row against the real rules embedded in the ESIC
 * portal's ASPX source. Produces a structured list of errors/warnings.
 *
 * Output is consumed by:
 *   - The Next.js UI (status badges, edit-in-place)
 *   - The /api/export-queue route (only "ready" rows go into queue.json)
 */

import {
  AADHAAR_REGEX,
  ACCOUNT_TYPE_NAME_TO_CODE,
  DATE_FORMAT_REGEX,
  FATHER_HUSBAND_VALUES,
  GENDER_VALUES,
  IFSC_REGEX,
  MARITAL_NAME_TO_CODE,
  MOBILE_REGEX,
  PIN_REGEX,
  RELATION_ACCEPTED_LABELS,
  RELATION_NAME_TO_CODE,
  STATE_NAME_TO_CODE,
  toPortalStateSpelling,
} from "./masters"

export type IssueSeverity = "error" | "warning"

export interface ValidationIssue {
  column: string
  severity: IssueSeverity
  message: string
}

export type RowStatus = "ready" | "warning" | "error"

export interface NormalizedRow {
  /** Original row index (1-based, matching CSV row number after header). */
  rowIndex: number
  /** Raw values keyed by CSV column. */
  raw: Record<string, string>
  /** Normalized + translated values (labels → codes). */
  normalized: Record<string, string>
  /** Issues found. */
  issues: ValidationIssue[]
  /** Computed status: ready (no issues), warning (only warnings), error (≥1 error). */
  status: RowStatus
}

// ─── Verhoeff algorithm for Aadhaar checksum validation ─────────────────────
// Aadhaar's 12th digit is a Verhoeff checksum over the first 11.
const VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
]

const VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
]

export function verhoeffValidate(num: string): boolean {
  if (!/^\d+$/.test(num)) return false
  let c = 0
  const reversed = num.split("").reverse().join("")
  for (let i = 0; i < reversed.length; i++) {
    const digit = parseInt(reversed[i], 10)
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][digit]]
  }
  return c === 0
}

// ─── Date helpers ───────────────────────────────────────────────────────────
function parseDate(ddmmyyyy: string): Date | null {
  const m = DATE_FORMAT_REGEX.exec(ddmmyyyy?.trim() ?? "")
  if (!m) return null
  const [, dd, mm, yyyy] = m
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
  if (
    d.getFullYear() !== Number(yyyy) ||
    d.getMonth() !== Number(mm) - 1 ||
    d.getDate() !== Number(dd)
  ) {
    return null // invalid calendar date (e.g. 31/02/2020)
  }
  return d
}

function today(): Date {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function ageBetween(dob: Date, minYear: number, maxYear: number): boolean {
  const now = today()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--
  return age >= minYear && age <= maxYear
}

// ─── Per-field validators ───────────────────────────────────────────────────
function validateAadhaar(value: string): string | null {
  const v = value?.trim() ?? ""
  if (!v) return null // optional unless flagged required upstream
  if (!AADHAAR_REGEX.test(v)) return "Aadhaar must be exactly 12 digits"
  if (!verhoeffValidate(v)) return "Aadhaar checksum failed — likely a typo"
  return null
}

function validateIFSC(value: string): string | null {
  const v = value?.trim().toUpperCase() ?? ""
  if (!v) return "IFSC is required"
  if (!IFSC_REGEX.test(v)) return "IFSC format must be AAAA0XXXXXX (e.g. BARB0VESUXX)"
  return null
}

function validatePin(value: string): string | null {
  const v = value?.trim() ?? ""
  if (!v) return "PIN code is required"
  if (!PIN_REGEX.test(v)) return "PIN must be 6 digits"
  return null
}

function validateMobile(value: string): string | null {
  const v = value?.trim() ?? ""
  if (!v) return "Mobile number is required"
  if (!MOBILE_REGEX.test(v)) return "Mobile must be 10 digits starting 6-9"
  return null
}

function validateDate(
  value: string,
  label: string,
  opts: { required?: boolean; minAge?: number; maxAge?: number; notFuture?: boolean } = {},
): string | null {
  const v = value?.trim() ?? ""
  if (!v) return opts.required ? `${label} is required` : null
  const d = parseDate(v)
  if (!d) return `${label} must be dd/MM/yyyy`
  if (opts.notFuture && d > today()) return `${label} cannot be in the future`
  if (opts.minAge !== undefined && !ageBetween(d, opts.minAge, 150)) {
    return `${label} implies age below ${opts.minAge} — not allowed`
  }
  if (opts.maxAge !== undefined && !ageBetween(d, 0, opts.maxAge)) {
    return `${label} implies age above ${opts.maxAge} — verify`
  }
  return null
}

// ─── Main validator ─────────────────────────────────────────────────────────
export function validateRow(rowIndex: number, raw: Record<string, string>): NormalizedRow {
  const issues: ValidationIssue[] = []
  const normalized: Record<string, string> = {}

  const get = (col: string): string => (raw[col] ?? "").trim()

  // ─── Personal fields ───────────────────────────────────────────────────
  const empName = get("EmpName")
  if (!empName) {
    issues.push({ column: "EmpName", severity: "error", message: "Employee name is required" })
  } else if (empName.length > 45) {
    issues.push({ column: "EmpName", severity: "error", message: "Name exceeds 45 chars (portal maxlength)" })
  } else if (!/^[A-Za-z .]+$/ .test(empName)) {
    issues.push({ column: "EmpName", severity: "warning", message: "Name contains non-alpha characters — portal may reject" })
  }
  normalized.EmpName = empName.toUpperCase()

  // RelationType: Father / Husband
  const relationType = get("RelationType")
  if (!FATHER_HUSBAND_VALUES.includes(relationType as never)) {
    issues.push({
      column: "RelationType",
      severity: "error",
      message: `RelationType must be 'Father' or 'Husband' (got '${relationType}')`,
    })
  }
  normalized.RelationType = relationType

  // Father/Husband name
  const fhName = get("FatherOrHusbandName")
  if (!fhName) {
    issues.push({ column: "FatherOrHusbandName", severity: "error", message: "Father/Husband name is required" })
  } else if (fhName.length > 50) {
    issues.push({ column: "FatherOrHusbandName", severity: "error", message: "Exceeds 50 chars" })
  }
  normalized.FatherOrHusbandName = fhName.toUpperCase()

  // DOB
  const dobErr = validateDate(get("DOB"), "DOB", { required: true, notFuture: true, minAge: 14, maxAge: 100 })
  if (dobErr) issues.push({ column: "DOB", severity: dobErr.includes("verify") ? "warning" : "error", message: dobErr })
  normalized.DOB = get("DOB")

  // Marital status — translate label to code
  const maritalRaw = get("MaritalStatus")
  const maritalCode = MARITAL_NAME_TO_CODE[maritalRaw.toLowerCase()]
  if (!maritalCode) {
    issues.push({
      column: "MaritalStatus",
      severity: "error",
      message: `MaritalStatus '${maritalRaw}' not recognized. Use: ${Object.values(MARITAL_NAME_TO_CODE).join("/")}`,
    })
  }
  normalized.MaritalStatus = maritalCode ?? maritalRaw

  // Gender
  const gender = get("Gender").toUpperCase()
  if (!GENDER_VALUES.includes(gender as never)) {
    issues.push({
      column: "Gender",
      severity: "error",
      message: `Gender must be M, F, or TG (got '${gender}')`,
    })
  }
  normalized.Gender = gender

  // Interlock: Marital ↔ Gender ↔ Father/Husband
  // Per assignGender() / assignFather() in portal JS:
  //   - If Husband selected → Gender must be F, Marital must be Married (2) or Widow (3)
  //   - If Marital=Widow (3) → Gender locks to F
  //   - If Marital=Widower (4) → Gender locks to M
  if (relationType === "Husband" && gender !== "F") {
    issues.push({
      column: "Gender",
      severity: "error",
      message: "When RelationType='Husband', Gender must be F (portal interlock)",
    })
  }
  if (relationType === "Husband" && maritalCode && !["2", "3"].includes(maritalCode)) {
    issues.push({
      column: "MaritalStatus",
      severity: "error",
      message: "When RelationType='Husband', MaritalStatus must be Married or Widow (portal interlock)",
    })
  }
  if (maritalCode === "3" && gender && gender !== "F") {
    issues.push({
      column: "Gender",
      severity: "error",
      message: "Widow implies Gender=F (portal interlock)",
    })
  }
  if (maritalCode === "4" && gender && gender !== "M") {
    issues.push({
      column: "Gender",
      severity: "error",
      message: "Widower implies Gender=M (portal interlock)",
    })
  }

  // ─── Present address ───────────────────────────────────────────────────
  const presentAddress = get("PresentAddress")
  if (!presentAddress) {
    issues.push({ column: "PresentAddress", severity: "error", message: "Present address is required" })
  } else if (presentAddress.length > 50) {
    issues.push({ column: "PresentAddress", severity: "warning", message: "Address > 50 chars will be split; consider PresentAddress2/3 columns" })
  }
  normalized.PresentAddress = presentAddress
  normalized.PresentAddress2 = get("PresentAddress2")
  normalized.PresentAddress3 = get("PresentAddress3")

  const pinErr = validatePin(get("PinCode"))
  if (pinErr) issues.push({ column: "PinCode", severity: "error", message: pinErr })
  normalized.PinCode = get("PinCode")

  const mobileErr = validateMobile(get("MobileNo"))
  if (mobileErr) issues.push({ column: "MobileNo", severity: "error", message: mobileErr })
  normalized.MobileNo = get("MobileNo")

  // Email optional, but if present must be valid
  const email = get("Email")
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    issues.push({ column: "Email", severity: "warning", message: "Email format looks invalid" })
  }
  normalized.Email = email

  // Present State — the live <select> uses the state NAME as the option
  // value (e.g. <option value="Gujarat">Gujarat</option>), so keep the label.
  // (Dispensary State uses numeric codes — handled separately below.)
  const presentStateRaw = get("PresentState")
  const presentStateCode = STATE_NAME_TO_CODE[presentStateRaw.toLowerCase()]
  if (!presentStateCode) {
    issues.push({
      column: "PresentState",
      severity: "error",
      message: `PresentState '${presentStateRaw}' not recognized. Use state names like Gujarat, Maharashtra, etc.`,
    })
  }
  normalized.PresentState = toPortalStateSpelling(presentStateRaw) // portal spelling — matches the live select's value
  normalized.PresentDistrictCode = get("PresentDistrictCode") // optional numeric code for disambiguation

  // Present District — label kept as-is (codes are state-specific, loaded at runtime by portal)
  if (!get("PresentDistrict")) {
    issues.push({ column: "PresentDistrict", severity: "error", message: "PresentDistrict is required" })
  }
  normalized.PresentDistrict = get("PresentDistrict")

  // CopyPresentToPermanent — DO NOT USE the checkbox (see field-map note).
  // The extension fills permanent fields explicitly. Permanent address is MANDATORY.
  normalized.CopyPresentToPermanent = "No"

  const permanentAddress = get("PermanentAddress")
  if (!permanentAddress) {
    issues.push({ column: "PermanentAddress", severity: "error", message: "PermanentAddress is required (the Copy checkbox is not used)" })
  }
  normalized.PermanentAddress = permanentAddress
  normalized.PermanentAddress2 = get("PermanentAddress2")
  normalized.PermanentAddress3 = get("PermanentAddress3")

  const permPin = get("PermanentPinCode")
  if (!permPin) {
    issues.push({ column: "PermanentPinCode", severity: "error", message: "PermanentPinCode is required" })
  } else if (!PIN_REGEX.test(permPin)) {
    issues.push({ column: "PermanentPinCode", severity: "error", message: "PermanentPinCode must be 6 digits" })
  }
  normalized.PermanentPinCode = permPin

  // Permanent State — same NAME-based select as Present; use portal spelling.
  const permanentStateRaw = get("PermanentState")
  const permanentStateCode = STATE_NAME_TO_CODE[permanentStateRaw.toLowerCase()]
  if (!permanentStateCode) {
    issues.push({ column: "PermanentState", severity: "error", message: `PermanentState '${permanentStateRaw}' not recognized. Use state names like Gujarat, Maharashtra, etc.` })
  }
  normalized.PermanentState = toPortalStateSpelling(permanentStateRaw)

  if (!get("PermanentDistrict")) {
    issues.push({ column: "PermanentDistrict", severity: "error", message: "PermanentDistrict is required" })
  }
  normalized.PermanentDistrict = get("PermanentDistrict")
  normalized.PermanentDistrictCode = get("PermanentDistrictCode")

  // ─── Dispensary block ──────────────────────────────────────────────────
  const dispensaryType = get("DispensaryType") || "Dispensary"
  if (!["Dispensary", "IMP", "EMud"].includes(dispensaryType)) {
    issues.push({
      column: "DispensaryType",
      severity: "error",
      message: `DispensaryType must be 'Dispensary', 'IMP', or 'EMud' (got '${dispensaryType}')`,
    })
  }
  normalized.DispensaryType = dispensaryType

  const dispStateRaw = get("DispensaryState")
  const dispStateCode = STATE_NAME_TO_CODE[dispStateRaw.toLowerCase()]
  if (!dispStateCode) {
    issues.push({
      column: "DispensaryState",
      severity: "error",
      message: `DispensaryState '${dispStateRaw}' not recognized`,
    })
  }
  normalized.DispensaryState = dispStateCode ?? dispStateRaw

  if (!get("DispensaryDistrict")) {
    issues.push({ column: "DispensaryDistrict", severity: "error", message: "DispensaryDistrict is required" })
  }
  normalized.DispensaryDistrict = get("DispensaryDistrict")

  if (!get("DispensaryName")) {
    issues.push({ column: "DispensaryName", severity: "error", message: "DispensaryName is required" })
  }
  normalized.DispensaryName = get("DispensaryName")

  if (!get("DispensaryId")) {
    issues.push({ column: "DispensaryId", severity: "warning", message: "DispensaryId missing — will match by DispensaryName (stops if the name matches >1 option). Provide the numeric ID to disambiguate." })
  }
  normalized.DispensaryId = get("DispensaryId")

  // ─── Dependendant dispensary block (MANDATORY) ──────────────────────
  const depDispType = get("DependendantDispensaryType") || "Dispensary"
  if (!["Dispensary", "IMP", "EMud"].includes(depDispType)) {
    issues.push({ column: "DependendantDispensaryType", severity: "error", message: `DependendantDispensaryType must be 'Dispensary', 'IMP', or 'EMud' (got '${depDispType}')` })
  }
  normalized.DependendantDispensaryType = depDispType

  const depDispStateRaw = get("DependendantDispensaryState")
  const depDispStateCode = STATE_NAME_TO_CODE[depDispStateRaw.toLowerCase()]
  if (!depDispStateCode) {
    issues.push({ column: "DependendantDispensaryState", severity: "error", message: `DependendantDispensaryState '${depDispStateRaw}' not recognized` })
  }
  normalized.DependendantDispensaryState = depDispStateCode ?? depDispStateRaw

  if (!get("DependendantDispensaryDistrict")) {
    issues.push({ column: "DependendantDispensaryDistrict", severity: "error", message: "DependendantDispensaryDistrict is required" })
  }
  normalized.DependendantDispensaryDistrict = get("DependendantDispensaryDistrict")

  if (!get("DependendantDispensaryName")) {
    issues.push({ column: "DependendantDispensaryName", severity: "error", message: "DependendantDispensaryName is required" })
  }
  normalized.DependendantDispensaryName = get("DependendantDispensaryName")

  if (!get("DependendantDispensaryId")) {
    issues.push({ column: "DependendantDispensaryId", severity: "warning", message: "DependendantDispensaryId missing — will match by name (stops on ambiguity)." })
  }
  normalized.DependendantDispensaryId = get("DependendantDispensaryId")

  // ─── Appointment date ──────────────────────────────────────────────────
  const doaErr = validateDate(get("AppointmentDate"), "AppointmentDate", {
    required: true,
    notFuture: false,
  })
  if (doaErr) issues.push({ column: "AppointmentDate", severity: "error", message: doaErr })
  normalized.AppointmentDate = get("AppointmentDate")

  // DOA must be after DOB and not absurdly far in the future
  const dobDate = parseDate(get("DOB"))
  const doaDate = parseDate(get("AppointmentDate"))
  if (dobDate && doaDate) {
    if (doaDate <= dobDate) {
      issues.push({
        column: "AppointmentDate",
        severity: "error",
        message: "AppointmentDate must be after DOB",
      })
    } else if (doaDate > today()) {
      // Future appointment date — portal accepts but flags for RO/SRO
      issues.push({
        column: "AppointmentDate",
        severity: "warning",
        message: "Future AppointmentDate — portal will flag for RO/SRO verification",
      })
    } else {
      const diffDays = Math.floor((today().getTime() - doaDate.getTime()) / 86400000)
      if (diffDays > 10) {
        issues.push({
          column: "AppointmentDate",
          severity: "warning",
          message: `AppointmentDate is ${diffDays} days old — portal requires RO/SRO confirmation per Regulation 10B`,
        })
      }
    }
  }

  // ─── SMS language ──────────────────────────────────────────────────────
  const smsLang = get("SMSLanguage")
  if (!smsLang) {
    issues.push({ column: "SMSLanguage", severity: "error", message: "SMSLanguage is required" })
  }
  normalized.SMSLanguage = smsLang

  // ─── Aadhaar (required — live ESIC portal needs it on the Aadhaar page) ──
  const aadhaar = get("AadhaarNumber")
  if (!aadhaar) {
    issues.push({
      column: "AadhaarNumber",
      severity: "error",
      message: "AadhaarNumber is required — the ESIC portal asks for it before the main form",
    })
  } else {
    const err = validateAadhaar(aadhaar)
    if (err) issues.push({ column: "AadhaarNumber", severity: "error", message: err })
    normalized.AadhaarNumber = aadhaar
  }

  // ─── Bank block ────────────────────────────────────────────────────────
  const ifscErr = validateIFSC(get("IFSCCode"))
  if (ifscErr) issues.push({ column: "IFSCCode", severity: "error", message: ifscErr })
  normalized.IFSCCode = get("IFSCCode").toUpperCase()

  const bankAccNo = get("BankAccNo")
  if (!bankAccNo) {
    issues.push({ column: "BankAccNo", severity: "error", message: "BankAccNo is required" })
  } else if (!/^\d{6,20}$/.test(bankAccNo)) {
    issues.push({ column: "BankAccNo", severity: "error", message: "BankAccNo must be 6-20 digits" })
  }
  normalized.BankAccNo = bankAccNo

  const micr = get("MICRCode")
  if (micr && !/^\d{9}$/.test(micr)) {
    issues.push({ column: "MICRCode", severity: "warning", message: "MICR is conventionally 9 digits" })
  }
  normalized.MICRCode = micr

  const accountTypeRaw = get("AccountType")
  const accountTypeCode = ACCOUNT_TYPE_NAME_TO_CODE[accountTypeRaw.toLowerCase()]
  if (!accountTypeCode) {
    issues.push({
      column: "AccountType",
      severity: "error",
      message: `AccountType '${accountTypeRaw}' not recognized. Use: Savings, Current, or Others`,
    })
  }
  normalized.AccountType = accountTypeCode ?? accountTypeRaw

  const bankDocPath = get("BankDocPath")
  if (!bankDocPath) {
    issues.push({
      column: "BankDocPath",
      severity: "warning",
      message: "BankDocPath missing — bank page requires a cheque/passbook PDF/JPG ≤200KB. Add path before running.",
    })
  } else if (!/\.(pdf|jpe?g)$/i.test(bankDocPath)) {
    issues.push({
      column: "BankDocPath",
      severity: "error",
      message: "Bank document must be .pdf, .jpg, or .jpeg",
    })
  }
  normalized.BankDocPath = bankDocPath

  // ─── Nominee block ─────────────────────────────────────────────────────
  const nomineeName = get("NomineeName")
  if (!nomineeName) {
    issues.push({ column: "NomineeName", severity: "error", message: "NomineeName is required" })
  } else if (nomineeName.length > 45) {
    issues.push({ column: "NomineeName", severity: "error", message: "NomineeName exceeds 45 chars" })
  }
  normalized.NomineeName = nomineeName.toUpperCase()

  const nomineeRelRaw = get("NomineeRelation")
  const nomineeRelCode = RELATION_NAME_TO_CODE[nomineeRelRaw.toLowerCase()]
  if (!nomineeRelCode) {
    issues.push({
      column: "NomineeRelation",
      severity: "error",
      message: `NomineeRelation '${nomineeRelRaw}' not recognized. Use one of: ${RELATION_ACCEPTED_LABELS.join(", ")}`,
    })
  }
  normalized.NomineeRelation = nomineeRelCode ?? nomineeRelRaw

  // Nominee share — must be 1-100, integer
  const shareStr = get("NomineeShare")
  const shareNum = Number(shareStr)
  if (!shareStr) {
    issues.push({ column: "NomineeShare", severity: "error", message: "NomineeShare is required" })
  } else if (!Number.isInteger(shareNum) || shareNum < 1 || shareNum > 100) {
    issues.push({ column: "NomineeShare", severity: "error", message: "NomineeShare must be integer 1-100" })
  }
  normalized.NomineeShare = shareStr

  // Family member (optional but if any field present, all required)
  const fmName = get("FamilyMemberName")
  const fmDob = get("FamilyMemberDOB")
  const fmRel = get("FamilyMemberRelation")
  if (fmName || fmDob || fmRel) {
    if (!fmName) {
      issues.push({ column: "FamilyMemberName", severity: "error", message: "FamilyMemberName required when other family fields present" })
    }
    const fmDobErr = validateDate(fmDob, "FamilyMemberDOB", { required: true, notFuture: true })
    if (fmDobErr) issues.push({ column: "FamilyMemberDOB", severity: "error", message: fmDobErr })

    const fmRelCode = RELATION_NAME_TO_CODE[fmRel.toLowerCase()]
    if (!fmRelCode) {
      issues.push({
        column: "FamilyMemberRelation",
        severity: "error",
        message: `FamilyMemberRelation '${fmRel}' not recognized. Use one of: ${RELATION_ACCEPTED_LABELS.join(", ")}`,
      })
    }
    normalized.FamilyMemberName = fmName.toUpperCase()
    normalized.FamilyMemberDOB = fmDob
    normalized.FamilyMemberRelation = fmRelCode ?? fmRel
  }

  // ─── Status ────────────────────────────────────────────────────────────
  const hasError = issues.some((i) => i.severity === "error")
  const hasWarning = issues.some((i) => i.severity === "warning")
  const status: RowStatus = hasError ? "error" : hasWarning ? "warning" : "ready"

  return { rowIndex, raw, normalized, issues, status }
}

export function validateRows(rows: Record<string, string>[]): NormalizedRow[] {
  return rows.map((r, i) => validateRow(i + 1, r))
}

/** Count summary for the UI. */
export interface ValidationSummary {
  total: number
  ready: number
  warning: number
  error: number
}

export function summarize(rows: NormalizedRow[]): ValidationSummary {
  return {
    total: rows.length,
    ready: rows.filter((r) => r.status === "ready").length,
    warning: rows.filter((r) => r.status === "warning").length,
    error: rows.filter((r) => r.status === "error").length,
  }
}
