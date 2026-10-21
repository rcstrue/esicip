"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertTriangle, BookOpen, FileCog, GitBranch, ListOrdered, ScrollText } from "lucide-react"

import {
  ACCOUNT_TYPE_CODES,
  MARITAL_CODES,
  RELATION_CODES,
  STATE_CODES,
} from "@/lib/esic/masters"
import { FIELD_MAP, FIELDS_BY_PAGE, type PageId } from "@/lib/esic/field-map"

/** Pages shown in the runner-flow docs (excludes the internal "aadhaar" page). */
type DocPageId = Exclude<PageId, "aadhaar">

const PAGE_LABELS: Record<DocPageId, string> = {
  entry: "1 · Entry",
  main: "2 · Main form",
  bank: "3 · Bank details",
  nominee: "4 · Nominee",
}

const PAGE_ORDER: DocPageId[] = ["entry", "main", "bank", "nominee"]

const PAGE_DESCRIPTIONS: Record<DocPageId, { title: string; aspx: string; steps: string[] }> = {
  entry: {
    title: "Entry page",
    aspx: "1RegisteredEmployees.aspx",
    steps: [
      "Employer/sub-unit code is auto-filled (disabled) — the runner just verifies it.",
      'Click the "No" radio for "Was the Employee ever allotted a ESI Number?" — this triggers a PostBack that reveals the form.',
      'Click Continue → navigate to the main registration form.',
    ],
  },
  main: {
    title: "Main form",
    aspx: "EmployeeCounterFoilRegistration.aspx",
    steps: [
      "Fill personal fields (name, father/husband, DOB, marital, gender).",
      "Fill present address — state select triggers a PostBack to load districts.",
      "Pick dispensary type → state → district → name. Each select PostBacks to load the next.",
      "Tick the declaration checkbox, then Submit → navigate to bank page.",
    ],
  },
  bank: {
    title: "Bank details",
    aspx: "EmployeeBankDetails.aspx",
    steps: [
      "Type the IFSC code, then click Search — PostBack auto-fills bank name, branch, MICR.",
      "Enter account number, MICR (optional), account type.",
      "Upload the cheque/passbook PDF/JPG (≤200KB), then Submit → nominee page.",
    ],
  },
  nominee: {
    title: "Nominee",
    aspx: "NomineeDetails.aspx",
    steps: [
      "Enter nominee name, relation (code from RELATION_CODES), share %.",
      "Optionally add a family member for the IP card (name, DOB, relation).",
      "Click Save → success page displays the generated 10-digit IP Number.",
    ],
  },
}

