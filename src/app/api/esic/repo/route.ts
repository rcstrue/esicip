import { NextResponse } from "next/server"
import JSZip from "jszip"
import { readFileSync, statSync, readdirSync } from "node:fs"
import { join } from "node:path"

export const runtime = "nodejs"

const REPO_DIR = join(process.cwd(), "esicip-repo")

/** Recursively add files from a directory to the zip (skips .git) */
function addDirToZip(zip: JSZip, dirPath: string, zipPath: string) {
  const entries = readdirSync(dirPath)
  for (const entry of entries) {
    if (entry === ".git") continue // skip git internals
    const fullPath = join(dirPath, entry)
    const entryZipPath = zipPath ? `${zipPath}/${entry}` : entry
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      addDirToZip(zip, fullPath, entryZipPath)
    } else {
      const content = readFileSync(fullPath)
      zip.file(entryZipPath, content)
    }
  }
}

/**
 * GET /api/esic/repo
 * Returns the complete GitHub-ready repo as a downloadable .zip file.
 */
export async function GET() {
  try {
    const zip = new JSZip()

    addDirToZip(zip, REPO_DIR, "")

    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 9 },
    })

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="esicip-repo.zip"',
        "Content-Length": zipBuffer.length.toString(),
      },
    })
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to create repo zip: ${(e as Error).message}` },
      { status: 500 },
    )
  }
}
