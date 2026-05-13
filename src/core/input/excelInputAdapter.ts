import { readSheet } from "read-excel-file/browser";
import { createRowId, createUniqueColumns } from "../table/tableUtils";
import type { CellValue, TableParseResult } from "../table/types";

export type ExcelParseResult = TableParseResult;

type ExcelRawCell = string | number | boolean | Date | null | undefined;

export async function parseXlsxFile(file: File): Promise<ExcelParseResult> {
  const rows = await readSheet(file);
  return rowsToDataTable(rows as unknown as ExcelRawCell[][]);
}

export function rowsToDataTable(rows: ExcelRawCell[][]): ExcelParseResult {
  const nonEmptyRows = rows.filter((row) => row.some((cell) => !isRawBlank(cell)));

  if (nonEmptyRows.length === 0) {
    return {
      table: { columns: [], rows: [] },
      issues: [
        {
          id: "xlsx-empty",
          severity: "error",
          type: "empty_file",
          message: "Excel file does not contain usable rows.",
        },
      ],
    };
  }

  const headers = nonEmptyRows[0].map((cell, index) => {
    if (isRawBlank(cell)) {
      return `Column ${index + 1}`;
    }
    return String(cell);
  });

  const columns = createUniqueColumns(headers);
  const tableRows = nonEmptyRows.slice(1).map((row, rowIndex) => {
    const cells: Record<string, CellValue> = {};
    columns.forEach((column, columnIndex) => {
      cells[column.key] = normalizeExcelCell(row[columnIndex]);
    });
    return {
      id: createRowId(rowIndex),
      cells,
    };
  });

  return {
    table: {
      columns,
      rows: tableRows,
    },
    issues: [],
  };
}

function normalizeExcelCell(value: ExcelRawCell): CellValue {
  if (isRawBlank(value)) {
    return null;
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return String(value);
}

function isRawBlank(value: ExcelRawCell): boolean {
  return value === null || value === undefined || (typeof value === "string" && value.trim() === "");
}
