// Browser entry — re-exports the pure-TS ESIC lib for the static
// GitHub Pages web tool (bundled with `bun build --target browser`).
export { parseCSV, toCSV, templateCSV, buildQueue } from "./csv"
export { validateRows, summarize } from "./validate"
export { CSV_COLUMNS } from "./field-map"
export type {
  NormalizedRow,
  ValidationSummary,
  ValidationIssue,
  RowStatus,
} from "./validate"
