"use client"

import { useCallback, useRef, useState } from "react"
import {
  AlertCircle,
  FileDown,
  FileUp,
  Loader2,
  RotateCcw,
  Upload,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface UploadStepProps {
  /** Called when the user submits a CSV (via drop, browse, or paste). */
  onSubmit: (csvText: string) => void | Promise<void>
  /** Called when the user clicks "Download CSV template". */
  onDownloadTemplate: () => void | Promise<void>
  /** True while the validate API call is in flight. */
  validating: boolean
  /** Error message returned by the validate API (4xx). */
  error: string | null
  /** Called when the user clicks "Try again" on the error alert. */
  onRetry: () => void
}

export function UploadStep({
  onSubmit,
  onDownloadTemplate,
  validating,
  error,
  onRetry,
}: UploadStepProps) {
  const [dragging, setDragging] = useState(false)
  const [pasteText, setPasteText] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const readFile = useCallback(
    async (file: File) => {
      const text = await file.text()
      await onSubmit(text)
    },
    [onSubmit],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) {
        void readFile(file)
      }
    },
    [readFile],
  )

  const handleBrowse = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        void readFile(file)
      }
      // Reset so the same file can be re-selected
      e.target.value = ""
    },
    [readFile],
  )

  const handlePasteSubmit = useCallback(() => {
    if (!pasteText.trim()) return
    void onSubmit(pasteText)
  }, [pasteText, onSubmit])

  return (
    <section aria-labelledby="upload-heading" className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 id="upload-heading" className="text-lg font-semibold sm:text-xl">
          Step 1 — Upload your CSV
        </h2>
        <p className="text-sm text-muted-foreground">
          Drag a file in, paste the CSV text directly, or grab the template to see the exact
          column schema the validator expects.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircle className="size-4" aria-hidden="true" />
          <AlertTitle>Validation failed</AlertTitle>
          <AlertDescription className="space-y-2">
            <p className="break-words">{error}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              className="h-8 gap-1.5"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileUp className="size-4 text-primary" aria-hidden="true" />
              Drag &amp; drop
            </CardTitle>
            <CardDescription>
              Drop a <code className="text-xs">.csv</code> file here, or click to browse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <label
              htmlFor="csv-file-input"
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={cn(
                "flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
                dragging
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-full",
                  dragging ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
                aria-hidden="true"
              >
                <Upload className="size-7" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {dragging ? "Drop to upload" : "Drop CSV here"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Max ~5&nbsp;MB · UTF-8 · RFC-4180 quoted
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={validating}
                onClick={(e) => {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }}
                className="mt-1 h-9 min-h-11"
              >
                <FileUp className="size-4" aria-hidden="true" />
                Browse files
              </Button>
              <input
                id="csv-file-input"
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv,application/vnd.ms-excel"
                onChange={handleBrowse}
                disabled={validating}
                className="sr-only"
                aria-label="Choose CSV file"
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileUp className="size-4 text-primary" aria-hidden="true" />
              Or paste CSV text
            </CardTitle>
            <CardDescription>
              Paste the full CSV including the header row.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={"Paste your CSV text here (including the header row)..."}
              rows={9}
              disabled={validating}
              className="w-full max-w-full font-mono text-xs"
              aria-label="Paste CSV text"
            />
            <Button
              type="button"
              onClick={handlePasteSubmit}
              disabled={validating || !pasteText.trim()}
              className="h-10 min-h-11 w-full sm:w-auto"
            >
              {validating ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Validating…
                </>
              ) : (
                <>
                  <FileUp className="size-4" aria-hidden="true" />
                  Validate pasted CSV
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Need the column schema first?</p>
            <p className="text-xs text-muted-foreground">
              Download a starter template with two example rows you can edit.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => void onDownloadTemplate()}
            className="h-10 min-h-11"
          >
            <FileDown className="size-4" aria-hidden="true" />
            Download CSV template
          </Button>
        </CardContent>
      </Card>

      {validating && <UploadSkeleton />}
    </section>
  )
}

function UploadSkeleton() {
  return (
    <div className="space-y-3" aria-live="polite" aria-busy="true">
      <p className="sr-only">Loading validation results…</p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-10 w-full max-w-md rounded-lg" />
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  )
}
