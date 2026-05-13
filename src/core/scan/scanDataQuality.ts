import type { DataIssue, DataTable } from "../table/types";
import {
  scanBlankCells,
  scanDuplicateRows,
  scanHeaderWhitespace,
  scanMixedDateFormats,
  scanNumberFormats,
} from "./scanners";

export function scanDataQuality(table: DataTable): DataIssue[] {
  return [
    ...scanDuplicateRows(table),
    ...scanBlankCells(table),
    ...scanHeaderWhitespace(table),
    ...scanNumberFormats(table),
    ...scanMixedDateFormats(table),
  ];
}
