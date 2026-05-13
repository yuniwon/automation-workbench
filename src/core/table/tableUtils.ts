import type { CellValue, DataTable, TableColumn } from "./types";

export function toColumnKey(label: string, index: number): string {
  const normalized = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/gi, "_")
    .replace(/^_+|_+$/g, "");

  return normalized || `column_${index + 1}`;
}

export function createRowId(index: number): string {
  return `row_${index + 1}`;
}

export function cloneTable(table: DataTable): DataTable {
  return {
    columns: table.columns.map((column) => ({ ...column })),
    rows: table.rows.map((row) => ({
      id: row.id,
      cells: { ...row.cells },
    })),
  };
}

export function createUniqueColumns(headers: string[]): TableColumn[] {
  const used = new Map<string, number>();

  return headers.map((header, index) => {
    const baseKey = toColumnKey(header, index);
    const count = used.get(baseKey) ?? 0;
    used.set(baseKey, count + 1);
    const key = count === 0 ? baseKey : `${baseKey}_${count + 1}`;

    return {
      key,
      label: header.trim() || `Column ${index + 1}`,
      sourceLabel: header,
    };
  });
}

export function rowSignature(table: DataTable, cells: Record<string, CellValue>): string {
  return JSON.stringify(table.columns.map((column) => [column.key, cells[column.key] ?? null]));
}

export function isBlank(value: CellValue): boolean {
  return value === null || (typeof value === "string" && value.trim() === "");
}
