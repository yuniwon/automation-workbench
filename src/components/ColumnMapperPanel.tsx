import { useMemo, useState, type ChangeEvent } from "react";
import { mapTableColumns, suggestColumnMappings, type ColumnMappingTarget } from "../core/map/mapTableColumns";
import { parseCsv } from "../core/input/csvInputAdapter";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import { sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { DataTable, TableParseResult } from "../core/table/types";
import { DataPreview } from "./DataPreview";

interface ColumnMapperPanelProps {
  parseFile: (file: File) => Promise<TableParseResult>;
}

const targetFields: ColumnMappingTarget[] = [
  { key: "order_id", label: "주문번호", aliases: ["order id", "order_id", "주문 번호"], required: true },
  { key: "customer_name", label: "고객명", aliases: ["customer", "buyer", "name", "고객"], required: true },
  { key: "product_name", label: "상품명", aliases: ["product", "item", "상품", "품목"], required: true },
  { key: "amount", label: "금액", aliases: ["amount", "price", "total", "total price", "합계"], required: true },
  { key: "status", label: "주문상태", aliases: ["status", "state", "상태"] },
  { key: "channel", label: "판매채널", aliases: ["channel", "store", "platform", "채널"], defaultValue: "온라인" },
];

export function ColumnMapperPanel({ parseFile }: ColumnMapperPanelProps) {
  const initialTable = useMemo(() => parseCsv(sampleOrdersCsv).table, []);
  const [sourceName, setSourceName] = useState("샘플 주문 데이터");
  const [table, setTable] = useState(initialTable);
  const [message, setMessage] = useState("샘플 주문 데이터를 표준 주문 양식으로 변환합니다.");
  const [mappings, setMappings] = useState<Record<string, string>>(() =>
    suggestColumnMappings(initialTable, targetFields),
  );

  const mappedTargets = useMemo(
    () =>
      targetFields.map((target) => ({
        ...target,
        sourceColumnKey: mappings[target.key] ?? "",
      })),
    [mappings],
  );
  const result = useMemo(() => mapTableColumns(table, mappedTargets), [mappedTargets, table]);

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
    setMappings(suggestColumnMappings(parsed.table, targetFields));
    setMessage(`${file.name} 파일을 표준 주문 양식으로 변환합니다.`);
  }

  function resetSample() {
    const sample = parseCsv(sampleOrdersCsv).table;
    setSourceName("샘플 주문 데이터");
    setTable(sample);
    setMappings(suggestColumnMappings(sample, targetFields));
    setMessage("샘플 주문 데이터를 표준 주문 양식으로 변환합니다.");
  }

  function updateMapping(targetKey: string, sourceColumnKey: string) {
    setMappings((current) => ({
      ...current,
      [targetKey]: sourceColumnKey,
    }));
  }

  function downloadMappedCsv() {
    const csv = tableToCsv(result.table);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mapped-order-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="comparison-grid">
      <aside className="panel controls-panel">
        <div className="panel-heading">
          <span>Mapping</span>
          <strong>{result.summary.mappedColumns.toString().padStart(2, "0")}</strong>
        </div>

        <label className="file-drop">
          <span>양식 변환</span>
          <strong>파일 선택</strong>
          <small>{sourceName}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload(event)} />
        </label>

        <div className="control-stack">
          {targetFields.map((target) => (
            <MappingSelect
              key={target.key}
              label={target.label}
              table={table}
              value={mappings[target.key] ?? ""}
              onChange={(sourceColumnKey) => updateMapping(target.key, sourceColumnKey)}
            />
          ))}
        </div>

        <div className="button-row">
          <button className="primary-button" type="button" onClick={downloadMappedCsv}>
            표준 양식 CSV 받기
          </button>
          <button className="ghost-button" type="button" onClick={resetSample}>
            샘플 양식
          </button>
        </div>
        <p className="control-note">{message}</p>
      </aside>

      <section className="comparison-summary">
        <div className="metric-panel">
          <span>Mapped</span>
          <strong>{result.summary.mappedColumns}</strong>
        </div>
        <div className="metric-panel">
          <span>Defaults</span>
          <strong>{result.summary.defaultedColumns}</strong>
        </div>
        <div className="metric-panel">
          <span>Missing</span>
          <strong>{result.summary.missingRequiredColumns.length}</strong>
        </div>
        <div className="metric-panel">
          <span>Rows</span>
          <strong>{result.summary.outputRows}</strong>
        </div>
      </section>

      <DataPreview table={result.table} />
    </section>
  );
}

interface MappingSelectProps {
  label: string;
  table: DataTable;
  value: string;
  onChange: (value: string) => void;
}

function MappingSelect({ label, onChange, table, value }: MappingSelectProps) {
  return (
    <label className="field-label">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">매핑 안 함</option>
        {table.columns.map((column) => (
          <option key={column.key} value={column.key}>
            {column.label}
          </option>
        ))}
      </select>
    </label>
  );
}
