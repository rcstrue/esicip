"use client"

import { FileDown, FileJson, FileSpreadsheet, Loader2, Info } from "lucide-react"

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

interface ExportStepProps {
  readyCount: number
  warningCount: number
  establishmentCode: string
  onEstablishmentCodeChange: (value: string) => void
  onExportQueue: () => void
  onExportCsv: () => void
  exportingQueue: boolean
  exportingCsv: boolean
}

const DEFAULT_ESTABLISHMENT_CODE = "39000547790001019"

export function ExportStep({
  readyCount,
  warningCount,
  establishmentCode,
  onEstablishmentCodeChange,
  onExportQueue,
  onExportCsv,
  exportingQueue,
  exportingCsv,
}: ExportStepProps) {
  const exportableCount = readyCount + warningCount
  const hasExportable = exportableCount > 0

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

      {!hasExportable && (
        <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          No rows are ready yet. Fix the errors in Step 2, then come back here.
        </p>
      )}
    </section>
  )
}
