import { createRowId } from "../table/tableUtils";
import type { CellValue, DataTable, TableColumn, TableRow } from "../table/types";
import type {
  ComparisonExportCellSet,
  ComparisonRow,
  ComparisonSummary,
  ComparisonRowStatus,
  TableComparisonResult,
} from "./compareTypes";

export function compareTables(
  baseTable: DataTable,
  compareTable: DataTable,
  keyColumn: string,
): TableComparisonResult {
  const comparableColumns = findComparableColumns(baseTable, compareTable, keyColumn);
  const baseIndex = indexRowsByKey(baseTable.rows, keyColumn);
  const compareIndex = indexRowsByKey(compareTable.rows, keyColumn);
  const summary: ComparisonSummary = {
    addedRows: 0,
    removedRows: 0,
    changedRows: 0,
    unchangedRows: 0,
    duplicateBaseKeys: baseIndex.duplicateKeys.length,
    duplicateCompareKeys: compareIndex.duplicateKeys.length,
  };
  const rows: ComparisonRow[] = [];
  const handledKeys = new Set<string>();

  for (const key of baseIndex.orderedKeys) {
    if (baseIndex.duplicateKeys.includes(key)) {
      rows.push(createComparisonRow("duplicate_base", key, [], baseIndex.rowsByKey.get(key)?.[0]));
      continue;
    }
    if (compareIndex.duplicateKeys.includes(key)) {
      continue;
    }

    const baseRow = baseIndex.rowsByKey.get(key)?.[0];
    const compareRow = compareIndex.rowsByKey.get(key)?.[0];
    if (!baseRow) {
      continue;
    }

    handledKeys.add(key);

    if (!compareRow) {
      summary.removedRows += 1;
      rows.push(createComparisonRow("removed", key, [], baseRow));
      continue;
    }

    const changedColumns = comparableColumns.filter(
      (columnKey) => normalizeCell(baseRow.cells[columnKey]) !== normalizeCell(compareRow.cells[columnKey]),
    );
    if (changedColumns.length > 0) {
      summary.changedRows += 1;
      rows.push(createComparisonRow("changed", key, changedColumns, baseRow, compareRow));
    } else {
      summary.unchangedRows += 1;
      rows.push(createComparisonRow("unchanged", key, [], baseRow, compareRow));
    }
  }

  for (const key of compareIndex.orderedKeys) {
    if (compareIndex.duplicateKeys.includes(key)) {
      rows.push(createComparisonRow("duplicate_compare", key, [], undefined, compareIndex.rowsByKey.get(key)?.[0]));
      continue;
    }
    if (baseIndex.duplicateKeys.includes(key) || handledKeys.has(key)) {
      continue;
    }

    const compareRow = compareIndex.rowsByKey.get(key)?.[0];
    if (!compareRow) {
      continue;
    }

    summary.addedRows += 1;
    rows.push(createComparisonRow("added", key, [], undefined, compareRow));
  }

  return {
    keyColumn,
    baseTable,
    compareTable,
    comparableColumns,
    rows,
    summary,
  };
}

export function comparisonToTable(result: TableComparisonResult): DataTable {
  const columns = createExportColumns(result);
  const rows = result.rows.map((row, index) => ({
    id: createRowId(index),
    cells: createExportCells(row, result.comparableColumns),
  }));

  return { columns, rows };
}

function findComparableColumns(
  baseTable: DataTable,
  compareTable: DataTable,
  keyColumn: string,
): string[] {
  const compareKeys = new Set(compareTable.columns.map((column) => column.key));
  return baseTable.columns
    .map((column) => column.key)
    .filter((columnKey) => columnKey !== keyColumn && compareKeys.has(columnKey));
}

function indexRowsByKey(rows: TableRow[], keyColumn: string) {
  const rowsByKey = new Map<string, TableRow[]>();
  const orderedKeys: string[] = [];

  rows.forEach((row) => {
    const key = normalizeCell(row.cells[keyColumn]);
    if (!rowsByKey.has(key)) {
      rowsByKey.set(key, []);
      orderedKeys.push(key);
    }
    rowsByKey.get(key)?.push(row);
  });

  return {
    rowsByKey,
    orderedKeys,
    duplicateKeys: orderedKeys.filter((key) => (rowsByKey.get(key)?.length ?? 0) > 1),
  };
}

function createComparisonRow(
  status: ComparisonRowStatus,
  key: string,
  changedColumns: string[],
  baseRow?: TableRow,
  compareRow?: TableRow,
): ComparisonRow {
  return {
    id: `${status}-${key}`,
    key,
    status,
    changedColumns,
    baseRow,
    compareRow,
  };
}

function createExportColumns(result: TableComparisonResult): TableColumn[] {
  const baseColumns: TableColumn[] = result.comparableColumns.map((columnKey) => ({
    key: `base_${columnKey}`,
    label: `Base ${labelForColumn(result.baseTable, columnKey)}`,
    sourceLabel: `Base ${labelForColumn(result.baseTable, columnKey)}`,
  }));
  const compareColumns: TableColumn[] = result.comparableColumns.map((columnKey) => ({
    key: `compare_${columnKey}`,
    label: `Compare ${labelForColumn(result.compareTable, columnKey)}`,
    sourceLabel: `Compare ${labelForColumn(result.compareTable, columnKey)}`,
  }));

  return [
    { key: "status", label: "Status", sourceLabel: "Status" },
    { key: "key", label: "Key", sourceLabel: "Key" },
    { key: "changed_columns", label: "Changed Columns", sourceLabel: "Changed Columns" },
    ...baseColumns,
    ...compareColumns,
  ];
}

function createExportCells(
  row: ComparisonRow,
  comparableColumns: string[],
): ComparisonExportCellSet {
  const cells: ComparisonExportCellSet = {
    status: row.status,
    key: row.key,
    changed_columns: row.changedColumns.join(", "),
  };

  comparableColumns.forEach((columnKey) => {
    cells[`base_${columnKey}`] = row.baseRow?.cells[columnKey] ?? null;
    cells[`compare_${columnKey}`] = row.compareRow?.cells[columnKey] ?? null;
  });

  return cells;
}

function labelForColumn(table: DataTable, columnKey: string): string {
  return table.columns.find((column) => column.key === columnKey)?.label ?? columnKey;
}

function normalizeCell(value: CellValue): string {
  return String(value ?? "").trim();
}
