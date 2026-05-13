import { createRowId, createUniqueColumns } from "../table/tableUtils";
import type { CellValue, DataIssue, DataTable } from "../table/types";

export interface CsvParseResult {
  table: DataTable;
  issues: DataIssue[];
}

export function parseCsv(text: string): CsvParseResult {
  const issues: DataIssue[] = [];
  const cleanedText = text.replace(/^\uFEFF/, "");

  if (cleanedText.trim() === "") {
    return {
      table: { columns: [], rows: [] },
      issues: [
        {
          id: "csv-empty",
          severity: "error",
          type: "empty_file",
          message: "CSV file is empty.",
        },
      ],
    };
  }

  const records = parseRecords(cleanedText);
  const nonEmptyRecords = records.filter((record) => record.some((cell) => cell.trim() !== ""));

  if (nonEmptyRecords.length === 0) {
    return {
      table: { columns: [], rows: [] },
      issues: [
        {
          id: "csv-no-records",
          severity: "error",
          type: "empty_file",
          message: "CSV file does not contain usable rows.",
        },
      ],
    };
  }

  const headers = nonEmptyRecords[0];
  if (headers.every((header) => header.trim() === "")) {
    return {
      table: { columns: [], rows: [] },
      issues: [
        {
          id: "csv-missing-headers",
          severity: "error",
          type: "missing_headers",
          message: "The first row must contain column names.",
        },
      ],
    };
  }

  const columns = createUniqueColumns(headers);
  const rows = nonEmptyRecords.slice(1).map((record, rowIndex) => {
    const cells: Record<string, CellValue> = {};
    columns.forEach((column, columnIndex) => {
      const rawValue = record[columnIndex] ?? "";
      cells[column.key] = rawValue === "" ? null : rawValue;
    });
    return {
      id: createRowId(rowIndex),
      cells,
    };
  });

  return {
    table: { columns, rows },
    issues,
  };
}

function parseRecords(text: string): string[][] {
  const records: string[][] = [];
  let record: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      record.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      record.push(field);
      records.push(record);
      record = [];
      field = "";
      continue;
    }

    field += char;
  }

  record.push(field);
  records.push(record);
  return records;
}
