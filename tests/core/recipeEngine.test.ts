import { describe, expect, it } from "vitest";
import { parseCsv } from "../../src/core/input/csvInputAdapter";
import { createRecipeEngine } from "../../src/core/transform/recipeEngine";
import { defaultStepRegistry } from "../../src/core/transform/stepRegistry";
import type { AutomationRecipe } from "../../src/core/table/types";

describe("executeRecipe", () => {
  it("runs steps in order", () => {
    const { table } = parseCsv("name,amount\n Kim ,\"₩12,000\"\n Kim ,\"₩12,000\"");
    const recipe: AutomationRecipe = {
      id: "test",
      name: "Test",
      input: { type: "csv" },
      steps: [
        { type: "trimText" },
        { type: "normalizeNumbers" },
        { type: "removeDuplicateRows" },
      ],
      output: { type: "csv" },
    };

    const result = createRecipeEngine(defaultStepRegistry).execute(recipe, table);

    expect(result.table.rows).toHaveLength(1);
    expect(result.table.rows[0].cells.amount).toBe("12000");
    expect(result.metrics.removedDuplicateRows).toBe(1);
  });

  it("returns a clear issue for unknown steps", () => {
    const { table } = parseCsv("name\nKim");
    const result = createRecipeEngine({}).execute(
      {
        id: "bad",
        name: "Bad",
        input: { type: "csv" },
        steps: [{ type: "missingStep" }],
        output: { type: "csv" },
      },
      table,
    );

    expect(result.issues[0]).toMatchObject({
      severity: "error",
      type: "unknown_step",
    });
  });
});
