/**
 * Shared types for the ESIC frontend.
 * Re-exports library types so component props stay in sync with the API contract.
 */

import type { NormalizedRow, ValidationSummary } from "@/lib/esic/validate"

export type {
  NormalizedRow,
  ValidationIssue,
  ValidationSummary,
  RowStatus,
  IssueSeverity,
} from "@/lib/esic/validate"

export type { QueueFile, QueueItem } from "@/lib/esic/csv"

export type { FieldSpec, PageId } from "@/lib/esic/field-map"

/** Shape of the response returned by POST /api/esic/validate. */
export interface ValidateResponse {
  headers: string[]
  rows: Record<string, string>[]
  validated: NormalizedRow[]
  summary: ValidationSummary
  missingColumns: string[]
  unknownColumns: string[]
}

/** Possible filter selections for the validation results table. */
export type RowFilter = "all" | "ready" | "warning" | "error"
