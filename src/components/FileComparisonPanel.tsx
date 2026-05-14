import { useMemo, useState, type ChangeEvent } from "react";
import type { AppLocale } from "../app/App";
import { sampleFiles } from "../config/sampleFiles";
import { compareTables, comparisonToTable } from "../core/compare/compareTables";
import { parseCsv } from "../core/input/csvInputAdapter";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import { sampleOrdersComparisonCsv, sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { DataTable, TableParseResult } from "../core/table/types";
import { downloadBlob } from "../utils/downloadBlob";
import { DataPreview } from "./DataPreview";

interface FileComparisonPanelProps {
  parseFile: (file: File) => Promise<TableParseResult>;
  preferredKeyColumns?: string[];
  locale?: AppLocale;
}

interface ComparisonSource {
  name: string;
  table: DataTable;
}

const defaultPreferredKeyColumns = ["order_id", "id", "sku", "invoice_id", "상품코드", "주문번호", "거래번호"];

export function FileComparisonPanel({
  locale = "ko",
  parseFile,
  preferredKeyColumns = defaultPreferredKeyColumns,
}: FileComparisonPanelProps) {
  const text = locale === "en" ? enCopy : koCopy;
  const initial = useMemo(() => loadComparisonSample(locale), [locale]);
  const [baseSource, setBaseSource] = useState<ComparisonSource>(initial.baseSource);
  const [compareSource, setCompareSource] = useState<ComparisonSource>(initial.compareSource);
  const [keyColumn, setKeyColumn] = useState(initial.keyColumn);
  const [message, setMessage] = useState(text.initialMessage);

  const keyColumns = useMemo(
    () => findSharedColumns(baseSource.table, compareSource.table),
    [baseSource.table, compareSource.table],
  );
  const effectiveKeyColumn = keyColumns.find((column) => column.key === keyColumn)?.key ?? keyColumns[0]?.key ?? "";
  const comparison = useMemo(
    () => (effectiveKeyColumn ? compareTables(baseSource.table, compareSource.table, effectiveKeyColumn) : null),
    [baseSource.table, compareSource.table, effectiveKeyColumn],
  );
  const resultTable = useMemo(
    () => (comparison ? comparisonToTable(comparison) : { columns: [], rows: [] }),
    [comparison],
  );

  async function handleUpload(side: "base" | "compare", event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const parsed = await parseFile(file);
    if (parsed.issues.some((issue) => issue.severity === "error")) {
      setMessage(text.fileReadFailed(file.name));
      return;
    }

    const nextBase = side === "base" ? { name: file.name, table: parsed.table } : baseSource;
    const nextCompare = side === "compare" ? { name: file.name, table: parsed.table } : compareSource;
    const nextKeyColumn = selectDefaultComparisonKey(
      nextBase.table,
      nextCompare.table,
      keyColumn,
      preferredKeyColumns,
    );

    if (side === "base") {
      setBaseSource(nextBase);
    } else {
      setCompareSource(nextCompare);
    }
    setKeyColumn(nextKeyColumn);
    setMessage(text.compareMessage(nextBase.name, nextCompare.name));
  }

  function resetSample() {
    const next = loadComparisonSample(locale);
    setBaseSource(next.baseSource);
    setCompareSource(next.compareSource);
    setKeyColumn(next.keyColumn);
    setMessage(text.initialMessage);
  }

  function downloadComparisonCsv() {
    downloadBlob(tableToCsv(resultTable), "comparison-result.csv", "text/csv;charset=utf-8");
  }

  return (
    <section className="panel-grid">
      <aside className="panel controls-panel">
        <div className="panel-heading">
          <span>Compare</span>
          <strong>02</strong>
        </div>

        <label className="file-drop">
          <span>{text.baseFile}</span>
          <strong>{text.chooseFile}</strong>
          <small>{baseSource.name}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload("base", event)} />
        </label>

        <label className="file-drop comparison-file-drop">
          <span>{text.compareFile}</span>
          <strong>{text.chooseFile}</strong>
          <small>{compareSource.name}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload("compare", event)} />
        </label>
        <div className="sample-links comparison-sample-links" aria-label="Sample comparison CSV downloads">
          <a className="sample-link" href={sampleFiles.comparisonBase.href} download>
            {text.sampleA}
          </a>
          <a className="sample-link" href={sampleFiles.comparisonTarget.href} download>
            {text.sampleB}
          </a>
        </div>

        <label className="field-label">
          {text.keyColumn}
          <select value={effectiveKeyColumn} onChange={(event) => setKeyColumn(event.target.value)}>
            {keyColumns.map((column) => (
              <option key={column.key} value={column.key}>
                {column.label}
              </option>
            ))}
          </select>
        </label>

        <div className="button-row">
          <button className="primary-button" type="button" onClick={downloadComparisonCsv} disabled={!comparison}>
            {text.download}
          </button>
          <button className="ghost-button" type="button" onClick={resetSample}>
            {text.reset}
          </button>
        </div>
        <p className="control-note">{message}</p>
      </aside>

      <section className="comparison-summary">
        <div className="metric-panel">
          <span>Added</span>
          <strong>{comparison?.summary.addedRows ?? 0}</strong>
        </div>
        <div className="metric-panel">
          <span>Removed</span>
          <strong>{comparison?.summary.removedRows ?? 0}</strong>
        </div>
        <div className="metric-panel">
          <span>Changed</span>
          <strong>{comparison?.summary.changedRows ?? 0}</strong>
        </div>
        <div className="metric-panel">
          <span>Same</span>
          <strong>{comparison?.summary.unchangedRows ?? 0}</strong>
        </div>
      </section>

      <DataPreview table={resultTable} />
    </section>
  );
}

