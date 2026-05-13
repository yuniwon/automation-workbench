import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";

describe("parseCsv", () => {
  it("parses headers and rows", () => {
    const result = parseCsv("name,amount\nKim,1200\nLee,");

    expect(result.issues).toEqual([]);
    expect(result.table.columns.map((column) => column.key)).toEqual(["name", "amount"]);
    expect(result.table.rows[0].cells.name).toBe("Kim");
    expect(result.table.rows[1].cells.amount).toBeNull();
  });

  it("preserves quoted commas and escaped quotes", () => {
    const result = parseCsv('name,note\nKim,"hello, ""friend"""');

    expect(result.table.rows[0].cells.note).toBe('hello, "friend"');
  });

  it("returns a clear empty file issue", () => {
    const result = parseCsv("   ");

    expect(result.issues[0]).toMatchObject({
      severity: "error",
      type: "empty_file",
    });
  });

  it("strips UTF-8 BOM from the first header", () => {
    const result = parseCsv("\uFEFForder_id,name\n1001,Kim");

    expect(result.table.columns[0].key).toBe("order_id");
    expect(result.table.columns[0].label).toBe("order_id");
  });
});
