/**
 * CSV parsing + queue.json building utilities.
 * Kept dependency-free so they run on both client and server.
 */

import { CSV_COLUMNS } from "./field-map"
import type { NormalizedRow } from "./validate"

// ─── RFC-4180-ish CSV parser (handles quoted fields, escaped quotes, CRLF) ──
export function parseCSV(text: string): { headers: string[]; rows: Record<string, string>[] } {
  // Strip BOM if present
  const clean = text.replace(/^\uFEFF/, "")
  const records: string[][] = []
  let field = ""
  let row: string[] = []
  let inQuotes = false

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i]

    if (inQuotes) {
      if (ch === '"') {
        if (clean[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ",") {
        row.push(field)
        field = ""
      } else if (ch === "\r") {
        // swallow; handle \n next
      } else if (ch === "\n") {
        row.push(field)
        records.push(row)
        row = []
        field = ""
      } else {
        field += ch
      }
    }
  }
  // flush last
  if (field !== "" || row.length > 0) {
    row.push(field)
    records.push(row)
  }

  // Drop trailing empty line if any
  if (records.length && records[records.length - 1].length === 1 && records[records.length - 1][0] === "") {
    records.pop()
  }

  if (records.length === 0) return { headers: [], rows: [] }

  const headers = records[0].map((h) => h.trim())
  const rows = records.slice(1).map((r) => {
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => {
      obj[h] = (r[i] ?? "").trim()
    })
    return obj
  })

  return { headers, rows }
}

export function toCSV(rows: Record<string, string>[], columns?: string[]): string {
  if (rows.length === 0) return ""
  const cols = columns ?? Object.keys(rows[0])
  const escape = (v: string) => {
    const s = String(v ?? "")
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }
  const lines = [cols.join(",")]
  for (const r of rows) {
    lines.push(cols.map((c) => escape(r[c] ?? "")).join(","))
  }
  return lines.join("\n")
}

// ─── CSV template (downloadable) ────────────────────────────────────────────
export const TEMPLATE_COLUMNS: string[] = CSV_COLUMNS

export function templateCSV(): string {
  // Two example rows — the existing sample + one more for variety
  const sampleRows: Record<string, string>[] = [
    {
      EmpName: "KISHAN MOTIBHAI JADAV",
      RelationType: "Father",
      FatherOrHusbandName: "MOTIBHAI JADAV",
      DOB: "15/05/1983",
      MaritalStatus: "Married",
      Gender: "M",
      AadhaarNumber: "947000311535",
      PresentAddress: "B-104,XYZ Apartments,Vesu",
      PresentAddress2: "",
      PresentAddress3: "",
      PresentState: "Gujarat",
      PresentDistrict: "Surat",
      PresentDistrictCode: "398",
      PinCode: "395007",
      MobileNo: "9898319329",
      Email: "",
      PermanentAddress: "B-104,XYZ Apartments,Vesu",
      PermanentAddress2: "",
      PermanentAddress3: "",
      PermanentPinCode: "395007",
      PermanentState: "Gujarat",
      PermanentDistrict: "Surat",
      PermanentDistrictCode: "398",
      DispensaryType: "Dispensary",
      DispensaryState: "Gujarat",
      DispensaryDistrict: "Surat",
      DispensaryName: "Dindoli Dispensary",
      DispensaryId: "1876",
      DependendantDispensaryType: "Dispensary",
      DependendantDispensaryState: "Gujarat",
      DependendantDispensaryDistrict: "Surat",
      DependendantDispensaryName: "Dindoli Dispensary",
      DependendantDispensaryId: "1876",
      AppointmentDate: "15/10/2026",
      SMSLanguage: "Hindi",
      IFSCCode: "UBIN0567663",
      BankAccNo: "676602010005931",
      MICRCode: "",
      AccountType: "Savings",
      BankDocPath: "./docs/kishan_cheque.pdf",
      NomineeName: "MOTIBHAI JADAV",
      NomineeRelation: "Father",
      NomineeShare: "100",
      FamilyMemberName: "MOTIBHAI JADAV",
      FamilyMemberDOB: "01/01/1980",
      FamilyMemberRelation: "Father",
    },
    {
      EmpName: "SUNITA RAMESHBHAI PATEL",
      RelationType: "Husband",
      FatherOrHusbandName: "RAMESHBHAI PATEL",
      DOB: "22/08/1990",
      MaritalStatus: "Married",
      Gender: "F",
      AadhaarNumber: "520828311415",
      PresentAddress: "12,Shanti Society,Mumbai",
      PresentAddress2: "",
      PresentAddress3: "",
      PresentState: "Maharashtra",
      PresentDistrict: "Mumbai",
      PresentDistrictCode: "",
      PinCode: "400001",
      MobileNo: "9876543210",
      Email: "",
      PermanentAddress: "12,Shanti Society,Mumbai",
      PermanentAddress2: "",
      PermanentAddress3: "",
      PermanentPinCode: "400001",
      PermanentState: "Maharashtra",
      PermanentDistrict: "Mumbai",
      PermanentDistrictCode: "",
      DispensaryType: "Dispensary",
      DispensaryState: "Maharashtra",
      DispensaryDistrict: "Mumbai",
      DispensaryName: "Andheri Dispensary",
      DispensaryId: "",
      DependendantDispensaryType: "Dispensary",
      DependendantDispensaryState: "Maharashtra",
      DependendantDispensaryDistrict: "Mumbai",
      DependendantDispensaryName: "Andheri Dispensary",
      DependendantDispensaryId: "",
      AppointmentDate: "01/11/2026",
      SMSLanguage: "English",
      IFSCCode: "HDFC0001234",
      BankAccNo: "50100012345678",
      MICRCode: "",
      AccountType: "Savings",
      BankDocPath: "./docs/sunita_cheque.pdf",
      NomineeName: "RAMESHBHAI PATEL",
      NomineeRelation: "Spouse",
      NomineeShare: "100",
      FamilyMemberName: "",
      FamilyMemberDOB: "",
      FamilyMemberRelation: "",
    },
  ]
  return toCSV(sampleRows, TEMPLATE_COLUMNS)
}

// ─── queue.json builder (consumed by the Playwright runner on your machine) ─
export interface QueueItem {
  rowIndex: number
  status: "ready" | "warning"
  normalized: Record<string, string>
}

export interface QueueFile {
  generatedAt: string
  count: number
  establishmentCode: string | null
  items: QueueItem[]
}

export function buildQueue(rows: NormalizedRow[], establishmentCode?: string): QueueFile {
  const items = rows
    .filter((r) => r.status === "ready" || r.status === "warning")
    .map((r) => ({
      rowIndex: r.rowIndex,
      status: r.status as "ready" | "warning",
      normalized: r.normalized,
    }))

  return {
    generatedAt: new Date().toISOString(),
    count: items.length,
    establishmentCode: establishmentCode ?? null,
    items,
  }
}

// ─── Final results CSV (after runner finishes — IP Numbers filled in) ───────
export function buildResultsCSV(
  originalRows: Record<string, string>[],
  results: { rowIndex: number; ipNumber: string; status: string; message?: string }[],
): string {
  const cols = [...CSV_COLUMNS, "IPNumber", "Status", "Message"]
  const resultByIndex = new Map(results.map((r) => [r.rowIndex, r]))
  const out = originalRows.map((r, i) => {
    const res = resultByIndex.get(i + 1)
    return {
      ...r,
      IPNumber: res?.ipNumber ?? "",
      Status: res?.status ?? "pending",
      Message: res?.message ?? "",
    }
  })
  return toCSV(out, cols)
}
