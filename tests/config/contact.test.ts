import { describe, expect, it } from "vitest";
import { contactConfig, toolUrl } from "../../src/config/contact";

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
});
