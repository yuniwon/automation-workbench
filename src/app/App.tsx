import { useMemo, useState } from "react";
import { DataPreview } from "../components/DataPreview";
import { InquiryPanel } from "../components/InquiryPanel";
import { IssuePanel } from "../components/IssuePanel";
import { ResultSummary } from "../components/ResultSummary";
import { SummaryPanel } from "../components/SummaryPanel";
import { WorkflowControls } from "../components/WorkflowControls";
import { parseCsv } from "../core/input/csvInputAdapter";
import { parseXlsxFile } from "../core/input/excelInputAdapter";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import {
  cleanupOptionsToSteps,
  defaultCleanupOptions,
  type CleanupOptions,
} from "../core/recipes/cleanupOptions";
import { scanDataQuality } from "../core/scan/scanDataQuality";
import { sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { AutomationRecipe, DataIssue, DataTable, RunMetrics } from "../core/table/types";
import { defaultRecipeEngine } from "../core/transform/stepRegistry";
import { createGroupedSummary } from "../core/transform/transforms";

function loadInitialTable(): { table: DataTable; issues: DataIssue[] } {
  const parsed = parseCsv(sampleOrdersCsv);
  return {
    table: parsed.table,
    issues: [...parsed.issues, ...scanDataQuality(parsed.table)],
  };
}

export function App() {
  const initial = useMemo(loadInitialTable, []);
  const [sourceName, setSourceName] = useState("샘플 주문 데이터");
  const [originalTable, setOriginalTable] = useState(initial.table);
  const [currentTable, setCurrentTable] = useState(initial.table);
  const [issues, setIssues] = useState(initial.issues);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [options, setOptions] = useState<CleanupOptions>(defaultCleanupOptions);
  const [groupColumnKey, setGroupColumnKey] = useState(selectDefaultGroupColumn(initial.table));
  const [runMetrics, setRunMetrics] = useState<RunMetrics | null>(null);

  const summaryGroups = useMemo(
    () => (groupColumnKey ? createGroupedSummary(currentTable, groupColumnKey) : []),
    [currentTable, groupColumnKey],
  );

  const issueCounts = useMemo(() => {
    return issues.reduce(
      (counts, issue) => {
        counts[issue.severity] += 1;
        return counts;
      },
      { info: 0, warning: 0, error: 0 },
    );
  }, [issues]);

  function resetToSample() {
    const parsed = parseCsv(sampleOrdersCsv);
    const nextIssues = [...parsed.issues, ...scanDataQuality(parsed.table)];
    setSourceName("샘플 주문 데이터");
    setOriginalTable(parsed.table);
    setCurrentTable(parsed.table);
    setIssues(nextIssues);
    setDiagnostics([]);
    setGroupColumnKey(selectDefaultGroupColumn(parsed.table));
    setRunMetrics(null);
  }

  async function handleFileUpload(file: File) {
    const parsed = await parseUploadedFile(file).catch((error: unknown) => ({
      table: { columns: [], rows: [] },
      issues: [
        {
          id: "file-parse-failed",
          severity: "error" as const,
          type: "file_parse_failed",
          message: error instanceof Error ? error.message : "The file could not be parsed.",
        },
      ],
    }));
    const nextIssues = [...parsed.issues, ...scanDataQuality(parsed.table)];
    setSourceName(file.name);
    setOriginalTable(parsed.table);
    setCurrentTable(parsed.table);
    setIssues(nextIssues);
    setDiagnostics([]);
    setGroupColumnKey(selectDefaultGroupColumn(parsed.table));
    setRunMetrics(null);
  }

  function runCleanup() {
    const recipe: AutomationRecipe = {
      id: "ui-selected-cleanup",
      name: "Selected Cleanup",
      input: { type: "csv" },
      steps: cleanupOptionsToSteps(options),
      output: { type: "csv", filename: "cleaned-data.csv" },
    };

    const result = defaultRecipeEngine.execute(recipe, originalTable);
    const scanIssues = scanDataQuality(result.table);
    setCurrentTable(result.table);
    setIssues([...result.issues, ...scanIssues]);
    setDiagnostics(result.diagnostics);
    setGroupColumnKey((previous) => result.table.columns.find((column) => column.key === previous)?.key ?? result.table.columns[0]?.key ?? "");
    setRunMetrics({
      rowsBefore: originalTable.rows.length,
      rowsAfter: result.table.rows.length,
      trimmedCells: result.metrics.trimmedCells ?? 0,
      normalizedNumberCells: result.metrics.normalizedNumberCells ?? 0,
      removedDuplicateRows: result.metrics.removedDuplicateRows ?? 0,
    });
  }

  function downloadCsv() {
    const csv = tableToCsv(currentTable);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cleaned-data.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">무료 엑셀/CSV 도구</p>
          <h1>
            엑셀/CSV 자동 정리 <span className="title-keep">도구</span>
          </h1>
          <p className="lede">
            주문, 정산, 재고처럼 반복해서 손보던 표 데이터를 검사하고 정리한 뒤
            바로 CSV로 내려받을 수 있습니다.
          </p>
        </div>
        <div className="status-strip" aria-label="Current data status">
          <span>{sourceName}</span>
          <strong>{currentTable.rows.length}</strong>
          <span>rows</span>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Data quality summary">
        <div className="metric-panel">
          <span>Columns</span>
          <strong>{currentTable.columns.length}</strong>
        </div>
        <div className="metric-panel">
          <span>Info</span>
          <strong>{issueCounts.info}</strong>
        </div>
        <div className="metric-panel">
          <span>Warnings</span>
          <strong>{issueCounts.warning}</strong>
        </div>
        <div className="metric-panel">
          <span>Errors</span>
          <strong>{issueCounts.error}</strong>
        </div>
      </section>

      <ResultSummary metrics={runMetrics} />

      <section className="workspace-grid">
        <WorkflowControls
          columns={currentTable.columns}
          options={options}
          groupColumnKey={groupColumnKey}
          onFileUpload={handleFileUpload}
          onDownload={downloadCsv}
          onGroupColumnChange={setGroupColumnKey}
          onOptionsChange={setOptions}
          onResetSample={resetToSample}
          onRunCleanup={runCleanup}
        />
        <DataPreview table={currentTable} />
        <IssuePanel issues={issues} diagnostics={diagnostics} />
        <SummaryPanel groups={summaryGroups} />
      </section>

      <InquiryPanel />
    </main>
  );
}

async function parseUploadedFile(file: File) {
  const lowerName = file.name.toLowerCase();
  if (lowerName.endsWith(".xlsx")) {
    return parseXlsxFile(file);
  }
  if (lowerName.endsWith(".csv") || file.type.includes("csv") || file.type === "text/plain") {
    return parseCsv(await file.text());
  }

  return {
    table: { columns: [], rows: [] },
    issues: [
      {
        id: "unsupported-file",
        severity: "error" as const,
        type: "unsupported_file",
        message: "CSV or XLSX files are supported.",
      },
    ],
  };
}

function selectDefaultGroupColumn(table: DataTable): string {
  const preferred = ["product", "status", "category", "type"];
  return (
    table.columns.find((column) => preferred.includes(column.key.toLowerCase()))?.key ??
    table.columns[0]?.key ??
    ""
  );
}
