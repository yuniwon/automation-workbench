import type { AutomationRecipe } from "../table/types";

export const basicCleanupRecipe: AutomationRecipe = {
  id: "csv-cleanup-basic",
  name: "Basic CSV Cleanup",
  input: {
    type: "csv",
  },
  steps: [
    { type: "trimText" },
    { type: "normalizeHeaders" },
    { type: "normalizeNumbers" },
    { type: "removeDuplicateRows" },
  ],
  output: {
    type: "csv",
    filename: "cleaned-data.csv",
  },
};
