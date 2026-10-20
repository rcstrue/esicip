import { NextRequest, NextResponse } from "next/server"
import { parseCSV } from "@/lib/esic/csv"
import { validateRows, summarize } from "@/lib/esic/validate"
import { CSV_COLUMNS } from "@/lib/esic/field-map"

export const runtime = "nodejs"

/**
 * POST /api/esic/validate
 * Body: { csv: "<CSV text>" }  OR  multipart/form-data with a `file` field
 * Returns: { headers, rows, validated, summary, missingColumns, unknownColumns }
 */
export async function POST(req: NextRequest) {
  let csvText = ""
  let contentType = req.headers.get("content-type") || ""

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData()
      const file = form.get("file")
      if (!(file instanceof File)) {
        return NextResponse.json({ error: "No 'file' field in form data" }, { status: 400 })
      }
      csvText = await file.text()
    } else {
      const body = await req.json()
      csvText = body?.csv
      if (typeof csvText !== "string") {
        return NextResponse.json({ error: "Body must be { csv: string }" }, { status: 400 })
      }
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to parse request: " + (e as Error).message },
      { status: 400 },
    )
  }

  const { headers, rows } = parseCSV(csvText)
  if (rows.length === 0) {
    return NextResponse.json({ error: "CSV has no data rows" }, { status: 400 })
  }

  const expected = new Set(CSV_COLUMNS)
  const present = new Set(headers)
  const missingColumns = CSV_COLUMNS.filter((c) => !present.has(c))
  const unknownColumns = headers.filter((h) => !expected.has(h))

  const validated = validateRows(rows)
  const summary = summarize(validated)

  return NextResponse.json({
    headers,
    rows,
    validated,
    summary,
    missingColumns,
    unknownColumns,
  })
}
