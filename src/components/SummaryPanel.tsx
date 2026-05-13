import type { SummaryGroup } from "../core/table/types";

interface SummaryPanelProps {
  groups: SummaryGroup[];
}

export function SummaryPanel({ groups }: SummaryPanelProps) {
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
              <span>{group.blankCellCount} blank cells</span>
            </div>
            <b>{group.rowCount}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
