import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const expectedUseCaseSlugs = [
  "excel-duplicate-cleanup",
  "csv-xlsx-file-compare",
  "order-settlement-automation",
  "excel-blank-cell-checker",
  "excel-number-format-cleanup",
  "excel-file-compare",
  "excel-csv-file-merge",
];

describe("use case page generator", () => {
  it("defines the current search landing pages", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);

    expect(generator.useCases.map((useCase: { slug: string }) => useCase.slug)).toEqual(expectedUseCaseSlugs);
  });

  it("keeps generated use case pages in sync with checked-in HTML", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);

    for (const useCase of generator.useCases) {
      const htmlPath = join(root, "public", "use-cases", `${useCase.slug}.html`);
      const checkedInHtml = readFileSync(htmlPath, "utf8");

      expect(generator.renderUseCasePage(useCase)).toBe(checkedInHtml);
    }
  });

  it("keeps sitemap entries in sync with generated use case URLs", async () => {
    const generator = await import(pathToFileURL(join(root, "scripts/use-case-pages.mjs")).href);
    const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");

    expect(generator.renderSitemap()).toBe(sitemap);
  });
});
