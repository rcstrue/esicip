// Extension/Pages bundle entry — exposes a global ESIC for the popup + the
// Pages site. Bundles xlsx (SheetJS) + jszip + the ESIC engine so the popup
// can load a .xlsx/.csv directly AND build the .xlsx template with dropdowns.
import * as XLSX from "xlsx"
import JSZip from "jszip"

export { parseCSV, toCSV, templateCSV, buildQueue } from "./csv"
export { validateRows, summarize } from "./validate"
export { CSV_COLUMNS } from "./field-map"
export { buildTemplateXlsx } from "./template-xlsx"
export { default as JSZip } from "jszip"

export type { NormalizedRow, ValidationSummary } from "./validate"

/** Parse an .xlsx/.xls/.csv ArrayBuffer into { headers, rows } (first sheet). */
export function parseWorkbook(buf: ArrayBuffer): {
  headers: string[]
  rows: Record<string, string>[]
} {
  const wb = XLSX.read(buf, { type: "array", cellDates: true })
  const ws = wb.Sheets[wb.SheetNames[0]]
  if (!ws) return { headers: [], rows: [] }
  // raw:true + cellDates:true → Date objects for date cells, numbers for numeric
  // cells, strings for text. We format dates as dd/MM/yyyy + numbers as plain
  // digit strings (so Aadhaar/BankAccNo/mobile stored as Excel numbers pass
  // validation). raw:false used the cell's display format which is unreliable.
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: "",
    raw: true,
    cellDates: true,
  })
  if (raw.length === 0) return { headers: [], rows: [] }
  const headers = Object.keys(raw[0])
  const pad2 = (n: number) => String(n).padStart(2, "0")
  const rows = raw.map((r) => {
    const o: Record<string, string> = {}
    for (const k of headers) {
      const v = r[k]
      if (v instanceof Date) {
        // dd/MM/yyyy (the portal's strict format)
        o[k] = pad2(v.getDate()) + "/" + pad2(v.getMonth() + 1) + "/" + v.getFullYear()
      } else if (typeof v === "number") {
        o[k] = String(v)
      } else {
        o[k] = String(v ?? "").trim()
      }
    }
    return o
  })
  return { headers, rows }
}
