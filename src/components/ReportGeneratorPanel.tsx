import { useMemo, useState, type ChangeEvent } from "react";
import type { AppLocale } from "../app/App";
import { parseCsv } from "../core/input/csvInputAdapter";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import { createSettlementReport, settlementReportToHtml } from "../core/report/settlementReport";
import { sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { DataTable, TableParseResult } from "../core/table/types";
import { downloadBlob } from "../utils/downloadBlob";
import { DataPreview } from "./DataPreview";

interface ReportGeneratorPanelProps {
  parseFile: (file: File) => Promise<TableParseResult>;
  locale?: AppLocale;
}

export function ReportGeneratorPanel({ locale = "ko", parseFile }: ReportGeneratorPanelProps) {
  const text = locale === "en" ? enCopy : koCopy;
  const initialTable = useMemo(() => parseCsv(sampleOrdersCsv).table, []);
  const [sourceName, setSourceName] = useState(text.sampleSource);
  const [table, setTable] = useState(initialTable);
  const [message, setMessage] = useState(text.initialMessage);
  const [reportTitle, setReportTitle] = useState(text.reportTitle);
  const [groupColumnKey, setGroupColumnKey] = useState(selectColumn(initialTable, ["customer_name", "customer", "고객명"]));
  const [itemColumnKey, setItemColumnKey] = useState(selectColumn(initialTable, ["product", "item", "상품명"]));
  const [amountColumnKey, setAmountColumnKey] = useState(selectColumn(initialTable, ["amount", "total", "price", "금액"]));

  const report = useMemo(
    () =>
      createSettlementReport(table, {
        groupColumnKey,
        itemColumnKey,
        amountColumnKey,
      }, locale),
    [amountColumnKey, groupColumnKey, itemColumnKey, locale, table],
  );

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const parsed = await parseFile(file);
    if (parsed.issues.some((issue) => issue.severity === "error")) {
      setMessage(text.fileReadFailed(file.name));
      return;
    }

    setSourceName(file.name);
    setTable(parsed.table);
    setGroupColumnKey(selectColumn(parsed.table, ["customer_name", "customer", "고객명", "거래처"]));
    setItemColumnKey(selectColumn(parsed.table, ["product", "item", "상품명", "품목"]));
    setAmountColumnKey(selectColumn(parsed.table, ["amount", "total", "price", "금액", "합계"]));
    setMessage(text.reportMessage(file.name));
  }

  function resetSample() {
    const sample = parseCsv(sampleOrdersCsv).table;
    setSourceName(text.sampleSource);
    setTable(sample);
    setReportTitle(text.reportTitle);
    setGroupColumnKey(selectColumn(sample, ["customer_name", "customer", "고객명"]));
    setItemColumnKey(selectColumn(sample, ["product", "item", "상품명"]));
    setAmountColumnKey(selectColumn(sample, ["amount", "total", "price", "금액"]));
    setMessage(text.initialMessage);
  }

  function downloadReportCsv() {
    downloadBlob(tableToCsv(report.table), "settlement-report.csv", "text/csv;charset=utf-8");
  }

  function downloadReportHtml() {
    downloadBlob(settlementReportToHtml(report, reportTitle, locale), "settlement-report.html", "text/html;charset=utf-8");
  }

  return (
    <section className="panel-grid">
      <aside className="panel controls-panel">
        <div className="panel-heading">
          <span>Report</span>
          <strong>{report.summary.groupCount.toString().padStart(2, "0")}</strong>
        </div>

        <label className="file-drop">
          <span>{text.uploadTitle}</span>
          <strong>{text.chooseFile}</strong>
          <small>{sourceName}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload(event)} />
        </label>

        <label className="field-label report-title-field">
          {text.titleLabel}
          <input value={reportTitle} onChange={(event) => setReportTitle(event.target.value)} />
        </label>

        <div className="control-stack">
          <ColumnSelect label={text.groupColumn} value={groupColumnKey} table={table} onChange={setGroupColumnKey} />
          <ColumnSelect label={text.itemColumn} value={itemColumnKey} table={table} onChange={setItemColumnKey} />
          <ColumnSelect label={text.amountColumn} value={amountColumnKey} table={table} onChange={setAmountColumnKey} />
        </div>

        <div className="button-row">
          <button className="primary-button" type="button" onClick={downloadReportCsv}>
            {text.downloadCsv}
          </button>
          <button className="ghost-button" type="button" onClick={downloadReportHtml}>
            {text.downloadHtml}
          </button>
        </div>
        <button className="text-button" type="button" onClick={resetSample}>
          {text.reset}
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
          <span>{text.totalAmount}</span>
          <strong>{formatCurrency(report.summary.totalAmount, locale)}</strong>
        </div>
        <div className="metric-panel">
          <span>{text.amountErrors}</span>
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

function formatCurrency(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "ko-KR", { maximumFractionDigits: 0 }).format(value);
}

const koCopy = {
  sampleSource: "샘플 주문 데이터",
  initialMessage: "샘플 주문 데이터로 고객별 정산서를 생성합니다.",
  reportTitle: "고객별 정산서 샘플",
  uploadTitle: "정산서 자동 생성",
  chooseFile: "파일 선택",
  titleLabel: "정산서 제목",
  groupColumn: "그룹 기준 열",
  itemColumn: "품목 열",
  amountColumn: "금액 열",
  downloadCsv: "정산 CSV 받기",
  downloadHtml: "정산 HTML 받기",
  reset: "샘플 정산서로 되돌리기",
  totalAmount: "총 금액",
  amountErrors: "금액 오류",
  fileReadFailed: (name: string) => `${name} 파일을 읽지 못했습니다.`,
  reportMessage: (name: string) => `${name} 파일로 정산서를 생성합니다.`,
};

const enCopy = {
  sampleSource: "Sample order data",
  initialMessage: "Create a customer settlement report from the sample order data.",
  reportTitle: "Customer settlement sample",
  uploadTitle: "Generate settlement report",
  chooseFile: "Choose file",
  titleLabel: "Report title",
  groupColumn: "Group column",
  itemColumn: "Item column",
  amountColumn: "Amount column",
  downloadCsv: "Download report CSV",
  downloadHtml: "Download report HTML",
  reset: "Reset sample report",
  totalAmount: "Total amount",
  amountErrors: "Amount errors",
  fileReadFailed: (name: string) => `Could not read ${name}.`,
  reportMessage: (name: string) => `Creating a settlement report from ${name}.`,
};
