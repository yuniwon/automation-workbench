import { describe, expect, it } from "vitest";
import { buildContactHref, buildInquiryText, contactConfig, getSourceFromSearch, toolUrl } from "../../src/config/contact";

function getDecodedMailBody() {
  const params = new URLSearchParams(contactConfig.href.split("?")[1] ?? "");
  return params.get("body") ?? "";
}

describe("contactConfig", () => {
  it("opens a prefilled Gmail-ready inquiry email", () => {
    expect(contactConfig.href).toContain("mailto:dnjsdndus@gmail.com");
    expect(contactConfig.href).toContain("subject=");

    const body = getDecodedMailBody();

    expect(body).toContain(toolUrl);
    expect(body).toContain("현재 수작업 소요시간");
    expect(body).toContain("필요한 결과물");
    expect(body).toContain("희망 마감일");
    expect(body).toContain("샘플 파일 공유 가능 여부");
  });

  it("adds the inbound source to the inquiry email body", () => {
    const href = buildContactHref("geeknews");
    const params = new URLSearchParams(href.split("?")[1] ?? "");
    const body = params.get("body") ?? "";

    expect(body).toContain("유입 경로:");
    expect(body).toContain("geeknews");
  });

  it("adds the selected tool to the inquiry email body and tracked URL", () => {
    const href = buildContactHref("geeknews", "report");
    const params = new URLSearchParams(href.split("?")[1] ?? "");
    const body = params.get("body") ?? "";

    expect(body).toContain("선택 도구:");
    expect(body).toContain("report");
    expect(body).toContain("https://yuniwon.github.io/automation-workbench/?source=geeknews&tool=report");
  });

  it("keeps the column mapping tool in inquiry tracking", () => {
    const href = buildContactHref("seo-excel-column-mapping-template", "map");
    const params = new URLSearchParams(href.split("?")[1] ?? "");
    const body = params.get("body") ?? "";

    expect(body).toContain("선택 도구:");
    expect(body).toContain("map");
    expect(body).toContain(
      "https://yuniwon.github.io/automation-workbench/?source=seo-excel-column-mapping-template&tool=map",
    );
  });

  it("builds a copyable inquiry request with tracked source and required fields", () => {
    const text = buildInquiryText("geeknews", "map");

    expect(text).toContain("https://yuniwon.github.io/automation-workbench/?source=geeknews&tool=map");
    expect(text).toContain("유입 경로:");
    expect(text).toContain("선택 도구:");
    expect(text).toContain("제가 자동화하고 싶은 업무");
    expect(text).toContain("현재 파일 형식");
    expect(text).toContain("반복해서 하는 작업");
    expect(text).toContain("현재 수작업 소요시간");
    expect(text).toContain("필요한 결과물");
    expect(text).toContain("희망 마감일");
    expect(text).toContain("샘플 파일 공유 가능 여부");
  });

  it("extracts source from a URL search string", () => {
    expect(getSourceFromSearch("?source=okky")).toBe("okky");
    expect(getSourceFromSearch("?utm_source=hacker-news")).toBe("hacker-news");
    expect(getSourceFromSearch("?source=")).toBe("");
  });
});
