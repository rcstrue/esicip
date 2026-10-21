"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ChevronDown,
  CheckCircle2,
  Columns3,
  Info,
  ListChecks,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { NormalizedRow } from "@/lib/esic/validate"
import type { RowFilter, ValidateResponse } from "./types"
import { StatusBadge } from "./status-badge"

interface ValidateStepProps {
  data: ValidateResponse
}

const FILTERS: { id: RowFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ready", label: "Ready" },
  { id: "warning", label: "Warnings" },
  { id: "error", label: "Errors" },
]

const SUMMARY_CARDS: {
  key: "total" | "ready" | "warning" | "error"
  label: string
  accent: string
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  { key: "total", label: "Total rows", accent: "text-foreground", Icon: ListChecks },
  { key: "ready", label: "Ready", accent: "text-emerald-700", Icon: CheckCircle2 },
  { key: "warning", label: "Warnings", accent: "text-amber-700", Icon: AlertTriangle },
  { key: "error", label: "Errors", accent: "text-red-700", Icon: XCircle },
]

/** Columns we render in the compact results table (besides #, Status, Issues, Actions). */
const KEY_COLUMNS: { col: keyof NormalizedRow["normalized"]; label: string }[] = [
  { col: "FatherOrHusbandName", label: "Father / Husband" },
  { col: "DOB", label: "DOB" },
  { col: "MobileNo", label: "Mobile" },
  { col: "IFSCCode", label: "IFSC" },
]

