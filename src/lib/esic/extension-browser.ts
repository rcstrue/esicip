// Extension-side bundle entry — exposes a global ESIC for the popup.
// Includes xlsx parsing + the validate/queue engine so the popup can
// load a .xlsx/.csv directly (no web tool / queue.json step needed).
import * as XLSX from "xlsx"

export { parseCSV, toCSV, templateCSV, buildQueue } from "./csv"
export { validateRows, summarize } from "./validate"
export { CSV_COLUMNS } from "./field-map"

export type { NormalizedRow, ValidationSummary } from "./validate"

/**
 * Parse an .xlsx/.xls/.csv ArrayBuffer into { headers, rows } keyed by
 * the CSV column names (uses the first sheet, header row = row 1).
 */
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
