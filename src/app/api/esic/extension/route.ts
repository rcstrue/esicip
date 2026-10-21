import { NextResponse } from "next/server"
import JSZip from "jszip"
import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"

export const runtime = "nodejs"

const EXTENSION_DIR = join(process.cwd(), "extension")

const EXTENSION_FILES = [
  "manifest.json",
  "popup.html",
  "popup.js",
  "lib.bundle.js",
  "content.js",
  "dialog-patch.js",
  "background.js",
  "icon.png",
  "README.md",
]

/**
 * GET /api/esic/extension
 * Returns the Chrome extension as a downloadable .zip file.
 */
export async function GET() {
  try {
    const zip = new JSZip()

    for (const file of EXTENSION_FILES) {
      const filePath = join(EXTENSION_DIR, file)
      try {
        const stat = statSync(filePath)
        if (stat.isFile()) {
          const content = readFileSync(filePath)
          zip.file(file, content)
        }
      } catch {
        // skip missing files
      }
    }

    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 9 },
    })

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="esic-extension.zip"',
        "Content-Length": zipBuffer.length.toString(),
      },
    })
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to create extension zip: ${(e as Error).message}` },
      { status: 500 },
    )
  }
}
