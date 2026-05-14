import { useMemo, useState, type ChangeEvent } from "react";
import type { AppLocale } from "../app/App";
import { mapTableColumns, suggestColumnMappings, type ColumnMappingTarget } from "../core/map/mapTableColumns";
import { defaultOrderMappingTargets } from "../core/map/orderMappingTargets";
import { parseCsv } from "../core/input/csvInputAdapter";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import { sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { DataTable, TableParseResult } from "../core/table/types";
import { downloadBlob } from "../utils/downloadBlob";
import { DataPreview } from "./DataPreview";

interface ColumnMapperPanelProps {
  parseFile: (file: File) => Promise<TableParseResult>;
  targetFields?: ColumnMappingTarget[];
  outputFilename?: string;
  locale?: AppLocale;
}

export function ColumnMapperPanel({
  locale = "ko",
  outputFilename = "mapped-order-template.csv",
  parseFile,
  targetFields = defaultOrderMappingTargets,
}: ColumnMapperPanelProps) {
  const text = locale === "en" ? enCopy : koCopy;
  const initialTable = useMemo(() => parseCsv(sampleOrdersCsv).table, []);
  const [sourceName, setSourceName] = useState(text.sampleSource);
  const [table, setTable] = useState(initialTable);
  const [message, setMessage] = useState(text.initialMessage);
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
      setMessage(text.fileReadFailed(file.name));
      return;
    }

    setSourceName(file.name);
    setTable(parsed.table);
    setMappings(suggestColumnMappings(parsed.table, targetFields));
    setMessage(text.mapMessage(file.name));
  }

  function resetSample() {
    const sample = parseCsv(sampleOrdersCsv).table;
    setSourceName(text.sampleSource);
    setTable(sample);
    setMappings(suggestColumnMappings(sample, targetFields));
    setMessage(text.initialMessage);
  }

  function updateMapping(targetKey: string, sourceColumnKey: string) {
    setMappings((current) => ({
      ...current,
      [targetKey]: sourceColumnKey,
    }));
  }

  function downloadMappedCsv() {
    downloadBlob(tableToCsv(result.table), outputFilename, "text/csv;charset=utf-8");
  }

  return (
    <section className="panel-grid">
      <aside className="panel controls-panel">
        <div className="panel-heading">
          <span>Mapping</span>
          <strong>{result.summary.mappedColumns.toString().padStart(2, "0")}</strong>
        </div>

        <label className="file-drop">
          <span>{text.uploadTitle}</span>
          <strong>{text.chooseFile}</strong>
          <small>{sourceName}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" onChange={(event) => void handleUpload(event)} />
        </label>

        <div className="control-stack">
          {targetFields.map((target) => (
            <MappingSelect
              key={target.key}
              label={target.label}
              emptyLabel={text.notMapped}
              table={table}
              value={mappings[target.key] ?? ""}
              onChange={(sourceColumnKey) => updateMapping(target.key, sourceColumnKey)}
            />
          ))}
        </div>

        <div className="button-row">
          <button className="primary-button" type="button" onClick={downloadMappedCsv}>
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

      <DataPreview table={result.table} locale={locale} />
    </section>
  );
}

interface MappingSelectProps {
  emptyLabel: string;
  label: string;
  table: DataTable;
  value: string;
  onChange: (value: string) => void;
}

function MappingSelect({ emptyLabel, label, onChange, table, value }: MappingSelectProps) {
  return (
    <label className="field-label">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{emptyLabel}</option>
        {table.columns.map((column) => (
          <option key={column.key} value={column.key}>
            {column.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const koCopy = {
  sampleSource: "샘플 주문 데이터",
  initialMessage: "샘플 주문 데이터를 표준 주문 양식으로 변환합니다.",
  uploadTitle: "양식 변환",
  chooseFile: "파일 선택",
  notMapped: "매핑 안 함",
  download: "표준 양식 CSV 받기",
  reset: "샘플 양식",
  fileReadFailed: (name: string) => `${name} 파일을 읽지 못했습니다.`,
  mapMessage: (name: string) => `${name} 파일을 표준 주문 양식으로 변환합니다.`,
};

const enCopy = {
  sampleSource: "Sample order data",
  initialMessage: "Map the sample order data into a standard order template.",
  uploadTitle: "Column mapping",
  chooseFile: "Choose file",
  notMapped: "Not mapped",
  download: "Download mapped CSV",
  reset: "Sample template",
  fileReadFailed: (name: string) => `Could not read ${name}.`,
  mapMessage: (name: string) => `Mapping ${name} into the standard order template.`,
};
