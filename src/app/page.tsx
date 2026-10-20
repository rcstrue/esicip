"use client"

import { useCallback, useState } from "react"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import { DocumentationPanel } from "@/components/esic/documentation-panel"
import { ExportStep } from "@/components/esic/export-step"
import { Header } from "@/components/esic/header"
import { Stepper } from "@/components/esic/stepper"
import { UploadStep } from "@/components/esic/upload-step"
import { ValidateStep } from "@/components/esic/validate-step"
import type { ValidateResponse } from "@/components/esic/types"

const DEFAULT_ESTABLISHMENT_CODE = "39000547790001019"

export default function Home() {
  const [validated, setValidated] = useState<ValidateResponse | null>(null)
  const [validating, setValidating] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [establishmentCode, setEstablishmentCode] = useState(DEFAULT_ESTABLISHMENT_CODE)
  const [exportingQueue, setExportingQueue] = useState(false)
  const [exportingCsv, setExportingCsv] = useState(false)

  // ─── Step 1: validate CSV ───────────────────────────────────────────────────
  const handleValidate = useCallback(async (csvText: string) => {
    setValidating(true)
    setUploadError(null)
    try {
      const res = await fetch("/api/esic/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: csvText }),
      })
      const data = (await res.json().catch(() => ({}))) as Partial<ValidateResponse> & {
        error?: string
      }
      if (!res.ok || !data.summary) {
        const msg = data.error || `Validation failed (HTTP ${res.status})`
        setUploadError(msg)
        toast.error(msg)
        return
      }
      setValidated(data as ValidateResponse)
      const { total, ready, warning, error } = data.summary
      toast.success(
        `Validated ${total} row${total === 1 ? "" : "s"} — ${ready} ready, ${warning} warning${
          warning === 1 ? "" : "s"
        }, ${error} error${error === 1 ? "" : "s"}`,
      )
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Network error"
      setUploadError(msg)
      toast.error(`Network error: ${msg}`)
    } finally {
      setValidating(false)
    }
  }, [])

  const handleDownloadTemplate = useCallback(async () => {
    try {
      const res = await fetch("/api/esic/template")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      triggerDownload(text, "esic-ip-template.csv", "text/csv;charset=utf-8")
      toast.success("Template downloaded", {
        description: "esic-ip-template.csv · 2 example rows + full schema",
      })
    } catch (e) {
      toast.error(`Failed to download template: ${e instanceof Error ? e.message : "unknown"}`)
    }
  }, [])

  const handleRetry = useCallback(() => {
    setUploadError(null)
  }, [])

  // ─── Step 3: export queue.json ──────────────────────────────────────────────
  const handleExportQueue = useCallback(async () => {
    if (!validated) return
    setExportingQueue(true)
    try {
      const res = await fetch("/api/esic/export-queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rows: validated.validated,
          establishmentCode: establishmentCode.trim() || null,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        count?: number
        error?: string
      }
      if (!res.ok) {
        throw new Error(data.error || `Queue export failed (HTTP ${res.status})`)
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      })
      triggerDownloadUrl(URL.createObjectURL(blob), "esic-queue.json")
      toast.success(`Exported ${data.count ?? 0} item${data.count === 1 ? "" : "s"}`, {
        description: "esic-queue.json · feed to the local Playwright runner",
      })
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Queue export failed")
    } finally {
      setExportingQueue(false)
    }
  }, [validated, establishmentCode])

  // ─── Step 3: export corrected CSV ───────────────────────────────────────────
  const handleExportCsv = useCallback(async () => {
    if (!validated) return
    setExportingCsv(true)
    try {
      const res = await fetch("/api/esic/export-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rows: validated.validated.map((v) => v.normalized),
        }),
      })
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(err.error || `CSV export failed (HTTP ${res.status})`)
      }
      const csvText = await res.text()
      triggerDownload(csvText, "esic-corrected.csv", "text/csv;charset=utf-8")
      toast.success("Corrected CSV downloaded", {
        description: "esic-corrected.csv · labels normalized to portal codes",
      })
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "CSV export failed")
    } finally {
      setExportingCsv(false)
    }
  }, [validated])

  // ─── Stepper state ──────────────────────────────────────────────────────────
  const canValidate = !!validated
  const canExport = !!validated && validated.summary.ready > 0
  const currentStep: 1 | 2 | 3 = !validated ? 1 : canExport ? 3 : 2

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Toaster position="top-right" richColors closeButton />

      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <Stepper current={currentStep} canValidate={canValidate} canExport={canExport} />

          <UploadStep
            onSubmit={handleValidate}
            onDownloadTemplate={handleDownloadTemplate}
            validating={validating}
            error={uploadError}
            onRetry={handleRetry}
          />

          {validated && (
            <section
              aria-labelledby="validate-section-heading"
              className="scroll-mt-4 border-t border-border pt-6 sm:pt-8"
            >
              <h2 id="validate-section-heading" className="sr-only">
                Validation results
              </h2>
              <ValidateStep data={validated} />
            </section>
          )}

          {validated && canExport && (
            <section
              aria-labelledby="export-section-heading"
              className="scroll-mt-4 border-t border-border pt-6 sm:pt-8"
            >
              <h2 id="export-section-heading" className="sr-only">
                Export artifacts
              </h2>
              <ExportStep
                readyCount={validated.summary.ready}
                warningCount={validated.summary.warning}
                establishmentCode={establishmentCode}
                onEstablishmentCodeChange={setEstablishmentCode}
                onExportQueue={handleExportQueue}
                onExportCsv={handleExportCsv}
                exportingQueue={exportingQueue}
                exportingCsv={exportingCsv}
              />
            </section>
          )}

          <DocumentationPanel />
        </div>
      </main>

      <footer className="mt-auto border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground">
            ESIC IP Bulk Helper — personal assistive tool.{" "}
            <span className="text-muted-foreground/70">
              Not affiliated with ESIC.
            </span>{" "}
            Use responsibly per ESIC terms.
          </p>
        </div>
      </footer>
    </div>
  )
}

// ─── Browser download helpers ───────────────────────────────────────────────

function triggerDownload(text: string, filename: string, mime: string) {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  triggerDownloadUrl(url, filename)
}

function triggerDownloadUrl(url: string, filename: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.style.display = "none"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
