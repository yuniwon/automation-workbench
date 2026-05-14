import { describe, expect, it } from "vitest";
import { buildContactHref, contactConfig, getSourceFromSearch, toolUrl } from "../../src/config/contact";

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

  it("extracts source from a URL search string", () => {
    expect(getSourceFromSearch("?source=okky")).toBe("okky");
    expect(getSourceFromSearch("?utm_source=hacker-news")).toBe("hacker-news");
    expect(getSourceFromSearch("?source=")).toBe("");
  });
});
