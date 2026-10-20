import { Badge } from "@/components/ui/badge"
import { FileSpreadsheet, ShieldCheck } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileSpreadsheet className="size-5" aria-hidden="true" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                ESIC IP Bulk Registration Helper
              </h1>
            </div>
            <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
              A data-prep and queue-builder tool for ESIC Insured Person bulk registration.
              Validates your CSV against the portal&apos;s real ASP.NET rules, then exports a{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">queue.json</code> the
              Playwright runner on your machine consumes. No portal automation runs in this
              sandbox — that runs locally.
            </p>
          </div>
          <Badge
            variant="outline"
            className="w-fit gap-1.5 bg-emerald-50 px-3 py-1 text-xs text-emerald-800"
          >
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            No captcha after login — bulk runs are feasible
          </Badge>
        </div>
      </div>
    </header>
  )
}
