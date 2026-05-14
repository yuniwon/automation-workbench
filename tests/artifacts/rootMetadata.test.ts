import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readRootHtml() {
  return readFileSync(join(root, "index.html"), "utf8");
}

describe("root page metadata", () => {
  it("describes every current free tool in title and social metadata", () => {
    const html = readRootHtml();

    const toolTerms = ["정리", "비교", "병합", "정산서", "양식 변환"];

    expect(html).toContain(
      "<title>무료 엑셀/CSV 정리·비교·병합·정산서 생성·양식 변환 도구 | Automation Workbench</title>",
    );
    expect(html).toContain(
      'property="og:title" content="무료 엑셀/CSV 정리·비교·병합·정산서 생성·양식 변환 도구"',
    );
    expect(html).toContain(
      'name="twitter:title" content="무료 엑셀/CSV 정리·비교·병합·정산서 생성·양식 변환 도구"',
    );

    for (const term of toolTerms) {
      expect(html).toContain(term);
    }
  });

  it("keeps JSON-LD featureList aligned with public tools", () => {
    const html = readRootHtml();

    expect(html).toContain('"@type": "WebApplication"');
    expect(html).toContain('"CSV/XLSX 파일 업로드"');
    expect(html).toContain('"공백 정리, 숫자 형식 정리, 중복 제거"');
    expect(html).toContain('"두 파일의 추가, 삭제, 변경 행 비교"');
    expect(html).toContain('"여러 파일 병합"');
    expect(html).toContain('"고객별 정산서 요약 생성"');
    expect(html).toContain('"열 매핑과 표준 양식 변환 CSV 다운로드"');
  });

  it("keeps root SEO links and readable Korean text", () => {
    const html = readRootHtml();

    expect(html).toContain('rel="canonical" href="https://yuniwon.github.io/automation-workbench/"');
    expect(html).toContain(
      'href="https://yuniwon.github.io/automation-workbench/sitemap.xml"',
    );
    expect(html).not.toMatch(/[ëìíê][\u0080-\u00ff]/);
  });

  it("loads the Inter font used by the UI kit handoff", () => {
    const html = readRootHtml();

    expect(html).toContain('rel="preconnect" href="https://fonts.googleapis.com"');
    expect(html).toContain('rel="preconnect" href="https://fonts.gstatic.com" crossorigin');
    expect(html).toContain("family=Inter:wght@400;500;510;590;600;700");
  });
});
