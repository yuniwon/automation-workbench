import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import { scanDataQuality } from "../../src/core/scan/scanDataQuality";

describe("scanDataQuality", () => {
  it("detects duplicates, blanks, header spaces, numbers, and mixed dates", () => {
    const { table } = parseCsv(
      " name,amount,date\nKim,\"₩12,000\",2026-05-01\nKim,\"₩12,000\",2026-05-01\nLee,,2026/05/02",
    );

    const issueTypes = scanDataQuality(table).map((issue) => issue.type);

    expect(issueTypes).toContain("duplicate_row");
    expect(issueTypes).toContain("blank_cell");
    expect(issueTypes).toContain("header_whitespace");
    expect(issueTypes).toContain("number_format");
    expect(issueTypes).toContain("mixed_date_format");
  });

  it("does not treat unit separator text as a row signature collision", () => {
    const { table } = parseCsv("a,b\n\"x\u001fy\",z\nx,\"y\u001fz\"");

    const issueTypes = scanDataQuality(table).map((issue) => issue.type);

    expect(issueTypes).not.toContain("duplicate_row");
  });
});
