import { describe, expect, it } from "vitest";
import { selectInitialLocale, selectInitialToolMode } from "../../src/app/App";

describe("selectInitialToolMode", () => {
  it("uses a supported tool query parameter", () => {
    expect(selectInitialToolMode("?tool=report")).toBe("report");
    expect(selectInitialToolMode("?tool=map")).toBe("map");
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
