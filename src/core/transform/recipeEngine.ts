import type {
  AutomationRecipe,
  DataIssue,
  DataTable,
  RecipeMetrics,
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
      const metrics: RecipeMetrics = {};

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

        const result = handler(table, step.options);
        table = result.table;
        issues.push(...result.issues);
        diagnostics.push(...result.diagnostics);

        mergeMetrics(metrics, result.metrics);
      }

      return { table, issues, diagnostics, metrics };
    },
  };
}

function mergeMetrics(target: RecipeMetrics, source: RecipeMetrics | undefined) {
  if (!source) {
    return;
  }

  (Object.keys(source) as Array<keyof RecipeMetrics>).forEach((key) => {
    target[key] = (target[key] ?? 0) + (source[key] ?? 0);
  });
}
