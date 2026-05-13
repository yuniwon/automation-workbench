import type { RunMetrics } from "../core/table/types";

interface ResultSummaryProps {
  metrics: RunMetrics | null;
}

export function ResultSummary({ metrics }: ResultSummaryProps) {
  if (!metrics) {
    return null;
  }

  return (
    <section className="result-summary" aria-label="Cleanup result summary">
      <div>
        <span>정리 결과</span>
        <strong>
          {metrics.rowsBefore}행 → {metrics.rowsAfter}행
        </strong>
      </div>
      <div>
        <span>중복 제거</span>
        <strong>{metrics.removedDuplicateRows}</strong>
      </div>
      <div>
        <span>공백 정리</span>
        <strong>{metrics.trimmedCells}</strong>
      </div>
      <div>
        <span>숫자 정리</span>
        <strong>{metrics.normalizedNumberCells}</strong>
      </div>
    </section>
  );
}
