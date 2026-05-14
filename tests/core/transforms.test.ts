import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import {
  createGroupedSummary,
  normalizeHeaders,
  normalizeNumbers,
  removeDuplicateRows,
  trimText,
} from "../../src/core/transform/transforms";

describe("transforms", () => {
  it("trims text and normalizes number-like strings", () => {
    const { table } = parseCsv("name,amount\n Kim ,\"₩12,000\"");
    const trimmed = trimText(table).table;
    const normalized = normalizeNumbers(trimmed).table;

    expect(trimmed.rows[0].cells.name).toBe("Kim");
    expect(normalized.rows[0].cells.amount).toBe("12000");
  });

  it("normalizes headers and removes duplicate rows", () => {
    const { table } = parseCsv(" name ,amount\nKim,1\nKim,1");
    const normalized = normalizeHeaders(table).table;
    const deduped = removeDuplicateRows(normalized).table;

    expect(normalized.columns[0].key).toBe("name");
    expect(deduped.rows).toHaveLength(1);
  });

  it("does not treat unit-separator collisions as duplicate rows", () => {
    const { table } = parseCsv("left,right\n\"A\",\"B\u001fC\"\n\"A\u001fB\",\"C\"");
    const deduped = removeDuplicateRows(table).table;

    expect(deduped.rows).toHaveLength(2);
  });

  it("creates grouped summaries", () => {
    const { table } = parseCsv("status,phone\npaid,1\npaid,\npending,2");
    const groups = createGroupedSummary(table, "status");

    expect(groups[0]).toEqual({
      label: "paid",
      rowCount: 2,
      blankCellCount: 1,
    });
  });
});
