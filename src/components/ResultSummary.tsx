import type { AppLocale } from "../app/App";
import type { RunMetrics } from "../core/table/types";

interface ResultSummaryProps {
  metrics: RunMetrics | null;
  locale?: AppLocale;
}

export function ResultSummary({ locale = "ko", metrics }: ResultSummaryProps) {
  if (!metrics) {
    return null;
  }
  const labels =
    locale === "en"
      ? {
          result: "Cleanup result",
          rows: `${metrics.rowsBefore} rows -> ${metrics.rowsAfter} rows`,
          duplicates: "Duplicates removed",
          whitespace: "Cells trimmed",
          numbers: "Numbers cleaned",
        }
      : {
          result: "정리 결과",
          rows: `${metrics.rowsBefore}행 → ${metrics.rowsAfter}행`,
          duplicates: "중복 제거",
          whitespace: "공백 정리",
          numbers: "숫자 정리",
        };

  return (
    <section className="result-summary" aria-label="Cleanup result summary">
      <div>
        <span>{labels.result}</span>
        <strong>{labels.rows}</strong>
      </div>
      <div>
        <span>{labels.duplicates}</span>
        <strong>{metrics.removedDuplicateRows}</strong>
      </div>
      <div>
        <span>{labels.whitespace}</span>
        <strong>{metrics.trimmedCells}</strong>
      </div>
      <div>
        <span>{labels.numbers}</span>
        <strong>{metrics.normalizedNumberCells}</strong>
      </div>
    </section>
  );
}
