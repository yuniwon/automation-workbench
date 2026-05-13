import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("use case page generator", () => {
  it("keeps generated use case pages in sync with checked-in HTML", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);

    for (const useCase of generator.useCases) {
      const htmlPath = join(root, "public", "use-cases", `${useCase.slug}.html`);
      const checkedInHtml = readFileSync(htmlPath, "utf8");

      expect(generator.renderUseCasePage(useCase)).toBe(checkedInHtml);
    }
  });
});
