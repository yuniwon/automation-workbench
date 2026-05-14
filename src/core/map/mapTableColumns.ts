import { toColumnKey } from "../table/tableUtils";
import type { CellValue, DataTable, TableColumn } from "../table/types";

export interface ColumnMappingTarget {
  key: string;
  label: string;
  sourceColumnKey?: string;
  defaultValue?: CellValue;
  required?: boolean;
  aliases?: string[];
}

export interface ColumnMappingSummary {
  inputRows: number;
  outputRows: number;
  targetColumns: number;
  mappedColumns: number;
  defaultedColumns: number;
  missingRequiredColumns: string[];
}

export interface ColumnMappingResult {
  table: DataTable;
  summary: ColumnMappingSummary;
}

export function mapTableColumns(table: DataTable, targets: ColumnMappingTarget[]): ColumnMappingResult {
  const sourceKeys = new Set(table.columns.map((column) => column.key));
  const columns: TableColumn[] = targets.map((target) => ({
    key: target.key,
    label: target.label,
    sourceLabel: target.label,
  }));

  const mappedTargets = targets.filter((target) => target.sourceColumnKey && sourceKeys.has(target.sourceColumnKey));
  const defaultedTargets = targets.filter((target) => !isMapped(target, sourceKeys) && target.defaultValue !== undefined);
  const missingRequiredColumns = targets
    .filter((target) => target.required && !isMapped(target, sourceKeys) && target.defaultValue === undefined)
    .map((target) => target.label);

  const rows = table.rows.map((row, rowIndex) => {
    const cells: Record<string, CellValue> = {};

    for (const target of targets) {
      if (target.sourceColumnKey && sourceKeys.has(target.sourceColumnKey)) {
        cells[target.key] = row.cells[target.sourceColumnKey] ?? null;
      } else if (target.defaultValue !== undefined) {
        cells[target.key] = target.defaultValue;
      } else {
        cells[target.key] = null;
      }
    }

    return {
      id: `mapped_${rowIndex + 1}`,
      cells,
    };
  });

  return {
    table: { columns, rows },
    summary: {
      inputRows: table.rows.length,
      outputRows: rows.length,
      targetColumns: targets.length,
      mappedColumns: mappedTargets.length,
      defaultedColumns: defaultedTargets.length,
      missingRequiredColumns,
    },
  };
}

export function suggestColumnMappings(
  table: DataTable,
  targets: Pick<ColumnMappingTarget, "key" | "label" | "aliases">[],
): Record<string, string> {
  const sourceByCandidate = new Map<string, string>();

  for (const column of table.columns) {
    for (const candidate of [column.key, column.label, column.sourceLabel]) {
      sourceByCandidate.set(normalizeColumnCandidate(candidate), column.key);
    }
  }

  const suggestions: Record<string, string> = {};
  for (const target of targets) {
    const candidates = [target.key, target.label, ...(target.aliases ?? [])];
    const sourceKey = candidates
      .map(normalizeColumnCandidate)
      .map((candidate) => sourceByCandidate.get(candidate))
      .find((candidate): candidate is string => Boolean(candidate));

    suggestions[target.key] = sourceKey ?? "";
  }

  return suggestions;
}

function isMapped(target: ColumnMappingTarget, sourceKeys: Set<string>): boolean {
  return Boolean(target.sourceColumnKey && sourceKeys.has(target.sourceColumnKey));
}

function normalizeColumnCandidate(value: string): string {
  return toColumnKey(value, 0).toLowerCase();
}
