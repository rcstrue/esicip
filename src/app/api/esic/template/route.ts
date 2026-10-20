import { NextResponse } from "next/server"
import { templateCSV } from "@/lib/esic/csv"

export const runtime = "nodejs"

/**
 * GET /api/esic/template
 * Returns the downloadable CSV template with the upgraded column set.
 */
export async function GET() {
  const csv = templateCSV()
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="esic-ip-template.csv"',
    },
  })
}
