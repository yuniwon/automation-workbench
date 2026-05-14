import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import { createSettlementReport, settlementReportToHtml } from "../../src/core/report/settlementReport";

describe("createSettlementReport", () => {
  it("groups rows into a settlement report with amount totals and item counts", () => {
    const { table } = parseCsv(`customer,product,amount
Kim Hana,Starter Kit,"₩12,000"
Kim Hana,Repair Pack,9000
Lee Min,Starter Kit,not paid
Lee Min,Starter Kit,11000`);

    const report = createSettlementReport(table, {
      groupColumnKey: "customer",
      itemColumnKey: "product",
      amountColumnKey: "amount",
    });

    expect(report.summary).toEqual({
      groupCount: 2,
      rowCount: 4,
      totalAmount: 32000,
      invalidAmountRows: 1,
    });
    expect(report.table.columns.map((column) => column.key)).toEqual([
      "group",
      "row_count",
      "total_amount",
      "items",
    ]);
    expect(report.table.rows.map((row) => row.cells)).toEqual([
      {
        group: "Kim Hana",
        row_count: 2,
        total_amount: 21000,
        items: "Starter Kit x1, Repair Pack x1",
      },
      {
        group: "Lee Min",
        row_count: 2,
        total_amount: 11000,
        items: "Starter Kit x2",
      },
    ]);
  });

  it("escapes report HTML values before download", () => {
    const { table } = parseCsv(`customer,product,amount
"<script>alert(1)</script>",Starter Kit,12000`);
    const report = createSettlementReport(table, {
      groupColumnKey: "customer",
      itemColumnKey: "product",
      amountColumnKey: "amount",
    });

    const html = settlementReportToHtml(report, "정산서 <샘플>");

    expect(html).toContain("정산서 &lt;샘플&gt;");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("총 금액");
    expect(html).toContain("12,000");
  });
});
