// ESIC IP Bulk Registration Helper — static web tool (client-side only).
// All validation/export runs in the browser; the extension zip is built
// on the fly from the latest files in the GitHub repo.
import {
  parseCSV,
  validateRows,
  summarize,
  buildQueue,
  toCSV,
  templateCSV,
  CSV_COLUMNS,
} from "./lib.bundle.js";

const $ = (id) => document.getElementById(id);
const REPO = "rcstrue/esicip";
const RAW = `https://raw.githubusercontent.com/${REPO}/main/extension`;
const EXTENSION_FILES = [
  "manifest.json",
  "popup.html",
  "popup.js",
  "lib.bundle.js",
  "content.js",
  "dialog-patch.js",
  "background.js",
  "icon.png",
  "README.md",
];

let validated = null; // { headers, rows, validated, summary, missingColumns, unknownColumns }

// ─── helpers ────────────────────────────────────────────────────────
function toast(msg, kind = "info") {
  const t = $("toast");
  t.textContent = msg;
  t.className = "toast toast-" + kind + " show";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (t.hidden = true), 3500);
}
function triggerDownload(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function statusBadge(status) {
  const map = {
    ready: ["ready", "Ready"],
    warning: ["warning", "Warning"],
    error: ["error", "Error"],
  };
  const [cls, label] = map[status] || ["info", status];
  return `<span class="sb sb-${cls}">${label}</span>`;
}

// ─── validate ────────────────────────────────────────────────────────
function runValidation(csvText) {
  $("upload-error").hidden = true;
  $("upload-loading").hidden = false;
  $("upload-loading").textContent = "Validating…";
  try {
    const { headers, rows } = parseCSV(csvText);
    if (rows.length === 0) throw new Error("CSV has no data rows");
    const expected = new Set(CSV_COLUMNS);
    const present = new Set(headers);
    const missingColumns = CSV_COLUMNS.filter((c) => !present.has(c));
    const unknownColumns = headers.filter((h) => !expected.has(h));
    const validated = validateRows(rows);
    const summary = summarize(validated);
    validated = { headers, rows, validated, summary, missingColumns, unknownColumns };
    $("upload-loading").hidden = true;
    $("step-review").classList.remove("hidden");
    $("step-export").classList.remove("hidden");
    renderSummary(summary);
    renderResults(validated, "all");
    toast(`Validated ${summary.total} row(s) — ${summary.ready} ready, ${summary.warning} warning, ${summary.error} error`, "success");
    $("step-review").scrollIntoView({ behavior: "smooth" });
  } catch (e) {
    $("upload-loading").hidden = true;
    const el = $("upload-error");
    el.hidden = false;
    el.textContent = "Validation failed: " + e.message;
    toast("Validation failed", "error");
  }
}

function renderSummary(s) {
  const cards = [
    { label: "Total", value: s.total, cls: "info" },
    { label: "Ready", value: s.ready, cls: "ready" },
    { label: "Warnings", value: s.warning, cls: "warning" },
    { label: "Errors", value: s.error, cls: "error" },
  ];
  $("summary-grid").innerHTML = cards
    .map(
      (c) =>
        `<div class="sum-card sum-${c.cls}"><div class="sum-num">${c.value}</div><div class="sum-label">${c.label}</div></div>`
    )
    .join("");
  const filters = [
    { key: "all", label: "All", count: s.total },
    { key: "ready", label: "Ready", count: s.ready },
    { key: "warning", label: "Warnings", count: s.warning },
    { key: "error", label: "Errors", count: s.error },
  ];
  $("filters").innerHTML = filters
    .map(
      (f) =>
        `<button class="chip" data-filter="${f.key}">${f.label} <span class="chip-count">${f.count}</span></button>`
    )
    .join("");
  $("filters").querySelectorAll(".chip").forEach((c) =>
    c.addEventListener("click", () => {
      $("filters").querySelectorAll(".chip").forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      renderResults(validated, c.dataset.filter);
    })
  );
  $("filters").querySelector(".chip").classList.add("active");
}

function renderResults(v, filter) {
  const rows = v.validated.filter((r) => filter === "all" || r.status === filter);
  if (rows.length === 0) {
    $("results-body").innerHTML = `<tr><td colspan="4" class="empty">No rows in this filter.</td></tr>`;
    return;
  }
  $("results-body").innerHTML = rows
    .map((r, i) => {
      const name = r.normalized.EmpName || "—";
      const issues = r.issues.length
        ? r.issues
            .map(
              (is) =>
                `<li class="is is-${is.severity}"><span class="is-sev">${is.severity}</span> <code>${is.column}</code>: ${is.message}</li>`
            )
            .join("")
        : `<li class="is is-ok">No issues — ready to export.</li>`;
      return `<tr class="row" data-idx="${i}">
        <td>${r.rowIndex}</td>
        <td class="name">${name}</td>
        <td>${statusBadge(r.status)}</td>
        <td><ul class="issues">${issues}</ul></td>
      </tr>`;
    })
    .join("");
}

// ─── export ──────────────────────────────────────────────────────────
function downloadTemplate() {
  triggerDownload("esic-ip-template.csv", templateCSV(), "text/csv");
  toast("Template downloaded", "success");
}
function downloadQueue() {
  if (!validated) return;
  const est = $("est-code").value.trim() || null;
  const queue = buildQueue(validated.validated, est);
  triggerDownload("esic-queue.json", JSON.stringify(queue, null, 2), "application/json");
  toast(`queue.json exported — ${queue.count} item(s)`, "success");
}
function downloadCsv() {
  if (!validated) return;
  const csv = toCSV(validated.validated.map((r) => r.normalized), CSV_COLUMNS);
  triggerDownload("esic-corrected.csv", csv, "text/csv");
  toast("Corrected CSV downloaded", "success");
}

async function downloadExtension() {
  if (typeof JSZip === "undefined") {
    toast("jszip still loading — retry in a moment", "error");
    return;
  }
  const st = $("ext-status");
  st.textContent = "Fetching latest files from GitHub…";
  const zip = new JSZip();
  let version = "unknown";
  let ok = 0;
  for (const file of EXTENSION_FILES) {
    try {
      const res = await fetch(`${RAW}/${file}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (file === "manifest.json") {
        const m = await res.clone().json();
        version = m.version || version;
        zip.file(file, await res.text());
      } else if (file.endsWith(".png")) {
        zip.file(file, await res.arrayBuffer());
      } else {
        zip.file(file, await res.text());
      }
      ok++;
    } catch (e) {
      console.warn(`[ESIC] skip ${file}:`, e.message);
    }
  }
  if (ok === 0) {
    st.textContent = "";
    toast("Could not fetch the extension from GitHub. Check your connection.", "error");
    return;
  }
  st.textContent = "Zipping…";
  const buf = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
  const url = URL.createObjectURL(buf);
  const a = document.createElement("a");
  a.href = url;
  a.download = `esic-extension-v${version}.zip`;
  a.click();
  URL.revokeObjectURL(url);
  st.textContent = `✓ v${version} (${ok} files)`;
  toast(`Extension v${version} downloaded (${ok} files)`, "success");
}

// ─── file handling ───────────────────────────────────────────────────
function readFile(file) {
  const reader = new FileReader();
  reader.onload = () => runValidation(String(reader.result || ""));
  reader.onerror = () => toast("Could not read file", "error");
  reader.readAsText(file);
}

// ─── wire up ──────────────────────────────────────────────────────────
function init() {
  const dz = $("dropzone");
  const fi = $("file-input");
  dz.addEventListener("click", () => fi.click());
  dz.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fi.click();
    }
  });
  fi.addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (f) readFile(f);
  });
  ["dragenter", "dragover"].forEach((ev) =>
    dz.addEventListener(ev, (e) => {
      e.preventDefault();
      dz.classList.add("drag");
    })
  );
  ["dragleave", "drop"].forEach((ev) =>
    dz.addEventListener(ev, (e) => {
      e.preventDefault();
      dz.classList.remove("drag");
    })
  );
  dz.addEventListener("drop", (e) => {
    const f = e.dataTransfer.files[0];
    if (f) readFile(f);
  });
  $("paste-btn").addEventListener("click", () => {
    const t = $("paste-area").value.trim();
    if (t) runValidation(t);
  });
  $("template-btn").addEventListener("click", downloadTemplate);
  $("dl-queue").addEventListener("click", downloadQueue);
  $("dl-csv").addEventListener("click", downloadCsv);
  $("dl-extension").addEventListener("click", downloadExtension);
  $("est-reset").addEventListener("click", () => ($("est-code").value = "39000547790001019"));
}
init();
