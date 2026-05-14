import type { AppLocale } from "../app/App";
import type { SummaryGroup } from "../core/table/types";

interface SummaryPanelProps {
  groups: SummaryGroup[];
  locale?: AppLocale;
}

export function SummaryPanel({ groups, locale = "ko" }: SummaryPanelProps) {
  return (
    <section className="panel summary-panel">
      <div className="panel-heading">
        <span>Grouped Summary</span>
        <strong>{groups.length}</strong>
      </div>
      <div className="summary-list">
        {groups.map((group) => (
          <article className="summary-row" key={group.label}>
            <div>
              <strong>{group.label}</strong>
              <span>
                {group.blankCellCount} {locale === "en" ? "blank cells" : "빈 셀"}
              </span>
            </div>
            <b>{group.rowCount}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
