import { NextRequest, NextResponse } from "next/server"
import { buildQueue, type QueueFile } from "@/lib/esic/csv"
import type { NormalizedRow } from "@/lib/esic/validate"

export const runtime = "nodejs"

/**
 * POST /api/esic/export-queue
 * Body: { rows: NormalizedRow[], establishmentCode?: string }
 * Returns the queue.json blob (also offered as a download).
 */
export async function POST(req: NextRequest) {
  let body: { rows?: NormalizedRow[]; establishmentCode?: string }
  try {
    body = await req.json()
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body: " + (e as Error).message }, { status: 400 })
  }

  if (!Array.isArray(body.rows)) {
    return NextResponse.json({ error: "Body must contain a 'rows' array" }, { status: 400 })
  }

  const queue: QueueFile = buildQueue(body.rows, body.establishmentCode)
  return NextResponse.json(queue)
}
