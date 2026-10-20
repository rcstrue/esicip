# ESIC IP Bulk Registration Helper — Shared Worklog

This file tracks the work of all agents collaborating on the ESIC IP bulk-registration
helper tool. Append your section at the bottom; never overwrite previous entries.

---
Task ID: 4
Agent: full-stack-developer
Task: Build the user-facing frontend (`src/app/page.tsx` + supporting components in
`src/components/esic/`) on top of the already-complete backend library and API routes
(`src/lib/esic/*`, `src/app/api/esic/*`).

Work Log:
- Read the existing libs (`masters.ts`, `field-map.ts`, `validate.ts`, `csv.ts`) and all
  four API routes (`validate`, `export-queue`, `export-csv`, `template`) to nail down the
  request/response contract before writing any UI.
- Confirmed `@tanstack/react-table`, `sonner`, `lucide-react`, all shadcn/ui components,
  and Tailwind 4 are already installed; reused them rather than rolling anything custom.
- Created 8 new files under `src/components/esic/`:
  - `types.ts` — re-exports library types and defines `ValidateResponse` / `RowFilter`
    so component props stay in sync with the API contract.
  - `status-badge.tsx` — color-coded `StatusBadge` (Ready=emerald, Warning=amber,
    Error=red) using the exact Tailwind classes called out in the task spec.
  - `header.tsx` — page header with title, subtitle explaining sandbox-vs-local-runner
    split, and the "No captcha after login — bulk runs are feasible" key-finding badge.
  - `stepper.tsx` — 3-step visual progress indicator (`Upload → Validate & Review →
    Export`) with completed-check, active-primary, upcoming-muted, and disabled-dashed
    states. Mobile-collapses the connector lines and step icons.
  - `upload-step.tsx` — Step 1: drag-drop zone + paste-textarea + "Download CSV
    template" button. Shows a destructive `Alert` with a "Try again" button on 4xx,
    and a `Skeleton` block while validating.
  - `validate-step.tsx` — Step 2: four summary cards (Total / Ready / Warnings /
    Errors), a column-health panel (red for missing, amber for unknown), filter chips
    (All / Ready / Warnings / Errors with counts), and a results table inside a
    `ScrollArea` capped at `max-h-[600px]`. Each row expands on click to show issues
    grouped by severity with icons. Hidden on mobile, key fields appear in a stacked
    sub-line under EmpName.
  - `export-step.tsx` — Step 3: optional Establishment Code input (defaulted to
    `39000547790001019`, with reset-to-default), plus two large download buttons
    (queue.json + corrected CSV) with spinner text while in flight. Shown only when
    `summary.ready > 0` per the task spec.
  - `documentation-panel.tsx` — collapsible `Accordion` at the bottom with four
    sections: "How the runner works" (4-page PostBack flow with per-page steps + key
    finding callout), "Field map" (rendered from `FIELD_MAP`/`FIELDS_BY_PAGE`,
    grouped by page, showing CSV column / portal control / required / type / notes,
    with a `PB` badge for fields that trigger PostBacks), "Master codes" (compact
    grid view of `STATE_CODES`, `RELATION_CODES`, `MARITAL_CODES`,
    `ACCOUNT_TYPE_CODES`), and "Honest limitations" (6 amber-tinted cards covering
    manual captcha, per-employee bank doc, ToS, PII handling, sandbox scope, and
    state-specific district codes).
