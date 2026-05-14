import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InquiryPanel } from "../../src/components/InquiryPanel";

describe("InquiryPanel", () => {
  it("shows browser-side file handling and privacy guidance before inquiry", () => {
    const html = renderToStaticMarkup(<InquiryPanel />);

    expect(html).toContain("파일은 브라우저 안에서 처리");
    expect(html).toContain("개인정보 안내");
    expect(html).toContain("github.com/yuniwon/automation-workbench/blob/main/PRIVACY.md");
  });

  it("links to the custom automation service page before asking for email", () => {
    const html = renderToStaticMarkup(<InquiryPanel />);

    expect(html).toContain("제작 범위 보기");
    expect(html).toContain("https://yuniwon.github.io/automation-workbench/services/excel-automation-inquiry.html");
  });

  it("shows the required inquiry fields before the email CTA", () => {
    const html = renderToStaticMarkup(<InquiryPanel />);

    expect(html).toContain("문의서에 포함될 항목");
    expect(html).toContain("자동화하고 싶은 업무");
    expect(html).toContain("현재 파일 형식");
    expect(html).toContain("반복 작업");
    expect(html).toContain("수작업 소요시간");
    expect(html).toContain("필요한 결과물");
    expect(html).toContain("마감일과 샘플 공유");
    expect(html).toContain("문의서 복사");
  });
});
