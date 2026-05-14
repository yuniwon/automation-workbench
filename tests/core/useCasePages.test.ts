import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const pages = [
  {
    path: "public/use-cases/excel-duplicate-cleanup.html",
    title: "엑셀 중복 제거",
    source: "seo-excel-duplicate-cleanup",
  },
  {
    path: "public/use-cases/csv-xlsx-file-compare.html",
    title: "CSV/XLSX 파일 비교",
    source: "seo-csv-xlsx-file-compare",
  },
  {
    path: "public/use-cases/order-settlement-automation.html",
    title: "주문·정산 파일 자동화",
    source: "seo-order-settlement-automation",
  },
  {
    path: "public/use-cases/excel-blank-cell-checker.html",
    title: "엑셀 빈 값 검사",
    source: "seo-excel-blank-cell-checker",
  },
  {
    path: "public/use-cases/excel-number-format-cleanup.html",
    title: "엑셀 숫자 형식 정리",
    source: "seo-excel-number-format-cleanup",
  },
  {
    path: "public/use-cases/excel-file-compare.html",
    title: "엑셀 파일 비교",
    source: "seo-excel-file-compare",
  },
  {
    path: "public/use-cases/excel-csv-file-merge.html",
    title: "엑셀/CSV 파일 병합",
    source: "seo-excel-csv-file-merge",
  },
];

function readProjectFile(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("SEO use case pages", () => {
  it("publishes long-tail use case pages with inquiry CTAs", () => {
    for (const page of pages) {
      const fullPath = join(root, page.path);
      expect(existsSync(fullPath), page.path).toBe(true);

      const html = readProjectFile(page.path);
      expect(html).toContain(page.title);
      expect(html).toContain(`?source=${page.source}`);
      expect(html).toContain("dnjsdndus@gmail.com");
      expect(html).toContain("PRIVACY.md");
      expect(html).toContain("브라우저 안에서 처리");

      const mailto = html.match(/href="(mailto:[^"]+)"/)?.[1] ?? "";
      expect(mailto, `${page.path} mailto`).toContain("body=");

      const params = new URLSearchParams(mailto.split("?")[1] ?? "");
      const body = params.get("body") ?? "";
      expect(body).toContain(`유입 경로:\n- ${page.source}`);
      expect(body).toContain("현재 수작업 소요시간");
      expect(body).toContain("필요한 결과물");
      expect(body).toContain("샘플 파일 공유 가능 여부");
    }
  });

  it("includes every use case page in sitemap", () => {
    const sitemap = readProjectFile("public/sitemap.xml");

    for (const page of pages) {
      expect(sitemap).toContain(`/automation-workbench/use-cases/${page.path.split("/").at(-1)}`);
    }
  });
});
