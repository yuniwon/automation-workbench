import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ColumnMapperPanel } from "../../src/components/ColumnMapperPanel";
import type { TableParseResult } from "../../src/core/table/types";

describe("ColumnMapperPanel", () => {
  it("renders a sample column mapping workflow with export action", () => {
    const parseFile = async (): Promise<TableParseResult> => ({
      table: { columns: [], rows: [] },
      issues: [],
    });

    const html = renderToStaticMarkup(<ColumnMapperPanel parseFile={parseFile} />);

    expect(html).toContain("양식 변환");
    expect(html).toContain("표준 양식 CSV 받기");
    expect(html).toContain("주문번호");
    expect(html).toContain("고객명");
    expect(html).toContain("판매채널");
    expect(html).toContain("Kim Hana");
  });
});
