import { useMemo, useState } from "react";
import { ColumnMapperPanel } from "../components/ColumnMapperPanel";
import { DataPreview } from "../components/DataPreview";
import { FileComparisonPanel } from "../components/FileComparisonPanel";
import { FileMergePanel } from "../components/FileMergePanel";
import { InquiryPanel } from "../components/InquiryPanel";
import { IssuePanel } from "../components/IssuePanel";
import { ReportGeneratorPanel } from "../components/ReportGeneratorPanel";
import { ResultSummary } from "../components/ResultSummary";
import { SummaryPanel } from "../components/SummaryPanel";
import { VendorCheckInPanel } from "../components/VendorCheckInPanel";
import { WorkflowControls } from "../components/WorkflowControls";
import { parseCsv } from "../core/input/csvInputAdapter";
import { parseXlsxFile } from "../core/input/excelInputAdapter";
import { defaultOrderMappingTargets } from "../core/map/orderMappingTargets";
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
import { downloadBlob } from "../utils/downloadBlob";

export type ToolMode = "cleanup" | "compare" | "merge" | "report" | "map" | "checkin";
export type AppLocale = "ko" | "en";

const appCopy: Record<
  AppLocale,
  {
    eyebrow: string;
    titleSuffix: string;
    sampleSourceName: string;
    modeSuffix: string;
    nav: Record<ToolMode, string>;
    tools: Record<ToolMode, { title: string; lede: string; statusLabel: string; defaultStatusValue: number }>;
  }
> = {
  ko: {
    eyebrow: "무료 엑셀/CSV 도구",
    titleSuffix: "도구",
    sampleSourceName: "샘플 주문 데이터",
    modeSuffix: "모드",
    nav: {
      cleanup: "정리 도구",
      compare: "비교 도구",
      merge: "병합 도구",
      report: "정산서 도구",
      map: "양식 변환",
      checkin: "QR 체크인",
    },
    tools: {
      cleanup: {
        title: "엑셀/CSV 자동 정리",
        lede: "주문, 정산, 재고처럼 반복해서 손보던 표 데이터를 검사하고 정리한 뒤 바로 CSV로 내려받을 수 있습니다.",
        statusLabel: "rows",
        defaultStatusValue: 0,
      },
      compare: {
        title: "엑셀/CSV 파일 비교",
        lede: "두 파일을 같은 키 기준으로 비교해서 추가, 삭제, 변경된 행을 확인하고 결과 CSV로 내려받을 수 있습니다.",
        statusLabel: "files",
        defaultStatusValue: 2,
      },
      merge: {
        title: "엑셀/CSV 파일 병합",
        lede: "여러 CSV/XLSX 파일을 같은 열 구조로 맞춰 세로로 합치고 원본 파일명을 포함한 결과 CSV로 내려받을 수 있습니다.",
        statusLabel: "files",
        defaultStatusValue: 2,
      },
      report: {
        title: "견적서/정산서 자동 생성",
        lede: "주문 파일에서 고객, 품목, 금액 열을 골라 그룹별 정산서를 만들고 CSV 또는 HTML로 내려받을 수 있습니다.",
        statusLabel: "report",
        defaultStatusValue: 1,
      },
      map: {
        title: "엑셀 열 매핑 양식 변환",
        lede: "제각각인 주문 파일 열을 표준 주문 양식으로 맞추고 결과 CSV를 내려받을 수 있습니다.",
        statusLabel: "columns",
        defaultStatusValue: defaultOrderMappingTargets.length,
      },
      checkin: {
        title: "QR 벤더 체크인",
        lede: "현장 QR 링크, 모바일 입력 폼, Google Sheets 로그, 이메일 알림까지 이어지는 소규모 업무 자동화 샘플입니다.",
        statusLabel: "properties",
        defaultStatusValue: 4,
      },
    },
  },
  en: {
    eyebrow: "Free Excel/CSV tool",
    titleSuffix: "tool",
    sampleSourceName: "Sample order data",
    modeSuffix: "mode",
    nav: {
      cleanup: "Cleanup",
      compare: "Compare",
      merge: "Merge",
      report: "Reports",
      map: "Column mapping",
      checkin: "QR check-in",
    },
    tools: {
      cleanup: {
        title: "Excel/CSV auto cleanup",
        lede: "Check and clean recurring order, settlement, and inventory spreadsheets, then download the result as CSV.",
        statusLabel: "rows",
        defaultStatusValue: 0,
      },
      compare: {
        title: "Excel/CSV file comparison",
        lede: "Compare two files by a matching key, review added, removed, and changed rows, then export the result.",
        statusLabel: "files",
        defaultStatusValue: 2,
      },
      merge: {
        title: "Excel/CSV file merge",
        lede: "Combine multiple CSV/XLSX files into one aligned table with the source filename included in the output.",
        statusLabel: "files",
        defaultStatusValue: 2,
      },
      report: {
        title: "Estimate and settlement report generator",
        lede: "Pick customer, item, and amount columns from an order file to create grouped settlement reports.",
        statusLabel: "report",
        defaultStatusValue: 1,
      },
      map: {
        title: "Excel column mapping template",
        lede: "Map inconsistent order-file columns into a standard order template and download the normalized CSV.",
        statusLabel: "columns",
        defaultStatusValue: defaultOrderMappingTargets.length,
      },
      checkin: {
        title: "QR vendor check-in",
        lede: "A portfolio-ready workflow with property-specific QR links, a mobile check-in form, Google Sheets logging, and email notifications.",
        statusLabel: "properties",
        defaultStatusValue: 4,
      },
    },
  },
};

