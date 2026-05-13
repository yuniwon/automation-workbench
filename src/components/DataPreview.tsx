import type { DataTable } from "../core/table/types";

interface DataPreviewProps {
  table: DataTable;
}

export function DataPreview({ table }: DataPreviewProps) {
  const visibleRows = table.rows.slice(0, 50);

  return (
    <section className="panel data-panel">
      <div className="panel-heading">
        <span>Preview</span>
        <strong>{table.rows.length} rows</strong>
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
