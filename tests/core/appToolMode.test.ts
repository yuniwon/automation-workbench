import { describe, expect, it } from "vitest";
import { selectInitialToolMode } from "../../src/app/App";

describe("selectInitialToolMode", () => {
  it("uses a supported tool query parameter", () => {
    expect(selectInitialToolMode("?tool=report")).toBe("report");
    expect(selectInitialToolMode("?source=seo-excel-csv-file-merge&tool=merge")).toBe("merge");
  });

  it("falls back to cleanup for missing or unsupported tool parameters", () => {
    expect(selectInitialToolMode("")).toBe("cleanup");
    expect(selectInitialToolMode("?tool=unknown")).toBe("cleanup");
  });
});
