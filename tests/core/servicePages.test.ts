import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readProjectFile(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("service landing pages", () => {
  it("publishes a custom automation inquiry page with pricing and a qualified inquiry CTA", () => {
    const pagePath = "public/services/excel-automation-inquiry.html";

    expect(existsSync(join(root, pagePath)), pagePath).toBe(true);

    const html = readProjectFile(pagePath);

    expect(html).toContain("맞춤 엑셀/CSV 자동화 제작 문의");
    expect(html).toContain("5만 원부터");
    expect(html).toContain("15만 원부터");
    expect(html).toContain("30만 원부터");
    expect(html).toContain("샘플 파일");
    expect(html).toContain("dnjsdndus@gmail.com");
    expect(html).toContain("source=service-excel-automation-inquiry");
    expect(html).toContain("현재 파일 형식");
    expect(html).toContain("현재 수작업 소요시간");
    expect(html).toContain("필요한 결과물");
    expect(html).toContain("문의 전 체크리스트");
    expect(html).toContain("가격이 달라지는 기준");
    expect(html).toContain('property="og:type" content="website"');
    expect(html).toContain('"@type": "Service"');
    expect(html).toContain('"@type": "OfferCatalog"');
    expect(html).toContain('"@type": "FAQPage"');
    expect(html).toContain("샘플 파일 없이 문의할 수 있나요?");
    expect(html).toContain('data-service-inquiry="true"');
    expect(html).toContain("유입 경로 상세");
    expect(html).toContain("업무 예시 상세");
    expect(html).toContain("CTA 상세");
  });

  it("publishes an Excel automation service page for search visitors", () => {
    const pagePath = "public/services/excel-automation-service.html";

    expect(existsSync(join(root, pagePath)), pagePath).toBe(true);

    const html = readProjectFile(pagePath);

    expect(html).toContain("엑셀 자동화 제작 서비스");
    expect(html).toContain("엑셀 자동화 외주");
    expect(html).toContain("무료 진단");
    expect(html).toContain("견적 기준");
    expect(html).toContain("source=service-excel-automation-service");
    expect(html).toContain("dnjsdndus@gmail.com");
    expect(html).toContain('"@type": "Service"');
    expect(html).toContain('"@type": "OfferCatalog"');
    expect(html).toContain('data-service-inquiry="true"');
  });

  it("publishes an Excel automation quote page for cost-conscious visitors", () => {
    const pagePath = "public/services/excel-automation-cost.html";

    expect(existsSync(join(root, pagePath)), pagePath).toBe(true);

    const html = readProjectFile(pagePath);

    expect(html).toContain("엑셀 자동화 견적");
    expect(html).toContain("엑셀 자동화 비용");
    expect(html).toContain("견적 요청 템플릿");
    expect(html).toContain("5만 원부터");
    expect(html).toContain("15만 원부터");
    expect(html).toContain("30만 원부터");
    expect(html).toContain("source=service-excel-automation-cost");
    expect(html).toContain("dnjsdndus@gmail.com");
    expect(html).toContain('"@type": "Service"');
    expect(html).toContain('"@type": "OfferCatalog"');
    expect(html).toContain('data-service-inquiry="true"');
  });

  it("includes service pages in sitemap", () => {
    const sitemap = readProjectFile("public/sitemap.xml");

    expect(sitemap).toContain("/automation-workbench/services/excel-automation-inquiry.html");
    expect(sitemap).toContain("/automation-workbench/services/excel-automation-service.html");
    expect(sitemap).toContain("/automation-workbench/services/excel-automation-cost.html");
  });
});
