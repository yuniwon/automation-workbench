import {
  cloneTable,
  createUniqueColumns,
  isBlank,
  rowSignature,
} from "../table/tableUtils";
import type { DataIssue, DataTable, SummaryGroup, TransformResult } from "../table/types";
import { normalizeNumberLike } from "../format/numberFormat";

export function trimText(table: DataTable): TransformResult {
  const next = cloneTable(table);
  let count = 0;

  next.rows.forEach((row) => {
    Object.entries(row.cells).forEach(([key, value]) => {
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed !== value) {
          count += 1;
          row.cells[key] = trimmed;
        }
      }
    });
  });

  return {
    table: next,
    issues: [],
    diagnostics: [`Trimmed ${count} text cells.`],
    metrics: { trimmedCells: count },
  };
}

export function normalizeHeaders(table: DataTable): TransformResult {
  const columns = createUniqueColumns(table.columns.map((column) => column.label));
  const changedCount = columns.filter((column, index) => column.key !== table.columns[index].key).length;
  const next: DataTable = {
    columns,
    rows: table.rows.map((row) => {
      const cells: Record<string, string | number | boolean | null> = {};
      table.columns.forEach((oldColumn, index) => {
        cells[columns[index].key] = row.cells[oldColumn.key] ?? null;
      });
      return {
        id: row.id,
        cells,
      };
    }),
  };

  return {
    table: next,
    issues: [],
    diagnostics: ["Normalized column names."],
    metrics: { normalizedHeaders: changedCount },
  };
}

export function normalizeNumbers(table: DataTable): TransformResult {
  const next = cloneTable(table);
  let count = 0;

  next.rows.forEach((row) => {
    Object.entries(row.cells).forEach(([key, value]) => {
      if (typeof value !== "string") {
        return;
      }
      const normalized = normalizeNumberLike(value);
      if (normalized !== null) {
        row.cells[key] = normalized;
        count += 1;
      }
    });
  });

  return {
    table: next,
    issues: [],
    diagnostics: [`Normalized ${count} number-like cells.`],
    metrics: { normalizedNumberCells: count },
  };
}

export function removeDuplicateRows(table: DataTable): TransformResult {
  const seen = new Set<string>();
  const removedIssues: DataIssue[] = [];
  const rows = table.rows.filter((row) => {
    const signature = rowSignature(table, row.cells);
    if (seen.has(signature)) {
      removedIssues.push({
        id: `removed-duplicate-${row.id}`,
        severity: "info",
        type: "removed_duplicate_row",
        rowId: row.id,
        message: `Removed duplicate row ${row.id}.`,
      });
      return false;
    }
    seen.add(signature);
    return true;
  });

  return {
    table: {
      columns: table.columns.map((column) => ({ ...column })),
      rows: rows.map((row) => ({ id: row.id, cells: { ...row.cells } })),
    },
    issues: removedIssues,
    diagnostics: [`Removed ${removedIssues.length} duplicate rows.`],
    metrics: { removedDuplicateRows: removedIssues.length },
  };
}

export function createGroupedSummary(table: DataTable, columnKey: string): SummaryGroup[] {
  const groups = new Map<string, SummaryGroup>();

  table.rows.forEach((row) => {
    const rawLabel = row.cells[columnKey];
    const label = isBlank(rawLabel) ? "(blank)" : String(rawLabel);
    const current = groups.get(label) ?? {
      label,
      rowCount: 0,
      blankCellCount: 0,
    };

    current.rowCount += 1;
    current.blankCellCount += table.columns.filter((column) => isBlank(row.cells[column.key])).length;
    groups.set(label, current);
  });

  return Array.from(groups.values()).sort((a, b) => b.rowCount - a.rowCount);
}
