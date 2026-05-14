import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SummaryPanel } from "../../src/components/SummaryPanel";

describe("SummaryPanel", () => {
  it("uses the UI kit summary heading in Korean mode", () => {
    const html = renderToStaticMarkup(
      <SummaryPanel
        locale="ko"
        groups={[
          { label: "Starter Kit", rowCount: 3, blankCellCount: 2 },
          { label: "Repair Pack", rowCount: 2, blankCellCount: 0 },
        ]}
      />,
    );

    expect(html).toContain(">집계<");
    expect(html).toContain("2 groups");
  });

  it("keeps English copy for English mode", () => {
    const html = renderToStaticMarkup(
      <SummaryPanel locale="en" groups={[{ label: "Starter Kit", rowCount: 3, blankCellCount: 2 }]} />,
    );

    expect(html).toContain(">Grouped Summary<");
    expect(html).toContain("1 group");
  });
});
