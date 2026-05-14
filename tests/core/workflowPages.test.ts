import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readProjectFile(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("workflow landing pages", () => {
  it("publishes concrete business workflow pages with free tool and service CTAs", () => {
    const pages = [
      {
        path: "public/workflows/shopping-mall-order-cleanup.html",
        title: "쇼핑몰 주문 엑셀 정리 자동화",
        source: "workflow-shopping-mall-order-cleanup",
      },
      {
        path: "public/workflows/settlement-file-reconciliation.html",
        title: "정산 파일 대조 자동화",
        source: "workflow-settlement-file-reconciliation",
      },
      {
        path: "public/workflows/monthly-report-file-merge.html",
        title: "월간 매출 파일 병합 리포트 자동화",
        source: "workflow-monthly-report-file-merge",
      },
    ];

    for (const page of pages) {
      expect(existsSync(join(root, page.path)), page.path).toBe(true);

      const html = readProjectFile(page.path);

      expect(html).toContain(page.title);
      expect(html).toContain(page.source);
      expect(html).toContain("무료 도구 열기");
      expect(html).toContain("제작 범위 보기");
      expect(html).toContain("맞춤 제작 문의");
      expect(html).toContain("문의 전 체크리스트");
      expect(html).toContain("가격이 달라지는 기준");
      expect(html).toContain("/automation-workbench/services/excel-automation-inquiry.html");
      expect(html).toContain("dnjsdndus@gmail.com");
      expect(html).toContain('"@type": "WebPage"');
      expect(html).toContain('"@type": "BreadcrumbList"');
      expect(html).toContain('"@type": "FAQPage"');
      expect(html).toContain("샘플 파일 없이 문의할 수 있나요?");
    }
  });

  it("publishes a workflow index page and includes workflow pages in sitemap", () => {
    const indexHtml = readProjectFile("public/workflows/index.html");
    const sitemap = readProjectFile("public/sitemap.xml");

    expect(indexHtml).toContain("업무별 엑셀/CSV 자동화 예시");
    expect(indexHtml).toContain("쇼핑몰 주문 엑셀 정리 자동화");
    expect(indexHtml).toContain("정산 파일 대조 자동화");
    expect(indexHtml).toContain("월간 매출 파일 병합 리포트 자동화");

    expect(sitemap).toContain("/automation-workbench/workflows/");
    expect(sitemap).toContain("/automation-workbench/workflows/shopping-mall-order-cleanup.html");
    expect(sitemap).toContain("/automation-workbench/workflows/settlement-file-reconciliation.html");
    expect(sitemap).toContain("/automation-workbench/workflows/monthly-report-file-merge.html");
  });
});
