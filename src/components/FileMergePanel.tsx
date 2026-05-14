import { useMemo, useState, type ChangeEvent } from "react";
import { sampleFiles } from "../config/sampleFiles";
import { parseCsv } from "../core/input/csvInputAdapter";
import { mergeTables, type MergeSource } from "../core/merge/mergeTables";
import { tableToCsv } from "../core/output/csvOutputAdapter";
import { sampleOrdersComparisonCsv, sampleOrdersCsv } from "../core/samples/sampleOrders";
import type { TableParseResult } from "../core/table/types";
import { downloadBlob } from "../utils/downloadBlob";
import { DataPreview } from "./DataPreview";

interface FileMergePanelProps {
  parseFile: (file: File) => Promise<TableParseResult>;
}

export function FileMergePanel({ parseFile }: FileMergePanelProps) {
  const initialSources = useMemo(loadMergeSample, []);
  const [sources, setSources] = useState<MergeSource[]>(initialSources);
  const [message, setMessage] = useState("샘플 주문 파일 2개를 세로로 병합합니다.");
  const mergeResult = useMemo(() => mergeTables(sources), [sources]);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const parsedFiles = await Promise.all(files.map(async (file) => ({ file, parsed: await parseFile(file) })));
    const failedFile = parsedFiles.find(({ parsed }) => parsed.issues.some((issue) => issue.severity === "error"));
    if (failedFile) {
      setMessage(`${failedFile.file.name} 파일을 읽지 못했습니다.`);
      return;
    }

    const nextSources = parsedFiles.map(({ file, parsed }) => ({
      name: file.name,
      table: parsed.table,
    }));

    setSources(nextSources);
    setMessage(`${nextSources.length}개 파일을 병합합니다.`);
  }

  function resetSample() {
    setSources(loadMergeSample());
    setMessage("샘플 주문 파일 2개를 세로로 병합합니다.");
  }

  function downloadMergedCsv() {
    downloadBlob(tableToCsv(mergeResult.table), "merged-data.csv", "text/csv;charset=utf-8");
  }

  return (
    <section className="panel-grid">
      <aside className="panel controls-panel">
        <div className="panel-heading">
          <span>Merge</span>
          <strong>{sources.length.toString().padStart(2, "0")}</strong>
        </div>

        <label className="file-drop">
          <span>병합할 파일</span>
          <strong>여러 파일 선택</strong>
          <small>{sources.map((source) => source.name).join(", ")}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" multiple onChange={(event) => void handleUpload(event)} />
        </label>

        <div className="sample-links comparison-sample-links" aria-label="Sample merge CSV downloads">
          <a className="sample-link" href={sampleFiles.mergeBase.href} download>
            {sampleFiles.mergeBase.label}
          </a>
          <a className="sample-link" href={sampleFiles.mergeExtra.href} download>
            {sampleFiles.mergeExtra.label}
          </a>
        </div>

        <div className="button-row">
          <button className="primary-button" type="button" onClick={downloadMergedCsv} disabled={sources.length === 0}>
            병합 CSV 받기
          </button>
          <button className="ghost-button" type="button" onClick={resetSample}>
            샘플 병합
          </button>
        </div>
        <p className="control-note">{message}</p>
      </aside>

      <section className="comparison-summary merge-summary">
        <div className="metric-panel">
          <span>Files</span>
          <strong>{mergeResult.summary.sourceFiles}</strong>
        </div>
        <div className="metric-panel">
          <span>Rows</span>
          <strong>{mergeResult.summary.mergedRows}</strong>
        </div>
        <div className="metric-panel">
          <span>Columns</span>
          <strong>{mergeResult.summary.mergedColumns}</strong>
        </div>
      </section>

      <DataPreview table={mergeResult.table} />
    </section>
  );
}

function loadMergeSample(): MergeSource[] {
  return [
    {
      name: "샘플 주문 파일 A",
      table: parseCsv(sampleOrdersCsv).table,
    },
    {
      name: "샘플 주문 파일 B",
      table: parseCsv(sampleOrdersComparisonCsv).table,
    },
  ];
}
