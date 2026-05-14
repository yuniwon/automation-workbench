import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import { mergeTables } from "../../src/core/merge/mergeTables";

describe("mergeTables", () => {
  it("stacks rows from multiple tables and keeps a source file column", () => {
    const first = parseCsv("order_id,status\nA001,paid").table;
    const second = parseCsv("order_id,amount\nA002,12000").table;

    const result = mergeTables([
      { name: "orders-a.csv", table: first },
      { name: "orders-b.csv", table: second },
    ]);

    expect(result.summary).toEqual({
      sourceFiles: 2,
      mergedRows: 2,
      mergedColumns: 4,
      sourceColumnKey: "source_file",
    });
    expect(result.table.columns.map((column) => column.key)).toEqual([
      "source_file",
      "order_id",
      "status",
      "amount",
    ]);
    expect(result.table.rows.map((row) => row.cells)).toEqual([
      { source_file: "orders-a.csv", order_id: "A001", status: "paid", amount: null },
      { source_file: "orders-b.csv", order_id: "A002", status: null, amount: "12000" },
    ]);
  });

  it("uses a non-conflicting source column when input files already contain source_file", () => {
    const table = parseCsv("source_file,order_id\nmanual,A001").table;

    const result = mergeTables([{ name: "orders.csv", table }]);

    expect(result.summary.sourceColumnKey).toBe("source_file_2");
    expect(result.table.columns.map((column) => column.key)).toEqual([
      "source_file_2",
      "source_file",
      "order_id",
    ]);
    expect(result.table.rows[0].cells).toEqual({
      source_file_2: "orders.csv",
      source_file: "manual",
      order_id: "A001",
    });
  });
});
