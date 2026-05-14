import type { AppLocale } from "../app/App";
import type { DataTable } from "../core/table/types";

interface DataPreviewProps {
  table: DataTable;
  locale?: AppLocale;
}

export function DataPreview({ locale = "ko", table }: DataPreviewProps) {
  const visibleRows = table.rows.slice(0, 50);
  const rowUnit = locale === "en" ? (table.rows.length === 1 ? "row" : "rows") : "행";
  const columnUnit = locale === "en" ? (table.columns.length === 1 ? "column" : "columns") : "열";
  const countLabel =
    locale === "en"
      ? `${table.rows.length} ${rowUnit} · ${table.columns.length} ${columnUnit}`
      : `${table.rows.length}${rowUnit} · ${table.columns.length}${columnUnit}`;

  return (
    <section className="panel data-panel">
      <div className="panel-heading data-panel-heading">
        <span>Data preview</span>
        <strong>{countLabel}</strong>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                {table.columns.map((column) => (
                  <td key={column.key}>{String(row.cells[column.key] ?? "")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