function loadComparisonSample(locale: AppLocale) {
  const text = locale === "en" ? enCopy : koCopy;
  const baseSource = {
    name: text.sampleSourceA,
    table: parseCsv(sampleOrdersCsv).table,
  };
  const compareSource = {
    name: text.sampleSourceB,
    table: parseCsv(sampleOrdersComparisonCsv).table,
  };

  return {
    baseSource,
    compareSource,
    keyColumn: selectDefaultComparisonKey(baseSource.table, compareSource.table),
  };
}

const koCopy = {
  initialMessage: "샘플 주문 파일 2개를 order_id 기준으로 비교합니다.",
  baseFile: "기준 파일 A",
  compareFile: "비교 파일 B",
  chooseFile: "파일 선택",
  sampleA: "파일 A 샘플",
  sampleB: "파일 B 샘플",
  sampleSourceA: "샘플 주문 파일 A",
  sampleSourceB: "샘플 주문 파일 B",
  keyColumn: "매칭 기준 열",
  download: "결과 CSV 받기",
  reset: "샘플 비교",
  fileReadFailed: (name: string) => `${name} 파일을 읽지 못했습니다.`,
  compareMessage: (base: string, target: string) => `${base} 파일과 ${target} 파일을 비교합니다.`,
};

const enCopy = {
  initialMessage: "Compare two sample order files by order_id.",
  baseFile: "Base file A",
  compareFile: "Compare file B",
  chooseFile: "Choose file",
  sampleA: "Sample file A",
  sampleB: "Sample file B",
  sampleSourceA: "Sample order file A",
  sampleSourceB: "Sample order file B",
  keyColumn: "Matching key column",
  download: "Download result CSV",
  reset: "Sample comparison",
  fileReadFailed: (name: string) => `Could not read ${name}.`,
  compareMessage: (base: string, target: string) => `Comparing ${base} with ${target}.`,
};

function findSharedColumns(baseTable: DataTable, compareTable: DataTable) {
  const compareKeys = new Set(compareTable.columns.map((column) => column.key));
  return baseTable.columns.filter((column) => compareKeys.has(column.key));
}

function selectDefaultComparisonKey(
  baseTable: DataTable,
  compareTable: DataTable,
  currentKey = "",
  preferredKeyColumns = defaultPreferredKeyColumns,
): string {
  const sharedColumns = findSharedColumns(baseTable, compareTable);
  const preferred = preferredKeyColumns.map((key) => key.toLowerCase());

  return (
    sharedColumns.find((column) => column.key === currentKey)?.key ??
    sharedColumns.find((column) => preferred.includes(column.key.toLowerCase()))?.key ??
    sharedColumns[0]?.key ??
    ""
  );
}
