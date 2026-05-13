import { describe, expect, it } from "vitest";
import { rowsToDataTable } from "../../src/core/input/excelInputAdapter";

describe("rowsToDataTable", () => {
  it("converts worksheet rows into the shared table model", () => {
    const result = rowsToDataTable([
      ["order_id", "customer", "amount", "date"],
      [1001, "Kim", 12000, new Date("2026-05-01T00:00:00.000Z")],
      [1002, "", null, undefined],
    ]);

    expect(result.issues).toEqual([]);
    expect(result.table.columns.map((column) => column.key)).toEqual([
      "order_id",
      "customer",
      "amount",
      "date",
    ]);
    expect(result.table.rows[0].cells.date).toBe("2026-05-01");
    expect(result.table.rows[1].cells.customer).toBeNull();
  });
});
