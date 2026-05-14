import { describe, expect, it } from "vitest";
import { parseUploadedFile, selectInitialLocale, selectInitialToolMode } from "../../src/app/App";

describe("selectInitialToolMode", () => {
  it("uses a supported tool query parameter", () => {
    expect(selectInitialToolMode("?tool=report")).toBe("report");
    expect(selectInitialToolMode("?tool=map")).toBe("map");
    expect(selectInitialToolMode("?tool=checkin")).toBe("checkin");
    expect(selectInitialToolMode("?source=seo-excel-csv-file-merge&tool=merge")).toBe("merge");
  });

  it("falls back to cleanup for missing or unsupported tool parameters", () => {
    expect(selectInitialToolMode("")).toBe("cleanup");
    expect(selectInitialToolMode("?tool=unknown")).toBe("cleanup");
  });
});

describe("selectInitialLocale", () => {
  it("uses English only when lang=en is requested", () => {
    expect(selectInitialLocale("?lang=en")).toBe("en");
    expect(selectInitialLocale("?source=upwork-portfolio&lang=en")).toBe("en");
  });

  it("falls back to Korean for missing or unsupported locale parameters", () => {
    expect(selectInitialLocale("")).toBe("ko");
    expect(selectInitialLocale("?lang=ja")).toBe("ko");
  });
});

describe("parseUploadedFile", () => {
  it("returns a localized unsupported file message", async () => {
    const file = new File(["{}"], "data.json", { type: "application/json" });

    const koResult = await parseUploadedFile(file, "ko");
    const enResult = await parseUploadedFile(file, "en");

    expect(koResult.issues[0].message).toBe("CSV 또는 XLSX 파일을 지원합니다.");
    expect(enResult.issues[0].message).toBe("CSV or XLSX files are supported.");
  });
});
