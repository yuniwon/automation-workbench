import { useMemo, useState, type ChangeEvent } from "react";
import { sampleFiles } from "../config/sampleFiles";
import { compareTables, comparisonToTable } from "../core/compare/compareTables";
import { parseCsv } from "../core/input/csvInputAdapter";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import { sampleOrdersComparisonCsv, sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { DataTable, TableParseResult } from "../core/table/types";
import { DataPreview } from "./DataPreview";

interface FileComparisonPanelProps {
  parseFile: (file: File) => Promise<TableParseResult>;
  preferredKeyColumns?: string[];
}

interface ComparisonSource {
  name: string;
  table: DataTable;
}

const defaultPreferredKeyColumns = ["order_id", "id", "sku", "invoice_id", "상품코드", "주문번호", "거래번호"];

export function FileComparisonPanel({
  parseFile,
  preferredKeyColumns = defaultPreferredKeyColumns,
}: FileComparisonPanelProps) {
  const initial = useMemo(loadComparisonSample, []);
  const [baseSource, setBaseSource] = useState<ComparisonSource>(initial.baseSource);
  const [compareSource, setCompareSource] = useState<ComparisonSource>(initial.compareSource);
  const [keyColumn, setKeyColumn] = useState(initial.keyColumn);
  const [message, setMessage] = useState("샘플 주문 파일 2개를 order_id 기준으로 비교합니다.");

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
      setMessage(`${file.name} 파일을 읽지 못했습니다.`);
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
    setMessage(`${nextBase.name} 파일과 ${nextCompare.name} 파일을 비교합니다.`);
  }

  function resetSample() {
    const next = loadComparisonSample();
    setBaseSource(next.baseSource);
    setCompareSource(next.compareSource);
    setKeyColumn(next.keyColumn);
    setMessage("샘플 주문 파일 2개를 order_id 기준으로 비교합니다.");
  }

  function downloadComparisonCsv() {
    const csv = tableToCsv(resultTable);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "comparison-result.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="comparison-grid">
      <aside className="panel controls-panel">
        <div className="panel-heading">
          <span>Compare</span>
          <strong>02</strong>
        </div>

        <label className="file-drop">
          <span>기준 파일 A</span>
          <strong>파일 선택</strong>
          <small>{baseSource.name}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload("base", event)} />
        </label>

        <label className="file-drop comparison-file-drop">
          <span>비교 파일 B</span>
          <strong>파일 선택</strong>
          <small>{compareSource.name}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload("compare", event)} />
        </label>
        <div className="sample-links comparison-sample-links" aria-label="Sample comparison CSV downloads">
          <a className="sample-link" href={sampleFiles.comparisonBase.href} download>
            {sampleFiles.comparisonBase.label}
          </a>
          <a className="sample-link" href={sampleFiles.comparisonTarget.href} download>
            {sampleFiles.comparisonTarget.label}
          </a>
        </div>

        <label className="field-label">
          매칭 기준 열
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
            결과 CSV 받기
          </button>
          <button className="ghost-button" type="button" onClick={resetSample}>
            샘플 비교
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

function loadComparisonSample() {
  const baseSource = {
    name: "샘플 주문 파일 A",
    table: parseCsv(sampleOrdersCsv).table,
  };
  const compareSource = {
    name: "샘플 주문 파일 B",
    table: parseCsv(sampleOrdersComparisonCsv).table,
  };

  return {
    baseSource,
    compareSource,
    keyColumn: selectDefaultComparisonKey(baseSource.table, compareSource.table),
  };
}

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
