import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import { tableToCsv } from "../../src/core/output/csvOutputAdapter";

describe("tableToCsv", () => {
  it("escapes commas, quotes, and blank cells", () => {
    const { table } = parseCsv('name,note,empty\nKim,"hello, ""friend""",');

    expect(tableToCsv(table)).toBe('name,note,empty\r\nKim,"hello, ""friend""",');
  });
});