export function ValidateStep({ data }: ValidateStepProps) {
  const { summary, missingColumns, unknownColumns, validated } = data
  const [filter, setFilter] = useState<RowFilter>("all")
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const counts: Record<RowFilter, number> = {
    all: summary.total,
    ready: summary.ready,
    warning: summary.warning,
    error: summary.error,
  }

  const filteredRows = useMemo(() => {
    if (filter === "all") return validated
    return validated.filter((r) => r.status === filter)
  }, [validated, filter])

  const toggleRow = (rowIndex: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowIndex)) {
        next.delete(rowIndex)
      } else {
        next.add(rowIndex)
      }
      return next
    })
  }

  const hasColumnIssues = missingColumns.length > 0 || unknownColumns.length > 0

  return (
    <section aria-labelledby="validate-heading" className="space-y-5">
      <div className="flex flex-col gap-1">
        <h2 id="validate-heading" className="text-lg font-semibold sm:text-xl">
          Step 2 — Validate &amp; review
        </h2>
        <p className="text-sm text-muted-foreground">
          Each row was checked against the real ESIC portal rules (lengths, regex, code
          lookups, interlocks). Fix errors before exporting — warnings can still go through.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {SUMMARY_CARDS.map(({ key, label, accent, Icon }) => (
          <Card key={key} className="gap-2 py-4">
            <CardContent className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                <Icon className={cn("size-4", accent)} aria-hidden="true" />
              </div>
              <div className={cn("text-3xl font-bold tabular-nums", accent)}>
                {summary[key].toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Column health */}
      {hasColumnIssues && (
        <Card className="border-amber-200 bg-amber-50/50 py-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-amber-900">
              <Columns3 className="size-4" aria-hidden="true" />
              Column health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {missingColumns.length > 0 && (
              <div className="space-y-1.5">
                <p className="font-medium text-red-800">
                  Missing columns ({missingColumns.length}) — required by the validator
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missingColumns.map((col) => (
                    <Badge
                      key={col}
                      variant="outline"
                      className="border-red-200 bg-red-100 font-mono text-[11px] text-red-800"
                    >
                      {col}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-red-700">
                  These columns are missing entirely — rows will likely fail validation. Add
                  them to your CSV (download the template for the full schema).
                </p>
              </div>
            )}
            {unknownColumns.length > 0 && (
              <div className="space-y-1.5">
                <p className="font-medium text-amber-800">
                  Unknown columns ({unknownColumns.length}) — not consumed by the runner
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {unknownColumns.map((col) => (
                    <Badge
                      key={col}
                      variant="outline"
                      className="border-amber-200 bg-amber-100 font-mono text-[11px] text-amber-800"
                    >
                      {col}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-amber-700">
                  These are not in the schema and will be ignored — fine if intentional.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Show:</span>
        <div
          role="group"
          aria-label="Filter rows by status"
          className="flex flex-wrap gap-1.5"
        >
          {FILTERS.map(({ id, label }) => {
            const active = filter === id
            const count = counts[id]
            const colorClass =
              id === "ready"
                ? "border-emerald-300 bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : id === "warning"
                  ? "border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200"
                  : id === "error"
                    ? "border-red-300 bg-red-100 text-red-800 hover:bg-red-200"
                    : "border-border bg-card hover:bg-muted"
            return (
              <Button
                key={id}
                type="button"
                size="sm"
                variant="outline"
                aria-pressed={active}
                onClick={() => setFilter(id)}
                className={cn(
                  "h-9 min-h-9 gap-1.5 rounded-full border px-3 text-xs font-medium",
                  active ? colorClass : "text-muted-foreground",
                )}
              >
                <span>{label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                    active ? "bg-background/60" : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Results table */}
      <Card className="gap-0 overflow-hidden py-0">
        <ScrollArea className="max-h-[600px] w-full">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="w-28">Status</TableHead>
                <TableHead>Employee name</TableHead>
                {KEY_COLUMNS.map((c) => (
                  <TableHead key={c.col} className="hidden md:table-cell">
                    {c.label}
                  </TableHead>
                ))}
                <TableHead className="w-20 text-center">Issues</TableHead>
                <TableHead className="w-16 text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No rows match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map((row) => {
                  const isExpanded = expandedRows.has(row.rowIndex)
                  const hasIssues = row.issues.length > 0
                  const errorCount = row.issues.filter((i) => i.severity === "error").length
                  const warningCount = row.issues.filter((i) => i.severity === "warning").length
                  return (
                    <RowGroup
                      key={row.rowIndex}
                      row={row}
                      isExpanded={isExpanded}
                      hasIssues={hasIssues}
                      errorCount={errorCount}
                      warningCount={warningCount}
                      onToggle={() => toggleRow(row.rowIndex)}
                    />
                  )
                })
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing {filteredRows.length.toLocaleString()} of {summary.total.toLocaleString()} rows.{" "}
        Click any row&apos;s <Info className="inline size-3 align-text-bottom" aria-hidden="true" />{" "}
        icon to expand issue details.
      </p>
    </section>
  )
}

function RowGroup({
  row,
  isExpanded,
  hasIssues,
  errorCount,
  warningCount,
  onToggle,
}: {
  row: NormalizedRow
  isExpanded: boolean
  hasIssues: boolean
  errorCount: number
  warningCount: number
  onToggle: () => void
}) {
  return (
    <>
      <TableRow
        onClick={onToggle}
        className={cn(
          "cursor-pointer",
          isExpanded && "bg-muted/40",
          row.status === "error" && "bg-red-50/40 hover:bg-red-50/70",
          row.status === "warning" && "bg-amber-50/40 hover:bg-amber-50/70",
        )}
        aria-expanded={isExpanded}
      >
        <TableCell className="text-center font-mono text-xs text-muted-foreground">
          {row.rowIndex}
        </TableCell>
        <TableCell>
          <StatusBadge status={row.status} />
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex flex-col gap-0.5">
            <span className="truncate max-w-[220px] sm:max-w-xs">
              {row.normalized.EmpName || (
                <span className="italic text-muted-foreground">—</span>
              )}
            </span>
            <span className="text-xs text-muted-foreground md:hidden">
              {row.normalized.IFSCCode || "—"}
            </span>
          </div>
        </TableCell>
        {KEY_COLUMNS.map((c) => (
          <TableCell key={c.col} className="hidden md:table-cell font-mono text-xs">
            {row.normalized[c.col] || (
              <span className="text-muted-foreground/60">—</span>
            )}
          </TableCell>
        ))}
        <TableCell className="text-center">
          {hasIssues ? (
            <div className="flex items-center justify-center gap-1 text-xs">
              {errorCount > 0 && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-0.5 font-semibold text-red-800">
                  <XCircle className="size-3" aria-hidden="true" />
                  {errorCount}
                </span>
              )}
              {warningCount > 0 && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800">
                  <AlertTriangle className="size-3" aria-hidden="true" />
                  {warningCount}
                </span>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center gap-0.5 text-xs text-emerald-700">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              OK
            </span>
          )}
        </TableCell>
        <TableCell className="text-right">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
            aria-label={isExpanded ? "Collapse row details" : "Expand row details"}
            aria-expanded={isExpanded}
            className="size-8"
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                isExpanded && "rotate-180",
              )}
              aria-hidden="true"
            />
          </Button>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell colSpan={7} className="p-0">
            <ExpandedRow row={row} />
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

function ExpandedRow({ row }: { row: NormalizedRow }) {
  if (row.issues.length === 0) {
    return (
      <div className="flex items-center gap-2 px-4 py-4 text-sm text-emerald-700">
        <CheckCircle2 className="size-4" aria-hidden="true" />
        <span>No issues — this row is ready for the runner.</span>
      </div>
    )
  }

  const errors = row.issues.filter((i) => i.severity === "error")
  const warnings = row.issues.filter((i) => i.severity === "warning")

  return (
    <div className="space-y-3 px-4 py-4">
      {errors.length > 0 && (
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
            <XCircle className="size-3.5" aria-hidden="true" />
            Errors ({errors.length}) — must fix
          </p>
          <ul className="space-y-1">
            {errors.map((issue, i) => (
              <li
                key={`${issue.column}-${i}`}
                className="flex flex-col gap-0.5 rounded-md border border-red-200 bg-red-50/60 px-3 py-1.5 text-xs sm:flex-row sm:items-center sm:gap-2"
              >
                <code className="shrink-0 font-mono text-[11px] font-semibold text-red-900">
                  {issue.column}
                </code>
                <span className="text-red-800">{issue.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {warnings.length > 0 && (
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
            <AlertTriangle className="size-3.5" aria-hidden="true" />
            Warnings ({warnings.length}) — review recommended
          </p>
          <ul className="space-y-1">
            {warnings.map((issue, i) => (
              <li
                key={`${issue.column}-${i}`}
                className="flex flex-col gap-0.5 rounded-md border border-amber-200 bg-amber-50/60 px-3 py-1.5 text-xs sm:flex-row sm:items-center sm:gap-2"
              >
                <code className="shrink-0 font-mono text-[11px] font-semibold text-amber-900">
                  {issue.column}
                </code>
                <span className="text-amber-800">{issue.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
