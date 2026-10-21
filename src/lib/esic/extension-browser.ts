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
  const wb = XLSX.read(buf, { type: "array" })
  const ws = wb.Sheets[wb.SheetNames[0]]
  if (!ws) return { headers: [], rows: [] }
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: "",
    raw: false,
  })
  if (raw.length === 0) return { headers: [], rows: [] }
  const headers = Object.keys(raw[0])
  const rows = raw.map((r) => {
    const o: Record<string, string> = {}
    for (const k of headers) o[k] = String(r[k] ?? "").trim()
    return o
  })
  return { headers, rows }
}
