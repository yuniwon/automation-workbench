import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ReportGeneratorPanel } from "../../src/components/ReportGeneratorPanel";
import type { TableParseResult } from "../../src/core/table/types";

describe("ReportGeneratorPanel", () => {
  it("renders a sample settlement report workflow with export actions", () => {
    const parseFile = async (): Promise<TableParseResult> => ({
      table: { columns: [], rows: [] },
      issues: [],
    });

    const html = renderToStaticMarkup(<ReportGeneratorPanel parseFile={parseFile} />);

    expect(html).toContain("정산서 자동 생성");
    expect(html).toContain("총 금액");
    expect(html).toContain("정산 CSV 받기");
    expect(html).toContain("정산 HTML 받기");
    expect(html).toContain("Kim Hana");
    expect(html).toContain("Starter Kit x1");
  });
});
