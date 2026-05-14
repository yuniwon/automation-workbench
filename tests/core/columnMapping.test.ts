import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import { mapTableColumns, suggestColumnMappings } from "../../src/core/map/mapTableColumns";

describe("column mapping", () => {
  it("maps selected source columns into a fixed target schema", () => {
    const table = parseCsv("주문번호,고객명,상품,금액\nA001,Kim Hana,Starter Kit,12000").table;

    const result = mapTableColumns(table, [
      { key: "order_id", label: "주문번호", sourceColumnKey: "주문번호", required: true },
      { key: "customer_name", label: "고객명", sourceColumnKey: "고객명", required: true },
      { key: "product_name", label: "상품명", sourceColumnKey: "상품", required: true },
      { key: "amount", label: "금액", sourceColumnKey: "금액", required: true },
      { key: "channel", label: "판매채널", defaultValue: "온라인" },
      { key: "memo", label: "메모", required: true },
    ]);

    expect(result.table.columns.map((column) => [column.key, column.label])).toEqual([
      ["order_id", "주문번호"],
      ["customer_name", "고객명"],
      ["product_name", "상품명"],
      ["amount", "금액"],
      ["channel", "판매채널"],
      ["memo", "메모"],
    ]);
    expect(result.table.rows[0].cells).toEqual({
      order_id: "A001",
      customer_name: "Kim Hana",
      product_name: "Starter Kit",
      amount: "12000",
      channel: "온라인",
      memo: null,
    });
    expect(result.summary).toEqual({
      inputRows: 1,
      outputRows: 1,
      targetColumns: 6,
      mappedColumns: 4,
      defaultedColumns: 1,
      missingRequiredColumns: ["메모"],
    });
  });

  it("suggests mappings from target aliases and normalized labels", () => {
    const table = parseCsv("Order ID,Buyer,Item,Total Price\nA001,Kim Hana,Starter Kit,12000").table;

    const suggestions = suggestColumnMappings(table, [
      { key: "order_id", label: "주문번호", aliases: ["order id", "order_id"] },
      { key: "customer_name", label: "고객명", aliases: ["buyer", "customer"] },
      { key: "product_name", label: "상품명", aliases: ["item", "product"] },
      { key: "amount", label: "금액", aliases: ["total price", "amount"] },
      { key: "memo", label: "메모", aliases: ["memo"] },
    ]);

    expect(suggestions).toEqual({
      order_id: "order_id",
      customer_name: "buyer",
      product_name: "item",
      amount: "total_price",
      memo: "",
    });
  });
});
