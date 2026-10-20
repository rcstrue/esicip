import { NextRequest, NextResponse } from "next/server"
import { toCSV } from "@/lib/esic/csv"
import { CSV_COLUMNS } from "@/lib/esic/field-map"

export const runtime = "nodejs"

/**
 * POST /api/esic/export-csv
 * Body: { rows: Record<string,string>[] }
 * Returns the corrected CSV (with normalized codes) as a text/csv download.
 */
export async function POST(req: NextRequest) {
  let body: { rows?: Record<string, string>[] }
  try {
    body = await req.json()
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body: " + (e as Error).message }, { status: 400 })
  }

  if (!Array.isArray(body.rows)) {
    return NextResponse.json({ error: "Body must contain a 'rows' array" }, { status: 400 })
  }

  const csv = toCSV(body.rows, CSV_COLUMNS)
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="esic-corrected.csv"',
    },
  })
}
