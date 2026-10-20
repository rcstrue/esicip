import { NextResponse } from "next/server"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const runtime = "nodejs"

const RUNNER_PATH = join(process.cwd(), "runner", "runner.mjs")
const README_PATH = join(process.cwd(), "runner", "README.md")

/**
 * GET /api/esic/runner?type=script|readme
 * Returns the runner.mjs (default) or README.md as a downloadable file.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const type = url.searchParams.get("type") || "script"

  let filePath: string
  let filename: string
  let mimeType: string

  if (type === "readme") {
    filePath = README_PATH
    filename = "README.md"
    mimeType = "text/markdown; charset=utf-8"
  } else {
    filePath = RUNNER_PATH
    filename = "runner.mjs"
    mimeType = "text/javascript; charset=utf-8"
  }

  try {
    const content = readFileSync(filePath, "utf-8")
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (e) {
    return NextResponse.json(
      { error: `Could not read ${filename}: ${(e as Error).message}` },
      { status: 500 },
    )
  }
}
