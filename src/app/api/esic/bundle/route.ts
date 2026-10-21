import { NextResponse } from "next/server"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const runtime = "nodejs"

const BUNDLE_PATH = join(process.cwd(), "esicip.bundle")

/**
 * GET /api/esic/bundle
 * Returns a git bundle file. User runs:
 *   git clone esicip.bundle esicip
 *   cd esicip
 *   git remote add origin https://github.com/rcstrue/esicip.git
 *   git push -u origin main --force
 */
export async function GET() {
  try {
    const buffer = readFileSync(BUNDLE_PATH)
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="esicip.bundle"',
        "Content-Length": buffer.length.toString(),
      },
    })
  } catch (e) {
    return NextResponse.json(
      { error: `Bundle not found: ${(e as Error).message}` },
      { status: 500 },
    )
  }
}
