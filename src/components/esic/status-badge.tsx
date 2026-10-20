"use client"

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { RowStatus } from "@/lib/esic/validate"

const STATUS_CONFIG: Record<
  RowStatus,
  { label: string; className: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  ready: {
    label: "Ready",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Icon: CheckCircle2,
  },
  warning: {
    label: "Warning",
    className: "bg-amber-100 text-amber-800 border-amber-200",
    Icon: AlertTriangle,
  },
  error: {
    label: "Error",
    className: "bg-red-100 text-red-800 border-red-200",
    Icon: XCircle,
  },
}

export function StatusBadge({
  status,
  className,
  showIcon = true,
}: {
  status: RowStatus
  className?: string
  showIcon?: boolean
}) {
  const { label, className: statusClass, Icon } = STATUS_CONFIG[status]
  return (
    <Badge variant="outline" className={cn(statusClass, className)}>
      {showIcon && <Icon className="size-3" aria-hidden="true" />}
      {label}
    </Badge>
  )
}
