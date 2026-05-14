import type { DataTable, TransformResult } from "../table/types";
import {
  normalizeHeaders,
  normalizeNumbers,
  removeDuplicateRows,
  trimText,
} from "./transforms";
import { createRecipeEngine } from "./recipeEngine";

export type StepHandler = (table: DataTable, options?: Record<string, unknown>) => TransformResult;
export type StepRegistry = Record<string, StepHandler>;

export const defaultStepRegistry: StepRegistry = {
  trimText,
  normalizeHeaders,
  normalizeNumbers,
  removeDuplicateRows,
};

export const defaultRecipeEngine = createRecipeEngine(defaultStepRegistry);
