import type { CellValue, DataTable, TableRow } from "../table/types";

export type ComparisonRowStatus =
  | "added"
  | "removed"
  | "changed"
  | "unchanged"
  | "duplicate_base"
  | "duplicate_compare";

export interface ComparisonRow {
  id: string;
  key: string;
  status: ComparisonRowStatus;
  changedColumns: string[];
  baseRow?: TableRow;
  compareRow?: TableRow;
}

export interface ComparisonSummary {
  addedRows: number;
  removedRows: number;
  changedRows: number;
  unchangedRows: number;
  duplicateBaseKeys: number;
  duplicateCompareKeys: number;
}

export interface TableComparisonResult {
  keyColumn: string;
  baseTable: DataTable;
  compareTable: DataTable;
  comparableColumns: string[];
  rows: ComparisonRow[];
  summary: ComparisonSummary;
}

export interface ComparisonExportCellSet {
  [columnKey: string]: CellValue;
  status: ComparisonRowStatus;
  key: string;
  changed_columns: string;
}
