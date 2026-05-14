import { useMemo, useState, type ChangeEvent } from "react";
import type { AppLocale } from "../app/App";
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
  locale?: AppLocale;
}

export function FileMergePanel({ locale = "ko", parseFile }: FileMergePanelProps) {
  const text = locale === "en" ? enCopy : koCopy;
  const initialSources = useMemo(() => loadMergeSample(locale), [locale]);
  const [sources, setSources] = useState<MergeSource[]>(initialSources);
  const [message, setMessage] = useState(text.initialMessage);
  const mergeResult = useMemo(() => mergeTables(sources), [sources]);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const parsedFiles = await Promise.all(files.map(async (file) => ({ file, parsed: await parseFile(file) })));
    const failedFile = parsedFiles.find(({ parsed }) => parsed.issues.some((issue) => issue.severity === "error"));
    if (failedFile) {
      setMessage(text.fileReadFailed(failedFile.file.name));
      return;
    }

    const nextSources = parsedFiles.map(({ file, parsed }) => ({
      name: file.name,
      table: parsed.table,
    }));

    setSources(nextSources);
    setMessage(text.mergeMessage(nextSources.length));
  }

  function resetSample() {
    setSources(loadMergeSample(locale));
    setMessage(text.initialMessage);
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
          <span>{text.filesToMerge}</span>
          <strong>{text.chooseFiles}</strong>
          <small>{sources.map((source) => source.name).join(", ")}</small>
          <input type="file" accept=".csv,.xlsx,text/csv" multiple onChange={(event) => void handleUpload(event)} />
        </label>

        <div className="sample-links comparison-sample-links" aria-label="Sample merge CSV downloads">
          <a className="sample-link" href={sampleFiles.mergeBase.href} download>
            {text.sampleA}
          </a>
          <a className="sample-link" href={sampleFiles.mergeExtra.href} download>
            {text.sampleB}
          </a>
        </div>

        <div className="button-row">
          <button className="primary-button" type="button" onClick={downloadMergedCsv} disabled={sources.length === 0}>
            {text.download}
          </button>
          <button className="ghost-button" type="button" onClick={resetSample}>
            {text.reset}
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

      <DataPreview table={mergeResult.table} locale={locale} />
    </section>
  );
}

function loadMergeSample(locale: AppLocale): MergeSource[] {
  const text = locale === "en" ? enCopy : koCopy;
  return [
    {
      name: text.sampleSourceA,
      table: parseCsv(sampleOrdersCsv).table,
    },
    {
      name: text.sampleSourceB,
      table: parseCsv(sampleOrdersComparisonCsv).table,
    },
  ];
}

const koCopy = {
  initialMessage: "샘플 주문 파일 2개를 세로로 병합합니다.",
  filesToMerge: "병합할 파일",
  chooseFiles: "여러 파일 선택",
  sampleA: "병합 샘플 A",
  sampleB: "병합 샘플 B",
  sampleSourceA: "샘플 주문 파일 A",
  sampleSourceB: "샘플 주문 파일 B",
  download: "병합 CSV 받기",
  reset: "샘플 병합",
  fileReadFailed: (name: string) => `${name} 파일을 읽지 못했습니다.`,
  mergeMessage: (count: number) => `${count}개 파일을 병합합니다.`,
};

const enCopy = {
  initialMessage: "Merge two sample order files vertically.",
  filesToMerge: "Files to merge",
  chooseFiles: "Choose files",
  sampleA: "Merge sample A",
  sampleB: "Merge sample B",
  sampleSourceA: "Sample order file A",
  sampleSourceB: "Sample order file B",
  download: "Download merged CSV",
  reset: "Sample merge",
  fileReadFailed: (name: string) => `Could not read ${name}.`,
  mergeMessage: (count: number) => `Merging ${count} files.`,
};
