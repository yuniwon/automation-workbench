import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DataPreview } from "../../src/components/DataPreview";
import type { DataTable } from "../../src/core/table/types";

const table: DataTable = {
  columns: [
    { key: "order_id", label: "order_id", sourceLabel: "order_id" },
    { key: "amount", label: "amount", sourceLabel: "amount" },
  ],
  rows: [
    { id: "row_1", cells: { order_id: "1001", amount: "12000" } },
    { id: "row_2", cells: { order_id: "1002", amount: null } },
  ],
};

describe("DataPreview", () => {
  it("matches the UI kit data preview heading in Korean mode", () => {
    const html = renderToStaticMarkup(<DataPreview locale="ko" table={table} />);

    expect(html).toContain("Data preview");
    expect(html).toContain("2행 · 2열");
    expect(html).toContain('class="panel-heading data-panel-heading"');
  });

  it("uses English row and column units in English mode", () => {
    const html = renderToStaticMarkup(<DataPreview locale="en" table={table} />);

    expect(html).toContain("2 rows · 2 columns");
  });
});
