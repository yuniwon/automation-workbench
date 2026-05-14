import type { CellValue, DataTable, TableColumn } from "../table/types";

export interface MergeSource {
  name: string;
  table: DataTable;
}

export interface MergeSummary {
  sourceFiles: number;
  mergedRows: number;
  mergedColumns: number;
  sourceColumnKey: string;
}

export interface MergeResult {
  table: DataTable;
  summary: MergeSummary;
}

export function mergeTables(sources: MergeSource[]): MergeResult {
  const inputColumns = collectColumns(sources);
  const sourceColumnKey = pickSourceColumnKey(inputColumns);
  const sourceColumn: TableColumn = {
    key: sourceColumnKey,
    label: "Source file",
    sourceLabel: "Source file",
  };
  const columns = [sourceColumn, ...inputColumns];
  const rows = sources.flatMap((source, sourceIndex) =>
    source.table.rows.map((row, rowIndex) => {
      const cells: Record<string, CellValue> = {
        [sourceColumnKey]: source.name,
      };

      for (const column of inputColumns) {
        cells[column.key] = row.cells[column.key] ?? null;
      }

      return {
        id: `merge_${sourceIndex + 1}_${rowIndex + 1}`,
        cells,
      };
    }),
  );

  return {
    table: { columns, rows },
    summary: {
      sourceFiles: sources.length,
      mergedRows: rows.length,
      mergedColumns: columns.length,
      sourceColumnKey,
    },
  };
}

function collectColumns(sources: MergeSource[]): TableColumn[] {
  const seen = new Set<string>();
  const columns: TableColumn[] = [];

  for (const source of sources) {
    for (const column of source.table.columns) {
      if (seen.has(column.key)) {
        continue;
      }
      seen.add(column.key);
      columns.push({ ...column });
    }
  }

  return columns;
}

function pickSourceColumnKey(columns: TableColumn[]): string {
  const keys = new Set(columns.map((column) => column.key));
  let candidate = "source_file";
  let suffix = 2;

  while (keys.has(candidate)) {
    candidate = `source_file_${suffix}`;
    suffix += 1;
  }

  return candidate;
}
