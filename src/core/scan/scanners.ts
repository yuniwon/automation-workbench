import { isBlank, rowSignature } from "../table/tableUtils";
import type { DataIssue, DataTable } from "../table/types";
import { normalizeNumberLike } from "../format/numberFormat";

export function scanDuplicateRows(table: DataTable): DataIssue[] {
  const seen = new Map<string, string>();
  const issues: DataIssue[] = [];

  table.rows.forEach((row) => {
    const signature = rowSignature(table, row.cells);
    const firstRowId = seen.get(signature);
    if (firstRowId) {
      issues.push({
        id: `duplicate-${row.id}`,
        severity: "warning",
        type: "duplicate_row",
        rowId: row.id,
        message: `Row ${row.id} duplicates ${firstRowId}.`,
      });
      return;
    }
    seen.set(signature, row.id);
  });

  return issues;
}

export function scanBlankCells(table: DataTable): DataIssue[] {
  const issues: DataIssue[] = [];

  table.columns.forEach((column) => {
    let blankCount = 0;
    table.rows.forEach((row) => {
      if (isBlank(row.cells[column.key])) {
        blankCount += 1;
      }
    });
    if (blankCount > 0) {
      issues.push({
        id: `blank-column-${column.key}`,
        severity: "info",
        type: "blank_cell",
        columnKey: column.key,
        message: `${column.label} has ${blankCount} blank ${blankCount === 1 ? "cell" : "cells"}.`,
      });
    }
  });

  return issues;
}

export function scanHeaderWhitespace(table: DataTable): DataIssue[] {
  return table.columns
    .filter((column) => column.sourceLabel !== column.sourceLabel.trim())
    .map((column) => ({
      id: `header-space-${column.key}`,
      severity: "warning" as const,
      type: "header_whitespace",
      columnKey: column.key,
      message: `Header "${column.sourceLabel}" has leading or trailing spaces.`,
    }));
}

export function scanNumberFormats(table: DataTable): DataIssue[] {
  const issues: DataIssue[] = [];

  table.rows.forEach((row) => {
    table.columns.forEach((column) => {
      const value = row.cells[column.key];
      if (typeof value !== "string") {
        return;
      }

      const normalized = normalizeNumberLike(value);
      if (normalized !== null && normalized !== value.trim()) {
        issues.push({
          id: `number-format-${row.id}-${column.key}`,
          severity: "info",
          type: "number_format",
          rowId: row.id,
          columnKey: column.key,
          message: `${column.label} contains a number-like value that can be normalized.`,
        });
      }
    });
  });

  return issues;
}

export function scanMixedDateFormats(table: DataTable): DataIssue[] {
  const issues: DataIssue[] = [];

  table.columns.forEach((column) => {
    const patterns = new Set<string>();
    table.rows.forEach((row) => {
      const value = row.cells[column.key];
      if (typeof value === "string") {
        const pattern = datePattern(value.trim());
        if (pattern) {
          patterns.add(pattern);
        }
      }
    });

    if (patterns.size > 1) {
      issues.push({
        id: `mixed-date-${column.key}`,
        severity: "warning",
        type: "mixed_date_format",
        columnKey: column.key,
        message: `${column.label} appears to contain mixed date formats.`,
      });
    }
  });

  return issues;
}

function datePattern(value: string): string | null {
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
    return "yyyy-mm-dd";
  }
  if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(value)) {
    return "yyyy/mm/dd";
  }
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
    return "mm/dd/yyyy";
  }
  if (/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(value)) {
    return "yyyy.mm.dd";
  }
  return null;
}