function loadInitialTable(): { table: DataTable; issues: DataIssue[] } {
  const parsed = parseCsv(sampleOrdersCsv);
  return {
    table: parsed.table,
    issues: [...parsed.issues, ...scanDataQuality(parsed.table)],
  };
}

export function App() {
  const initial = useMemo(loadInitialTable, []);
  const locale = selectInitialLocale(typeof window === "undefined" ? "" : window.location.search);
  const copy = appCopy[locale];
  const [toolMode, setToolMode] = useState<ToolMode>(() =>
    selectInitialToolMode(typeof window === "undefined" ? "" : window.location.search),
  );
  const currentToolCopy = copy.tools[toolMode];
  const [sourceName, setSourceName] = useState(copy.sampleSourceName);
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
  const statusValue = toolMode === "cleanup" ? currentTable.rows.length : currentToolCopy.defaultStatusValue;

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
    setSourceName(copy.sampleSourceName);
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
    downloadBlob(tableToCsv(currentTable), "cleaned-data.csv", "text/csv;charset=utf-8");
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {currentToolCopy.title}{" "}
            <span className="title-keep">{copy.titleSuffix}</span>
          </h1>
          <p className="lede">{currentToolCopy.lede}</p>
        </div>
        <div className="status-strip" aria-label="Current data status">
          <span>{toolMode === "cleanup" ? sourceName : `${currentToolCopy.title} ${copy.modeSuffix}`}</span>
          <strong>{statusValue}</strong>
          <span>{currentToolCopy.statusLabel}</span>
        </div>
      </section>

      <section className="tool-switcher" aria-label="Tool mode">
        <button
          className={toolMode === "cleanup" ? "active" : ""}
          type="button"
          onClick={() => setToolMode("cleanup")}
        >
          {copy.nav.cleanup}
        </button>
        <button
          className={toolMode === "compare" ? "active" : ""}
          type="button"
          onClick={() => setToolMode("compare")}
        >
          {copy.nav.compare}
        </button>
        <button
          className={toolMode === "merge" ? "active" : ""}
          type="button"
          onClick={() => setToolMode("merge")}
        >
          {copy.nav.merge}
        </button>
        <button
          className={toolMode === "report" ? "active" : ""}
          type="button"
          onClick={() => setToolMode("report")}
        >
          {copy.nav.report}
        </button>
        <button
          className={toolMode === "map" ? "active" : ""}
          type="button"
          onClick={() => setToolMode("map")}
        >
          {copy.nav.map}
        </button>
        <button
          className={toolMode === "checkin" ? "active" : ""}
          type="button"
          onClick={() => setToolMode("checkin")}
        >
          {copy.nav.checkin}
        </button>
      </section>

      {toolMode === "cleanup" ? (
        <>
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

          <ResultSummary locale={locale} metrics={runMetrics} />

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
              locale={locale}
            />
            <DataPreview table={currentTable} />
            <IssuePanel issues={issues} diagnostics={diagnostics} locale={locale} />
            <SummaryPanel groups={summaryGroups} locale={locale} />
          </section>
        </>
      ) : toolMode === "compare" ? (
        <FileComparisonPanel parseFile={parseUploadedFile} locale={locale} />
      ) : toolMode === "merge" ? (
        <FileMergePanel parseFile={parseUploadedFile} locale={locale} />
      ) : toolMode === "report" ? (
        <ReportGeneratorPanel parseFile={parseUploadedFile} locale={locale} />
      ) : toolMode === "map" ? (
        <ColumnMapperPanel parseFile={parseUploadedFile} locale={locale} />
      ) : (
        <VendorCheckInPanel locale={locale} />
      )}

      <InquiryPanel locale={locale} />
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

export function selectInitialToolMode(search: string): ToolMode {
  const requested = new URLSearchParams(search).get("tool");
  if (
    requested === "cleanup" ||
    requested === "compare" ||
    requested === "merge" ||
    requested === "report" ||
    requested === "map" ||
    requested === "checkin"
  ) {
    return requested;
  }
  return "cleanup";
}

export function selectInitialLocale(search: string): AppLocale {
  const requested = new URLSearchParams(search).get("lang");
  return requested === "en" ? "en" : "ko";
}
