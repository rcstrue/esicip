/**
 * XLSX template generator — Sheet 1 (Employees) + Sheet 2 (Lists) with
 * Excel data-validation dropdowns injected into sheet1.xml (SheetJS CE
 * can't write them, so we post-process the .xlsx zip).
 */
import * as XLSX from "xlsx"
import JSZip from "jszip"
import { CSV_COLUMNS } from "./field-map"
import { parseCSV, templateCSV } from "./csv"
import {
  STATE_CODES,
  RELATION_ACCEPTED_LABELS,
  MARITAL_CODES,
  ACCOUNT_TYPE_CODES,
  GENDER_VALUES,
  FATHER_HUSBAND_VALUES,
  DISPENSARY_TYPE_VALUES,
  SMS_LANGUAGES,
} from "./masters"

const STATES = Object.values(STATE_CODES).sort((a, b) => a.localeCompare(b))

// Sheet 2 layout — each entry is one column (header in row 1, values from row 2).
const LISTS: { name: string; values: string[] }[] = [
  { name: "States", values: STATES },
  { name: "Relations", values: [...RELATION_ACCEPTED_LABELS] },
  { name: "MaritalStatus", values: Object.values(MARITAL_CODES) },
  { name: "AccountType", values: Object.values(ACCOUNT_TYPE_CODES) },
  { name: "Gender", values: [...GENDER_VALUES] },
  { name: "RelationType", values: [...FATHER_HUSBAND_VALUES] },
  { name: "DispensaryType", values: [...DISPENSARY_TYPE_VALUES] },
  { name: "SMSLanguage", values: [...SMS_LANGUAGES] },
  { name: "CopyPresentToPermanent", values: ["Yes", "No"] },
]

// CSV column → index into LISTS (for the data-validation source range).
const COLUMN_TO_LIST: Record<string, number> = {
  PresentState: 0,
  DispensaryState: 0, // same states list
  NomineeRelation: 1,
  FamilyMemberRelation: 1,
  MaritalStatus: 2,
  AccountType: 3,
  Gender: 4,
  RelationType: 5,
  DispensaryType: 6,
  SMSLanguage: 7,
  CopyPresentToPermanent: 8,
}

function colLetter(zeroBased: number): string {
  let s = ""
  let n = zeroBased + 1
  while (n > 0) {
    const m = (n - 1) % 26
    s = String.fromCharCode(65 + m) + s
    n = Math.floor((n - m) / 26)
  }
  return s
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

/** Build the .xlsx template as an ArrayBuffer. */
export async function buildTemplateXlsx(): Promise<ArrayBuffer> {
  // ─── Sheet 1: Employees (columns + 2 example rows) ────────────────
  const { headers, rows } = parseCSV(templateCSV())
  const ws1 = XLSX.utils.json_to_sheet(rows, { header: headers })
  ws1["!cols"] = headers.map((h) => ({ wch: Math.max(14, h.length + 2) }))
  // freeze the header row
  ws1["!freeze"] = [{ xSplit: 0, ySplit: 1, topLeftCell: "A2", activePane: "bottomLeft", state: "frozen" } as any]
  ;(ws1 as any)["!margins"] = {}

  // ─── Sheet 2: Lists ───────────────────────────────────────────────
  const maxLen = Math.max(...LISTS.map((l) => l.values.length))
  const listAoA: (string | undefined)[][] = [LISTS.map((l) => l.name)]
  for (let r = 0; r < maxLen; r++) listAoA.push(LISTS.map((l) => l.values[r] ?? ""))
  const ws2 = XLSX.utils.aoa_to_sheet(listAoA)
  ws2["!cols"] = LISTS.map(() => ({ wch: 24 }))

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws1, "Employees")
  XLSX.utils.book_append_sheet(wb, ws2, "Lists")

  const base = XLSX.write(wb, { type: "array", bookType: "xlsx" }) as ArrayBuffer

  // ─── Inject data-validation dropdowns into xl/worksheets/sheet1.xml ─
  const dvs: string[] = []
  for (const [col, listIdx] of Object.entries(COLUMN_TO_LIST)) {
    const ci = headers.indexOf(col)
    if (ci < 0) continue
    const letter = colLetter(ci)
    const list = LISTS[listIdx]
    const endRow = list.values.length + 1 // +1 for the header row on Sheet 2
    const src = `Lists!$${colLetter(listIdx)}$2:$${colLetter(listIdx)}$${endRow}`
    dvs.push(
      `<dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1" sqref="${letter}2:${letter}1000"><formula1>${escapeXml(src)}</formula1></dataValidation>`,
    )
  }
  const dvBlock = `<dataValidations count="${dvs.length}">${dvs.join("")}</dataValidations>`

  const z = await JSZip.loadAsync(base)
  const sheet1 = Object.keys(z.files).find((n) => /^xl\/worksheets\/sheet1\.xml$/.test(n))
  if (sheet1) {
    let xml = await z.file(sheet1)!.async("string")
    if (!xml.includes("<dataValidations")) {
      // Insert right after </sheetData> (schema-valid position for dataValidations).
      if (xml.includes("</sheetData>")) {
        xml = xml.replace("</sheetData>", "</sheetData>" + dvBlock)
      } else {
        xml = xml.replace(/<\/worksheet>/, dvBlock + "</worksheet>")
      }
      z.file(sheet1, xml)
    }
  }
  return z.generateAsync({ type: "arraybuffer", compression: "DEFLATE" })
}