- Rewrote `src/app/page.tsx` end-to-end as a single `'use client'` component:
  - Root wrapper: `min-h-screen flex flex-col bg-background text-foreground` with
    `mt-auto` footer (sticky-bottom on short pages, pushed down on long pages —
    matches the layout spec).
  - Owns all state: `validated`, `validating`, `uploadError`, `establishmentCode`,
    `exportingQueue`, `exportingCsv`. The stepper's `current` and the visibility of
    steps 2/3 are derived from these.
  - Implements all three API calls per the spec's data-flow snippets:
    - `POST /api/esic/validate` with `{ csv }` on file drop or paste submit.
    - `POST /api/esic/export-queue` with `{ rows: validated.validated,
      establishmentCode }`, then constructs a `Blob` and triggers a download as
      `esic-queue.json`.
    - `POST /api/esic/export-csv` with `{ rows: validated.map(v => v.normalized) }`,
      then triggers a download as `esic-corrected.csv`.
    - `GET /api/esic/template` for the template download.
  - `sonner` `Toaster` (with `richColors` + `closeButton`, top-right) is rendered
    inside the page itself since the root `layout.tsx` only wires up the radix
    `Toaster`. Toasts fire on upload success/error, template download, and both
    export flows with descriptive messages.
  - Browser-download helpers (`triggerDownload` / `triggerDownloadUrl`) create a
    hidden `<a>`, click it, then revoke the object URL — no external deps.
- Verified the contract end-to-end with curl smoke tests against the dev server:
  - `POST /api/esic/validate` with a ready row → `summary: {total:1, ready:1, ...}`,
    `status: ready`.
  - `POST /api/esic/validate` with a wrong NomineeRelation label → `status: error`
    with the expected issue (the validator's master codes use "Dependant father" not
    "Father" — this is a pre-existing lib behavior, surfaced correctly by the UI).
  - `POST /api/esic/export-queue` → `{ generatedAt, count, establishmentCode, items }`
    as expected.
  - `GET /api/esic/template` → 1036-byte CSV with the full 32-column header.
- Visual polish: Lucide icons throughout (FileUp, FileDown, FileJson, FileSpreadsheet,
  CheckCircle2, AlertTriangle, XCircle, Info, ChevronDown, ShieldCheck, etc.),
  hover-shadow transitions on export cards, sticky table header inside the scroll
  area, tabular-nums for counts, monospace for codes/IDs, `min-h-11` (44px) touch
  targets on mobile, `sr-only` labels where appropriate, semantic `<header>/<main>/
  <section>/<footer>`.

Stage Summary:
- `bun run lint` passes clean (zero errors, zero warnings).
- Dev server compiles the page in ~250–750ms with no errors; `GET /` returns 200 and
  the rendered HTML contains the title, key-finding badge, "Step 1 — Upload your CSV",
  and the Documentation panel header.
- All four API routes are exercised and respond as the page expects.
- No files outside `src/app/page.tsx` and `src/components/esic/*` were touched. The
  `src/lib/esic/*` libraries, the API routes, `package.json`, and the rest of the
  scaffold are unchanged.
- The page is fully client-side (`'use client'`), responsive across mobile/tablet/
  desktop, theme-aware (uses Tailwind CSS variable-based palette — `bg-primary`,
  `text-primary-foreground`, `bg-muted`, `bg-card`, etc.), and contains zero indigo
  or blue color usage (verified by grep). Status colors are limited to
  emerald/amber/red per the spec.
- Ready for the user to test the flow: download template → fill rows → drop CSV →
  review issues → fix → export `queue.json` for the local Playwright runner.

---
Task ID: 1, 2, 3, 5
Agent: main (Z.ai Code orchestrator)
Task: Build ESIC masters/field-map library (1), validation engine (2), API routes (3), and perform end-to-end self-verification with agent-browser (5).

