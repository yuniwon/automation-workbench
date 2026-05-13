import type { ChangeEvent } from "react";
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
}

const optionLabels: Record<keyof CleanupOptions, string> = {
  trimText: "앞뒤 공백 정리",
  normalizeHeaders: "열 이름 표준화",
  normalizeNumbers: "금액/숫자 형식 정리",
  removeDuplicateRows: "완전 중복 행 제거",
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
}: WorkflowControlsProps) {
  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
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
        <span>CSV/XLSX 업로드</span>
        <strong>파일 선택</strong>
        <small>헤더가 있는 CSV 또는 XLSX 파일을 불러옵니다.</small>
        <input type="file" accept=".csv,.xlsx,text/csv" onChange={handleFile} />
      </label>

      <div className="control-stack">
        {(Object.keys(options) as Array<keyof CleanupOptions>).map((key) => (
          <label className="check-row" key={key}>
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => toggleOption(key)}
            />
            <span>{optionLabels[key]}</span>
          </label>
        ))}
      </div>

      <label className="field-label">
        집계 기준 열
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
          정리 실행
        </button>
        <button className="ghost-button" type="button" onClick={onDownload}>
          CSV 받기
        </button>
      </div>
      <button className="text-button" type="button" onClick={onResetSample}>
        샘플 데이터로 되돌리기
      </button>
    </aside>
  );
}
