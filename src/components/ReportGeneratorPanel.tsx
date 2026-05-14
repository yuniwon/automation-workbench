import { useMemo, useState, type ChangeEvent } from "react";
import { parseCsv } from "../core/input/csvInputAdapter";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import { createSettlementReport, settlementReportToHtml } from "../core/report/settlementReport";
import { sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { DataTable, TableParseResult } from "../core/table/types";
import { downloadBlob } from "../utils/downloadBlob";
import { DataPreview } from "./DataPreview";

interface ReportGeneratorPanelProps {
  parseFile: (file: File) => Promise<TableParseResult>;
}

export function ReportGeneratorPanel({ parseFile }: ReportGeneratorPanelProps) {
  const initialTable = useMemo(() => parseCsv(sampleOrdersCsv).table, []);
  const [sourceName, setSourceName] = useState("샘플 주문 데이터");
  const [table, setTable] = useState(initialTable);
  const [message, setMessage] = useState("샘플 주문 데이터로 고객별 정산서를 생성합니다.");
  const [reportTitle, setReportTitle] = useState("고객별 정산서 샘플");
  const [groupColumnKey, setGroupColumnKey] = useState(selectColumn(initialTable, ["customer_name", "customer", "고객명"]));
  const [itemColumnKey, setItemColumnKey] = useState(selectColumn(initialTable, ["product", "item", "상품명"]));
  const [amountColumnKey, setAmountColumnKey] = useState(selectColumn(initialTable, ["amount", "total", "price", "금액"]));

  const report = useMemo(
    () =>
      createSettlementReport(table, {
        groupColumnKey,
        itemColumnKey,
        amountColumnKey,
      }),
    [amountColumnKey, groupColumnKey, itemColumnKey, table],
  );

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const parsed = await parseFile(file);
    if (parsed.issues.some((issue) => issue.severity === "error")) {
      setMessage(`${file.name} 파일을 읽지 못했습니다.`);
      return;
    }

    setSourceName(file.name);
    setTable(parsed.table);
    setGroupColumnKey(selectColumn(parsed.table, ["customer_name", "customer", "고객명", "거래처"]));
    setItemColumnKey(selectColumn(parsed.table, ["product", "item", "상품명", "품목"]));
    setAmountColumnKey(selectColumn(parsed.table, ["amount", "total", "price", "금액", "합계"]));
    setMessage(`${file.name} 파일로 정산서를 생성합니다.`);
  }

  function resetSample() {
    const sample = parseCsv(sampleOrdersCsv).table;
    setSourceName("샘플 주문 데이터");
    setTable(sample);
    setReportTitle("고객별 정산서 샘플");
    setGroupColumnKey(selectColumn(sample, ["customer_name", "customer", "고객명"]));
    setItemColumnKey(selectColumn(sample, ["product", "item", "상품명"]));
    setAmountColumnKey(selectColumn(sample, ["amount", "total", "price", "금액"]));
    setMessage("샘플 주문 데이터로 고객별 정산서를 생성합니다.");
  }

  function downloadReportCsv() {
    downloadBlob(tableToCsv(report.table), "settlement-report.csv", "text/csv;charset=utf-8");
  }

  function downloadReportHtml() {
    downloadBlob(settlementReportToHtml(report, reportTitle), "settlement-report.html", "text/html;charset=utf-8");
  }

  return (
    <section className="panel-grid">
      <aside className="panel controls-panel">
        <div className="panel-heading">
          <span>Report</span>
          <strong>{report.summary.groupCount.toString().padStart(2, "0")}</strong>
        </div>

        <label className="file-drop">
          <span>정산서 자동 생성</span>
          <strong>파일 선택</strong>
          <small>{sourceName}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload(event)} />
        </label>

        <label className="field-label report-title-field">
          정산서 제목
          <input value={reportTitle} onChange={(event) => setReportTitle(event.target.value)} />
        </label>

        <div className="control-stack">
          <ColumnSelect label="그룹 기준 열" value={groupColumnKey} table={table} onChange={setGroupColumnKey} />
          <ColumnSelect label="품목 열" value={itemColumnKey} table={table} onChange={setItemColumnKey} />
          <ColumnSelect label="금액 열" value={amountColumnKey} table={table} onChange={setAmountColumnKey} />
        </div>

        <div className="button-row">
          <button className="primary-button" type="button" onClick={downloadReportCsv}>
            정산 CSV 받기
          </button>
          <button className="ghost-button" type="button" onClick={downloadReportHtml}>
            정산 HTML 받기
          </button>
        </div>
        <button className="text-button" type="button" onClick={resetSample}>
          샘플 정산서로 되돌리기
        </button>
        <p className="control-note">{message}</p>
      </aside>

      <section className="comparison-summary report-summary">
        <div className="metric-panel">
          <span>Groups</span>
          <strong>{report.summary.groupCount}</strong>
        </div>
        <div className="metric-panel">
          <span>Rows</span>
          <strong>{report.summary.rowCount}</strong>
        </div>
        <div className="metric-panel">
          <span>총 금액</span>
          <strong>{formatCurrency(report.summary.totalAmount)}</strong>
        </div>
        <div className="metric-panel">
          <span>금액 오류</span>
          <strong>{report.summary.invalidAmountRows}</strong>
        </div>
      </section>

      <DataPreview table={report.table} />
    </section>
  );
}

interface ColumnSelectProps {
  label: string;
  value: string;
  table: DataTable;
  onChange: (value: string) => void;
}

function ColumnSelect({ label, onChange, table, value }: ColumnSelectProps) {
  return (
    <label className="field-label">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {table.columns.map((column) => (
          <option key={column.key} value={column.key}>
            {column.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function selectColumn(table: DataTable, preferredKeys: string[]): string {
  const normalized = preferredKeys.map((key) => key.toLowerCase());
  return (
    table.columns.find((column) => normalized.includes(column.key.toLowerCase()))?.key ??
    table.columns[0]?.key ??
    ""
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(value);
}
