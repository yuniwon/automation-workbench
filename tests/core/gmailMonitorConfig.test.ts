import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("Gmail monitor configuration", () => {
  it("builds the canonical 7 day lead search query", async () => {
    const { buildGmailLeadQuery } = await import(
      pathToFileURL(join(root, "scripts/gmail-monitor-config.mjs")).href
    );

    const query = buildGmailLeadQuery();

    expect(query).toContain("to:dnjsdndus@gmail.com");
    expect(query).toContain("newer_than:7d");
    expect(query).toContain("-from:dnjsdndus@gmail.com");
    expect(query).toContain("\"엑셀 자동화 견적\"");
    expect(query).toContain("\"엑셀 자동화 비용\"");
    expect(query).toContain("\"견적 요청 템플릿\"");
    expect(query).toContain("\"service-excel-automation-cost\"");
    expect(query).toContain("\"service-excel-automation-service\"");
    expect(query).toContain("\"workflow-settlement-reconciliation\"");
    expect(query).toContain("\"Automation Workbench\"");
    expect(query).toContain("\"엑셀 열 매핑 양식 변환\"");
    expect(query).toContain("\"seo-excel-column-mapping-template\"");
  });

  it("can widen the query window without changing the lead intent terms", async () => {
    const { buildGmailLeadQuery } = await import(
      pathToFileURL(join(root, "scripts/gmail-monitor-config.mjs")).href
    );

    const query = buildGmailLeadQuery({ window: "30d" });

    expect(query).toContain("newer_than:30d");
    expect(query).toContain("\"맞춤 제작 문의\"");
    expect(query).toContain("\"엑셀/CSV 자동화\"");
  });

  it("renders a repeatable Gmail scan log template", async () => {
    const { buildGmailScanLogTemplate } = await import(
      pathToFileURL(join(root, "scripts/gmail-monitor-config.mjs")).href
    );

    const template = buildGmailScanLogTemplate({
      window: "7d",
      candidateCount: 0,
      realLeadCount: 0,
    });

    expect(template).toContain("검색 범위: newer_than:7d");
    expect(template).toContain("Gmail 후보 수: 0");
    expect(template).toContain("실제 문의 수: 0");
    expect(template).toContain("다음 액션:");
    expect(template).toContain("docs/ops/lead-log.md");
    expect(template).toContain("docs/ops/lead-tracker.md");
  });
});
