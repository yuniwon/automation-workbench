import type { ChangeEvent } from "react";
import { sampleFiles } from "../config/sampleFiles";
import type { AppLocale } from "../app/App";
import type { CleanupOptions } from "../core/recipes/cleanupOptions";
import type { TableColumn } from "../core/table/types";

interface WorkflowControlsProps {
  columns: TableColumn[];
  options: CleanupOptions;
  groupColumnKey: string;
  onFileUpload: (file: File) => void | Promise<void>;
  onDownload: () => void;
  onGroupColumnChange: (key: string) => void;
  onOptionsChange: (options: CleanupOptions) => void;
  onResetSample: () => void;
  onRunCleanup: () => void;
  locale?: AppLocale;
}

const copy = {
  ko: {
    uploadTitle: "CSV/XLSX 업로드",
    fileButton: "파일 선택",
    uploadHelp: "헤더가 있는 CSV 또는 XLSX 파일을 불러옵니다.",
    sampleLabel: "정리 샘플 CSV",
    groupColumn: "집계 기준 열",
    run: "정리 실행",
    download: "CSV 받기",
    reset: "샘플 데이터로 되돌리기",
    optionLabels: {
      trimText: "앞뒤 공백 정리",
      normalizeHeaders: "열 이름 표준화",
      normalizeNumbers: "금액/숫자 형식 정리",
      removeDuplicateRows: "완전 중복 행 제거",
    },
  },
  en: {
    uploadTitle: "Upload CSV/XLSX",
    fileButton: "Choose file",
    uploadHelp: "Load a CSV or XLSX file with headers.",
    sampleLabel: "Download sample CSV",
    groupColumn: "Group by column",
    run: "Run cleanup",
    download: "Download CSV",
    reset: "Reset sample data",
    optionLabels: {
      trimText: "Trim whitespace",
      normalizeHeaders: "Normalize headers",
      normalizeNumbers: "Clean number formats",
      removeDuplicateRows: "Remove duplicate rows",
    },
  },
};

export function WorkflowControls({
  columns,
  options,
  groupColumnKey,
  onFileUpload,
  onDownload,
  onGroupColumnChange,
  onOptionsChange,
  onResetSample,
  onRunCleanup,
  locale = "ko",
}: WorkflowControlsProps) {
  const text = copy[locale];
  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    void onFileUpload(file);
  }

  function toggleOption(key: keyof CleanupOptions) {
    onOptionsChange({
      ...options,
      [key]: !options[key],
    });
  }

  return (
    <aside className="panel controls-panel">
      <div className="panel-heading">
        <span>Workflow</span>
        <strong>01</strong>
      </div>

      <label className="file-drop">
        <span>{text.uploadTitle}</span>
        <strong>{text.fileButton}</strong>
        <small>{text.uploadHelp}</small>
        <input type="file" accept=".csv,.xlsx,text/csv" onChange={handleFile} />
      </label>
      <div className="sample-links" aria-label="Sample CSV downloads">
        <a className="sample-link" href={sampleFiles.cleanup.href} download>
          {text.sampleLabel}
        </a>
      </div>

      <div className="control-stack">
        {(Object.keys(options) as Array<keyof CleanupOptions>).map((key) => (
          <label className="check-row" key={key}>
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => toggleOption(key)}
            />
            <span>{text.optionLabels[key]}</span>
          </label>
        ))}
      </div>

      <label className="field-label">
        {text.groupColumn}
        <select value={groupColumnKey} onChange={(event) => onGroupColumnChange(event.target.value)}>
          {columns.map((column) => (
            <option key={column.key} value={column.key}>
              {column.label}
            </option>
          ))}
        </select>
      </label>

      <div className="button-row">
        <button className="primary-button" type="button" onClick={onRunCleanup}>
          {text.run}
        </button>
        <button className="ghost-button" type="button" onClick={onDownload}>
          {text.download}
        </button>
      </div>
      <button className="text-button" type="button" onClick={onResetSample}>
        {text.reset}
      </button>
    </aside>
  );
}
