import type {
  AutomationRecipe,
  DataIssue,
  DataTable,
  RecipeExecutionResult,
} from "../table/types";
import type { StepRegistry } from "./stepRegistry";

export interface RecipeEngine {
  execute(recipe: AutomationRecipe, input: DataTable): RecipeExecutionResult;
}

export function createRecipeEngine(stepRegistry: StepRegistry): RecipeEngine {
  return {
    execute(recipe, input) {
      let table = input;
      const issues: DataIssue[] = [];
      const diagnostics: string[] = [];
      const metrics: Record<string, number> = {};

      for (const step of recipe.steps) {
        const handler = stepRegistry[step.type];
        if (!handler) {
          return {
            table,
            issues: [
              ...issues,
              {
                id: `unknown-step-${step.type}`,
                severity: "error",
                type: "unknown_step",
                message: `This recipe uses an unknown step: ${step.type}.`,
              },
            ],
            diagnostics,
            metrics,
          };
        }

        const result = handler(table);
        table = result.table;
        issues.push(...result.issues);
        diagnostics.push(...result.diagnostics);

        Object.entries(result.metrics ?? {}).forEach(([key, value]) => {
          metrics[key] = (metrics[key] ?? 0) + value;
        });
      }

      return { table, issues, diagnostics, metrics };
    },
  };
}
