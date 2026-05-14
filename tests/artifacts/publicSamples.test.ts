/// <reference types="node" />

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import { sampleOrdersComparisonCsv, sampleOrdersCsv } from "../../src/core/samples/sampleOrders";

describe("public sample files", () => {
  it("publishes the cleanup sample CSV used by the app", () => {
    const csv = readFileSync("public/samples/sample-orders-dirty.csv", "utf8");

    expect(csv.trim()).toBe(sampleOrdersCsv.trim());
    expect(parseCsv(csv).table.rows).toHaveLength(6);
  });

  it("publishes the comparison sample CSV used by the app", () => {
    const csv = readFileSync("public/samples/sample-orders-compare.csv", "utf8");

    expect(csv.trim()).toBe(sampleOrdersComparisonCsv.trim());
    expect(parseCsv(csv).table.rows).toHaveLength(4);
  });
});
