"use client"

import { Check, ClipboardCheck, Download, Upload } from "lucide-react"

import { cn } from "@/lib/utils"

interface StepperProps {
  current: 1 | 2 | 3
  canValidate: boolean
  canExport: boolean
}

const STEPS = [
  { id: 1, label: "Upload", Icon: Upload },
  { id: 2, label: "Validate & Review", Icon: ClipboardCheck },
  { id: 3, label: "Export", Icon: Download },
] as const

export function Stepper({ current, canValidate, canExport }: StepperProps) {
  const enabled = [true, canValidate, canExport]

  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex w-full items-center gap-1 sm:gap-2">
        {STEPS.map((step, idx) => {
          const isActive = current === step.id
          const isComplete = current > step.id
          const isDisabled = !enabled[idx]
          const isUpcoming = !isActive && !isComplete && !isDisabled

          return (
            <li key={step.id} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  "flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border px-2.5 py-2 text-sm font-medium transition-colors sm:px-3",
                  isActive &&
                    "border-primary bg-primary text-primary-foreground shadow-sm",
                  isComplete && "border-emerald-200 bg-emerald-50 text-emerald-800",
                  isUpcoming && "border-border bg-card text-muted-foreground",
                  isDisabled && "border-dashed border-border bg-muted/40 text-muted-foreground/60",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    isActive && "bg-primary-foreground/15 text-primary-foreground",
                    isComplete && "bg-emerald-600 text-white",
                    isUpcoming && "bg-muted text-muted-foreground",
                    isDisabled && "bg-muted text-muted-foreground/60",
                  )}
                >
                  {isComplete ? <Check className="size-3.5" aria-hidden="true" /> : step.id}
                </span>
                <span className="flex items-center gap-1.5 truncate">
                  <step.Icon
                    className={cn(
                      "hidden size-4 sm:inline",
                      isActive && "text-primary-foreground",
                      isComplete && "text-emerald-700",
                      isUpcoming && "text-muted-foreground",
                      isDisabled && "text-muted-foreground/60",
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{step.label}</span>
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "hidden h-px w-6 shrink-0 sm:block lg:w-10",
                    current > step.id ? "bg-emerald-300" : "bg-border",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