Work Log:
- Task 1 (masters + field-map): Read all 4 uploaded ASPX source files end-to-end (EmployeeCounterFoilRegistration.aspx 2672 lines, EmployeeBankDetails.aspx 360 lines, 2EmployeeBankDetails.aspx 560 lines post-IFSC-search, NomineeDetails.aspx 858 lines, 1RegisteredEmployees.aspx entry page). Extracted every <input>/<select>/<textarea> with name/id/maxlength/required, all <option> code tables (states, nominee relations, marital status, account types, gender, father/husband), and the assignGender/assignFather interlock JS. Wrote src/lib/esic/masters.ts (code tables + regexes) and src/lib/esic/field-map.ts (40 FieldSpec entries mapping CSV column → exact portal control name/id, grouped by 4 pages: entry/main/bank/nominee, with PostBack + interlock notes for the runner).
- Task 2 (validation engine): Wrote src/lib/esic/validate.ts with Verhoeff Aadhaar checksum, IFSC regex, PIN/mobile/date validators, marital↔gender↔father/husband interlock enforcement (matches portal's assignGender/assignFather JS exactly), DOA-vs-DOB sanity, nominee share 1-100, family-member completeness, and label→code translation for all master tables. Initially had a bug: portal option text is "Dependant father" but users naturally write "Father" — validator rejected it. Fixed by adding RELATION_ALIASES map (Father→7, Mother→8, Spouse→1, etc.) merged into RELATION_NAME_TO_CODE, plus RELATION_ACCEPTED_LABELS for friendly error messages.
- Task 3 (API routes): Wrote 4 routes under src/app/api/esic/: validate (POST, accepts JSON {csv} or multipart file), export-queue (POST, returns QueueFile JSON), export-csv (POST, returns text/csv download), template (GET, returns downloadable CSV template with 2 example rows). All use runtime="nodejs".
- Task 5 (self-verification with agent-browser):
  - Opened http://localhost:3000/ → page renders cleanly, no hydration errors.
  - Verified all 4 API endpoints via curl: validate correctly flags missing columns + bad labels; template returns 32-column CSV; export-queue returns properly translated codes (Gujarat→29, Married→2, Savings→2, Father→7); export-csv returns corrected CSV.
  - Full UI flow test on desktop (1600x900): uploaded template CSV via file input → Step 2 rendered with 4 summary cards (Total 2 / Ready 1 / Warnings 1 / Errors 0), filter chips, results table with both rows, expandable issue details. Step 3 rendered with establishment code pre-filled (39000547790001019) and both download buttons. Clicked "Download queue.json" → POST /api/esic/export-queue 200. Clicked "Download corrected CSV" → POST /api/esic/export-csv 200. Toast notification appeared: "Validated 2 rows — 1 ready, 1 warning, 0 errors". Documentation accordion expanded to show full 40-field map grouped by page.
  - Found + fixed 2 real responsive bugs on mobile (390x844):
    1. Horizontal overflow (body 2258px wide): root cause was shadcn Textarea's field-sizing:content class growing the textarea to fit the long single-line placeholder. Fixed by shortening the placeholder to a one-line hint.
    2. Residual 17px overflow from stepper: flex children lacked min-w-0 so "Validate & Review" text couldn't shrink. Added min-w-0 to <li> and inner <div>.
  - After fixes: body width = 390 = viewport width, no horizontal scroll. Full mobile flow re-verified (upload → validate → export).
  - Sticky footer verified both ways: tall viewport (1400px, content < viewport) → footer sticks to bottom exactly (gap=0); short viewport (577px, content > viewport) → footer pushed down naturally, no overlap.
  - Final lint: zero errors, zero warnings.

Stage Summary:
- Complete ESIC IP bulk-registration helper tool built and verified end-to-end.
- 4 lib files (masters, field-map, validate, csv), 4 API routes, 8 UI components, 1 page.
- Key finding from source analysis: NO captcha on any of the 4 registration pages (entry/main/bank/nominee) — captcha only at login. This makes unattended bulk runs feasible after one manual login.
- The validator catches real issues in the user's original sample CSV: missing PresentState/PresentDistrict/AccountType columns, missing BankDocPath (warning), and correctly translates all labels to portal codes.
- The queue.json export contains everything the local Playwright runner needs: normalized field values with codes already translated, field-map documentation embedded in the lib, and per-field PostBack/interlock notes.
- The runner script itself (Playwright, runs on the user's machine) is the next step — not built here because it must execute where the ESIC login session + per-employee bank documents live.
