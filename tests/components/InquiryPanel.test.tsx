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
});
