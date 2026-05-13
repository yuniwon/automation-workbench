import type { CellValue, DataTable } from "../table/types";

export function tableToCsv(table: DataTable): string {
  const header = table.columns.map((column) => escapeCell(column.label)).join(",");
  const rows = table.rows.map((row) =>
    table.columns.map((column) => escapeCell(row.cells[column.key])).join(","),
  );

  return [header, ...rows].join("\r\n");
}

function escapeCell(value: CellValue): string {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}
