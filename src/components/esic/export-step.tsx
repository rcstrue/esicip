"use client"

import { useState } from "react"
import {
  FileDown,
  FileJson,
  FileSpreadsheet,
  Loader2,
  Info,
  Terminal,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Puzzle,
  ChevronDown,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ExportStepProps {
  readyCount: number
  warningCount: number
  establishmentCode: string
  onEstablishmentCodeChange: (value: string) => void
  onExportQueue: () => void
  onExportCsv: () => void
  exportingQueue: boolean
  exportingCsv: boolean
  onDownloadRunner: () => void
  downloadingRunner: boolean
  onDownloadExtension: () => void
  downloadingExtension: boolean
}

const DEFAULT_ESTABLISHMENT_CODE = "39000547790001019"

const PACKAGE_JSON_CONTENT = `{
  "name": "esic-runner",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "start": "node runner.mjs" },
  "dependencies": { "playwright": "^1.48.0" }
}`

const EXTENSION_SETUP_STEPS = [
  {
    title: "Download + unzip the extension",
    body: "Click 'Download Chrome Extension' above. Unzip the file to a folder like C:\\esic-extension",
  },
  {
    title: "Open Chrome extensions page",
    body: "In Chrome or Edge, type this in the address bar: chrome://extensions/",
    code: true,
  },
  {
    title: "Enable Developer mode",
    body: "Toggle 'Developer mode' ON (top-right corner of the extensions page).",
  },
  {
    title: "Load the extension",
    body: "Click 'Load unpacked' → select the esic-extension folder you unzipped in step 1. The ESIC icon appears in your toolbar.",
  },
  {
    title: "Load your queue.json",
    body: "Click the extension icon in the toolbar → click 'Choose queue.json' → select the queue.json you downloaded from this page.",
  },
  {
    title: "Start filling!",
    body: "Log in to ESIC normally → navigate to Add Employee → the extension auto-fills every field → you click Submit/Continue/Save. On the success page, the IP Number is captured automatically. Click 'Next IP →' in the popup to continue.",
  },
]

const RUNNER_SETUP_STEPS = [
  {
    title: "Install Node.js 18+",
    body: "Download from nodejs.org and install. Verify with `node --version`.",
  },
  {
    title: "Create a folder",
    body: "mkdir esic-runner && cd esic-runner",
    code: true,
  },
  {
    title: "Save runner.mjs",
    body: "Click \"Download runner script\" above and save as runner.mjs in the folder.",
  },
  {
    title: "Create package.json",
    body: PACKAGE_JSON_CONTENT,
    code: true,
  },
  {
    title: "Install dependencies",
    body: "npm install && npx playwright install chromium",
    code: true,
  },
  {
    title: "Add queue.json + docs/",
    body: "Drop the queue.json (from the \"Download queue.json\" button) into the folder. Create a docs/ subfolder with each employee's bank document (PDF/JPG, ≤200KB). The BankDocPath column in your CSV must match these paths.",
  },
  {
    title: "Run",
    body: "node runner.mjs",
    code: true,
  },
  {
    title: "Log in + solve captcha",
    body: "Browser opens to ESIC. Log in with employer code, user ID, password, and solve the captcha. Once you see the dashboard, press Enter in the terminal. The runner handles everything else — no more typing.",
  },
]

export function ExportStep({
  readyCount,
  warningCount,
  establishmentCode,
  onEstablishmentCodeChange,
  onExportQueue,
  onExportCsv,
  exportingQueue,
  exportingCsv,
  onDownloadRunner,
  downloadingRunner,
  onDownloadExtension,
  downloadingExtension,
}: ExportStepProps) {
  const exportableCount = readyCount + warningCount
  const hasExportable = exportableCount > 0
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = async (text: string, stepIdx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStep(stepIdx)
      setTimeout(() => setCopiedStep(null), 2000)
    } catch {
      // clipboard not available — silent fail
    }
  }

  return (
    <section aria-labelledby="export-heading" className="space-y-5">
      <div className="flex flex-col gap-1">
        <h2 id="export-heading" className="text-lg font-semibold sm:text-xl">
          Step 3 — Export
        </h2>
        <p className="text-sm text-muted-foreground">
          Download the artifacts the local Playwright runner needs. Both ready and warning rows
          are exported — errors are filtered out automatically.
        </p>
      </div>

      <Card className="py-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="size-4 text-primary" aria-hidden="true" />
            Establishment Code (optional)
          </CardTitle>
          <CardDescription>
            Embedded in <code className="text-xs">queue.json</code> as metadata. The runner uses
            it for verification on the entry page (the field is auto-filled by the portal session
            and is disabled — the runner just confirms it matches).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="grid w-full max-w-md gap-1.5">
              <Label htmlFor="establishment-code">Establishment / sub-unit code</Label>
              <Input
                id="establishment-code"
                type="text"
                value={establishmentCode}
                onChange={(e) => onEstablishmentCodeChange(e.target.value)}
                placeholder={DEFAULT_ESTABLISHMENT_CODE}
                className="font-mono text-sm"
                inputMode="numeric"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            {establishmentCode !== DEFAULT_ESTABLISHMENT_CODE && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEstablishmentCodeChange(DEFAULT_ESTABLISHMENT_CODE)}
                className="h-9 min-h-11"
              >
                Reset to default
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          className="gap-3 py-6 transition-shadow hover:shadow-md"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <FileJson className="size-4" aria-hidden="true" />
                  </span>
                  queue.json
                </CardTitle>
                <CardDescription>
                  The full runner payload. One entry per exportable row with normalized codes
                  already translated from labels.
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-muted">
                {exportableCount.toLocaleString()} item{exportableCount === 1 ? "" : "s"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex gap-1.5">
                <span className="text-emerald-600">●</span>
                <span>
                  <span className="font-medium text-foreground">{readyCount.toLocaleString()}</span>{" "}
                  ready +{" "}
                  <span className="font-medium text-foreground">{warningCount.toLocaleString()}</span>{" "}
                  warning rows
                </span>
              </li>
              <li className="flex gap-1.5">
                <span className="text-red-500">●</span>
                <span>Error rows are skipped automatically</span>
              </li>
              <li className="flex gap-1.5">
                <span className="text-muted-foreground">●</span>
                <span>Format: JSON, pretty-printed, ~1KB per row</span>
              </li>
            </ul>
            <Button
              type="button"
              size="lg"
              onClick={onExportQueue}
              disabled={!hasExportable || exportingQueue}
              className="h-11 min-h-11 w-full sm:w-auto"
            >
              {exportingQueue ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Building queue…
                </>
              ) : (
                <>
                  <FileDown className="size-4" aria-hidden="true" />
                  Download queue.json
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="gap-3 py-6 transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <FileSpreadsheet className="size-4" aria-hidden="true" />
                  </span>
                  corrected CSV
                </CardTitle>
                <CardDescription>
                  Your original rows, but with labels normalized to portal codes (e.g.
                  &quot;Gujarat&quot; → &quot;29&quot;, &quot;Savings&quot; → &quot;2&quot;).
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-muted">
                {exportableCount.toLocaleString()} row{exportableCount === 1 ? "" : "s"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex gap-1.5">
                <span className="text-emerald-600">●</span>
                <span>Same column order as the template — drop-in replacement</span>
              </li>
              <li className="flex gap-1.5">
                <span className="text-muted-foreground">●</span>
                <span>
                  Uppercases EmpName / FatherOrHusbandName / NomineeName (portal does this in
                  CSS anyway)
                </span>
              </li>
              <li className="flex gap-1.5">
                <span className="text-muted-foreground">●</span>
                <span>Includes ALL validated rows (including errors) for your records</span>
              </li>
            </ul>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={onExportCsv}
              disabled={!hasExportable || exportingCsv}
              className="h-11 min-h-11 w-full sm:w-auto"
            >
              {exportingCsv ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Building CSV…
                </>
              ) : (
                <>
                  <FileDown className="size-4" aria-hidden="true" />
                  Download corrected CSV
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chrome Extension — RECOMMENDED */}
      <Card className="border-emerald-300 bg-emerald-50/50 py-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1.5">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Puzzle className="size-4" aria-hidden="true" />
                </span>
                Chrome Extension <span className="text-xs font-normal text-emerald-700">⭐ Recommended</span>
              </CardTitle>
              <CardDescription className="max-w-2xl">
                A browser extension that <strong>auto-fills every field</strong> on all 4 ESIC pages.
                Runs inside your normal Chrome/Edge browser — uses your existing login, no separate
                app, no crashes. <strong>You</strong> click Submit/Continue/Save yourself. Simplest + most reliable.
              </CardDescription>
            </div>
            <Badge className="bg-emerald-600 text-white">Easiest</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Auto-fills on page load — no buttons to click for filling</span>
              </p>
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Handles PostBack cascades (state → district → dispensary)</span>
              </p>
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Captures IP Number from success page automatically</span>
              </p>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Uses your existing browser login — no captcha issues</span>
              </p>
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Popup shows progress, results, Prev/Next IP buttons</span>
              </p>
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Export results.csv with IP Numbers — one click</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              size="lg"
              onClick={onDownloadExtension}
              disabled={downloadingExtension}
              className="h-11 min-h-11 bg-emerald-600 hover:bg-emerald-700"
            >
              {downloadingExtension ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Preparing…
                </>
              ) : (
                <>
                  <Puzzle className="size-4" aria-hidden="true" />
                  Download Chrome Extension
                </>
              )}
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="h-11 min-h-11"
                >
                  <BookOpen className="size-4" aria-hidden="true" />
                  Setup instructions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Puzzle className="size-5 text-emerald-600" aria-hidden="true" />
                    Extension setup — 6 steps
                  </DialogTitle>
                  <DialogDescription>
                    Total setup time: ~2 minutes. Much simpler than the runner script.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-4">
                  <ol className="space-y-4">
                    {EXTENSION_SETUP_STEPS.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1 space-y-1">
                          <p className="text-sm font-medium">{step.title}</p>
                          {step.code ? (
                            <div className="group relative">
                              <pre className="overflow-x-auto rounded-md bg-muted p-3 pr-10 font-mono text-xs leading-relaxed">
                                <code>{step.body}</code>
                              </pre>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(step.body, idx)}
                                className="absolute right-2 top-2 rounded-md bg-background/80 p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                                aria-label="Copy to clipboard"
                              >
                                {copiedStep === idx ? (
                                  <Check className="size-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="size-3.5" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">{step.body}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="font-semibold">Note</p>
            <p className="mt-1">
              The extension cannot auto-upload the bank document (cheque/passbook PDF) — browser security restriction.
              You select the file + click Upload manually on the bank page. All other fields are auto-filled.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Runner script — alternative (advanced) */}
      <details className="group">
        <summary className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          <Terminal className="size-4" aria-hidden="true" />
          Advanced: Playwright runner script (alternative to extension)
        </summary>
      <Card className="mt-3 border-muted py-6">
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1.5">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Terminal className="size-4" aria-hidden="true" />
                </span>
                Playwright runner script
              </CardTitle>
              <CardDescription className="max-w-2xl">
                Alternative to the extension — a Node.js script that fully automates everything
                (including clicking Submit). More powerful but harder to set up and may crash on
                dialogs/tabs. <strong>Use the Chrome extension above instead</strong> unless you
                specifically need full automation.
              </CardDescription>
            </div>
            <Badge variant="outline">Advanced</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Auto-fills AND auto-clicks Submit (full automation)</span>
              </p>
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Resume from last completed IP after crash / Ctrl+C</span>
              </p>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Full-page screenshot saved on every error</span>
              </p>
              <p className="flex gap-1.5">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Outputs results.json + results.csv with IP Numbers</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={onDownloadRunner}
              disabled={downloadingRunner}
              className="h-11 min-h-11"
            >
              {downloadingRunner ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Preparing…
                </>
              ) : (
                <>
                  <FileDown className="size-4" aria-hidden="true" />
                  Download runner script
                </>
              )}
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size="lg"
                  variant="ghost"
                  className="h-11 min-h-11"
                >
                  <BookOpen className="size-4" aria-hidden="true" />
                  Runner setup instructions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Terminal className="size-5 text-primary" aria-hidden="true" />
                    Runner setup — 8 steps
                  </DialogTitle>
                  <DialogDescription>
                    Run these on your machine. Total setup time: ~5 minutes.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-4">
                  <ol className="space-y-4">
                    {RUNNER_SETUP_STEPS.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1 space-y-1">
                          <p className="text-sm font-medium">{step.title}</p>
                          {step.code ? (
                            <div className="group relative">
                              <pre className="overflow-x-auto rounded-md bg-muted p-3 pr-10 font-mono text-xs leading-relaxed">
                                <code>{step.body}</code>
                              </pre>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(step.body, idx + 100)}
                                className="absolute right-2 top-2 rounded-md bg-background/80 p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                                aria-label="Copy to clipboard"
                              >
                                {copiedStep === idx + 100 ? (
                                  <Check className="size-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="size-3.5" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">{step.body}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="font-semibold">Known issues with the runner</p>
            <ul className="mt-1 space-y-0.5">
              <li>• May crash with "Protocol error: No dialog is showing" — use the extension instead</li>
              <li>• Tab management issues when ESIC opens pages in new tabs</li>
              <li>• Nominee XML format is best-guess — adjust <code>setNomineeXml()</code> if Save fails</li>
              <li>• IP Number extraction uses fallback strategies — adjust if all fail</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      </details>

      {!hasExportable && (
        <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          No rows are ready yet. Fix the errors in Step 2, then come back here.
        </p>
      )}
    </section>
  )
}