export function DocumentationPanel() {
  return (
    <section
      aria-labelledby="docs-heading"
      className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="size-4 text-muted-foreground" aria-hidden="true" />
        <h2 id="docs-heading" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Documentation
        </h2>
      </div>
      <Accordion type="single" collapsible className="rounded-xl border bg-card">
        <AccordionItem value="runner" className="px-4">
          <AccordionTrigger className="text-base">
            <span className="flex items-center gap-2">
              <GitBranch className="size-4 text-primary" aria-hidden="true" />
              How the runner works
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <RunnerFlow />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fieldmap" className="px-4">
          <AccordionTrigger className="text-base">
            <span className="flex items-center gap-2">
              <FileCog className="size-4 text-primary" aria-hidden="true" />
              Field map ({FIELD_MAP.length} fields)
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <FieldMapTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="masters" className="px-4">
          <AccordionTrigger className="text-base">
            <span className="flex items-center gap-2">
              <ScrollText className="size-4 text-primary" aria-hidden="true" />
              Master codes accepted by the validator
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <MasterCodes />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="limits" className="px-4">
          <AccordionTrigger className="text-base">
            <span className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-600" aria-hidden="true" />
              Honest limitations
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <Limitations />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

function RunnerFlow() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        The Playwright runner (runs on your machine, not in this sandbox) drives the real ESIC
        portal DOM through a 4-page PostBack flow. There is{" "}
        <strong className="text-foreground">no captcha after login</strong> — the captcha is only
        on the login screen itself, solved manually once per session. After that, every form
        submission is a standard ASP.NET WebForms PostBack with no further human-input challenges.
        Bulk runs at <strong className="text-foreground">~30–45 seconds per IP</strong> are
        feasible.
      </p>
      <ol className="space-y-3">
        {PAGE_ORDER.map((pageId) => {
          const meta = PAGE_DESCRIPTIONS[pageId]
          return (
            <li
              key={pageId}
              className="rounded-lg border bg-muted/30 p-3 sm:p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {PAGE_ORDER.indexOf(pageId) + 1}
                  </span>
                  {meta.title}
                </h3>
                <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono">
                  {meta.aspx}
                </code>
              </div>
              <ul className="mt-2 space-y-1.5 pl-8">
                {meta.steps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground sm:text-sm">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
      <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
        <strong>Key finding:</strong> The login captcha is the only human-input gate in the entire
        flow. Once logged in, the runner can chain through all 4 pages for every IP in the queue
        without further intervention.
      </p>
    </div>
  )
}

function FieldMapTable() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Each CSV column maps to an exact <code className="text-xs">name</code> attribute the
        portal submits. The runner uses these IDs to drive the real DOM. Internal-only fields
        (prefixed <code className="text-xs">_internal_</code>) are not in your CSV — the runner
        fills them automatically.
      </p>
      <div className="space-y-5">
        {PAGE_ORDER.map((pageId) => {
          const fields = FIELDS_BY_PAGE[pageId]
          return (
            <div key={pageId} className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {PAGE_LABELS[pageId]}
                </Badge>
                <span className="text-muted-foreground">{fields.length} fields</span>
              </h3>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CSV column</TableHead>
                      <TableHead>Portal control</TableHead>
                      <TableHead className="w-20">Required</TableHead>
                      <TableHead className="w-20">Type</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((f) => (
                      <TableRow key={`${pageId}-${f.controlId}`}>
                        <TableCell className="font-mono text-[11px]">
                          {f.csvColumn.startsWith("_internal_") ? (
                            <span className="text-muted-foreground/70">{f.csvColumn}</span>
                          ) : (
                            f.csvColumn
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <code className="font-mono text-[11px] text-foreground">
                              {f.controlName.replace("ctl00$HomePageContent$", "")}
                            </code>
                            <span className="text-[10px] text-muted-foreground">
                              {f.portalLabel}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {f.required ? (
                            <Badge
                              variant="outline"
                              className="border-red-200 bg-red-100 text-[10px] text-red-800"
                            >
                              required
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px]">
                            {f.type}
                          </Badge>
                          {f.triggersPostBack && (
                            <span className="ml-1 inline-flex items-center rounded bg-amber-100 px-1 py-0.5 text-[9px] font-semibold uppercase text-amber-800">
                              PB
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-md text-[11px] text-muted-foreground">
                          {f.runnerNote ?? (
                            f.maxLength ? `maxlength=${f.maxLength}` : "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MasterCodes() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        The validator accepts these labels as-is in your CSV (case-insensitive). They get
        translated to the underlying codes before being written into <code className="text-xs">queue.json</code>{" "}
        — so your CSV stays human-readable.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <CodeCard title="States (PresentState, DispensaryState)" codes={STATE_CODES} columns={2} />
        <CodeCard title="Nominee / family relations (NomineeRelation, FamilyMemberRelation)" codes={RELATION_CODES} columns={2} />
        <CodeCard title="Marital status (MaritalStatus)" codes={MARITAL_CODES} columns={2} />
        <CodeCard title="Bank account type (AccountType)" codes={ACCOUNT_TYPE_CODES} columns={2} />
      </div>
    </div>
  )
}

function CodeCard({
  title,
  codes,
  columns,
}: {
  title: string
  codes: Record<string, string>
  columns: 1 | 2 | 3
}) {
  const entries = Object.entries(codes)
  const colsClass =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "grid-cols-1"

  return (
    <Card className="py-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <ListOrdered className="size-4 text-primary" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid grid-cols-1 gap-1.5 ${colsClass}`}>
          {entries.map(([code, name]) => (
            <div
              key={code}
              className="flex items-center justify-between gap-2 rounded-md border bg-muted/30 px-2 py-1 text-xs"
            >
              <span className="truncate text-muted-foreground" title={name}>
                {name}
              </span>
              <code className="shrink-0 rounded bg-background px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">
                {code}
              </code>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Limitations() {
  const items = [
    {
      title: "Login captcha is solved manually — once per session",
      body: "The runner does not try to defeat the login captcha. You solve it in the headed browser window once; subsequent IP registrations within the same session have no captcha at all.",
    },
    {
      title: "Bank document upload is per-employee",
      body: "Each row needs its own cheque/passbook PDF/JPG (≤200KB) referenced by BankDocPath. The runner uploads one file per IP — there is no batch upload shortcut on the portal.",
    },
    {
      title: "Respect ESIC Terms of Service",
      body: "This tool assists with legitimate employer-driven bulk registration of employees. Do not use it to register fictitious IPs, evade contributions, or bypass any portal safeguards. Misuse is on the user, not this tool.",
    },
    {
      title: "Sensitive personal data handling",
      body: "Your CSV contains Aadhaar numbers, bank account numbers, and other PII. Keep it on encrypted storage, scrub temporary copies after the run, and never commit it to version control. This sandbox does not persist your CSV beyond the in-memory validation request.",
    },
    {
      title: "No automation runs in this sandbox",
      body: "This page only validates CSVs and produces artifacts. The Playwright runner is a separate local script on your machine that consumes queue.json. No real ESIC requests are made from here.",
    },
    {
      title: "District & dispensary codes are state-specific",
      body: "The portal loads district and dispensary dropdowns server-side per state. The validator can only check that you provided a label — it cannot verify the label is valid for your chosen state. The runner waits for each PostBack and selects by visible label.",
    },
  ]

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="rounded-lg border border-amber-200 bg-amber-50/40 p-3"
        >
          <p className="flex items-start gap-2 text-sm font-semibold text-amber-900">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-600" aria-hidden="true" />
            {item.title}
          </p>
          <p className="mt-1 pl-5 text-xs text-amber-800 sm:text-sm">{item.body}</p>
        </li>
      ))}
    </ul>
  )
}
