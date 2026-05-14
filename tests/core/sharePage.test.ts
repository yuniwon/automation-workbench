import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const pagePath = "public/share/free-excel-automation.html";
const shareUrl = "/automation-workbench/share/free-excel-automation.html";

function readProjectFile(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("share landing page", () => {
  it("publishes a zero-cost share page with demo and inquiry CTAs", () => {
    expect(existsSync(join(root, pagePath)), pagePath).toBe(true);

    const html = readProjectFile(pagePath);

    expect(html).toContain("무료 엑셀/CSV 자동화 도구 공유용 소개");
    expect(html).toContain("커뮤니티 공유용 요약");
    expect(html).toContain("게시글에 바로 붙일 수 있는 짧은 소개");
    expect(html).toContain("정리·비교·병합·정산서 생성·양식 변환");
    expect(html).toContain("무료 도구 열기");
    expect(html).toContain("/automation-workbench/?source=share-free-excel-automation");
    expect(html).toContain("/automation-workbench/use-cases/?source=share-free-excel-automation");
    expect(html).toContain("/automation-workbench/workflows/?source=share-free-excel-automation");
    expect(html).toContain(
      "/automation-workbench/services/excel-automation-inquiry.html?source=share-free-excel-automation&intent=scope",
    );
    expect(html).toContain("mailto:dnjsdndus@gmail.com");
    expect(html).toContain("source=share-free-excel-automation");
    expect(html).toContain("파일은 브라우저 안에서 처리");
    expect(html).toContain('property="og:type" content="website"');
    expect(html).toContain('"@type": "WebPage"');
    expect(html).toContain('"@type": "FAQPage"');
  });

  it("includes the share page in sitemap and share kit", () => {
    const sitemap = readProjectFile("public/sitemap.xml");
    const shareKit = readProjectFile("docs/marketing/share-kit.md");

    expect(sitemap).toContain(shareUrl);
    expect(shareKit).toContain("공유용 소개 페이지");
    expect(shareKit).toContain("https://yuniwon.github.io/automation-workbench/share/free-excel-automation.html");
    expect(shareKit).toContain(
      "GeekNews: https://yuniwon.github.io/automation-workbench/share/free-excel-automation.html?source=geeknews&intent=share",
    );
    expect(shareKit).toContain(
      "OKKY: https://yuniwon.github.io/automation-workbench/share/free-excel-automation.html?source=okky&intent=share",
    );
  });
});
