export type CellValue = string | number | boolean | null;

export interface TableColumn {
  key: string;
  label: string;
  sourceLabel: string;
}

export interface TableRow {
  id: string;
  cells: Record<string, CellValue>;
}

export interface DataTable {
  columns: TableColumn[];
  rows: TableRow[];
}

export interface DataIssue {
  id: string;
  severity: "info" | "warning" | "error";
  type: string;
  message: string;
  rowId?: string;
  columnKey?: string;
}

export interface TransformResult {
  table: DataTable;
  issues: DataIssue[];
  diagnostics: string[];
  metrics?: Record<string, number>;
}

export interface RecipeStep {
  type: string;
  options?: Record<string, unknown>;
}

export interface RecipeInput {
  type: string;
}

export interface RecipeOutput {
  type: string;
  filename?: string;
}

export interface AutomationRecipe {
  id: string;
  name: string;
  input: RecipeInput;
  steps: RecipeStep[];
  output: RecipeOutput;
}

export interface RecipeExecutionResult {
  table: DataTable;
  issues: DataIssue[];
  diagnostics: string[];
  metrics: Record<string, number>;
}

export interface SummaryGroup {
  label: string;
  rowCount: number;
  blankCellCount: number;
}

export interface RunMetrics {
  rowsBefore: number;
  rowsAfter: number;
  trimmedCells: number;
  normalizedNumberCells: number;
  removedDuplicateRows: number;
}
