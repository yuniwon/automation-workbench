import { describe, expect, it } from "vitest";
import { compareTables, comparisonToTable } from "../../src/core/compare/compareTables";
import { parseCsv } from "../../src/core/input/csvInputAdapter";

describe("compareTables", () => {
  it("classifies added, removed, changed, and unchanged rows by key column", () => {
    const { table: baseTable } = parseCsv(
      "order_id,status,amount\nA001,paid,12000\nA002,pending,8000\nA003,paid,15000",
    );
    const { table: compareTable } = parseCsv(
      "order_id,status,amount\nA001,paid,12000\nA002,paid,8000\nA004,paid,32000",
    );

    const result = compareTables(baseTable, compareTable, "order_id");

    expect(result.summary).toEqual({
      addedRows: 1,
      removedRows: 1,
      changedRows: 1,
      unchangedRows: 1,
      duplicateBaseKeys: 0,
      duplicateCompareKeys: 0,
    });
    expect(result.rows.map((row) => row.status)).toEqual([
      "unchanged",
      "changed",
      "removed",
      "added",
    ]);
    expect(result.rows[1]).toMatchObject({
      key: "A002",
      status: "changed",
      changedColumns: ["status"],
    });
  });

  it("reports duplicate keys and excludes duplicated rows from normal comparison", () => {
    const { table: baseTable } = parseCsv("order_id,status\nA001,paid\nA001,pending\nA002,paid");
    const { table: compareTable } = parseCsv("order_id,status\nA001,paid\nA002,paid\nA002,cancelled");

    const result = compareTables(baseTable, compareTable, "order_id");

    expect(result.summary).toMatchObject({
      duplicateBaseKeys: 1,
      duplicateCompareKeys: 1,
      unchangedRows: 0,
    });
    expect(result.rows.map((row) => row.status)).toEqual(["duplicate_base", "duplicate_compare"]);
  });

  it("keeps a normal base row visible when the compare table has a duplicate key", () => {
    const { table: baseTable } = parseCsv("order_id,status\nA001,paid\nA002,paid");
    const { table: compareTable } = parseCsv("order_id,status\nA001,paid\nA001,pending\nA002,paid");

    const result = compareTables(baseTable, compareTable, "order_id");

    expect(result.summary).toMatchObject({
      duplicateCompareKeys: 1,
      unchangedRows: 1,
    });
    expect(result.rows.map((row) => [row.key, row.status])).toEqual([
      ["A001", "duplicate_compare"],
      ["A002", "unchanged"],
    ]);
    expect(result.rows[0].baseRow?.cells.status).toBe("paid");
  });
});

describe("comparisonToTable", () => {
  it("exports comparison rows as a table suitable for CSV download", () => {
    const { table: baseTable } = parseCsv("order_id,status\nA001,pending");
    const { table: compareTable } = parseCsv("order_id,status\nA001,paid");
    const result = compareTables(baseTable, compareTable, "order_id");

    const table = comparisonToTable(result);

    expect(table.columns.map((column) => column.key)).toEqual([
      "status",
      "key",
      "changed_columns",
      "base_status",
      "compare_status",
    ]);
    expect(table.rows[0].cells).toEqual({
      status: "changed",
      key: "A001",
      changed_columns: "status",
      base_status: "pending",
      compare_status: "paid",
    });
  });
});
